export function Wordmark({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span
      className={`flex items-center gap-2.5 text-[1.05rem] font-bold tracking-[-0.035em] ${
        tone === 'light' ? 'text-white' : 'text-ink'
      }`}
    >
      {/* Três barras decrescentes com a ponta cortada em diagonal — o mark da
          marca. Formas sólidas, sem contorno: em tamanho de menu, traço fino
          sumiria. */}
      <svg viewBox="0 0 34 22" className="h-[1.15rem] w-[1.8rem] shrink-0" aria-hidden="true">
        <g fill="var(--coral)">
          <path d="M1 2h32l-6 4.6H1z" />
          <path d="M1 8.7h26.5l-6 4.6H1z" />
          <path d="M1 15.4h21l-6 4.6H1z" />
        </g>
      </svg>
      Kadency
    </span>
  )
}
