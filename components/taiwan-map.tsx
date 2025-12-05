"use client"

interface TaiwanMapProps {
  selectedCity: string
}

export function TaiwanMap({ selectedCity }: TaiwanMapProps) {
  return (
    <div className="relative">
      {/* Pixelated Taiwan map representation */}
      <div className="border-4 border-primary bg-card p-6 md:p-8 relative">
        <div className="text-xs text-muted-foreground mb-4 tracking-widest">// TAIWAN_REGION_MAP</div>

        {/* Simplified pixel art map of Taiwan */}
        <svg viewBox="0 0 200 300" className="w-full h-auto mx-auto" style={{ imageRendering: "pixelated" }}>
          {/* Taiwan outline - pixelated */}
          <path
            d="M 100 20 L 110 25 L 115 35 L 120 50 L 125 70 L 128 90 L 130 120 L 128 150 L 125 180 L 120 210 L 115 240 L 110 260 L 105 275 L 100 280 L 95 275 L 90 260 L 85 240 L 80 210 L 75 180 L 72 150 L 70 120 L 72 90 L 75 70 L 80 50 L 85 35 L 90 25 Z"
            fill="currentColor"
            className="text-secondary"
            stroke="currentColor"
            strokeWidth="3"
            className="text-primary"
          />

          {/* Pixel grid overlay */}
          <g className="text-muted-foreground" opacity="0.3">
            {Array.from({ length: 15 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1="50"
                y1={20 + i * 20}
                x2="150"
                y2={20 + i * 20}
                stroke="currentColor"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={60 + i * 10}
                y1="20"
                x2={60 + i * 10}
                y2="300"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            ))}
          </g>

          {/* City markers - pixel dots */}
          <g>
            {[
              { name: "台北市", x: 100, y: 60 },
              { name: "台中市", x: 98, y: 150 },
              { name: "高雄市", x: 95, y: 240 },
              { name: "花蓮縣", x: 115, y: 140 },
              { name: "台東縣", x: 110, y: 220 },
            ].map((city) => (
              <g key={city.name}>
                <rect
                  x={city.x - 4}
                  y={city.y - 4}
                  width="8"
                  height="8"
                  fill="currentColor"
                  className={selectedCity === city.name ? "text-accent animate-pulse" : "text-primary"}
                />
                {selectedCity === city.name && (
                  <>
                    <rect
                      x={city.x - 6}
                      y={city.y - 6}
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-accent animate-pulse"
                    />
                    <text
                      x={city.x + 12}
                      y={city.y + 4}
                      fontSize="10"
                      fill="currentColor"
                      className="text-accent font-bold"
                    >
                      ▸
                    </text>
                  </>
                )}
              </g>
            ))}
          </g>
        </svg>

        {/* Glitch overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/3 left-0 right-0 h-1 bg-accent" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-destructive" />
        </div>
      </div>

      {/* Warning label */}
      <div className="mt-4 text-xs text-destructive border-l-4 border-destructive pl-3 py-2 bg-destructive/10">
        ⚠ MAP_DATA_PARTIAL_CORRUPTION_DETECTED
      </div>
    </div>
  )
}
