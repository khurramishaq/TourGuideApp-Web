import React from 'react'
import HotelFilter from '../components/hotels/HotelFilter'
import RoomsFilter from './RoomFilter'
import RoomsList from './RoomList'
import {withRoomConsumer} from '../context'
import Loading from './Loading'


export default function RoomContainer() {
  return (
    <div>
      <HotelFilter />
    </div>
  )
}


// function RoomContainer(props){
//  console.log("roomContainer",props)
 
//   const {loading, sortedRooms, rooms} = props.context;
//   if(loading){
//     return <Loading/>;
//   }
  
//       return  (
//       <>

//       <RoomsFilter rooms={rooms}/>
//       <RoomsList rooms={sortedRooms}/> 
//     </> 
//     );
//   }

// export default withRoomConsumer(RoomContainer)

/*
import React from 'react'
import RoomsFilter from './RoomFilter'
import RoomsList from './RoomList'
import {RoomConsumer} from '../context'
import Loading from './Loading'

export default function RoomContainer() {
  return (
    <RoomConsumer>
      {
(value ) => {
  const {loading, sortedRooms, rooms} = value

  if(loading){
  return <Loading />;
}

    return  (
    <div>
    Hello from rooms Container
    <RoomsFilter rooms = {rooms}/>
    <RoomsList rooms = {sortedRooms}/> 
  </div>
    );
}
      }
    </RoomConsumer>
    
    
  );
}
*/