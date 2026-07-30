import { ArrowUp } from 'lucide-react'
import { Wordmark } from './Wordmark'

/** O lucide v1 removeu os ícones de marca, então o glifo vai desenhado. */
function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

/**
 * TODO(cliente): e-mail, perfil do Instagram, cidade e CNPJ precisam dos dados
 * reais. Contato inventado é pior que contato ausente: o visitante escreve para
 * um endereço que não existe e conclui que ninguém atende.
 */

// Só as âncoras que existem de fato na página, na ordem em que aparecem.
const NAVEGACAO = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#atendimento', label: 'Atendimento' },
  { href: '#crm', label: 'CRM' },
  { href: '#agentes', label: 'Agentes' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#planos', label: 'Planos' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink">
      {/* Lettering vazada ao fundo: contorno em vez de preenchimento, cortada
          pela base do rodapé. `text-transparent` com text-stroke, e não uma cor
          escura, para o traço acompanhar qualquer ajuste de fundo. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.26em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[17vw] font-bold uppercase leading-none tracking-[-0.045em] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.09)]"
      >
        Kadency
      </span>

      <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Wordmark tone="light" />
            <p className="mt-5 max-w-xs leading-relaxed text-white/55">
              Gestão de leads com agentes de IA que atendem, qualificam e marcam a reunião.
            </p>

            {/* TODO(cliente): trocar pelo perfil real e reativar o link. Ficou
                sem href de propósito: âncora morta leva o visitante a clicar e
                não acontecer nada, e um endereço chutado pode apontar para o
                Instagram de outra pessoa. */}
            <span
              aria-hidden="true"
              className="mt-7 inline-flex size-10 items-center justify-center rounded-full border border-white/15 text-white/35"
            >
              <InstagramGlyph />
            </span>
          </div>

          <div>
            <h2 className="eyebrow text-white/40">Navegação</h2>
            <ul className="mt-5 space-y-3">
              {NAVEGACAO.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="rounded-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-white/40">Contato</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href="mailto:contato@kadency.com.br"
                  className="rounded-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
                >
                  contato@kadency.com.br
                </a>
              </li>
              <li className="text-white/55">São Paulo, Brasil</li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Kadency. Todos os direitos reservados.
          </p>

          <a
            href="#"
            className="inline-flex items-center gap-2.5 self-start rounded-full border border-white/15 px-4 py-2.5 transition-colors hover:border-white/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral sm:self-auto"
          >
            <ArrowUp className="size-3.5 text-white/60" />
            <span className="eyebrow text-white/70">Voltar ao topo</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
