import { Reveal } from './motion/Reveal'

/**
 * TODO(cliente): estes três números são afirmações públicas fortes — some 70M
 * em receita e 5 Bi de faturamento de terceiros. Antes de publicar, confirme
 * de onde sai cada um e se as empresas autorizam ser somadas nesse total.
 * A nota de rodapé existe justamente para dizer o método; ajuste-a ao que for
 * verdade na apuração de vocês.
 */
const KPIS = [
  {
    label: 'Receita gerada com agentes',
    value: 'R$ 70M+',
    note: 'Somada nos resultados das operações que rodam com a Kadency',
  },
  {
    label: 'Agentes em operação',
    value: '180',
    note: 'Atendendo, qualificando e agendando todos os dias',
  },
  {
    label: 'Faturamento dos clientes',
    value: 'R$ 5 Bi',
    note: 'Somado entre as empresas que hoje operam com a plataforma',
  },
]

export function Numbers() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <Reveal>
          <h2 className="display mx-auto max-w-2xl text-center text-3xl font-semibold text-ink sm:text-4xl lg:text-5xl">
            A Kadency em números reais
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <dl className="mt-14 grid gap-12 rounded-3xl border border-line bg-[linear-gradient(160deg,var(--wash),var(--card))] px-8 py-12 sm:gap-8 md:grid-cols-3 md:px-10">
            {KPIS.map((kpi, index) => (
              <Reveal key={kpi.label} delay={160 + index * 90}>
                <div className="text-center">
                  <dt className="text-sm text-muted-foreground">{kpi.label}</dt>
                  {/* Geist Sans, não mono: número de display, não dado que corre */}
                  <dd className="display mt-3 text-4xl font-semibold text-ink lg:text-5xl">
                    {kpi.value}
                  </dd>
                  <p className="mx-auto mt-4 max-w-[15rem] text-sm leading-relaxed text-ink-2">
                    {kpi.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={240}>
          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted-foreground">
            Números somados a partir das operações ativas na plataforma. Resultados passados não
            garantem resultados futuros.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
