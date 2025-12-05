# 前端（Next.js）整合說明

本前端（位於 `frontend/`）使用 Next.js 建構，並已串接後端通用端點 `/api/weather?city=`。為了讓靜態部署（GitHub Pages）也能彈性指定後端位置，採用 `/public/config.json` 來提供 `API_BASE_URL`。

## 目錄重點

- `public/config.json`：提供前端在執行期間載入的 API 基底網址（避免寫死在程式碼）
- `lib/api.ts`：封裝 `loadApiConfig()` 與 `fetchWeatherByCity(city)`
- `components/weather-main.tsx`：當城市變更時，呼叫 API 取得資料，並將顯示溫度改為使用後端第一段預報的平均溫度（若無資料則退回 mock）

## 設定 API_BASE_URL

- 檔案位置：`frontend/public/config.json`
- 內容範例（本地開發後端在 3001）

```json
{
  "API_BASE_URL": "http://localhost:3000"
}
```

- 內容範例（部署到 Zeabur）

```json
{
  "API_BASE_URL": "https://your-zeabur.app"
}
```

> 注意：若你在本地將前端 dev 埠號與後端 dev 埠號對調，請同步修改此設定。

## 前端如何呼叫 API

1. 啟動時會先由 `lib/api.ts` 的 `loadApiConfig()` 讀取 `/config.json` 取得 `API_BASE_URL`。
2. 切換城市時由 `fetchWeatherByCity(city)` 呼叫：
   - GET `${API_BASE_URL}/api/weather?city=${encodeURIComponent(city)}`
3. 後端會自動將「台」正規化為「臺」，並驗證是否為 22 縣市之一。

## 已修改的檔案/新增檔案

- 新增：`public/config.json`
- 新增：`lib/api.ts`
- 修改：`components/weather-main.tsx`
  - 引入 `fetchWeatherByCity`
  - 新增 `apiData` 與 `error` 狀態
  - 切換城市時請求後端，並在載入完成後進行溫度動畫
  - 顯示資料來源字樣（若有 `apiData.data.updateTime` 則顯示 CWA，否則顯示 MOCK）
  - 溫度：若能解析到後端第一段預報的 `minTemp`/`maxTemp`，取平均值作為目標溫度，否則使用原本 mock 值

## 本地開發流程

1. 啟動後端（請參考 `backend/README.md`）：
   - 設定 `.env` 並啟動後端，預設 `PORT=3000`
2. 啟動前端：
   - `npm install`
   - `npm run dev`（或指定埠號：`npm run dev -- -p 3001`）
   - 確認 `public/config.json` 指向後端（例如 `http://localhost:3000`）
3. 在頁面切換城市，觀察：
   - `// SOURCE: CWA | ...`（成功）或 `// SOURCE: MOCK`（失敗/無資料）
   - 溫度動畫以後端平均溫度或 mock 值為目標

## 部署到 GitHub Pages

- 將 `public/config.json` 上傳並填入 Zeabur 網域（HTTPS）
- 確保後端允許 CORS（本專案已 `app.use(cors())`）
- 在頁面切換城市時，即可呼叫 Zeabur 後端取得資料

## 常見問題

- 看見 `// SOURCE: MOCK`：
  - 可能是 `config.json` 未指向正確後端、CWA API 限制或 Key 未設置
- 前端與後端埠號衝突：
  - 可用 `npm run dev -- -p 3001` 或修改 `package.json` 指令為 `next dev -p 3001`
- 城市顯示用「台」：
  - 後端會自動轉為「臺」，不用擔心
