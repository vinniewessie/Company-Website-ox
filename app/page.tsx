"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Image from "next/image"
import {
  Menu, X, Bot, BarChart3, ShoppingCart, Code, Gamepad2,
  Mail, Phone, MessageCircle, Send, ArrowRight, ChevronRight,
  TrendingUp, Users, Zap, ShoppingBag, Star, Package,
  Cpu, Wifi, Shield, BarChart, Activity, Check
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
  "use App\\Services\\AIEngine;",
  "",
  "class BootWebman extends Command {",
  "    protected $signature = 'webman:boot';",
  "",
  "    public function handle(AIEngine $ai) {",
  "        $this->info('Initializing core modules...');",
  "        $ai->loadNeuralNet('gpt4-turbo');",
  "        $ai->connect('whatsapp-gateway');",
  "        $ai->compile();",
  "",
  "        return $this->launch();",
  "    }",
  "",
  "    private function launch(): string {",
  "        return <<<OUTPUT",
  "            ██     ██ ███████ ██████  ███    ███  █████  ███    ██",
  "            ██     ██ ██      ██   ██ ████  ████ ██   ██ ████   ██",
  "            ██  █  ██ █████   ██████  ██ ████ ██ ███████ ██ ██  ██",
  "            ██ ███ ██ ██      ██   ██ ██  ██  ██ ██   ██ ██  ██ ██",
  "             ███ ███  ███████ ██████  ██      ██ ██   ██ ██   ████",
  "        OUTPUT;",
  "    }",
  "}",
]

