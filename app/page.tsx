"use client"

import { useRef, useEffect, useState } from "react"
import { Menu, X, Bot, BarChart3, ShoppingCart, Code, Gamepad2, Mail, Phone, MessageCircle, Send, TrendingUp, Users, Zap, ArrowRight, ChevronRight } from "lucide-react"

const WHATSAPP_NUMBER = "263781132817"
const EMAIL = "vincentwessie@gmail.com"
const PHONE = "+263 781 132 817"

// Code snippets for background
const codeSnippets = [
  `const AI = async (query) => {
  const response = await model.generate(query);
  return response.data;
}`,
  `function analytics(data) {
  return data.reduce((acc, val) => {
    acc[val.key] = val.count;
    return acc;
  }, {});
}`,
  `class ECommerce {
  async processOrder(cart) {
    const total = cart.items.sum();
    return await this.checkout(total);
  }
}`,
  `export const buildApp = (config) => {
  return new Application({
    ...config,
    modules: loadModules()
  });
}`,
  `const gameLoop = () => {
  update();
  render();
  requestAnimationFrame(gameLoop);
}`,
]

// Service analytics data
const serviceAnalytics = {
  "AI Chatbots": {
    icon: Bot,
    color: "from-violet-500 to-purple-600",
    stats: [
      { label: "Response Time", value: "< 0.5s", icon: Zap },
      { label: "Accuracy Rate", value: "98.5%", icon: TrendingUp },
      { label: "Daily Queries", value: "50K+", icon: Users },
    ],
    code: `// AI Chatbot Integration
const chatbot = new WeKnowAI({
  model: "gpt-4-turbo",
  context: businessData,
  language: "multi"
});

chatbot.on("message", async (msg) => {
  const intent = await chatbot.classify(msg);
  const response = await chatbot.generate(intent);
  return response;
});`,
    description: "Intelligent conversational AI that understands context, handles complex queries, and learns from interactions.",
  },
  "Data Analytics": {
    icon: BarChart3,
    color: "from-cyan-500 to-blue-600",
    stats: [
      { label: "Data Points", value: "1M+", icon: TrendingUp },
      { label: "Processing", value: "Real-time", icon: Zap },
      { label: "Insights", value: "Automated", icon: Users },
    ],
    code: `// Real-time Analytics Pipeline
const pipeline = new AnalyticsPipeline({
  source: dataStreams,
  transforms: [clean, aggregate, enrich],
  output: dashboard
});

pipeline.process(data => {
  const insights = ml.detectPatterns(data);
  dashboard.update(insights);
});`,
    description: "Transform raw data into actionable business intelligence with real-time processing and ML-powered insights.",
  },
  "E-Commerce": {
    icon: ShoppingCart,
    color: "from-emerald-500 to-green-600",
    stats: [
      { label: "Conversion", value: "+45%", icon: TrendingUp },
      { label: "Load Time", value: "< 1s", icon: Zap },
      { label: "Transactions", value: "Secure", icon: Users },
    ],
    code: `// E-Commerce Platform
const store = new WeKnowStore({
  payments: ["stripe", "paypal"],
  inventory: realtimeSync,
  shipping: multiCarrier
});

store.on("purchase", async (order) => {
  await payments.process(order);
  await inventory.update(order.items);
  await shipping.schedule(order);
});`,
    description: "High-converting online stores with seamless checkout, inventory management, and multi-payment support.",
  },
  "Custom Software": {
    icon: Code,
    color: "from-orange-500 to-red-600",
    stats: [
      { label: "Scalability", value: "Infinite", icon: TrendingUp },
      { label: "Uptime", value: "99.99%", icon: Zap },
      { label: "Support", value: "24/7", icon: Users },
    ],
    code: `// Custom Enterprise Solution
const app = new EnterpriseApp({
  modules: [auth, crm, erp, analytics],
  database: distributed,
  deployment: kubernetes
});

app.configure({
  scaling: "auto",
  security: "enterprise",
  monitoring: "realtime"
});`,
    description: "Tailored software solutions designed for your unique business requirements with enterprise-grade reliability.",
  },
  "Game Dev": {
    icon: Gamepad2,
    color: "from-pink-500 to-rose-600",
    stats: [
      { label: "Frame Rate", value: "60 FPS", icon: Zap },
      { label: "Platforms", value: "Cross", icon: Users },
      { label: "Multiplayer", value: "Built-in", icon: TrendingUp },
    ],
    code: `// Game Engine Setup
const game = new GameEngine({
  renderer: "WebGL2",
  physics: "Rapier3D",
  networking: "WebRTC"
});

game.loop(() => {
  physics.step();
  entities.update();
  renderer.draw();
});`,
    description: "Engaging gaming experiences across platforms with stunning graphics, physics, and multiplayer capabilities.",
  },
}

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [hoveredService, setHoveredService] = useState<string | null>(null)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)

  const totalSections = 3
  const navItems = ["Home", "Services", "Contact"]

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current && index >= 0 && index < totalSections) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
      setMobileMenuOpen(false)
    }
  }

  const handleSendWhatsApp = () => {
    if (!message.trim()) return
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank")
    setMessage("")
    setChatOpen(false)
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < totalSections - 1) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()
        if (!scrollContainerRef.current) return
        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })
        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection])

  const services = [
    { icon: Bot, name: "AI Chatbots", description: "24/7 intelligent customer service" },
    { icon: BarChart3, name: "Data Analytics", description: "Transform data into insights" },
    { icon: ShoppingCart, name: "E-Commerce", description: "High-converting online stores" },
    { icon: Code, name: "Custom Software", description: "Tailored business solutions" },
    { icon: Gamepad2, name: "Game Dev", description: "Engaging gaming experiences" },
  ]

  const currentAnalytics = selectedService ? serviceAnalytics[selectedService as keyof typeof serviceAnalytics] : null

  return (
    <main className="relative h-screen w-full overflow-hidden bg-slate-950">
      {/* Animated Code Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 15% 25%, rgba(59, 130, 246, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 85% 75%, rgba(99, 102, 241, 0.1) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, #0a0f1a 0%, #030712 100%)",
          }}
        />
        
        {/* Animated code snippets */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {codeSnippets.map((snippet, i) => (
            <pre
              key={i}
              className="absolute font-mono text-xs text-blue-400/60 sm:text-sm"
              style={{
                left: `${10 + i * 20}%`,
                top: `${15 + i * 18}%`,
                animation: `codeFloat ${15 + i * 3}s ease-in-out infinite ${i * 2}s`,
                transform: `rotate(${-5 + i * 2}deg)`,
              }}
            >
              {snippet}
            </pre>
          ))}
        </div>

        {/* Glowing orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)", animation: "pulse 8s ease-in-out infinite" }}
          />
          <div 
            className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full opacity-20 blur-3xl"
            style={{ background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)", animation: "pulse 10s ease-in-out infinite 2s" }}
          />
        </div>

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-blue-500/50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particleFloat ${5 + Math.random() * 10}s ease-in-out infinite ${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes codeFloat {
          0%, 100% { transform: translateY(0px) rotate(-5deg); opacity: 0.3; }
          50% { transform: translateY(-30px) rotate(0deg); opacity: 0.6; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.1); }
        }
        @keyframes particleFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-50px) translateX(20px); opacity: 0.7; }
          50% { transform: translateY(-20px) translateX(-30px); opacity: 0.5; }
          75% { transform: translateY(-40px) translateX(10px); opacity: 0.6; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}} />

      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-12">
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105 sm:gap-3"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 sm:h-10 sm:w-10">
            <span className="text-base font-bold text-white sm:text-lg">W</span>
            <div className="absolute -inset-1 rounded-lg bg-blue-500/20 blur-sm" />
          </div>
          <span className="text-sm font-medium tracking-tight text-white sm:text-base md:text-lg">WeKnow Solutions</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`relative text-sm font-medium transition-colors ${
                currentSection === index ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {item}
              {currentSection === index && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-blue-500 to-indigo-500" />
              )}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button 
            onClick={() => scrollToSection(2)}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
          >
            <span className="relative z-10 flex items-center gap-2">
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-white/5 backdrop-blur-md md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Menu className="h-5 w-5 text-white" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col items-center gap-8">
            {navItems.map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(index)}
                className={`text-2xl font-medium transition-colors ${
                  currentSection === index ? "text-white" : "text-white/60"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 flex h-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="flex min-h-screen w-screen shrink-0 snap-start flex-col justify-center px-4 pt-20 sm:px-6 sm:pt-24 md:px-12">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" style={{ animation: "pulse 2s infinite" }} />
              <span className="text-xs font-medium text-blue-300">Available for new projects</span>
            </div>
            <h1 className="mb-4 text-3xl font-light leading-tight tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Intelligent Software
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Solutions.</span>
            </h1>
            <p className="mb-6 max-w-lg text-sm leading-relaxed text-white/70 sm:mb-10 sm:text-base md:text-lg">
              We build AI chatbots, analytics platforms, and custom software that transform businesses into digital powerhouses.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button 
                onClick={() => scrollToSection(2)}
                className="group flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50"
              >
                Start Project
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
            
            {/* Tech stack badges */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className="text-xs text-white/40">Powered by:</span>
              {["React", "Node.js", "Python", "AI/ML", "Cloud"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="flex min-h-screen w-screen shrink-0 snap-start items-center px-4 py-20 sm:px-6 md:px-12 md:py-0">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-6 sm:mb-10">
              <h2 className="mb-2 text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                Our Services
              </h2>
              <p className="text-sm text-white/60 sm:text-base">Click on a service to see live analytics</p>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
              {/* Services List */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-1 lg:gap-3">
                {services.map((service) => {
                  const Icon = service.icon
                  const isSelected = selectedService === service.name
                  const analytics = serviceAnalytics[service.name as keyof typeof serviceAnalytics]
                  return (
                    <button
                      key={service.name}
                      onClick={() => setSelectedService(isSelected ? null : service.name)}
                      onMouseEnter={() => setHoveredService(service.name)}
                      onMouseLeave={() => setHoveredService(null)}
                      className={`group relative overflow-hidden rounded-lg border p-3 text-left backdrop-blur-md transition-all sm:rounded-xl sm:p-4 lg:flex lg:items-center lg:gap-4 ${
                        isSelected 
                          ? `border-transparent bg-gradient-to-r ${analytics.color} shadow-lg` 
                          : "border-white/10 bg-white/5 hover:border-blue-500/30 hover:bg-blue-500/5"
                      }`}
                    >
                      <div className={`mb-2 flex h-8 w-8 items-center justify-center rounded-lg transition-all sm:h-10 sm:w-10 lg:mb-0 ${
                        isSelected ? "bg-white/20" : "bg-gradient-to-br from-blue-600/20 to-indigo-600/20 group-hover:from-blue-600/30 group-hover:to-indigo-600/30"
                      }`}>
                        <Icon className={`h-4 w-4 sm:h-5 sm:w-5 ${isSelected ? "text-white" : "text-blue-400"}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-xs font-medium sm:text-sm ${isSelected ? "text-white" : "text-white"}`}>{service.name}</h3>
                        <p className={`hidden text-xs leading-relaxed lg:block ${isSelected ? "text-white/80" : "text-white/60"}`}>{service.description}</p>
                      </div>
                      <ChevronRight className={`hidden h-4 w-4 transition-transform lg:block ${isSelected ? "text-white rotate-90" : "text-white/40 group-hover:translate-x-1"}`} />
                    </button>
                  )
                })}
              </div>

              {/* Analytics Panel */}
              <div className="relative min-h-[300px] overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md lg:min-h-[400px]">
                {currentAnalytics ? (
                  <div className="h-full p-4 sm:p-6" style={{ animation: "slideIn 0.3s ease-out" }}>
                    {/* Header */}
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${currentAnalytics.color}`}>
                        <currentAnalytics.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{selectedService}</h3>
                        <p className="text-xs text-white/60">Live Analytics</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mb-4 grid grid-cols-3 gap-2">
                      {currentAnalytics.stats.map((stat, i) => (
                        <div 
                          key={stat.label} 
                          className="rounded-lg border border-white/10 bg-white/5 p-3 text-center"
                          style={{ animation: `slideIn 0.3s ease-out ${i * 0.1}s both` }}
                        >
                          <stat.icon className="mx-auto mb-1 h-4 w-4 text-blue-400" />
                          <div className="text-lg font-bold text-white">{stat.value}</div>
                          <div className="text-xs text-white/50">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Code Preview */}
                    <div className="overflow-hidden rounded-lg border border-white/10 bg-slate-900/80">
                      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-800/50 px-3 py-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                        <span className="ml-2 text-xs text-white/40">implementation.ts</span>
                      </div>
                      <pre className="overflow-auto p-3 font-mono text-xs text-green-400/90 sm:text-sm">
                        <code>{currentAnalytics.code}</code>
                      </pre>
                    </div>

                    {/* Description */}
                    <p className="mt-4 text-sm leading-relaxed text-white/70">{currentAnalytics.description}</p>

                    {/* CTA */}
                    <button 
                      onClick={() => scrollToSection(2)}
                      className={`mt-4 w-full rounded-lg bg-gradient-to-r ${currentAnalytics.color} px-4 py-3 text-sm font-medium text-white transition-all hover:opacity-90`}
                    >
                      Get Started with {selectedService}
                    </button>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5">
                      <Code className="h-8 w-8 text-white/30" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-white/80">Select a Service</h3>
                    <p className="max-w-xs text-sm text-white/50">Click on any service to view live analytics, code samples, and implementation details.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="flex min-h-screen w-screen shrink-0 snap-start items-center px-4 py-20 sm:px-6 md:px-12 md:py-0">
          <div className="mx-auto w-full max-w-4xl">
            <div className="mb-6 text-center sm:mb-10">
              <h2 className="mb-2 text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                Let's Build Together
              </h2>
              <p className="text-sm text-white/60 sm:text-base">Ready to transform your business?</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6">
              {/* Email Card */}
              <a
                href={`mailto:${EMAIL}`}
                className="group flex flex-row items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-blue-500/5 hover:shadow-lg hover:shadow-blue-500/10 sm:flex-col sm:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 transition-all group-hover:from-blue-600/30 group-hover:to-indigo-600/30 group-hover:scale-110 sm:mb-3">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <div className="sm:text-center">
                  <h3 className="font-medium text-white sm:mb-1">Email</h3>
                  <p className="text-xs text-white/60">{EMAIL}</p>
                </div>
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="group flex flex-row items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5 hover:shadow-lg hover:shadow-cyan-500/10 sm:flex-col sm:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 transition-all group-hover:from-cyan-600/30 group-hover:to-blue-600/30 group-hover:scale-110 sm:mb-3">
                  <Phone className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="sm:text-center">
                  <h3 className="font-medium text-white sm:mb-1">Call</h3>
                  <p className="text-xs text-white/60">{PHONE}</p>
                </div>
              </a>

              {/* WhatsApp Card */}
              <button
                onClick={() => setChatOpen(true)}
                className="group flex flex-row items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:shadow-lg hover:shadow-emerald-500/10 sm:flex-col sm:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600/20 to-green-600/20 transition-all group-hover:from-emerald-600/30 group-hover:to-green-600/30 group-hover:scale-110 sm:mb-3">
                  <MessageCircle className="h-5 w-5 text-emerald-400" />
                </div>
                <div className="sm:text-center">
                  <h3 className="font-medium text-white sm:mb-1">WhatsApp</h3>
                  <p className="text-xs text-white/60">Chat with us</p>
                </div>
              </button>
            </div>

            {/* Quick contact form */}
            <div className="mt-8 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-6">
              <h3 className="mb-4 text-center text-lg font-medium text-white">Quick Message</h3>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendWhatsApp()}
                  placeholder="Describe your project idea..."
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50"
                />
                <button
                  onClick={handleSendWhatsApp}
                  disabled={!message.trim()}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* WhatsApp Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-50 overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-80" style={{ animation: "slideIn 0.3s ease-out" }}>
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-white">WeKnow Solutions</h4>
                <p className="text-xs text-white/70">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="rounded-full p-1 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="bg-slate-950 p-4">
            <div className="mb-3 max-w-[85%] rounded-lg rounded-tl-none bg-slate-800 px-3 py-2">
              <p className="text-sm text-white/90">
                Hi! How can we help you today? Send us a message and we'll respond shortly.
              </p>
              <p className="mt-1 text-right text-xs text-white/50">WeKnow</p>
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex items-center gap-2 border-t border-white/10 bg-slate-950 p-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendWhatsApp()}
              placeholder="Type a message..."
              className="flex-1 rounded-full bg-slate-800 px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
            />
            <button
              onClick={handleSendWhatsApp}
              disabled={!message.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/40 disabled:opacity-50"
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
          className="fixed bottom-16 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-green-600 shadow-lg shadow-emerald-500/30 transition-all hover:scale-110 hover:shadow-emerald-500/50 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
          style={{ animation: "pulse 2s infinite" }}
        >
          <MessageCircle className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        </button>
      )}

      {/* Section Indicators */}
      <div className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-8">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? "w-8 bg-gradient-to-r from-blue-500 to-indigo-500" 
                : "w-2 bg-white/30 hover:bg-white/50"
            }`}
            title={item}
          />
        ))}
      </div>
    </main>
  )
}
