import React from 'react'
import {Link} from 'react-router-dom'
import defaultImg from '../images/room-1.jpeg'
import PropTypes from "prop-types"

export default function TourPackage({tourpackage}) {
  const {name, slug, images, price} = tourpackage;
    
    return (
    <article className="tourpackage">
      <div className="img-container">
          <img src={images[0] || defaultImg } alt="single package"/>
      <div className="price-top">
    <h6>Rs-{price}</h6>
      <p>per person</p>
      </div>
      <Link to={`/tours/${slug}`} className="btn-primary tour-link">
        Details
      </Link>
      </div>
    <p className="tour-info">{name}</p>
    </article>
  )
}

TourPackage.propTypes = {
  tourpackage:PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string)
    .isRequired,
    price: PropTypes.number.isRequired,
  })
}
