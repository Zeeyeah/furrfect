import { useRef, useEffect } from 'react'
import './App.css'
import './styles/locomotive.css'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import Discover from './components/Discover'
import LocomotiveScroll from "locomotive-scroll";
import Footer from './components/Footer'

function App() {
  const scrollRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
     new LocomotiveScroll({})
  }, []);

     return (
        <div id="scroll-container" data-scroll-container ref={scrollRef}>
          <Header />
          <HeroSection />
          <Discover />
          <Footer />
        </div>
  )

}

export default App
