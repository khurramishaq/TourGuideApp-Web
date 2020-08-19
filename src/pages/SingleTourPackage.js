import React, {Component} from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {TourContext} from "../tourcontext"
import StyledHero from '../components/StyledHero'

export default class SingleTourPackage extends 
Component {
  
  constructor(props){
    super(props)
    //console.log(this.props);
  this.state = {
    slug:this.props.match.params.slug,
    defaultBcg
  };
  
}

static contextType = TourContext;
//componentDidMount(){}

  render() {
    const {getTour} = this.tourcontext;
    const tourpackage = getTour(this.state.slug);
    if(!tourpackage){
      return (<div className="error">
        <h3>no such result found</h3>
        <Link to="/tours" className="btn-praimary">
          Back to Tours
        </Link>
      </div>
      );
  }
    const {name,description,stay,persons,price,
    extras,days,day,images,night} = tourpackage;
    
    const [mainImg,...defaultImg] = images;
    
    return (
      <>
      <StyledHero img = {mainImg || 
      this.state.defaultBcg}>
        <Banner title = {`${name} Tour`}>
          <Link to="/tours" className = 
          "btn-primary">
            Back to Tours
          </Link>
        </Banner>
      </StyledHero>

      <section className = "single-tour">
        <div className = "single-tour-images">
        {defaultImg.map((item, index)=> {
          return <img key={index} src={item} 
          alt={name}/>;
        })}
        </div>

        <div className="single-tour-info">
          <article className="desc">
            <h3>Details</h3>
      <p>{description}</p>
          </article>
          <articel className="info">
            <h3>Info</h3>
      <h6>price: Rs-{price}</h6>
      <h6>total persons : {persons}</h6>
      <h6>No. of dyas : {
        days > 1 ? `${days} days` :
        `${days} days`}
        </h6>
      <h6>{stay? "stay allowed" : "no stay"
      }</h6>
      <h6>{day & night && "Day and Night trip"
      }</h6>
          </articel>
        </div>
        </section>

        <section className="tour-extras">
          <h6>Extras</h6>
          <ul className="extras">
            {extras.map((item,index) =>{
              return <li key={index}>-{item}</li>
            })}
          </ul>
        </section>
      </>
    );
  }
}
