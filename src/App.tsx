import { About } from './components/sections/About'
import { Contacts } from './components/sections/Contacts'
import { Hero } from './components/sections/Hero'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Footer } from './components/layout/Footer'
import { Header } from './components/layout/Header'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержанию
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}
