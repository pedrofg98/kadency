import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Wordmark } from './Wordmark'

const LINKS = [
  { href: '#como-funciona', label: 'Como funciona' },
  { href: '#atendimento', label: 'Atendimento' },
  { href: '#crm', label: 'CRM' },
  { href: '#agentes', label: 'Agentes' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#planos', label: 'Planos' },
]

/**
 * No topo é uma barra comum, alinhada ao container da página. Ao rolar, encolhe
 * numa pílula flutuante e volta ao normal quando a página retorna ao topo.
 *
 * A altura em fluxo mora no próprio <header> (h-17, fixa nos dois estados) —
 * ele é sticky e ocupa espaço, então altura variável empurraria o conteúdo de
 * baixo a cada troca. A pílula sobra alguns pixels para fora dessa caixa de
 * propósito: é o que a faz parecer solta, e ela flutua sobre conteúdo que já
 * estava passando por baixo mesmo.
 */
export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // histerese: entra em modo pílula a 80px e só volta abaixo de 24px, para
    // não piscar entre os dois estados com o dedo parado na fronteira
    const onScroll = () => {
      const y = window.scrollY
      setScrolled((was) => (was ? y > 24 : y > 80))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // o menu aberto no mobile não pode ficar preso a uma pílula estreita
  useEffect(() => {
    if (open) setOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrolled])

  return (
    <header className="sticky top-0 z-50 h-17">
      <div className="px-4 sm:px-5">
        <div
          className={cn(
            'mx-auto flex items-center justify-between gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
            scrolled
              // o deslocamento é translate, não margin: margin-top aqui colapsa
              // através do wrapper e empurra o próprio header, jogando todo o
              // conteúdo da página para baixo
              ? 'h-14 max-w-4xl translate-y-5 rounded-full border border-line bg-background/75 px-3 pl-6 shadow-[0_1px_1px_rgba(31,31,31,0.04),0_8px_16px_-8px_rgba(31,31,31,0.12),0_24px_48px_-16px_rgba(31,31,31,0.22)] backdrop-blur-xl'
              : 'h-17 max-w-6xl translate-y-0 rounded-none border border-transparent bg-transparent px-0',
          )}
        >
          <a
            href="#"
            className="shrink-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
          >
            <Wordmark />
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-sm text-sm text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <a href="#login">Entrar</a>
            </Button>
            <Button size="sm" className="rounded-full" asChild>
              <a href="#demo">Agendar demo</a>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="rounded-full p-2 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <div className="mx-auto mt-7 max-w-4xl rounded-2xl border border-line bg-background/95 p-4 shadow-[0_16px_40px_-16px_rgba(31,31,31,0.25)] backdrop-blur-xl lg:hidden">
            <nav className="flex flex-col gap-1">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-ink-2 hover:bg-wash hover:text-ink"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-3 flex flex-col gap-2">
              <Button variant="outline" className="rounded-full" asChild>
                <a href="#login">Entrar</a>
              </Button>
              <Button className="rounded-full" asChild>
                <a href="#demo">Agendar demo</a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
