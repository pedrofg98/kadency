import { Nav } from '@/components/site/Nav'
import { Hero } from '@/components/site/Hero'
import { Flow } from '@/components/site/Flow'
import { Dashboard } from '@/components/site/Dashboard'
import { Features } from '@/components/site/Features'
import { CrmModules } from '@/components/site/CrmModules'
import { Toolkit } from '@/components/site/Toolkit'
import { Numbers } from '@/components/site/Numbers'
import { Testimonial } from '@/components/site/Testimonial'
import { FinalCta } from '@/components/site/FinalCta'
import { Footer } from '@/components/site/Footer'
import { ScrollProgress } from '@/components/site/motion/ScrollProgress'

function App() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Pular para o conteúdo
      </a>
      <ScrollProgress />
      <Nav />
      <main id="conteudo">
        <Hero />
        <Flow />
        <Dashboard />
        {/* a seção do CRM entra entre Atendimento e Agentes, no lugar que era
            do bloco do funil */}
        <Features only={['atendimento']} />
        <CrmModules />
        <Features only={['agentes', 'agenda']} />
        <Toolkit />
        <Numbers />
        <Testimonial />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
