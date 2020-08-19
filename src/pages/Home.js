import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import Services from '../components/Services'
<<<<<<< HEAD
import About from '../components/About'
=======
import Featured from '../components/Featured'
>>>>>>> parent of 154c679... Home Page updated

export default function Home() {  
  return (
    <>
    <Hero >
      <Banner title = "Plan Your Trip with Us" subtitle = "Beautiful Places">
        <Link to="/rooms" className="btn-primary">
            Hotels
        </Link>
      </Banner>
    </Hero>
    <Services />
    <Featured/>
    </>
  )
}
