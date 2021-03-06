import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import Services from '../components/Services'
import Featured from '../components/Featured'
import About from '../components/About'

export default function Home() {  
  return (
    <>
    <Hero hero = "homehero">
      <Banner title = "Plan Your Trip with Us" subtitle = "Beautiful Places">
        <Link to="/rooms" className="btn-primary" style={{ color: '#fff' }}>
            Hotels
        </Link>
      </Banner>
    </Hero>
    <Services />
    <About/>
    </>
  )
}
