import { useEffect, useRef, type ReactNode } from 'react'
import { registerReveal, registerParallax } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  /** Atraso em ms — para escalonar itens de uma mesma lista. */
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'li' | 'article'
}

/** Sobe e revela o conteúdo quando ele entra na viewport. */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    return registerReveal(ref.current)
  }, [])

  return (
    <Tag
      ref={ref as never}
      data-reveal
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={className}
    >
      {children}
    </Tag>
  )
}

/**
 * Desloca o elemento contra o scroll.
 * `speed` em px de deslocamento total — negativo sobe, positivo desce.
 */
export function Parallax({
  children,
  speed = -40,
  className = '',
}: {
  children: ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    return registerParallax(ref.current, speed)
  }, [speed])

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  )
}
