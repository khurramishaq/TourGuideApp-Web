import React from 'react'
import PlacesFilter from '../components/places/PlaceFilter'
import PlacesList from './PlaceList'
import {withPlaceConsumer} from '../placecontext'
import loading from './Loading'

function PlaceContainer() {
  return(
    <>
      <PlacesFilter />
    </>
  )
}

export default PlaceContainer;
// function PlaceContainer({placecontext}){
 
//   const {Loading, sortedPlaces, places} = placecontext;
  
//   if(Loading){
//     return <loading/>;
//   }
  
//       return  (
//       <>

//       <PlacesFilter places={places}/>
//       <PlacesList places={sortedPlaces}/> 
//     </> 
//     );
//   }

// export default withPlaceConsumer(PlaceContainer);

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