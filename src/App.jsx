import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import MarqueeSection from './components/MarqueeSection'
import Projects from './components/Projects'
import ViewToggle from './components/ViewToggle'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Preloader from './components/Preloader'

function App() {
  const [view, setView] = useState('stack');

  return (
    <main>
      <Preloader />
      <div className="grain-overlay"></div>
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <MarqueeSection />
      <ViewToggle currentView={view} onViewChange={setView} />
      <Projects view={view} />
      <Footer />
    </main>
  )
}

export default App
