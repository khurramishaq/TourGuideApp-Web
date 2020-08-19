import React, {Component} from 'react'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {RoomContext} from "../context"
import StyledHero from '../components/StyledHero'

export default class SingleRoom extends 
Component {
  
  constructor(props){
    super(props)
    //console.log(this.props);
  this.state = {
    slug:this.props.match.params.slug,
  };
  
}

static contextType = RoomContext;
//componentDidMount(){}

  render() {
    console.log(this.state.slug)
    const {getRoom} = this.context;
    const room = getRoom(this.state.slug);
    if(!room){
      return (<div className="error">
        <h3>no such result found</h3>
        <Link to="/rooms" className="btn-praimary">
          Back to rooms
        </Link>
      </div>
      );
  }
    const {name,description,capacity,size,price,
    breakfast,pets,images} = room
    
    const [mainImg,...defaultImg] = images;
    
    return (
      <>
      <StyledHero img = {mainImg || 
      this.state.defaultBcg}>
        <Banner title = {`${name} room`}>
          <Link to="/rooms" className = 
          "btn-primary">
            Back to rooms
          </Link>
        </Banner>
      </StyledHero>

      <section className = "single-room">
        <div className = "single-room-images">
        {defaultImg.map((item, index)=> {
          return <img key={index} src={item} 
          alt={name}/>;
        })}
        </div>

        <div className="single-room-info">
          <article className="desc">
            <h3>Details</h3>
      <p>{description}</p>
          </article>
          <articel className="info">
            <h3>Info</h3>
      <h6>price: Rs-{price}</h6>
      <h6>size : {size}(SqFt)</h6>
      <h6>Max capacity : {
        capacity > 1 ? `${capacity} people` :
        `${capacity} person`}
        </h6>
      <h6>{pets? "pets allowed" : "no pets allowed"
      }</h6>
      <h6>{breakfast && "free breakfast included"
      }</h6>
          </articel>
        </div>
        </section>

      </>
    );
  }
}
