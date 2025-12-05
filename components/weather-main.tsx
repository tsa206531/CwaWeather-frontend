"use client"

import { useState, useEffect } from "react"
import { TaiwanMap } from "@/components/taiwan-map"
import { WeatherAnimation } from "@/components/weather-animation"
import { fetchWeatherByCity, type WeatherResponse } from "@/lib/api"

interface WeatherMainProps {
  selectedCity: string
  isDarkMode: boolean
}

// Mock weather data
const weatherData: Record<string, { temp: number; condition: string; humidity: number; wind: number }> = {
  台北市: { temp: 99, condition: "rain", humidity: 85, wind: 12 },
  新北市: { temp: 99, condition: "cloudy", humidity: 78, wind: 15 },
  桃園市: { temp: 99, condition: "sunny", humidity: 65, wind: 8 },
  台中市: { temp: 99, condition: "cloudy", humidity: 70, wind: 10 },
  台南市: { temp: 99, condition: "sunny", humidity: 68, wind: 9 },
  高雄市: { temp: 99, condition: "sunny", humidity: 72, wind: 11 },
  基隆市: { temp: 99, condition: "rain", humidity: 88, wind: 16 },
  新竹市: { temp: 99, condition: "windy", humidity: 70, wind: 20 },
  嘉義市: { temp: 99, condition: "sunny", humidity: 65, wind: 8 },
  新竹縣: { temp: 99, condition: "cloudy", humidity: 72, wind: 14 },
  苗栗縣: { temp: 99, condition: "sunny", humidity: 68, wind: 9 },
  彰化縣: { temp: 99, condition: "cloudy", humidity: 71, wind: 10 },
  南投縣: { temp: 99, condition: "cloudy", humidity: 75, wind: 7 },
  雲林縣: { temp: 99, condition: "sunny", humidity: 66, wind: 8 },
  嘉義縣: { temp: 99, condition: "sunny", humidity: 67, wind: 9 },
  屏東縣: { temp: 99, condition: "sunny", humidity: 70, wind: 10 },
  宜蘭縣: { temp: 99, condition: "rain", humidity: 90, wind: 13 },
  花蓮縣: { temp: 99, condition: "cloudy", humidity: 76, wind: 11 },
  台東縣: { temp: 99, condition: "sunny", humidity: 68, wind: 12 },
  澎湖縣: { temp: 99, condition: "windy", humidity: 75, wind: 22 },
  金門縣: { temp: 99, condition: "cloudy", humidity: 73, wind: 15 },
  連江縣: { temp: 99, condition: "rain", humidity: 85, wind: 18 },
}

const conditionText: Record<string, string> = {
  rain: "降雨中",
  cloudy: "多雲",
  sunny: "晴朗",
  windy: "強風",
}

