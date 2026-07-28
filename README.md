# Kadency — Landing page

Vite + React + TypeScript + Tailwind v4 + shadcn/ui (base Radix, preset Nova).

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

## Direção visual

**Cores** — coral `#FF5C39` informado pelo cliente, com o restante do ramp vindo do CSS de
[legitimuz.com](https://legitimuz.com) (`main.min.css`, bloco `:root`), a referência de cor
pedida. Definidas em [src/index.css](src/index.css):

| Token | Hex | Uso |
|---|---|---|
| `--ink` | `#1f1f1f` | Texto e seções escuras |
| `--ink-2` | `#4b4b4b` | Texto de apoio |
| `--line` | `#e1e1e1` | Bordas e divisores |
| `--wash` | `#f5f5f5` | Fundo de seção alternada |
| `--coral` | `#ff5c39` | CTA, marcas, cronômetro |
| `--coral-soft` | `#ff8167` | Hover, números em fundo escuro |
| `--coral-tint` | `#ffedea` | Fundo de ícone e badge |
| `--coral-deep` | `#982d13` | Texto coral sobre fundo claro |

Os CTAs usam coral com **tinta escura** (`#1f1f1f`) em vez de texto branco: dá 5,4:1 de
contraste (branco sobre coral dá só 3,0:1, reprovado no WCAG AA) e evita o clichê do
botão laranja com texto branco.

**Tipografia** — Geist Variable em tudo, com **Geist Mono** reservado para dado que corre
ao vivo: cronômetros, horários, contadores. Números de display (a faixa de métricas) usam
Geist Sans, porque em mono a vírgula ocupa um caractere inteiro e `20,2` lê como `20 , 2`.

**Layout** — distribuição inspirada em [kadence.co](https://kadence.co): hero em duas colunas,
faixa de origens, dashboard, blocos de feature alternando lado, cards em fundo escuro,
depoimento, integrações, CTA final e footer de cinco colunas. O bloco do CRM quebra o ritmo
em largura total — o kanban precisa das quatro colunas para ser legível.

## Movimento

Vocabulário de efeitos inspirado em [dojo.com.br](https://www.dojo.com.br), reimplementado
do zero na identidade clara da Kadency (a Dojo é dark; a paleta aqui é a que o cliente
definiu). Keyframes em [src/index.css](src/index.css), lógica em
[src/lib/motion.ts](src/lib/motion.ts) e [motion/](src/components/site/motion/):

| Efeito | Onde | Como |
|---|---|---|
| `<Reveal>` | seções inteiras | IntersectionObserver troca `data-revealed`; a transição mora no CSS. `delay` escalona itens de lista |
| `<Parallax>` | painel do hero, mocks, brilhos | **um único** listener de scroll com `rAF` para todos os alvos |
| `<Marquee>` | origens, integrações | filhos duplicados + `translateX(-50%)`, loop sem emenda; pausa no hover |
| `.aura-spin` | borda do painel do hero | conic-gradient girando `1turn` |
| `<Particles>` | hero | pontinhos coral com posições fixas (não aleatórias) |
| `<ScrollProgress>` | topo | `scaleX` proporcional ao scroll |
| timeline horizontal | [Flow.tsx](src/components/site/Flow.tsx) | preenche num scroll só, **sem prender a tela**: o progresso sai da posição da própria trilha atravessando a viewport (de 92% a 38% da altura) e move o ponto, preenche a linha e acende os nós |
| pilha sticky | [Toolkit.tsx](src/components/site/Toolkit.tsx) | `top` escalonado por índice; sombra para cima faz a pilha ser lida |

Duas armadilhas que já estão resolvidas e vale não reintroduzir:

- **A aura girando precisa ser um quadrado maior que o alvo, dentro de um pai com
  `overflow: hidden`.** Um retângulo girando varre um círculo do tamanho da própria
  diagonal e vaza pelos cantos.
- **Um `::before` com `z-index: -1` não passa por trás do fundo do próprio elemento.**
  Por isso a aura é um irmão posicionado, não um pseudo-elemento.
- **A trilha da timeline vai do centro do primeiro nó ao do último, não de borda
  a borda.** Com 5 colunas iguais isso é de 10% a 90% — usar 0–100% deixa um toco
  de linha sobrando antes do nó 01 e depois do nó 05.
- **A pílula do nav flutua com `translate-y`, nunca com `margin-top`.** O header é
  sticky e a margem do filho colapsa através do wrapper, empurrando o header inteiro
  e derrubando a página em 20px. A altura em fluxo mora no `<header>` (`h-17`, igual
  nos dois estados); a pílula sobra para fora dessa caixa e é isso que a faz parecer
  solta. Ao mexer nisso, meça: `main.getBoundingClientRect().top + scrollY` tem que
  dar o mesmo valor no topo e rolado.
## Elemento parado

[`ResponseRace.tsx`](src/components/site/ResponseRace.tsx) — o painel de cronômetros que
ficava no hero (dois relógios correndo, um travando em `00:20`). Saiu quando o hero virou
centralizado. O arquivo continua aqui e funcionando, sem ser importado por ninguém: dá para
reaproveitar em outra seção ou apagar.

Tudo desliga com `prefers-reduced-motion`: o marquee para (e vira rolável na mão), as
animações somem e o conteúdo aparece no estado final. Sem scroll-jacking em lugar nenhum —
`position: sticky` faz o trabalho pesado e quem rola continua no controle.

## Elemento-assinatura

[`ResponseRace.tsx`](src/components/site/ResponseRace.tsx) — o painel do hero. Um lead chega e
dois relógios começam a correr: o da Kadency trava em `00:20` enquanto os eventos marcam
(Sibele respondeu → lead qualificado → reunião marcada); o outro dispara até `49:12`.
A linha do tempo roda em tempo comprimido e reinicia a cada 19s.

## Pendente de conteúdo real

Buscar por `TODO(cliente)` no código:

- [`Dashboard.tsx`](src/components/site/Dashboard.tsx) — os quatro números e o donut de
  autonomia vêm do workspace de **demo**. Trocar por dado de produção ou média entre clientes.
- [`ResponseRace.tsx`](src/components/site/ResponseRace.tsx) — o `00:20` sai do mesmo lugar.
- [`Testimonial.tsx`](src/components/site/Testimonial.tsx) — depoimento inventado; precisa de
  um real e com autorização de uso.
- [`Integrations.tsx`](src/components/site/Integrations.tsx) — confirmar quais integrações
  já existem de fato.

  Os logos vivem em [`mocks/brands.ts`](src/components/site/mocks/brands.ts): paths da
  **simple-icons** (CC0 1.0, domínio público), inline porque importar o pacote traria
  milhares de ícones não usados. Uso nominativo — indicam com o que a Kadency integra,
  sem sugerir endosso.

  **Pipedrive** e **RD Station** aparecem como monograma: a simple-icons não distribui
  essas marcas (removidas a pedido das próprias empresas). Desenhar de memória daria um
  logo errado, pior que nenhum — para ter a marca de verdade, pegue o SVG oficial no
  material de imprensa delas. **Zapier** foi tirado porque o único arquivo disponível é o
  logotipo escrito, que vira borrão em 28px.
- [`Footer.tsx`](src/components/site/Footer.tsx) — CNPJ e endereço.
- Os CTAs apontam para âncoras (`#demo`, `#agendar`, `#contato`) — falta ligar no formulário
  ou no agendador de verdade.

Os nomes que aparecem nos mocks (Sibele, Camila Duarte, Kaique, Eduardo Ulysséa…) vieram dos
prints da plataforma. Se algum for de pessoa real e não puder aparecer numa página pública,
trocar antes de publicar.
