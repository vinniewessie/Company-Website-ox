"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import {
  Menu, X, Bot, BarChart3, ShoppingCart, Code, Gamepad2,
  Mail, Phone, MessageCircle, Send, Check, Sparkles, Moon, Sun,
  Download, ChevronRight, Search, Briefcase, GraduationCap, Award
} from "lucide-react"

const WHATSAPP_NUMBER = "263781132817"
const EMAIL = "vincentwessie@gmail.com"
const PHONE = "+263 781 132 817"

// ─── Skills Data ───────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "Laravel / PHP", level: 95, color: "from-red-500 to-orange-500" },
  { name: "React / Next.js", level: 90, color: "from-cyan-500 to-blue-500" },
  { name: "Python / AI/ML", level: 85, color: "from-yellow-500 to-green-500" },
  { name: "SQL / Databases", level: 92, color: "from-violet-500 to-purple-500" },
  { name: "C# / .NET", level: 80, color: "from-blue-500 to-indigo-500" },
  { name: "UI/UX Design", level: 88, color: "from-pink-500 to-rose-500" },
]

// ─── Timeline Data ─────────────────────────────────────────────────────────────
const TIMELINE = [
  { year: "2024", title: "AI Integration Specialist", desc: "Leading AI chatbot development and ML solutions", icon: Bot, type: "work" },
  { year: "2023", title: "Senior Full-Stack Developer", desc: "Enterprise software & e-commerce platforms", icon: Briefcase, type: "work" },
  { year: "2022", title: "Tech Lead Certification", desc: "Advanced cloud architecture & DevOps", icon: Award, type: "education" },
  { year: "2021", title: "Full-Stack Developer", desc: "Web applications & API development", icon: Code, type: "work" },
  { year: "2020", title: "Computer Science Degree", desc: "BSc in Software Engineering", icon: GraduationCap, type: "education" },
]

// ─── Floating Code Animation ───────────────────────────────────────────────────
const CODE_SNIPPETS = [
  { code: "<?php namespace App\\Http;", lang: "php", color: "#f97316" },
  { code: "use Illuminate\\Support\\Facades;", lang: "php", color: "#fb923c" },
  { code: "Route::get('/api', fn() => response());", lang: "php", color: "#fdba74" },
  { code: "const bot = new WebmanAI();", lang: "ts", color: "#22d3ee" },
  { code: "export async function POST(req) {", lang: "ts", color: "#67e8f9" },
  { code: "  return Response.json(data);", lang: "ts", color: "#a5f3fc" },
  { code: "SELECT * FROM users WHERE active = 1;", lang: "sql", color: "#a78bfa" },
  { code: "INSERT INTO orders (user_id, total)", lang: "sql", color: "#c4b5fd" },
  { code: "JOIN payments p ON o.id = p.order_id", lang: "sql", color: "#ddd6fe" },
  { code: "public class WebmanService {", lang: "c#", color: "#4ade80" },
  { code: "  private readonly IBot _bot;", lang: "c#", color: "#86efac" },
  { code: "  public async Task<Result> Run()", lang: "c#", color: "#bbf7d0" },
  { code: "import { useEffect, useState }", lang: "react", color: "#60a5fa" },
  { code: "function analyze(data: Dataset) {", lang: "ts", color: "#93c5fd" },
  { code: "model.fit(X_train, y_train)", lang: "python", color: "#fbbf24" },
  { code: "def predict(self, data):", lang: "python", color: "#fcd34d" },
]

function FloatingCodeBackground({ isDark }: { isDark: boolean }) {
  const [codeLines, setCodeLines] = useState<Array<{
    id: number
    snippet: typeof CODE_SNIPPETS[0]
    x: number
    y: number
    speed: number
    opacity: number
    scale: number
  }>>([])

  useEffect(() => {
    const lines = Array.from({ length: 16 }, (_, i) => ({
      id: i,
      snippet: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      x: Math.random() * 90,
      y: Math.random() * 100,
      speed: 0.012 + Math.random() * 0.02,
      opacity: isDark ? 0.06 + Math.random() * 0.08 : 0.04 + Math.random() * 0.06,
      scale: 0.85 + Math.random() * 0.25,
    }))
    setCodeLines(lines)

    const interval = setInterval(() => {
      setCodeLines(prev => prev.map(line => ({
        ...line,
        y: line.y >= 102 ? -8 : line.y + line.speed,
        snippet: line.y >= 102 ? CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)] : line.snippet,
        x: line.y >= 102 ? Math.random() * 90 : line.x,
      })))
    }, 80)

    return () => clearInterval(interval)
  }, [isDark])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {codeLines.map(line => (
        <div
          key={line.id}
          className="absolute whitespace-nowrap font-mono text-[8px] sm:text-[9px] md:text-[10px]"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            color: line.snippet.color,
            opacity: line.opacity,
            transform: `scale(${line.scale})`,
            textShadow: `0 0 20px ${line.snippet.color}25`,
            transition: "top 80ms linear",
          }}
        >
          <span className="mr-1.5 rounded px-1 py-0.5 text-[7px] uppercase" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)", color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)" }}>
            {line.snippet.lang}
          </span>
          {line.snippet.code}
        </div>
      ))}
    </div>
  )
}

