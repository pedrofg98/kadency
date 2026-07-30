import { Check, Phone, Video, MoreVertical } from 'lucide-react'

const MESSAGES = [
  {
    from: 'lead' as const,
    time: '09:12',
    text: 'Vi o anúncio de vocês. Ainda tem unidade de 2 quartos no Jardim Sul?',
  },
  {
    from: 'agent' as const,
    time: '09:12',
    text: 'Oi, Camila! Tem sim — restam três, duas com varanda. Você procura para morar ou investir?',
  },
  { from: 'lead' as const, time: '09:13', text: 'Para morar. Mas dependo de financiamento.' },
  {
    from: 'agent' as const,
    time: '09:13',
    text: 'Combina. As três entram no Minha Casa Minha Vida. Consigo te encaixar com o Rodrigo amanhã às 10h ou 15h — qual funciona?',
  },
  { from: 'lead' as const, time: '09:14', text: '10h fica ótimo.' },
]

/** Check duplo do WhatsApp: dois traços sobrepostos, não existe ícone pronto. */
function DoubleCheck() {
  return (
    <span className="relative inline-flex w-4 shrink-0 text-sky-500" aria-hidden="true">
      <Check className="size-3" strokeWidth={3} />
      <Check className="absolute left-1 size-3" strokeWidth={3} />
    </span>
  )
}

export function ChatMock() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-[0_1px_2px_rgba(31,31,31,0.04),0_28px_56px_-32px_rgba(31,31,31,0.2)]">
      {/* barra de contato do WhatsApp */}
      <div className="flex items-center gap-3 border-b border-line bg-[#f0f2f5] px-4 py-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-coral text-xs font-semibold text-white">
          CD
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">Camila Duarte</p>
          <p className="truncate text-[0.7rem] text-muted-foreground">online</p>
        </div>
        <div className="flex shrink-0 items-center gap-3 text-muted-foreground">
          <Video className="size-4" />
          <Phone className="size-4" />
          <MoreVertical className="size-4" />
        </div>
      </div>

      {/* O papel de parede do WhatsApp em CSS: pontos finos sobre o bege dele.
          Basta para o olho reconhecer o app, sem carregar imagem de fundo. */}
      <div className="space-y-2 bg-[#efe7de] bg-[radial-gradient(circle_at_1px_1px,rgba(31,31,31,0.05)_1px,transparent_0)] bg-[length:18px_18px] px-4 py-5">
        {MESSAGES.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.from === 'agent' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[82%] rounded-lg px-2.5 py-1.5 text-sm leading-relaxed shadow-[0_1px_1px_rgba(31,31,31,0.12)] ${
                message.from === 'agent'
                  ? 'rounded-tr-none bg-[#d9fdd3] text-ink'
                  : 'rounded-tl-none bg-white text-ink'
              }`}
            >
              {message.text}
              <span className="mt-0.5 flex items-center justify-end gap-1">
                <span className="tnum font-mono text-[0.6rem] text-ink/45">{message.time}</span>
                {message.from === 'agent' && <DoubleCheck />}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-line bg-wash px-4 py-3">
        <p className="text-xs italic text-muted-foreground">
          Sibele está respondendo automaticamente…
        </p>
      </div>
    </div>
  )
}
