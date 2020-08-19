import React from 'react'
import {Link} from 'react-router-dom'
import defaultImg from '../images/room-1.jpeg'
import PropTypes from "prop-types"

export default function Plan({plan}) {
  const {name, slug, images,} = plan;
    
    return (
    <article className="room">
      <div className="img-container">
          <img src={images[0] || defaultImg } alt="single room"/>
      
      <Link to={`/plans/${slug}`} className="btn-primary room-link">
        Details
      </Link>
      </div>
    <p className="room-info">{name}</p>
    </article>
  );
}

Plan.propTypes = {
  plan:PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string)
    .isRequired,
  })
}
