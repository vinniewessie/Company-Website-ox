import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://vincentpwesley.com"),
  title: {
    default: "Vincent P Wesley — AI & Software Engineer",
    template: "%s | Vincent P Wesley",
  },
  description:
    "Vincent P Wesley is an AI & Software Engineer specializing in RPA, mobile app development, AI systems, and data analytics. Building intelligent software that drives growth.",
  keywords: [
    "Vincent P Wesley",
    "AI Engineer",
    "Software Engineer",
    "RPA",
    "Robotic Process Automation",
    "Mobile App Development",
    "AI Systems",
    "Data Analytics",
    "Laravel",
    "React",
    "Python",
  ],
  authors: [{ name: "Vincent P Wesley" }],
  creator: "Vincent P Wesley",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    title: "Vincent P Wesley — AI & Software Engineer",
    description:
      "AI & Software Engineer specializing in RPA, mobile app development, AI systems, and data analytics.",
    siteName: "Vincent P Wesley",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vincent P Wesley — AI & Software Engineer",
    description:
      "AI & Software Engineer specializing in RPA, mobile app development, AI systems, and data analytics.",
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
