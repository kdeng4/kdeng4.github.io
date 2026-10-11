# CI and the production release gate

The `Site checks` workflow runs on every push, pull request, merge queue commit, and manual dispatch. Its single required job is named **Site verification**. Keep that name unique and stable: Vercel matches the GitHub check on the commit being deployed.

The job uses Node 24 and `npm ci`, installs Chromium and WebKit with their system dependencies, and runs `npm run verify`. That command stops at the first failure in:

1. Prettier formatting.
2. TypeScript and Astro checks, YAML schema validation, and the static production build.
3. Playwright and axe checks against the production output in both browsers.

The workflow has read-only repository permissions, a 20-minute timeout, pinned action revisions, and cancellation of superseded runs on the same ref. Browser failures retain screenshots and traces as a GitHub Actions artifact for seven days. There are no path filters: even an archive-only commit receives the check needed for release.

## How deployment is blocked

The existing Vercel Git integration continues to build commits. The `pdeng` project's production Deployment Check requires **Site verification** before assigning the new deployment to the production domains. A failed, cancelled, missing, or timed-out check leaves the existing production deployment serving visitors. Preview deployments remain available for review.

The desired project check is recorded in [`.github/vercel-production-check.json`](../.github/vercel-production-check.json). This is an API request body, not a `vercel.json` option; Vercel stores and enforces the applied setting on the project. No Vercel token or deployment secret is needed in GitHub Actions. Automatic production domain assignment must remain enabled so passing checks can release the deployment.

GitHub Actions checks run after a Git push. To run the same validation before pushing locally:

```bash
nvm use
npm ci
npx playwright install chromium webkit
npm run verify
```

## Inspect or restore the Vercel setting

In [the project's Deployment Checks settings](https://vercel.com/patrick-db62/pdeng/settings/deployment-checks), confirm the GitHub check named `Site verification` is required for production. If renaming the workflow job, update the project check's `source.externalCheckName` in the same change. Do not use Force Promote to release a failed check.

With the official Vercel CLI and an authenticated account, inspect the existing checks from the repository root:

```bash
vercel project inspect pdeng --scope patrick-db62 --non-interactive
vercel api /v2/projects/prj_swmFfmY26qAL7FdPpnEuoAiJF4Ci/checks --scope patrick-db62 --raw
```

Only if the check is missing, create it using the committed request body:

```bash
vercel api /v2/projects/prj_swmFfmY26qAL7FdPpnEuoAiJF4Ci/checks \
  --scope patrick-db62 --method POST --input .github/vercel-production-check.json
```

If it already exists, use the same body with `--method PATCH` and `/checks/<check-id>` instead of creating a duplicate. Preserve any other project checks.

For the next pushed production commit, confirm that `Site verification` passes in GitHub Actions and the matching Vercel deployment's checks pass before its production domains move. A cancelled run can be rerun on the same commit. For a failing test, fix the source and push a new commit.

This configuration was read back from Vercel when it was applied. The full local verification command passed; a hosted GitHub Actions run and production promotion still require a push. Setting up the gate does not itself push or deploy the site.

See Vercel's [Deployment Checks documentation](https://vercel.com/docs/deployment-checks) and [project check API](https://vercel.com/docs/rest-api/checks-v2/create-a-check).
