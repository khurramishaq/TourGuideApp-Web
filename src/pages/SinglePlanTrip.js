import React, {Component} from 'react'
import defaultBcg from '../images/room-1.jpeg'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {PlanContext} from "../plancontext"
import StyledHero from '../components/StyledHero'

export default class SinglePlan extends
Component {
  
  constructor(props){
    super(props)
    //console.log(this.props);
  this.state = {
    slug:this.props.match.params.slug,
    defaultBcg
  };
  
}

static contextType = PlanContext;
//componentDidMount(){}

  render() {
    const {getPlan} = this.context;
    const plan = getPlan(this.state.slug);
    if(!plan){
      return (<div className="error">
        <h3>no such result found</h3>
        <Link to="/plans" className="btn-praimary">
          Back to Plan
        </Link>
      </div>
      );
  }
    const {name,description,
    extras,images} = plan
    
    const [mainImg,...defaultImg] = images;
    
    return (
      <>
      <StyledHero img = {mainImg || 
      this.state.defaultBcg}>
        <Banner title = {`${name} place`}>
          <Link to="/plans" className = 
          "btn-primary">
            Back to plan a trip
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
              
          </articel>
        </div>
        </section>

        <section className="room-extras">
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