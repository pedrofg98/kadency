import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { ChatMock } from './mocks/ChatMock'
import { KanbanMock } from './mocks/KanbanMock'
import { AgentsMock } from './mocks/AgentsMock'
import { CalendarMock } from './mocks/CalendarMock'
import { Parallax, Reveal } from './motion/Reveal'

type Feature = {
  id: string
  eyebrow: string
  title: string
  body: string
  points: string[]
  link: string
  visual: ReactNode
  /** 'wide' põe o visual em largura total — o funil precisa das 4 colunas. */
  layout?: 'split' | 'wide'
}

const FEATURES: Feature[] = [
  {
    id: 'atendimento',
    eyebrow: 'Inbox',
    title: 'Toda conversa do WhatsApp num lugar só',
    body: 'O agente responde e o time acompanha em tempo real. Quando alguém precisa entrar, assume a conversa no meio dela — com o histórico inteiro na tela.',
    points: [
      'Chats ativos com o agente que está conduzindo cada um',
      'Follow-up automático de quem parou de responder',
      'Handoff para humano sem o lead repetir nada',
    ],
    link: 'Ver o inbox',
    visual: <ChatMock />,
  },
  {
    id: 'funil',
    eyebrow: 'CRM',
    title: 'Leads do WhatsApp organizados pelo agente e pela operação humana',
    body: 'O card entra em Novo, o agente qualifica e move sozinho até Reunião Agendada. Você enxerga temperatura, responsável e há quanto tempo cada lead está parado.',
    points: [
      'Kanban com as etapas que você configura',
      'Temperatura do lead: quente, morno, esfriando',
      'Filtro de quem está esfriando antes de virar prejuízo',
    ],
    link: 'Ver o funil',
    visual: <KanbanMock />,
    layout: 'wide',
  },
  {
    id: 'agentes',
    eyebrow: 'Agentes',
    title: 'Um SDR para cada operação, no seu tom',
    body: 'Comece de um agente pronto ou escreva o roteiro do zero. Cada um com base de conhecimento, perguntas de qualificação e limites próprios — e você liga e desliga quando quiser.',
    points: [
      'Base de conhecimento própria por agente',
      'Aprendizado a partir das conversas que já aconteceram',
      'Ative, pause e teste antes de colocar no ar',
    ],
    link: 'Conhecer os agentes',
    visual: <AgentsMock />,
  },
  {
    id: 'agenda',
    eyebrow: 'Agendamentos',
    title: 'A reunião cai na agenda do closer certo',
    body: 'O agente consulta a disponibilidade real no Google Calendar, oferece só os horários que existem e marca. Sem e-mail de ida e volta, sem choque de agenda.',
    points: [
      'Google Calendar conectado nos dois sentidos',
      'Disponibilidade por closer',
      'Confirmação automática antes da reunião',
    ],
    link: 'Ver os agendamentos',
    visual: <CalendarMock />,
  },
]

export function Features() {
  return (
    <section className="border-b border-line">
      <div className="mx-auto max-w-6xl px-5">
        {FEATURES.map((feature, index) => {
          const wide = feature.layout === 'wide'
          const flipped = !wide && index % 2 === 1
          return (
            <div
              key={feature.id}
              id={feature.id}
              className={`scroll-mt-20 py-16 md:py-24 ${
                wide ? 'grid gap-10' : 'grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16'
              } ${index > 0 ? 'border-t border-line' : ''}`}
            >
              <div className={wide ? 'max-w-2xl' : flipped ? 'lg:order-2' : ''}>
                <Reveal>
                  <p className="eyebrow text-coral-deep">{feature.eyebrow}</p>
                  <h2 className="display mt-4 text-3xl font-semibold text-ink sm:text-4xl">
                    {feature.title}
                  </h2>
                  <p className="mt-5 text-lg leading-relaxed text-ink-2">{feature.body}</p>
                </Reveal>

                <ul className="mt-7 space-y-3">
                  {feature.points.map((point, pointIndex) => (
                    <Reveal as="li" key={point} delay={120 + pointIndex * 80}>
                      <span className="flex gap-3 text-ink-2">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-coral" />
                        <span>{point}</span>
                      </span>
                    </Reveal>
                  ))}
                </ul>

                <Reveal delay={360}>
                  <a
                    href="#demo"
                    className="mt-7 inline-flex items-center gap-2 rounded-sm text-sm font-medium text-coral-deep transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
                  >
                    {feature.link}
                    <ArrowRight className="size-4" />
                  </a>
                </Reveal>
              </div>

              <Reveal delay={140} className={flipped ? 'lg:order-1' : ''}>
                {wide ? feature.visual : <Parallax speed={flipped ? -28 : -44}>{feature.visual}</Parallax>}
              </Reveal>
            </div>
          )
        })}
      </div>
    </section>
  )
}