// ─── Splash Screen ─────────────────────────────────────────────────────────────
const LARAVEL_LINES = [
  { t: "<?php", c: "#f97316" },
  { t: "", c: "" },
  { t: "namespace App\\Console\\Commands;", c: "#c4b5fd" },
  { t: "", c: "" },
  { t: "use Illuminate\\Console\\Command;", c: "#60a5fa" },
  { t: "", c: "" },
  { t: "class BootWebman extends Command", c: "#a78bfa" },
  { t: "{", c: "#94a3b8" },
  { t: "    protected $signature = 'webman:boot';", c: "#22d3ee" },
  { t: "", c: "" },
  { t: "    public function handle()", c: "#4ade80" },
  { t: "    {", c: "#94a3b8" },
  { t: "        $this->info('Initializing Webman...');", c: "#fbbf24" },
  { t: "        sleep(1);", c: "#64748b" },
  { t: "        return 'WEBMAN';", c: "#f472b6" },
  { t: "    }", c: "#94a3b8" },
  { t: "}", c: "#a78bfa" },
]

function SplashScreen({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"typing" | "name" | "fadeout">("typing")
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= LARAVEL_LINES.length) {
        clearInterval(interval)
        setTimeout(() => setPhase("name"), 400)
        setTimeout(() => setPhase("fadeout"), 2600)
        setTimeout(() => onDone(), 3200)
      }
    }, 75)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ 
        opacity: phase === "fadeout" ? 0 : 1, 
        transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)"
      }}
      role="dialog"
      aria-label="Loading"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      {phase === "typing" && (
        <div className="relative z-10 w-full max-w-lg px-4">
          <div
            className="overflow-hidden rounded-2xl shadow-2xl"
            style={{
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
            }}
          >
            <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}>
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-3 font-mono text-[10px] text-white/35 sm:text-xs">php artisan webman:boot</span>
            </div>
            <div className="p-5 font-mono text-[11px] leading-[1.8] sm:text-xs sm:p-6">
              {LARAVEL_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} style={{ color: line.c || "transparent" }}>{line.t || "\u00A0"}</div>
              ))}
              {visibleLines < LARAVEL_LINES.length && (
                <span className="inline-block h-4 w-2 align-middle" style={{ background: "#60a5fa", animation: "blink 0.8s step-end infinite" }} />
              )}
            </div>
          </div>
        </div>
      )}

      {phase === "name" && (
        <div className="relative z-10 text-center px-4" style={{ animation: "fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both" }}>
          <h1
            className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text font-mono font-extralight tracking-[0.5em] text-transparent"
            style={{ fontSize: "clamp(2rem, 10vw, 7rem)", paddingLeft: "0.5em", animation: "glow 2s ease-in-out infinite" }}
          >
            WEBMAN
          </h1>
          <div className="mt-5 h-px w-28 mx-auto" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)" }} />
          <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-white/30 sm:text-xs uppercase">by WeKnow Solutions</p>
        </div>
      )}
    </div>
  )
}

