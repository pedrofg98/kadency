import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Parallax, Reveal } from './motion/Reveal'
import { Particles } from './motion/Particles'
import { DarkVeil } from './motion/DarkVeil'
import { ProductShot } from './ProductShot'
import dashboard from '@/assets/dashboard.webp'

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Véu animado ao fundo. A máscara radial abre um vazio no miolo, onde
          mora o título — sem ela o shader passa por trás do texto e come o
          contraste. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-70 [mask-image:radial-gradient(ellipse_62%_40%_at_50%_26%,transparent_30%,black_85%)]"
      >
        <DarkVeil
          speed={0.55}
          warpAmount={0.08}
          resolutionScale={0.55}
          tintAmount={1}
          alphaGain={4.5}
          /* sem isto o brilho do CPPN fica no rodapé do hero, atrás do print
             do dashboard — ou seja, invisível */
          flipY={false}
        />
      </div>
      <Particles />

      <div className="mx-auto max-w-6xl px-5 py-20 text-center md:py-32">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-coral" />
            <span className="eyebrow text-ink-2">Gestão de leads com agentes de IA</span>
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display mx-auto mt-8 max-w-4xl text-[2.6rem] font-semibold text-ink sm:text-5xl lg:text-[4.25rem]">
            Seu time entra quando a reunião{' '}
            <span className="relative whitespace-nowrap">
              já está marcada
              <svg
                className="absolute -bottom-2 left-0 w-full text-coral lg:-bottom-4"
                height="14"
                viewBox="0 0 300 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M3 9.5c60-5 118-6 150-5s88 4 147 1"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-ink-2">
            A Kadency responde no WhatsApp em segundos, qualifica, move o lead no funil e agenda com
            o closer. Seu comercial acompanha pelo dashboard e entra na hora que importa.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="cta" asChild>
              <a href="#demo">
                Agendar demo
                <ArrowRight />
              </a>
            </Button>
            <Button size="cta" variant="outline" asChild>
              <a href="#como-funciona">Ver como funciona</a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Demo de 20 minutos. Conectamos no seu WhatsApp e no seu Google Calendar.
          </p>
        </Reveal>

        {/* A captura sobe um pouco mais devagar que o texto: o quadro entra na
            tela enquanto o hero ainda está saindo, e a dobra deixa de ser um
            corte seco. */}
        <Reveal delay={320}>
          <Parallax speed={-28} className="mt-16 md:mt-20">
            <ProductShot
              src={dashboard}
              alt="Dashboard da Kadency com as métricas de atendimento do agente"
              caption="*Dados fictícios."
            />
          </Parallax>
        </Reveal>
      </div>
    </section>
  )
}
