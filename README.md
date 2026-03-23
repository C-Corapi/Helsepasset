# Helsepasset

A modern, fast, and privacy-friendly website built with **Astro** and **Tailwind CSS**, hosted on **Netlify**, with **Umami** analytics backed by a **Supabase** (PostgreSQL) database.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com) |
| Hosting | [Netlify](https://netlify.com) |
| Analytics | [Umami](https://umami.is) (self-hosted, privacy-friendly) |
| Database (Umami) | [Supabase](https://supabase.com) (PostgreSQL) |

---

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org) 20+
- npm (included with Node.js)

### Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/C-Corapi/Helsepasset.git
cd Helsepasset

# 2. Install dependencies
npm install

# 3. Copy the environment variables template
cp .env.example .env
# Edit .env and fill in your values (see Environment Variables below)

# 4. Start the development server
npm run dev
```

The site will be available at **http://localhost:4321**.

### Other Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

---

## Deploying the Website to Netlify

### Option A: Deploy via the Netlify UI (recommended for first deploy)

1. Go to [app.netlify.com](https://app.netlify.com) and click **Add new site → Import an existing project**.
2. Connect your GitHub account and select the `Helsepasset` repository.
3. Netlify will automatically detect the build settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Before deploying, add your environment variables under **Site configuration → Environment variables**:
   - `PUBLIC_UMAMI_URL`
   - `PUBLIC_UMAMI_WEBSITE_ID`
5. Click **Deploy site**.

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to your Netlify account
netlify login

# Link the repo to a new or existing Netlify site
netlify link

# Deploy to production
netlify deploy --prod
```

### Continuous Deployment

Once connected to GitHub, every push to the `main` branch will trigger an automatic deployment. Pull requests get a live preview URL automatically.

---

## Deploying Umami to Netlify

Umami is a Node.js web application. You can host it as a separate Netlify site backed by Supabase.

### Step 1: Fork Umami

1. Fork the [Umami repository](https://github.com/umami-software/umami) to your GitHub account.

### Step 2: Set Up the Supabase Database

*(See the next section for detailed Supabase instructions.)*

You will need a `DATABASE_URL` connection string in this format:

```
postgresql://USER:PASSWORD@HOST:5432/umami
```

### Step 3: Deploy Umami to Netlify

1. In the [Netlify dashboard](https://app.netlify.com), click **Add new site → Import an existing project**.
2. Select your forked Umami repository.
3. Set the build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next` *(Umami is a Next.js app)*
4. Add the following environment variables under **Site configuration → Environment variables**:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Supabase connection string |
| `DATABASE_TYPE` | `postgresql` |
| `APP_SECRET` | A long random secret string (e.g., output of `openssl rand -hex 32`) |

5. Click **Deploy site**.

> **First login**: After deployment, visit your Umami URL and log in with the default credentials `admin` / `umami`. **Change the password immediately.**

---

## Setting Up Supabase PostgreSQL for Umami

Supabase provides a free hosted PostgreSQL database — perfect for Umami.

### Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up or log in.
2. Click **New project**.
3. Fill in:
   - **Organization**: select or create one
   - **Name**: e.g., `helsepasset-umami`
   - **Database Password**: generate a strong password and save it securely
   - **Region**: choose the closest to your users (e.g., `eu-central-1` for Norway)
4. Click **Create new project** and wait ~2 minutes for provisioning.

### Step 2: Get the Connection String

1. In the Supabase dashboard, go to **Project Settings → Database**.
2. Scroll down to **Connection string** and select **URI**.
3. Copy the connection string — it looks like:

```
postgresql://postgres:[YOUR-PASSWORD]@db.XXXXXXXXXXXX.supabase.co:5432/postgres
```

4. Replace `[YOUR-PASSWORD]` with the database password you set in Step 1.

### Step 3: Connect Umami to Supabase

1. In your Netlify Umami site, go to **Site configuration → Environment variables**.
2. Set `DATABASE_URL` to the connection string from Step 2.
3. Trigger a redeploy — Umami will run its database migrations automatically on first boot.

---

## Getting the Umami Tracking Code

1. Log in to your deployed Umami instance.
2. Go to **Settings → Websites → Add website**.
3. Enter the website name (e.g., `Helsepasset`) and the domain (e.g., `helsepasset.netlify.app`).
4. Click **Save**.
5. Click the **Tracking code** icon next to your website.
6. You will see a script tag like:

```html
<script defer src="https://your-umami.netlify.app/script.js" data-website-id="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"></script>
```

7. Extract the values:
   - `PUBLIC_UMAMI_URL` = `https://your-umami.netlify.app/script.js`
   - `PUBLIC_UMAMI_WEBSITE_ID` = `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

---

## Configuring Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
# .env
PUBLIC_UMAMI_URL=https://your-umami-instance.netlify.app/script.js
PUBLIC_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

> **Important**: `.env` is listed in `.gitignore` and will never be committed. Only `.env.example` is committed as a reference.

On Netlify, set these in **Site configuration → Environment variables**. They are injected at build time.

### Environment Variable Reference

| Variable | Required | Description |
|----------|:--------:|-------------|
| `PUBLIC_UMAMI_URL` | ✅ | Full URL to the Umami `script.js` file |
| `PUBLIC_UMAMI_WEBSITE_ID` | ✅ | UUID identifying the website in Umami |

---

## Sharing the Umami Dashboard with the Client

Umami supports a public, read-only share link — no account required.

1. In the Umami dashboard, go to **Settings → Websites**.
2. Click the **Share** icon next to your website.
3. Toggle **Enable share URL** on.
4. *(Optional)* Set a custom URL slug and password.
5. Copy the share URL and send it to your client.

The client will see a clean, real-time dashboard with:
- Unique visitors & page views over time
- Top pages by traffic
- Traffic sources / referrers
- Countries, devices, browsers
- Custom events (button clicks, form submissions, etc.)

---

## Custom Event Tracking

### Via HTML data attributes (no JS needed)

```html
<button data-umami-event="signup-button-click">Sign Up</button>
<a href="/pricing" data-umami-event="pricing-link-click">View Pricing</a>
```

### Via JavaScript (programmatic)

Use the helper in `src/utils/analytics.ts`:

```ts
import { trackEvent } from '../utils/analytics';

// Simple event
trackEvent('video-played');

// Event with metadata
trackEvent('purchase', { product: 'Pro Plan', price: 299 });
```

---

## Local Umami Development (Docker Compose)

To run Umami locally for testing:

```bash
cd umami
docker compose up -d
```

Umami will be available at **http://localhost:3000**.

Default credentials: `admin` / `umami` — change them after first login.

To stop:

```bash
docker compose down
```

To reset the database:

```bash
docker compose down -v
```

---

## Project Structure

```
Helsepasset/
├── public/                  # Static assets
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro     # Base HTML shell (nav, footer, Umami script)
│   ├── pages/
│   │   ├── index.astro      # Home page
│   │   ├── about.astro      # About page
│   │   ├── contact.astro    # Contact page with form
│   │   └── 404.astro        # Custom 404 page
│   └── utils/
│       └── analytics.ts     # Umami helper functions
├── umami/
│   └── docker-compose.yml   # Local Umami + PostgreSQL
├── .env.example             # Environment variable reference
├── .gitignore
├── astro.config.mjs         # Astro configuration
├── netlify.toml             # Netlify build & deploy config
├── package.json
├── tailwind.config.mjs      # Tailwind CSS configuration
└── tsconfig.json
```