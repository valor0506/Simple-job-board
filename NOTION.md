# 🌟 GlobalHire - Complete Engineering & Deployment Guide
> **Welcome, Suvan!** This Notion-styled guide will teach you the architecture, styling techniques, Git logging, and CI/CD automation pipelines built for this assessment. 

---

## 🧭 1. Architectural Blueprint
GlobalHire is structured as a high-performance **Single Page Application (SPA)** using **React (v19)** and **Vite (v8)**. 

### Component Tree & State Flows
```
index.html (Load fonts, SEO, Root)
  └─ main.jsx (Render App in StrictMode)
      └─ App.jsx (Global States: jobs, savedJobIds, appliedJobIds, theme, filterQuery)
          ├─ Header.jsx (Sticky Nav, responsive mobile burger, applied counters, dark toggle)
          ├─ SearchBar.jsx (Keywords, location text input, sorting filters)
          ├─ Filters.jsx (Category checkboxes, job types, work models, salary selectors)
          ├─ JobCard.jsx (Dynamic metadata, bookmarking, shift badges, applied states)
          ├─ JobDetail.jsx (Side drawer layout, requirements lists, rotational warnings, CTA Apply)
          ├─ ApplyModal.jsx (Form validator, length counters, success screens, confetti anims)
          ├─ EmployerPortal.jsx (Posting editor form + side-by-side Live card preview)
          ├─ Dashboard.jsx (Summary statistics, subtabs, candidate progress, saved list tables)
          └─ Footer.jsx (Copyright links, inline social SVGs)
```

### State Design Patterns
Instead of a heavy state library (like Redux), we coordinate **React Hooks** (`useState`, `useEffect`, `useMemo`) directly inside [App.jsx](file:///c:/Users/suvan/Desktop/Job%20Board%20-%20GlobalCo/src/App.jsx).
1. **LocalStorage Synchronizer**: Whenever the candidate applies to a job, saves a bookmark, or an employer publishes a new position, an `useEffect` hooks runs to serialize states into the browser's `localStorage` so data survives reloading!
2. **Filtering Pipeline**: The job list is filtered dynamically on each keypress inside the search inputs or checkbox state changes. We use simple case-insensitive checking and array bounds filtering inside the render scope.

---

## 🎨 2. Premium Styling System
We avoided heavy frameworks like Tailwind to retain absolute control over sizing, animations, and transitions using vanilla CSS in [index.css](file:///c:/Users/suvan/Desktop/Job%20Board%20-%20GlobalCo/src/index.css).

### Dark / Light Mode Mechanics
We use custom **CSS Variables** defined under `:root` and a overrides block under `[data-theme="dark"]`. When the user clicks the theme toggle in the Header, React modifies the `data-theme` attribute on the `<html>` document root:
```javascript
useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
```
CSS variables automatically change their values, and a global transition `transition: background-color 0.3s ease, color 0.3s ease` creates a smooth theme transition!

### Sleek Glassmorphism Effects
Cards and the sticky header use soft shadows, high background transparency, and back-filter blurs to feel extremely modern:
```css
.header-glass {
  background: var(--glass-bg); /* RGBA alpha opacity */
  border-bottom: 1px solid var(--glass-border);
  backdrop-filter: blur(12px); /* Blur effect */
}
```

---

## 🤖 3. Confetti & Micro-Animations
To give the user a visual WOW moment, when a job application form is successfully sent, the modal transitions to a success screen and triggers a CSS-based confetti shower.
1. The React component generates 30 random coordinates:
   ```javascript
   const particles = Array.from({ length: 30 }).map((_, i) => ({
     left: `${Math.random() * 100}%`,
     delay: `${Math.random() * 1.5}s`,
     size: `${Math.random() * 8 + 6}px`
   }));
   ```
2. We map these particles to circular divs styled with keyframe fall animations:
   ```css
   @keyframes confetti-fall {
     0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
     100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
   }
   ```

---

## 🔧 4. Step-by-Step Vercel CI/CD Configuration
We configured a GitHub workflow in [.github/workflows/deploy.yml](file:///c:/Users/suvan/Desktop/Job%20Board%20-%20GlobalCo/.github/workflows/deploy.yml) that verifies the build succeeds and deploys to Vercel on push to the `main` branch.

Follow these steps to link this local repository to Vercel and set up your pipeline:

### Step A: Install Vercel CLI & Login
Open your terminal inside this project and log in to your Vercel account:
```bash
npx vercel login
```
*Select your preferred login method (Email, GitHub, etc.) and complete the browser auth.*

### Step B: Link Project & Generate Configs
Run the initial linkage wizard:
```bash
npx vercel link
```
1. Set Up and deploy: **Yes**
2. Which scope: **Select your personal scope**
3. Link to existing project: **No**
4. What is your project's name: **globalhire-board** (or choose custom name)
5. In which directory: **./**
6. Want to override settings: **No** (Vite settings are auto-detected!)

*This command creates a `.vercel/` folder containing a `project.json` file. Inside, copy the `orgId` and `projectId`.*

### Step C: Generate Vercel Access Token
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Navigate to **Account Settings -> Tokens**.
3. Click **Create** -> Give it a name (e.g. `GitHub CI/CD Token`) -> Select Scope -> Click **Create**.
4. Copy the generated API Token.

### Step D: Add Secrets in GitHub
Create your GitHub repository (since I set up all local commits, you just have to create a blank repo on GitHub, add it as a git remote, and push). Once done:
1. Open your GitHub Repository -> Go to **Settings**.
2. On the left sidebar, click **Secrets and variables** -> select **Actions**.
3. Click **New repository secret** and add:
   - `VERCEL_TOKEN` = *Paste the Token from Step C*
   - `VERCEL_ORG_ID` = *Paste the `orgId` from the `.vercel/project.json` file*
   - `VERCEL_PROJECT_ID` = *Paste the `projectId` from the `.vercel/project.json` file*

### Step E: Test Deploying!
Simply merge or push your commits to GitHub:
```bash
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```
GitHub Actions will boot, install dependencies, run the production compiler checks, and deploy to Vercel, providing a public preview link immediately!

---

## 📝 5. Git Logging Best Practices
To follow senior engineering patterns, we committed changes incrementally after completing each milestone, preventing monolithic commits.

Here is the step log in this repository:
- **`[Step 1]`**: Initialize Vite React foundations and package structures.
- **`[Step 2]`**: Establish global style systems, light/dark themes, and SEO headers.
- **`[Step 3]`**: Deploy mock career databases.
- **`[Step 4]`**: Render layout components.
- **`[Step 5]`**: Build interactive search grids and detail panels.
- **`[Step 6]`**: Build form validations and celebratory modal states.
- **`[Step 7]`**: Create Employer portals and side-by-side rendering previews.
- **`[Step 8]`**: Implement tracking dashboards and statistics.
- **`[Step 9]`**: Add CI/CD files.
- **`[Step 10]`**: Complete instructional guides.
