# Vecinos de Vencejos — relocate.colourlessgreen.com

Static site (no build step). Deploy target: Netlify, custom subdomain `relocate.colourlessgreen.com`, DNS on one.com.

## Structure
- `index.html` — the whole site (single landing page, sections linked by anchor)
- `styles.css` — all styling
- `netlify.toml` — Netlify config (publishes repo root as-is)
- `assets/` — put `logo.svg` (or `.png`) here, plus any photos. The header expects `assets/logo.svg`; if missing it just hides gracefully and shows the text wordmark instead — nothing breaks if you haven't added it yet.

## Lead form
The contact form uses Netlify Forms (`data-netlify="true"` on the `<form>`). Once the site is deployed on Netlify, submissions show up automatically under Site settings → Forms — no backend code needed. Turn on email notifications there (Forms → Settings → Form notifications) so leads land in your inbox.

## Testimonials
There's a commented-out testimonial section in `index.html` (search for "Testimonial section"). Uncomment and fill in once you have a real one — don't ship an empty or fake one.

## Deploy steps
1. Push this repo to GitHub.
2. In Netlify: "Add new site" → "Import an existing project" → pick this repo. Build command: none. Publish directory: `.` (repo root).
3. Once deployed, go to Site settings → Domain management → Add a custom domain → enter `relocate.colourlessgreen.com`. Netlify will show you the DNS target (usually a CNAME to `<your-site>.netlify.app` or an ALIAS record).
4. In one.com's DNS panel for colourlessgreen.com, add a CNAME record: host `relocate`, pointing to the target Netlify gave you.
5. Wait for DNS to propagate (usually minutes, can take a couple hours) — Netlify auto-provisions HTTPS once it verifies the domain.

## Next up (not in this version)
- Real logo/photos (see `assets/`)
- First testimonial
- Blog (phase 2, per project plan)
- Possible upgrade from lead form to self-serve Google Calendar booking
