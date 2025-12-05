"use client"

import { useState, useEffect } from "react"

interface WeatherHeaderProps {
  selectedCity: string
  onCityChange: (city: string) => void
  isDarkMode: boolean
  onToggleDarkMode: () => void
}

const cities = [
  "台北市",
  "新北市",
  "桃園市",
  "台中市",
  "台南市",
  "高雄市",
  "基隆市",
  "新竹市",
  "嘉義市",
  "新竹縣",
  "苗栗縣",
  "彰化縣",
  "南投縣",
  "雲林縣",
  "嘉義縣",
  "屏東縣",
  "宜蘭縣",
  "花蓮縣",
  "台東縣",
  "澎湖縣",
  "金門縣",
  "連江縣",
]

export function WeatherHeader({ selectedCity, onCityChange, isDarkMode, onToggleDarkMode }: WeatherHeaderProps) {
  const [showCities, setShowCities] = useState(false)
  const [glitch, setGlitch] = useState(false)
  const [currentDate, setCurrentDate] = useState("")

  useEffect(() => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, "0")
    const day = String(now.getDate()).padStart(2, "0")
    const weekdays = ["日", "一", "二", "三", "四", "五", "六"]
    const weekday = weekdays[now.getDay()]
    setCurrentDate(`${year}.${month}.${day} [週${weekday}]`)
  }, [])

  const handleToggle = () => {
    setGlitch(true)
    setTimeout(() => {
      onToggleDarkMode()
      setGlitch(false)
    }, 300)
  }

  return (
    <header className="border-b-4 border-primary p-4 md:p-6 relative overflow-visible">
      {/* Asymmetric background blocks */}
      <div className="absolute top-2 right-12 w-16 h-16 bg-accent/20 animate-pulse" />
      <div className="absolute bottom-0 left-1/3 w-24 h-2 bg-destructive" />

      <div className="max-w-7xl mx-auto">
        {/* Anti-design: asymmetric layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center justify-between">
          {/* Broken pixel logo - offset positioning */}
          <div className="ml-8 md:ml-0 relative">
            <div className={`text-2xl md:text-4xl font-bold tracking-wider ${glitch ? "animate-pulse" : ""}`}>
              <div className="flex items-center gap-2">
                <span className="text-primary">█▓▒░</span>
                <span className="text-foreground">天氣</span>
                <span className="text-accent animate-pulse">⚠</span>
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1 tracking-widest">WEATHER_TERMINAL_v2.1</div>
              <div className="text-xs text-accent/80 mt-1 tracking-wider font-mono">{currentDate}</div>
            </div>
            {/* Glitch overlay */}
            <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-screen">
              <div className="text-2xl md:text-4xl font-bold tracking-wider text-accent">
                <div className="flex items-center gap-2">
                  <span>█▓▒░</span>
                  <span>天氣</span>
                  <span>⚠</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls - intentionally misaligned */}
          <div className="flex flex-col gap-4 w-full md:w-auto md:mr-12">
            {/* City selector */}
            <div className="relative z-50">
              <button
                onClick={() => setShowCities(!showCities)}
                className="bg-secondary border-2 border-primary px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors flex items-center gap-2 w-full md:w-auto justify-between"
              >
                <span>▼ {selectedCity}</span>
                <span className="text-xs opacity-60">[LOCATION]</span>
              </button>

              {showCities && (
                <div className="absolute top-full left-0 mt-2 bg-card border-2 border-primary z-[100] max-h-64 overflow-y-auto w-full md:min-w-[300px] shadow-xl">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-primary">
                    {cities.map((city, index) => (
                      <button
                        key={city}
                        onClick={() => {
                          onCityChange(city)
                          setShowCities(false)
                        }}
                        className={`bg-card p-3 text-xs hover:bg-primary hover:text-primary-foreground transition-colors text-left ${
                          city === selectedCity ? "bg-primary text-primary-foreground" : ""
                        } ${index % 3 === 0 ? "col-span-2 md:col-span-1" : ""}`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Day/Night toggle - mechanical switch style */}
            <button
              onClick={handleToggle}
              className="bg-secondary border-2 border-accent px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-all relative overflow-hidden group"
            >
              <div className="flex items-center gap-3 relative z-10">
                <span className="text-2xl">{isDarkMode ? "◐" : "◯"}</span>
                <span className="text-xs tracking-wider">{isDarkMode ? "[NIGHT_MODE]" : "[DAY_MODE]"}</span>
              </div>
              {/* Scan effect on click */}
              <div
                className={`absolute inset-0 bg-accent/50 ${glitch ? "animate-pulse" : "opacity-0"} transition-opacity`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Terminal noise line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
    </header>
  )
}
