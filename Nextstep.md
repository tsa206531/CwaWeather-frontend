目前進度:任務四影片全部做完，剩下LV2改樣式。
目前狀況:zeabur 排隊中，無法測試網址是否正常。

剩下改樣是。

25/12/06 已成功上傳
待修正問題:因為使用非同步，一開始讀取的資料是假的，要等到切換縣市才會讀到真的API。

先釐清一下「一進畫面顯示假的」的真正原因：現在 WeatherMain 的流程是

• 一進來先用 mock 資料組 UI（weatherData）
• useEffect 裡開始 fetch 真實 API
• 在 finally 裡用 apiData 狀態去計算動畫的 target 溫度

問題點在於 finally 時機＋閉包使用了舊的 apiData：

• 你在 try 裡 setApiData(data)，但 React 的 setState 是非同步的，finally 立即執行時 apiData 很可能還是上一輪的值（null），於是 target 還是用 mock 值，導致第一次進來會先顯示 mock 溫度。
• 切換城市後因為有了 apiData，後續看起來就正常。

改善方向

A. 在拿到 data 的當下就用「局部變數 data」做動畫計算（避免依賴尚未更新完成的 state）

• 重點：把 target 溫度計算與 setTimeout/countUp 移到 try 區塊，直接用 data 來算，而不是 finally 讀 apiData。
• 範例思路：
• try 內：setLoading(true) → const data = await fetch... → setApiData(data) → 計算 target(用 data) → 啟動動畫 → setLoading(false)
• finally 只做 cancelled 判斷即可。

