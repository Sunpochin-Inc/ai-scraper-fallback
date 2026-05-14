const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * AI 結構化網頁解析器 (NPM 開源版)
 * 
 * @param {string} html - 原始網頁 HTML 內容
 * @param {string} domain - 網頁來源 (如: '信義房屋')，幫助 AI 了解上下文
 * @param {string} apiKey - 你的 Gemini API Key
 */
async function parseHousesWithAI(html, domain = '房仲網站', apiKey) {
  const key = apiKey || process.env.GEMINI_API_KEY;
  if (!key) {
    throw new Error('未設定 API Key。請傳入參數或設定 GEMINI_API_KEY 環境變數。');
  }

  const genAI = new GoogleGenerativeAI(key);

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

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema,
    }
  });

  const prompt = `
  你是一個專業的網頁資料擷取機器人。
  以下是一段「${domain}」搜尋結果的 HTML 原始碼。
  請幫我從中找出「所有的」房屋物件。
  
  【指令】：
  1. 只要是看起來像房屋物件的區塊都要抓出來。
  2. 如果某些欄位不確定，請根據上下文猜測或填入「未知」。
  3. 確保回傳的是一個完整的陣列，不要因為單一物件解析失敗就放棄。
  
  【HTML 原始碼】：
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

const MAX_CLEAN_HTML_LENGTH = 80000;

module.exports = { parseHousesWithAI, MAX_CLEAN_HTML_LENGTH };
