import { useEffect, useState } from 'react'
import { CircleCheck, CirclePause, MessageSquare } from 'lucide-react'
import { prefersReducedMotion } from '@/lib/motion'

/**
 * O turno de atendimento passeia entre os agentes: um assume, os outros ficam
 * em espera, e um balão flutuante acompanha quem está na vez.
 *
 * O balão é absoluto e desliza por `translateY` em vez de trocar de posição no
 * fluxo — é o que faz o movimento ser contínuo entre as linhas em vez de um
 * pulo. A altura de cada linha é fixa (ROW_H) justamente para esse cálculo
 * fechar.
 */

const AGENTS = [
  { name: 'Sibele', model: 'Atendimento geral · pt-BR', conversas: 12 },
  { name: 'Marcos — SDR Imóveis', model: 'Qualificação de imóveis · pt-BR', conversas: 7 },
  { name: 'Luna — SDR SaaS', model: 'Qualificação B2B · pt-BR', conversas: 4 },
]

const ROW_H = 68 // px — precisa bater com a altura real da linha (py-3.5 + conteúdo)
const CICLO_MS = 2600

export function AgentsMock() {
  const [ativo, setAtivo] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const id = window.setInterval(() => setAtivo((i) => (i + 1) % AGENTS.length), CICLO_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="relative rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(31,31,31,0.04),0_28px_56px_-32px_rgba(31,31,31,0.2)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <p className="text-sm font-medium text-ink">Agentes</p>
        <p className="text-xs text-muted-foreground">3 configurados</p>
      </div>

      <div className="relative">
        <ul className="divide-y divide-line">
          {AGENTS.map((agent, index) => {
            const online = index === ativo
            return (
              <li
                key={agent.name}
                style={{ height: ROW_H }}
                className={`flex items-center justify-between gap-4 px-5 transition-colors duration-500 ${
                  online ? 'bg-coral-tint/50' : ''
                }`}
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{agent.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{agent.model}</p>
                </div>

                {online ? (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-700">
                    <span className="relative flex size-1.5">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex size-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Ativo
                  </span>
                ) : (
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[0.7rem] font-medium text-amber-700">
                    <CirclePause className="size-3" />
                    Pausado
                  </span>
                )}
              </li>
            )
          })}
        </ul>

        {/* Marcador coral na borda esquerda, deslizando entre as linhas */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 w-[3px] rounded-r bg-coral transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ height: ROW_H, transform: `translateY(${ativo * ROW_H}px)` }}
        />

        {/* Balão flutuante acompanhando quem está atendendo */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-3 top-0 z-10 flex items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 shadow-[0_8px_20px_-8px_rgba(31,31,31,0.35)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:-right-6"
          style={{ transform: `translateY(${ativo * ROW_H + 14}px)` }}
        >
          <MessageSquare className="size-3 text-coral" />
          <span className="tnum font-mono text-[0.65rem] text-ink">
            {AGENTS[ativo].conversas} conversas agora
          </span>
        </span>
      </div>

      <div className="flex items-center gap-2 rounded-b-2xl border-t border-line bg-wash px-5 py-3">
        <CircleCheck className="size-3.5 shrink-0 text-emerald-600" />
        <p className="text-xs text-muted-foreground">
          O turno passa de um agente para o outro sem ninguém intervir.
        </p>
      </div>
    </div>
  )
}
