"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import {
  Menu, X, Bot, BarChart3, ShoppingCart, Code, Gamepad2,
  Mail, Phone, MessageCircle, Send, ArrowRight, Check, Sparkles
} from "lucide-react"

const WHATSAPP_NUMBER = "263781132817"
const EMAIL = "vincentwessie@gmail.com"
const PHONE = "+263 781 132 817"

// ─── Floating Code Animation ───────────────────────────────────────────────────
const CODE_SNIPPETS = [
  { code: "<?php namespace App\\Http;", lang: "php", color: "#7dd3fc" },
  { code: "use Illuminate\\Support\\Facades;", lang: "php", color: "#c4b5fd" },
  { code: "Route::get('/api', fn() => response());", lang: "php", color: "#f9a8d4" },
  { code: "const bot = new WebmanAI();", lang: "ts", color: "#67e8f9" },
  { code: "export async function POST(req) {", lang: "ts", color: "#6ee7b7" },
  { code: "  return Response.json(data);", lang: "ts", color: "#fcd34d" },
  { code: "SELECT * FROM users WHERE active = 1;", lang: "sql", color: "#7dd3fc" },
  { code: "INSERT INTO orders (user_id, total)", lang: "sql", color: "#c4b5fd" },
  { code: "JOIN payments p ON o.id = p.order_id", lang: "sql", color: "#d8b4fe" },
  { code: "public class WebmanService {", lang: "csharp", color: "#86efac" },
  { code: "  private readonly IBot _bot;", lang: "csharp", color: "#5eead4" },
  { code: "  public async Task<Result> Run()", lang: "csharp", color: "#93c5fd" },
  { code: "import { useEffect, useState }", lang: "ts", color: "#f9a8d4" },
  { code: "function analyze(data: Dataset) {", lang: "ts", color: "#6ee7b7" },
  { code: "  const ml = new Pipeline(data);", lang: "ts", color: "#fcd34d" },
  { code: "CREATE TABLE transactions (", lang: "sql", color: "#7dd3fc" },
  { code: "  id SERIAL PRIMARY KEY,", lang: "sql", color: "#c4b5fd" },
  { code: "await _context.SaveChangesAsync();", lang: "csharp", color: "#86efac" },
  { code: "$result = DB::table('logs')->get();", lang: "php", color: "#d8b4fe" },
  { code: "var client = new HttpClient();", lang: "csharp", color: "#5eead4" },
]

