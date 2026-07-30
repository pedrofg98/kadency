/**
 * Moldura da captura de produto no hero.
 *
 * A borda "de startup" é composta, não um `border` só: um anel externo grosso
 * e translúcido (a tinta da marca a 6%), um fio de 1px por dentro para definir
 * a quina, e uma sombra longa que descola o quadro da página. O anel translúcido
 * é o que faz a moldura parecer vidro em vez de contorno desenhado — por isso
 * usa a cor do texto com alfa, e não um cinza opaco.
 */
export function ProductShot({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  /** Nota de rodapé da imagem — ex.: avisar que os dados são de exemplo. */
  caption?: string
}) {
  return (
    <figure>
      <div className="rounded-[1.4rem] border-4 border-ink/[0.06] bg-ink/[0.02] p-1 shadow-[0_2px_4px_-2px_rgba(31,31,31,0.06),0_24px_48px_-16px_rgba(31,31,31,0.18),0_48px_96px_-32px_rgba(31,31,31,0.22)] backdrop-blur-sm">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full rounded-[1rem] border border-line"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
