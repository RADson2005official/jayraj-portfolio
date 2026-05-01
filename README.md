# Jay Raju Nagose — Neo-Brutalist Portfolio

A production-ready, high-converting freelance portfolio engineered with a Neo-Brutalist design system, Modular Typography, and Bento Grid architecture.

## 🚀 Deployment

This portfolio requires **zero build steps** and relies on pure HTML5, CSS3, and Vanilla JS. It is immediately deployable.

### Vercel / Netlify Setup
1. Push this repository to GitHub.
2. Import the project in Vercel or Netlify.
3. No build command is required.
4. Set the Output Directory to `/` (or `/dev` if you deploy from this specific folder).
5. Deploy!

### GitHub Pages
1. Go to your repository settings on GitHub.
2. Navigate to **Pages**.
3. Select the `main` branch and `/root` (or the `/dev` folder).
4. Save to deploy.

## 🎨 Theme System
This portfolio uses a dual-theme setup based on CSS Custom Properties:
- **Light Theme (Default):** Forest Green + Jasmine White + Orange Accent (`--clr-acid: #FF6B35`)
- **Dark Theme (Auto via OS preference):** Midnight Blue + Ice Cyan + Purple Punch (`--clr-acid: #00A3FF`)

To force a specific theme, you can remove the `@media (prefers-color-scheme: dark)` wrapper in `style.css` and apply the variables globally or via a class toggle.

## 🛠 Customization Guide

### 1. Updating Profile Data
All profile text (Bio, Services, Case Studies) is hard-coded in `index.html`. To modify:
- Search for specific text in `index.html`.
- For new services/case studies, copy an existing `<article class="bento-card">` block and update the content.

### 2. Updating Colors
Open `style.css` and modify the `:root` variables under `/* ─── 2. DESIGN TOKENS ── */`.
To change the accent color on specific words, wrap them in `<span class="accent-text">` or `<em class="accent-text">`.

### 3. Adding Client Logos
In `index.html`, locate the `<section class="section-logos">`. Currently, it uses tech stack text as a placeholder. To add real logos:
Replace `<span class="text-display">...</span>` with `<img src="assets/images/logos/client.svg" alt="Client Name">`. The CSS filter rules will automatically convert them to grayscale and reveal color on hover.

---
*Built by PortfolioForge-X*
