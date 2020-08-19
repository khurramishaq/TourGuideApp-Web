import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import TourContainer from '../components/TourContainer'

const Tours = () => {
  return (
    <>
    <Hero hero="toursHero">
      <Banner title = "Tour Packages">
      <Link to="/" className="btn-primary">
            return to Home
        </Link>
        </Banner>
    </Hero>
    <TourContainer />
    </>
  )
}

export default Tours;