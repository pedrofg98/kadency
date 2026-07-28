export function Wordmark({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <span
      className={`flex items-center gap-2 text-[1.05rem] font-bold tracking-[-0.035em] ${
        tone === 'light' ? 'text-white' : 'text-ink'
      }`}
    >
      {/* Chevron duplo com a linha de entrada — o mesmo mark do produto */}
      <svg viewBox="0 0 30 24" className="h-5 w-6 shrink-0" aria-hidden="true">
        <path
          d="M2 12h6M9 5l7 7-7 7M18 5l7 7-7 7"
          stroke="var(--coral)"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      Kadency
    </span>
  )
}
