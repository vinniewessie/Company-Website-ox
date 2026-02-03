"use client"

import { useRef, useEffect, useState } from "react"
import { Menu, X, Bot, BarChart3, ShoppingCart, Code, Gamepad2, Mail, Phone, MessageCircle, Send } from "lucide-react"

const WHATSAPP_NUMBER = "263781132817"
const EMAIL = "vincentwessie@gmail.com"
const PHONE = "+263 781 132 817"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")
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

  return (
    <main className="relative h-screen w-full overflow-hidden bg-slate-950">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 15% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 85% 75%, rgba(99, 102, 241, 0.12) 0%, transparent 45%), radial-gradient(ellipse at 50% 50%, #0a0f1a 0%, #030712 100%)",
          }}
        />
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full opacity-30 blur-3xl"
            style={{ background: "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)" }}
          />
          <div 
            className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full opacity-20 blur-3xl"
            style={{ background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)" }}
          />
        </div>
        
        {/* Animated Tech Bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large floating bubbles */}
          <div 
            className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full border border-blue-500/20 bg-blue-500/5 sm:h-48 sm:w-48"
            style={{ animation: "float 20s ease-in-out infinite" }}
          />
          <div 
            className="absolute right-[15%] top-[15%] h-24 w-24 rounded-full border border-indigo-500/20 bg-indigo-500/5 sm:h-36 sm:w-36"
            style={{ animation: "float 25s ease-in-out infinite reverse" }}
          />
          <div 
            className="absolute bottom-[25%] left-[20%] h-20 w-20 rounded-full border border-cyan-500/20 bg-cyan-500/5 sm:h-32 sm:w-32"
            style={{ animation: "float 18s ease-in-out infinite 2s" }}
          />
          <div 
            className="absolute bottom-[20%] right-[25%] h-28 w-28 rounded-full border border-blue-400/20 bg-blue-400/5 sm:h-40 sm:w-40"
            style={{ animation: "float 22s ease-in-out infinite 1s reverse" }}
          />
          
          {/* Medium bubbles */}
          <div 
            className="absolute left-[45%] top-[10%] h-16 w-16 rounded-full border border-indigo-400/30 bg-indigo-400/10 sm:h-24 sm:w-24"
            style={{ animation: "float 15s ease-in-out infinite 3s" }}
          />
          <div 
            className="absolute left-[5%] top-[60%] h-14 w-14 rounded-full border border-blue-300/20 bg-blue-300/5 sm:h-20 sm:w-20"
            style={{ animation: "float 17s ease-in-out infinite reverse" }}
          />
          <div 
            className="absolute right-[8%] top-[55%] h-16 w-16 rounded-full border border-cyan-400/25 bg-cyan-400/8 sm:h-28 sm:w-28"
            style={{ animation: "float 19s ease-in-out infinite 2.5s" }}
          />
          
          {/* Small bubbles */}
          <div 
            className="absolute left-[30%] top-[40%] h-8 w-8 rounded-full border border-blue-500/30 bg-blue-500/15 sm:h-12 sm:w-12"
            style={{ animation: "float 12s ease-in-out infinite 1.5s" }}
          />
          <div 
            className="absolute left-[70%] top-[35%] h-10 w-10 rounded-full border border-indigo-500/30 bg-indigo-500/10 sm:h-14 sm:w-14"
            style={{ animation: "float 14s ease-in-out infinite reverse 0.5s" }}
          />
          <div 
            className="absolute bottom-[40%] left-[55%] h-6 w-6 rounded-full border border-cyan-500/35 bg-cyan-500/15 sm:h-10 sm:w-10"
            style={{ animation: "float 11s ease-in-out infinite 2s" }}
          />
          <div 
            className="absolute right-[35%] top-[70%] h-8 w-8 rounded-full border border-blue-400/30 bg-blue-400/10 sm:h-12 sm:w-12"
            style={{ animation: "float 13s ease-in-out infinite reverse 3s" }}
          />
          <div 
            className="absolute bottom-[15%] left-[40%] h-6 w-6 rounded-full border border-indigo-400/30 bg-indigo-400/15 sm:h-8 sm:w-8"
            style={{ animation: "float 10s ease-in-out infinite 1s" }}
          />
          
          {/* Tiny accent bubbles */}
          <div 
            className="absolute left-[25%] top-[75%] h-4 w-4 rounded-full bg-blue-500/30 sm:h-6 sm:w-6"
            style={{ animation: "pulse 4s ease-in-out infinite" }}
          />
          <div 
            className="absolute right-[20%] top-[80%] h-3 w-3 rounded-full bg-indigo-500/40 sm:h-5 sm:w-5"
            style={{ animation: "pulse 5s ease-in-out infinite 1s" }}
          />
          <div 
            className="absolute left-[60%] top-[25%] h-4 w-4 rounded-full bg-cyan-500/35 sm:h-6 sm:w-6"
            style={{ animation: "pulse 3.5s ease-in-out infinite 0.5s" }}
          />
          <div 
            className="absolute left-[85%] top-[45%] h-3 w-3 rounded-full bg-blue-400/40 sm:h-4 sm:w-4"
            style={{ animation: "pulse 4.5s ease-in-out infinite 2s" }}
          />
        </div>
        
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          25% { transform: translateY(-20px) translateX(10px) rotate(5deg); }
          50% { transform: translateY(-10px) translateX(-15px) rotate(-3deg); }
          75% { transform: translateY(-25px) translateX(5px) rotate(3deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.2); }
        }
      `}} />

      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-12">
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105 sm:gap-3"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 sm:h-10 sm:w-10">
            <span className="text-base font-bold text-white sm:text-lg">W</span>
          </div>
          <span className="text-sm font-medium tracking-tight text-white sm:text-base md:text-lg">WeKnow Solutions</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex lg:gap-8">
          {navItems.map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`text-sm font-medium transition-colors ${
                currentSection === index ? "text-white" : "text-white/60 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button 
            onClick={() => scrollToSection(2)}
            className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40"
          >
            Contact Us
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
            <h1 className="mb-4 text-3xl font-light leading-tight tracking-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Intelligent Software
              <br />
              <span className="text-white/50">Solutions.</span>
            </h1>
            <p className="mb-6 max-w-lg text-sm leading-relaxed text-white/70 sm:mb-10 sm:text-base md:text-lg">
              We build AI chatbots, analytics platforms, and custom software that transform businesses.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button 
                onClick={() => scrollToSection(2)}
                className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50"
              >
                Start Project
              </button>
              <button 
                onClick={() => scrollToSection(1)}
                className="rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-base font-medium text-white backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-blue-500/10"
              >
                Our Services
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="flex min-h-screen w-screen shrink-0 snap-start items-center px-4 py-20 sm:px-6 md:px-12 md:py-0">
          <div className="mx-auto w-full max-w-5xl">
            <div className="mb-6 sm:mb-10">
              <h2 className="mb-2 text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                Services
              </h2>
              <p className="text-sm text-white/60 sm:text-base">Solutions that drive growth</p>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-2 sm:mb-10 sm:grid-cols-3 sm:gap-3 md:grid-cols-5">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <div
                    key={service.name}
                    className="group rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-blue-500/5 sm:rounded-xl sm:p-4"
                  >
                    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600/20 to-indigo-600/20 transition-all group-hover:from-blue-600/30 group-hover:to-indigo-600/30 sm:h-9 sm:w-9">
                      <Icon className="h-3.5 w-3.5 text-blue-400 sm:h-4 sm:w-4" />
                    </div>
                    <h3 className="mb-1 text-xs font-medium text-white sm:text-sm">{service.name}</h3>
                    <p className="hidden text-xs leading-relaxed text-white/60 sm:block">{service.description}</p>
                  </div>
                )
              })}
            </div>

            <button 
              onClick={() => scrollToSection(2)}
              className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-base font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50"
            >
              Get Started
            </button>
          </div>
        </section>

        {/* Contact Section */}
        <section className="flex min-h-screen w-screen shrink-0 snap-start items-center px-4 py-20 sm:px-6 md:px-12 md:py-0">
          <div className="mx-auto w-full max-w-4xl">
            <div className="mb-6 text-center sm:mb-10">
              <h2 className="mb-2 text-2xl font-light tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
                Let's Talk
              </h2>
              <p className="text-sm text-white/60 sm:text-base">Ready to start your project?</p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6">
              {/* Email Card */}
              <a
                href={`mailto:${EMAIL}`}
                className="group flex flex-row items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:border-blue-500/30 hover:bg-blue-500/5 sm:flex-col sm:rounded-xl sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 transition-all group-hover:from-blue-600/30 group-hover:to-indigo-600/30 sm:mb-3 sm:h-12 sm:w-12">
                  <Mail className="h-4 w-4 text-blue-400 sm:h-5 sm:w-5" />
                </div>
                <div className="sm:text-center">
                  <h3 className="text-sm font-medium text-white sm:mb-1">Email</h3>
                  <p className="text-xs text-white/60">{EMAIL}</p>
                </div>
              </a>

              {/* Phone Card */}
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="group flex flex-row items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:border-cyan-500/30 hover:bg-cyan-500/5 sm:flex-col sm:rounded-xl sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-600/20 to-blue-600/20 transition-all group-hover:from-cyan-600/30 group-hover:to-blue-600/30 sm:mb-3 sm:h-12 sm:w-12">
                  <Phone className="h-4 w-4 text-cyan-400 sm:h-5 sm:w-5" />
                </div>
                <div className="sm:text-center">
                  <h3 className="text-sm font-medium text-white sm:mb-1">Call</h3>
                  <p className="text-xs text-white/60">{PHONE}</p>
                </div>
              </a>

              {/* WhatsApp Card */}
              <button
                onClick={() => setChatOpen(true)}
                className="group flex flex-row items-center gap-4 rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-md transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 sm:flex-col sm:rounded-xl sm:p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600/20 to-green-600/20 transition-all group-hover:from-emerald-600/30 group-hover:to-green-600/30 sm:mb-3 sm:h-12 sm:w-12">
                  <MessageCircle className="h-4 w-4 text-emerald-400 sm:h-5 sm:w-5" />
                </div>
                <div className="sm:text-center">
                  <h3 className="text-sm font-medium text-white sm:mb-1">WhatsApp</h3>
                  <p className="text-xs text-white/60">Chat with us</p>
                </div>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* WhatsApp Chat Widget */}
      {chatOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-50 overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl sm:bottom-6 sm:left-auto sm:right-6 sm:w-80">
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-green-600 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 sm:h-10 sm:w-10">
                <MessageCircle className="h-4 w-4 text-white sm:h-5 sm:w-5" />
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
          <div className="bg-slate-950 p-3 sm:p-4">
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
        >
          <MessageCircle className="h-5 w-5 text-white sm:h-6 sm:w-6" />
        </button>
      )}

      {/* Section Indicators */}
      <div className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 sm:bottom-8">
        {navItems.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSection === index ? "w-6 bg-gradient-to-r from-blue-500 to-indigo-500 sm:w-8" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </main>
  )
}
