import React, { Component } from 'react'
import {PlaceContext} from '../placecontext'
import Loading from "./Loading";
import Place from "./Place";
import Title from "./Title"

export default class FeaturedPlace extends 
Component {
    static contextType = PlaceContext;
  render() {
      let { loading, featuredPlaces : places } = this.placecontext;
      
      places = places.map( place =>{

      return <Place key={place.id} place={place}/>

      })
      
    return (
      <section className = "featured=rooms">
        <Title title = "featured rooms"/>
        <div className="featured-rooms-center">
          {loading ? <Loading/> : places}  
        </div>
      
      </section>
    );
  }
}
