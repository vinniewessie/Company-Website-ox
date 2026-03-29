"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import {
  Menu, X, Bot, BarChart3, ShoppingCart, Code, Gamepad2,
  Mail, Phone, MessageCircle, Send, ArrowRight, Check
} from "lucide-react"

const WHATSAPP_NUMBER = "263781132817"
const EMAIL = "vincentwessie@gmail.com"
const PHONE = "+263 781 132 817"

// ─── Code Rain ─────────────────────────────────────────────────────────────────
const CODE_LINES = [
  { t: "<?php namespace App\\Console;", c: "#60a5fa" },
  { t: "use Illuminate\\Console\\Command;", c: "#a78bfa" },
  { t: "class BootWebman extends Command {", c: "#c084fc" },
  { t: "  protected $signature = 'webman:run';", c: "#38bdf8" },
  { t: "  public function handle() {", c: "#34d399" },
  { t: "    $bot = new WhatsAppBot();", c: "#fbbf24" },
  { t: "    $bot->listen()->reply();", c: "#f472b6" },
  { t: "    return Command::SUCCESS;", c: "#38bdf8" },
  { t: "  }", c: "#34d399" },
  { t: "}", c: "#a78bfa" },
  { t: "Route::get('/api/v1/bot', [WebmanController::class, 'index']);", c: "#60a5fa" },
  { t: "const analyze = (data: Dataset) => {", c: "#60a5fa" },
  { t: "  const model = new MLPipeline(data);", c: "#a78bfa" },
  { t: "  return model.predict().confidence;", c: "#fbbf24" },
  { t: "};", c: "#38bdf8" },
  { t: "export async function GET(req: Request) {", c: "#34d399" },
  { t: "  const { userId } = await auth();", c: "#a78bfa" },
  { t: "  const data = await db.query.find({ userId });", c: "#fbbf24" },
  { t: "  return Response.json({ data, status: 200 });", c: "#38bdf8" },
  { t: "}", c: "#34d399" },
  { t: "@Component({ selector: 'app-root' })", c: "#f472b6" },
  { t: "SELECT u.name, SUM(o.total) as revenue", c: "#60a5fa" },
  { t: "FROM users u JOIN orders o ON u.id = o.user_id", c: "#a78bfa" },
  { t: "WHERE o.status = 'completed' GROUP BY u.id;", c: "#fbbf24" },
  { t: "function trainModel(epochs: number) {", c: "#34d399" },
  { t: "  loss = backpropagate(weights);", c: "#f472b6" },
  { t: "  weights = optimize(loss, lr);", c: "#fbbf24" },
  { t: "}", c: "#34d399" },
  { t: "import torch; model = torch.nn.Transformer()", c: "#60a5fa" },
  { t: "const ws = new WebSocket('wss://api.webman.io')", c: "#38bdf8" },
]

function CodeRainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let w = 0, h = 0

    const resize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    // Create columns of falling characters/code
    const fontSize = 11
    const cols = Math.floor(w / (fontSize * 18))
    const drops: number[] = Array(cols).fill(0).map(() => Math.random() * -80)
    const lineIdx: number[] = Array(cols).fill(0).map(() => Math.floor(Math.random() * CODE_LINES.length))

    const draw = () => {
      ctx.fillStyle = "rgba(3, 7, 18, 0.06)"
      ctx.fillRect(0, 0, w, h)

      for (let i = 0; i < cols; i++) {
        const line = CODE_LINES[lineIdx[i] % CODE_LINES.length]
        ctx.font = `${fontSize}px monospace`
        ctx.fillStyle = line.c + "55" // ~33% opacity hex
        ctx.fillText(line.t, i * fontSize * 18, drops[i] * fontSize)

        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0
          lineIdx[i] = Math.floor(Math.random() * CODE_LINES.length)
        }
        drops[i] += 0.35
      }
      animId = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.85 }}
    />
  )
}

