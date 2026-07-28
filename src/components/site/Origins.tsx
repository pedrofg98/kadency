import { Reveal } from './motion/Reveal'
import { Marquee } from './motion/Marquee'

const ORIGINS = [
  'WhatsApp',
  'Instagram Direct',
  'Meta Ads',
  'Google Ads',
  'Formulário do site',
  'Indicação',
  'Landing page',
  'Campanha de e-mail',
]

export function Origins() {
  return (
    <section className="border-b border-line py-12">
      <Reveal>
        <p className="eyebrow mb-7 text-center text-muted-foreground">
          De onde o lead vier, quem atende primeiro é o agente
        </p>
      </Reveal>

      <Marquee durationSeconds={38}>
        {ORIGINS.map((origin) => (
          <span
            key={origin}
            className="flex shrink-0 items-center gap-8 whitespace-nowrap px-8 text-xl font-medium tracking-[-0.02em] text-ink/30"
          >
            {origin}
            <span className="size-1.5 rounded-full bg-coral/40" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
