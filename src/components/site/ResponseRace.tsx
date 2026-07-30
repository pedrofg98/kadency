import { useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'

/**
 * Elemento-assinatura da página: o lead chega e dois relógios começam a correr.
 * O da Kadency trava em 00:20. O outro não para.
 *
 * A linha do tempo roda em tempo comprimido: 9s reais cobrem os 132 primeiros
 * segundos do lead, depois o relógio "sem Kadency" dispara para mostrar o
 * abismo. Com prefers-reduced-motion, mostra o estado final parado.
 *
 * TODO(cliente): 00:20 vem do "Primeira resposta 20.2 seg" do dashboard de demo.
 * Validar com dado de produção antes de publicar.
 */

const FIRST_REPLY = '00:20'

const EVENTS = [
  { at: 20, label: 'Sibele respondeu no WhatsApp' },
  { at: 74, label: 'Lead qualificado, com orçamento e prazo no CRM' },
  { at: 132, label: 'Reunião marcada na agenda do closer' },
] as const

const STORY_SECONDS = 132
const PHASE_1_MS = 9_000 // tempo real cobrindo a história inteira do lead
const PHASE_2_MS = 6_000 // aceleração do relógio sem Kadency
const HOLD_MS = 4_000 // pausa no estado final antes de repetir
const STALLED_SECONDS = 2_952 // 49:12 — onde o relógio sem resposta para

function mmss(totalSeconds: number) {
  const s = Math.max(0, Math.floor(totalSeconds))
  const m = Math.floor(s / 60)
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function ResponseRace() {
  const [leadSeconds, setLeadSeconds] = useState(0)
  const [stalledSeconds, setStalledSeconds] = useState(0)
  const frame = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setLeadSeconds(STORY_SECONDS)
      setStalledSeconds(STALLED_SECONDS)
      return
    }

    let start: number | null = null
    const loop = (now: number) => {
      if (start === null) start = now
      const t = now - start

      if (t <= PHASE_1_MS) {
        const seconds = (t / PHASE_1_MS) * STORY_SECONDS
        setLeadSeconds(seconds)
        setStalledSeconds(seconds)
      } else if (t <= PHASE_1_MS + PHASE_2_MS) {
        const progress = (t - PHASE_1_MS) / PHASE_2_MS
        setLeadSeconds(STORY_SECONDS)
        // ease-out: dispara rápido e desacelera ao chegar no fim
        setStalledSeconds(
          STORY_SECONDS + (STALLED_SECONDS - STORY_SECONDS) * (1 - Math.pow(1 - progress, 2)),
        )
      } else if (t <= PHASE_1_MS + PHASE_2_MS + HOLD_MS) {
        setLeadSeconds(STORY_SECONDS)
        setStalledSeconds(STALLED_SECONDS)
      } else {
        start = now
      }

      frame.current = requestAnimationFrame(loop)
    }

    frame.current = requestAnimationFrame(loop)
    return () => {
      if (frame.current !== undefined) cancelAnimationFrame(frame.current)
    }
  }, [])

  return (
    <div className="rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(31,31,31,0.04),0_32px_64px_-32px_rgba(31,31,31,0.25)]">
      {/* Cabeçalho: o lead que acabou de entrar */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-coral opacity-70" />
            <span className="relative inline-flex size-2 rounded-full bg-coral" />
          </span>
          <div>
            <p className="eyebrow text-muted-foreground">Lead recebido</p>
            <p className="text-sm font-medium text-ink">Camila Duarte · Instagram Ads</p>
          </div>
        </div>
        <p className="tnum font-mono text-xs text-muted-foreground">02:14</p>
      </div>

      {/* Faixa Kadency — trava na primeira resposta */}
      <div className="px-5 py-5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="eyebrow text-coral-deep">Com Kadency</p>
          <p className="text-xs text-muted-foreground">1ª resposta</p>
        </div>
        <p className="tnum display mt-1 font-mono text-5xl font-semibold text-ink">{FIRST_REPLY}</p>

        <ul className="mt-4 space-y-2.5">
          {EVENTS.map((event) => {
            const done = leadSeconds >= event.at
            return (
              <li
                key={event.at}
                className={`flex items-center gap-3 transition-all duration-500 ${
                  done ? 'opacity-100' : 'translate-y-1 opacity-25'
                }`}
              >
                <span
                  className={`flex size-5 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                    done ? 'bg-coral text-ink' : 'bg-wash text-transparent'
                  }`}
                >
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="tnum font-mono text-xs text-muted-foreground">
                  {mmss(event.at)}
                </span>
                <span className="text-sm text-ink-2">{event.label}</span>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Faixa sem Kadency — o relógio que não para */}
      <div className="rounded-b-2xl bg-ink px-5 py-5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="eyebrow text-white/50">Sem Kadency</p>
          <p className="text-xs text-white/50">aguardando 1ª resposta</p>
        </div>
        <p className="tnum display mt-1 font-mono text-5xl font-semibold text-coral-soft">
          {mmss(stalledSeconds)}
        </p>
        <p className="mt-3 text-sm text-white/60">
          O lead não espera. Ele abre a conversa com o concorrente.
        </p>
      </div>
    </div>
  )
}
