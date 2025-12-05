"use client"

import { useState, useEffect } from "react"
import { WeatherHeader } from "@/components/weather-header"
import { WeatherMain } from "@/components/weather-main"
import { WeatherFooter } from "@/components/weather-footer"

export default function Page() {
  const [selectedCity, setSelectedCity] = useState("台北市") // 顯示可用「台」，後端會正規化
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [glitchActive, setGlitchActive] = useState(false)

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchActive(true)
        setTimeout(() => setGlitchActive(false), 200)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Apply dark mode to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  return (
    <div className={`min-h-screen flex flex-col px-[15%] ${glitchActive ? "animate-pulse" : ""}`}>
      <WeatherHeader
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      <WeatherMain selectedCity={selectedCity} isDarkMode={isDarkMode} />
      <WeatherFooter />
    </div>
  )
}
