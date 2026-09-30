# Annasetu (अन्नसेतु) 🌾🍲
### AI-Powered Food Waste Reduction Ecosystem for Institutional Kitchens & Processing Units

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)](https://tailwindcss.com/)
[![Gemini 3.8 Flash](https://img.shields.io/badge/Gemini%20AI-Flash-orange.svg)](https://ai.google.dev/)

---

## 📌 Executive Overview

**Annasetu** (derived from Sanskrit *Anna* meaning Food and *Setu* meaning Bridge) is an intelligent, closed-loop food waste reduction platform designed for high-volume institutional dining facilities across India:
- **University Dining Halls & Hostels** (e.g., IITs, NITs, Central Universities)
- **Corporate Tech Campuses & Industrial Canteens**
- **Community & Temple Kitchens** (Langars, Annakshetras)
- **Hospitality & Institutional Food Processing Facilities**

### The Core Problem
Massive quantities of wholesome food are wasted daily due to:
1. **Uncalibrated Demand & Overproduction**: Static planning fails to account for academic holidays, exams, rainy weather, or festival weekends.
2. **Cold Chain & Storage Inefficiencies**: Unmonitored walk-in chillers and grain silos degrade shelf-life prematurely.
3. **Late Stage Expiry**: Perishables expire unnoticed without proactive batch tracking.
4. **Logistics Bottlenecks**: Safe surplus food fails to reach verified NGOs and community kitchens before spoiling.
5. **Disconnected Open Loops**: When food is wasted, no operational feedback is returned to adjust tomorrow's prep batches.

---

## 🔄 The Closed-Loop Architecture

Annasetu's core innovation is its continuous feedback loop:

$$\text{PREDICT} \rightarrow \text{PREVENT} \rightarrow \text{MONITOR} \rightarrow \text{DETECT} \rightarrow \text{REDISTRIBUTE} \rightarrow \text{MEASURE} \rightarrow \text{LEARN}$$

```
   ┌──────────────────────────────────────────────────────────┐
   │                                                          │
   ▼                                                          │
1. PREDICT       Forecast demand with weather, exams & events │
   │                                                          │
2. PREVENT       Generate dynamic kitchen batch prep orders   │
   │                                                          │
3. MONITOR       IoT telemetry (temp, humidity, vibration)    │
   │                                                          │
4. DETECT        Live camera QR/barcode scanner & shelf check │
   │                                                          │
5. REDISTRIBUTE  Auto-match safe surplus with nearby NGOs     │
   │                                                          │
6. MEASURE       Real-time ESG, ₹ savings, and CO₂e tracking  │
   │                                                          │
7. LEARN ──────► Bayesian posterior updates future baseline ──┘
```

---

## 🚀 Key Modules & Capabilities

### 1. 📊 Executive Dashboard
- **Top KPIs**: Food Waste Prevented (kg), Surplus Redistributed (meals), CO₂e Emissions Avoided (kg), and Financial Savings in Indian Rupees (₹).
- **Today's Status**: Real-time comparison of predicted meals vs. actual consumption, live alert count, and active dispatch statuses.
- **Facility Selector**: Easily switch context between Dining Halls, Processing Units, and Central Stores.

### 2. 🔮 Demand & Surplus Prediction (Predict & Prevent)
- Integrates weather conditions (temperature, monsoon/rain forecasts), weekday attendance trends, and special events (cultural fests, academic exam blocks).
- **Manager Override**: Head chefs can manually adjust portions with confidence intervals.
- Transparent formula shows expected surplus before cooking begins.

### 3. 🌡️ IoT Cold Chain & Storage Monitoring (Monitor)
- Real-time simulated telemetry for Cold Storage Chiller 1, Walk-In Freezer, Dry Grain Silo, and Prep Line.
- Monitors Temperature (°C), Relative Humidity (%), Vibration (RMS), and Compressor Power draw (kW).
- Automated anomaly detection with threshold alerts (e.g., door left ajar, compressor malfunction).

### 4. 📷 Computer Vision & Live Camera QR Detection (Detect)
- **Live Camera Scanner**: In-browser video streaming (`navigator.mediaDevices.getUserMedia`) with real-time frame scanning (`jsQR`).
- **FSSAI Food Safety Standards**: Identifies batch codes, prep timestamps, shelf-life indicators, and flags high-risk perishables.
- **One-Click Ingestion**: Scanned items immediately populate the active At-Risk Food Tracker for kitchen staff review.

### 5. 🤝 Surplus Redistribution Logistics (Redistribute)
- Connects safe, unserved food directly with verified local Indian non-profits:
  - *Robin Hood Army (South Delhi Chapter)*
  - *Akshaya Patra Foundation Hub*
  - *Feeding India by Zomato*
  - *Goonj Community Hub*
- Includes distance calculation (km), dispatch timers, recipient contact coordination, and simulated dispatch workflows.

### 6. 🌿 ESG & Sustainability Accounting (Measure)
- Quantifies environmental footprint reduction using standard emission conversion factors (1 kg food waste ≈ 2.5 kg CO₂e).
- Computes economic recovery (average ₹45/meal institutional cost baseline).
- **Export ESG Audit Report**: One-click download of verified compliance reports for institutional audits.

### 7. 🧠 Continuous Learning & Model Retraining (Learn)
- Demonstrates how chef adjustments, sensor telemetry, and redistribution outcomes refine future model priors.
- Shows historical accuracy gains (+14.2% demand accuracy improvement over 30 days).

### 8. 🤖 Annasetu Copilot (Powered by Gemini AI)
- Built-in interactive kitchen assistant powered by Google Gemini via server-side proxy routes.
- Understands Indian culinary operations:
  - FSSAI temperature holding and re-heating rules.
  - Safe creative repurposing recipes for surplus *dal*, *khichdi*, *cooked basmati rice*, and seasonal vegetables.
  - Storage guidelines for paneer, dairy, and spices.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Canvas API, jsQR.
- **Backend**: Express.js server (`server.ts`) with Vite middleware integration.
- **AI & Reasoning**: Google Gemini API via `@google/genai` TypeScript SDK.
- **Build Tooling**: Vite, tsx, Node.js.

---

## 💻 Local Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm or bun

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/annasetu.git
cd annasetu
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```bash
GEMINI_API_KEY="your-gemini-api-key-here"
PORT=3000
```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Express + Vite server on port 3000 |
| `npm run build` | Builds client assets and prepares production bundle |
| `npm run lint` | Runs TypeScript type checking and validation |

---

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.
