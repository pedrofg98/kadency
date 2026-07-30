import { ChatMock } from './ChatMock'
import conversas from '@/assets/conversas.webp'

/**
 * A conversa no estilo WhatsApp com a lista real de chats da plataforma
 * flutuando por cima, à esquerda.
 *
 * O painel flutuante é `absolute` e sai da coluna de propósito — é o transbordo
 * que dá a sensação de camada. Some abaixo de `sm`: numa coluna estreita ele
 * cobriria a conversa em vez de acompanhá-la.
 *
 * TODO(cliente): a captura mostra telefone e nomes de leads reais. Antes de
 * publicar, decidir entre borrar esses dados ou refazer o print com um
 * workspace de exemplo.
 */
export function InboxShot() {
  return (
    <div className="relative">
      <ChatMock />

      {/* Preso ao canto inferior esquerdo e pendendo para fora: sobrepõe só a
          tarja do rodapé do chat, não os balões. Recortado curto na origem —
          a tira inteira taparia metade da conversa. */}
      <div className="pointer-events-none absolute -bottom-12 -left-8 hidden w-[9rem] sm:block lg:-bottom-14 lg:-left-12 lg:w-[10.5rem]">
        <div className="rounded-2xl border-4 border-ink/[0.06] bg-ink/[0.02] p-1 shadow-[0_2px_4px_-2px_rgba(31,31,31,0.08),0_20px_40px_-12px_rgba(31,31,31,0.28)] backdrop-blur-sm">
          <img
            src={conversas}
            alt="Lista de conversas ativas na plataforma, cada uma com o agente que está conduzindo"
            loading="lazy"
            decoding="async"
            className="w-full rounded-xl border border-line"
          />
        </div>
      </div>
    </div>
  )
}
