import React, { Component } from 'react'
import Title from './Title'
import {FaHotel, FaCalendarCheck, FaBlog, FaSuitcase} from 'react-icons/fa'

export default class Services extends Component {
  state={
      services:[
          {
              icon:<FaHotel/>,
              title:"Hotels",
              info:'Nearest Hotels to the places you want to visit.'
          },
          {
            icon:<FaCalendarCheck/>,
            title:"Events",
            info:'Events to be held nearby.'
        },
        {
            icon:<FaBlog/>,
            title:"Blogging",
            info:'Post Blogs of your visit.'
        },
        {
            icon:<FaSuitcase/>,
            title:"Tour Packages",
            info:'Tour Packages being provided by us'
        }
      ]
  }
    render() {
    return (
      <section className="services">
    <Title title = 'services'></Title>
      <div className="services-center">
          {this.state.services.map((item, index) => {
        return <article key={index} className="service">
            <span >{item.icon}</span>
          <h6>{item.title}</h6>
          <p>{item.info}</p>
        </article>
          })}
      </div>
      </section>
    )
  }
}