// ─── Splash Screen ─────────────────────────────────────────────────────────────
const LARAVEL_LINES = [
  { t: "<?php", c: "#60a5fa" },
  { t: "", c: "" },
  { t: "namespace App\\Console\\Commands;", c: "#a78bfa" },
  { t: "", c: "" },
  { t: "use Illuminate\\Console\\Command;", c: "#60a5fa" },
  { t: "", c: "" },
  { t: "class BootWebman extends Command", c: "#c084fc" },
  { t: "{", c: "#e2e8f0" },
  { t: "    protected $signature = 'webman:boot';", c: "#38bdf8" },
  { t: "", c: "" },
  { t: "    public function handle()", c: "#34d399" },
  { t: "    {", c: "#e2e8f0" },
  { t: "        $this->info('Initializing Webman...');", c: "#fbbf24" },
  { t: "        sleep(1);", c: "#94a3b8" },
  { t: "        return 'WEBMAN';", c: "#f472b6" },
  { t: "    }", c: "#e2e8f0" },
  { t: "}", c: "#c084fc" },
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
        setTimeout(() => setPhase("name"), 300)
        setTimeout(() => setPhase("fadeout"), 2600)
        setTimeout(() => onDone(), 3200)
      }
    }, 90)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#030712]"
      style={{ opacity: phase === "fadeout" ? 0 : 1, transition: "opacity 0.6s ease" }}
    >
      {/* Code rain also on splash */}
      <CodeRainBackground />

      {/* Dark overlay so text is readable */}
      <div className="absolute inset-0 z-[1] bg-[#030712]/70" />

      {phase === "typing" && (
        <div className="relative z-[2] w-full max-w-lg px-4">
          <div
            className="overflow-hidden rounded-2xl shadow-2xl shadow-black/80"
            style={{
              background: "rgba(15, 23, 42, 0.75)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Terminal bar */}
            <div
              className="flex items-center gap-2 border-b px-4 py-3"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.03)" }}
            >
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              <span className="ml-3 font-mono text-[11px] text-white/30">php artisan webman:boot</span>
            </div>
            <div className="p-5 font-mono text-[11px] leading-[1.9] sm:text-xs">
              {LARAVEL_LINES.slice(0, visibleLines).map((line, i) => (
                <div key={i} style={{ color: line.color || line.c || "transparent" }}>
                  {line.t || "\u00A0"}
                </div>
              ))}
              {visibleLines < LARAVEL_LINES.length && (
                <span
                  className="inline-block h-[14px] w-[7px] align-middle"
                  style={{ background: "#60a5fa", animation: "blink 0.85s step-end infinite" }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {phase === "name" && (
        <div
          className="relative z-[2] text-center px-4"
          style={{ animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <h1
            className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text font-mono font-thin tracking-[0.5em] text-transparent"
            style={{
              fontSize: "clamp(2.5rem, 10vw, 7rem)",
              paddingLeft: "0.5em",
              animation: "glow 3s ease-in-out infinite",
            }}
          >
            WEBMAN
          </h1>
          <div
            className="mt-5 h-px w-24 mx-auto"
            style={{ background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), transparent)" }}
          />
          <p className="mt-4 font-mono text-[10px] tracking-[0.35em] text-white/30 sm:text-xs">
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
  { from: "bot", text: "Estimated delivery: 2–5 PM. I've sent the tracking link!" },
]

function ChatbotDemo() {
  const [vis, setVis] = useState(0)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVis(0)
    let i = 0
    const t = setInterval(() => { i++; setVis(i); if (i >= WA_MSGS.length) clearInterval(t) }, 1300)
    return () => clearInterval(t)
  }, [])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }) }, [vis])

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl">
      {/* WA Header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: "#075e54" }}>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-white">Webman</div>
          <div className="text-[10px] text-white/60">online</div>
        </div>
        <Phone className="h-4 w-4 text-white/50" />
      </div>
      {/* Chat body */}
      <div
        className="flex-1 space-y-2 overflow-y-auto p-3"
        style={{
          backgroundColor: "#0b141a",
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z'/%3E%3C/g%3E%3C/svg%3E\")",
        }}
      >
        {WA_MSGS.slice(0, vis).map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`} style={{ animation: "fadeUp 0.3s ease both" }}>
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-sm shadow ${m.from === "user" ? "rounded-br-none text-white" : "rounded-bl-none text-white/90"}`}
              style={{ background: m.from === "user" ? "#005c4b" : "#202c33" }}
            >
              {m.text}
              <div className="mt-1 flex items-center justify-end gap-1">
                <span className="text-[9px] text-white/30">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                {m.from === "user" && <Check className="h-3 w-3 text-cyan-400" />}
              </div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      {/* Input */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: "#202c33" }}>
        <div className="flex-1 rounded-full px-4 py-2 text-xs text-white/25" style={{ background: "#2a3942" }}>Type a message</div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: "#00a884" }}>
          <Send className="h-3.5 w-3.5 text-white" />
        </div>
      </div>
    </div>
  )
}

