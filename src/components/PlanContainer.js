import React from 'react'
import PlanFilter from './PlanFilter'
import PlanList from './PlanList'
import {withPlanConsumer} from '../plancontext'
import loading from './Loading'

function PlanContainer({plancontext}){
 
  const {Loading, sortedPlans, plans} = plancontext;
  
  if(Loading){
    return <loading/>;
  }

      return  (
      <>

      <PlanFilter plans={plans}/>
      <PlanList plans={sortedPlans}/> 
    </> 
    );
  }

export default withPlanConsumer(PlanContainer);

/*
import React from 'react'
import PlacesFilter from './PlaceFilter'
import PlacesList from './PlaceList'
import {PlaceConsumer} from '../placecontext'
import Loading from './Loading'

export default function PlacaeContainer() {
  return (
    <PlaceConsumer>
      {
(value ) => {
  const {loading, sortedPlaces, places} = value

  if(loading){
  return <Loading />;
}

    return  (
    <div>
    Hello from places Container
    <PlacesFilter places = {places}/>
    <PlacesList places = {sortedPlaces}/> 
  </div>
    );
}
      }
    </PlaceConsumer>
    
    
  );
}
*/