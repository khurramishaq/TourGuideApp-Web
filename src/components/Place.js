import React from 'react'
import { Link } from 'react-router-dom'
import defaultImg from '../images/room-1.jpeg'
import PropTypes from "prop-types"

export default function Place({ place }) {
  const { name, slug, images, } = place;

  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single room" height="200" />

        <Link to={`/places/${slug}`} className="btn-primary room-link">
          Details
      </Link>
      </div>
        <p className="room-info">{name}</p>
    </article>
  );
}

Place.propTypes = {
  place: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string)
      .isRequired,
  })
}
