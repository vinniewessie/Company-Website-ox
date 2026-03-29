"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import {
  Menu, X, Bot, BarChart3, ShoppingCart, Code, Gamepad2,
  Mail, Phone, MessageCircle, Send, ArrowRight, Check
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
        setTimeout(() => setPhase("name"), 500)
        setTimeout(() => setPhase("fadeout"), 3000)
        setTimeout(() => onDone(), 3600)
      }
    }, 90)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
      style={{ opacity: phase === "fadeout" ? 0 : 1, transition: "opacity 0.6s ease" }}
    >
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(59,130,246,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.5) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {phase === "typing" && (
        <div className="w-full max-w-lg px-4">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-slate-900/90 shadow-2xl">
            <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/50 px-4 py-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-white/30">php artisan webman:boot</span>
            </div>
            <div className="p-4 font-mono text-[11px] leading-relaxed sm:text-xs">
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

      {phase === "name" && (
        <div className="text-center px-4" style={{ animation: "fadeUp 1s cubic-bezier(0.16,1,0.3,1) both" }}>
          <h1
            className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-5xl font-extralight tracking-[0.4em] text-transparent sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ animation: "glow 3s ease-in-out infinite" }}
          >
            WEBMAN
          </h1>
          <div className="mt-6 h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <p className="mt-4 text-[10px] text-white/25 tracking-[0.3em] uppercase sm:text-xs">by WeKnow Solutions</p>
        </div>
      )}
    </div>
  )
}

// ─── WhatsApp Themed Chatbot Demo ─────────────────────────────────────────────
const WA_MSGS = [
  { from: "user", text: "Hi, I need help with my order #4521" },
  { from: "bot", text: "Hello! I'm Webman, your AI assistant. Let me check that for you..." },
  { from: "bot", text: "Order #4521 is confirmed and will be shipped today!" },
  { from: "user", text: "What time will it arrive?" },
  { from: "bot", text: "Estimated delivery: 2-5 PM. You'll receive a tracking link shortly." },
]

