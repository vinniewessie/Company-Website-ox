"use client"

import { useEffect, useState } from "react"

export function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false)
  const [pulseActive, setPulseActive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive((prev) => !prev)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="relative flex h-8 w-8 items-center justify-center sm:h-10 sm:w-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer glow ring */}
      <div
        className={`absolute inset-0 rounded-lg bg-gradient-to-br from-blue-500/30 to-cyan-500/30 blur-md transition-all duration-700 sm:rounded-xl ${
          pulseActive ? "scale-110 opacity-100" : "scale-100 opacity-50"
        }`}
      />
      
      {/* Main container */}
      <div
        className={`relative flex h-full w-full items-center justify-center rounded-lg border border-foreground/20 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-md transition-all duration-300 sm:rounded-xl ${
          isHovered ? "scale-105 border-blue-500/50" : ""
        }`}
      >
        {/* Animated gradient overlay */}
        <div
          className={`absolute inset-0 rounded-lg bg-gradient-to-tr from-blue-600/20 via-transparent to-cyan-500/20 transition-opacity duration-500 sm:rounded-xl ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
        
        {/* Letter W with gradient */}
        <span
          className={`relative z-10 font-sans text-base font-bold transition-all duration-300 sm:text-lg ${
            isHovered
              ? "bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
              : "text-foreground"
          }`}
        >
          W
        </span>

        {/* Corner accents */}
        <div
          className={`absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-blue-500 transition-all duration-300 sm:h-2 sm:w-2 ${
            isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
        />
        <div
          className={`absolute -bottom-0.5 -left-0.5 h-1 w-1 rounded-full bg-cyan-500 transition-all duration-500 sm:h-1.5 sm:w-1.5 ${
            isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          style={{ transitionDelay: "100ms" }}
        />
      </div>
    </div>
  )
}
