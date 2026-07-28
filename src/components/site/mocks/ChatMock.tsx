const MESSAGES = [
  {
    from: 'lead' as const,
    time: '00:00',
    text: 'Vi o anúncio de vocês. Ainda tem unidade de 2 quartos no Jardim Sul?',
  },
  {
    from: 'agent' as const,
    time: '00:20',
    text: 'Oi, Camila! Tem sim — restam três, duas com varanda. Você procura para morar ou investir?',
  },
  { from: 'lead' as const, time: '00:58', text: 'Para morar. Mas dependo de financiamento.' },
  {
    from: 'agent' as const,
    time: '01:14',
    text: 'Combina. As três entram no Minha Casa Minha Vida. Consigo te encaixar com o Rodrigo amanhã às 10h ou 15h — qual funciona?',
  },
  { from: 'lead' as const, time: '02:04', text: '10h fica ótimo.' },
]

export function ChatMock() {
  return (
    <div className="rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(31,31,31,0.04),0_28px_56px_-32px_rgba(31,31,31,0.2)]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex items-center gap-2.5">
          <span className="flex size-7 items-center justify-center rounded-full bg-coral text-[0.7rem] font-semibold text-ink">
            CD
          </span>
          <p className="text-sm font-medium text-ink">Camila Duarte</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-coral-tint px-2.5 py-1 text-[0.7rem] font-medium text-coral-deep">
          Sibele
        </span>
      </div>

      <div className="space-y-3 px-5 py-5">
        {MESSAGES.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col gap-1 ${
              message.from === 'agent' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                message.from === 'agent'
                  ? 'rounded-br-md bg-ink text-white'
                  : 'rounded-bl-md bg-wash text-ink'
              }`}
            >
              {message.text}
            </div>
            <span className="tnum font-mono text-[0.7rem] text-muted-foreground">
              {message.time}
            </span>
          </div>
        ))}
      </div>

      <div className="rounded-b-2xl border-t border-line bg-wash px-5 py-3.5">
        <p className="text-xs italic text-muted-foreground">
          Sibele está respondendo automaticamente…
        </p>
      </div>
    </div>
  )
}
