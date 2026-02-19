# KASHBILL - Precision Audio Systems

A high-performance, immersive portfolio for an Audio Architect & Sonic Designer. Built with React, Vite, and Tailwind CSS.

## 🚀 Quick Start

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Locally**
    ```bash
    npm run dev
    ```
    Access the site at `http://localhost:3000`.

## 🛠️ Configuration & Content

This project is designed to be easily updated without touching the core code.

### 1. Main Configuration
Edit `src/site.config.ts` to change:
-   Site Name, Role, Description
-   Contact Information (Email, LinkedIn)
-   Bio Text
-   Logo & Profile Images

### 2. Managing Projects & Sound Lab
Content is stored in `src/content/data.json`.
-   **Projects**: Add your portfolio items here.
    -   Supports **Images** and **Videos** (e.g., Google Drive Preview links).
-   **Sound Lab**: Configure the interactive drum pads.
    -   Map keys (Q, W, E, R, etc.) to audio files in `public/audio/`.

### 3. Admin CMS (Optional)
If deployed to Vercel with Git integration, you can use the built-in CMS at `/admin` to edit content visually.
-   Access: `https://your-site.vercel.app/admin`
-   Requires `git-gateway` or GitHub authentication enabled on Vercel/Netlify.

## 📦 Assets
-   **Images/Logos**: Place in `public/` folder.
-   **Audio Files**: Place in `public/audio/` folder.
-   **Resume**: Place `resume.pdf` in `public/`.

## 🚢 Deployment

**Vercel (Recommended)**
1.  Push this code to a GitHub repository.
2.  Import the repository into [Vercel](https://vercel.com/).
3.  Deploy.

The Admin CMS will automatically work if you enable Git Gateway or use a compatible auth provider.

## 📄 License
All rights reserved. Designed for KASHBILL.
