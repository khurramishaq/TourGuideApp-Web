import React from 'react'
import TourPackage from './TourPackage'

export default function TourList({ tours }) {

  if(tours.length === 0) {

    return (
      <div className="empty-search">
        <h3>Unfortunately no tours matched your
        search parameters
        </h3>
      </div>
    )
  }

  return <section className="roomlist">
    <div className="roomslist-center">
      {
        tours.map(item => {
          return <TourPackage key={item.id} TourPackage={item} />;
        })
      }
    </div>
  </section>

}
