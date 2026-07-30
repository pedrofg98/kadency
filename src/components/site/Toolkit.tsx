import { Reveal } from './motion/Reveal'
import sugestoes from '@/assets/aprendizado-sugestoes.webp'
import ganho from '@/assets/aprendizado-ganho.webp'

/**
 * Os dois modos de aprendizado do agente, no formato de card largo: numeração
 * e texto à esquerda, ilustração à direita, cada bloco num painel escuro.
 *
 * O recorte em dois vem do próprio dono do produto: "aprendizado tem duas
 * maneiras — sugestão de melhorias, e quando dá ganho ele se melhora com base
 * numa conversa que deu certo".
 */
const BLOCKS = [
  {
    number: '01',
    eyebrow: 'Sugestão de melhorias',
    title: 'Cada conversa vira uma sugestão de ajuste no roteiro.',
    body: 'O agente marca onde travou, o que confundiu o lead e a resposta que faltou. As sugestões chegam com o trecho da conversa que as originou, e nenhuma entra no ar sem você aprovar.',
    image: sugestoes,
    alt: 'Balões de conversa empilhados com um destacado acima, representando a sugestão de melhoria',
  },
  {
    number: '02',
    eyebrow: 'Aprendizado com o ganho',
    title: 'Quando a venda fecha, ele estuda a conversa que deu certo.',
    body: 'A cada ganho, o agente reconstrói o caminho que levou até ali: a ordem das perguntas, a objeção que foi quebrada e o argumento que virou o jogo. Esse caminho passa a valer nas próximas conversas.',
    image: ganho,
    alt: 'Selo de negócio ganho envolvido por uma seta que retorna, representando o aprendizado em ciclo',
  },
]

export function Toolkit() {
  return (
    <section id="aprendizado" className="scroll-mt-20 border-b border-line bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <p className="eyebrow text-coral-soft">Aprendizado</p>
          <h2 className="display mt-4 max-w-3xl text-3xl font-semibold text-white sm:text-4xl">
            O agente não fica parado no roteiro que você escreveu
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/60">
            Ele melhora por dois caminhos, e em nenhum dos dois perde o contexto da conversa.
          </p>
        </Reveal>

        {/* Os cards grudam em alturas escalonadas e a pilha se monta na rolagem.
            O sticky mora no <li>, nunca dentro de um Reveal: o transform do
            Reveal viraria o bloco de contenção e prenderia o card no próprio
            wrapper. Fundo opaco por isso mesmo — senão a pilha vaza. */}
        <ul className="mt-12">
          {BLOCKS.map((block, index) => (
            <li
              key={block.number}
              className="sticky mb-5 last:mb-0"
              style={{ top: `${6.5 + index * 2.25}rem` }}
            >
              <article className="grid overflow-hidden rounded-2xl border border-white/10 bg-[#252525] shadow-[0_-10px_30px_-6px_rgba(0,0,0,0.55)] lg:grid-cols-2">
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="flex items-center gap-4">
                    <span className="tnum font-mono text-xs text-white/45">{block.number}</span>
                    <span className="h-px w-8 bg-white/20" />
                    <span className="eyebrow text-coral-soft">{block.eyebrow}</span>
                  </p>

                  <h3 className="display mt-8 text-2xl font-semibold text-white sm:text-3xl">
                    {block.title}
                  </h3>
                  <p className="mt-5 max-w-md leading-relaxed text-white/60">{block.body}</p>
                </div>

                {/* A imagem preenche o painel inteiro em vez de flutuar com
                    respiro: o fundo dela já é quase preto, mas não idêntico ao
                    do card, e qualquer folga deixaria uma emenda de tom à
                    vista. Assim o fundo da imagem passa a ser o painel. */}
                <div className="min-h-[15rem] lg:min-h-0">
                  <img
                    src={block.image}
                    alt={block.alt}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover"
                  />
                </div>
              </article>
            </li>
          ))}

          {/* Espaçador dentro da lista, não padding no <ul>: o sticky é
              confinado ao content box do pai, então padding-bottom não estende
              o alcance — só altura real de um filho em fluxo estende. É esse
              vão que dá tempo da pilha se montar antes de soltar. */}
          <li aria-hidden="true" className="h-[55vh]" />
        </ul>
      </div>
    </section>
  )
}
