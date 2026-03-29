"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import {
  Menu, X, Bot, BarChart3, ShoppingCart, Code, Gamepad2,
  Mail, Phone, MessageCircle, Send, ArrowRight, Check
} from "lucide-react"

const WHATSAPP_NUMBER = "263781132817"
const EMAIL = "vincentwessie@gmail.com"
const PHONE = "+263 781 132 817"

// ─── Continuous Background Code Rain ──────────────────────────────────────────
const CODE_RAIN_LINES = [
  { t: "<?php namespace App\\Console;", c: "#4f86c6" },
  { t: "use Illuminate\\Console\\Command;", c: "#818cf8" },
  { t: "class Webman extends Command {", c: "#a78bfa" },
  { t: "  protected $signature = 'webman:run';", c: "#38bdf8" },
  { t: "  public function handle() {", c: "#34d399" },
  { t: "    $bot = new WhatsAppBot();", c: "#fbbf24" },
  { t: "    $bot->listen()->reply();", c: "#f472b6" },
  { t: "    return Command::SUCCESS;", c: "#38bdf8" },
  { t: "  }", c: "#34d399" },
  { t: "}", c: "#a78bfa" },
  { t: "const analyze = (data: Dataset) => {", c: "#4f86c6" },
  { t: "  const model = new MLPipeline(data);", c: "#818cf8" },
  { t: "  return model.predict().confidence;", c: "#fbbf24" },
  { t: "};", c: "#38bdf8" },
  { t: "Route::get('/api/v1/bot', [WebmanController::class, 'index']);", c: "#4f86c6" },
  { t: "export async function GET(req: Request) {", c: "#34d399" },
  { t: "  const { userId } = await auth();", c: "#818cf8" },
  { t: "  const data = await db.query.find({ userId });", c: "#fbbf24" },
  { t: "  return Response.json({ data, status: 200 });", c: "#38bdf8" },
  { t: "}", c: "#34d399" },
  { t: "@Component({ selector: 'app-root' })", c: "#f472b6" },
  { t: "class AppComponent implements OnInit {", c: "#a78bfa" },
  { t: "  ngOnInit(): void { this.loadData(); }", c: "#38bdf8" },
  { t: "}", c: "#a78bfa" },
  { t: "SELECT u.name, SUM(o.total) as revenue", c: "#4f86c6" },
  { t: "FROM users u JOIN orders o ON u.id = o.user_id", c: "#818cf8" },
  { t: "WHERE o.status = 'completed'", c: "#fbbf24" },
  { t: "GROUP BY u.id ORDER BY revenue DESC;", c: "#38bdf8" },
  { t: "function trainModel(epochs: number) {", c: "#34d399" },
  { t: "  for (let i = 0; i < epochs; i++) {", c: "#818cf8" },
  { t: "    loss = backpropagate(weights);", c: "#f472b6" },
  { t: "    weights = optimize(loss, lr);", c: "#fbbf24" },
  { t: "  }", c: "#34d399" },
  { t: "}", c: "#34d399" },
]

