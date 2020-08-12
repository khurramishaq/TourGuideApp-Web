import React from 'react'
import ToursFilter from './TourFilter'
import ToursList from './TourList'
import {withTourConsumer} from '../tourcontext'
import loading from './Loading'

function TourContainer(tourcontext){

  const {Loading, sortedTours, tours} = tourcontext;

  if(Loading){
    return <loading/>
  }
  
      return  (
    <>
      <ToursFilter tours={tours}/>
      <ToursList tours={sortedTours}/> 
    </>

    );
  }

export default withTourConsumer(TourContainer);