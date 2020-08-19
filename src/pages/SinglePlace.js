import React, {Component} from 'react'
import Banner from '../components/Banner'
import {Link} from 'react-router-dom'
import {PlaceContext} from "../placecontext"
import StyledHero from '../components/StyledHero'

export default class SinglePlace extends
Component {
  
  constructor(props){

    super(props)
    //console.log(this.props);
  this.state = {
    slug:this.props.match.params.slug,

  };
  
}

static contextType = PlaceContext;
//componentDidMount(){}

  render() {
    const {getPlace} = this.context;
    const place = getPlace(this.state.slug);
    if(!place){
      return (<div className="error">
        <h3>no such result found</h3>
        <Link to="/places" className="btn-praimary">
          Back to Places
        </Link>
      </div>
      );
  }
    const {name,description,
    images} = place
    
    const [mainImg,...defaultImg] = images;
    
    return (
      <>
      <StyledHero img = {mainImg || 
      this.state.defaultBcg}>
        <Banner title = {`${name} place`}>
          <Link to="/places" className = 
          "btn-primary">
            Back to places
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

        
      </>
    );
  }
}