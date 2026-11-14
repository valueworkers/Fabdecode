import { pageTitles } from '../data/site.js'
import Hero from '../components/home/Hero.jsx'
import Engines from '../components/home/Engines.jsx'
import Analysis from '../components/home/Analysis.jsx'
import Tna from '../components/home/Tna.jsx'

export default function HomePage() {
  return (
    <>
      <title>{pageTitles.home}</title>
      <Hero />
      <Engines />
      <Analysis />
      <Tna />
    </>
  )
}
