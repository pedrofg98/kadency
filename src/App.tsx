import { Nav } from '@/components/site/Nav'
import { Hero } from '@/components/site/Hero'
import { Origins } from '@/components/site/Origins'
import { Flow } from '@/components/site/Flow'
import { Dashboard } from '@/components/site/Dashboard'
import { Features } from '@/components/site/Features'
import { Toolkit } from '@/components/site/Toolkit'
import { Testimonial } from '@/components/site/Testimonial'
import { Integrations } from '@/components/site/Integrations'
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
        <Origins />
        <Flow />
        <Dashboard />
        <Features />
        <Toolkit />
        <Testimonial />
        <Integrations />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
