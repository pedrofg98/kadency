import { useEffect, useRef, useState } from 'react'
import { Clock, Moon, Users } from 'lucide-react'
import { Reveal } from './motion/Reveal'
import { registerReveal, prefersReducedMotion } from '@/lib/motion'

// TODO(cliente): números do workspace de demo. Trocar pelos dados agregados de
// produção — ou por uma média entre clientes — antes de publicar.
const CARDS = [
  {
    icon: Clock,
    label: 'Primeira resposta',
    value: '20,2',
    unit: 'seg',
    note: 'Tempo médio para responder',
  },
  {
    icon: Moon,
    label: 'Fora do horário',
    value: '60',
    unit: '%',
    note: 'Ninguém precisava estar online',
  },
  {
    icon: Users,
    label: 'Sempre ativo',
    value: '24/7',
    unit: '',
    note: 'O agente não tem fim de expediente',
  },
]

const AUTONOMY = 88

/** Donut da autonomia — desenha o arco quando a seção entra na viewport. */
function AutonomyDonut() {
  const ref = useRef<HTMLDivElement>(null)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setDrawn(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setDrawn(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const radius = 68
  const circumference = 2 * Math.PI * radius

  return (
    <div ref={ref} className="relative size-44 shrink-0">
      <svg viewBox="0 0 160 160" className="size-full -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--line)" strokeWidth="14" />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="var(--coral)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={drawn ? circumference * (1 - AUTONOMY / 100) : circumference}
          style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="display text-4xl font-semibold text-ink">{AUTONOMY}%</span>
        <span className="mt-1 text-xs text-muted-foreground">sem humano</span>
      </div>
    </div>
  )
}

export function Dashboard() {
  const headingRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (headingRef.current) return registerReveal(headingRef.current)
  }, [])

  return (
    <section className="border-b border-line bg-wash">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <p className="eyebrow text-coral-deep">Dashboard</p>
          <h2 className="display mt-4 max-w-2xl text-3xl font-semibold text-ink sm:text-4xl">
            O trabalho que o agente fez enquanto o time seguia focado
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card, index) => (
            <Reveal as="li" key={card.label} delay={index * 90}>
              <div className="h-full rounded-2xl border border-line bg-card p-5 transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(31,31,31,0.04),0_20px_40px_-24px_rgba(31,31,31,0.2)]">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm text-ink-2">{card.label}</p>
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-coral-tint text-coral-deep">
                    <card.icon className="size-4" />
                  </span>
                </div>
                <p className="display mt-5 text-4xl font-semibold text-ink">
                  {card.value}
                  {card.unit && (
                    <span className="ml-1.5 text-lg font-medium text-muted-foreground">
                      {card.unit}
                    </span>
                  )}
                </p>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{card.note}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <div className="mt-3 grid gap-6 rounded-2xl border border-line bg-card p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-8">
            <AutonomyDonut />
            <div>
              <h3 className="text-lg font-semibold text-ink">Autonomia do agente</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-2">
                A cada dez conversas, quase nove terminam sem ninguém do time entrar. As que precisam
                de gente chegam com contexto, histórico e o motivo do handoff.
              </p>

              <dl className="mt-6 grid gap-2 sm:max-w-sm">
                <div className="flex items-center justify-between gap-4 rounded-lg bg-wash px-4 py-3">
                  <dt className="flex items-center gap-2.5 text-sm text-ink">
                    <span className="size-2 rounded-full bg-coral" />
                    Resolvidas pelo agente
                  </dt>
                  <dd className="tnum font-mono text-sm font-semibold text-ink">44</dd>
                </div>
                <div className="flex items-center justify-between gap-4 rounded-lg bg-wash px-4 py-3">
                  <dt className="flex items-center gap-2.5 text-sm text-ink">
                    <span className="size-2 rounded-full bg-coral-soft/50" />
                    Passadas para humano
                  </dt>
                  <dd className="tnum font-mono text-sm font-semibold text-ink">6</dd>
                </div>
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
