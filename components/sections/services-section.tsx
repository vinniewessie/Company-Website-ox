"use client"

import { useReveal } from "@/hooks/use-reveal"
import { Bot, BarChart3, ShoppingCart, Code, Gamepad2 } from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"

const services = [
  {
    icon: Bot,
    name: "AI Chatbots",
    description: "24/7 intelligent customer service",
  },
  {
    icon: BarChart3,
    name: "Data Analytics",
    description: "Transform data into insights",
  },
  {
    icon: ShoppingCart,
    name: "E-Commerce",
    description: "High-converting online stores",
  },
  {
    icon: Code,
    name: "Custom Software",
    description: "Tailored business solutions",
  },
  {
    icon: Gamepad2,
    name: "Game Dev",
    description: "Engaging gaming experiences",
  },
]

interface ServicesSectionProps {
  scrollToSection: (index: number) => void
}

export function ServicesSection({ scrollToSection }: ServicesSectionProps) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex min-h-screen w-screen shrink-0 snap-start items-center px-4 py-20 sm:px-6 md:px-12 md:py-0"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div
          className={`mb-6 transition-all duration-700 sm:mb-10 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-2xl font-light tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            Services
          </h2>
          <p className="text-sm text-foreground/60 sm:text-base">Solutions that drive growth</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-2 sm:mb-10 sm:grid-cols-3 sm:gap-3 md:grid-cols-5">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.name}
                className={`group rounded-lg border border-foreground/10 bg-foreground/5 p-3 backdrop-blur-md transition-all duration-700 hover:border-foreground/20 hover:bg-foreground/10 sm:rounded-xl sm:p-4 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-foreground/10 sm:h-9 sm:w-9">
                  <Icon className="h-3.5 w-3.5 text-foreground/80 sm:h-4 sm:w-4" />
                </div>
                <h3 className="mb-1 font-sans text-xs font-medium text-foreground sm:text-sm">{service.name}</h3>
                <p className="hidden text-xs leading-relaxed text-foreground/60 sm:block">{service.description}</p>
              </div>
            )
          })}
        </div>

        <div
          className={`transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <MagneticButton variant="primary" size="lg" onClick={() => scrollToSection(2)}>
            Get Started
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
