# Fredi Anriko — Portfolio

A personal portfolio / online résumé built with **Next.js 16**, **React 19**, and
**Tailwind CSS v4**. It has light/dark mode, a local content-management UI, and
deploys to **GitHub Pages** as a fully static site.

## How it works

- **Public site** (`/`) — static, fast, hosted free on GitHub Pages. Content is
  read from the JSON files in `data/` at build time.
- **Local CMS** (`/cms`) — an admin UI that edits those JSON files. It runs only
  on your machine via `next dev`; it is **not** deployed (GitHub Pages can't run
  a server). This is the "git-as-CMS" pattern.

### CMS login

The CMS is protected by a username/password. Set them in `.env.local` (gitignored,
never deployed):

```
CMS_USERNAME=your-name
CMS_PASSWORD=a-strong-password
CMS_SECRET=any-random-string
```

Restart `npm run dev` after changing them. Opening `/cms` shows a login screen;
every save/upload endpoint also rejects requests without a valid session cookie.
(This guards your local instance — the whole CMS is removed from the deployed
site regardless.)

### Editing content

1. `npm run dev`
2. Open <http://localhost:3000/cms>, log in, and edit Hero, About, Career,
   Education, Projects, Blog, or Contact.
3. The changes are written into `data/*.json` (and `public/profilepict.jpeg`).
4. Commit and push:
   ```bash
   git add data public
   git commit -m "Update content"
   git push
   ```
5. GitHub Actions rebuilds and redeploys automatically.

### Adding your résumé PDF

Drop a `resume.pdf` into the `public/` folder. The "Download Resume" buttons use
the `resumeUrl` field in `data/contact.json` (default `/resume.pdf`).

## Local development

```bash
npm install
npm run dev      # http://localhost:3000  (CMS available at /cms)
npm run build    # normal build (CMS/API routes included) — sanity check
```

## Deploying to GitHub Pages

A workflow at `.github/workflows/deploy.yml` builds a static export and publishes
it on every push to `main`.

One-time setup:

1. Create a GitHub repo and push this project to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub
   Actions**.
3. Push to `main`. The site goes live at
   `https://<your-username>.github.io/<repo-name>/`.

### URL / base path

The workflow auto-detects your repo name and sets `NEXT_PUBLIC_BASE_PATH` so
assets resolve under `/<repo-name>`. If you use a **user site** (repo named
`<username>.github.io`) or a **custom domain**, edit `deploy.yml` and set
`NEXT_PUBLIC_BASE_PATH` to an empty string and `NEXT_PUBLIC_SITE_URL` to your
domain.

### Custom domain (optional)

1. Buy a domain (~$10/yr).
2. Add a `CNAME` file in `public/` containing your domain, e.g. `fredianriko.com`.
3. Point your DNS at GitHub Pages and set the domain under Settings → Pages.
4. Set `NEXT_PUBLIC_BASE_PATH` to empty and `NEXT_PUBLIC_SITE_URL` to your domain
   in `deploy.yml`.

## Project structure

```
app/
  page.tsx                 # public homepage (composes the sections)
  layout.tsx               # root layout, theme provider, SEO metadata
  components/
    Navbar.tsx             # sticky nav + theme toggle + resume button
    ThemeToggle.tsx        # light/dark switch (next-themes)
    Reveal.tsx             # scroll-reveal animation wrapper
    sections/              # Hero, About, Career, Education, Projects, Blog, Contact
  cms/                     # LOCAL-ONLY admin UI + API routes (stripped on deploy)
  lib/asset.ts             # base-path-aware asset URLs
data/
  *.json                   # site content (the source of truth)
  types.ts                 # shared TypeScript types
```
