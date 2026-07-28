import { ArrowRight, Code2, Webhook } from 'lucide-react'
import { Reveal } from './motion/Reveal'
import { Marquee } from './motion/Marquee'
import { BRANDS } from './mocks/brands'

/**
 * TODO(cliente): confirmar quais integrações já existem antes de publicar.
 *
 * Pipedrive e RD Station saem como monograma: a simple-icons não distribui
 * essas marcas (removidas a pedido das próprias empresas). Desenhar de memória
 * daria um logo errado, que é pior que nenhum — se quiser os dois com marca,
 * peça o SVG oficial no material de imprensa deles e troque aqui.
 */

type Tile =
  | { kind: 'brand'; title: string; hex: string; path: string }
  | { kind: 'letters'; title: string; hex: string; letters: string }
  | { kind: 'icon'; title: string; hex: string; icon: typeof Webhook }

const TILES: Tile[] = [
  ...BRANDS.map((brand) => ({ kind: 'brand' as const, ...brand })),
  { kind: 'letters', title: 'RD Station', hex: '#1F7BFF', letters: 'RD' },
  { kind: 'letters', title: 'Pipedrive', hex: '#017737', letters: 'P' },
  // estes dois não são marcas de terceiros, então usam a paleta da casa
  { kind: 'icon', title: 'Webhooks', hex: '#FF5C39', icon: Webhook },
  { kind: 'icon', title: 'API própria', hex: '#1F1F1F', icon: Code2 },
]

/**
 * Cada cópia da faixa precisa ser mais larga que a tela, senão sobra buraco
 * antes de o loop reiniciar. Dez tiles dão ~1200px — repetindo o conjunto
 * cobre monitor largo com folga.
 */
const ROW_TOP = [...TILES, ...TILES]
// a fileira de baixo começa deslocada para as duas não andarem espelhadas
const ROTATED = [...TILES.slice(5), ...TILES.slice(0, 5)]
const ROW_BOTTOM = [...ROTATED, ...ROTATED]

function Tile({ tile }: { tile: Tile }) {
  return (
    <div className="group mx-3 flex w-[5.5rem] shrink-0 flex-col items-center gap-3 sm:w-24">
      <span
        className="flex size-16 items-center justify-center rounded-[1.3rem] transition-transform duration-300 ease-out group-hover:-translate-y-1.5 sm:size-[4.5rem]"
        style={{
          // clareia o topo do tile: dá o volume de ícone de app sem precisar de imagem
          background: `linear-gradient(150deg, color-mix(in oklab, ${tile.hex}, white 22%), ${tile.hex})`,
          boxShadow: `0 2px 6px -2px ${tile.hex}59, 0 14px 30px -12px ${tile.hex}A6`,
        }}
      >
        {tile.kind === 'brand' && (
          <svg viewBox="0 0 24 24" className="size-7 fill-white">
            <path d={tile.path} />
          </svg>
        )}
        {tile.kind === 'letters' && (
          <span className="text-lg font-bold tracking-[-0.04em] text-white">{tile.letters}</span>
        )}
        {tile.kind === 'icon' && <tile.icon className="size-7 text-white" strokeWidth={1.8} />}
      </span>

      <span className="whitespace-nowrap text-center text-xs leading-tight text-muted-foreground transition-colors duration-300 group-hover:text-ink">
        {tile.title}
      </span>
    </div>
  )
}

export function Integrations() {
  return (
    <section id="integracoes" className="scroll-mt-20 overflow-hidden border-b border-line">
      <div className="mx-auto max-w-5xl px-5 pb-14 pt-20 text-center md:pb-16 md:pt-28">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-coral" />
            <span className="eyebrow text-ink-2">Integrações</span>
          </span>
          <h2 className="display mx-auto mt-6 max-w-2xl text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">
            Encaixa no que seu time já usa
          </h2>
        </Reveal>
      </div>

      {/* A lista real fica aqui, uma vez só, para leitor de tela. As faixas são
          decorativas: repetem os mesmos itens e seriam lidas várias vezes. */}
      <ul className="sr-only">
        {TILES.map((tile) => (
          <li key={tile.title}>{tile.title}</li>
        ))}
      </ul>

      <Reveal>
        {/* mesma largura do conteúdo da seção: as faixas param onde o texto
            para, e o fade acontece nessa borda */}
        <div aria-hidden="true" className="mx-auto max-w-5xl space-y-8 px-5">
          <Marquee durationSeconds={58}>
            {ROW_TOP.map((tile, index) => (
              <Tile key={`${tile.title}-${index}`} tile={tile} />
            ))}
          </Marquee>
          <Marquee direction="right" durationSeconds={72}>
            {ROW_BOTTOM.map((tile, index) => (
              <Tile key={`${tile.title}-${index}`} tile={tile} />
            ))}
          </Marquee>
        </div>
      </Reveal>

      <div className="mx-auto max-w-5xl px-5 pb-20 pt-14 text-center md:pb-28 md:pt-16">
        <Reveal>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-ink-2">
            Conecte as fontes de lead, o CRM e a agenda em uma tarde. Se a ferramenta não estiver na
            lista, ela provavelmente fala por webhook — e aí também funciona.
          </p>

          <a
            href="#demo"
            className="mt-7 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-coral-deep transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
          >
            Ver a lista completa na demo
            <ArrowRight className="size-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
