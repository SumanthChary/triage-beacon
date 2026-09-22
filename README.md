# Triage Beacon

A lightweight, real-time triage monitoring tool designed to track, filter, and prioritize incoming incidents and support alerts.

Built with **Vite**, **React**, **TypeScript**, and **Tailwind CSS**.

---

## Overview

Triage Beacon provides an intuitive interface for teams to monitor high-volume incident pipelines, categorize urgency, and direct attention where it matters most without the bloat of traditional dashboard suites.

### Key Features

* **Real-time Queue:** View and triage incoming alerts dynamically.
* **Flexible Filtering:** Quickly isolate issues by severity, component, or status.
* **Clean & Modern UI:** Styled using Tailwind CSS and custom typography with [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque?utm_source=gemini).
* **Fast Development:** Instant HMR powered by Vite and Bun/Node.

---

## Tech Stack

* **Framework:** [React 18](https://react.dev/?utm_source=gemini) + [TypeScript](https://www.typescriptlang.org/?utm_source=gemini)
* **Build Tool:** [Vite](https://vitejs.dev/?utm_source=gemini)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/?utm_source=gemini) + [shadcn/ui](https://ui.shadcn.com/?utm_source=gemini)
* **Package Manager:** [Bun](https://bun.sh/?utm_source=gemini) (or `npm`/`pnpm`)
* **Testing:** [Vitest](https://vitest.dev/?utm_source=gemini) & [Playwright](https://playwright.dev/?utm_source=gemini)

---

## Getting Started

### Prerequisites

Ensure you have Node.js (v18+) or Bun installed on your machine.

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/SumanthChary/triage-beacon.git
cd triage-beacon

```


2. **Install dependencies:**
```bash
bun install
# or
npm install

```


3. **Start the development server:**
```bash
bun dev
# or
npm run dev

```



Open `http://localhost:5173` in your browser to view the app.

---

## Scripts

| Command | Description |
| --- | --- |
| `bun dev` | Runs the app in development mode with HMR. |
| `bun build` | Compiles production-ready static assets. |
| `bun test` | Runs unit tests using Vitest. |
| `bun test:e2e` | Executes end-to-end integration tests with Playwright. |

---

## Project Structure

```text
triage-beacon/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI elements & shadcn components
│   ├── pages/         # View components / routes
│   └── styles/        # Global styles & font imports
├── index.html         # HTML entry point
├── vite.config.ts     # Vite configuration
└── package.json

```

---

## License

This project is open-source under the [MIT License](https://www.google.com/search?q=LICENSE&utm_source=gemini).
