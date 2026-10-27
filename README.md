# MyZiki — Whimsical Graphics & Issue Tracker Mockup ✨

**MyZiki** is a dedicated prototype and UI mockup designed for experimenting with and showcasing **whimsical graphics** for the **Ziki** ecosystem ([ziki.dev](https://ziki.dev)).

This repository is kept completely independent of the production database and auth requirements of the main Ziki repo, making it:
- 🚀 **100% Zero-Config Vercel Deployable**: Instant builds without needing Postgres, Prisma migrations, or auth keys.
- 💻 **Effortless Localhost Demo**: Runs immediately with `pnpm dev` on `http://localhost:3000` to show tutors and stakeholders.
- 🎨 **Whimsical Graphics Laboratory**: A dedicated sandbox with interactive mascot animations, playful bug severity badges, celebratory confetti bursts, and doodle stickers.

---

## 🌟 Key Features

1. **Whimsical Graphics Lab (`WhimsicalShowcase.tsx`)**:
   - **Interactive Mascot ("Zikibot")**: Real-time mood switching (Happy, Investigating Bug, Task Solved, Critical Alarm) with animated SVG feedback.
   - **Playful Bug Severity Badges**: Replaces dry tags with whimsical illustrations:
     - 🌱 *Gentle Sprout* (Low severity)
     - 🐝 *Spicy Hornet* (Medium severity)
     - 🔥 *Fire Dragon* (Critical / High severity)
   - **Joy Burst / Confetti Celebration**: Simulates rewarding confetti explosions when bugs are resolved.
   - **Whimsical Mode Toggle**: Switch whimsical artwork on or off system-wide.

2. **Full Ziki App Shell & Design System**:
   - Brand tokens: Deep Ocean (`#0B1733`), Blue Slate (`#263B63`), Electric Blue (`#3978F6`), Sky Tint (`#8FC9FF`).
   - Dark & Light mode toggle with seamless CSS token transitions.
   - Collapsible navigation sidebar and responsive top navigation.

3. **Interactive Issue Tracker**:
   - Filter issues by platform (*All*, *Web*, *iOS*, *Android*, *Backend*).
   - Real-time search with instant keyboard filtering.
   - "New Issue" modal with whimsical sticker selection and instant point rewards (+30 pts).

4. **Overview Dashboard**:
   - 4 Interactive Stat Cards with hover-lift physics and gradient accent bars.
   - Weekly Contribution Points chart with milestone target tracking (500 pts).
   - "Issues Assigned to Me" interactive action table.

---

## 🛠️ Getting Started (Local Development)

### 1. Install Dependencies
```bash
pnpm install
# or npm install / yarn
```

### 2. Start the Development Server
```bash
pnpm dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

---

## ☁️ Deploying to Vercel

Because **MyZiki** has zero external database dependencies, deploying to Vercel takes less than a minute:

1. **Push to GitHub**:
   Ensure this project is pushed to your GitHub repository (e.g. `FaithDombe/MyZiki`).
2. **Import into Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Select your GitHub repository (`MyZiki`).
   - Framework preset will automatically detect **Next.js**.
   - Click **Deploy**!
3. **Done**: You will receive a live production URL (e.g., `https://my-ziki-xxx.vercel.app`) to share with your tutor!

---

## 🎨 Where to Plug in Your Whimsical Ideas

When you and your tutor finalize your whimsical graphic concept:
- **Graphic Assets**: Drop SVG, PNG, or illustration files into `public/brand/` or `public/whimsical/`.
- **Mascot / Badges**: Edit `components/WhimsicalShowcase.tsx` to add your custom illustrations or animations.
- **Issue Badges**: Update `components/IssuesView.tsx` to display your custom sticker graphics on issue cards.
- **Porting to Main Ziki**: Once approved, copy the tested component directly into the main `issue-tracker` repository!
