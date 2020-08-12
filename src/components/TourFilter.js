import React from 'react'
import {useContext} from 'react'
import {TourContext} from '../tourcontext'
import Title from '../components/Title'

//get all unique values

const getUnique = (items,value) =>{
  return [...new Set(items.map(item => item[value]))]
}
export default function TourFilter({tours}) {

  const tourcontext = useContext(TourContext);

  const {
  tourhandleChange,
  type,
  price,
  persons,
  noofdays,
  day,
  night,
  from,
  to,
  minPrice,
  maxPrice
} = tourcontext;

// get unique types
let types = getUnique(tours,'type');

//add all
  types = ['all',...types];
//map to jsx
types = types.map((item,index) => {
  return <option value={item} key={index}
>{item}</option>
});

// get unique from
let From = getUnique(tours,'from');
//add all
  From = ['all',...from];
//map to jsx
From = From.map((item,index) => {
  return <option value ={item} key={index}>{item}
</option>
});

// // get unique to
let To = getUnique(tours,'to');

// //add all
//   To = ['all',...to];

// //map to jsx
// To = To.map((item,index) => {
//   return <option value ={item} key={index}
// >{item}</option>
// });

//get unique persons
let people = getUnique(tours, 'persons');

people = people.map((item,index)=>{
  return <option key={index} value={item}>{item}</option>
});

//get unique number of days
let days = getUnique(tours, 'noofdays');
days = days.map((item,index)=>{
  return <option key={index} value={item}>{item}</option>
});

  return (
    <section className = "filter-container">
      <Title title = "Filter Tour Packages"></Title> 
      <form className = "filter-form">
       
        {/*select type */}
    <div className="form-group">
      <label htmlFor="type">room type</label>
      <select name = "type" id="type" 
      value = {type} className = "form-control"
      onChange={tourhandleChange}>
       {types}
      </select>
    </div>
        {/*end select type */}

{/*select from */}
    <div className="form-group">
      <label htmlFor="from">From</label>
      <select name = "from" id="from" 
      value = {from} className = "form-control"
      onChange={tourhandleChange}>
       {From}
      </select>
    </div>
        {/*end select from */}

{/*select to */}
    <div className="form-group">
      <label htmlFor="to">From</label>
      <select name = "to" id="to" 
      value = {to} className = "form-control"
      onChange={tourhandleChange}>
       {To}
      </select>
    </div>
        {/*end select to */}

        {/*persons type */}
    <div className="form-group">
      <label htmlFor="persons">No. of persons</label>
      <select name = "persons" id="persons" 
      value = {persons} className = "form-control"
      onChange={tourhandleChange}>
       {people}
      </select>
    </div>
        {/*end persons type */}

	{/*days type */}
    <div className="form-group">
      <label htmlFor="days">No. of days</label>
      <select name = "days" id="days" 
      value = {days} className = "form-control"
      onChange={tourhandleChange}>
       {noofdays}
      </select>
    </div>
        {/*end days type */}

        {/*tour price */}
        <div className="form-group">
      <label htmlFor="price">
        Tour Rate Rs-{price}
      </label>
      <input type= 'range' name= 'price'
      min={minPrice} max= {maxPrice} id="price"
      value={price} onChange={tourhandleChange}
      className = "form-control"></input>
    </div>
        {/*end room price */}

        {/*extra */}
        <div className="form-group">
          <div className="single-extra">
        <input type="checkbox" name="Day"
         id="day" checked={day}
         onChange={tourhandleChange}/>
         <label htmlFor="day">Day</label>
          </div>

          <div className="single-extra">
        <input type="checkbox" name="Night"
         id="night" checked={night}
         onChange={tourhandleChange}/>
         <label htmlFor="driver">Night</label>
          </div>

        </div>
        {/*end of extra */}
        
      </form>
    </section>
  )
}
