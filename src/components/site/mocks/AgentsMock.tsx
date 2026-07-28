import { CircleCheck, CirclePause } from 'lucide-react'

const AGENTS = [
  { name: 'Sibele', model: 'Atendimento geral · pt-BR', status: 'ativo' as const },
  { name: 'Marcos — SDR Imóveis', model: 'Qualificação de imóveis · pt-BR', status: 'pausado' as const },
  { name: 'Luna — SDR SaaS', model: 'Qualificação B2B · pt-BR', status: 'pausado' as const },
]

export function AgentsMock() {
  return (
    <div className="rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(31,31,31,0.04),0_28px_56px_-32px_rgba(31,31,31,0.2)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <p className="text-sm font-medium text-ink">Agentes</p>
        <p className="text-xs text-muted-foreground">3 configurados</p>
      </div>

      <ul className="divide-y divide-line">
        {AGENTS.map((agent) => (
          <li key={agent.name} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{agent.name}</p>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">{agent.model}</p>
            </div>
            {agent.status === 'ativo' ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[0.7rem] font-medium text-emerald-700">
                <CircleCheck className="size-3" />
                Ativo
              </span>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[0.7rem] font-medium text-amber-700">
                <CirclePause className="size-3" />
                Pausado
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="rounded-b-2xl border-t border-line bg-wash px-5 py-3">
        <p className="text-xs text-muted-foreground">
          Comece de um agente pronto ou escreva o roteiro do zero.
        </p>
      </div>
    </div>
  )
}