function ChatbotDemo() {
  const [vis, setVis] = useState(0)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVis(0)
    let i = 0
    const t = setInterval(() => { i++; setVis(i); if (i >= WA_MSGS.length) clearInterval(t) }, 1200)
    return () => clearInterval(t)
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [vis])

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* WhatsApp Header */}
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200">
          <Bot className="h-5 w-5 text-[#075e54]" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white">Webman</div>
          <div className="text-xs text-white/70">online</div>
        </div>
        <Phone className="h-5 w-5 text-white/70" />
      </div>
      
      {/* Chat Area - WhatsApp wallpaper style */}
      <div 
        className="flex-1 space-y-2 overflow-y-auto p-3"
        style={{ 
          backgroundColor: "#0b141a",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}
      >
        {WA_MSGS.slice(0, vis).map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`} style={{ animation: "fadeUp 0.3s ease both" }}>
            <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm ${
              m.from === "user" 
                ? "bg-[#005c4b] text-white rounded-br-none" 
                : "bg-[#202c33] text-white/90 rounded-bl-none"
            }`}>
              {m.text}
              <div className="mt-1 flex items-center justify-end gap-1">
                <span className="text-[10px] text-white/40">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {m.from === "user" && <Check className="h-3 w-3 text-blue-400" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      
      {/* Input Area */}
      <div className="flex items-center gap-2 bg-[#202c33] px-3 py-2">
        <div className="flex-1 rounded-full bg-[#2a3942] px-4 py-2 text-sm text-white/30">
          Type a message
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00a884]">
          <Send className="h-4 w-4 text-white" />
        </div>
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
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="grid grid-cols-3 gap-3">
        {[{ l: "Revenue", v: "$128K" }, { l: "Users", v: "14.2K" }, { l: "Growth", v: "+24%" }].map((s) => (
          <div key={s.l} className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-center">
            <div className="text-lg font-medium text-white/70">{s.v}</div>
            <div className="text-xs text-white/30">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg border border-white/5 bg-white/[0.02] p-4">
        <div className="mb-3 text-xs text-white/30">Monthly Revenue</div>
        <div className="flex h-24 items-end gap-1">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t bg-slate-600/50" style={{ height: `${Math.min(b + (t % 3) * 3 * (i % 2 === 0 ? 1 : -1), 100)}%`, transition: "height 1s ease" }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── E-Commerce Demo ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "AirPods Pro", price: "$249" },
  { name: "Smart Watch", price: "$399" },
  { name: "MacBook Air", price: "$1,299" },
  { name: "iPhone 15", price: "$799" },
]

function EcommerceDemo() {
  const [cart, setCart] = useState<string[]>([])
  const add = (n: string) => { if (!cart.includes(n)) setCart((c) => [...c, n]) }

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/30">Products</span>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/40">
          <ShoppingCart className="h-3 w-3" /><span>{cart.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 overflow-y-auto">
        {PRODUCTS.map((p) => (
          <div key={p.name} className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="mb-2 h-12 w-12 rounded-lg bg-slate-800/50" />
            <div className="mb-1 text-xs font-medium text-white/60">{p.name}</div>
            <div className="mb-2 text-sm text-white/40">{p.price}</div>
            <button 
              onClick={() => add(p.name)} 
              className={`w-full rounded py-1.5 text-xs transition-all ${cart.includes(p.name) ? "bg-slate-700/50 text-white/50" : "bg-slate-800/50 text-white/40 hover:bg-slate-700/50"}`}
            >
              {cart.includes(p.name) ? "Added" : "Add"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Software Demo ─────────────────────────────────────────────────────────────
const CODE_LINES = [
  { t: "class WeKnowApp {", c: "text-violet-400/70" },
  { t: "  modules = ['Auth', 'API'];", c: "text-slate-500" },
  { t: "  async boot() {", c: "text-cyan-400/70" },
  { t: "    await this.loadModules();", c: "text-slate-500" },
  { t: "  }", c: "text-cyan-400/70" },
  { t: "}", c: "text-violet-400/70" },
]

function SoftwareDemo() {
  const [typed, setTyped] = useState(0)
  const [output, setOutput] = useState<string[]>([])

  useEffect(() => { let i = 0; const t = setInterval(() => { i++; setTyped(i); if (i >= CODE_LINES.length) clearInterval(t) }, 200); return () => clearInterval(t) }, [])

  const run = () => {
    setOutput([])
    const logs = ["> Loading...", "> Auth OK", "> API OK", "> Ready"]
    logs.forEach((l, i) => setTimeout(() => setOutput((p) => [...p, l]), i * 300))
  }

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex-1 overflow-hidden rounded-lg border border-white/5 bg-slate-950/80">
        <div className="flex items-center gap-2 border-b border-white/5 bg-slate-800/30 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-red-500/50" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/50" />
          <div className="h-2 w-2 rounded-full bg-green-500/50" />
          <span className="ml-2 text-xs text-white/20">app.ts</span>
        </div>
        <div className="p-3 font-mono text-xs">
          {CODE_LINES.slice(0, typed).map((l, i) => <div key={i} className={l.c}>{l.t}</div>)}
        </div>
      </div>
      {output.length > 0 && (
        <div className="rounded-lg border border-white/5 bg-slate-950/80 p-3 font-mono text-xs">
          {output.map((l, i) => <div key={i} className="text-slate-500">{l}</div>)}
        </div>
      )}
      <button onClick={run} disabled={typed < CODE_LINES.length} className="rounded-lg bg-slate-800/50 py-2 text-xs text-white/40 transition-all hover:bg-slate-700/50 disabled:opacity-30">
        Run
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

  useEffect(() => {
    if (!active) return
    const t = setTimeout(() => setActive(false), 5000)
    return () => clearTimeout(t)
  }, [active])

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between text-xs text-white/30">
        <span>Click Game</span>
        <span>Score: {score}</span>
      </div>
      <div 
        className="relative flex-1 cursor-pointer overflow-hidden rounded-lg border border-white/5 bg-slate-950/80"
        onClick={hit}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute h-1 w-1 rounded-full bg-white/10" style={{ left: `${(i * 37 + 13) % 90 + 5}%`, top: `${(i * 53 + 7) % 80 + 10}%` }} />
        ))}
        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40">
            {score > 0 && <div className="text-sm text-white/50">Score: {score}</div>}
            <button onClick={(e) => { e.stopPropagation(); start() }} className="rounded-full bg-slate-700/50 px-5 py-2 text-xs text-white/50">
              {score > 0 ? "Retry" : "Play"}
            </button>
          </div>
        )}
        {active && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xs text-white/20">Click anywhere to score!</div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Services ─────────────────────────────────────────────────────────────────
const SERVICES = [
  { key: "AI Chatbots", icon: Bot, desc: "WhatsApp bots like Webman" },
  { key: "Data Analytics", icon: BarChart3, desc: "Real-time dashboards" },
  { key: "E-Commerce", icon: ShoppingCart, desc: "Online stores" },
  { key: "Custom Software", icon: Code, desc: "Enterprise apps" },
  { key: "Game Dev", icon: Gamepad2, desc: "Cross-platform games" },
]

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [splashDone, setSplashDone] = useState(false)
  const [section, setSection] = useState(0)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [msg, setMsg] = useState("")
  const [selectedSvc, setSelectedSvc] = useState("AI Chatbots")

  const navItems = ["Home", "Services", "Contact"]

  const goTo = (i: number) => {
    if (!containerRef.current || i < 0 || i >= 3) return
    containerRef.current.scrollTo({ left: containerRef.current.offsetWidth * i, behavior: "smooth" })
    setSection(i)
    setSidebarOpen(false)
  }

  const sendWA = () => {
    if (!msg.trim()) return
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
    setMsg("")
    setChatOpen(false)
  }

  useEffect(() => {
    if (splashDone) {
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" })
          setSection(0)
        }
      }, 300)
    }
  }, [splashDone])

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
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 15% 20%, rgba(59,130,246,0.04) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(99,102,241,0.025) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, #050a15 0%, #030712 100%)" }} />
          <div className="absolute inset-0 opacity-[0.012]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)", backgroundSize: "100px 100px" }} />
          {/* Subtle floating orb */}
          <div className="absolute left-1/4 top-1/3 h-96 w-96 rounded-full bg-blue-500/[0.015] blur-3xl" />
          <div className="absolute right-1/4 bottom-1/3 h-72 w-72 rounded-full bg-indigo-500/[0.01] blur-3xl" />
        </div>

        {/* Keyframes */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          @keyframes glow { 0%,100%{filter:drop-shadow(0 0 40px rgba(59,130,246,0.25))} 50%{filter:drop-shadow(0 0 80px rgba(99,102,241,0.35))} }
          @keyframes slideIn { from{transform:translateX(-100%);opacity:0} to{transform:translateX(0);opacity:1} }
          @keyframes fadeIn { from{opacity:0} to{opacity:1} }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
          @keyframes floatCode1 { 
            0%,100%{transform:translateY(0) translateX(0) rotate(0deg);opacity:0.6} 
            25%{transform:translateY(-15px) translateX(5px) rotate(1deg);opacity:0.8}
            50%{transform:translateY(-8px) translateX(-8px) rotate(-0.5deg);opacity:0.5}
            75%{transform:translateY(-20px) translateX(3px) rotate(0.5deg);opacity:0.7}
          }
          @keyframes floatCode2 { 
            0%,100%{transform:translateY(0) translateX(0);opacity:0.5} 
            33%{transform:translateY(-12px) translateX(-6px);opacity:0.7}
            66%{transform:translateY(-18px) translateX(4px);opacity:0.4}
          }
          @keyframes floatCode3 { 
            0%,100%{transform:translateY(0) rotate(0deg);opacity:0.4} 
            50%{transform:translateY(-10px) rotate(1deg);opacity:0.6}
          }
          @keyframes floatSymbol {
            0%,100%{transform:translateY(0) scale(1);opacity:1}
            50%{transform:translateY(-20px) scale(1.1);opacity:0.6}
          }
        `}} />

        {/* Nav */}
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 md:px-8 lg:px-12">
          <button onClick={() => goTo(0)} className="transition-transform hover:scale-105">
            <Image src="/weknow-logo.png" alt="WeKnow Solutions" width={120} height={40} className="h-8 w-auto object-contain sm:h-10 md:h-11" priority />
          </button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navItems.map((item, i) => (
              <button key={item} onClick={() => goTo(i)} className={`text-sm font-medium transition-colors ${section === i ? "text-white" : "text-white/40 hover:text-white/60"}`}>
                {item}
              </button>
            ))}
          </div>

          <button onClick={() => goTo(2)} className="hidden rounded-full bg-slate-800/80 px-5 py-2 text-sm font-medium text-white/70 transition-all hover:bg-slate-700 md:block">
            Contact
          </button>

          {/* Mobile Menu Button */}
          <button onClick={() => setSidebarOpen(true)} className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 transition-all active:scale-95 md:hidden">
            <Menu className="h-5 w-5 text-white/60" />
          </button>
        </nav>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setSidebarOpen(false)}
              style={{ animation: "fadeIn 0.3s ease" }}
            />
            
            {/* Sidebar */}
            <div 
              className="fixed bottom-0 left-0 top-0 z-[70] w-72 bg-slate-900 shadow-2xl md:hidden"
              style={{ animation: "slideIn 0.3s cubic-bezier(0.16,1,0.3,1)" }}
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <Image src="/weknow-logo.png" alt="WeKnow" width={100} height={35} className="h-8 w-auto object-contain" />
                <button onClick={() => setSidebarOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 transition-all hover:bg-white/10">
                  <X className="h-5 w-5 text-white/60" />
                </button>
              </div>

              {/* Sidebar Nav */}
              <div className="flex flex-col gap-1 p-4">
                {navItems.map((item, i) => (
                  <button 
                    key={item} 
                    onClick={() => goTo(i)} 
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition-all ${section === i ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white/70"}`}
                    style={{ animation: `fadeUp 0.4s ease ${i * 0.1}s both` }}
                  >
                    {item === "Home" && <div className="h-2 w-2 rounded-full bg-green-500" />}
                    {item === "Services" && <Bot className="h-4 w-4" />}
                    {item === "Contact" && <Mail className="h-4 w-4" />}
                    {item}
                  </button>
                ))}
              </div>

              {/* Sidebar Footer */}
              <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4" style={{ animation: "fadeUp 0.5s ease 0.3s both" }}>
                <div className="mb-3 text-xs text-white/30">Get in touch</div>
                <div className="flex flex-col gap-2">
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/50 transition-all hover:bg-white/10">
                    <Mail className="h-3.5 w-3.5" /> {EMAIL}
                  </a>
                  <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-white/50 transition-all hover:bg-white/10">
                    <Phone className="h-3.5 w-3.5" /> {PHONE}
                  </a>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Sections */}
        <div ref={containerRef} className="relative z-10 flex h-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: "none" }}>

          {/* HOME */}
          <section className="relative flex min-h-screen w-screen shrink-0 snap-start flex-col justify-center px-5 pt-20 sm:px-8 md:px-12 lg:px-16">
            {/* Floating Code Snippets */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {/* Code Block 1 - Top Right */}
              <div 
                className="absolute right-[5%] top-[15%] hidden w-56 rounded-lg border border-white/[0.05] bg-slate-900/40 p-3 font-mono text-[10px] backdrop-blur-sm lg:block"
                style={{ animation: "floatCode1 20s ease-in-out infinite" }}
              >
                <div className="mb-1 text-blue-400/60">{"// API Route"}</div>
                <div className="text-violet-400/50">{"export async function"}</div>
                <div className="text-cyan-400/50">{"  GET(request) {"}</div>
                <div className="text-amber-400/50">{"    return Response.json(data)"}</div>
                <div className="text-cyan-400/50">{"  }"}</div>
              </div>
              
              {/* Code Block 2 - Bottom Right */}
              <div 
                className="absolute bottom-[20%] right-[8%] hidden w-48 rounded-lg border border-white/[0.05] bg-slate-900/40 p-3 font-mono text-[10px] backdrop-blur-sm md:block"
                style={{ animation: "floatCode2 18s ease-in-out infinite 2s" }}
              >
                <div className="text-emerald-400/50">{"const bot = new Webman()"}</div>
                <div className="text-slate-500">{"bot.onMessage(async (msg) => {"}</div>
                <div className="text-amber-400/50">{"  await bot.reply(msg)"}</div>
                <div className="text-slate-500">{"});"}</div>
              </div>
              
              {/* Code Block 3 - Top Center */}
              <div 
                className="absolute left-[40%] top-[8%] hidden w-44 rounded-lg border border-white/[0.05] bg-slate-900/40 p-2.5 font-mono text-[9px] backdrop-blur-sm xl:block"
                style={{ animation: "floatCode3 22s ease-in-out infinite 1s" }}
              >
                <div className="text-pink-400/50">{"@Component"}</div>
                <div className="text-violet-400/50">{"class Dashboard {"}</div>
                <div className="text-cyan-400/40">{"  render() { ... }"}</div>
                <div className="text-violet-400/50">{"}"}</div>
              </div>
              
              {/* Code Block 4 - Right Middle (Mobile visible) */}
              <div 
                className="absolute right-[3%] top-[45%] w-36 rounded-lg border border-white/[0.04] bg-slate-900/30 p-2 font-mono text-[8px] backdrop-blur-sm sm:w-40 sm:text-[9px] md:right-[6%]"
                style={{ animation: "floatCode2 16s ease-in-out infinite 3s" }}
              >
                <div className="text-blue-400/40">{"<?php"}</div>
                <div className="text-violet-400/40">{"Route::get('/', fn)"}</div>
                <div className="text-slate-500/40">{"// Laravel"}</div>
              </div>
              
              {/* Code Block 5 - Bottom Left */}
              <div 
                className="absolute bottom-[25%] left-[60%] hidden w-52 rounded-lg border border-white/[0.05] bg-slate-900/40 p-3 font-mono text-[10px] backdrop-blur-sm lg:block"
                style={{ animation: "floatCode1 19s ease-in-out infinite 4s" }}
              >
                <div className="text-cyan-400/50">{"function analyze(data) {"}</div>
                <div className="text-slate-500">{"  const result = ml.predict(data)"}</div>
                <div className="text-amber-400/50">{"  return { score: result }"}</div>
                <div className="text-cyan-400/50">{"}"}</div>
              </div>
              
              {/* Floating Brackets/Symbols */}
              <div className="absolute left-[75%] top-[30%] font-mono text-2xl text-white/[0.03]" style={{ animation: "floatSymbol 15s ease-in-out infinite" }}>{"{ }"}</div>
              <div className="absolute left-[85%] top-[60%] font-mono text-xl text-white/[0.025]" style={{ animation: "floatSymbol 18s ease-in-out infinite 2s" }}>{"< />"}</div>
              <div className="absolute left-[65%] top-[75%] hidden font-mono text-3xl text-white/[0.02] md:block" style={{ animation: "floatSymbol 20s ease-in-out infinite 4s" }}>{"( )"}</div>
              <div className="absolute left-[55%] top-[12%] hidden font-mono text-lg text-white/[0.025] lg:block" style={{ animation: "floatSymbol 17s ease-in-out infinite 1s" }}>{"=>"}</div>
            </div>
            
            <div className="relative z-10 max-w-xl lg:max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium tracking-wide text-white/40 sm:text-xs">Available for projects</span>
              </div>

              <h1 className="mb-5 text-3xl font-extralight leading-[1.15] tracking-tight text-white/90 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Intelligent Software
                <br />
                <span className="text-white/30">Solutions.</span>
              </h1>

              <p className="mb-8 max-w-md text-sm leading-relaxed text-white/35 sm:mb-10 sm:text-base md:text-lg">
                We build AI chatbots, analytics platforms, e-commerce, and custom software that drive growth.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button onClick={() => goTo(2)} className="group flex items-center justify-center gap-2.5 rounded-full bg-white/[0.08] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-sm transition-all hover:bg-white/[0.12] sm:px-9">
                  Book a Service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => goTo(1)} className="flex items-center justify-center gap-2 rounded-full border border-white/[0.08] px-7 py-3.5 text-sm font-medium text-white/40 transition-all hover:border-white/15 hover:text-white/60 sm:px-9">
                  View Services
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-2.5 sm:mt-12">
                {["Laravel", "React", "Python", "AI/ML"].map((t) => (
                  <span key={t} className="rounded-full border border-white/[0.05] bg-white/[0.02] px-3.5 py-1.5 text-[10px] font-medium tracking-wide text-white/25 sm:text-xs">{t}</span>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section className="flex min-h-screen w-screen shrink-0 snap-start items-center px-5 py-20 sm:px-8 md:px-12 md:py-0 lg:px-16">
            <div className="mx-auto w-full max-w-5xl">
              <div className="mb-6 sm:mb-8">
                <h2 className="mb-2 text-xl font-extralight tracking-tight text-white/90 sm:text-2xl md:text-3xl">Our Services</h2>
                <p className="text-xs text-white/30 sm:text-sm">Select a service to explore the demo</p>
              </div>

              <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                {/* Service list - horizontal scroll on mobile */}
                <div className="flex gap-2.5 overflow-x-auto pb-3 lg:w-60 lg:shrink-0 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
                  {SERVICES.map((s) => {
                    const Icon = s.icon
                    const active = selectedSvc === s.key
                    return (
                      <button
                        key={s.key}
                        onClick={() => setSelectedSvc(s.key)}
                        className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 lg:w-full lg:py-3.5 ${active ? "border-white/[0.12] bg-white/[0.05]" : "border-white/[0.04] bg-white/[0.015] hover:border-white/[0.08] hover:bg-white/[0.03]"}`}
                      >
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${active ? "bg-white/[0.08]" : "bg-white/[0.03]"}`}>
                          <Icon className={`h-4 w-4 transition-colors ${active ? "text-white/60" : "text-white/30"}`} />
                        </div>
                        <div>
                          <div className={`text-xs font-medium transition-colors sm:text-sm ${active ? "text-white/70" : "text-white/40"}`}>{s.key}</div>
                          <div className="hidden text-[11px] text-white/25 lg:block">{s.desc}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Demo */}
                <div className="flex-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/40 backdrop-blur-sm" style={{ minHeight: 340 }}>
                  {renderDemo(selectedSvc)}
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="flex min-h-screen w-screen shrink-0 snap-start items-center px-5 py-20 sm:px-8 md:px-12 md:py-0 lg:px-16">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-xl font-extralight tracking-tight text-white/90 sm:text-2xl md:text-3xl">Get in Touch</h2>
                <p className="text-xs text-white/30 sm:text-sm">We&apos;d love to hear from you</p>
              </div>

              <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-200 hover:border-white/[0.1] hover:bg-white/[0.04]">
                  <Mail className="h-5 w-5 text-white/30" />
                  <div>
                    <div className="text-sm font-medium text-white/50">Email</div>
                    <div className="text-[10px] text-white/25 sm:text-xs">vincentwessie</div>
                  </div>
                </a>
                <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-200 hover:border-white/[0.1] hover:bg-white/[0.04]">
                  <Phone className="h-5 w-5 text-white/30" />
                  <div>
                    <div className="text-sm font-medium text-white/50">Call</div>
                    <div className="text-[10px] text-white/25 sm:text-xs">+263 781...</div>
                  </div>
                </a>
                <button onClick={() => setChatOpen(true)} className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-200 hover:border-white/[0.1] hover:bg-white/[0.04]">
                  <MessageCircle className="h-5 w-5 text-white/30" />
                  <div className="text-left">
                    <div className="text-sm font-medium text-white/50">WhatsApp</div>
                    <div className="text-[10px] text-white/25 sm:text-xs">Chat now</div>
                  </div>
                </button>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5">
                <textarea
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Tell us about your project..."
                  className="mb-4 h-28 w-full resize-none rounded-xl border border-white/[0.06] bg-slate-950/50 px-4 py-3.5 text-sm text-white/80 placeholder:text-white/20 focus:border-white/[0.12] focus:outline-none"
                />
                <button onClick={sendWA} disabled={!msg.trim()} className="w-full rounded-xl bg-white/[0.06] py-3 text-sm font-medium text-white/50 transition-all duration-200 hover:bg-white/[0.1] hover:text-white/70 disabled:opacity-30">
                  Send via WhatsApp
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* WhatsApp Widget */}
        {chatOpen && (
          <div className="fixed bottom-4 left-4 right-4 z-50 overflow-hidden rounded-xl border border-white/10 bg-slate-900/95 shadow-xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-72" style={{ animation: "fadeUp 0.3s ease" }}>
            <div className="flex items-center justify-between bg-[#075e54] px-4 py-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-white" />
                <span className="text-sm font-medium text-white">Chat with us</span>
              </div>
              <button onClick={() => setChatOpen(false)} className="rounded p-1 hover:bg-white/10"><X className="h-4 w-4 text-white/70" /></button>
            </div>
            <div className="p-3">
              <div className="mb-3 rounded-lg bg-[#202c33] p-3 text-xs text-white/70">
                Hi! Send us a message and we&apos;ll respond shortly.
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendWA()}
                  placeholder="Type a message..."
                  className="flex-1 rounded-full bg-[#2a3942] px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none"
                />
                <button onClick={sendWA} disabled={!msg.trim()} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00a884] transition-all hover:bg-[#00c896] disabled:opacity-40">
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating WA Button */}
        {!chatOpen && (
          <button onClick={() => setChatOpen(true)} className="fixed bottom-14 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] shadow-lg transition-all hover:scale-110 sm:bottom-6 sm:right-6">
            <MessageCircle className="h-5 w-5 text-white" />
          </button>
        )}

        {/* Section indicators */}
        <div className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2.5 sm:bottom-8">
          {navItems.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 ${section === i ? "h-1.5 w-7 bg-white/40" : "h-1.5 w-1.5 bg-white/15 hover:bg-white/25"}`} />
          ))}
        </div>
      </main>
    </>
  )
}
