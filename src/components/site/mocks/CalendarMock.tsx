import { useEffect, useState } from 'react'
import { Check, Search } from 'lucide-react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * Grade semanal do closer com o agente marcando uma reunião ao vivo.
 *
 * O ciclo tem quatro tempos: a agenda parada, o agente varrendo a
 * disponibilidade, a reunião entrando no vão livre e a confirmação. É a
 * história da seção — o agente acha o buraco e marca — em vez de uma lista
 * estática de compromissos.
 *
 * Com prefers-reduced-motion, para no estado final já marcado.
 */

const DAYS = [
  { label: 'SEG', date: 13 },
  { label: 'TER', date: 14 },
  { label: 'QUA', date: 15 },
  { label: 'QUI', date: 16 },
  { label: 'SEX', date: 17 },
]

const HOURS = ['09', '10', '11', '12']

/** `coluna-linha` → compromisso que já existia na agenda. */
const BUSY: Record<string, string> = {
  '0-0': 'Sprint Planning',
  '0-2': 'Kadency | Tech',
  '1-1': 'Daily | Projetos',
  '1-3': 'Almoço',
  '2-0': 'Apresentação CTC',
  '3-1': 'Daily | Projetos',
  '3-3': 'Almoço',
  '4-0': 'VIA — Rush',
  '4-2': 'Alinhamento',
}

const SLOT = { col: 2, row: 2 } // QUA, 11:00 — o vão que o agente ocupa

type Phase = 'idle' | 'searching' | 'booked' | 'confirmed'

const TIMELINE: { phase: Phase; ms: number }[] = [
  { phase: 'idle', ms: 1600 },
  { phase: 'searching', ms: 1400 },
  { phase: 'booked', ms: 900 },
  { phase: 'confirmed', ms: 3200 },
]

export function CalendarMock() {
  const [phase, setPhase] = useState<Phase>('idle')

  useEffect(() => {
    if (prefersReducedMotion()) {
      setPhase('confirmed')
      return
    }
    let step = 0
    let timer: number
    const advance = () => {
      setPhase(TIMELINE[step].phase)
      timer = window.setTimeout(() => {
        step = (step + 1) % TIMELINE.length
        advance()
      }, TIMELINE[step].ms)
    }
    advance()
    return () => window.clearTimeout(timer)
  }, [])

  const scanning = phase === 'searching'
  const placed = phase === 'booked' || phase === 'confirmed'

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(31,31,31,0.04),0_28px_56px_-32px_rgba(31,31,31,0.2)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <Check className="size-4 shrink-0 text-emerald-600" />
          <div>
            <p className="text-sm font-medium text-ink">Google Calendar conectado</p>
            <p className="text-xs text-muted-foreground">Julho · semana 13–17</p>
          </div>
        </div>
        <span className="flex shrink-0 items-center gap-2 rounded-full border border-line px-2.5 py-1">
          <span className="flex size-5 items-center justify-center rounded-full bg-coral text-[0.6rem] font-semibold text-white">
            R
          </span>
          <span className="text-xs text-ink-2">Rodrigo</span>
        </span>
      </div>

      <div className="px-4 py-4">
        {/* Gutter de hora + os cinco dias.
            minmax(0,1fr) e não 1fr: `1fr` equivale a `minmax(auto,1fr)`, e
            `auto` respeita a largura mínima do conteúdo. Com os títulos em
            `truncate` (nowrap), cada coluna exigia a frase inteira e estourava
            a página no mobile. */}
        <div className="grid grid-cols-[1.75rem_repeat(5,minmax(0,1fr))] gap-x-1">
          <span />
          {DAYS.map((day) => (
            <div key={day.label} className="pb-2 text-center">
              <p className="eyebrow text-muted-foreground">{day.label}</p>
              <p className="tnum mt-0.5 font-mono text-xs text-ink">{day.date}</p>
            </div>
          ))}

          {HOURS.map((hour, row) => (
            <div key={hour} className="contents">
              <span className="tnum pr-1 text-right font-mono text-[0.6rem] leading-9 text-muted-foreground">
                {hour}
              </span>

              {DAYS.map((day, col) => {
                const busy = BUSY[`${col}-${row}`]
                const isSlot = col === SLOT.col && row === SLOT.row
                return (
                  <div key={day.label} className="relative h-9 border-t border-line/70 pt-0.5">
                    {busy && (
                      <div className="truncate rounded-md bg-slate-100 px-1.5 py-1 text-[0.58rem] leading-tight text-slate-500">
                        {busy}
                      </div>
                    )}

                    {isSlot && (
                      <>
                        {/* o vão livre, que some assim que a reunião entra */}
                        <div
                          className={`absolute inset-x-0 top-0.5 h-[1.9rem] rounded-md border border-dashed transition-all duration-300 ${
                            placed
                              ? 'scale-95 border-transparent opacity-0'
                              : scanning
                                ? 'animate-pulse border-coral bg-coral-tint/60'
                                : 'border-line'
                          }`}
                        />
                        <div
                          className={`absolute inset-x-0 top-0.5 rounded-md bg-coral px-1.5 py-1 text-[0.58rem] leading-tight text-white shadow-[0_4px_10px_-2px_rgba(255,92,57,0.5)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            placed
                              ? 'translate-y-0 scale-100 opacity-100'
                              : 'pointer-events-none -translate-y-2 scale-90 opacity-0'
                          }`}
                        >
                          <span className="tnum block font-mono">11:00</span>
                          <span className="block truncate font-medium">Camila D.</span>
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* narração do que está acontecendo na grade */}
      <div className="flex items-center gap-2 border-t border-line bg-wash px-5 py-3">
        {phase === 'confirmed' ? (
          <>
            <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-coral">
              <Check className="size-2.5 text-white" strokeWidth={3.5} />
            </span>
            <p className="text-xs text-ink-2">
              Reunião marcada pelo agente, sem ninguém do time abrir a agenda.
            </p>
          </>
        ) : (
          <>
            <Search
              className={`size-4 shrink-0 text-muted-foreground ${scanning ? 'animate-pulse' : ''}`}
            />
            <p className="text-xs text-muted-foreground">
              {scanning
                ? 'Procurando um horário livre do Rodrigo…'
                : 'Agenda do closer, disponibilidade real.'}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
