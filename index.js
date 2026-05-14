const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * AI 結構化網頁解析器 (NPM 開源版)
 * 
 * @param {string} html - 原始網頁 HTML 內容
 * @param {string} domain - 網頁來源 (如: '信義房屋')，幫助 AI 了解上下文
 * @param {string} apiKey - 你的 Gemini API Key
 */

async function parseHousesWithAI(html, domain = '房仲網站', apiKey){

  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('未設定 API Key。請傳入參數或設定 GEMINI_API_KEY 環境變數。');
  }
  const genAI = new GoogleGenerativeAI(key);

    // 定義輸出格式 (Schema)
  const schema = {
    description: "網頁上的房屋物件清單",
    type: "array",
    items: {
      type: "object",
      properties: {
        title: { type: "string", description: "房屋的標題名稱" },
        address: { type: "string", description: "房屋地址，包含縣市與行政區" },
        price: { type: "string", description: "房屋售價，必須帶有單位 (如：萬)" },
        description: { type: "string", description: "詳細資訊 (格局、樓層、坪數、車位等)" },
        link: { type: "string", description: "該物件的詳細網頁連結 (href)" }
      },
      required: ["title", "address", "price", "description", "link"]
    }
  };
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    }
  });

  const prompt = `
    你是一個專業的「不動產資料爬蟲解析專家」。
    請解析以下 ${domain} 提供的 HTML 程式碼，並 Extract 其中的「待售房屋物件」資料。
    
    【你的任務】：
    1. 找出所有正在出售的物件。
    2. 忽略所有非出售項目（如：廣告、頁尾資訊、導覽列）。
    3. 從 HTML 中提取以下欄位，並以 JSON 格式回傳：
       { 
         "title": "物件標題 (必填)",
         "price": "售價 (請包含單位，例如 '1200萬')",
         "address": "詳細地址 (例如 '台北市大安區安和路一段')",
         "community": "社區名稱 (如果有)",
         "description": "完整描述 (包含格局、樓層等) (必填)",
         "link": "物件詳細頁面的完整網址 (必填)",
         "image_url": "物件圖片的連結 (選填)"
       }
    4. 如果某些欄位在 HTML 中找不到，請回傳 null，但總要有 title, description, link。

    【HTML 內容】：
    ${html}
  `;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error(`[AI Scraper Fallback] 解析失敗:`, error.message);
    return [];
  }
}

// 輸出函式，讓別人可以用 require 引用它
module.exports = { parseHousesWithAI };