export function WeatherMain({ selectedCity, isDarkMode }: WeatherMainProps) {
  const [loading, setLoading] = useState(false)
  const [displayTemp, setDisplayTemp] = useState(0)
  const [apiData, setApiData] = useState<WeatherResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const weather = weatherData[selectedCity] || weatherData["台北市"]

  // 當城市改變，向後端請求資料，並保留原本的 loading 與動畫體驗
  useEffect(() => {
    let cancelled = false

    const startCountUp = (target: number) => {
      // 模擬原本 500ms 的載入延遲，並做溫度數字遞增動畫
      setTimeout(() => {
        if (cancelled) return
        setLoading(false)
        let current = 0
        const increment = target / 20
        const countUp = setInterval(() => {
          if (cancelled) {
            clearInterval(countUp)
            return
          }
          current += increment
          if (current >= target) {
            setDisplayTemp(target)
            clearInterval(countUp)
          } else {
            setDisplayTemp(Math.floor(current))
          }
        }, 50)
      }, 500)
    }

    ;(async () => {
      try {
        setError(null)
        setLoading(true)
        setDisplayTemp(0)

        const data = await fetchWeatherByCity(selectedCity)
        if (cancelled) return

        setApiData(data)

        // 直接用此次請求取得的 data 計算目標溫度，避免讀取舊的 state
        let target = weather.temp // 預設用 mock 值
        const apiFirst = data?.data?.forecasts?.[0]
        if (apiFirst) {
          const parseNum = (s?: string) => {
            if (!s) return NaN
            const m = s.match(/-?\d+(?:\.\d+)?/)
            return m ? Number(m[0]) : NaN
          }
          const min = parseNum(apiFirst.minTemp)
          const max = parseNum(apiFirst.maxTemp)
          const avg = isNaN(min) && isNaN(max)
            ? NaN
            : isNaN(min)
              ? max
              : isNaN(max)
                ? min
                : Math.round((min + max) / 2)
          if (!isNaN(avg)) target = avg
        }

        startCountUp(target)
      } catch (e: any) {
        if (cancelled) return
        setError(e?.message || '取得天氣資料失敗')
        setApiData(null)
        // 失敗時仍用 mock 值做動畫，維持體驗
        startCountUp(weather.temp)
      }
    })()

    return () => { cancelled = true }
  }, [selectedCity, weather.temp])

  return (
    <main className="flex-1 p-4 md:p-8 relative">
      {/* Anti-design: random decorative elements */}
      <div className="absolute top-12 left-4 w-2 h-32 bg-destructive/30" />
      <div className="absolute top-1/3 right-0 w-48 h-1 bg-accent/20" />
      <div className="absolute bottom-24 left-1/4 w-8 h-8 border-2 border-primary/40 animate-pulse" />

      <div className="max-w-7xl mx-auto">
        {/* Asymmetric grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
          {/* Main weather display - intentionally offset */}
          <div className="lg:col-span-7 space-y-6 lg:ml-16">
            {/* Temperature Display */}
            <div className="border-4 border-primary bg-card/50 p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10" />
              <div className="absolute bottom-0 left-0 w-24 h-1 bg-destructive" />

              {loading ? (
                <div className="text-center py-12">
                  <div className="text-4xl animate-pulse">▓▒░</div>
                  <div className="text-xs mt-2 text-muted-foreground tracking-widest">LOADING_DATA...</div>
                </div>
              ) : (
                <>
                  <div className="text-xs text-muted-foreground tracking-widest mb-2">// LOCATION: {selectedCity}</div>
                  <div className="text-[10px] text-muted-foreground tracking-widest mb-4">{apiData?.data?.updateTime ? `// SOURCE: CWA | ${apiData.data.updateTime}` : "// SOURCE: MOCK"}</div>
                  <div className="flex items-start gap-4">
                    <div className="text-6xl md:text-8xl font-bold text-primary tabular-nums tracking-tighter">
                      {displayTemp}°
                    </div>
                    <div className="mt-4">
                      <div className="text-xl md:text-2xl text-foreground">{conditionText[weather.condition]}</div>
                      <div className="text-xs text-muted-foreground mt-1">CELSIUS</div>
                    </div>
                  </div>

                  {/* Weather animation */}
                  <div className="mt-6 h-32 relative border-2 border-dashed border-muted">
                    <WeatherAnimation condition={weather.condition} isDarkMode={isDarkMode} />
                  </div>
                </>
              )}
            </div>

            {/* Additional data - broken layout */}
            <div className="grid grid-cols-2 gap-4 md:gap-6 -mr-8 md:-mr-12">
              <div className="bg-secondary border-2 border-accent p-4 md:p-6">
                <div className="text-xs text-muted-foreground tracking-wider">HUMIDITY</div>
                <div className="text-2xl md:text-4xl font-bold text-accent mt-2">{weather.humidity}%</div>
                <div className="text-xs mt-2 text-muted-foreground">濕度數據</div>
              </div>
              <div className="bg-secondary border-2 border-destructive p-4 md:p-6 -rotate-1">
                <div className="text-xs text-muted-foreground tracking-wider">WIND</div>
                <div className="text-2xl md:text-4xl font-bold text-destructive mt-2">{weather.wind}</div>
                <div className="text-xs mt-2 text-muted-foreground">風速 m/s</div>
              </div>
            </div>
          </div>

          {/* Taiwan Map - right side with offset */}
          <div className="lg:col-span-5 mt-8 lg:mt-0 lg:-mr-8">
            <div className="sticky top-4">
              <div className="text-xs text-muted-foreground tracking-widest mb-4 text-right">[MAP_DATA_CORRUPTED]</div>
              <TaiwanMap selectedCity={selectedCity} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
