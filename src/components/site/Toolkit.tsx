import { BookOpen, Sparkles, Zap } from 'lucide-react'
import { Reveal } from './motion/Reveal'

const ITEMS = [
  {
    icon: BookOpen,
    title: 'Base de conhecimento',
    body: 'Suba tabela de preços, política de desconto e as objeções que seu time já sabe responder. O agente cita a fonte em vez de inventar.',
    detail: 'PDF, planilha, link ou texto colado.',
  },
  {
    icon: Sparkles,
    title: 'Aprendizado',
    body: 'Conversas reais viram sugestões de melhoria no roteiro. Você aprova o que entra — o agente não muda de tom sozinho.',
    detail: 'Cada sugestão vem com o trecho da conversa que a originou.',
  },
  {
    icon: Zap,
    title: 'Automações',
    body: 'Follow-up de quem sumiu, aviso quando um lead esfria, movimentação no funil. Regras suas, disparadas sem ninguém lembrar.',
    detail: 'Dispara por tempo parado, etapa ou resposta do lead.',
  },
]

/**
 * Os cards grudam em alturas escalonadas: o primeiro para, o segundo sobe e
 * encosta logo abaixo dele, e assim por diante — a pilha se monta na rolagem.
 * Cada card precisa de fundo opaco, senão a pilha vaza.
 */
export function Toolkit() {
  return (
    <section className="border-b border-line bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <p className="eyebrow text-coral-soft">Por trás do agente</p>
          <h2 className="display mt-4 max-w-2xl text-3xl font-semibold text-white sm:text-4xl">
            O que faz o agente responder certo, e não só responder rápido
          </h2>
        </Reveal>

        <ul className="mt-12">
          {ITEMS.map((item, index) => (
            <li
              key={item.title}
              className="sticky mb-5 last:mb-0"
              style={{ top: `${6.5 + index * 2.25}rem` }}
            >
              {/* A sombra para cima é o que faz a pilha ser lida como pilha:
                  sem ela o card de cima só "suja" o de baixo. */}
              <div className="overflow-hidden rounded-2xl border border-white/12 bg-[#2b2b2b] p-6 shadow-[0_-10px_30px_-6px_rgba(0,0,0,0.55)] sm:p-8">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-7">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-coral/15 text-coral-soft">
                    <item.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="flex items-baseline gap-3 text-xl font-semibold text-white">
                      <span className="tnum font-mono text-xs text-coral-soft">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-xl leading-relaxed text-white/65">{item.body}</p>
                    <p className="mt-3 text-sm text-white/40">{item.detail}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* respiro para a pilha terminar de se montar antes da próxima seção */}
        <div className="h-24 md:h-40" />
      </div>
    </section>
  )
}