// ─── Analytics Demo ────────────────────────────────────────────────────────────
function AnalyticsDemo() {
  const [tick, setTick] = useState(0)
  const bars = [65, 80, 45, 90, 70, 55, 88, 72, 60, 95, 78, 83]
  useEffect(() => { const i = setInterval(() => setTick(p => p + 1), 1500); return () => clearInterval(i) }, [])
  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="grid grid-cols-3 gap-3">
        {[{ l: "Revenue", v: "$128K" }, { l: "Users", v: "14.2K" }, { l: "Growth", v: "+24%" }].map(s => (
          <div key={s.l} className="rounded-xl p-3 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}>
            <div className="text-base font-semibold text-white/70">{s.v}</div>
            <div className="text-[10px] text-white/30">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-xl p-4" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}>
        <div className="mb-3 text-[10px] text-white/30">Monthly Revenue</div>
        <div className="flex h-28 items-end gap-1">
          {bars.map((b, i) => (
            <div
              key={i}
              className="flex-1 rounded-t transition-all duration-1000"
              style={{ height: `${Math.min(b + (tick % 3) * 3 * (i % 2 === 0 ? 1 : -1), 100)}%`, background: `hsl(${210 + i * 8}, 55%, ${35 + i}%)` }}
            />
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
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/30">Products</span>
        <div className="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white/40" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <ShoppingCart className="h-3 w-3" /><span>{cart.length} items</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {PRODUCTS.map(p => (
          <div key={p.name} className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(8px)" }}>
            <div className="mb-2 h-10 w-10 rounded-lg" style={{ background: "rgba(255,255,255,0.06)" }} />
            <div className="mb-0.5 text-xs font-medium text-white/60">{p.name}</div>
            <div className="mb-2 text-xs text-white/35">{p.price}</div>
            <button
              onClick={() => { if (!cart.includes(p.name)) setCart(c => [...c, p.name]) }}
              className="w-full rounded-lg py-1.5 text-[10px] font-medium transition-all"
              style={{ background: cart.includes(p.name) ? "rgba(255,255,255,0.04)" : "rgba(99,102,241,0.15)", color: cart.includes(p.name) ? "rgba(255,255,255,0.3)" : "rgba(165,180,252,0.8)", border: `1px solid ${cart.includes(p.name) ? "rgba(255,255,255,0.05)" : "rgba(99,102,241,0.2)"}` }}
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
  { t: "class WeKnowApp {", c: "#a78bfa" },
  { t: "  modules = ['Auth', 'API', 'ML'];", c: "#94a3b8" },
  { t: "  async boot() {", c: "#34d399" },
  { t: "    await this.loadModules();", c: "#94a3b8" },
  { t: "    this.startServer(3000);", c: "#38bdf8" },
  { t: "  }", c: "#34d399" },
  { t: "}", c: "#a78bfa" },
]
function SoftwareDemo() {
  const [typed, setTyped] = useState(0)
  const [output, setOutput] = useState<string[]>([])
  useEffect(() => { let i = 0; const t = setInterval(() => { i++; setTyped(i); if (i >= SW_LINES.length) clearInterval(t) }, 220); return () => clearInterval(t) }, [])
  const run = () => {
    setOutput([])
    const logs = ["> Loading modules...", "> Auth: OK", "> API: OK", "> ML: Ready", "> Server running on :3000", "> All systems up"]
    logs.forEach((l, i) => setTimeout(() => setOutput(p => [...p, l]), i * 300))
  }
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex-1 overflow-hidden rounded-xl" style={{ background: "rgba(3,7,18,0.7)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-1.5 border-b px-3 py-2.5" style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.025)" }}>
          <div className="h-2 w-2 rounded-full bg-red-500/60" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
          <div className="h-2 w-2 rounded-full bg-green-500/60" />
          <span className="ml-2 font-mono text-[10px] text-white/25">app.ts</span>
        </div>
        <div className="p-4 font-mono text-[10px] leading-relaxed sm:text-xs">
          {SW_LINES.slice(0, typed).map((l, i) => <div key={i} style={{ color: l.c }}>{l.t}</div>)}
        </div>
      </div>
      {output.length > 0 && (
        <div className="rounded-xl p-3 font-mono text-[10px]" style={{ background: "rgba(3,7,18,0.6)", border: "1px solid rgba(52,211,153,0.15)" }}>
          {output.map((l, i) => <div key={i} className="text-emerald-400/70">{l}</div>)}
        </div>
      )}
      <button
        onClick={run}
        disabled={typed < SW_LINES.length}
        className="rounded-xl py-2.5 text-xs font-medium text-white/50 transition-all disabled:opacity-25"
        style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.2)" }}
      >
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
  useEffect(() => { if (!active) return; const t = setTimeout(() => setActive(false), 5000); return () => clearTimeout(t) }, [active])
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between text-xs text-white/30"><span>Tap Game</span><span>Score: {score}</span></div>
      <div
        className="relative flex-1 cursor-pointer overflow-hidden rounded-xl"
        onClick={hit}
        style={{ background: "rgba(3,7,18,0.7)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="absolute h-1.5 w-1.5 rounded-full bg-white/10" style={{ left: `${(i * 37 + 13) % 90 + 5}%`, top: `${(i * 53 + 7) % 80 + 10}%` }} />
        ))}
        {!active && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
            {score > 0 && <div className="text-sm font-medium text-white/50">Score: {score}</div>}
            <button
              onClick={e => { e.stopPropagation(); start() }}
              className="rounded-full px-6 py-2.5 text-xs font-medium text-white/60 transition-all"
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

// ─── Logo ──────────────────────────────────────────────────────────────────────
function Logo({ size = 36 }: { size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="84" rx="15" ry="5" fill="url(#bG)" opacity="0.45" />
        <rect x="50" y="80" width="20" height="8" rx="2" fill="url(#bG)" opacity="0.55" />
        <rect x="52" y="87" width="16" height="5" rx="2" fill="url(#bG)" opacity="0.45" />
        <path d="M38 50 Q38 28 60 28 Q82 28 82 50 Q82 64 70 72 L50 72 Q38 64 38 50Z" fill="url(#gG)" opacity="0.8" />
        <path d="M44 46 L50 62 L57 50 L64 62 L70 46" stroke="url(#wG)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M58 38 L72 24 M72 24 L61 24 M72 24 L72 35" stroke="url(#aG)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="32" cy="52" r="4" fill="#38bdf8" opacity="0.75" />
        <circle cx="88" cy="52" r="4" fill="#38bdf8" opacity="0.75" />
        <circle cx="38" cy="74" r="3.5" fill="#818cf8" opacity="0.75" />
        <circle cx="82" cy="74" r="3.5" fill="#818cf8" opacity="0.75" />
        <circle cx="60" cy="20" r="3.5" fill="#34d399" opacity="0.85" />
        <line x1="36" y1="52" x2="44" y2="52" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" />
        <line x1="84" y1="52" x2="76" y2="52" stroke="#38bdf8" strokeWidth="1.5" opacity="0.4" />
        <line x1="41" y1="72" x2="50" y2="72" stroke="#818cf8" strokeWidth="1.5" opacity="0.4" />
        <line x1="79" y1="72" x2="70" y2="72" stroke="#818cf8" strokeWidth="1.5" opacity="0.4" />
        <path d="M42 42 Q60 18 78 42" stroke="url(#arcG)" strokeWidth="2.5" fill="none" opacity="0.5" strokeLinecap="round" />
        <defs>
          <linearGradient id="bG" x1="44" y1="80" x2="76" y2="92" gradientUnits="userSpaceOnUse"><stop stopColor="#1e3a8a" /><stop offset="1" stopColor="#0e7490" /></linearGradient>
          <linearGradient id="gG" x1="38" y1="28" x2="82" y2="72" gradientUnits="userSpaceOnUse"><stop stopColor="#1d4ed8" stopOpacity="0.45" /><stop offset="1" stopColor="#0e7490" stopOpacity="0.25" /></linearGradient>
          <linearGradient id="wG" x1="44" y1="46" x2="70" y2="62" gradientUnits="userSpaceOnUse"><stop stopColor="#38bdf8" /><stop offset="1" stopColor="#818cf8" /></linearGradient>
          <linearGradient id="aG" x1="58" y1="38" x2="72" y2="24" gradientUnits="userSpaceOnUse"><stop stopColor="#34d399" /><stop offset="1" stopColor="#38bdf8" /></linearGradient>
          <linearGradient id="arcG" x1="42" y1="42" x2="78" y2="42" gradientUnits="userSpaceOnUse"><stop stopColor="#34d399" /><stop offset="1" stopColor="#38bdf8" /></linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col leading-none">
        <span className="text-sm font-bold tracking-wide text-white/90 sm:text-base">WeKnow</span>
        <span className="text-[9px] font-semibold tracking-[0.22em] text-white/40 sm:text-[10px]">SOLUTIONS</span>
      </div>
    </div>
  )
}

// ─── Glassmorphism helper styles ───────────────────────────────────────────────
const glass = {
  card: { background: "rgba(15,23,42,0.55)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.08)" } as React.CSSProperties,
  nav:  { background: "rgba(3,7,18,0.6)",   backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.05)" } as React.CSSProperties,
  sidebar: { background: "rgba(5,12,26,0.88)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", borderRight: "1px solid rgba(255,255,255,0.07)" } as React.CSSProperties,
  input: { background: "rgba(3,7,18,0.55)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.07)" } as React.CSSProperties,
  btn:   { background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)" } as React.CSSProperties,
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

  // After splash — always land on Home
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
        className="relative h-screen w-full overflow-hidden bg-[#030712]"
        style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.6s ease 0.15s" }}
      >
        {/* Global Code Rain Background — covers entire app */}
        <CodeRainBackground />

        {/* Radial glow overlay */}
        <div className="pointer-events-none fixed inset-0 z-[1]" style={{ background: "radial-gradient(ellipse at 15% 20%, rgba(59,130,246,0.045) 0%, transparent 55%), radial-gradient(ellipse at 85% 80%, rgba(99,102,241,0.03) 0%, transparent 50%)" }} />

        {/* Subtle grid */}
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.014]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.18) 1px,transparent 1px)", backgroundSize: "100px 100px" }} />

        {/* Keyframes */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blink    { 0%,50%{opacity:1} 51%,100%{opacity:0} }
          @keyframes fadeUp   { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
          @keyframes glow     { 0%,100%{filter:drop-shadow(0 0 40px rgba(59,130,246,0.25))} 50%{filter:drop-shadow(0 0 80px rgba(99,102,241,0.4))} }
          @keyframes slideIn  { from{transform:translateX(-100%)} to{transform:translateX(0)} }
          @keyframes fadeIn   { from{opacity:0} to{opacity:1} }
          @keyframes sideStagger { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        `}} />

        {/* ── Nav ── */}
        <nav
          className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-3 sm:px-6 md:px-8 lg:px-12"
          style={glass.nav}
        >
          <button onClick={() => goTo(0)} className="transition-opacity hover:opacity-80">
            <Logo size={34} />
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item, i) => (
              <button
                key={item}
                onClick={() => goTo(i)}
                className={`text-sm font-medium transition-all ${section === i ? "text-white/80" : "text-white/30 hover:text-white/55"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => goTo(2)}
            className="hidden rounded-full px-5 py-2 text-xs font-medium text-white/55 transition-all hover:text-white/75 md:block"
            style={glass.btn}
          >
            Book a Service
          </button>

          <button
            onClick={() => setSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/45 transition-all hover:text-white/65 md:hidden"
            style={glass.btn}
          >
            <Menu className="h-4 w-4" />
          </button>
        </nav>

        {/* ── Mobile Sidebar ── */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-[60] md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
              style={{ animation: "fadeIn 0.2s ease both", backdropFilter: "blur(4px)" }}
            />
            <div
              className="absolute inset-y-0 left-0 w-[72vw] max-w-xs"
              style={{ ...glass.sidebar, animation: "slideIn 0.28s cubic-bezier(0.16,1,0.3,1) both" }}
            >
              <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <Logo size={28} />
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white/40 transition-colors hover:text-white/65"
                  style={glass.btn}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-col gap-1 p-4">
                {navItems.map((item, i) => (
                  <button
                    key={item}
                    onClick={() => goTo(i)}
                    className={`w-full rounded-xl px-4 py-3.5 text-left text-sm font-medium transition-all ${section === i ? "text-white/75" : "text-white/35 hover:text-white/55"}`}
                    style={{ animation: `sideStagger 0.32s ease ${i * 0.06 + 0.08}s both`, ...(section === i ? { background: "rgba(255,255,255,0.06)" } : {}) }}
                  >
                    {item}
                  </button>
                ))}
                <button
                  onClick={() => goTo(2)}
                  className="mt-3 w-full rounded-xl py-3 text-sm font-medium text-white/45 transition-all hover:text-white/65"
                  style={{ ...glass.btn, animation: "sideStagger 0.32s ease 0.26s both" }}
                >
                  Book a Service
                </button>
              </div>
              <div className="absolute bottom-6 left-0 right-0 px-5 space-y-1">
                <div className="text-[10px] text-white/20">{EMAIL}</div>
                <div className="text-[10px] text-white/20">{PHONE}</div>
              </div>
            </div>
          </div>
        )}

        {/* ── Horizontal Scroll Container ── */}
        <div
          ref={containerRef}
          className="relative z-[2] flex h-full overflow-hidden"
          style={{ scrollSnapType: "none" }}
        >
          {/* HOME */}
          <section className="relative flex min-h-screen w-screen shrink-0 flex-col justify-center px-5 pt-20 sm:px-8 md:px-12 lg:px-16">
            <div className="relative z-10 max-w-xl lg:max-w-2xl">
              {/* Status badge — glassmorphism */}
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full px-4 py-2" style={glass.card}>
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[10px] font-medium tracking-wide text-white/40 sm:text-xs">Available for projects</span>
              </div>

              <h1 className="mb-5 text-3xl font-extralight leading-[1.15] tracking-tight text-white/90 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Intelligent Software
                <br />
                <span className="text-white/25">Solutions.</span>
              </h1>

              <p className="mb-8 max-w-md text-sm leading-relaxed text-white/35 sm:text-base">
                We build AI chatbots, analytics platforms, e-commerce, and custom software that drive growth.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button
                  onClick={() => goTo(2)}
                  className="group flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium text-white/75 transition-all hover:text-white/90"
                  style={glass.card}
                >
                  Book a Service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => goTo(1)}
                  className="flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium text-white/35 transition-all hover:text-white/55"
                  style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  View Services
                </button>
              </div>

              <div className="mt-10 flex flex-wrap gap-2.5">
                {["Laravel", "React", "Python", "AI/ML"].map(t => (
                  <span key={t} className="rounded-full px-3.5 py-1.5 text-[10px] font-medium tracking-wide text-white/30" style={glass.card}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* SERVICES */}
          <section className="flex min-h-screen w-screen shrink-0 items-center px-5 py-20 sm:px-8 md:px-12 md:py-0 lg:px-16">
            <div className="relative z-10 mx-auto w-full max-w-5xl">
              <div className="mb-7 sm:mb-9">
                <h2 className="mb-1.5 text-xl font-extralight tracking-tight text-white/85 sm:text-2xl md:text-3xl">Our Services</h2>
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
                        className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 lg:w-full lg:py-3.5"
                        style={active ? { ...glass.card, border: "1px solid rgba(255,255,255,0.12)" } : { border: "1px solid rgba(255,255,255,0.04)", background: "rgba(255,255,255,0.015)" }}
                      >
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors"
                          style={{ background: active ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)" }}
                        >
                          <Icon className={`h-4 w-4 transition-colors ${active ? "text-white/55" : "text-white/22"}`} />
                        </div>
                        <div>
                          <div className={`text-xs font-medium sm:text-sm ${active ? "text-white/70" : "text-white/30"}`}>{s.key}</div>
                          <div className="hidden text-[10px] text-white/20 lg:block">{s.desc}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Demo panel */}
                <div className="flex-1 overflow-hidden rounded-2xl" style={{ ...glass.card, minHeight: 340 }}>
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
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-3 rounded-xl p-4 transition-all duration-200 hover:opacity-80"
                  style={glass.card}
                >
                  <Mail className="h-5 w-5 text-blue-400/60" />
                  <div>
                    <div className="text-xs font-medium text-white/50">Email</div>
                    <div className="text-[10px] text-white/25">vincentwessie</div>
                  </div>
                </a>
                <a
                  href={`tel:${WHATSAPP_NUMBER}`}
                  className="flex items-center gap-3 rounded-xl p-4 transition-all duration-200 hover:opacity-80"
                  style={glass.card}
                >
                  <Phone className="h-5 w-5 text-cyan-400/60" />
                  <div>
                    <div className="text-xs font-medium text-white/50">Call</div>
                    <div className="text-[10px] text-white/25">+263 781...</div>
                  </div>
                </a>
                <button
                  onClick={() => setChatOpen(true)}
                  className="flex items-center gap-3 rounded-xl p-4 transition-all duration-200 hover:opacity-80"
                  style={glass.card}
                >
                  <MessageCircle className="h-5 w-5 text-emerald-400/60" />
                  <div className="text-left">
                    <div className="text-xs font-medium text-white/50">WhatsApp</div>
                    <div className="text-[10px] text-white/25">Chat now</div>
                  </div>
                </button>
              </div>

              <div className="rounded-2xl p-5" style={glass.card}>
                <textarea
                  value={msg}
                  onChange={e => setMsg(e.target.value)}
                  placeholder="Tell us about your project..."
                  className="mb-4 h-28 w-full resize-none rounded-xl px-4 py-3.5 text-sm text-white/70 placeholder:text-white/20 focus:outline-none"
                  style={glass.input}
                />
                <button
                  onClick={sendWA}
                  disabled={!msg.trim()}
                  className="w-full rounded-xl py-3 text-sm font-medium text-white/45 transition-all hover:text-white/65 disabled:opacity-25"
                  style={glass.btn}
                >
                  Send via WhatsApp
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Section indicators */}
        <div className="fixed bottom-5 left-1/2 z-30 flex -translate-x-1/2 gap-2.5 sm:bottom-8">
          {navItems.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300"
              style={{ height: 6, width: section === i ? 28 : 6, background: section === i ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.12)" }}
            />
          ))}
        </div>

        {/* WhatsApp Chat Widget */}
        {chatOpen && (
          <div
            className="fixed bottom-20 left-4 right-4 z-50 overflow-hidden rounded-2xl shadow-2xl sm:bottom-24 sm:left-auto sm:right-6 sm:w-80"
            style={{ ...glass.sidebar, animation: "fadeUp 0.3s ease both" }}
          >
            <div className="flex items-center justify-between px-4 py-3" style={{ background: "#075e54" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">WeKnow Solutions</div>
                  <div className="text-[10px] text-white/55">Typically replies instantly</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="rounded-full p-1 hover:bg-white/20 transition-colors">
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
            <div className="p-3" style={{ background: "#0b141a" }}>
              <div className="mb-2 max-w-[85%] rounded-lg rounded-tl-none px-3 py-2" style={{ background: "#202c33" }}>
                <p className="text-sm text-white/80">Hi! How can we help? Send us a message.</p>
                <p className="mt-1 text-right text-[10px] text-white/30">WeKnow</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3" style={{ background: "#202c33" }}>
              <input
                type="text"
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendWA()}
                placeholder="Type a message..."
                className="flex-1 rounded-full px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none"
                style={{ background: "#2a3942" }}
              />
              <button
                onClick={sendWA}
                disabled={!msg.trim()}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full disabled:opacity-40 transition-opacity"
                style={{ background: "#00a884" }}
              >
                <Send className="h-3.5 w-3.5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Floating WhatsApp Button */}
        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-16 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 sm:bottom-6 sm:right-6 sm:h-13 sm:w-13"
            style={{ background: "#25d366", boxShadow: "0 4px 24px rgba(37,211,102,0.3)" }}
          >
            <MessageCircle className="h-5 w-5 text-white" />
          </button>
        )}
      </main>
    </>
  )
}
