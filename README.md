# AI Scraper Fallback 🤖

**Resilient Web Scraping with LLM-powered Fault Tolerance.**

[![NPM Version](https://img.shields.io/npm/v/ai-scraper-fallback.svg)](https://www.npmjs.com/package/ai-scraper-fallback)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Never let a website layout change break your production scraper again. `ai-scraper-fallback` provides a smart safety net for your data extraction pipelines using Google Gemini AI.

---

## 💡 Why use this?

**Use this when your CSS selectors fail because a website changed its layout.**

Traditional scrapers (Cheerio, Puppeteer, Playwright) are fast but fragile. When they break, your data pipeline stops. `ai-scraper-fallback` acts as a **Self-healing layer**:
1. Try your traditional scraper first (Fast & Cheap).
2. If it fails (no data found), trigger `ai-scraper-fallback` (Smart & Resilient).
3. Extract data successfully even if the HTML structure has completely changed.

---

## 🚀 Quick Start

```javascript
const { scrapeWithAI } = require('ai-scraper-fallback');

// 1. Define what you want to extract (JSON Schema)
const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      title: { type: "string" },
      price: { type: "number" },
      link: { type: "string" }
    }
  }
};

async function run() {
  const html = "<html>...your messy HTML...</html>";
  
  // 2. Trigger the magic
  const results = await scrapeWithAI(html, schema, "YOUR_GEMINI_API_KEY");
  console.log(results);
}
```

---

## 🛠️ API Reference

### `scrapeWithAI(html, schema, apiKey, customPrompt)`
The primary generic function for any data extraction task.

| Argument | Type | Description |
| :--- | :--- | :--- |
| `html` | `string` | The raw HTML source code to analyze. |
| `schema` | `object` | A JSON Schema defining the structure you want. |
| `apiKey` | `string` | (Optional) Your Gemini API Key. |
| `customPrompt` | `string` | (Optional) Additional instructions for the AI. |

### `scrapeHouses(html, context, apiKey)`
A pre-built shortcut for real estate listings.
- **Context**: Describe the source (e.g., 'Yungching', '591') to improve accuracy.
- **Output**: Returns an array of objects containing `title`, `address`, `price`, `description`, `link`.

---

## ⚙️ Configuration

Instead of passing the API key every time, you can set it as an environment variable:

```bash
# .env file
GEMINI_API_KEY=your_actual_api_key_here
```

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
- **🔥 Powered by Gemini**: Leveraging `gemini-2.0-flash` for state-of-the-art speed.

---

## 🔧 Relationship with other tools

| Feature | Traditional (Cheerio/Puppeteer) | AI Scraper Fallback |
| :--- | :--- | :--- |
| **Speed** | ⚡ Extremely Fast | 🐢 Slow (LLM Latency) |
| **Cost** | 💸 Near Zero | 💰 LLM Token Cost |
| **Reliability** | 📉 Low (Breaks on CSS changes) | 📈 High (Understands semantics) |

---

## 💻 Installation

```bash
npm install ai-scraper-fallback
```

## 📄 License
MIT
