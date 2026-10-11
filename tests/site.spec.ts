import { readFileSync, readdirSync } from "node:fs";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { parse } from "yaml";

const site = parse(readFileSync("content/site.yaml", "utf8")).main as {
  name: string;
  fullName: string;
  url: string;
  email: string;
  resume: string;
  role: string;
  employer: string;
};
const projectFiles = readdirSync("content/projects").filter((name) => name.endsWith(".yaml"));
const projectPaths = projectFiles.map((file) => `/projects/${file.replace(/\.yaml$/, "")}/`);
const paths = ["/", "/projects/", "/research/", "/about/", "/cv/", ...projectPaths];

test.beforeEach(async ({ page }) => {
  // Keep third-party analytics out of local, deterministic browser checks.
  await page.route("https://www.googletagmanager.com/**", (route) => route.fulfill({ status: 200, body: "" }));
  await page.route("https://*.google-analytics.com/**", (route) => route.fulfill({ status: 204 }));
});

for (const path of paths) {
  test(`${path} renders accessible content from YAML`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(new RegExp(site.name));
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("main")).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", new URL(path, site.url).href);
    await expect(page.getByRole("link", { name: site.email })).toHaveAttribute("href", `mailto:${site.email}`);
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("visitors can explore every project, find the paper, and read the resume", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore my work" }).click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("#projects .project-row")).toHaveCount(3);
  await page.getByRole("link", { name: /^All projects/ }).click();
  await expect(page).toHaveURL(/\/projects\/$/);
  await expect(page.locator(".project-row")).toHaveCount(projectFiles.length);
  for (const file of projectFiles) {
    const project = parse(readFileSync(`content/projects/${file}`, "utf8")) as {
      title: string;
      summary: string;
      links: { label: string; href: string }[];
    };
    const path = `/projects/${file.replace(/\.yaml$/, "")}/`;
    await page.locator(`.project-link[href="${path}"]`).click();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(project.title);
    await expect(page.locator(".page-intro .lead")).toHaveText(project.summary);
    for (const link of project.links) {
      await expect(page.getByRole("link", { name: link.label, exact: true })).toHaveAttribute("href", link.href);
    }
    await page.getByRole("link", { name: "All projects", exact: true }).click();
  }
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Research" }).click();
  await expect(page.getByRole("link", { name: "Read the paper" })).toHaveAttribute(
    "href",
    "https://dl.acm.org/doi/10.1145/3770762.3772654"
  );
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Resume" }).click();
  await expect(page).toHaveURL(new URL(site.resume, site.url).pathname);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(site.fullName);
  await expect(page.locator(".page-intro .lead")).toContainText(`${site.role} at ${site.employer}`);
  await expect(page.getByRole("heading", { name: "Experience", exact: true })).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Resume" })
  ).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("link", { name: /download.*resume/i })).toHaveCount(0);
});

test("current employment stays consistent across the homepage, biography, resume, and metadata", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".hero-introduction")).toContainText(`${site.role} at ${site.employer}`);
  const person = JSON.parse((await page.locator('script[type="application/ld+json"]').textContent())!);
  expect(person.jobTitle).toBe(site.role);
  expect(person.worksFor.name).toBe(site.employer);
  await page.goto("/about/");
  const currentTimelineEntry = page.locator(".timeline-list").first().locator("li").first();
  await expect(currentTimelineEntry.getByRole("heading", { level: 3 })).toHaveText(site.employer);
  await expect(currentTimelineEntry.locator(".timeline-role")).toHaveText(site.role);
  await expect(currentTimelineEntry.locator(".timeline-dates")).toContainText("Present");
  await page.getByRole("link", { name: "View my resume", exact: true }).click();
  const experience = page.locator(".cv-section").first().locator("article");
  await expect(experience.first().getByRole("heading", { level: 3 })).toHaveText(site.employer);
  await expect(experience.first().locator(".cv-entry-meta")).toHaveText(site.role);
  await expect(experience.first().locator(".mono")).toContainText("Present");
  await expect(experience.nth(1).getByRole("heading", { level: 3 })).toHaveText("Walmart Canada");
  await expect(experience.nth(1).locator(".mono")).not.toContainText("Present");
});

test("the CV retains established results and project source links", async ({ page }) => {
  await page.goto("/cv/");
  await expect(page.getByText(/improving reporting accuracy by 25%/)).toBeVisible();
  await expect(page.getByText("GCP (BigQuery, Vertex AI)", { exact: false })).toBeVisible();
  for (const href of [
    "https://github.gatech.edu/kdeng49/kbai_2024summer_project.git",
    "https://github.gatech.edu/gt-omscs-se-2023fall/6300Fall23Team159",
  ]) {
    await expect(page.locator(`.cv-section a[href="${href}"]`)).toHaveText("Source code (Georgia Tech)");
  }
});

test("all internal links and fragment destinations resolve", async ({ page, request }) => {
  const checked = new Set<string>();
  for (const path of paths) {
    await page.goto(path);
    const hrefs = await page
      .locator("a[href]")
      .evaluateAll((anchors) => anchors.map((anchor) => anchor.getAttribute("href")!));
    for (const href of hrefs) {
      if (href.startsWith("#")) {
        expect(await page.locator(`[id="${href.slice(1)}"]`).count(), `${path}: ${href}`).toBe(1);
      } else if (href.startsWith("/") && !checked.has(href)) {
        checked.add(href);
        expect((await request.get(href)).status(), `${path}: ${href}`).toBe(200);
      }
    }
  }
});

