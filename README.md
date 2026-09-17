# 🚀 GATE-OS • GATE ECE Tracker & Preparation Platform

A high-performance, distraction-free web platform engineered for **GATE ECE** aspirants (optimized for **IIIT Bangalore** admission & Top IIT cutoffs). Built with React, Vite, TypeScript, Tailwind CSS, KaTeX, and Zustand.

---

## 🌟 Key Features

- 🎯 **Topic Mastery Tracker**: Live syllabus tracking across all 10 GATE ECE modules (Engg. Math, Networks, Signals & Systems, EDC, Analog, Digital, Control Systems, Communications, EMTL, and General Aptitude). Includes high-yield tags, PYQ counters, and real-time secured marks computation.
- ⚡ **Daily Essentials & Streaks**: Task-based daily quest system replacing rigid timetables with habit-forming execution loops and study streaks.
- 📐 **Formula Vault**: Comprehensive, searchable formula bank with KaTeX LaTeX math rendering.
- 🗺️ **18-Week Strategic Roadmap**: Multi-phase study timeline balancing core subjects, PYQ passes, and revision blocks.
- 📝 **3-Line Error Log Engine**: Root-cause diagnostic tool categorizing mistakes into Conceptual Gaps, Calculation Errors, or Reading Traps.
- 🖥️ **TCS iON CBT Exam Simulator & Virtual Calculator**: Pixel-accurate GATE CBT interface with built-in scientific virtual calculator.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Math Rendering**: [KaTeX](https://katex.org/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (with `localStorage` persistence)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `pnpm`

### Installation & Run

```bash
# Clone repository
git clone https://github.com/ChAakshay/gate_tracker.git
cd gate_tracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to interact with the platform.

### Production Build

```bash
npm run build
```

The compiled assets will be placed in the `dist/` directory, ready for immediate deployment on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

---

## 📁 Repository Structure

```
gate_tracker/
├── docs/                     # Strategic blueprints, master prompts & 15-year analysis PDFs
│   ├── GATE_2027_ECE_15Year_Analysis.pdf
│   ├── GATE_2027_ECE_Audited_55Mark_Strategy.pdf
│   ├── gate_2027_complete_system.md
│   ├── gate_aug_to_dec_master_blueprint.md
│   └── ...
├── src/
│   ├── components/           # UI components (Tracker, Vault, Roadmap, CBT, Calculator)
│   ├── data/                 # Syllabus data, mock questions, and formula datasets
│   ├── store/                # Zustand state management and local persistence
│   ├── types/                # TypeScript interfaces & types
│   ├── App.tsx               # Main application shell & top navigation
│   └── main.tsx              # React entrypoint
├── index.html                # Vite HTML shell
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📚 Offline Blueprints & Strategy Documents

The [`docs/`](./docs) folder contains comprehensive preparation materials, including:
- **15-Year Empirical Syllabus Optimization (2011–2025)**: Statistical analysis and 80/20 chapter prioritization.
- **Audited 55+ Raw Marks Master Strategy**: High-yield syllabus coverage designed for IIIT-B direct Round 1 admission.
- **Detailed Weekly Breakdown & Attack Guides**: Phase-by-phase execution manuals.

---

## 📄 License

MIT License. Designed for personal and open GATE preparation.
