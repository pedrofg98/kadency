import { useEffect, useRef, useState } from 'react'
import {
  Inbox,
  MessageSquare,
  ListChecks,
  KanbanSquare,
  RotateCcw,
  CalendarCheck,
} from 'lucide-react'
import { Reveal } from './motion/Reveal'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Timeline que preenche conforme passa pela viewport — num scroll só, sem
 * prender a tela. O progresso sai da posição da própria trilha: começa a
 * contar quando ela entra pela parte de baixo e fecha quando chega ao terço
 * superior.
 *
 * A numeração é literal: isto é uma sequência de verdade, cada etapa só
 * acontece depois da anterior.
 */

const STEPS = [
  {
    icon: Inbox,
    title: 'O lead chega.',
    caption: 'De qualquer origem, a qualquer hora.',
  },
  {
    icon: MessageSquare,
    title: 'O agente responde.',
    caption: 'Em segundos, no WhatsApp.',
  },
  {
    icon: ListChecks,
    title: 'Qualifica com o seu roteiro.',
    caption: 'As perguntas que seu time faria.',
  },
  {
    icon: KanbanSquare,
    title: 'Move sozinho no funil.',
    caption: 'Conforme a conversa evolui.',
  },
  {
    // entra depois do funil de propósito: é o funil que aponta quem esfriou,
    // e o follow-up é o que resgata esse lead até virar reunião
    icon: RotateCcw,
    title: 'Volta em quem sumiu.',
    caption: 'Follow-up sem ninguém lembrar.',
  },
  {
    icon: CalendarCheck,
    title: 'Marca na agenda do closer.',
    caption: 'Direto no Google Calendar.',
  },
]

const SEGMENTS = STEPS.length - 1

/**
 * A trilha vai do centro do primeiro nó ao do último, não de borda a borda.
 * Com colunas iguais, esses centros caem a meia coluna de cada ponta — daí o
 * cálculo em vez de número fixo, senão a linha desalinha a cada etapa nova.
 */
const EDGE = 100 / (STEPS.length * 2)
const SPAN = 100 - EDGE * 2

/** Progresso de 0 a 1 conforme o elemento atravessa a viewport. */
function useTrackProgress(ref: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setProgress(1)
      return
    }

    let ticking = false
    const update = () => {
      ticking = false
      const el = ref.current
      if (!el) return
      const viewportHeight = window.innerHeight
      // começa a preencher com a trilha perto do rodapé da tela e
      // termina quando ela sobe até o terço superior
      const start = viewportHeight * 0.92
      const end = viewportHeight * 0.38
      const raw = (start - el.getBoundingClientRect().top) / (start - end)
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ref])

  return progress
}

export function Flow() {
  const trackRef = useRef<HTMLDivElement>(null)
  const progress = useTrackProgress(trackRef)

  // posição contínua do ponto ao longo da trilha (0 → 4)
  const head = progress * SEGMENTS

  return (
    <section
      id="como-funciona"
      className="relative scroll-mt-20 overflow-hidden border-b border-line bg-wash"
    >
      {/* grade de fundo, bem apagada */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55] [background-image:linear-gradient(to_right,var(--line)_1px,transparent_1px),linear-gradient(to_bottom,var(--line)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_78%)]"
      />

      <div className="relative mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-coral" />
            <span className="eyebrow text-ink-2">Como funciona</span>
          </span>
          <h2 className="display mt-6 max-w-2xl text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">
            Do anúncio à reunião marcada.
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
            Seis etapas e um ciclo inteiro de atendimento, sem ninguém do seu time no meio do
            caminho.
          </p>
        </Reveal>

        {/* ---------- trilha horizontal (lg+) ---------- */}
        <div ref={trackRef} className="mt-20 hidden lg:block">
          <div className="relative">
            <div
              className="absolute top-7 h-px bg-line"
              style={{ left: `${EDGE}%`, right: `${EDGE}%` }}
            />
            <div
              className="absolute top-7 h-px bg-coral transition-[width] duration-200 ease-out"
              style={{ left: `${EDGE}%`, width: `${(head / SEGMENTS) * SPAN}%` }}
            />
            {/* ponto luminoso na ponta */}
            <div
              className="absolute top-7 -ml-[5px] -mt-[5px] size-2.5 rounded-full bg-coral shadow-[0_0_0_5px_rgba(255,92,57,0.22)] transition-[left,opacity] duration-200 ease-out"
              style={{
                left: `${EDGE + (head / SEGMENTS) * SPAN}%`,
                // some ao chegar no fim: parado em cima do último nó vira sujeira
                opacity: head > SEGMENTS - 0.05 ? 0 : 1,
              }}
            />

            {/* colunas por style: `grid-cols-${n}` não sobrevive ao purge do Tailwind */}
            <ol
              className="relative grid"
              style={{ gridTemplateColumns: `repeat(${STEPS.length}, minmax(0, 1fr))` }}
            >
              {STEPS.map((item, index) => {
                const reached = head >= index - 0.4
                return (
                  <li key={item.title} className="flex flex-col items-center px-2.5 text-center">
                    <span
                      className={`flex size-14 items-center justify-center rounded-full border-2 border-dashed transition-colors duration-500 ${
                        reached ? 'border-coral/45' : 'border-transparent'
                      }`}
                    >
                      <span
                        className={`flex size-11 items-center justify-center rounded-full transition-colors duration-500 ${
                          reached
                            ? 'bg-coral text-ink'
                            : 'border border-line bg-card text-muted-foreground'
                        }`}
                      >
                        <item.icon className="size-5" />
                      </span>
                    </span>

                    <span
                      className={`mt-5 h-9 w-px transition-colors duration-500 ${
                        reached ? 'bg-coral/30' : 'bg-line'
                      }`}
                    />

                    <p
                      className={`mt-5 text-base font-semibold transition-colors duration-500 ${
                        reached ? 'text-ink' : 'text-ink/25'
                      }`}
                    >
                      <span
                        className={`tnum mr-2 font-mono text-xs transition-colors duration-500 ${
                          reached ? 'text-coral-deep' : 'text-ink/20'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.title}
                    </p>
                    <p
                      className={`mt-3 max-w-[12rem] text-sm leading-relaxed transition-colors duration-500 ${
                        reached ? 'text-muted-foreground' : 'text-ink/15'
                      }`}
                    >
                      {item.caption}
                    </p>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        {/* ---------- trilha vertical (mobile) ---------- */}
        <ol className="mt-14 lg:hidden">
          {STEPS.map((item, index) => (
            <Reveal as="li" key={item.title} delay={index * 70}>
              <div className="relative flex gap-5 pb-9 last:pb-0">
                {index < STEPS.length - 1 && (
                  <span className="absolute left-[1.375rem] top-11 h-full w-px bg-coral/25" />
                )}
                <span className="relative z-10 flex size-11 shrink-0 items-center justify-center rounded-full bg-coral text-ink ring-2 ring-coral/25 ring-offset-4 ring-offset-wash">
                  <item.icon className="size-5" />
                </span>
                <div className="pt-1.5">
                  <p className="text-base font-semibold text-ink">
                    <span className="tnum mr-2 font-mono text-xs text-coral-deep">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.title}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.caption}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
