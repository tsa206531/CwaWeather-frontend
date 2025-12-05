export type WeatherForecast = {
  startTime: string
  endTime: string
  weather: string
  rain: string
  minTemp: string
  maxTemp: string
  comfort: string
  windSpeed: string
}

export type WeatherResponse = {
  success: boolean
  data: {
    city: string
    updateTime: string
    forecasts: WeatherForecast[]
  }
}

let apiBaseUrl: string | null = null

export async function loadApiConfig(): Promise<string> {
  if (apiBaseUrl) return apiBaseUrl
  try {
    const res = await fetch('/config.json', { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to load config.json: ${res.status}`)
    const json = await res.json()
    if (!json?.API_BASE_URL) throw new Error('config.json 缺少 API_BASE_URL')
    apiBaseUrl = String(json.API_BASE_URL)
    return apiBaseUrl
  } catch (err) {
    console.warn('讀取 config.json 失敗，將使用預設值 http://localhost:3000', err)
    apiBaseUrl = 'http://localhost:3000'
    return apiBaseUrl
  }
}

// 正規化「台/臺」供前端顯示一致，但後端也會再次處理與驗證
function normalizeCity(input: string): string {
  return input.replace(/台/g, '臺')
}

export async function fetchWeatherByCity(city: string): Promise<WeatherResponse> {
  const base = await loadApiConfig()
  const q = encodeURIComponent(city)
  const url = `${base}/api/weather?city=${q}`
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    cache: 'no-store'
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`API 失敗 (${res.status}): ${text}`)
  }
  return res.json()
}
