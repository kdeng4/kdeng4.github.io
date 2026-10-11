# Personal Site Hosting

The primary site is https://pdeng.pp.ua, hosted by the `pdeng` Vercel project
in the `patrick-db62` team. The project is connected to
`kdeng4/kdeng4.github.io`; pushes to `main` deploy automatically.

## Build

`vercel.json` defines the Jekyll build and `_site` output directory. Its install
command installs ImageMagick, the locked Ruby gems, and nbconvert in a Python
virtual environment for embedded notebooks. The theme and feature assets come
from the versioned al-folio gems.
Keep `_config.yml` set to `url: https://pdeng.pp.ua` with an empty `baseurl`,
because this personal site is served at the domain root.

## Domains

Cloudflare manages DNS for `pdeng.pp.ua`. Use the DNS records recommended by
Vercel for this project, with Cloudflare proxying disabled, so Vercel manages
HTTPS directly. `www.pdeng.pp.ua` redirects to the apex domain.

GitHub Pages remains enabled to redirect the original
https://kdeng4.github.io URL to the custom domain while preserving page paths.
Set its custom domain to `pdeng.pp.ua` in repository Settings > Pages; an Actions
deployment does not apply the `CNAME` file to this setting automatically.
Keep the existing Pages workflow enabled to retain the original entry point.

## Verification

After deploying, check the homepage, `/cv/`, `/projects/`, and
`/assets/pdf/resume.pdf` over HTTPS. Check that the homepage canonical URL uses
the custom domain, that CSS and images load, and that the old GitHub Pages URL
and its `/cv/` path redirect to the same paths on the new domain.
