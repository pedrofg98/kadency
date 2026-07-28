import { Wordmark } from './Wordmark'

const COLUMNS = [
  {
    title: 'Plataforma',
    links: ['Inbox', 'CRM e funil', 'Agentes', 'Agendamentos', 'Automações'],
  },
  { title: 'Empresa', links: ['Sobre', 'Clientes', 'Carreiras', 'Contato'] },
  { title: 'Recursos', links: ['Blog', 'Central de ajuda', 'Documentação da API', 'Status'] },
  { title: 'Legal', links: ['Termos de uso', 'Privacidade', 'LGPD', 'Segurança'] },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink">
      <div className="mx-auto max-w-6xl px-5 pb-12 pt-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Wordmark tone="light" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Plataforma de gerenciamento de leads com agentes de IA que atendem, qualificam,
              atualizam o funil e marcam a reunião.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="eyebrow text-white/40">{column.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="rounded-sm text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* TODO(cliente): CNPJ e endereço reais. */}
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} Kadency. Todos os direitos reservados.
          </p>
          <p className="text-xs text-white/40">CNPJ 00.000.000/0001-00 · Brasil</p>
        </div>
      </div>
    </footer>
  )
}
