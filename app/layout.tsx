import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

// <CHANGE> Using monospace font for terminal/dystopian feel
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "末日廢土風 // TAIWAN WEATHER TERMINAL",
  description: "末日後的氣象監控系統 // Post-apocalyptic weather monitoring system",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon-dark-32x32.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/icon-dark-32x32.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${geistMono.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
