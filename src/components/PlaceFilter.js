import React from 'react';
import { useContext } from 'react';
import { PlaceContext } from '../placecontext';
import Title from '../components/Title';

//get all unique values

const getUnique = (items, value) => {
  return [...new Set(items.map(item => item[value]))]
}
export default function PlaceFilter({ places }) {

  const placecontext = useContext(PlaceContext);
  const {
    placehandleChange,
    type,
    city,
    area
  } = placecontext;
  // get unique types
  let types = getUnique(places, 'type');

  //add all
  types = ['all', ...types];
  //map to jsx
  types = types.map((item, index) => {
    return <option value={item} key={index}
    >{item}</option>
  });

  //get unique area
  let areas = getUnique(places, 'area');
  //add all areas
  areas = ['all', ...areas];
  //map to jsx
  areas = areas.map((item, index) => {
    return <option value={item} key={index}
    >{item}</option>
  });

  //get unique city
  let citi = getUnique(places, 'city');
  //add all citi
  citi = ['all', ...citi];
  //map to jsx
  citi = citi.map((item, index) => {
    return <option value={item} key={index}
    >{item}</option>
  });


  return (
    <section className="filter-container">
      <Title title="search Places"></Title>
      <form className="filter-form">

        {/*select area */}
        <div className="form-group">
          <label htmlFor="area">select area</label>
          <select name="area" id="area"
            value={area} className="form-control"
            onChange={placehandleChange}
          >
            {areas}
          </select>
        </div>
        {/*end select area */}

        {/* select city */}
        <div className="form-group">
          <label htmlFor="city">select city</label>
          <select name="city" id="city"
            value={city} className="form-control"
            onChange={placehandleChange}
          >
            {citi}
          </select>
        </div>
        {/*end select city */}

        {/*select type */}
        <div className="form-group">
          <label htmlFor="type">Place</label>
          <select name="type" id="type"
            value={type} className="form-control"
            onChange={placehandleChange}
          >
            {types}
          </select>
        </div>
        {/*end select type */}

      </form>
    </section>
  )
}
