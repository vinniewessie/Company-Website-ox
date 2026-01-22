"use client"

import React from "react"

import { Mail, Phone, MessageCircle, Send, X } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useState } from "react"

const WHATSAPP_NUMBER = "263714384521"
const EMAIL = "vincentwessie@gmail.com"
const PHONE = "+263 714 384 521"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [chatOpen, setChatOpen] = useState(false)
  const [message, setMessage] = useState("")

  const handleSendWhatsApp = () => {
    if (!message.trim()) return
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank")
    setMessage("")
    setChatOpen(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendWhatsApp()
    }
  }

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-screen shrink-0 snap-start items-center px-4 py-20 sm:px-6 md:px-12 md:py-0"
    >
      <div className="mx-auto w-full max-w-4xl">
        <div
          className={`mb-6 text-center transition-all duration-700 sm:mb-10 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-2xl font-light tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Let's Talk
          </h2>
          <p className="text-sm text-foreground/60 sm:text-base">Ready to start your project?</p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-6">
          {/* Email Card */}
          <a
            href={`mailto:${EMAIL}`}
            className={`group flex flex-row items-center gap-4 rounded-lg border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-md transition-all duration-700 hover:border-foreground/20 hover:bg-foreground/10 sm:flex-col sm:rounded-xl sm:p-6 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground/10 sm:mb-3 sm:h-12 sm:w-12">
              <Mail className="h-4 w-4 text-foreground/80 sm:h-5 sm:w-5" />
            </div>
            <div className="sm:text-center">
              <h3 className="font-sans text-sm font-medium text-foreground sm:mb-1">Email</h3>
              <p className="text-xs text-foreground/60 sm:text-xs">{EMAIL}</p>
            </div>
          </a>

          {/* Phone Card */}
          <a
            href={`tel:${WHATSAPP_NUMBER}`}
            className={`group flex flex-row items-center gap-4 rounded-lg border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-md transition-all duration-700 hover:border-foreground/20 hover:bg-foreground/10 sm:flex-col sm:rounded-xl sm:p-6 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground/10 sm:mb-3 sm:h-12 sm:w-12">
              <Phone className="h-4 w-4 text-foreground/80 sm:h-5 sm:w-5" />
            </div>
            <div className="sm:text-center">
              <h3 className="font-sans text-sm font-medium text-foreground sm:mb-1">Call</h3>
              <p className="text-xs text-foreground/60 sm:text-xs">{PHONE}</p>
            </div>
          </a>

          {/* WhatsApp Card */}
          <button
            onClick={() => setChatOpen(true)}
            className={`group flex flex-row items-center gap-4 rounded-lg border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-md transition-all duration-700 hover:border-green-500/30 hover:bg-green-500/10 sm:flex-col sm:rounded-xl sm:p-6 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 sm:mb-3 sm:h-12 sm:w-12">
              <MessageCircle className="h-4 w-4 text-green-500 sm:h-5 sm:w-5" />
            </div>
            <div className="sm:text-center">
              <h3 className="font-sans text-sm font-medium text-foreground sm:mb-1">WhatsApp</h3>
              <p className="text-xs text-foreground/60 sm:text-xs">Chat with us</p>
            </div>
          </button>
        </div>

        {/* WhatsApp Chat Widget */}
        {chatOpen && (
          <div
            className={`fixed bottom-4 left-4 right-4 z-50 overflow-hidden rounded-2xl border border-foreground/20 bg-background/95 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:bottom-6 sm:left-auto sm:right-6 sm:w-80 ${
              chatOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-green-600 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 sm:h-10 sm:w-10">
                  <MessageCircle className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h4 className="font-sans text-sm font-medium text-white">WeKnow Solutions</h4>
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
            <div className="bg-[#0b141a] p-3 sm:p-4">
              {/* Received Message */}
              <div className="mb-3 max-w-[85%] rounded-lg rounded-tl-none bg-[#202c33] px-3 py-2">
                <p className="text-sm text-white/90">
                  Hi! How can we help you today? Send us a message and we'll respond shortly.
                </p>
                <p className="mt-1 text-right text-[10px] text-white/50">WeKnow</p>
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex items-center gap-2 border-t border-foreground/10 bg-[#0b141a] p-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                rows={1}
                className="flex-1 resize-none rounded-full bg-[#202c33] px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                onClick={handleSendWhatsApp}
                disabled={!message.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-600 transition-all hover:bg-green-700 disabled:opacity-50"
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
            className={`fixed bottom-16 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-green-700 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <MessageCircle className="h-5 w-5 text-white sm:h-6 sm:w-6" />
          </button>
        )}
      </div>
    </section>
  )
}
