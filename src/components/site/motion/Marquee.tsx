import type { ReactNode } from 'react'

/**
 * Faixa que anda sozinha, em loop sem emenda.
 *
 * O truque: os filhos são renderizados duas vezes e a animação desloca
 * exatamente -50%. No fim do ciclo a segunda cópia está onde a primeira
 * começou, então o salto de volta é invisível. A cópia é aria-hidden para
 * o leitor de tela não ler tudo duas vezes.
 */
export function Marquee({
  children,
  direction = 'left',
  durationSeconds = 42,
  className = '',
}: {
  children: ReactNode
  direction?: 'left' | 'right'
  durationSeconds?: number
  className?: string
}) {
  return (
    <div
      className={`marquee-viewport ${className}`}
    >
      <div
        className="marquee"
        data-direction={direction}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
