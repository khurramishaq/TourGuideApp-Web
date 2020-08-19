import React, { Component } from 'react'
import Title from './Title'
import { FaHotel, FaCalendarCheck, FaPlay, FaAppStore, FaMobile, FaFacebook, FaYoutube, FaPinterest } from 'react-icons/fa'
import logo from '../images/logo3.png'
import { Link } from 'react-router-dom'

export default class About extends Component {
  state = {
    abouts: [
      {
        icon: <Link to="/" className="nav-logo">
          <img src={logo} alt="Tour" ></img>
        </Link>,
      },
      {

        title: "About",
        info: 'Plan your trip with us and get to the nearest Hotels and Places.'
      },
      {

        title: "Contact",
        info: 'Email: plantou04@gmail.com',
        info1: 'Phone:+92-318-7504355'
      },
      {

        title: "Links",
        info: 'Go to the links',
        icon1: <FaMobile />,

        icon2: <FaFacebook />,

        icon3: <FaYoutube />,
        icon4: <FaPinterest />
      },
    ]
  }

  render() {
    return (
      <section className="abouts">
        <div className="abouts-center">
          {this.state.abouts.map(
            (item, index) => {
              return <article key={index} className="about">
                <span>{item.icon}</span>
                <h3>{item.title}</h3>

                <p>{item.info}</p>
                <p>{item.info1}</p>
                <span >{item.icon1}</span>
                <span >{item.icon2}</span>
                <span >{item.icon3}</span>
                <span >{item.icon4}</span>

              </article>
            }
          )
          }
        </div>
      </section>
    )
  }
}
