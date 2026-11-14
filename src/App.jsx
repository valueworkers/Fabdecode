import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import useHashRoute from './hooks/useHashRoute.js'
import Nav from './components/layout/Nav.jsx'
import Footer from './components/layout/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import ExchangePage from './pages/ExchangePage.jsx'
import PlansPage from './pages/PlansPage.jsx'
import MillsPage from './pages/MillsPage.jsx'
import RequestPage from './pages/RequestPage.jsx'

const pages = {
  home: HomePage,
  exchange: ExchangePage,
  plans: PlansPage,
  mills: MillsPage,
  request: RequestPage,
}

export default function App() {
  const route = useHashRoute()
  const Page = pages[route]

  return (
    <MotionConfig reducedMotion="user">
      <Nav route={route} />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <motion.main
          key={route}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Page />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  )
}