test("content reflows at 320px, with 200% text, and in reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of paths) {
    await page.goto(path);
    for (const fontSize of ["112.5%", "225%"]) {
      await page.locator("html").evaluate((html, size) => {
        html.style.fontSize = size;
      }, fontSize);
      const layout = await page.evaluate(() => ({
        width: innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(layout.scrollWidth, `${path} at ${fontSize}`).toBeLessThanOrEqual(layout.width + 1);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("link", { name: site.email })).toBeVisible();
    }
  }
  const motion = await page
    .getByRole("heading", { level: 1 })
    .evaluate((element) => getComputedStyle(element).animationName);
  expect(motion).toBe("none");
});

test("keyboard users can skip navigation and see focus", async ({ page, browserName }) => {
  // Safari on macOS uses Option-Tab for links when full keyboard access is off.
  // https://help.apple.com/safari/mac/8.0/en.lproj/cpsh003.html
  const nextLink = browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab";
  await page.goto("/");
  await page.keyboard.press(nextLink);
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await expect(skip).toHaveCSS("outline-style", "solid");
  await page.keyboard.press("Enter");
  await expect(page.getByRole("main")).toBeFocused();
  await page.keyboard.press(nextLink);
  await expect(page.getByRole("link", { name: "Explore my work" })).toBeFocused();
  await expect(page.getByRole("link", { name: "Explore my work" })).toHaveCSS("outline-width", "3px");
});

test("standalone navigation and controls have comfortable targets", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  const targets = page.locator(".nav-links a, .button, .copy-button, .text-link, .project-link, .social-links a");
  for (const target of await targets.all()) {
    if (!(await target.isVisible())) continue;
    const box = await target.boundingBox();
    expect(box?.height, await target.innerText()).toBeGreaterThanOrEqual(44);
    expect(box?.width, await target.innerText()).toBeGreaterThanOrEqual(44);
  }
});

test("copying email provides success and failure feedback", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async (text: string) => {
          document.body.dataset["copied"] = text;
        },
      },
    });
  });
  await page.getByRole("button", { name: "Copy email" }).click();
  await expect(page.getByRole("status")).toHaveText("Email address copied to clipboard.");
  await expect(page.locator("body")).toHaveAttribute("data-copied", site.email);
  await page.evaluate(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: async () => {
          throw new Error("Clipboard denied");
        },
      },
    });
  });
  await page.getByRole("button", { name: "Copied", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Couldn't copy");
  await expect(page.getByRole("button", { name: "Copy email", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: site.email })).toHaveAttribute("href", `mailto:${site.email}`);
});

test("the full portfolio works without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:4321/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("button", { name: "Copy email" })).toBeHidden();
  await page.getByRole("link", { name: /^All projects/ }).click();
  await expect(page.locator(".project-row")).toHaveCount(projectFiles.length);
  await page.locator(".project-link").first().click();
  await expect(page.locator(".project-body")).toBeVisible();
  await expect(page.getByRole("link", { name: site.email })).toBeVisible();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Resume" }).click();
  await expect(page.getByRole("heading", { name: "Experience", exact: true })).toBeVisible();
  await expect(page.locator(".page-intro .lead")).toContainText(`${site.role} at ${site.employer}`);
  await context.close();
});

test("legacy links redirect and missing pages have a useful 404", async ({ page, request }) => {
  for (const [from, to] of [
    ["/assets/pdf/resume.pdf", "/cv/"],
    ["/publications/", "/research/"],
    ["/projects/master-to-phd-pathway-study/", "/projects/masters-to-phd/"],
    ["/projects/Master%20to%20PhD%20Pathway%20Study/", "/projects/masters-to-phd/"],
    ["/projects/Master-to-PhD-Pathway-Study/", "/projects/masters-to-phd/"],
  ]) {
    await page.goto(from!);
    await expect(page).toHaveURL(new RegExp(`${to}$`));
  }
  const missing = await page.goto("/this-page-does-not-exist/");
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole("link", { name: "Back home" })).toBeVisible();
  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toContain(`${site.url}/sitemap-index.xml`);
  expect((await request.get("/sitemap-index.xml")).status()).toBe(200);
});

test("images reserve space and the homepage stays lightweight", async ({ page }) => {
  await page.goto("/");
  const images = await page.locator("main img").evaluateAll((elements) =>
    elements.map((element) => ({
      width: element.getAttribute("width"),
      height: element.getAttribute("height"),
      loaded: (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0,
    }))
  );
  expect(images.length).toBeGreaterThan(0);
  for (const image of images) {
    expect(Number(image.width)).toBeGreaterThan(0);
    expect(Number(image.height)).toBeGreaterThan(0);
    expect(image.loaded).toBe(true);
  }
  const resources = await page.evaluate(() =>
    performance.getEntriesByType("resource").map((entry) => ({
      url: entry.name,
      bytes: (entry as PerformanceResourceTiming).transferSize,
    }))
  );
  const localBytes = resources
    .filter((entry) => entry.url.startsWith("http://127.0.0.1"))
    .reduce((sum, entry) => sum + entry.bytes, 0);
  expect(localBytes).toBeLessThan(150_000);
});