function CodeRainBackground() {
  const [lines, setLines] = useState<{ id: number; text: string; color: string; x: number; y: number; opacity: number; speed: number }[]>([])
  const counterRef = useRef(0)

  useEffect(() => {
    // Seed initial lines
    const initial = Array.from({ length: 18 }, (_, i) => {
      const src = CODE_RAIN_LINES[i % CODE_RAIN_LINES.length]
      counterRef.current++
      return {
        id: counterRef.current,
        text: src.t,
        color: src.c,
        x: Math.random() * 90,
        y: Math.random() * 100,
        opacity: Math.random() * 0.09 + 0.03,
        speed: Math.random() * 14 + 10,
      }
    })
    setLines(initial)

    const interval = setInterval(() => {
      const src = CODE_RAIN_LINES[Math.floor(Math.random() * CODE_RAIN_LINES.length)]
      counterRef.current++
      const newLine = {
        id: counterRef.current,
        text: src.t,
        color: src.c,
        x: Math.random() * 88,
        y: -5,
        opacity: Math.random() * 0.1 + 0.04,
        speed: Math.random() * 16 + 12,
      }
      setLines(prev => {
        const updated = prev.map(l => ({ ...l, y: l.y + (100 / (l.speed * 10)) }))
        const filtered = updated.filter(l => l.y < 110)
        return [...filtered, newLine].slice(-28)
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {lines.map(l => (
        <div
          key={l.id}
          className="absolute whitespace-nowrap font-mono text-[9px] sm:text-[10px] md:text-[11px] transition-all duration-[600ms] ease-linear"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            color: l.color,
            opacity: l.opacity,
          }}
        >
          {l.text}
        </div>
      ))}
    </div>
  )
}

// ─── Splash Screen ─────────────────────────────────────────────────────────────
const LARAVEL_LINES = [
  { t: "<?php", c: "#4f86c6" },
  { t: "", c: "" },
  { t: "namespace App\\Console\\Commands;", c: "#818cf8" },
  { t: "", c: "" },
  { t: "use Illuminate\\Console\\Command;", c: "#4f86c6" },
  { t: "", c: "" },
  { t: "class BootWebman extends Command {", c: "#a78bfa" },
  { t: "    protected $signature = 'webman:boot';", c: "#38bdf8" },
  { t: "", c: "" },
  { t: "    public function handle() {", c: "#34d399" },
  { t: "        $this->info('Initializing Webman...');", c: "#fbbf24" },
  { t: "        return 'WEBMAN';", c: "#f472b6" },
  { t: "    }", c: "#34d399" },
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
        setTimeout(() => setPhase("fadeout"), 2800)
        setTimeout(() => onDone(), 3400)
      }
    }, 85)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#030712]"
      style={{ opacity: phase === "fadeout" ? 0 : 1, transition: "opacity 0.6s ease" }}
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.4) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {phase === "typing" && (
        <div className="w-full max-w-lg px-4">
          <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-slate-900/95 shadow-2xl shadow-black/60">
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-slate-800/60 px-4 py-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <span className="ml-3 font-mono text-[10px] text-white/25 sm:text-xs">php artisan webman:boot</span>
            </div>
            <div className="p-5 font-mono text-[11px] leading-[1.8] sm:text-xs">
              {LARAVEL_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} style={{ color: line.color || "transparent" }}>
                  {line.t || "\u00A0"}
                </div>
              ))}
              {visibleLines < LARAVEL_LINES.length && (
                <span className="inline-block h-4 w-1.5 bg-blue-400" style={{ animation: "blink 0.9s step-end infinite" }} />
              )}
            </div>
          </div>
        </div>
      )}

      {phase === "name" && (
        <div className="text-center px-4" style={{ animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both" }}>
          <h1
            className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300 bg-clip-text font-mono text-5xl font-thin tracking-[0.5em] text-transparent sm:text-7xl md:text-8xl lg:text-9xl"
            style={{ animation: "glow 3s ease-in-out infinite", paddingLeft: "0.5em" }}
          >
            WEBMAN
          </h1>
          <div className="mt-5 h-px w-20 mx-auto" style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.3), transparent)" }} />
          <p className="mt-4 font-mono text-[9px] tracking-[0.35em] text-white/20 sm:text-[11px]">by WeKnow Solutions</p>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes glow { 0%,100%{filter:drop-shadow(0 0 30px rgba(99,102,241,0.2))} 50%{filter:drop-shadow(0 0 60px rgba(59,130,246,0.35))} }
      `}} />
    </div>
  )
}

// ─── WhatsApp Themed Chatbot Demo ─────────────────────────────────────────────
const WA_MSGS = [
  { from: "user", text: "Hi, I need help with my order #4521" },
  { from: "bot", text: "Hello! I'm Webman, your AI assistant. Let me check that for you..." },
  { from: "bot", text: "Order #4521 is confirmed and ships today!" },
  { from: "user", text: "What time will it arrive?" },
  { from: "bot", text: "Estimated delivery: 2-5 PM. Tracking link sent!" },
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
      <div className="flex items-center gap-3 bg-[#075e54] px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white">Webman</div>
          <div className="text-[10px] text-white/60">online</div>
        </div>
        <Phone className="h-4 w-4 text-white/60" />
      </div>
      <div className="flex-1 space-y-2 overflow-y-auto p-3" style={{ backgroundColor: "#0b141a", backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
        {WA_MSGS.slice(0, vis).map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`} style={{ animation: "fadeUp 0.3s ease both" }}>
            <div className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow-sm ${m.from === "user" ? "rounded-br-none bg-[#005c4b] text-white" : "rounded-bl-none bg-[#202c33] text-white/90"}`}>
              {m.text}
              <div className="mt-1 flex items-center justify-end gap-1">
                <span className="text-[10px] text-white/35">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                {m.from === "user" && <Check className="h-3 w-3 text-cyan-400" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="flex items-center gap-2 bg-[#202c33] px-3 py-2">
        <div className="flex-1 rounded-full bg-[#2a3942] px-4 py-2 text-xs text-white/25">Type a message</div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00a884]">
          <Send className="h-3.5 w-3.5 text-white" />
        </div>
      </div>
    </div>
  )
}

// ─── Analytics Demo ────────────────────────────────────────────────────────────
function AnalyticsDemo() {
  const [t, setT] = useState(0)
  const bars = [65, 80, 45, 90, 70, 55, 88, 72, 60, 95, 78, 83]
  useEffect(() => { const i = setInterval(() => setT(p => p + 1), 1500); return () => clearInterval(i) }, [])
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="grid grid-cols-3 gap-3">
        {[{ l: "Revenue", v: "$128K" }, { l: "Users", v: "14.2K" }, { l: "Growth", v: "+24%" }].map(s => (
          <div key={s.l} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-center">
            <div className="text-base font-medium text-white/60">{s.v}</div>
            <div className="text-[10px] text-white/25">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
        <div className="mb-3 text-[10px] text-white/25">Monthly Revenue</div>
        <div className="flex h-28 items-end gap-1">
          {bars.map((b, i) => (
            <div key={i} className="flex-1 rounded-t" style={{ height: `${Math.min(b + (t % 3) * 3 * (i % 2 === 0 ? 1 : -1), 100)}%`, background: `hsl(${210 + i * 5}, 60%, ${30 + i * 2}%)`, transition: "height 1s ease" }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── E-Commerce Demo ───────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "AirPods Pro", price: "$249" },
  { name: "Smart Watch", price: "$399" },
  { name: "MacBook Air", price: "$1,299" },
  { name: "iPhone 15", price: "$799" },
]
function EcommerceDemo() {
  const [cart, setCart] = useState<string[]>([])
  const add = (n: string) => { if (!cart.includes(n)) setCart(c => [...c, n]) }
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-white/30">Products</span>
        <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[10px] text-white/35">
          <ShoppingCart className="h-3 w-3" /><span>{cart.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 overflow-y-auto">
        {PRODUCTS.map(p => (
          <div key={p.name} className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3">
            <div className="mb-2 h-10 w-10 rounded-lg bg-slate-800/50" />
            <div className="mb-0.5 text-xs font-medium text-white/55">{p.name}</div>
            <div className="mb-2 text-xs text-white/35">{p.price}</div>
            <button onClick={() => add(p.name)} className={`w-full rounded-lg py-1.5 text-[10px] transition-all ${cart.includes(p.name) ? "bg-slate-700/40 text-white/40" : "bg-slate-800/50 text-white/35 hover:bg-slate-700/50"}`}>
              {cart.includes(p.name) ? "Added" : "Add"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Software Demo ─────────────────────────────────────────────────────────────
const SW_LINES = [
  { t: "class WeKnowApp {", c: "#a78bfa" },
  { t: "  modules = ['Auth', 'API', 'ML'];", c: "#94a3b8" },
  { t: "  async boot() {", c: "#34d399" },
  { t: "    await this.loadModules();", c: "#94a3b8" },
  { t: "    this.start();", c: "#38bdf8" },
  { t: "  }", c: "#34d399" },
  { t: "}", c: "#a78bfa" },
]
function SoftwareDemo() {
  const [typed, setTyped] = useState(0)
  const [output, setOutput] = useState<string[]>([])
  useEffect(() => { let i = 0; const t = setInterval(() => { i++; setTyped(i); if (i >= SW_LINES.length) clearInterval(t) }, 200); return () => clearInterval(t) }, [])
  const run = () => { setOutput([]); const logs = ["> Loading...", "> Auth OK", "> API OK", "> ML Ready", "> All systems up"]; logs.forEach((l, i) => setTimeout(() => setOutput(p => [...p, l]), i * 280)) }
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex-1 overflow-hidden rounded-xl border border-white/[0.05] bg-slate-950/80">
        <div className="flex items-center gap-2 border-b border-white/[0.05] bg-slate-800/30 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-red-500/50" /><div className="h-2 w-2 rounded-full bg-yellow-500/50" /><div className="h-2 w-2 rounded-full bg-green-500/50" />
          <span className="ml-2 text-[10px] text-white/20">app.ts</span>
        </div>
        <div className="p-3 font-mono text-[10px] sm:text-xs leading-relaxed">
          {SW_LINES.slice(0, typed).map((l, i) => <div key={i} style={{ color: l.c }}>{l.t}</div>)}
        </div>
      </div>
      {output.length > 0 && (
        <div className="rounded-xl border border-white/[0.05] bg-slate-950/80 p-3 font-mono text-[10px]">
          {output.map((l, i) => <div key={i} className="text-emerald-400/50">{l}</div>)}
        </div>
      )}
      <button onClick={run} disabled={typed < SW_LINES.length} className="rounded-xl bg-white/[0.04] py-2 text-xs text-white/35 transition-all hover:bg-white/[0.07] disabled:opacity-30">Run</button>
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
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center justify-between text-[10px] text-white/25"><span>Click Game</span><span>Score: {score}</span></div>
      <div className="relative flex-1 cursor-pointer overflow-hidden rounded-xl border border-white/[0.05] bg-slate-950/80" onClick={hit}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="absolute h-1 w-1 rounded-full bg-white/10" style={{ left: `${(i * 37 + 13) % 90 + 5}%`, top: `${(i * 53 + 7) % 80 + 10}%` }} />
        ))}
        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40">
            {score > 0 && <div className="text-xs text-white/40">Score: {score}</div>}
            <button onClick={e => { e.stopPropagation(); start() }} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-xs text-white/40 hover:bg-white/[0.08]">
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
  { key: "AI Chatbots", icon: Bot, desc: "WhatsApp bots like Webman" },
  { key: "Data Analytics", icon: BarChart3, desc: "Real-time dashboards" },
  { key: "E-Commerce", icon: ShoppingCart, desc: "Online stores" },
  { key: "Custom Software", icon: Code, desc: "Enterprise apps" },
  { key: "Game Dev", icon: Gamepad2, desc: "Cross-platform games" },
]

// ─── Logo SVG (no background) ──────────────────────────────────────────────────
function Logo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Lightbulb base */}
        <ellipse cx="60" cy="82" rx="16" ry="6" fill="url(#bulbGrad)" opacity="0.5" />
        <rect x="50" y="80" width="20" height="8" rx="2" fill="url(#bulbGrad)" opacity="0.6" />
        <rect x="52" y="87" width="16" height="5" rx="2" fill="url(#bulbGrad)" opacity="0.5" />
        {/* Bulb globe */}
        <path d="M38 50 Q38 28 60 28 Q82 28 82 50 Q82 64 70 72 L50 72 Q38 64 38 50Z" fill="url(#globeGrad)" opacity="0.85" />
        {/* W lettermark */}
        <path d="M44 46 L50 62 L57 50 L64 62 L70 46" stroke="url(#wGrad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        {/* Arrow */}
        <path d="M58 38 L72 24 M72 24 L61 24 M72 24 L72 35" stroke="url(#arrowGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* Network dots */}
        <circle cx="32" cy="52" r="4" fill="#38bdf8" opacity="0.7" />
        <circle cx="88" cy="52" r="4" fill="#38bdf8" opacity="0.7" />
        <circle cx="38" cy="74" r="3.5" fill="#6366f1" opacity="0.7" />
        <circle cx="82" cy="74" r="3.5" fill="#6366f1" opacity="0.7" />
        <circle cx="60" cy="20" r="3.5" fill="#34d399" opacity="0.8" />
        {/* Network lines */}
        <line x1="36" y1="52" x2="44" y2="52" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" />
        <line x1="84" y1="52" x2="76" y2="52" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" />
        <line x1="41" y1="72" x2="50" y2="72" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
        <line x1="79" y1="72" x2="70" y2="72" stroke="#6366f1" strokeWidth="1.5" opacity="0.4" />
        {/* Glow arc */}
        <path d="M42 42 Q60 18 78 42" stroke="url(#arcGrad)" strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="bulbGrad" x1="44" y1="80" x2="76" y2="92" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1e3a8a" /><stop offset="1" stopColor="#0e7490" />
          </linearGradient>
          <linearGradient id="globeGrad" x1="38" y1="28" x2="82" y2="72" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1d4ed8" stopOpacity="0.5" /><stop offset="1" stopColor="#0e7490" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="wGrad" x1="44" y1="46" x2="70" y2="62" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" /><stop offset="1" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="arrowGrad" x1="58" y1="38" x2="72" y2="24" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" /><stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="arcGrad" x1="42" y1="42" x2="78" y2="42" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" /><stop offset="1" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-wide text-white/90 sm:text-base">WeKnow</span>
        <span className="text-[9px] font-medium tracking-[0.18em] text-white/40 sm:text-[10px]">SOLUTIONS</span>
      </div>
    </div>
  )
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

  // After splash — always land on Home (section 0)
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

      <main
        className="relative h-screen w-full overflow-hidden bg-[#030712]"
        style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.5s ease 0.1s" }}
      >
        {/* Global Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 15% 20%, rgba(59,130,246,0.035) 0%, transparent 50%), radial-gradient(ellipse at 85% 80%, rgba(99,102,241,0.02) 0%, transparent 45%)" }} />
          <div className="absolute inset-0 opacity-[0.01]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.15) 1px,transparent 1px)", backgroundSize: "100px 100px" }} />
          <div className="absolute left-1/4 top-1/3 h-80 w-80 rounded-full bg-blue-600/[0.012] blur-3xl" />
          <div className="absolute right-1/4 bottom-1/3 h-60 w-60 rounded-full bg-indigo-600/[0.008] blur-3xl" />
          {/* Code Rain on ALL screens */}
          <CodeRainBackground />
        </div>

        {/* Keyframes */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
          @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          @keyframes glow { 0%,100%{filter:drop-shadow(0 0 40px rgba(59,130,246,0.2))} 50%{filter:drop-shadow(0 0 80px rgba(99,102,241,0.3))} }
          @keyframes slideIn { from{transform:translateX(-100%);opacity:0} to{transform:translateX(0);opacity:1} }
          @keyframes fadeIn { from{opacity:0} to{opacity:1} }
          @keyframes sideStagger { from{opacity:0;transform:translateX(-14px)} to{opacity:1;transform:translateX(0)} }
        `}} />

        {/* Nav */}
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 md:px-8 lg:px-12">
          <button onClick={() => goTo(0)} className="transition-all hover:opacity-80">
            <Logo size={34} />
          </button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navItems.map((item, i) => (
              <button
                key={item}
                onClick={() => goTo(i)}
                className={`text-sm transition-all ${section === i ? "text-white/80" : "text-white/30 hover:text-white/55"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button onClick={() => goTo(2)} className="rounded-full border border-white/[0.08] bg-white/[0.04] px-5 py-2 text-xs text-white/50 backdrop-blur-sm transition-all hover:border-white/[0.14] hover:bg-white/[0.07] hover:text-white/70">
              Book a Service
            </button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setSidebarOpen(true)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-white/50 md:hidden">
            <Menu className="h-4 w-4" />
          </button>
        </nav>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} style={{ animation: "fadeIn 0.2s ease both" }} />
            <div className="absolute inset-y-0 left-0 w-[75vw] max-w-xs border-r border-white/[0.06] bg-[#050c1a]/95 backdrop-blur-xl" style={{ animation: "slideIn 0.28s cubic-bezier(0.16,1,0.3,1) both" }}>
              <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-4">
                <Logo size={28} />
                <button onClick={() => setSidebarOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.06] text-white/40">
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col gap-1 p-4">
                {navItems.map((item, i) => (
                  <button
                    key={item}
                    onClick={() => goTo(i)}
                    className={`w-full rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all ${section === i ? "bg-white/[0.05] text-white/70" : "text-white/35 hover:bg-white/[0.03] hover:text-white/55"}`}
                    style={{ animation: `sideStagger 0.35s ease ${i * 0.06 + 0.1}s both` }}
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={() => goTo(2)}
                  className="mt-3 w-full rounded-xl border border-white/[0.08] bg-white/[0.03] py-3 text-sm text-white/40 transition-all hover:bg-white/[0.06]"
                  style={{ animation: "sideStagger 0.35s ease 0.28s both" }}
                >
                  Book a Service
                </button>
              </div>
              <div className="absolute bottom-6 left-0 right-0 px-5">
                <div className="text-[10px] text-white/20">{EMAIL}</div>
                <div className="text-[10px] text-white/20">{PHONE}</div>
              </div>
            </div>
          </div>
        )}

        {/* Horizontal Scroll Container */}
        <div
          ref={containerRef}
          className="flex h-full overflow-hidden"
          style={{ scrollSnapType: "none" }}
        >
          {/* HOME */}
          <section className="relative flex min-h-screen w-screen shrink-0 flex-col justify-center px-5 pt-20 sm:px-8 md:px-12 lg:px-16">
            <div className="relative z-10 max-w-xl lg:max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-4 py-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium tracking-wide text-white/35 sm:text-xs">Available for projects</span>
              </div>

              <h1 className="mb-5 text-3xl font-extralight leading-[1.15] tracking-tight text-white/90 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Intelligent Software
                <br />
                <span className="text-white/25">Solutions.</span>
              </h1>

              <p className="mb-8 max-w-md text-sm leading-relaxed text-white/30 sm:mb-10 sm:text-base">
                We build AI chatbots, analytics platforms, e-commerce, and custom software that drive growth.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button onClick={() => goTo(2)} className="group flex items-center justify-center gap-2.5 rounded-full bg-white/[0.07] px-7 py-3.5 text-sm font-medium text-white/70 backdrop-blur-sm transition-all hover:bg-white/[0.11]">
                  Book a Service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => goTo(1)} className="flex items-center justify-center gap-2 rounded-full border border-white/[0.07] px-7 py-3.5 text-sm font-medium text-white/35 transition-all hover:border-white/[0.12] hover:text-white/55">
                  View Services
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-2.5">
                {["Laravel", "React", "Python", "AI/ML"].map(t => (
                  <span key={t} className="rounded-full border border-white/[0.04] bg-white/[0.015] px-3.5 py-1.5 text-[10px] font-medium tracking-wide text-white/25">{t}</span>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section className="flex min-h-screen w-screen shrink-0 items-center px-5 py-20 sm:px-8 md:px-12 md:py-0 lg:px-16">
            <div className="relative z-10 mx-auto w-full max-w-5xl">
              <div className="mb-6 sm:mb-8">
                <h2 className="mb-2 text-xl font-extralight tracking-tight text-white/85 sm:text-2xl md:text-3xl">Our Services</h2>
                <p className="text-xs text-white/25 sm:text-sm">Select a service to explore the demo</p>
              </div>

              <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
                {/* Service list */}
                <div className="flex gap-2.5 overflow-x-auto pb-3 lg:w-60 lg:shrink-0 lg:flex-col lg:gap-2 lg:overflow-visible lg:pb-0">
                  {SERVICES.map(s => {
                    const Icon = s.icon
                    const active = selectedSvc === s.key
                    return (
                      <button
                        key={s.key}
                        onClick={() => setSelectedSvc(s.key)}
                        className={`flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-200 lg:w-full lg:py-3.5 ${active ? "border-white/[0.1] bg-white/[0.04]" : "border-white/[0.03] bg-white/[0.01] hover:border-white/[0.07] hover:bg-white/[0.025]"}`}
                      >
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${active ? "bg-white/[0.07]" : "bg-white/[0.025]"}`}>
                          <Icon className={`h-4 w-4 transition-colors ${active ? "text-white/55" : "text-white/25"}`} />
                        </div>
                        <div>
                          <div className={`text-xs font-medium transition-colors sm:text-sm ${active ? "text-white/65" : "text-white/35"}`}>{s.key}</div>
                          <div className="hidden text-[10px] text-white/20 lg:block">{s.desc}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Demo panel */}
                <div className="flex-1 overflow-hidden rounded-2xl border border-white/[0.06] bg-slate-900/30 backdrop-blur-sm" style={{ minHeight: 340 }}>
                  {renderDemo(selectedSvc)}
                </div>
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section className="flex min-h-screen w-screen shrink-0 items-center px-5 py-20 sm:px-8 md:px-12 md:py-0 lg:px-16">
            <div className="relative z-10 mx-auto w-full max-w-md">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-xl font-extralight tracking-tight text-white/85 sm:text-2xl md:text-3xl">Get in Touch</h2>
                <p className="text-xs text-white/25 sm:text-sm">We&apos;d love to hear from you</p>
              </div>

              <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 transition-all hover:border-white/[0.09] hover:bg-white/[0.035]">
                  <Mail className="h-5 w-5 text-white/25" />
                  <div>
                    <div className="text-xs font-medium text-white/45">Email</div>
                    <div className="text-[10px] text-white/22">vincentwessie</div>
                  </div>
                </a>
                <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 transition-all hover:border-white/[0.09] hover:bg-white/[0.035]">
                  <Phone className="h-5 w-5 text-white/25" />
                  <div>
                    <div className="text-xs font-medium text-white/45">Call</div>
                    <div className="text-[10px] text-white/22">+263 781...</div>
                  </div>
                </a>
                <button onClick={() => setChatOpen(true)} className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4 transition-all hover:border-white/[0.09] hover:bg-white/[0.035]">
                  <MessageCircle className="h-5 w-5 text-white/25" />
                  <div className="text-left">
                    <div className="text-xs font-medium text-white/45">WhatsApp</div>
                    <div className="text-[10px] text-white/22">Chat now</div>
                  </div>
                </button>
              </div>

              <div className="rounded-2xl border border-white/[0.05] bg-white/[0.015] p-5">
                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="Tell us about your project..."
                  className="mb-4 h-28 w-full resize-none rounded-xl border border-white/[0.05] bg-slate-950/50 px-4 py-3.5 text-sm text-white/70 placeholder:text-white/18 focus:border-white/[0.1] focus:outline-none"
                />
                <button onClick={sendWA} disabled={!msg.trim()} className="w-full rounded-xl bg-white/[0.05] py-3 text-sm font-medium text-white/40 transition-all hover:bg-white/[0.09] hover:text-white/60 disabled:opacity-25">
                  Send via WhatsApp
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Section indicators */}
        <div className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2.5 sm:bottom-8">
          {navItems.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`rounded-full transition-all duration-300 ${section === i ? "h-1.5 w-7 bg-white/35" : "h-1.5 w-1.5 bg-white/12 hover:bg-white/22"}`} />
          ))}
        </div>

        {/* WhatsApp Chat */}
        {chatOpen && (
          <div className="fixed bottom-20 left-4 right-4 z-50 overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900/95 shadow-2xl backdrop-blur-xl sm:bottom-24 sm:left-auto sm:right-6 sm:w-80" style={{ animation: "fadeUp 0.3s ease both" }}>
            <div className="flex items-center justify-between bg-[#075e54] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20"><Bot className="h-4 w-4 text-white" /></div>
                <div><div className="text-sm font-medium text-white">WeKnow Solutions</div><div className="text-[10px] text-white/60">Typically replies instantly</div></div>
              </div>
              <button onClick={() => setChatOpen(false)} className="rounded-full p-1 hover:bg-white/20"><X className="h-4 w-4 text-white" /></button>
            </div>
            <div className="bg-[#0b141a] p-3">
              <div className="mb-3 max-w-[85%] rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2">
                <p className="text-sm text-white/85">Hi! How can we help? Send us a message.</p>
                <p className="mt-1 text-right text-[10px] text-white/35">WeKnow</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-[#202c33] p-3">
              <input
                type="text"
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendWA()}
                placeholder="Type a message..."
                className="flex-1 rounded-full bg-[#2a3942] px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
              <button onClick={sendWA} disabled={!msg.trim()} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#00a884] disabled:opacity-40">
                <Send className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Floating WhatsApp button */}
        {!chatOpen && (
          <button onClick={() => setChatOpen(true)} className="fixed bottom-16 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] shadow-lg shadow-[#25d366]/20 transition-all hover:scale-105 hover:shadow-[#25d366]/35 sm:bottom-6 sm:right-6 sm:h-13 sm:w-13">
            <MessageCircle className="h-5 w-5 text-white" />
          </button>
        )}
      </main>
    </>
  )
}
