const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Generic AI-powered HTML to JSON scraper.
 * 核心功能：通用的 AI 網頁結構化資料擷取器
 * 
 * @param {string} html - Raw HTML content. (原始網頁內容)
 * @param {Object} schema - JSON Schema for the expected output. (定義你想要的 JSON 格式)
 * @param {string} apiKey - Your Gemini API Key. (Gemini API 金鑰)
 * @param {string} customPrompt - Optional custom instructions for the AI. (可選的自定義提示詞)
 */
async function scrapeWithAI(html, schema, apiKey, customPrompt = '') {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('Missing API Key. Pass it as an argument or set GEMINI_API_KEY environment variable.');
  }

  const genAI = new GoogleGenerativeAI(key);
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash", // 使用穩定且快速的 Gemini 2.0 Flash
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    }
  });

  const prompt = customPrompt || `
  Extract structured data from the following HTML content based on the provided schema.
  Ensure all items are captured and return a valid JSON array or object as requested.
  
  【HTML Source】:
  ${html}
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error(`[AI Scraper Fallback] Extraction failed:`, error.message);
    return null;
  }
}

/**
 * [Built-in Preset] Real Estate Scraper
 * 內建預設：房屋物件專用擷取器 (相容舊版 parseHousesWithAI)
 * 
 * @param {string} html - 原始網頁 HTML 內容
 * @param {string} context - 網頁來源上下文 (如: '信義房屋')，幫助 AI 了解背景
 * @param {string} apiKey - 你的 Gemini API Key
 */
async function scrapeHouses(html, context = '房仲網站', apiKey) {
  const schema = {
    description: "網頁上的房屋物件清單",
    type: "array",
    items: {
      type: "object",
      properties: {
        title: { type: "string", description: "房屋的標題名稱" },
        address: { type: "string", description: "房屋地址，包含縣市與行政區" },
        price: { type: "string", description: "房屋售價，必須帶有單位 (如：萬)" },
        description: { type: "string", description: "房屋詳細資訊，將格局、樓層、坪數、車位等資訊用斜線 / 串接" },
        link: { type: "string", description: "該物件的詳細網頁連結 (href)" }
      },
      required: ["title", "address", "price", "description", "link"]
    }
  };

  const results = await scrapeWithAI(html, schema, apiKey, `
  你是一個專業的網頁資料擷取機器人。
  以下是一段「${context}」搜尋結果的 HTML 原始碼。
  請幫我從中找出「所有的」房屋物件。
  
  【指令】：
  1. 只要是看起來像房屋物件的區塊都要抓出來。
  2. 如果某些欄位不確定，請根據上下文猜測或填入「未知」。
  3. 確保回傳的是一個完整的陣列，不要因為單一物件解析失敗就放棄。
  
  【HTML 原始碼】：
  ${html}
  `);

  return results || [];
}

// 保持與舊版相容的別名 (Ensure backward compatibility)
const parseHousesWithAI = scrapeHouses;

const MAX_CLEAN_HTML_LENGTH = 80000;

module.exports = { 
  scrapeWithAI, 
  scrapeHouses, 
  parseHousesWithAI, // 導出舊名稱，保證主程式不 break
  MAX_CLEAN_HTML_LENGTH 
};