function FloatingCodeBackground() {
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
    const lines = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      snippet: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      x: Math.random() * 95,
      y: Math.random() * 100,
      speed: 0.015 + Math.random() * 0.025,
      opacity: 0.08 + Math.random() * 0.12,
      scale: 0.85 + Math.random() * 0.3,
    }))
    setCodeLines(lines)

    const interval = setInterval(() => {
      setCodeLines(prev => prev.map(line => ({
        ...line,
        y: line.y >= 102 ? -8 : line.y + line.speed,
        snippet: line.y >= 102 ? CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)] : line.snippet,
        x: line.y >= 102 ? Math.random() * 95 : line.x,
      })))
    }, 60)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {codeLines.map(line => (
        <div
          key={line.id}
          className="absolute whitespace-nowrap font-mono text-[9px] sm:text-[10px] md:text-xs"
          style={{
            left: `${line.x}%`,
            top: `${line.y}%`,
            color: line.snippet.color,
            opacity: line.opacity,
            transform: `scale(${line.scale})`,
            textShadow: `0 0 30px ${line.snippet.color}30`,
            transition: "top 60ms linear",
          }}
        >
          <span className="mr-2 rounded px-1 py-0.5 text-[8px] text-white/15" style={{ background: "rgba(255,255,255,0.03)" }}>
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
  { t: "<?php", c: "#7dd3fc" },
  { t: "", c: "" },
  { t: "namespace App\\Console\\Commands;", c: "#c4b5fd" },
  { t: "", c: "" },
  { t: "use Illuminate\\Console\\Command;", c: "#7dd3fc" },
  { t: "", c: "" },
  { t: "class BootWebman extends Command", c: "#d8b4fe" },
  { t: "{", c: "#94a3b8" },
  { t: "    protected $signature = 'webman:boot';", c: "#67e8f9" },
  { t: "", c: "" },
  { t: "    public function handle()", c: "#6ee7b7" },
  { t: "    {", c: "#94a3b8" },
  { t: "        $this->info('Initializing Webman...');", c: "#fcd34d" },
  { t: "        sleep(1);", c: "#64748b" },
  { t: "        return 'WEBMAN';", c: "#f9a8d4" },
  { t: "    }", c: "#94a3b8" },
  { t: "}", c: "#d8b4fe" },
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
        setTimeout(() => setPhase("fadeout"), 2800)
        setTimeout(() => onDone(), 3400)
      }
    }, 85)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ 
        opacity: phase === "fadeout" ? 0 : 1, 
        transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)"
      }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      {phase === "typing" && (
        <div className="relative z-10 w-full max-w-xl px-4">
          <div
            className="overflow-hidden rounded-2xl shadow-2xl"
            style={{
              background: "rgba(15, 23, 42, 0.8)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset",
            }}
          >
            {/* Terminal bar */}
            <div
              className="flex items-center gap-2 border-b px-4 py-3.5"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
            >
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-4 font-mono text-xs text-white/35">php artisan webman:boot</span>
            </div>
            <div className="p-6 font-mono text-xs leading-[2] sm:text-sm">
              {LARAVEL_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} style={{ color: line.c || "transparent" }}>
                  {line.t || "\u00A0"}
                </div>
              ))}
              {visibleLines < LARAVEL_LINES.length && (
                <span
                  className="inline-block h-4 w-2 align-middle"
                  style={{ background: "#7dd3fc", animation: "blink 0.8s step-end infinite" }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {phase === "name" && (
        <div
          className="relative z-10 text-center px-4"
          style={{ animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <h1
            className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-400 bg-clip-text font-mono font-extralight tracking-[0.6em] text-transparent"
            style={{
              fontSize: "clamp(2.5rem, 12vw, 8rem)",
              paddingLeft: "0.6em",
              animation: "glow 2.5s ease-in-out infinite",
            }}
          >
            WEBMAN
          </h1>
          <div
            className="mt-6 h-px w-32 mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)" }}
          />
          <p className="mt-5 font-mono text-[10px] tracking-[0.4em] text-white/25 sm:text-xs uppercase">
            by WeKnow Solutions
          </p>
        </div>
      )}
    </div>
  )
}

// ─── WhatsApp Chatbot Demo ─────────────────────────────────────────────────────
const WA_MSGS = [
  { from: "user", text: "Hi, I need help with my order #4521" },
  { from: "bot", text: "Hello! I'm Webman, your AI assistant. Let me check that for you..." },
  { from: "bot", text: "Order #4521 is confirmed and ships today!" },
  { from: "user", text: "What time will it arrive?" },
  { from: "bot", text: "Estimated delivery: 2-5 PM. I've sent the tracking link!" },
]

function ChatbotDemo() {
  const [vis, setVis] = useState(0)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVis(0)
    let i = 0
    const t = setInterval(() => { i++; setVis(i); if (i >= WA_MSGS.length) clearInterval(t) }, 1400)
    return () => clearInterval(t)
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [vis])

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* WA Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: "linear-gradient(135deg, #075e54 0%, #128c7e 100%)" }}>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Webman</div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-white/70">online</span>
          </div>
        </div>
        <Phone className="h-4 w-4 text-white/60" />
      </div>
      {/* Chat body */}
      <div
        className="flex-1 space-y-2.5 overflow-y-auto p-4"
        style={{
          backgroundColor: "#0b141a",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        {WA_MSGS.slice(0, vis).map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`} style={{ animation: "fadeUp 0.35s ease both" }}>
            <div
              className={`max-w-[82%] rounded-xl px-3.5 py-2.5 text-[13px] shadow-lg ${m.from === "user" ? "rounded-br-sm text-white" : "rounded-bl-sm text-white/90"}`}
              style={{ background: m.from === "user" ? "linear-gradient(135deg, #005c4b 0%, #004a3d 100%)" : "#202c33" }}
            >
              {m.text}
              <div className="mt-1.5 flex items-center justify-end gap-1">
                <span className="text-[9px] text-white/35">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                {m.from === "user" && <Check className="h-3 w-3 text-cyan-400" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      {/* Input */}
      <div className="flex items-center gap-2.5 px-3 py-3" style={{ background: "#202c33" }}>
        <div className="flex-1 rounded-full px-4 py-2.5 text-xs text-white/30" style={{ background: "#2a3942" }}>Type a message</div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full shadow-lg" style={{ background: "linear-gradient(135deg, #00a884 0%, #008f72 100%)" }}>
          <Send className="h-4 w-4 text-white" />
        </div>
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
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="grid grid-cols-3 gap-3">
        {[{ l: "Revenue", v: "$128K", c: "from-blue-500/20 to-cyan-500/20" }, { l: "Users", v: "14.2K", c: "from-violet-500/20 to-purple-500/20" }, { l: "Growth", v: "+24%", c: "from-emerald-500/20 to-teal-500/20" }].map(s => (
          <div 
            key={s.l} 
            className="rounded-xl p-3.5 text-center transition-all duration-300 hover:scale-[1.02]" 
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
          >
            <div className="text-lg font-semibold text-white/80">{s.v}</div>
            <div className="text-[10px] text-white/35 mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}>
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[11px] text-white/40">Monthly Revenue</span>
          <span className="text-[10px] text-emerald-400/70">+12.5%</span>
        </div>
        <div className="flex h-32 items-end gap-1.5">
          {bars.map((b, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-all duration-1000"
              style={{ 
                height: `${Math.min(b + (tick % 3) * 4 * (i % 2 === 0 ? 1 : -1), 100)}%`, 
                background: `linear-gradient(to top, hsl(${200 + i * 10}, 70%, 45%), hsl(${200 + i * 10}, 60%, 60%))`,
                opacity: 0.8
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── E-Commerce Demo ───────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "AirPods Pro", price: "$249", emoji: "🎧" },
  { name: "Smart Watch", price: "$399", emoji: "⌚" },
  { name: "MacBook Air", price: "$1,299", emoji: "💻" },
  { name: "iPhone 15", price: "$799", emoji: "📱" },
]

function EcommerceDemo() {
  const [cart, setCart] = useState<string[]>([])
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40">Products</span>
        <div className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-white/50" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <ShoppingCart className="h-3 w-3" />
          <span>{cart.length} items</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PRODUCTS.map(p => (
          <div 
            key={p.name} 
            className="rounded-xl p-3.5 transition-all duration-200 hover:scale-[1.02]" 
            style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(12px)" }}
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg text-2xl" style={{ background: "rgba(255,255,255,0.04)" }}>
              {p.emoji}
            </div>
            <div className="mb-0.5 text-xs font-medium text-white/70">{p.name}</div>
            <div className="mb-3 text-xs text-white/40">{p.price}</div>
            <button
              onClick={() => { if (!cart.includes(p.name)) setCart(c => [...c, p.name]) }}
              className="w-full rounded-lg py-2 text-[10px] font-medium transition-all duration-200"
              style={{ 
                background: cart.includes(p.name) ? "rgba(255,255,255,0.03)" : "rgba(99,102,241,0.12)", 
                color: cart.includes(p.name) ? "rgba(255,255,255,0.35)" : "rgba(165,180,252,0.9)", 
                border: `1px solid ${cart.includes(p.name) ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.2)"}` 
              }}
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
  
  useEffect(() => { 
    let i = 0
    const t = setInterval(() => { i++; setTyped(i); if (i >= SW_LINES.length) clearInterval(t) }, 200)
    return () => clearInterval(t) 
  }, [])
  
  const run = () => {
    setOutput([])
    const logs = ["> Loading modules...", "> Auth: OK", "> API: OK", "> ML: Ready", "> Server running on :3000", "> All systems up"]
    logs.forEach((l, i) => setTimeout(() => setOutput(p => [...p, l]), i * 350))
  }
  
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex-1 overflow-hidden rounded-xl" style={{ background: "rgba(3,7,18,0.8)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(16px)" }}>
        <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.02)" }}>
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-3 font-mono text-[10px] text-white/30">app.ts</span>
        </div>
        <div className="p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
          {SW_LINES.slice(0, typed).map((l, i) => <div key={i} style={{ color: l.c }}>{l.t}</div>)}
        </div>
      </div>
      {output.length > 0 && (
        <div className="rounded-xl p-3.5 font-mono text-[10px]" style={{ background: "rgba(6,78,59,0.15)", border: "1px solid rgba(52,211,153,0.15)" }}>
          {output.map((l, i) => <div key={i} className="text-emerald-400/80">{l}</div>)}
        </div>
      )}
      <button
        onClick={run}
        disabled={typed < SW_LINES.length}
        className="rounded-xl py-3 text-xs font-medium text-white/55 transition-all duration-200 hover:text-white/75 disabled:opacity-30"
        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.15)" }}
      >
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
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/40">Tap Game</span>
        <span className="rounded-full px-3 py-1 text-white/60" style={{ background: "rgba(255,255,255,0.05)" }}>Score: {score}</span>
      </div>
      <div
        className="relative flex-1 cursor-pointer overflow-hidden rounded-xl transition-all"
        onClick={hit}
        style={{ background: "rgba(3,7,18,0.8)", border: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(16px)" }}
      >
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="absolute h-2 w-2 rounded-full bg-white/[0.06]" style={{ left: `${(i * 37 + 13) % 90 + 5}%`, top: `${(i * 53 + 7) % 80 + 10}%` }} />
        ))}
        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)" }}>
            {score > 0 && <div className="text-lg font-medium text-white/60">Score: {score}</div>}
            <button
              onClick={e => { e.stopPropagation(); start() }}
              className="rounded-full px-8 py-3 text-sm font-medium text-white/70 transition-all duration-200 hover:scale-105"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {score > 0 ? "Play Again" : "Play"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Services config ───────────────────────────────────────────────────────────
const SERVICES = [
  { key: "AI Chatbots", icon: Bot, desc: "WhatsApp bots like Webman" },
  { key: "Data Analytics", icon: BarChart3, desc: "Real-time dashboards" },
  { key: "E-Commerce", icon: ShoppingCart, desc: "Online stores" },
  { key: "Custom Software", icon: Code, desc: "Enterprise apps" },
  { key: "Game Dev", icon: Gamepad2, desc: "Cross-platform games" },
]

// ─── Glassmorphism helper styles ───────────────────────────────────────────────
const glass = {
  card: { 
    background: "rgba(15,23,42,0.6)", 
    backdropFilter: "blur(24px)", 
    WebkitBackdropFilter: "blur(24px)", 
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.2)"
  } as React.CSSProperties,
  nav: { 
    background: "rgba(3,7,18,0.7)", 
    backdropFilter: "blur(32px)", 
    WebkitBackdropFilter: "blur(32px)", 
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 4px 30px rgba(0,0,0,0.1)"
  } as React.CSSProperties,
  sidebar: { 
    background: "rgba(5,12,26,0.92)", 
    backdropFilter: "blur(32px)", 
    WebkitBackdropFilter: "blur(32px)", 
    borderRight: "1px solid rgba(255,255,255,0.06)" 
  } as React.CSSProperties,
  input: { 
    background: "rgba(3,7,18,0.6)", 
    backdropFilter: "blur(16px)", 
    WebkitBackdropFilter: "blur(16px)", 
    border: "1px solid rgba(255,255,255,0.06)" 
  } as React.CSSProperties,
  btn: { 
    background: "rgba(255,255,255,0.05)", 
    backdropFilter: "blur(16px)", 
    WebkitBackdropFilter: "blur(16px)", 
    border: "1px solid rgba(255,255,255,0.08)" 
  } as React.CSSProperties,
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [splashDone, setSplashDone] = useState(false)
  const [section, setSection] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [msg, setMsg] = useState("")
  const [selectedSvc, setSelectedSvc] = useState("AI Chatbots")

  const navItems = ["Home", "Services", "Contact"]

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

  useEffect(() => {
    if (!splashDone) return
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft = 0
        setSection(0)
      }
    }, 150)
    return () => clearTimeout(timer)
  }, [splashDone])

  const renderDemo = (k: string) => {
    switch (k) {
      case "AI Chatbots":    return <ChatbotDemo />
      case "Data Analytics": return <AnalyticsDemo />
      case "E-Commerce":     return <EcommerceDemo />
      case "Custom Software":return <SoftwareDemo />
      case "Game Dev":       return <GameDemo />
      default: return null
    }
  }

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      <main
        className="relative h-screen w-full overflow-hidden"
        style={{ 
          opacity: splashDone ? 1 : 0, 
          transition: "opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.15s",
          background: "linear-gradient(135deg, #020617 0%, #0f172a 50%, #020617 100%)"
        }}
      >
        {/* Global Code Rain Background */}
        <FloatingCodeBackground />

        {/* Ambient glow orbs */}
        <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
          <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-600/[0.04] blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-violet-600/[0.03] blur-[100px]" />
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-600/[0.02] blur-[80px]" />
        </div>

        {/* Subtle grid */}
        <div 
          className="pointer-events-none fixed inset-0 z-[1] opacity-[0.015]" 
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)", backgroundSize: "80px 80px" }} 
        />

        {/* Keyframes */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
          @keyframes glow { 0%,100%{filter:drop-shadow(0 0 50px rgba(59,130,246,0.3))} 50%{filter:drop-shadow(0 0 100px rgba(139,92,246,0.4))} }
          @keyframes slideIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }
          @keyframes fadeIn { from{opacity:0} to{opacity:1} }
          @keyframes sideStagger { from{opacity:0;transform:translateX(-16px)} to{opacity:1;transform:translateX(0)} }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        `}} />

        {/* ── Nav ── */}
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 md:px-10 lg:px-14" style={glass.nav}>
          <button onClick={() => goTo(0)} className="flex items-center gap-3 transition-all duration-200 hover:opacity-80">
            <Image src="/weknow-logo.png" alt="WeKnow Solutions" width={40} height={40} className="h-9 w-auto sm:h-10" />
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item, i) => (
              <button
                key={item}
                onClick={() => goTo(i)}
                className={`relative text-sm font-medium transition-all duration-200 ${section === i ? "text-white/90" : "text-white/40 hover:text-white/65"}`}
              >
                {item}
                {section === i && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={() => goTo(2)}
            className="hidden items-center gap-2 rounded-full px-5 py-2.5 text-xs font-medium text-white/70 transition-all duration-200 hover:text-white/90 md:flex"
            style={glass.btn}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Book a Service
          </button>

          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white/50 transition-all duration-200 hover:text-white/75 md:hidden"
            style={glass.btn}
          >
            <Menu className="h-5 w-5" />
          </button>
        </nav>

        {/* ── Mobile Sidebar ── */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <div
              className="absolute inset-0"
              onClick={() => setSidebarOpen(false)}
              style={{ animation: "fadeIn 0.25s ease both", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
            />
            <div
              className="absolute inset-y-0 left-0 w-[75vw] max-w-xs"
              style={{ ...glass.sidebar, animation: "slideIn 0.3s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <Image src="/weknow-logo.png" alt="WeKnow Solutions" width={36} height={36} className="h-8 w-auto" />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white/45 transition-colors hover:text-white/70"
                  style={glass.btn}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col gap-1.5 p-4">
                {navItems.map((item, i) => (
                  <button
                    key={item}
                    onClick={() => goTo(i)}
                    className={`w-full rounded-xl px-4 py-4 text-left text-sm font-medium transition-all duration-200 ${section === i ? "text-white/80" : "text-white/40 hover:text-white/60"}`}
                    style={{ animation: `sideStagger 0.35s ease ${i * 0.06 + 0.1}s both`, ...(section === i ? { background: "rgba(255,255,255,0.05)" } : {}) }}
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={() => goTo(2)}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-medium text-white/50 transition-all duration-200 hover:text-white/70"
                  style={{ ...glass.btn, animation: "sideStagger 0.35s ease 0.28s both" }}
                >
                  <Sparkles className="h-4 w-4" />
                  Book a Service
                </button>
              </div>
              <div className="absolute bottom-8 left-0 right-0 px-5 space-y-1.5">
                <div className="text-[11px] text-white/25">{EMAIL}</div>
                <div className="text-[11px] text-white/25">{PHONE}</div>
              </div>
            </div>
          </div>
        )}

        {/* ── Horizontal Scroll Container ── */}
        <div ref={containerRef} className="relative z-[2] flex h-full overflow-hidden" style={{ scrollSnapType: "none" }}>
          
          {/* HOME */}
          <section className="relative flex min-h-screen w-screen shrink-0 flex-col justify-center px-4 pt-16 sm:px-6 sm:pt-20 md:px-10 lg:px-16">
            <div className="relative z-10 max-w-lg sm:max-w-xl lg:max-w-2xl">
              {/* Status badge */}
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full px-4 py-2 sm:mb-7" style={glass.card}>
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium tracking-wide text-white/50 sm:text-xs">Available for projects</span>
              </div>

              <h1 className="mb-5 text-3xl font-extralight leading-[1.12] tracking-tight text-white/95 sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Intelligent Software
                <br />
                <span className="bg-gradient-to-r from-blue-400/60 to-violet-400/60 bg-clip-text text-transparent">Solutions.</span>
              </h1>

              <p className="mb-7 max-w-md text-sm leading-relaxed text-white/40 sm:mb-9 sm:text-base md:text-lg">
                We build AI chatbots, analytics platforms, e-commerce, and custom software that drive growth.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button
                  onClick={() => goTo(2)}
                  className="group flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-sm font-medium text-white/85 transition-all duration-200 hover:scale-[1.02] sm:px-8 sm:py-4"
                  style={{ ...glass.card, background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)" }}
                >
                  Book a Service
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => goTo(1)}
                  className="flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-medium text-white/40 transition-all duration-200 hover:text-white/60 sm:px-8 sm:py-4"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  View Services
                </button>
              </div>

              <div className="mt-8 flex flex-wrap gap-2 sm:mt-10 md:mt-12">
                {["Laravel", "React", "Python", "SQL", "C#", "AI/ML"].map(t => (
                  <span 
                    key={t} 
                    className="rounded-full px-3 py-1.5 text-[10px] font-medium tracking-wide text-white/35 transition-all duration-200 hover:text-white/50 sm:px-4 sm:py-2 sm:text-xs" 
                    style={glass.card}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section className="flex min-h-screen w-screen shrink-0 items-center px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-0 lg:px-16">
            <div className="relative z-10 mx-auto w-full max-w-5xl">
              <div className="mb-6 sm:mb-9">
                <h2 className="mb-2 text-xl font-extralight tracking-tight text-white/90 sm:text-2xl md:text-3xl lg:text-4xl">Our Services</h2>
                <p className="text-xs text-white/35 sm:text-sm">Select a service to explore the demo</p>
              </div>

              <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
                {/* Service list */}
                <div className="grid grid-cols-5 gap-2 sm:flex sm:gap-2.5 sm:overflow-x-auto sm:pb-2 lg:w-60 lg:shrink-0 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
                  {SERVICES.map(s => {
                    const Icon = s.icon
                    const active = selectedSvc === s.key
                    return (
                      <button
                        key={s.key}
                        onClick={() => setSelectedSvc(s.key)}
                        className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 transition-all duration-200 hover:scale-[1.02] sm:flex-row sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3 lg:w-full lg:py-3.5"
                        style={active ? { ...glass.card, border: "1px solid rgba(255,255,255,0.12)" } : { border: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.02)" }}
                      >
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200 sm:h-10 sm:w-10"
                          style={{ background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)" }}
                        >
                          <Icon className={`h-4 w-4 transition-colors duration-200 sm:h-5 sm:w-5 ${active ? "text-white/70" : "text-white/30"}`} />
                        </div>
                        <div className="text-center sm:text-left">
                          <div className={`text-[9px] font-medium leading-tight transition-colors duration-200 sm:text-xs lg:text-sm ${active ? "text-white/80" : "text-white/40"}`}>
                            <span className="sm:hidden">{s.key.split(" ")[0]}</span>
                            <span className="hidden sm:inline">{s.key}</span>
                          </div>
                          <div className="hidden text-[10px] text-white/25 lg:block">{s.desc}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Demo panel */}
                <div className="flex-1 overflow-hidden rounded-2xl" style={{ ...glass.card, minHeight: 320 }}>
                  {renderDemo(selectedSvc)}
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="flex min-h-screen w-screen shrink-0 items-center px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-0 lg:px-16">
            <div className="relative z-10 mx-auto w-full max-w-sm sm:max-w-md">
              <div className="mb-7 text-center sm:mb-9">
                <h2 className="mb-2 text-xl font-extralight tracking-tight text-white/90 sm:text-2xl md:text-3xl lg:text-4xl">Get in Touch</h2>
                <p className="text-xs text-white/35 sm:text-sm">We&apos;d love to hear from you</p>
              </div>

              <div className="mb-5 grid grid-cols-3 gap-2.5 sm:mb-6 sm:gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex flex-col items-center gap-2.5 rounded-xl p-4 text-center transition-all duration-200 hover:scale-[1.02] sm:flex-row sm:gap-3 sm:p-4 sm:text-left"
                  style={glass.card}
                >
                  <Mail className="h-5 w-5 text-blue-400/70 sm:h-5 sm:w-5" />
                  <div>
                    <div className="text-[10px] font-medium text-white/60 sm:text-xs">Email</div>
                    <div className="hidden text-[10px] text-white/30 sm:block">vincentwessie</div>
                  </div>
                </a>
                <a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  className="flex flex-col items-center gap-2.5 rounded-xl p-4 text-center transition-all duration-200 hover:scale-[1.02] sm:flex-row sm:gap-3 sm:p-4 sm:text-left"
                  style={glass.card}
                >
                  <Phone className="h-5 w-5 text-cyan-400/70 sm:h-5 sm:w-5" />
                  <div>
                    <div className="text-[10px] font-medium text-white/60 sm:text-xs">Call</div>
                    <div className="hidden text-[10px] text-white/30 sm:block">+263 781...</div>
                  </div>
                </a>
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex flex-col items-center gap-2.5 rounded-xl p-4 text-center transition-all duration-200 hover:scale-[1.02] sm:flex-row sm:gap-3 sm:p-4 sm:text-left"
                  style={glass.card}
                >
                  <MessageCircle className="h-5 w-5 text-emerald-400/70 sm:h-5 sm:w-5" />
                  <div>
                    <div className="text-[10px] font-medium text-white/60 sm:text-xs">WhatsApp</div>
                    <div className="hidden text-[10px] text-white/30 sm:block">Chat now</div>
                  </div>
                </button>
              </div>

              <div className="rounded-2xl p-5 sm:p-6" style={glass.card}>
                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="Tell us about your project..."
                  className="mb-4 h-28 w-full resize-none rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder:text-white/25 focus:outline-none focus:ring-1 focus:ring-white/10 sm:h-32"
                  style={glass.input}
                />
                <button
                  onClick={sendWA}
                  disabled={!msg.trim()}
                  className="w-full rounded-xl py-3.5 text-sm font-medium text-white/55 transition-all duration-200 hover:text-white/75 disabled:opacity-30"
                  style={glass.btn}
                >
                  Send via WhatsApp
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Section indicators */}
        <div className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-3 sm:bottom-8">
          {navItems.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{ 
                height: 6, 
                width: section === i ? 32 : 6, 
                background: section === i 
                  ? "linear-gradient(90deg, rgba(59,130,246,0.6), rgba(139,92,246,0.6))" 
                  : "rgba(255,255,255,0.15)" 
              }}
            />
          ))}
        </div>

        {/* WhatsApp Chat Widget */}
        {chatOpen && (
          <div
            className="fixed bottom-20 left-4 right-4 z-50 overflow-hidden rounded-2xl shadow-2xl sm:bottom-24 sm:left-auto sm:right-6 sm:w-80"
            style={{ ...glass.sidebar, animation: "fadeUp 0.35s cubic-bezier(0.16,1,0.3,1) both", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
          >
            <div className="flex items-center justify-between px-4 py-3.5" style={{ background: "linear-gradient(135deg, #075e54 0%, #128c7e 100%)" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">WeKnow Solutions</div>
                  <div className="text-[10px] text-white/60">Typically replies instantly</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="rounded-full p-1.5 hover:bg-white/15 transition-colors">
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
            <div className="p-4" style={{ background: "#0b141a" }}>
              <div className="mb-2 max-w-[85%] rounded-xl rounded-tl-sm px-3.5 py-2.5" style={{ background: "#202c33" }}>
                <p className="text-[13px] text-white/85">Hi! How can we help? Send us a message.</p>
                <p className="mt-1.5 text-right text-[9px] text-white/35">WeKnow</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 p-3.5" style={{ background: "#202c33" }}>
              <input
                type="text"
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendWA()}
                placeholder="Type a message..."
                className="flex-1 rounded-full px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:outline-none"
                style={{ background: "#2a3942" }}
              />
              <button
                onClick={sendWA}
                disabled={!msg.trim()}
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
            className="fixed bottom-16 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-200 hover:scale-110 sm:bottom-8 sm:right-6"
            style={{ 
              background: "linear-gradient(135deg, #25d366 0%, #128c7e 100%)", 
              boxShadow: "0 8px 32px rgba(37,211,102,0.35)" 
            }}
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </button>
        )}
      </main>
    </>
  )
}
