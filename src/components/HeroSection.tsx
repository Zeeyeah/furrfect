import React, {useLayoutEffect } from 'react'
import '../styles/hero-section.css'
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';



const HeroSection: React.FC = () => {
  
  useLayoutEffect(() => {
    
    gsap.registerPlugin(ScrollTrigger)
    
    // GSAP Timeline instance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: "top 100px",
        end: "+=600px",
      }
    });

    const $herosection = document.querySelector(".hero-section");

    // Define GSAP animations
    tl.from($herosection, { filter: "blur(0px)", scale: 1, ease: "linear"})
    tl.to($herosection, {filter: "blur(30px)", scale: 0.9, ease: "linear" });


  }, []); 

  return (
    <div data-scroll-section data-scroll data-scroll-speed="-0.5" className="hero-section">
      <div  className="hero-section-text">
        <h1>Your place to find the <b>furrfect</b> companion.</h1>
        <p >
          Welcome to Purrfect Companion! Browse and adopt your ideal virtual cat from a variety of adorable breeds. With just a click, start building your collection of furry friends and learn fun facts along the way. Every home deserves a purrfect companion!
        </p>
      </div>
      <div className="hero-image">
            <img src="/hero-image.png" alt="" />
      </div>
    </div>
  )
}

export default HeroSection