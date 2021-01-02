import React from 'react'
import Place from './Place'
import Loader from 'react-loader-spinner'

export default function PlaceList({ places }) {

  if (places.length === 0) {

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
    <div className="roomslist-center">
      {
        places.map(item => {
          return <Place key={item.id} place={item} />;
        })
      }
    </div>
  </section>

}
