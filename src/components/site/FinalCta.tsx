import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Parallax, Reveal } from './motion/Reveal'

export function FinalCta() {
  return (
    <section id="demo" className="relative scroll-mt-20 overflow-hidden bg-ink">
      {/* luz acumulada na base da seção, não no meio dela */}
      <Parallax speed={70} className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 size-[46rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,92,57,0.22)_0%,transparent_60%)]" />
      </Parallax>

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow text-coral-soft">Comece esta semana</p>
            <h2 className="display mt-5 text-4xl font-semibold text-white sm:text-5xl">
              Enquanto você lê isso, um lead seu está esperando
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">
              Em 20 minutos a gente monta o primeiro agente com o seu roteiro, conecta no seu
              WhatsApp e na sua agenda. Você vê o tempo de resposta cair no mesmo dia.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="cta" asChild>
                <a href="#agendar">
                  Agendar demo
                  <ArrowRight />
                </a>
              </Button>
              <Button
                size="cta"
                variant="outline"
                className="border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white"
                asChild
              >
                <a href="#contato">Falar com vendas</a>
              </Button>
            </div>

            <p className="mt-6 text-sm text-white/50">
              Sem cartão de crédito. Sem trocar seu CRM de lugar.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
