import { Check, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Reveal } from './motion/Reveal'

/**
 * TODO(cliente): a lista de itens vem dos módulos que aparecem nos prints da
 * plataforma. Confirme se algum deles tem limite por plano antes de publicar.
 *
 * Não são três níveis de produto, e sim três formas de pagar o mesmo plano
 * anual. Por isso a lista de itens se repete idêntica nos três cards: é o que
 * o cliente pediu, e o subtítulo avisa que só muda a forma de pagar.
 */

const INCLUSO = [
  'Agentes de SDR no WhatsApp, Instagram e site',
  'Inbox com handoff para humano a qualquer momento',
  'CRM completo: funil, empresas, contatos, produtos e campanhas',
  'Agendamentos integrados ao Google Calendar',
  'Base de conhecimento própria por agente',
  'Aprendizado contínuo a partir das conversas',
  'Automações e follow-up de quem parou de responder',
  'Dashboard de operação e performance comercial',
]

const PLANOS = [
  {
    metodo: 'Pix',
    valor: 'R$ 10.000',
    periodo: '/ano',
    nota: 'Plano anual pago à vista, no melhor preço.',
    destaque: true,
    selo: 'Melhor preço',
  },
  {
    metodo: 'Cartão de crédito',
    valor: 'R$ 1.200',
    periodo: '/mês',
    nota: 'Plano anual no cartão, ao longo de 12 meses.',
    destaque: false,
  },
  {
    metodo: 'Recorrência',
    valor: 'R$ 1.500',
    periodo: '/mês',
    nota: 'Cobrança mensal automática, sem pagamento inicial.',
    destaque: false,
  },
]

export function Pricing() {
  return (
    <section id="planos" className="scroll-mt-20 border-b border-line bg-wash">
      <div className="mx-auto max-w-6xl px-5 py-16 text-center md:py-24">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-coral" />
            <span className="eyebrow text-ink-2">Planos</span>
          </span>
          <h2 className="display mx-auto mt-6 max-w-2xl text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">
            Um plano só, anual, com tudo incluso
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-ink-2">
            A plataforma é a mesma nos três. O que muda é só a forma de pagar.
          </p>
        </Reveal>

        <ul className="mt-14 grid items-start gap-5 lg:grid-cols-3">
          {PLANOS.map((plano, index) => (
            <Reveal as="li" key={plano.metodo} delay={index * 90}>
              <article
                className={`flex h-full flex-col rounded-2xl p-7 text-left sm:p-8 ${
                  plano.destaque
                    ? 'border-2 border-coral bg-card shadow-[0_2px_6px_-2px_rgba(255,92,57,0.25),0_24px_48px_-20px_rgba(255,92,57,0.35)]'
                    : 'border border-line bg-card'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-base font-semibold text-ink">{plano.metodo}</p>
                  {plano.selo && (
                    <span className="rounded-full bg-coral px-2.5 py-1 text-[0.7rem] font-semibold text-white">
                      {plano.selo}
                    </span>
                  )}
                </div>

                <p className="display mt-5 text-4xl font-semibold text-ink">
                  {plano.valor}
                  <span className="ml-1.5 text-base font-medium text-muted-foreground">
                    {plano.periodo}
                  </span>
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plano.nota}</p>

                <Button
                  className="mt-7 w-full rounded-full"
                  size="lg"
                  variant={plano.destaque ? 'default' : 'outline'}
                  asChild
                >
                  <a href="#demo">
                    Começar agora
                    <ArrowRight className="size-4" />
                  </a>
                </Button>

                <p className="eyebrow mt-8 text-muted-foreground">O que está incluso</p>
                <ul className="mt-4 space-y-2.5">
                  {INCLUSO.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-coral-tint">
                        <Check className="size-2.5 text-coral-deep" strokeWidth={3.5} />
                      </span>
                      <span className="text-sm leading-relaxed text-ink-2">{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mx-auto mt-10 max-w-xl text-xs leading-relaxed text-muted-foreground">
            O plano é sempre anual. No Pix o pagamento é à vista; no cartão e na recorrência, mensal.
            A implantação e a configuração do primeiro agente estão inclusas nas três formas.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
