import { Snowflake, Thermometer, Flame } from 'lucide-react'

const TEMPERATURE = {
  frio: { icon: Snowflake, className: 'text-sky-500' },
  morno: { icon: Thermometer, className: 'text-amber-500' },
  quente: { icon: Flame, className: 'text-coral' },
} as const

type Temp = keyof typeof TEMPERATURE

const COLUMNS: {
  stage: string
  accent: string
  dot: string
  count: number
  cards: { name: string; value?: string; owner: string; age: string; temp: Temp }[]
}[] = [
  {
    stage: 'Novo',
    accent: 'bg-red-500',
    dot: 'bg-red-500',
    count: 9,
    cards: [
      { name: 'Lucas Almeida', owner: 'Sem responsável', age: '7h', temp: 'frio' },
      { name: 'Guilherme', owner: 'Eduardo Ulysséa', age: '1d', temp: 'frio' },
      { name: 'Wader Junior', owner: 'Bernardo Freitas', age: '2d', temp: 'morno' },
      { name: 'João Vitor', owner: 'Sem responsável', age: '2d', temp: 'frio' },
    ],
  },
  {
    stage: 'Em Qualificação',
    accent: 'bg-violet-500',
    dot: 'bg-violet-500',
    count: 2,
    cards: [
      { name: 'Paulo Peixoto', owner: 'Sibele', age: '6h', temp: 'quente' },
      { name: 'Empresa Carlos SA', owner: 'Sem responsável', age: '15d', temp: 'morno' },
    ],
  },
  {
    stage: 'Qualificado',
    accent: 'bg-emerald-500',
    dot: 'bg-emerald-500',
    count: 2,
    cards: [
      { name: 'Marina Alencar', value: 'R$ 4.000', owner: 'Guilherme Otto', age: '2h', temp: 'quente' },
      { name: 'Bernardo Freitas', value: 'R$ 1.000', owner: 'Eduardo Ulysséa', age: '9h', temp: 'morno' },
    ],
  },
  {
    stage: 'Reunião Agendada',
    accent: 'bg-amber-500',
    dot: 'bg-amber-500',
    count: 1,
    cards: [{ name: 'Kaique', value: 'R$ 12.000', owner: 'Eduardo Ulysséa', age: '4d', temp: 'morno' }],
  },
]

export function KanbanMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(31,31,31,0.04),0_28px_56px_-32px_rgba(31,31,31,0.2)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
        <p className="text-sm font-medium text-ink">Funil</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-[0.7rem] text-muted-foreground">
          <Snowflake className="size-3 text-sky-500" />
          13 esfriando
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 lg:grid-cols-4">
        {COLUMNS.map((column) => (
          <div key={column.stage} className="overflow-hidden rounded-xl bg-wash">
            <div className={`h-1 ${column.accent}`} />
            <div className="p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="flex items-center gap-1.5 truncate text-[0.7rem] font-medium text-ink">
                  <span className={`size-1.5 shrink-0 rounded-full ${column.dot}`} />
                  {column.stage}
                </p>
                <p className="tnum font-mono text-[0.7rem] text-muted-foreground">{column.count}</p>
              </div>

              <div className="mt-3 space-y-2">
                {column.cards.map((card) => {
                  const Temp = TEMPERATURE[card.temp]
                  return (
                    <div key={card.name} className="rounded-lg border border-line bg-card p-2.5">
                      <div className="flex items-start justify-between gap-2">
                        <p className="truncate text-[0.78rem] font-medium text-ink">{card.name}</p>
                        <Temp.icon className={`size-3 shrink-0 ${Temp.className}`} />
                      </div>
                      <p
                        className={`mt-1 truncate text-[0.7rem] ${
                          card.value ? 'font-medium text-ink' : 'text-muted-foreground'
                        }`}
                      >
                        {card.value ?? 'Valor não informado'}
                      </p>
                      <p className="mt-2 flex items-center justify-between gap-2 text-[0.65rem] text-muted-foreground">
                        <span className="truncate">{card.owner}</span>
                        <span className="tnum shrink-0 font-mono">{card.age}</span>
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
