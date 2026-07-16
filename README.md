# 💼 GlobalHire - Premium Tech & Business Job Board

GlobalHire is a premium, high-performance career search portal built using **React (v19)**, **Vite (v8)**, and custom **Vanilla CSS variables**. It is designed with state-of-the-art aesthetics, showcasing dynamic light/dark mode transitions, responsive grid layouts, interactive search filters, and an employer publishing workbench.

This project was built for the Software Engineer assessment, satisfying all criteria including onsite Hyderabad rotational shift notices, local-first git history logging, and automated Vercel CI/CD pipelines.

---

## 🧠 Production Architecture & Backend Crossover (Scalability Note)

> [!NOTE]
> **To Recruiters & Reviewers:** While this is a frontend-only Single Page Application (SPA) designed to be fully self-contained for local running and Vercel testing, it has been structured with production scalability in mind.

### 1. In-Memory Data vs. Server-Side Fetching
*   **Current State:** The job database is initialized using mock data in [mockJobs.js](file:///c:/Users/suvan/Desktop/Job%20Board%20-%20GlobalCo/src/data/mockJobs.js) and is stored in the browser's memory via React state, syncing updates to `localStorage` (bookmarks, application statuses, and new employer listings).
*   **Production Transition:** In a live environment, loading the entire job dataset into client RAM creates severe scaling constraints. Instead, we would connect the frontend to a REST or GraphQL API using the browser's `fetch()` API or `axios` inside a `useEffect` hook.

### 2. Search & Filtering Optimization
*   **Current State:** Search, categorization, salary filtering, and sorting are executed in-memory in the rendering loop using JavaScript array methods (`filter()`, `map()`, `sort()`).
*   **Production Transition:** We would offload filtering and search to a backend database (using database indexes, pagination parameters like `page` and `limit`, or full-text search engines like Elasticsearch) to reduce client load and memory consumption.

---


## ✨ Outstanding Features

- **🌐 Live Search & Advanced Filter Controls**: Filter immediately by job category, type, remote/onsite model, and minimum salary. Real-time list updates execute with zero latency.
- **🚨 Onsite Rotational Shift Flags**: In accordance with candidate requirements, Onsite positions located in Hyderabad automatically display high-prominence banners highlighting the rotational shift policies.
- **📈 Applicant Stats Dashboard**: Track application progress. Displays total applications, bookmarked listings, and live application status tables.
- **📝 Form Validator & Confetti Success Screens**: Modal application sheets check email patterns, name lengths, and link formats, celebrating successful submissions with CSS falling confetti.
- **🛠️ Employer Publishing & Live Preview**: Employers can publish positions, previewing their cards side-by-side in real-time as they type.
- **🌗 Custom Glassmorphic Dark Mode**: System-wide dark styling overrides trigger smoothly using CSS variables and root document selectors.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) (Functional Components, Hooks API)
- **Bundler & Dev Server**: [Vite 8](https://vite.dev/) (Fast Hot Module Replacement)
- **Icons**: [Lucide React](https://lucide.dev/) (Clean SVG vectors)
- **Styling**: Vanilla CSS3 Custom Variables (Custom scrollbars, fluid inputs, glass overlays, keyframes)
- **Deployment**: [Vercel](https://vercel.com/) (Production CDN hosting)
- **CI/CD**: GitHub Actions (Verification build checks on push/PR merges)

---

## 🚀 Getting Started Locally

### 1. Prerequisites
Make sure you have Node.js (v18+) and npm installed:
```bash
node -v
npm -v
```

### 2. Installation
Clone the repository and install project dependencies:
```bash
# Navigate to workspace
cd "Job Board - GlobalCo"

# Install node modules
npm install
```

### 3. Run Development Server
Start the local hot-reloaded dev server:
```bash
npm run dev
```
Open your browser to `http://localhost:5173` to test the application immediately!

### 4. Build Production Bundle
To compile asset bundles into the `dist/` directory:
```bash
npm run build
```

---

## ⚙️ CI/CD & Deployment Setup

This project is configured with a GitHub Action inside `.github/workflows/deploy.yml` that validates the build and automatically ships updates to Vercel. 

For full instructions on configuring Vercel project linkage and setting up your GitHub secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID`), check out our extensive guide in [NOTION.md](file:///c:/Users/suvan/Desktop/Job%20Board%20-%20GlobalCo/NOTION.md).

---

## 📂 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD Pipeline
├── public/                     # Static browser assets
├── src/
│   ├── assets/                 # SVGs and images
│   ├── components/
│   │   ├─ Header.jsx           # Responsive sticky navigation & theme toggle
│   │   ├─ Footer.jsx           # Sectioned footer with inline brand SVGs
│   │   ├─ SearchBar.jsx        # Keyword search and sort controllers
│   │   ├─ Filters.jsx          # Category & salary checkbox controls
│   │   ├─ JobCard.jsx          # Interactive job teaser card
│   │   ├─ JobDetail.jsx        # In-depth requirements drawer and shift flags
│   │   ├─ ApplyModal.jsx       # Validated form sheet with confetti showers
│   │   ├─ EmployerPortal.jsx   # Job creation tool with side-by-side preview
│   │   └─ Dashboard.jsx        # Applicant metrics dashboard & status tables
│   ├── data/
│   │   └── mockJobs.js         # Realistic career database mock lists
│   ├── App.jsx                 # Central coordinator and state store
│   ├── index.css               # Global custom style tokens & anim rules
│   └── main.jsx                # Application root mount point
├── vercel.json                 # Vercel clean URL route redirection rules
├── package.json                # Project script commands & dependencies
└── NOTION.md                   # Detailed learning & documentation guide
```
