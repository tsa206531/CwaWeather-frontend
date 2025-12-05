"use client"

import { useState, useEffect } from "react"

const warnings = [
  "SYSTEM WARNINGS // 數據來源不穩定",
  "WEATHER ANOMALIES DETECTED // 異常氣候偵測中",
  "CONNECTION UNSTABLE // 連線訊號微弱",
  "DATA CORRUPTION: 12.4% // 資料損壞率",
  "SATELLITE SIGNAL LOST // 衛星訊號中斷",
  "TERMINAL MALFUNCTION // 終端機故障",
  "LAST UPDATE: 487 DAYS AGO // 最後更新",
]

export function WeatherFooter() {
  const [warningIndex, setWarningIndex] = useState(0)
  const [glitch, setGlitch] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => {
        setWarningIndex((prev) => (prev + 1) % warnings.length)
        setGlitch(false)
      }, 200)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="border-t-4 border-destructive bg-card/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
        {/* Status bar layout - old database style */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center justify-between">
          {/* Warning message */}
          <div className="flex-1">
            <div
              className={`text-xs md:text-sm font-mono tracking-wider flex items-center gap-3 ${glitch ? "animate-pulse text-destructive" : "text-foreground"}`}
            >
              <span className="text-destructive animate-pulse text-base md:text-xl">⚠</span>
              <span className="animate-pulse">{warnings[warningIndex]}</span>
            </div>
          </div>

          {/* System status indicators */}
          <div className="flex gap-4 md:gap-6 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">STATUS:</span>
              <span className="text-destructive animate-pulse">●</span>
              <span className="text-destructive">ERROR</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">SIGNAL:</span>
              <span className="text-accent">▂▃▁▄</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">UPTIME:</span>
              <span className="text-primary">487d</span>
            </div>
          </div>
        </div>

        {/* Pixel noise bar */}
        <div className="mt-4 h-2 bg-secondary flex gap-px">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 ${Math.random() > 0.7 ? "bg-primary" : Math.random() > 0.5 ? "bg-accent" : "bg-destructive"} opacity-${Math.random() > 0.5 ? "30" : "60"}`}
              style={{ animation: `flicker ${2 + Math.random() * 2}s ease-in-out infinite ${Math.random()}s` }}
            />
          ))}
        </div>
      </div>

      {/* Terminal cursor */}
      <div className="absolute bottom-4 right-4 text-primary animate-pulse text-lg md:text-xl">█</div>
    </footer>
  )
}
