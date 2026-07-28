import { CircleCheck } from 'lucide-react'

const DAYS = ['SEG', 'TER', 'QUA', 'QUI', 'SEX']

const WEEK: { day: number; events: { time: string; title: string; booked?: boolean }[] }[] = [
  {
    day: 13,
    events: [
      { time: '09:00', title: 'Sprint Planning' },
      { time: '10:30', title: 'Kadency | Tech' },
    ],
  },
  {
    day: 14,
    events: [
      { time: '09:30', title: 'Daily | Projetos' },
      { time: '14:00', title: 'Camila Duarte', booked: true },
    ],
  },
  { day: 15, events: [{ time: '09:00', title: 'Apresentação CTC' }] },
  {
    day: 16,
    events: [
      { time: '09:30', title: 'Daily | Projetos' },
      { time: '10:30', title: 'VIA — Rush' },
    ],
  },
  {
    day: 17,
    events: [
      { time: '11:00', title: 'Kaique — demo', booked: true },
      { time: '13:00', title: 'Alinhamento' },
    ],
  },
]

export function CalendarMock() {
  return (
    <div className="rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(31,31,31,0.04),0_28px_56px_-32px_rgba(31,31,31,0.2)]">
      <div className="flex items-center gap-2.5 border-b border-line px-5 py-3.5">
        <CircleCheck className="size-4 text-emerald-600" />
        <div>
          <p className="text-sm font-medium text-ink">Google Calendar conectado</p>
          <p className="text-xs text-muted-foreground">Agenda do closer, disponibilidade real</p>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-px bg-line p-px">
        {WEEK.map((column, index) => (
          <div key={column.day} className="bg-card p-2.5">
            <div className="flex items-baseline justify-between gap-1">
              <span className="eyebrow text-muted-foreground">{DAYS[index]}</span>
              <span className="tnum font-mono text-[0.7rem] text-ink">{column.day}</span>
            </div>

            <div className="mt-2.5 space-y-1.5">
              {column.events.map((event) => (
                <div
                  key={event.time + event.title}
                  className={`rounded-md px-1.5 py-1.5 text-[0.62rem] leading-tight ${
                    event.booked
                      ? 'bg-coral-tint text-coral-deep ring-1 ring-coral/30'
                      : 'bg-slate-50 text-slate-500'
                  }`}
                >
                  <span className="tnum block font-mono">{event.time}</span>
                  <span className="mt-0.5 block truncate font-medium">{event.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-b-2xl border-t border-line bg-wash px-5 py-3">
        <p className="text-xs text-muted-foreground">
          <span className="inline-block size-2 translate-y-px rounded-sm bg-coral" />{' '}
          Marcado pelo agente, sem ninguém do time abrir a agenda.
        </p>
      </div>
    </div>
  )
}
