import React from 'react'
import Room from './Room'
import Loader from 'react-loader-spinner'

export default function RoomList({ rooms }) {

  if (rooms.length === 0) {

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#ffff",
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Loader type="ThreeDots" color="#072100" height="100" width="100" />

      </div>
    )
  }

  return <section
    style={{
      backgroundColor: "#ffff",
    }}>
    <div className="roomslist-center bg-light">
      {
        rooms.map(item => {
          return <Room key={item.id} room={item} />;
        })
      }
    </div>
  </section>

}
