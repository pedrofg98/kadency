import { Reveal } from './motion/Reveal'

// TODO(cliente): substituir por um depoimento real, com autorização de uso.
export function Testimonial() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="display text-2xl font-medium text-ink sm:text-3xl">
              “A gente investia pesado em anúncio e perdia lead porque ninguém respondia à noite.
              Hoje o agente atende na hora e meu time só entra quando a reunião já está marcada.”
            </blockquote>
            <figcaption className="mt-8 text-sm text-muted-foreground">
              <span className="font-medium text-ink">Rodrigo Menezes</span> · Diretor comercial,
              Vetor Imóveis
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
