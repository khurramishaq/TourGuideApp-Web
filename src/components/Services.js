import React, { Component } from 'react'
import Title from './Title'
import {FaHotel, FaPlane, FaBlog} from 'react-icons/fa'

export default class Services extends Component {
  state={
      services:[
          {
              icon:<FaHotel/>,
              title:"Hotels",
              info:'Nearest Hotels to the places you want to visit.'
          },
          {
            icon:<FaPlane/>,
            title:"Plan Trip",
            info:'Plan your Trip with us.'
        },
        {
            icon:<FaBlog/>,
            title:"Blogging",
            info:'Post Blogs of your visit.'
        },
        
      ]
  }
    render() {
    return (
      <section className="services" style={{ backgroundColor: '#fff' }}>
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
