import { Reveal } from './motion/Reveal'
import funil from '@/assets/crm/funil.webp'
import fechados from '@/assets/crm/fechados.webp'
import empresas from '@/assets/crm/empresas.webp'
import contatos from '@/assets/crm/contatos.webp'
import produtos from '@/assets/crm/produtos.webp'
import campanhas from '@/assets/crm/campanhas.webp'

/**
 * TODO(cliente): as descrições de Produtos e Campanhas foram inferidas — só vi
 * esses dois no menu lateral, sem print da tela. Confirme o que cada um faz.
 *
 * As ilustrações seguem a identidade nova: o anel de quatro arcos do símbolo
 * com o gradiente coral para âmbar, e o ícone do módulo em traço fino no
 * centro. Geradas no Magnific (GPT 2). São abstratas de propósito, não
 * capturas da interface: imagem de UI inventada promete telas que o produto
 * não tem.
 */
const MODULES = [
  {
    image: funil,
    title: 'Funil',
    body: 'Todo lead num quadro só, com etapa, responsável e há quanto tempo está parado. O agente move o card conforme a conversa evolui.',
  },
  {
    image: fechados,
    title: 'Fechados',
    body: 'O histórico de ganhos e perdas, com valor e motivo. É onde aparece o que trava a venda antes do fechamento.',
  },
  {
    image: empresas,
    title: 'Empresas',
    body: 'Cada conta com seus contatos, negociações e histórico reunidos. Quando o mesmo cliente volta, nada recomeça do zero.',
  },
  {
    image: contatos,
    title: 'Contatos',
    body: 'A pessoa por trás do número: origem, conversas anteriores e a empresa a que pertence.',
  },
  {
    image: produtos,
    title: 'Produtos',
    body: 'O catálogo que o agente consulta para responder preço, condição e disponibilidade sem inventar.',
  },
  {
    image: campanhas,
    title: 'Campanhas',
    body: 'Dispare para uma lista segmentada e veja quem respondeu. O agente assume a conversa a partir da primeira resposta.',
  },
]

export function CrmModules() {
  return (
    <section id="crm" className="scroll-mt-20 border-b border-line bg-wash">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-coral" />
            <span className="eyebrow text-ink-2">Dentro do CRM</span>
          </span>
          <h2 className="display mt-6 max-w-2xl text-3xl font-semibold text-ink sm:text-4xl">
            Um CRM que o agente alimenta sozinho
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
            Seis módulos que conversam entre si. Você configura uma vez e o agente mantém tudo em
            dia enquanto o time vende.
          </p>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((module, index) => (
            <Reveal as="li" key={module.title} delay={index * 70}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card transition-shadow duration-300 hover:shadow-[0_1px_2px_rgba(31,31,31,0.04),0_20px_40px_-24px_rgba(31,31,31,0.22)]">
                <div className="p-6 pb-5">
                  <h3 className="text-xl font-semibold text-ink">{module.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{module.body}</p>
                </div>

                {/* A ilustração sangra até as bordas do card: sem moldura e sem
                    fundo próprio, é o arredondado do próprio card que corta o
                    canto. Caixa com borda dentro do card cria a borda reta dura
                    que destoa do resto da página.
                    alt vazio de propósito: a ilustração é decorativa, e o título
                    com a descrição logo acima já dizem o que é. */}
                <div className="mt-auto overflow-hidden">
                  <img
                    src={module.image}
                    alt=""
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
