import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import RoomContainer from 
"../components/RoomContainer";

const Rooms = () => {
  return (
    <>
    <Hero hero="roomsHero">
      <Banner title = "Hotels">
      <Link to="/" className="btn-primary">
            return to Home
        </Link>
        </Banner>
    </Hero>
    <RoomContainer />
    </>
  )
}

export default Rooms;