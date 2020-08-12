import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
// import PlanContainer from '../components/PlanContainer';
import PlanContainer from '../components/plan/Plan'
const PlanTrip = () => {
  return (
    <>
    <Hero hero="roomsHero">
      <Banner title = "Plan Your Trip">
      <Link to="/" className="btn-primary">
            return to Home
        </Link>
        </Banner>
    </Hero>
    <PlanContainer/>
    </>
  )
}

export default PlanTrip;
