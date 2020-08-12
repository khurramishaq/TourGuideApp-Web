import React from 'react'
import {useContext} from 'react'
import {RoomContext} from '../context'
import Title from '../components/Title'

//get all unique values

const getUnique = (items,value) =>{
  return [...new Set(items.map(item => item[value]))]
}
export default function RoomFilter({rooms}) {

  const context = useContext(RoomContext);
const {
  handleChange,
  type,
  city,
  capacity,
  price,
  minPrice,
  maxPrice,
  breakfast,
  driver
} = context;
// get unique types
let types = getUnique(rooms,'type');

//add all
  types = ['all',...types];
//map to jsx
types = types.map((item,index) => {
  return <option value ={item} key={index}
>{item}</option>
});

//get unique city
let citi = getUnique(rooms,'city');
//add all citi
citi = ['all',...citi];
//map to jsx
citi = citi.map((item,index) => {
  return <option value ={item} key={index}
>{item}</option>
});


let people = getUnique(rooms, 'capacity');
people = people.map((item,index)=>{
  return <option key={index} value={item}>{item}</option>
})

  return (
    <section className = "filter-container">
      <Title title = "search rooms"></Title> 
      <form className = "filter-form">
       
       {/*select city */}
    <div className="form-group">
      <label htmlFor="city">select city</label>
      <select name = "city" id="city" 
      value = {city} className = "form-control"
      onChange={handleChange}>
       {citi}
      </select>
    </div>
        {/*end select city */}

        {/*select type */}
    <div className="form-group">
      <label htmlFor="type">room type</label>
      <select name = "type" id="type" 
      value = {type} className = "form-control"
      onChange={handleChange}>
       {types}
      </select>
    </div>
        {/*end select type */}

        {/*guests type */}
    <div className="form-group">
      <label htmlFor="capacity">Guests</label>
      <select name = "capacity" id="capacity" 
      value = {capacity} className = "form-control"
      onChange={handleChange}>
       {people}
      </select>
    </div>
        {/*end guests type */}

        {/*room price */}
        <div className="form-group">
      <label htmlFor="price">
        room price Rs-{price}
      </label>
      <input type= 'range' name= 'price'
      min={minPrice} max= {maxPrice} id="price"
      value={price} onChange={handleChange}
      className = "form-control"></input>
    </div>
        {/*end room price */}

        {/*extra */}
        <div className="form-group">
          <div className="single-extra">
        <input type="checkbox" name="breakfast"
         id="breakfast" checked={breakfast}
         onChange={handleChange}/>
         <label htmlFor="breakfast">Breakfast</label>
          </div>

          <div className="single-extra">
        <input type="checkbox" name="driver"
         id="driver" checked={driver}
         onChange={handleChange}/>
         <label htmlFor="driver">driver</label>
          </div>
        </div>
        {/*end of extra */}
        
      </form>
    </section>
  )
}
