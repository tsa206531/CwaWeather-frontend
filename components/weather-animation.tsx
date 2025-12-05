"use client"

interface WeatherAnimationProps {
  condition: string
  isDarkMode: boolean
}

export function WeatherAnimation({ condition, isDarkMode }: WeatherAnimationProps) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {condition === "rain" && <RainAnimation isDarkMode={isDarkMode} />}
      {condition === "cloudy" && <CloudAnimation isDarkMode={isDarkMode} />}
      {condition === "sunny" && <SunAnimation isDarkMode={isDarkMode} />}
      {condition === "windy" && <WindAnimation isDarkMode={isDarkMode} />}
    </div>
  )
}

function RainAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative w-full h-full">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-3 ${isDarkMode ? "bg-accent" : "bg-primary"}`}
          style={{
            left: `${(i * 5) % 100}%`,
            animation: `pixelDrop ${2 + Math.random() * 2}s linear infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  )
}

function CloudAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center gap-4">
      <div
        className={`w-12 h-8 ${isDarkMode ? "bg-accent" : "bg-primary"}`}
        style={{ animation: "cloudJump 2s ease-in-out infinite" }}
      />
      <div
        className={`w-16 h-10 ${isDarkMode ? "bg-accent" : "bg-primary"} opacity-60`}
        style={{ animation: "cloudJump 2s ease-in-out infinite 0.3s" }}
      />
      <div
        className={`w-10 h-6 ${isDarkMode ? "bg-accent" : "bg-primary"} opacity-40`}
        style={{ animation: "cloudJump 2s ease-in-out infinite 0.6s" }}
      />
    </div>
  )
}

function SunAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className={`w-12 h-12 ${isDarkMode ? "bg-accent" : "bg-destructive"} animate-pulse relative`}>
        {/* Pixel sun rays */}
        <div
          className={`absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-4 ${isDarkMode ? "bg-accent" : "bg-destructive"}`}
        />
        <div
          className={`absolute -bottom-6 left-1/2 -translate-x-1/2 w-1 h-4 ${isDarkMode ? "bg-accent" : "bg-destructive"}`}
        />
        <div
          className={`absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-1 ${isDarkMode ? "bg-accent" : "bg-destructive"}`}
        />
        <div
          className={`absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-1 ${isDarkMode ? "bg-accent" : "bg-destructive"}`}
        />
      </div>
    </div>
  )
}

function WindAnimation({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <div className="relative w-full h-full flex flex-col justify-center gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className={`h-1 ${isDarkMode ? "bg-accent" : "bg-primary"}`}
          style={{
            width: `${40 + Math.random() * 40}%`,
            animation: `windFlow ${1.5 + Math.random()}s linear infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  )
}