function SplashScreen({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showOutput, setShowOutput] = useState(false)
  const [showLogo, setShowLogo] = useState(false)
  const [fade, setFade] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i >= LARAVEL_LINES.length) {
        clearInterval(interval)
        setTimeout(() => setShowOutput(true), 300)
        setTimeout(() => setShowLogo(true), 900)
        setTimeout(() => setFade(true), 2800)
        setTimeout(() => onDone(), 3400)
      }
    }, 60)
    return () => clearInterval(interval)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950"
      style={{ opacity: fade ? 0 : 1, transition: "opacity 0.6s ease" }}
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.4) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-3xl px-4">
        {/* Terminal window */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-slate-900/90 shadow-2xl shadow-blue-500/10 backdrop-blur-xl">
          {/* Title bar */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/60 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500/80" />
            <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <div className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-white/40">php artisan webman:boot</span>
          </div>

          {/* Code */}
          <div className="max-h-72 overflow-hidden p-4 font-mono text-xs sm:text-sm">
            {LARAVEL_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className="leading-5">
                {line.startsWith("//") ? (
                  <span className="text-green-500/70">{line}</span>
                ) : line.includes("class ") || line.includes("function ") || line.includes("private ") ? (
                  <span className="text-violet-400">{line}</span>
                ) : line.includes("$this") || line.includes("$ai") || line.includes("return") ? (
                  <span className="text-cyan-400">{line}</span>
                ) : line.includes("use ") || line.includes("namespace ") || line.includes("<?php") ? (
                  <span className="text-blue-400">{line}</span>
                ) : line.includes("'") || line.includes('"') ? (
                  <span className="text-amber-400">{line}</span>
                ) : (
                  <span className="text-slate-300">{line || "\u00A0"}</span>
                )}
              </div>
            ))}
            {visibleLines < LARAVEL_LINES.length && (
              <span className="inline-block h-4 w-2 bg-blue-400" style={{ animation: "blink 1s step-end infinite" }} />
            )}
          </div>
        </div>

        {/* WEBMAN output */}
        {showOutput && (
          <div
            className="mt-6 text-center"
            style={{ animation: "splashReveal 0.7s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1">
              <span className="h-2 w-2 rounded-full bg-green-400" style={{ animation: "pulse 1.5s infinite" }} />
              <span className="font-mono text-xs text-green-400">Boot successful — AI modules online</span>
            </div>
            <h1
              className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-6xl font-black tracking-widest text-transparent sm:text-8xl"
              style={{ textShadow: "0 0 60px rgba(59,130,246,0.4)", animation: "glowPulse 2s ease-in-out infinite" }}
            >
              WEBMAN
            </h1>
            <p className="mt-1 font-mono text-xs text-white/40">by WeKnow Solutions</p>
          </div>
        )}

        {/* Logo reveal */}
        {showLogo && (
          <div
            className="mt-8 flex items-center justify-center"
            style={{ animation: "splashReveal 0.5s ease both" }}
          >
            <Image src="/weknow-logo.png" alt="WeKnow Solutions" width={200} height={80} className="object-contain opacity-90" />
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Webman WhatsApp Demo ───────────────────────────────────────────────────────
const WA_CONVERSATION = [
  { from: "user", text: "Hi, I need help with my order #4521", time: "09:01" },
  { from: "bot", text: "Hello! I'm Webman 🤖 I found order #4521. It's currently being processed and will ship today.", time: "09:01" },
  { from: "user", text: "Great! What time will it arrive?", time: "09:02" },
  { from: "bot", text: "Your estimated delivery is between 2 PM – 5 PM today. You'll receive a tracking link shortly!", time: "09:02" },
  { from: "user", text: "Can I change the delivery address?", time: "09:03" },
  { from: "bot", text: "Sure! Please share the new address and I'll update it right away. Note: address changes must be made before 11 AM.", time: "09:03" },
  { from: "user", text: "15 Harare Drive, Borrowdale", time: "09:04" },
  { from: "bot", text: "Done! Your delivery address has been updated to 15 Harare Drive, Borrowdale. Anything else I can help with? 😊", time: "09:04" },
]

function ChatbotDemo() {
  const [visible, setVisible] = useState(0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVisible(0)
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisible(i)
      if (i >= WA_CONVERSATION.length) clearInterval(interval)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [visible])

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900/80">
      {/* WA Header */}
      <div className="flex items-center gap-3 bg-emerald-700 px-4 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">W</div>
        <div>
          <div className="text-sm font-semibold text-white">Webman AI Bot</div>
          <div className="text-xs text-white/70">online · powered by WeKnow</div>
        </div>
        <div className="ml-auto flex gap-3">
          <Wifi className="h-4 w-4 text-white/60" />
          <Phone className="h-4 w-4 text-white/60" />
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-2"
        style={{
          background: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.03)'/%3E%3C/svg%3E\")",
          backgroundColor: "#0d1117",
        }}
      >
        {WA_CONVERSATION.slice(0, visible).map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            style={{ animation: "splashReveal 0.3s ease both" }}
          >
            <div
              className={`max-w-[80%] rounded-lg px-3 py-2 text-xs sm:text-sm ${
                msg.from === "user"
                  ? "rounded-tr-none bg-emerald-600/80 text-white"
                  : "rounded-tl-none bg-slate-700 text-white/90"
              }`}
            >
              {msg.text}
              <div className="mt-1 text-right text-[10px] text-white/40">{msg.time}</div>
            </div>
          </div>
        ))}
        {visible < WA_CONVERSATION.length && visible > 0 && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-lg rounded-tl-none bg-slate-700 px-3 py-2">
              {[0, 1, 2].map((d) => (
                <div
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-white/50"
                  style={{ animation: `bounce 1.2s ease-in-out infinite ${d * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-2 border-t border-white/10 bg-slate-800 px-3 py-2">
        <div className="flex-1 rounded-full bg-slate-700 px-3 py-1.5 text-xs text-white/30">Type a message...</div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-600">
          <Send className="h-3 w-3 text-white" />
        </div>
      </div>
    </div>
  )
}

// ─── Analytics Demo ─────────────────────────────────────────────────────────────
function AnalyticsDemo() {
  const [tick, setTick] = useState(0)
  const bars = [65, 80, 45, 90, 70, 55, 88, 72, 60, 95, 78, 83]

  useEffect(() => {
    const t = setInterval(() => setTick((p) => p + 1), 1500)
    return () => clearInterval(t)
  }, [])

  const animated = bars.map((b, i) => Math.min(b + (tick % 3) * 5 * (i % 2 === 0 ? 1 : -1), 100))

  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Total Revenue", value: "$128K", icon: TrendingUp, color: "text-green-400" },
          { label: "Active Users", value: "14.2K", icon: Users, color: "text-blue-400" },
          { label: "Conversion", value: "8.4%", icon: Activity, color: "text-violet-400" },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
            <s.icon className={`mx-auto mb-1 h-4 w-4 ${s.color}`} />
            <div className="text-lg font-bold text-white">{s.value}</div>
            <div className="text-[10px] text-white/50">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Bar chart */}
      <div className="flex-1 rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="mb-2 text-xs text-white/50">Monthly Performance</div>
        <div className="flex h-24 items-end gap-1">
          {animated.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t"
              style={{
                height: `${h}%`,
                background: `linear-gradient(to top, #3b82f6, #6366f1)`,
                opacity: 0.7 + (i % 3) * 0.1,
                transition: "height 1s ease",
              }}
            />
          ))}
        </div>
        <div className="mt-1 flex justify-between text-[9px] text-white/30">
          {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-3">
        <div className="mb-2 text-xs text-white/50">Real-time Activity</div>
        <div className="flex items-end gap-0.5 h-10">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-cyan-500/60"
              style={{ height: `${20 + Math.sin(i + tick) * 40}%`, transition: "height 0.5s ease" }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── E-Commerce Demo ─────────────────────────────────────────────────────────────
const PRODUCTS = [
  { name: "AirPods Pro", price: "$249", rating: 4.8, sold: 1240, img: "🎧" },
  { name: "Smart Watch", price: "$399", rating: 4.9, sold: 890, img: "⌚" },
  { name: "MacBook Air", price: "$1,299", rating: 4.7, sold: 430, img: "💻" },
  { name: "iPhone 15", price: "$799", rating: 4.9, sold: 2100, img: "📱" },
]

function EcommerceDemo() {
  const [cart, setCart] = useState<string[]>([])
  const [added, setAdded] = useState<string | null>(null)

  const addToCart = (name: string) => {
    setCart((c) => [...c, name])
    setAdded(name)
    setTimeout(() => setAdded(null), 1200)
  }

  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/60">Featured Products</span>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-white/60">
          <ShoppingBag className="h-3 w-3 text-emerald-400" />
          <span>{cart.length}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 overflow-y-auto">
        {PRODUCTS.map((p) => (
          <div key={p.name} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="mb-2 text-3xl">{p.img}</div>
            <div className="mb-1 text-xs font-medium text-white">{p.name}</div>
            <div className="mb-1 flex items-center gap-1">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span className="text-[10px] text-white/60">{p.rating} · {p.sold} sold</span>
            </div>
            <div className="mb-2 text-sm font-bold text-emerald-400">{p.price}</div>
            <button
              onClick={() => addToCart(p.name)}
              className={`w-full rounded-md py-1 text-[10px] font-medium transition-all ${
                added === p.name
                  ? "bg-green-600 text-white"
                  : "bg-blue-600/30 text-blue-300 hover:bg-blue-600/50"
              }`}
            >
              {added === p.name ? <span className="flex items-center justify-center gap-1"><Check className="h-3 w-3" /> Added</span> : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Custom Software Demo ─────────────────────────────────────────────────────────
const CODE_LINES = [
  { text: "class WeKnowApp extends BaseApplication {", color: "text-violet-400" },
  { text: "  protected modules = [", color: "text-slate-300" },
  { text: "    'AuthModule',", color: "text-amber-400" },
  { text: "    'CRMModule',", color: "text-amber-400" },
  { text: "    'AnalyticsModule',", color: "text-amber-400" },
  { text: "    'APIGateway',", color: "text-amber-400" },
  { text: "  ];", color: "text-slate-300" },
  { text: "", color: "" },
  { text: "  async boot(): Promise<void> {", color: "text-cyan-400" },
  { text: "    await this.loadModules();", color: "text-slate-400" },
  { text: "    await this.connectDatabase();", color: "text-slate-400" },
  { text: "    this.server.listen(8000);", color: "text-slate-400" },
  { text: "    console.log('Server online ✓');", color: "text-green-400" },
  { text: "  }", color: "text-cyan-400" },
  { text: "}", color: "text-violet-400" },
]

function SoftwareDemo() {
  const [typed, setTyped] = useState(0)
  const [running, setRunning] = useState(false)
  const [output, setOutput] = useState<string[]>([])

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      i++
      setTyped(i)
      if (i >= CODE_LINES.length) clearInterval(t)
    }, 120)
    return () => clearInterval(t)
  }, [])

  const runCode = () => {
    setRunning(true)
    setOutput([])
    const logs = [
      "> Loading modules...",
      "> AuthModule ✓",
      "> CRMModule ✓",
      "> AnalyticsModule ✓",
      "> APIGateway ✓",
      "> Connecting database...",
      "> PostgreSQL connected ✓",
      "> Server online on port 8000 ✓",
    ]
    logs.forEach((log, i) => {
      setTimeout(() => setOutput((p) => [...p, log]), i * 300)
    })
    setTimeout(() => setRunning(false), logs.length * 300)
  }

  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="flex-1 overflow-hidden rounded-lg border border-white/10 bg-slate-950">
        <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/60 px-3 py-2">
          <div className="h-2 w-2 rounded-full bg-red-500/80" />
          <div className="h-2 w-2 rounded-full bg-yellow-500/80" />
          <div className="h-2 w-2 rounded-full bg-green-500/80" />
          <span className="ml-2 text-xs text-white/30">app.ts</span>
        </div>
        <div className="overflow-auto p-3 font-mono text-xs">
          {CODE_LINES.slice(0, typed).map((line, i) => (
            <div key={i} className={`leading-5 ${line.color}`}>{line.text || "\u00A0"}</div>
          ))}
          {typed < CODE_LINES.length && (
            <span className="inline-block h-3.5 w-1.5 bg-blue-400" style={{ animation: "blink 1s step-end infinite" }} />
          )}
        </div>
      </div>

      {output.length > 0 && (
        <div className="rounded-lg border border-green-500/20 bg-slate-950 p-3 font-mono text-xs">
          {output.map((line, i) => (
            <div key={i} className="text-green-400" style={{ animation: "splashReveal 0.2s ease both" }}>{line}</div>
          ))}
        </div>
      )}

      <button
        onClick={runCode}
        disabled={running || typed < CODE_LINES.length}
        className="w-full rounded-lg bg-gradient-to-r from-orange-600 to-red-600 py-2 text-xs font-medium text-white transition-all hover:opacity-90 disabled:opacity-40"
      >
        {running ? "Running..." : "Run Application"}
      </button>
    </div>
  )
}

// ─── Game Dev Demo ───────────────────────────────────────────────────────────────
function GameDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 75 })
  const enemiesRef = useRef<{ x: number; y: number; id: number }[]>([])
  const rafRef = useRef<number>()
  const scoreRef = useRef(0)

  const startGame = useCallback(() => {
    setGameActive(true)
    setScore(0)
    scoreRef.current = 0
    enemiesRef.current = []
    setPlayerPos({ x: 50, y: 75 })

    const spawnInterval = setInterval(() => {
      enemiesRef.current.push({ x: Math.random() * 90 + 5, y: 0, id: Date.now() })
    }, 900)

    const moveInterval = setInterval(() => {
      enemiesRef.current = enemiesRef.current
        .map((e) => ({ ...e, y: e.y + 3 }))
        .filter((e) => {
          if (e.y > 95) {
            setGameActive(false)
            clearInterval(spawnInterval)
            clearInterval(moveInterval)
            return false
          }
          return true
        })
    }, 100)

    return () => { clearInterval(spawnInterval); clearInterval(moveInterval) }
  }, [])

  const shoot = useCallback((px: number) => {
    if (!gameActive) return
    enemiesRef.current = enemiesRef.current.filter((e) => {
      const hit = Math.abs(e.x - px) < 10 && e.y > 50
      if (hit) { scoreRef.current += 10; setScore(scoreRef.current) }
      return !hit
    })
  }, [gameActive])

  return (
    <div className="flex h-full flex-col items-center gap-3 p-3">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-white/60">
          <Cpu className="h-3 w-3 text-pink-400" />
          <span>WebGL Renderer · 60 FPS</span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-bold text-pink-300">
          Score: {score}
        </div>
      </div>

      {/* Game arena */}
      <div
        className="relative w-full flex-1 overflow-hidden rounded-xl border border-white/10 cursor-crosshair"
        style={{ background: "linear-gradient(180deg, #0a0518 0%, #0f0a2e 100%)" }}
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          const px = ((e.clientX - rect.left) / rect.width) * 100
          shoot(px)
          setPlayerPos({ x: px, y: 75 })
        }}
      >
        {/* Stars */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 w-0.5 rounded-full bg-white"
            style={{ left: `${(i * 37 + 13) % 100}%`, top: `${(i * 53 + 7) % 70}%`, opacity: 0.3 + (i % 5) * 0.1 }}
          />
        ))}

        {/* Player ship */}
        <div
          className="absolute text-lg transition-all duration-150"
          style={{ left: `${playerPos.x}%`, top: "75%", transform: "translate(-50%, -50%)" }}
        >
          🚀
        </div>

        {/* Enemies */}
        {enemiesRef.current.map((e) => (
          <div
            key={e.id}
            className="absolute text-base"
            style={{ left: `${e.x}%`, top: `${e.y}%`, transform: "translate(-50%,-50%)" }}
          >
            👾
          </div>
        ))}

        {!gameActive && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 backdrop-blur-sm">
            {score > 0 && <div className="text-lg font-bold text-white">Score: {score}</div>}
            <button
              onClick={(e) => { e.stopPropagation(); startGame() }}
              className="rounded-full bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-2 text-sm font-medium text-white"
            >
              {score > 0 ? "Play Again" : "Start Game"}
            </button>
            <p className="text-xs text-white/40">Click enemies to shoot them</p>
          </div>
        )}
      </div>

      <div className="flex w-full gap-2">
        {[{ label: "Physics", val: "Rapier3D" }, { label: "Render", val: "WebGL2" }, { label: "Net", val: "WebRTC" }].map((s) => (
          <div key={s.label} className="flex-1 rounded-lg border border-white/10 bg-white/5 p-2 text-center">
            <div className="text-xs font-medium text-white">{s.val}</div>
            <div className="text-[10px] text-white/40">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Service Data ────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    key: "AI Chatbots",
    icon: Bot,
    color: "from-emerald-500 to-green-600",
    accent: "emerald",
    description: "24/7 AI-powered conversations that resolve queries instantly — like Webman, our WhatsApp bot.",
    demo: <div />,
  },
  {
    key: "Data Analytics",
    icon: BarChart3,
    color: "from-cyan-500 to-blue-600",
    accent: "cyan",
    description: "Real-time dashboards and ML-powered insights that drive smarter business decisions.",
    demo: <div />,
  },
  {
    key: "E-Commerce",
    icon: ShoppingCart,
    color: "from-violet-500 to-purple-600",
    accent: "violet",
    description: "High-converting online stores with seamless checkout and inventory management.",
    demo: <div />,
  },
  {
    key: "Custom Software",
    icon: Code,
    color: "from-orange-500 to-red-600",
    accent: "orange",
    description: "Tailored enterprise applications built for your exact business requirements.",
    demo: <div />,
  },
  {
    key: "Game Dev",
    icon: Gamepad2,
    color: "from-pink-500 to-rose-600",
    accent: "pink",
    description: "Engaging cross-platform games with WebGL rendering and real-time multiplayer.",
    demo: <div />,
  },
]

// ─── Main Page ────────────────────────────────────────────────────────────────────
export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [splashDone, setSplashDone] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [selectedService, setSelectedService] = useState<string>("AI Chatbots")
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)

  const totalSections = 3
  const navItems = ["Home", "Services", "Contact"]

  const scrollToSection = (index: number) => {
    if (!scrollContainerRef.current || index < 0 || index >= totalSections) return
    const w = scrollContainerRef.current.offsetWidth
    scrollContainerRef.current.scrollTo({ left: w * index, behavior: "smooth" })
    setCurrentSection(index)
    setMobileMenuOpen(false)
  }

  const handleSendWhatsApp = () => {
    if (!message.trim()) return
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank")
    setMessage("")
    setChatOpen(false)
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }
    const onTouchEnd = (e: TouchEvent) => {
      const dy = touchStartY.current - e.changedTouches[0].clientY
      const dx = touchStartX.current - e.changedTouches[0].clientX
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 50) {
        scrollToSection(dy > 0 ? Math.min(currentSection + 1, totalSections - 1) : Math.max(currentSection - 1, 0))
      }
    }
    container.addEventListener("touchstart", onTouchStart, { passive: true })
    container.addEventListener("touchend", onTouchEnd, { passive: true })
    return () => { container.removeEventListener("touchstart", onTouchStart); container.removeEventListener("touchend", onTouchEnd) }
  }, [currentSection])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        container.scrollBy({ left: e.deltaY, behavior: "instant" })
        const s = Math.round(container.scrollLeft / container.offsetWidth)
        if (s !== currentSection) setCurrentSection(s)
      }
    }
    container.addEventListener("wheel", onWheel, { passive: false })
    return () => container.removeEventListener("wheel", onWheel)
  }, [currentSection])

  const currentService = SERVICES.find((s) => s.key === selectedService) ?? SERVICES[0]

  const renderDemo = (key: string) => {
    switch (key) {
      case "AI Chatbots": return <ChatbotDemo key={key} />
      case "Data Analytics": return <AnalyticsDemo key={key} />
      case "E-Commerce": return <EcommerceDemo key={key} />
      case "Custom Software": return <SoftwareDemo key={key} />
      case "Game Dev": return <GameDemo key={key} />
      default: return null
    }
  }

  return (
    <>
      {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}

      <main
        className="relative h-screen w-full overflow-hidden bg-slate-950"
        style={{ opacity: splashDone ? 1 : 0, transition: "opacity 0.6s ease" }}
      >
        {/* ── Background ── */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 15% 25%, rgba(59,130,246,0.1) 0%, transparent 50%), radial-gradient(ellipse at 85% 75%, rgba(99,102,241,0.08) 0%, transparent 45%), #030712",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.5) 1px,transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          <div
            className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full opacity-20 blur-3xl"
            style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", animation: "slowPulse 8s ease-in-out infinite" }}
          />
          <div
            className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full opacity-15 blur-3xl"
            style={{ background: "linear-gradient(135deg,#06b6d4,#3b82f6)", animation: "slowPulse 10s ease-in-out infinite 2s" }}
          />
          {/* Floating bubbles */}
          {[
            { s: 80, l: "12%", t: "20%", d: 18 }, { s: 56, l: "80%", t: "18%", d: 22 },
            { s: 40, l: "30%", t: "70%", d: 15 }, { s: 64, l: "68%", t: "65%", d: 20 },
            { s: 30, l: "50%", t: "12%", d: 13 }, { s: 24, l: "88%", t: "48%", d: 17 },
          ].map((b, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-blue-500/10 bg-blue-500/5"
              style={{ width: b.s, height: b.s, left: b.l, top: b.t, animation: `floatBubble ${b.d}s ease-in-out infinite ${i * 1.5}s` }}
            />
          ))}
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* ── Global keyframes ── */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes blink { 0%,50%{opacity:1} 51%,100%{opacity:0} }
          @keyframes pulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
          @keyframes slowPulse { 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.1)} }
          @keyframes floatBubble { 0%,100%{transform:translateY(0) translateX(0)} 33%{transform:translateY(-20px) translateX(10px)} 66%{transform:translateY(-10px) translateX(-10px)} }
          @keyframes splashReveal { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
          @keyframes glowPulse { 0%,100%{text-shadow:0 0 40px rgba(59,130,246,0.4)} 50%{text-shadow:0 0 80px rgba(59,130,246,0.7),0 0 120px rgba(99,102,241,0.4)} }
          @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        `}} />

        {/* ── Nav ── */}
        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-6 md:px-12">
          <button onClick={() => scrollToSection(0)} className="flex items-center gap-2 transition-transform hover:scale-105">
            <Image src="/weknow-logo.png" alt="WeKnow Solutions" width={120} height={40} className="object-contain" />
          </button>

          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(index)}
                className={`relative text-sm font-medium transition-colors ${currentSection === index ? "text-white" : "text-white/50 hover:text-white"}`}
              >
                {item}
                {currentSection === index && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection(2)}
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/45"
            >
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 backdrop-blur-md md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-slate-950/97 backdrop-blur-xl md:hidden">
            <Image src="/weknow-logo.png" alt="WeKnow Solutions" width={160} height={60} className="mb-4 object-contain" />
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(index)}
                className={`text-2xl font-light transition-colors ${currentSection === index ? "text-white" : "text-white/50"}`}
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* ── Scroll container ── */}
        <div
          ref={scrollContainerRef}
          className="relative z-10 flex h-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
          style={{ scrollbarWidth: "none" }}
        >

          {/* ── HOME ── */}
          <section className="flex min-h-screen w-screen shrink-0 snap-start flex-col justify-center px-4 pt-20 sm:px-6 md:px-12">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
                <span className="h-2 w-2 rounded-full bg-green-400" style={{ animation: "pulse 2s infinite" }} />
                <span className="text-xs font-medium text-blue-300">Available for new projects</span>
              </div>

              <h1 className="mb-4 text-balance text-3xl font-light leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                Intelligent Software
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Solutions.</span>
              </h1>

              <p className="mb-8 max-w-lg text-sm leading-relaxed text-white/60 sm:text-base">
                We build AI chatbots, analytics platforms, e-commerce stores, and custom software that transform businesses into digital powerhouses.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button
                  onClick={() => scrollToSection(2)}
                  className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50"
                >
                  Book a Service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => scrollToSection(1)}
                  className="group flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-base font-medium text-white backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-blue-500/10"
                >
                  Explore Services
                  <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <span className="text-xs text-white/30">Powered by:</span>
                {["Laravel", "React", "Python", "AI/ML", "WebGL", "Cloud"].map((tech) => (
                  <span key={tech} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ── SERVICES ── */}
          <section className="flex min-h-screen w-screen shrink-0 snap-start items-center px-4 py-20 sm:px-6 md:px-12 md:py-0">
            <div className="mx-auto w-full max-w-6xl">
              <div className="mb-6">
                <h2 className="mb-1 text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl">Our Services</h2>
                <p className="text-sm text-white/40">Click a service to see a live interactive demo</p>
              </div>

              <div className="grid grid-cols-1 gap-4 lg:grid-cols-5 lg:gap-6">
                {/* Service list */}
                <div className="flex gap-2 overflow-x-auto pb-2 lg:col-span-1 lg:flex-col lg:overflow-x-visible lg:pb-0">
                  {SERVICES.map((service) => {
                    const Icon = service.icon
                    const active = selectedService === service.key
                    return (
                      <button
                        key={service.key}
                        onClick={() => setSelectedService(service.key)}
                        className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-left transition-all lg:w-full lg:px-4 lg:py-3 ${
                          active
                            ? `border-transparent bg-gradient-to-r ${service.color} shadow-lg`
                            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                        }`}
                      >
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${active ? "bg-white/20" : "bg-white/10"}`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="min-w-max lg:min-w-0">
                          <div className="text-xs font-medium text-white sm:text-sm">{service.key}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Demo panel */}
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md lg:col-span-4" style={{ minHeight: 380 }}>
                  {/* Panel header */}
                  <div className={`flex items-center gap-3 border-b border-white/10 bg-gradient-to-r ${currentService.color} bg-opacity-20 px-4 py-3`}
                    style={{ background: `linear-gradient(90deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))` }}
                  >
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${currentService.color}`}>
                      <currentService.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{currentService.key}</div>
                      <div className="text-xs text-white/50">{currentService.description}</div>
                    </div>
                    <div className="ml-auto flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-400" style={{ animation: "pulse 1.5s infinite" }} />
                      <span className="text-[10px] text-green-400">Live Demo</span>
                    </div>
                  </div>

                  {/* Demo content */}
                  <div className="h-[340px] overflow-hidden" key={selectedService}>
                    {renderDemo(selectedService)}
                  </div>

                  {/* CTA */}
                  <div className="border-t border-white/10 px-4 py-3">
                    <button
                      onClick={() => scrollToSection(2)}
                      className={`flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r ${currentService.color} py-2.5 text-sm font-medium text-white transition-all hover:opacity-90`}
                    >
                      Book {currentService.key}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── CONTACT ── */}
          <section className="flex min-h-screen w-screen shrink-0 snap-start items-center px-4 py-20 sm:px-6 md:px-12 md:py-0">
            <div className="mx-auto w-full max-w-3xl">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl">
                  Let&apos;s Build Together
                </h2>
                <p className="text-sm text-white/50">Ready to transform your business?</p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                <a
                  href={`mailto:${EMAIL}`}
                  className="group flex flex-row items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-blue-500/5 sm:flex-col sm:items-center sm:text-center"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600/20 transition-all group-hover:bg-blue-600/30 group-hover:scale-110">
                    <Mail className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Email</div>
                    <div className="text-xs text-white/50">{EMAIL}</div>
                  </div>
                </a>

                <a
                  href={`tel:+${WHATSAPP_NUMBER}`}
                  className="group flex flex-row items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5 sm:flex-col sm:items-center sm:text-center"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-600/20 transition-all group-hover:bg-cyan-600/30 group-hover:scale-110">
                    <Phone className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Call</div>
                    <div className="text-xs text-white/50">{PHONE}</div>
                  </div>
                </a>

                <button
                  onClick={() => setChatOpen(true)}
                  className="group flex flex-row items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 sm:flex-col sm:items-center sm:text-center"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-600/20 transition-all group-hover:bg-emerald-600/30 group-hover:scale-110">
                    <MessageCircle className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="font-medium text-white">WhatsApp</div>
                    <div className="text-xs text-white/50">Chat with us</div>
                  </div>
                </button>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                <h3 className="mb-4 text-center text-sm font-medium text-white/80">Send a Quick Message via WhatsApp</h3>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendWhatsApp()}
                    placeholder="Describe your project..."
                    className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-blue-500/50 focus:outline-none"
                  />
                  <button
                    onClick={handleSendWhatsApp}
                    disabled={!message.trim()}
                    className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-40"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ── WhatsApp chat widget ── */}
        {chatOpen && (
          <div
            className="fixed bottom-4 left-4 right-4 z-50 overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-80"
            style={{ animation: "splashReveal 0.3s ease" }}
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">W</div>
                <div>
                  <div className="text-sm font-medium text-white">WeKnow Solutions</div>
                  <div className="text-xs text-white/70">Typically replies instantly</div>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="rounded-full p-1 hover:bg-white/20">
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
            <div className="bg-slate-950 p-4">
              <div className="max-w-[85%] rounded-lg rounded-tl-none bg-slate-800 px-3 py-2">
                <p className="text-sm text-white/90">Hi! How can we help you today?</p>
                <p className="mt-1 text-right text-xs text-white/40">WeKnow</p>
              </div>
            </div>
            <div className="flex items-center gap-2 border-t border-white/10 bg-slate-950 p-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendWhatsApp()}
                placeholder="Type a message..."
                className="flex-1 rounded-full bg-slate-800 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none"
              />
              <button
                onClick={handleSendWhatsApp}
                disabled={!message.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-green-600 disabled:opacity-40"
              >
                <Send className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Floating WhatsApp button */}
        {!chatOpen && (
          <button
            onClick={() => setChatOpen(true)}
            className="fixed bottom-16 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg shadow-emerald-500/30 transition-all hover:scale-110 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
          >
            <MessageCircle className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </button>
        )}

        {/* Section dots */}
        <div className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2">
          {navItems.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(index)}
              title={item}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSection === index ? "w-8 bg-gradient-to-r from-blue-500 to-indigo-500" : "w-2 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </main>
    </>
  )
}
