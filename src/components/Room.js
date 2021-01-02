import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import defaultImg from '../images/room-1.jpeg'
import PropTypes from "prop-types"

const Room = ({ room }) => {
  const { name, slug, images, price } = room;
  const [p, setP] = useState("");

  useEffect(() => {
    const n = price.split("(");
    setP(n[0]);

  }, []);


  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single room" height="200" />
        <div className="price-top">
          <h6>Rs- {p}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${slug}`} className="btn-primary room-link">
          Features
      </Link>
      </div>
      <p className="room-info" height="30">{name}</p>
    </article>
  )
}

export default Room

Room.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string)
      .isRequired,
    price: PropTypes.string.isRequired,
  })
}
