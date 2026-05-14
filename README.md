# AI Scraper Fallback 🤖

**Resilient Web Scraping with LLM-powered Fault Tolerance.**

[![NPM Version](https://img.shields.io/npm/v/ai-scraper-fallback.svg)](https://www.npmjs.com/package/ai-scraper-fallback)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Never let a website layout change break your production scraper again. `ai-scraper-fallback` provides a smart safety net for your data extraction pipelines using Google Gemini AI.

---

## 🌏 Multilingual Introduction

### 🇺🇸 English
Stop fighting fragile CSS selectors. This package implements a **Self-healing Scraper** pattern. Use your traditional fast/cheap scrapers for daily tasks, and automatically trigger this AI-driven engine when structural changes occur. It "reads" and understands the page just like a human.

### 🇹🇼 繁體中文 (Traditional Chinese)
別再為了脆弱的 CSS 選擇器而通宵修 Bug。本套件實現了 **「自我修復爬蟲 (Self-healing Scraper)」** 模式。平時維持高效能的傳統爬蟲，一旦偵測到網頁改版、資料失效時，系統會自動切換至 Gemini AI 引擎，像人類一樣「閱讀」並精準救回結構化資料。

### 🇮🇩 Bahasa Indonesia (Susi, ini untukmu!)
Berhenti memperbaiki kode yang gampang rusak. Paket ini menggunakan sistem **"Self-healing"**. Jika tampilan website berubah, AI (Gemini) akan otomatis membantu mengambil data agar program tidak mati. Sangat cerdas dan kuat!

---

## ✨ Key Features
- **🛡️ Resilient Scraping**: Automatically handles website structural changes.
- **🧠 Semantic Understanding**: Extracts data based on meaning, not just tags.
- **⚡ LLM-powered Fault Tolerance**: A cost-effective safety net for your existing scrapers.
- **📦 Zero-config Extraction**: No complex setup, just provide HTML and get JSON.
- **🔥 Powered by Gemini**: Leveraging `gemini-2.5-flash` for state-of-the-art speed and intelligence.

## 🚀 Installation

```bash
npm install ai-scraper-fallback
```

## 💻 Quick Start

```javascript
const { parseHousesWithAI } = require('ai-scraper-fallback');

async function start() {
  const html = "<html>...your web content...</html>";
  const apiKey = "your-gemini-api-key";
  
  // Trigger the AI magic!
  const results = await parseHousesWithAI(html, 'Real Estate Portal', apiKey);
  console.log(results);
}
```

## 📄 License
MIT
