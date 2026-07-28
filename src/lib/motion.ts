/**
 * Infraestrutura de scroll da página.
 *
 * Duas mecânicas, um único listener de scroll compartilhado por todos os
 * elementos com parallax — cada componente registrando o próprio listener seria
 * o caminho mais curto para travar a rolagem.
 *
 * Tudo desliga com prefers-reduced-motion: o conteúdo aparece no estado final.
 */

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ---------- parallax ---------- */

type ParallaxTarget = { el: HTMLElement; speed: number }

const targets = new Set<ParallaxTarget>()
let ticking = false
let listening = false

function apply() {
  ticking = false
  const viewportHeight = window.innerHeight

  for (const target of targets) {
    const rect = target.el.getBoundingClientRect()
    // -1 quando o elemento está logo abaixo da dobra, +1 quando já saiu por cima
    const progress = (viewportHeight / 2 - (rect.top + rect.height / 2)) / viewportHeight
    target.el.style.transform = `translate3d(0, ${(progress * target.speed).toFixed(2)}px, 0)`
  }
}

function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(apply)
}

export function registerParallax(el: HTMLElement, speed: number) {
  if (prefersReducedMotion()) return () => {}

  const target: ParallaxTarget = { el, speed }
  targets.add(target)

  if (!listening) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    listening = true
  }
  onScroll()

  return () => {
    targets.delete(target)
    el.style.transform = ''
    if (targets.size === 0 && listening) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      listening = false
    }
  }
}

/* ---------- reveal ---------- */

let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-revealed', 'true')
        observer?.unobserve(entry.target)
      }
    },
    // dispara um pouco antes de entrar de fato, para o movimento terminar
    // enquanto a seção ainda sobe
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  )
  return observer
}

export function registerReveal(el: HTMLElement) {
  if (prefersReducedMotion()) {
    el.setAttribute('data-revealed', 'true')
    return () => {}
  }

  const io = getObserver()
  io.observe(el)
  return () => io.unobserve(el)
}
