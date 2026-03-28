"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import {
  Menu, X, Bot, BarChart3, ShoppingCart, Code, Gamepad2,
  Mail, Phone, MessageCircle, Send, ArrowRight, ChevronRight,
  TrendingUp, Users, Activity, Check, Star, ShoppingBag, Wifi
} from "lucide-react"

const WHATSAPP_NUMBER = "263781132817"
const EMAIL = "vincentwessie@gmail.com"
const PHONE = "+263 781 132 817"

// ─── Splash Screen ─────────────────────────────────────────────────────────────
const LARAVEL_LINES = [
  "<?php",
  "",
  "namespace App\\Console\\Commands;",
  "",
  "use Illuminate\\Console\\Command;",
  "",
  "class BootWebman extends Command {",
  "    protected $signature = 'webman:boot';",
  "",
  "    public function handle() {",
  "        $this->info('Initializing...');",
  "        return 'WEBMAN';",
  "    }",
  "}",
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
    }, 80)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
      style={{ opacity: phase === "fadeout" ? 0 : 1, transition: "opacity 0.6s ease" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Phase: Typing code */}
      {phase === "typing" && (
        <div className="w-full max-w-xl px-4">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-slate-900/90 shadow-xl">
            <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/50 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-white/30">php artisan webman:boot</span>
            </div>
            <div className="p-4 font-mono text-xs leading-relaxed sm:text-sm">
              {LARAVEL_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} className={line.includes("class ") || line.includes("function ") ? "text-violet-400" : line.includes("$") || line.includes("return") ? "text-cyan-400" : line.includes("<?php") || line.includes("use ") || line.includes("namespace") ? "text-blue-400" : line.includes("'") ? "text-amber-400" : "text-slate-400"}>
                  {line || "\u00A0"}
                </div>
              ))}
              {visibleLines < LARAVEL_LINES.length && (
                <span className="inline-block h-4 w-1.5 bg-blue-400" style={{ animation: "blink 1s step-end infinite" }} />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Phase: Show name only */}
      {phase === "name" && (
        <div className="text-center" style={{ animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both" }}>
          <h1
            className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-5xl font-bold tracking-widest text-transparent sm:text-7xl md:text-8xl"
            style={{ animation: "glow 2s ease-in-out infinite" }}
          >
            WEBMAN
          </h1>
          <p className="mt-3 text-sm text-white/40">by WeKnow Solutions</p>
        </div>
      )}
    </div>
  )
}

// ─── Chatbot Demo ─────────────────────────────────────────────────────────────
const WA_MSGS = [
  { from: "user", text: "Hi, I need help with order #4521" },
  { from: "bot", text: "Hello! I'm Webman. Order #4521 is being processed and ships today." },
  { from: "user", text: "What time will it arrive?" },
  { from: "bot", text: "Estimated delivery: 2-5 PM today. You'll get a tracking link soon!" },
  { from: "user", text: "Can I change the address?" },
  { from: "bot", text: "Sure! Send the new address and I'll update it for you." },
]

function ChatbotDemo() {
  const [vis, setVis] = useState(0)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVis(0)
    let i = 0
    const t = setInterval(() => { i++; setVis(i); if (i >= WA_MSGS.length) clearInterval(t) }, 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [vis])

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-slate-900/80">
      <div className="flex items-center gap-3 bg-slate-800/80 px-4 py-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-bold text-white">W</div>
        <div>
          <div className="text-sm font-medium text-white">Webman</div>
          <div className="text-xs text-white/40">online</div>
        </div>
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto bg-slate-950/50 p-3">
        {WA_MSGS.slice(0, vis).map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`} style={{ animation: "fadeUp 0.3s ease both" }}>
            <div className={`max-w-[80%] rounded-lg px-3 py-2 text-xs ${m.from === "user" ? "bg-slate-700 text-white" : "bg-slate-800 text-white/80"}`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 border-t border-white/10 bg-slate-800/50 px-3 py-2">
        <div className="flex-1 rounded-full bg-slate-700 px-3 py-1.5 text-xs text-white/30">Type a message...</div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-600"><Send className="h-3 w-3 text-white/60" /></div>
      </div>
    </div>
  )
}

// ─── Analytics Demo ─────────────────────────────────────────────────────────────
function AnalyticsDemo() {
  const [t, setT] = useState(0)
  const bars = [65, 80, 45, 90, 70, 55, 88, 72, 60, 95, 78, 83]

  useEffect(() => { const i = setInterval(() => setT((p) => p + 1), 1500); return () => clearInterval(i) }, [])

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="grid grid-cols-3 gap-2">
        {[{ l: "Revenue", v: "$128K", c: "text-slate-300" }, { l: "Users", v: "14.2K", c: "text-slate-300" }, { l: "Conversion", v: "8.4%", c: "text-slate-300" }].map((s) => (
          <div key={s.l} className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
            <div className={`text-base font-semibold ${s.c}`}>{s.v}</div>
            <div className="text-[10px] text-white/40">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="mb-2 text-xs text-white/40">Monthly</div>
        <div className="flex h-20 items-end gap-1">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t bg-slate-500/60" style={{ height: `${Math.min(b + (t % 3) * 3 * (i % 2 === 0 ? 1 : -1), 100)}%`, transition: "height 1s ease" }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── E-Commerce Demo ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "AirPods Pro", price: "$249", img: "headphones" },
  { name: "Smart Watch", price: "$399", img: "watch" },
  { name: "MacBook Air", price: "$1,299", img: "laptop" },
  { name: "iPhone 15", price: "$799", img: "phone" },
]

function EcommerceDemo() {
  const [cart, setCart] = useState<string[]>([])
  const [added, setAdded] = useState<string | null>(null)

  const add = (n: string) => { setCart((c) => [...c, n]); setAdded(n); setTimeout(() => setAdded(null), 1000) }

  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/40">Products</span>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/50">
          <ShoppingBag className="h-3 w-3" /><span>{cart.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 overflow-y-auto">
        {PRODUCTS.map((p) => (
          <div key={p.name} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-700/50 text-xs text-white/30">{p.img.charAt(0).toUpperCase()}</div>
            <div className="mb-1 text-xs font-medium text-white/80">{p.name}</div>
            <div className="mb-2 text-sm font-semibold text-white/60">{p.price}</div>
            <button onClick={() => add(p.name)} className={`w-full rounded py-1 text-[10px] font-medium transition-all ${added === p.name ? "bg-slate-600 text-white" : "bg-slate-700/50 text-white/50 hover:bg-slate-700"}`}>
              {added === p.name ? "Added" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Software Demo ─────────────────────────────────────────────────────────────
const CODE_LINES = [
  { t: "class WeKnowApp {", c: "text-violet-400/80" },
  { t: "  modules = ['Auth', 'CRM', 'API'];", c: "text-slate-400" },
  { t: "", c: "" },
  { t: "  async boot() {", c: "text-cyan-400/80" },
  { t: "    await this.loadModules();", c: "text-slate-500" },
  { t: "    console.log('Ready');", c: "text-slate-500" },
  { t: "  }", c: "text-cyan-400/80" },
  { t: "}", c: "text-violet-400/80" },
]

function SoftwareDemo() {
  const [typed, setTyped] = useState(0)
  const [output, setOutput] = useState<string[]>([])

  useEffect(() => { let i = 0; const t = setInterval(() => { i++; setTyped(i); if (i >= CODE_LINES.length) clearInterval(t) }, 150); return () => clearInterval(t) }, [])

  const run = () => {
    setOutput([])
    const logs = ["> Loading...", "> Auth OK", "> CRM OK", "> API OK", "> Ready"]
    logs.forEach((l, i) => setTimeout(() => setOutput((p) => [...p, l]), i * 250))
  }

  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="flex-1 overflow-hidden rounded-lg border border-white/10 bg-slate-950/80">
        <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/40 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-red-500/60" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
          <div className="h-2 w-2 rounded-full bg-green-500/60" />
          <span className="ml-2 text-xs text-white/20">app.ts</span>
        </div>
        <div className="p-3 font-mono text-xs">
          {CODE_LINES.slice(0, typed).map((l, i) => <div key={i} className={l.c}>{l.t || "\u00A0"}</div>)}
        </div>
      </div>
      {output.length > 0 && (
        <div className="rounded-lg border border-white/10 bg-slate-950/80 p-3 font-mono text-xs">
          {output.map((l, i) => <div key={i} className="text-slate-400">{l}</div>)}
        </div>
      )}
      <button onClick={run} disabled={typed < CODE_LINES.length} className="w-full rounded-lg bg-slate-700/50 py-2 text-xs font-medium text-white/60 transition-all hover:bg-slate-700 disabled:opacity-40">
        Run
      </button>
    </div>
  )
}

// ─── Game Demo ─────────────────────────────────────────────────────────────────
function GameDemo() {
  const [score, setScore] = useState(0)
  const [active, setActive] = useState(false)
  const [pos, setPos] = useState({ x: 50, y: 75 })
  const enemies = useRef<{ x: number; y: number; id: number }[]>([])
  const scoreRef = useRef(0)

  const start = useCallback(() => {
    setActive(true); setScore(0); scoreRef.current = 0; enemies.current = []; setPos({ x: 50, y: 75 })
    const spawn = setInterval(() => { enemies.current.push({ x: Math.random() * 80 + 10, y: 0, id: Date.now() }) }, 1000)
    const move = setInterval(() => {
      enemies.current = enemies.current.map((e) => ({ ...e, y: e.y + 4 })).filter((e) => {
        if (e.y > 90) { setActive(false); clearInterval(spawn); clearInterval(move); return false }
        return true
      })
    }, 100)
    return () => { clearInterval(spawn); clearInterval(move) }
  }, [])

  const shoot = (px: number) => {
    if (!active) return
    enemies.current = enemies.current.filter((e) => {
      const hit = Math.abs(e.x - px) < 12 && e.y > 40
      if (hit) { scoreRef.current += 10; setScore(scoreRef.current) }
      return !hit
    })
  }

  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="flex items-center justify-between text-xs text-white/40">
        <span>Space Shooter</span>
        <span>Score: {score}</span>
      </div>
      <div
        className="relative flex-1 cursor-crosshair overflow-hidden rounded-lg border border-white/10 bg-slate-950/80"
        onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); const px = ((e.clientX - r.left) / r.width) * 100; shoot(px); setPos({ x: px, y: 75 }) }}
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="absolute h-0.5 w-0.5 rounded-full bg-white/20" style={{ left: `${(i * 37 + 13) % 100}%`, top: `${(i * 53 + 7) % 70}%` }} />
        ))}
        <div className="absolute text-sm" style={{ left: `${pos.x}%`, top: "75%", transform: "translate(-50%, -50%)" }}>^</div>
        {enemies.current.map((e) => <div key={e.id} className="absolute text-xs text-white/50" style={{ left: `${e.x}%`, top: `${e.y}%`, transform: "translate(-50%,-50%)" }}>*</div>)}
        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/50">
            {score > 0 && <div className="text-sm text-white/60">Score: {score}</div>}
            <button onClick={(e) => { e.stopPropagation(); start() }} className="rounded-full bg-slate-700 px-4 py-1.5 text-xs text-white/70">
              {score > 0 ? "Retry" : "Play"}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  { key: "AI Chatbots", icon: Bot, desc: "24/7 AI conversations like Webman, our WhatsApp bot." },
  { key: "Data Analytics", icon: BarChart3, desc: "Real-time dashboards and ML-powered insights." },
  { key: "E-Commerce", icon: ShoppingCart, desc: "High-converting online stores with seamless checkout." },
  { key: "Custom Software", icon: Code, desc: "Tailored enterprise apps for your business." },
  { key: "Game Dev", icon: Gamepad2, desc: "Cross-platform games with WebGL and multiplayer." },
]

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [splashDone, setSplashDone] = useState(false)
  const [section, setSection] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [msg, setMsg] = useState("")
  const [selectedSvc, setSelectedSvc] = useState("AI Chatbots")
  const touchY = useRef(0)

  const navItems = ["Home", "Services", "Contact"]

  const goTo = (i: number) => {
    if (!containerRef.current || i < 0 || i >= 3) return
    containerRef.current.scrollTo({ left: containerRef.current.offsetWidth * i, behavior: "smooth" })
    setSection(i)
    setMenuOpen(false)
  }

  const sendWA = () => {
    if (!msg.trim()) return
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
    setMsg("")
    setChatOpen(false)
  }

  useEffect(() => {
    const c = containerRef.current
    if (!c) return
    const start = (e: TouchEvent) => { touchY.current = e.touches[0].clientY }
    const end = (e: TouchEvent) => {
      const dy = touchY.current - e.changedTouches[0].clientY
      if (Math.abs(dy) > 50) goTo(dy > 0 ? Math.min(section + 1, 2) : Math.max(section - 1, 0))
    }
    c.addEventListener("touchstart", start, { passive: true })
    c.addEventListener("touchend", end, { passive: true })
    return () => { c.removeEventListener("touchstart", start); c.removeEventListener("touchend", end) }
  }, [section])

  useEffect(() => {
    const c = containerRef.current
    if (!c) return
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        c.scrollBy({ left: e.deltaY, behavior: "instant" })
        const s = Math.round(c.scrollLeft / c.offsetWidth)
        if (s !== section) setSection(s)
      }
    }
    c.addEventListener("wheel", wheel, { passive: false })
    return () => c.removeEventListener("wheel", wheel)
  }, [section])

  const renderDemo = (k: string) => {
    switch (k) {
      case "AI Chatbots": return <ChatbotDemo />
      case "Data Analytics": return <AnalyticsDemo />
      case "E-Commerce": return <EcommerceDemo />
      case "Custom Software": return <SoftwareDemo />
      case "Game Dev": return <GameDemo />
      default: return null
    }
  }

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      <main className="relative h-screen w-full overflow-hidden bg-slate-950" style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.5s ease" }}>
        
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 30%, rgba(59,130,246,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, rgba(99,102,241,0.04) 0%, transparent 45%), #030712" }} />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)", backgroundSize: "80px 80px" }} />
        </div>

        {/* Keyframes */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          @keyframes glow { 0%,100%{filter:drop-shadow(0 0 30px rgba(59,130,246,0.3))} 50%{filter:drop-shadow(0 0 60px rgba(59,130,246,0.5))} }
        `}} />

        {/* Nav */}
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-8 md:px-12">
          <button onClick={() => goTo(0)} className="transition-transform hover:scale-105">
            <Image src="/weknow-logo.png" alt="WeKnow Solutions" width={140} height={50} className="h-10 w-auto object-contain sm:h-12" priority />
          </button>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item, i) => (
              <button key={item} onClick={() => goTo(i)} className={`text-sm font-medium transition-colors ${section === i ? "text-white" : "text-white/40 hover:text-white/70"}`}>
                {item}
              </button>
            ))}
          </div>

          <button onClick={() => goTo(2)} className="hidden rounded-full bg-slate-800 px-5 py-2 text-sm font-medium text-white/80 transition-all hover:bg-slate-700 md:block">
            Contact
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 md:hidden">
            {menuOpen ? <X className="h-5 w-5 text-white/70" /> : <Menu className="h-5 w-5 text-white/70" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 bg-slate-950/98 md:hidden">
            <Image src="/weknow-logo.png" alt="WeKnow Solutions" width={160} height={60} className="mb-4 object-contain" />
            {navItems.map((item, i) => (
              <button key={item} onClick={() => goTo(i)} className={`text-xl font-light ${section === i ? "text-white" : "text-white/40"}`}>{item}</button>
            ))}
          </div>
        )}

        {/* Sections */}
        <div ref={containerRef} className="relative z-10 flex h-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: "none" }}>

          {/* HOME */}
          <section className="flex min-h-screen w-screen shrink-0 snap-start flex-col justify-center px-4 pt-20 sm:px-8 md:px-12">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                <span className="text-xs text-white/50">Available for projects</span>
              </div>

              <h1 className="mb-4 text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Intelligent Software
                <br />
                <span className="text-white/40">Solutions.</span>
              </h1>

              <p className="mb-8 max-w-md text-sm leading-relaxed text-white/40 sm:text-base">
                We build AI chatbots, analytics platforms, e-commerce, and custom software that drive growth.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button onClick={() => goTo(2)} className="group flex items-center justify-center gap-2 rounded-full bg-slate-800 px-8 py-3 text-sm font-medium text-white/90 transition-all hover:bg-slate-700">
                  Book a Service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => goTo(1)} className="flex items-center justify-center gap-2 rounded-full border border-white/10 px-8 py-3 text-sm font-medium text-white/50 transition-all hover:border-white/20 hover:text-white/70">
                  View Services
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-2">
                {["Laravel", "React", "Python", "AI/ML"].map((t) => (
                  <span key={t} className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-xs text-white/30">{t}</span>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section className="flex min-h-screen w-screen shrink-0 snap-start items-center px-4 py-20 sm:px-8 md:px-12 md:py-0">
            <div className="mx-auto w-full max-w-5xl">
              <div className="mb-6">
                <h2 className="mb-1 text-2xl font-light text-white sm:text-3xl">Services</h2>
                <p className="text-sm text-white/30">Select a service to see a demo</p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
                {/* Service list */}
                <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                  {SERVICES.map((s) => {
                    const Icon = s.icon
                    const active = selectedSvc === s.key
                    return (
                      <button
                        key={s.key}
                        onClick={() => setSelectedSvc(s.key)}
                        className={`flex shrink-0 items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all lg:w-full ${active ? "border-white/20 bg-white/10" : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"}`}
                      >
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${active ? "bg-white/10" : "bg-white/5"}`}>
                          <Icon className={`h-4 w-4 ${active ? "text-white/80" : "text-white/40"}`} />
                        </div>
                        <div>
                          <div className={`text-sm font-medium ${active ? "text-white/90" : "text-white/50"}`}>{s.key}</div>
                          <div className="hidden text-xs text-white/30 lg:block">{s.desc}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Demo */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/40 lg:col-span-2" style={{ minHeight: 340 }}>
                  {renderDemo(selectedSvc)}
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="flex min-h-screen w-screen shrink-0 snap-start items-center px-4 py-20 sm:px-8 md:px-12 md:py-0">
            <div className="mx-auto w-full max-w-xl">
              <div className="mb-6 text-center">
                <h2 className="mb-1 text-2xl font-light text-white sm:text-3xl">Get in Touch</h2>
                <p className="text-sm text-white/30">We'd love to hear from you</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10">
                  <Mail className="h-5 w-5 text-white/40" />
                  <div>
                    <div className="text-sm font-medium text-white/70">Email</div>
                    <div className="text-xs text-white/30">vincentwessie</div>
                  </div>
                </a>
                <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10">
                  <Phone className="h-5 w-5 text-white/40" />
                  <div>
                    <div className="text-sm font-medium text-white/70">Call</div>
                    <div className="text-xs text-white/30">+263 781...</div>
                  </div>
                </a>
                <button onClick={() => setChatOpen(true)} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10">
                  <MessageCircle className="h-5 w-5 text-white/40" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-white/70">WhatsApp</div>
                    <div className="text-xs text-white/30">Chat now</div>
                  </div>
                </button>
              </div>

              <div className="mt-6 rounded-lg border border-white/10 bg-white/5 p-4">
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Tell us about your project..."
                  className="mb-3 h-24 w-full resize-none rounded-lg border border-white/10 bg-slate-900/50 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-white/20 focus:outline-none"
                />
                <button onClick={sendWA} disabled={!msg.trim()} className="w-full rounded-lg bg-slate-800 py-2.5 text-sm font-medium text-white/70 transition-all hover:bg-slate-700 disabled:opacity-40">
                  Send via WhatsApp
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* WhatsApp Widget */}
        {chatOpen && (
          <div className="fixed bottom-4 left-4 right-4 z-50 overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 shadow-xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-72">
            <div className="flex items-center justify-between bg-slate-800/80 px-4 py-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-white/50" />
                <span className="text-sm font-medium text-white/80">Chat</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="rounded p-1 hover:bg-white/10"><X className="h-4 w-4 text-white/50" /></button>
            </div>
            <div className="p-3">
              <div className="mb-3 rounded-lg bg-slate-800/50 p-3 text-xs text-white/50">
                Hi! Send us a message and we'll respond shortly.
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendWA()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-lg bg-slate-800/50 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none"
                />
                <button onClick={sendWA} disabled={!msg.trim()} className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-700 transition-all hover:bg-slate-600 disabled:opacity-40">
                  <Send className="h-4 w-4 text-white/60" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating WA */}
        {!chatOpen && (
          <button onClick={() => setChatOpen(true)} className="fixed bottom-16 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 shadow-lg transition-all hover:scale-110 hover:bg-slate-700 sm:bottom-6 sm:right-6">
            <MessageCircle className="h-5 w-5 text-white/60" />
          </button>
        )}

        {/* Section indicators */}
        <div className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {navItems.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`h-1.5 rounded-full transition-all ${section === i ? "w-6 bg-white/50" : "w-1.5 bg-white/20"}`} />
          ))}
        </div>
      </main>
    </>
  )
}