// ─── Skills Visualization ──────────────────────────────────────────────────────
function SkillsSection({ isDark }: { isDark: boolean }) {
  const [animated, setAnimated] = useState(false)
  useEffect(() => { const t = setTimeout(() => setAnimated(true), 300); return () => clearTimeout(t) }, [])

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      {SKILLS.map((skill, i) => (
        <div 
          key={skill.name} 
          className="group rounded-xl p-3 sm:p-4 transition-all duration-300 hover:scale-[1.02]"
          style={{ 
            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)", 
            border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
            animation: `fadeUp 0.4s ease ${i * 0.08}s both`
          }}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className={`text-xs font-medium sm:text-sm ${isDark ? "text-white/70" : "text-slate-700"}`}>{skill.name}</span>
            <span className={`text-[10px] font-semibold sm:text-xs ${isDark ? "text-white/50" : "text-slate-500"}`}>{skill.level}%</span>
          </div>
          <div className={`h-2 overflow-hidden rounded-full ${isDark ? "bg-white/5" : "bg-slate-200"}`}>
            <div
              className={`h-full rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
              style={{ width: animated ? `${skill.level}%` : "0%", transitionDelay: `${i * 100}ms` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Interactive Timeline ──────────────────────────────────────────────────────
function TimelineSection({ isDark }: { isDark: boolean }) {
  const [activeIdx, setActiveIdx] = useState(0)

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className={`absolute left-4 top-0 bottom-0 w-px sm:left-6 ${isDark ? "bg-white/10" : "bg-slate-200"}`} />
      
      <div className="space-y-4 sm:space-y-5">
        {TIMELINE.map((item, i) => {
          const Icon = item.icon
          const isActive = activeIdx === i
          return (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              className={`relative flex w-full items-start gap-4 text-left transition-all duration-300 sm:gap-5 ${isActive ? "scale-[1.01]" : "opacity-70 hover:opacity-90"}`}
              style={{ animation: `fadeUp 0.4s ease ${i * 0.1}s both` }}
            >
              {/* Timeline dot */}
              <div 
                className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-12 sm:w-12 ${
                  isActive 
                    ? item.type === "work" ? "bg-blue-500 shadow-lg shadow-blue-500/30" : "bg-violet-500 shadow-lg shadow-violet-500/30"
                    : isDark ? "bg-slate-800" : "bg-slate-100"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 sm:h-5 sm:w-5 ${isActive ? "text-white" : isDark ? "text-white/40" : "text-slate-400"}`} />
              </div>
              
              {/* Content */}
              <div 
                className="flex-1 rounded-xl p-3 transition-all duration-300 sm:p-4"
                style={{ 
                  background: isActive 
                    ? isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"
                    : "transparent",
                  border: `1px solid ${isActive ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)") : "transparent"}`
                }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider sm:text-xs ${
                    item.type === "work" ? "text-blue-400" : "text-violet-400"
                  }`}>
                    {item.year}
                  </span>
                  <span className={`rounded-full px-2 py-0.5 text-[8px] uppercase sm:text-[9px] ${
                    item.type === "work" 
                      ? isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-100 text-blue-600"
                      : isDark ? "bg-violet-500/10 text-violet-400" : "bg-violet-100 text-violet-600"
                  }`}>
                    {item.type}
                  </span>
                </div>
                <h4 className={`text-sm font-medium sm:text-base ${isDark ? "text-white/85" : "text-slate-800"}`}>{item.title}</h4>
                <p className={`mt-1 text-[11px] sm:text-xs ${isDark ? "text-white/40" : "text-slate-500"}`}>{item.desc}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── WhatsApp Chatbot Demo ─────────────────────────────────────────────────────
function ChatbotDemo() {
  const [messages, setMessages] = useState<Array<{ from: "user" | "bot"; text: string; isMenu?: boolean }>>([
    { from: "bot", text: "Hello! I'm Webman, your AI assistant. How can I help you today?" }
  ])
  const [inputVal, setInputVal] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [messages, isTyping])

  const handleSend = () => {
    if (!inputVal.trim()) return
    const userMsg = inputVal.trim()
    setInputVal("")
    setMessages(prev => [...prev, { from: "user", text: userMsg }])
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [
        ...prev, 
        { from: "bot", text: "Your request has been noted, kindly send a message to Webman directly for immediate assistance." },
        { from: "bot", text: "Would you like to chat with us on WhatsApp?", isMenu: true }
      ])
    }, 1500)
  }

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Webman, I need assistance.")}`, "_blank")
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex items-center gap-3 px-3 py-2.5 sm:px-4 sm:py-3" style={{ background: "linear-gradient(135deg, #075e54 0%, #128c7e 100%)" }}>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm sm:h-10 sm:w-10">
          <Bot className="h-4 w-4 text-white sm:h-5 sm:w-5" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold text-white sm:text-sm">Webman AI</div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[9px] text-white/70 sm:text-[10px]">online</span>
          </div>
        </div>
        <Phone className="h-4 w-4 text-white/60" />
      </div>
      
      <div
        className="flex-1 space-y-2 overflow-y-auto p-3 sm:space-y-2.5 sm:p-4"
        style={{ backgroundColor: "#0b141a", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E\")" }}
      >
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`} style={{ animation: "fadeUp 0.3s ease both" }}>
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 text-xs shadow-md sm:rounded-xl sm:px-3.5 sm:py-2.5 sm:text-[13px] ${m.from === "user" ? "rounded-br-sm text-white" : "rounded-bl-sm text-white/90"}`}
              style={{ background: m.from === "user" ? "#005c4b" : "#202c33" }}
            >
              {m.text}
              {m.isMenu && (
                <button
                  onClick={openWhatsApp}
                  className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg py-2 text-[11px] font-medium text-white transition-all hover:opacity-90 sm:py-2.5 sm:text-xs"
                  style={{ background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)" }}
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Chat on WhatsApp
                </button>
              )}
              <div className="mt-1 flex items-center justify-end gap-1 sm:mt-1.5">
                <span className="text-[8px] text-white/30 sm:text-[9px]">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                {m.from === "user" && <Check className="h-2.5 w-2.5 text-cyan-400 sm:h-3 sm:w-3" />}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start" style={{ animation: "fadeUp 0.3s ease both" }}>
            <div className="rounded-lg rounded-bl-sm px-3 py-2.5 sm:rounded-xl sm:px-4 sm:py-3" style={{ background: "#202c33" }}>
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/40" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/40" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white/40" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>
      
      <div className="flex items-center gap-2 px-2.5 py-2.5 sm:gap-2.5 sm:px-3 sm:py-3" style={{ background: "#202c33" }}>
        <input
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          aria-label="Message input"
          className="flex-1 rounded-full px-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 sm:px-4 sm:py-2.5 sm:text-sm"
          style={{ background: "#2a3942" }}
        />
        <button 
          onClick={handleSend}
          disabled={!inputVal.trim()}
          aria-label="Send message"
          className="flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 disabled:opacity-40 sm:h-10 sm:w-10" 
          style={{ background: "linear-gradient(135deg, #00a884 0%, #008f72 100%)" }}
        >
          <Send className="h-4 w-4 text-white" />
        </button>
      </div>
    </div>
  )
}

// ─── Analytics Demo ────────────────────────────────────────────────────────────
function AnalyticsDemo() {
  const [tick, setTick] = useState(0)
  const bars = [65, 80, 45, 90, 70, 55, 88, 72, 60, 95, 78, 83]
  useEffect(() => { const i = setInterval(() => setTick(p => p + 1), 1800); return () => clearInterval(i) }, [])
  
  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:gap-4 sm:p-5">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[{ l: "Revenue", v: "$128K", c: "from-blue-500/20 to-cyan-500/20" }, { l: "Users", v: "14.2K", c: "from-violet-500/20 to-purple-500/20" }, { l: "Growth", v: "+24%", c: "from-emerald-500/20 to-teal-500/20" }].map(s => (
          <div key={s.l} className="rounded-xl p-3 text-center transition-all duration-300 hover:scale-[1.02]" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="text-base font-semibold text-white/80 sm:text-lg">{s.v}</div>
            <div className="text-[9px] text-white/35 mt-0.5 sm:text-[10px]">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl p-3 sm:p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="mb-3 flex items-center justify-between sm:mb-4">
          <span className="text-[10px] text-white/40 sm:text-[11px]">Monthly Revenue</span>
          <span className="text-[9px] text-emerald-400/70 sm:text-[10px]">+12.5%</span>
        </div>
        <div className="flex h-24 items-end gap-1 sm:h-32 sm:gap-1.5">
          {bars.map((b, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-all duration-1000"
              style={{ height: `${Math.min(b + (tick % 3) * 4 * (i % 2 === 0 ? 1 : -1), 100)}%`, background: `linear-gradient(to top, hsl(${200 + i * 10}, 70%, 45%), hsl(${200 + i * 10}, 60%, 60%))`, opacity: 0.8 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── E-Commerce Demo ───────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "AirPods Pro", price: "$249", img: "🎧" },
  { name: "Smart Watch", price: "$399", img: "⌚" },
  { name: "MacBook Air", price: "$1,299", img: "💻" },
  { name: "iPhone 15", price: "$799", img: "📱" },
]

function EcommerceDemo() {
  const [cart, setCart] = useState<string[]>([])
  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:gap-4 sm:p-5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/40 sm:text-xs">Products</span>
        <div className="flex items-center gap-2 rounded-full px-2.5 py-1 text-[10px] text-white/50 sm:px-3 sm:py-1.5 sm:text-xs" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <ShoppingCart className="h-3 w-3" />
          <span>{cart.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {PRODUCTS.map(p => (
          <div key={p.name} className="rounded-xl p-3 transition-all duration-200 hover:scale-[1.02]" style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg text-xl sm:mb-3 sm:h-12 sm:w-12 sm:text-2xl" style={{ background: "rgba(255,255,255,0.04)" }}>{p.img}</div>
            <div className="mb-0.5 text-[10px] font-medium text-white/70 sm:text-xs">{p.name}</div>
            <div className="mb-2 text-[9px] text-white/40 sm:mb-3 sm:text-xs">{p.price}</div>
            <button
              onClick={() => { if (!cart.includes(p.name)) setCart(c => [...c, p.name]) }}
              className="w-full rounded-lg py-1.5 text-[9px] font-medium transition-all duration-200 sm:py-2 sm:text-[10px]"
              style={{ background: cart.includes(p.name) ? "rgba(255,255,255,0.03)" : "rgba(99,102,241,0.12)", color: cart.includes(p.name) ? "rgba(255,255,255,0.35)" : "rgba(165,180,252,0.9)", border: `1px solid ${cart.includes(p.name) ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.2)"}` }}
            >
              {cart.includes(p.name) ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Custom Software Demo ──────────────────────────────────────────────────────
const SW_LINES = [
  { t: "class WeKnowApp {", c: "#c4b5fd" },
  { t: "  modules = ['Auth', 'API', 'ML'];", c: "#94a3b8" },
  { t: "  async boot() {", c: "#6ee7b7" },
  { t: "    await this.loadModules();", c: "#94a3b8" },
  { t: "    this.startServer(3000);", c: "#67e8f9" },
  { t: "  }", c: "#6ee7b7" },
  { t: "}", c: "#c4b5fd" },
]

function SoftwareDemo() {
  const [typed, setTyped] = useState(0)
  const [output, setOutput] = useState<string[]>([])
  
  useEffect(() => { let i = 0; const t = setInterval(() => { i++; setTyped(i); if (i >= SW_LINES.length) clearInterval(t) }, 200); return () => clearInterval(t) }, [])
  
  const run = () => {
    setOutput([])
    const logs = ["> Loading modules...", "> Auth: OK", "> API: OK", "> ML: Ready", "> Server running on :3000"]
    logs.forEach((l, i) => setTimeout(() => setOutput(p => [...p, l]), i * 300))
  }
  
  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:gap-4 sm:p-5">
      <div className="flex-1 overflow-hidden rounded-xl" style={{ background: "rgba(3,7,18,0.8)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-2 border-b px-3 py-2.5 sm:px-4 sm:py-3" style={{ borderColor: "rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.02)" }}>
          <div className="h-2 w-2 rounded-full bg-red-500/70 sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/70 sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-full bg-green-500/70 sm:h-2.5 sm:w-2.5" />
          <span className="ml-2 font-mono text-[9px] text-white/30 sm:ml-3 sm:text-[10px]">app.ts</span>
        </div>
        <div className="p-3 font-mono text-[10px] leading-relaxed sm:p-4 sm:text-[11px]">
          {SW_LINES.slice(0, typed).map((l, i) => <div key={i} style={{ color: l.c }}>{l.t}</div>)}
        </div>
      </div>
      {output.length > 0 && (
        <div className="rounded-xl p-2.5 font-mono text-[9px] sm:p-3.5 sm:text-[10px]" style={{ background: "rgba(6,78,59,0.15)", border: "1px solid rgba(52,211,153,0.15)" }}>
          {output.map((l, i) => <div key={i} className="text-emerald-400/80">{l}</div>)}
        </div>
      )}
      <button onClick={run} disabled={typed < SW_LINES.length} className="rounded-xl py-2.5 text-[10px] font-medium text-white/55 transition-all duration-200 hover:text-white/75 disabled:opacity-30 sm:py-3 sm:text-xs" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.15)" }}>
        Run Code
      </button>
    </div>
  )
}

// ─── Game Demo ─────────────────────────────────────────────────────────────────
function GameDemo() {
  const [score, setScore] = useState(0)
  const [active, setActive] = useState(false)
  const start = () => { setActive(true); setScore(0) }
  const hit = () => { if (active) setScore(s => s + 10) }
  useEffect(() => { if (!active) return; const t = setTimeout(() => setActive(false), 5000); return () => clearTimeout(t) }, [active])
  
  return (
    <div className="flex h-full flex-col gap-3 p-4 sm:gap-4 sm:p-5">
      <div className="flex items-center justify-between text-[10px] sm:text-xs">
        <span className="text-white/40">Tap Game</span>
        <span className="rounded-full px-2.5 py-1 text-white/60 sm:px-3" style={{ background: "rgba(255,255,255,0.05)" }}>Score: {score}</span>
      </div>
      <div className="relative flex-1 cursor-pointer overflow-hidden rounded-xl transition-all" onClick={hit} style={{ background: "rgba(3,7,18,0.8)", border: "1px solid rgba(255,255,255,0.05)" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute h-2 w-2 rounded-full bg-white/[0.06]" style={{ left: `${(i * 37 + 13) % 85 + 5}%`, top: `${(i * 53 + 7) % 75 + 10}%` }} />
        ))}
        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 sm:gap-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}>
            {score > 0 && <div className="text-base font-medium text-white/60 sm:text-lg">Score: {score}</div>}
            <button onClick={e => { e.stopPropagation(); start() }} className="rounded-full px-6 py-2.5 text-xs font-medium text-white/70 transition-all duration-200 hover:scale-105 sm:px-8 sm:py-3 sm:text-sm" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
              {score > 0 ? "Play Again" : "Play"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  { key: "AI Chatbots", icon: Bot, desc: "WhatsApp bots" },
  { key: "Analytics", icon: BarChart3, desc: "Dashboards" },
  { key: "E-Commerce", icon: ShoppingCart, desc: "Online stores" },
  { key: "Software", icon: Code, desc: "Custom apps" },
  { key: "Games", icon: Gamepad2, desc: "Game dev" },
]

// ─── Glass styles ──────────────────────────────────────────────────────────────
const getGlass = (isDark: boolean) => ({
  card: { 
    background: isDark ? "rgba(15,23,42,0.6)" : "rgba(255,255,255,0.7)", 
    backdropFilter: "blur(20px)", 
    WebkitBackdropFilter: "blur(20px)", 
    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
    boxShadow: isDark ? "0 4px 24px rgba(0,0,0,0.2)" : "0 4px 24px rgba(0,0,0,0.06)"
  } as React.CSSProperties,
  nav: { 
    background: isDark ? "rgba(3,7,18,0.75)" : "rgba(255,255,255,0.8)", 
    backdropFilter: "blur(24px)", 
    WebkitBackdropFilter: "blur(24px)", 
    borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}`,
  } as React.CSSProperties,
  sidebar: { 
    background: isDark ? "rgba(5,12,26,0.95)" : "rgba(255,255,255,0.95)", 
    backdropFilter: "blur(32px)", 
    WebkitBackdropFilter: "blur(32px)", 
    borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}` 
  } as React.CSSProperties,
  input: { 
    background: isDark ? "rgba(3,7,18,0.6)" : "rgba(0,0,0,0.03)", 
    backdropFilter: "blur(16px)", 
    WebkitBackdropFilter: "blur(16px)", 
    border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}` 
  } as React.CSSProperties,
  btn: { 
    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", 
    backdropFilter: "blur(16px)", 
    WebkitBackdropFilter: "blur(16px)", 
    border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}` 
  } as React.CSSProperties,
})

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [splashDone, setSplashDone] = useState(false)
  const [section, setSection] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [msg, setMsg] = useState("")
  const [selectedSvc, setSelectedSvc] = useState("AI Chatbots")
  const [isDark, setIsDark] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  const glass = getGlass(isDark)
  const navItems = ["Home", "Services", "Contact"]

  const filteredServices = SERVICES.filter(s => 
    s.key.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const goTo = useCallback((i: number) => {
    if (!containerRef.current || i < 0 || i >= 3) return
    containerRef.current.scrollTo({ left: containerRef.current.offsetWidth * i, behavior: "smooth" })
    setSection(i)
    setSidebarOpen(false)
  }, [])

  const sendWA = () => {
    if (!msg.trim()) return
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
    setMsg("")
    setChatOpen(false)
  }

  const downloadCV = () => {
    // In production, this would link to actual CV file
    alert("CV download will be available soon!")
  }

  useEffect(() => {
    if (!splashDone) return
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft = 0
        setSection(0)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [splashDone])

  const renderDemo = (k: string) => {
    switch (k) {
      case "AI Chatbots": return <ChatbotDemo />
      case "Analytics": return <AnalyticsDemo />
      case "E-Commerce": return <EcommerceDemo />
      case "Software": return <SoftwareDemo />
      case "Games": return <GameDemo />
      default: return null
    }
  }

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      <main
        className="relative h-screen w-full overflow-hidden transition-colors duration-500"
        style={{ 
          opacity: splashDone ? 1 : 0, 
          transition: "opacity 0.6s ease 0.1s, background 0.5s ease",
          background: isDark 
            ? "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)"
            : "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f8fafc 100%)"
        }}
      >
        <FloatingCodeBackground isDark={isDark} />

        {/* Ambient glow */}
        <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
          <div className={`absolute left-1/4 top-1/4 h-[400px] w-[400px] rounded-full blur-[120px] transition-colors duration-500 ${isDark ? "bg-blue-600/[0.04]" : "bg-blue-400/[0.08]"}`} />
          <div className={`absolute bottom-1/4 right-1/4 h-[350px] w-[350px] rounded-full blur-[100px] transition-colors duration-500 ${isDark ? "bg-violet-600/[0.03]" : "bg-violet-400/[0.06]"}`} />
        </div>

        {/* Keyframes */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          @keyframes glow { 0%,100%{filter:drop-shadow(0 0 40px rgba(59,130,246,0.25))} 50%{filter:drop-shadow(0 0 80px rgba(139,92,246,0.35))} }
          @keyframes slideIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }
          @keyframes fadeIn { from{opacity:0} to{opacity:1} }
          @keyframes sideStagger { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
          ::-webkit-scrollbar { display: none; }
          * { -ms-overflow-style: none; scrollbar-width: none; }
        `}} />

        {/* Nav */}
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 md:px-8 lg:px-12" style={glass.nav} role="navigation" aria-label="Main navigation">
          <button onClick={() => goTo(0)} className="flex items-center gap-2.5 transition-all duration-200 hover:opacity-80" aria-label="Go to home">
            <Image src="/weknow-logo.png" alt="WeKnow Solutions" width={40} height={40} className="h-8 w-auto sm:h-9" priority />
          </button>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navItems.map((item, i) => (
              <button
                key={item}
                onClick={() => goTo(i)}
                className={`relative text-sm font-medium transition-all duration-200 ${section === i ? (isDark ? "text-white/90" : "text-slate-900") : (isDark ? "text-white/40 hover:text-white/65" : "text-slate-500 hover:text-slate-700")}`}
                aria-current={section === i ? "page" : undefined}
              >
                {item}
                {section === i && <span className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${isDark ? "bg-white/50" : "bg-slate-900/50"}`} />}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark/Light mode toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 sm:h-10 sm:w-10"
              style={glass.btn}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            </button>

            <button
              onClick={() => goTo(2)}
              className={`hidden items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all duration-200 hover:scale-[1.02] md:flex lg:px-5 lg:py-2.5 ${isDark ? "text-white/70 hover:text-white/90" : "text-slate-700 hover:text-slate-900"}`}
              style={glass.btn}
            >
              Book a Service
            </button>

            <button
              onClick={() => setSidebarOpen(true)}
              className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 hover:scale-105 md:hidden sm:h-10 sm:w-10 ${isDark ? "text-white/50" : "text-slate-600"}`}
              style={glass.btn}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <div
              className="absolute inset-0"
              onClick={() => setSidebarOpen(false)}
              style={{ animation: "fadeIn 0.2s ease both", background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}
            />
            <div className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw]" style={{ ...glass.sidebar, animation: "slideIn 0.3s cubic-bezier(0.16,1,0.3,1) both" }}>
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}` }}>
                <Image src="/weknow-logo.png" alt="WeKnow Solutions" width={32} height={32} className="h-7 w-auto" />
                <button onClick={() => setSidebarOpen(false)} className={`flex h-8 w-8 items-center justify-center rounded-lg ${isDark ? "text-white/45 hover:text-white/70" : "text-slate-500 hover:text-slate-700"}`} style={glass.btn} aria-label="Close menu">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col gap-1 p-4">
                {navItems.map((item, i) => (
                  <button
                    key={item}
                    onClick={() => goTo(i)}
                    className={`w-full rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${section === i ? (isDark ? "bg-white/5 text-white/80" : "bg-slate-100 text-slate-900") : (isDark ? "text-white/40 hover:text-white/60" : "text-slate-500 hover:text-slate-700")}`}
                    style={{ animation: `sideStagger 0.3s ease ${i * 0.05 + 0.1}s both` }}
                  >
                    {item}
                  </button>
                ))}
                
                {/* Dark mode toggle in sidebar */}
                <button
                  onClick={() => setIsDark(!isDark)}
                  className={`mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${isDark ? "text-white/40 hover:text-white/60" : "text-slate-500 hover:text-slate-700"}`}
                  style={{ animation: "sideStagger 0.3s ease 0.25s both" }}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {isDark ? "Light Mode" : "Dark Mode"}
                </button>

                <button
                  onClick={downloadCV}
                  className={`mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all duration-200 ${isDark ? "text-white/40 hover:text-white/60" : "text-slate-500 hover:text-slate-700"}`}
                  style={{ animation: "sideStagger 0.3s ease 0.3s both" }}
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </button>
              </div>
              <div className={`absolute bottom-6 left-0 right-0 px-5 space-y-1 ${isDark ? "text-white/25" : "text-slate-400"}`}>
                <div className="text-[10px]">{EMAIL}</div>
                <div className="text-[10px]">{PHONE}</div>
              </div>
            </div>
          </div>
        )}

        {/* Horizontal Scroll Container */}
        <div ref={containerRef} className="relative z-[2] flex h-full overflow-x-auto overflow-y-hidden scroll-smooth" style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}>
          
          {/* HOME */}
          <section className="relative flex min-h-screen w-screen shrink-0 snap-start snap-always flex-col justify-center px-4 pt-16 sm:px-6 sm:pt-20 md:px-8 lg:px-12" aria-label="Home section">
            <div className="relative z-10 max-w-xl lg:max-w-2xl xl:max-w-3xl">
              {/* Status badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 sm:mb-5 sm:px-4 sm:py-2" style={glass.card}>
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className={`text-[10px] font-medium tracking-wide sm:text-xs ${isDark ? "text-white/50" : "text-slate-600"}`}>Available for projects</span>
              </div>

              <h1 className={`mb-4 text-3xl font-extralight leading-[1.1] tracking-tight sm:mb-5 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${isDark ? "text-white/95" : "text-slate-900"}`}>
                Building the Future
                <br />
                <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">with Code.</span>
              </h1>

              <p className={`mb-6 max-w-md text-sm leading-relaxed sm:mb-8 sm:text-base md:max-w-lg md:text-lg ${isDark ? "text-white/40" : "text-slate-600"}`}>
                We craft AI-powered solutions, scalable platforms, and innovative software that transforms businesses and drives growth.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button
                  onClick={() => goTo(2)}
                  className={`flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02] sm:px-8 sm:py-3.5 ${isDark ? "text-white/85" : "text-white"}`}
                  style={{ background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)", boxShadow: "0 4px 20px rgba(99,102,241,0.3)" }}
                >
                  Book a Service
                </button>
                <button
                  onClick={downloadCV}
                  className={`flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.02] sm:px-8 sm:py-3.5 ${isDark ? "text-white/50 hover:text-white/70" : "text-slate-600 hover:text-slate-800"}`}
                  style={glass.btn}
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </button>
              </div>

              {/* Skills Preview */}
              <div className="mt-8 sm:mt-10 md:mt-12">
                <h3 className={`mb-4 text-xs font-medium uppercase tracking-wider sm:text-sm ${isDark ? "text-white/30" : "text-slate-500"}`}>Tech Stack</h3>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {["Laravel", "React", "Python", "SQL", "C#", "AI/ML", "Next.js", "TypeScript"].map(t => (
                    <span 
                      key={t} 
                      className={`rounded-full px-3 py-1.5 text-[10px] font-medium tracking-wide transition-all duration-200 hover:scale-105 sm:px-4 sm:py-2 sm:text-xs ${isDark ? "text-white/40 hover:text-white/60" : "text-slate-600 hover:text-slate-800"}`}
                      style={glass.card}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Skills & Timeline */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 md:mt-12 lg:grid-cols-2 lg:gap-8">
                <div>
                  <h3 className={`mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider sm:text-sm ${isDark ? "text-white/30" : "text-slate-500"}`}>
                    <Sparkles className="h-3.5 w-3.5" /> Skills
                  </h3>
                  <SkillsSection isDark={isDark} />
                </div>
                <div className="hidden lg:block">
                  <h3 className={`mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider sm:text-sm ${isDark ? "text-white/30" : "text-slate-500"}`}>
                    <Briefcase className="h-3.5 w-3.5" /> Journey
                  </h3>
                  <TimelineSection isDark={isDark} />
                </div>
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section className="flex min-h-screen w-screen shrink-0 snap-start snap-always items-center px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-0 lg:px-12" aria-label="Services section">
            <div className="relative z-10 mx-auto w-full max-w-5xl">
              <div className="mb-5 sm:mb-7">
                <h2 className={`mb-2 text-xl font-extralight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl ${isDark ? "text-white/90" : "text-slate-900"}`}>Our Services</h2>
                <p className={`text-xs sm:text-sm ${isDark ? "text-white/35" : "text-slate-500"}`}>Click a service to explore the interactive demo</p>
              </div>

              {/* Search */}
              <div className="mb-4 sm:mb-5">
                <div className="relative max-w-xs">
                  <Search className={`absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${isDark ? "text-white/30" : "text-slate-400"}`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search services..."
                    aria-label="Search services"
                    className={`w-full rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 sm:text-sm ${isDark ? "text-white/80 placeholder:text-white/25 focus:ring-white/20" : "text-slate-800 placeholder:text-slate-400 focus:ring-slate-300"}`}
                    style={glass.input}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
                {/* Service list */}
                <div className="grid grid-cols-5 gap-1.5 sm:flex sm:gap-2 sm:overflow-x-auto sm:pb-2 lg:w-52 lg:shrink-0 lg:flex-col lg:gap-1.5 lg:overflow-visible lg:pb-0 xl:w-56">
                  {filteredServices.map(s => {
                    const Icon = s.icon
                    const active = selectedSvc === s.key
                    return (
                      <button
                        key={s.key}
                        onClick={() => setSelectedSvc(s.key)}
                        className="flex flex-col items-center gap-1 rounded-xl px-1.5 py-2.5 transition-all duration-200 hover:scale-[1.02] sm:flex-row sm:gap-2.5 sm:px-3 sm:py-2.5 lg:w-full lg:py-3"
                        style={active ? { ...glass.card, border: `1px solid ${isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"}` } : { border: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"}`, background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}
                        aria-pressed={active}
                      >
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 sm:h-9 sm:w-9"
                          style={{ background: active ? (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)") : (isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)") }}
                        >
                          <Icon className={`h-3.5 w-3.5 transition-colors duration-200 sm:h-4 sm:w-4 ${active ? (isDark ? "text-white/70" : "text-slate-700") : (isDark ? "text-white/30" : "text-slate-400")}`} />
                        </div>
                        <div className="text-center sm:text-left">
                          <div className={`text-[8px] font-medium leading-tight transition-colors duration-200 sm:text-[10px] lg:text-xs ${active ? (isDark ? "text-white/80" : "text-slate-800") : (isDark ? "text-white/40" : "text-slate-500")}`}>
                            <span className="sm:hidden">{s.key.split(" ")[0]}</span>
                            <span className="hidden sm:inline">{s.key}</span>
                          </div>
                          <div className={`hidden text-[9px] lg:block ${isDark ? "text-white/25" : "text-slate-400"}`}>{s.desc}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Demo panel */}
                <div className="flex-1 overflow-hidden rounded-2xl" style={{ ...glass.card, minHeight: 300 }}>
                  {renderDemo(selectedSvc)}
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="flex min-h-screen w-screen shrink-0 snap-start snap-always items-center px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-0 lg:px-12" aria-label="Contact section">
            <div className="relative z-10 mx-auto w-full max-w-sm sm:max-w-md">
              <div className="mb-6 text-center sm:mb-8">
                <h2 className={`mb-2 text-xl font-extralight tracking-tight sm:text-2xl md:text-3xl lg:text-4xl ${isDark ? "text-white/90" : "text-slate-900"}`}>Get in Touch</h2>
                <p className={`text-xs sm:text-sm ${isDark ? "text-white/35" : "text-slate-500"}`}>Let&apos;s build something amazing together</p>
              </div>

              <div className="mb-4 grid grid-cols-3 gap-2 sm:mb-5 sm:gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-all duration-200 hover:scale-[1.02] sm:p-4"
                  style={glass.card}
                  aria-label="Send email"
                >
                  <Mail className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className={`text-[10px] font-medium sm:text-xs ${isDark ? "text-white/60" : "text-slate-700"}`}>Email</div>
                  </div>
                </a>
                <a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  className="flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-all duration-200 hover:scale-[1.02] sm:p-4"
                  style={glass.card}
                  aria-label="Call us"
                >
                  <Phone className="h-5 w-5 text-cyan-400" />
                  <div>
                    <div className={`text-[10px] font-medium sm:text-xs ${isDark ? "text-white/60" : "text-slate-700"}`}>Call</div>
                  </div>
                </a>
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-all duration-200 hover:scale-[1.02] sm:p-4"
                  style={glass.card}
                  aria-label="Open WhatsApp chat"
                >
                  <MessageCircle className="h-5 w-5 text-emerald-400" />
                  <div>
                    <div className={`text-[10px] font-medium sm:text-xs ${isDark ? "text-white/60" : "text-slate-700"}`}>Chat</div>
                  </div>
                </button>
              </div>

              <div className="rounded-2xl p-4 sm:p-5" style={glass.card}>
                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="Tell us about your project..."
                  aria-label="Project description"
                  className={`mb-3 h-28 w-full resize-none rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 sm:mb-4 sm:h-32 ${isDark ? "text-white/80 placeholder:text-white/25 focus:ring-white/15" : "text-slate-800 placeholder:text-slate-400 focus:ring-slate-300"}`}
                  style={glass.input}
                />
                <button
                  onClick={sendWA}
                  disabled={!msg.trim()}
                  className={`w-full rounded-xl py-3 text-sm font-medium transition-all duration-200 hover:scale-[1.01] disabled:opacity-30 ${isDark ? "text-white/55 hover:text-white/75" : "text-slate-600 hover:text-slate-800"}`}
                  style={glass.btn}
                >
                  Send via WhatsApp
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Section indicators */}
        <div className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2.5 sm:bottom-7" role="tablist" aria-label="Page sections">
          {navItems.map((name, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{ height: 6, width: section === i ? 28 : 6, background: section === i ? "linear-gradient(90deg, #3b82f6, #8b5cf6)" : (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)") }}
              role="tab"
              aria-selected={section === i}
              aria-label={name}
            />
          ))}
        </div>

        {/* WhatsApp Chat Widget */}
        {chatOpen && (
          <div
            className="fixed bottom-20 left-3 right-3 z-50 overflow-hidden rounded-2xl shadow-2xl sm:bottom-24 sm:left-auto sm:right-5 sm:w-80"
            style={{ ...glass.sidebar, animation: "fadeUp 0.3s cubic-bezier(0.16,1,0.3,1) both", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            role="dialog"
            aria-label="WhatsApp chat"
          >
            <div className="flex items-center justify-between px-4 py-3" style={{ background: "linear-gradient(135deg, #075e54 0%, #128c7e 100%)" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">WeKnow Solutions</div>
                  <div className="text-[10px] text-white/60">Typically replies instantly</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="rounded-full p-1.5 hover:bg-white/15 transition-colors" aria-label="Close chat">
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
            <div className="p-4" style={{ background: "#0b141a" }}>
              <div className="mb-2 max-w-[85%] rounded-xl rounded-tl-sm px-3.5 py-2.5" style={{ background: "#202c33" }}>
                <p className="text-[13px] text-white/85">Hi! How can we help? Send us a message.</p>
                <p className="mt-1.5 text-right text-[9px] text-white/35">WeKnow</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3" style={{ background: "#202c33" }}>
              <input
                type="text"
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendWA()}
                placeholder="Type a message..."
                aria-label="Chat message"
                className="flex-1 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none"
                style={{ background: "#2a3942" }}
              />
              <button
                onClick={sendWA}
                disabled={!msg.trim()}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full disabled:opacity-40 transition-all duration-200 hover:scale-105"
                style={{ background: "linear-gradient(135deg, #00a884 0%, #008f72 100%)" }}
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Floating WhatsApp Button */}
        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-14 right-3 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-all duration-200 hover:scale-110 sm:bottom-7 sm:right-5 sm:h-14 sm:w-14"
            style={{ background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)", boxShadow: "0 6px 24px rgba(37,211,102,0.35)" }}
            aria-label="Open WhatsApp chat"
          >
            <MessageCircle className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </button>
        )}
      </main>
    </>
  )
}
