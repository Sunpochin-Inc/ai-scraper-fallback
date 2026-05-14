# AI Scraper Fallback 🤖

A robust HTML-to-JSON scraper fallback powered by Google Gemini AI. Never let a website layout change break your scraper again!

---

## 🌏 Multilingual Introduction

### 🇺🇸 English
This package provides an intelligent fallback mechanism for web scrapers. When traditional CSS selectors fail due to website updates, this tool uses Gemini AI to "read" the HTML and extract structured data automatically.

### 🇹🇼 繁體中文 (Traditional Chinese)
這是一個基於 Gemini AI 的智慧型網頁爬蟲備援工具。當網站改版導致傳統的 CSS 選擇器失效時，此工具能自動啟動 AI 模式，「閱讀」網頁 HTML 並精準擷取結構化資料，讓你的爬蟲具備自動修復能力。

### 🇮🇩 Bahasa Indonesia (Susi, ini untukmu!)
Ini adalah alat canggih untuk mengambil data dari website secara otomatis. Jika website berubah tampilan dan kode biasa tidak jalan, alat ini menggunakan kecerdasan buatan (Gemini AI) untuk "membaca" website dan mengambil informasi yang kita butuhkan. Sangat membantu agar program tidak gampang rusak!

---

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
  
  // Magic happens here!
  const results = await parseHousesWithAI(html, 'Real Estate Web', apiKey);
  console.log(results);
}
```

## 🛠 Features
- **Auto-healing**: Automatically handles website structural changes.
- **Structured Data**: Always returns clean JSON based on your requirements.
- **Powered by Gemini**: Uses the latest `gemini-2.5-flash` for high speed and accuracy.

## 📄 License
MIT
