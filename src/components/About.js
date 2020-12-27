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
        info1: 'Phone: +(92) 318 7504 355'
      },
      {

        title: "Links",
        info: 'Go to the links',
        icon1: <i class="fa fa-mobile"></i>,

        icon2: <i class="fa fa-facebook"></i>,

        icon3: <i class="fa fa-youtube"></i>,
        icon4: <i class="fa fa-pinterest"></i>
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
                      <div className="footer-icons">
                      <span style={{ fontSize: 20 }}>{item.icon1}</span>
                      <span style={{ marginLeft: 10, fontSize: 20 }}>{item.icon2}</span>
                      <span style={{ marginLeft: 10, fontSize: 20 }}>{item.icon3}</span>
                      <span style={{ marginLeft: 10, fontSize: 20 }}>{item.icon4}</span>
                      </div>
                    </article>
            }
          )
          }
        </div>
      </section>
    )
  }
}
