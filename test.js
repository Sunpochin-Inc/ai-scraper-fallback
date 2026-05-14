const { parseHousesWithAI } = require('./index');

async function runTest() {
  const mockHtml = `
    <div class="house">
      <h3>超級豪華大別墅</h3>
      <span class="price">8888萬</span>
      <p>地址：台北市信義區忠孝東路五段</p>
      <a href="https://example.com/house/123">點我查看</a>
    </div>
  `;

  console.log("🚀 正在測試 AI 套件...");
  
  // 記得這裡要確保你的環境變數裡有 GEMINI_API_KEY
  const result = await parseHousesWithAI(mockHtml, "測試網站");
  
  console.log("✅ 解析結果：");
  console.log(JSON.stringify(result, null, 2));
}

runTest();

