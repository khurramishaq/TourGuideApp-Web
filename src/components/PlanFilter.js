import React from 'react'
import {useContext} from 'react'
import {PlanContext} from '../plancontext'
import Title from '../components/Title'

//get all unique values

const getUnique = (items,value) =>{
  return [...new Set(items.map(item => item[value]))]
}
export default function PlanFilter({plans}) {

  const plancontext = useContext(PlanContext);
  
const {
  planhandleChange,
  type,
  city,
  area,
  days
} = plancontext;
// get unique types
let types = getUnique(plans,'type');

//add all
  types = ['all',...types];
//map to jsx
types = types.map((item,index) => {
  return <option value ={item} key={index}
>{item}</option>
});

//get unique area
let areas = getUnique(plans,'area');
//add all areas
areas = ['all',...areas];
//map to jsx
areas = areas.map((item,index) => {
  return <option value ={item} key={index}
>{item}</option>
});

//get unique city
let citi = getUnique(plans,'city');
//add all citi
citi = ['all',...citi];
//map to jsx
citi = citi.map((item,index) => {
  return <option value ={item} key={index}
>{item}</option>
});

//get unique city
let day = getUnique(plans,'days');
//add all citi
day = ['all',...day];
//map to jsx
day = day.map((item,index) => {
  return <option value ={item} key={index}
>{item}</option>
});

  return (
    <section className = "filter-container">
      <Title title = "Plan a trip"></Title> 
      <form className = "filter-form">
       
{/*select area */}
<div className="form-group">
      <label htmlFor="area">select area</label>
      <select name = "area" id="area" 
      value = {area} className = "form-control"
      onChange={planhandleChange}>
       {areas}
      </select>
    </div>
        {/*end select area */}

       {/* select city */}
    <div className="form-group">
      <label htmlFor="city">select city</label>
      <select name = "city" id="city" 
      value = {city} className = "form-control"
      onChange={planhandleChange}>
       {citi}
      </select>
    </div>
        {/*end select city */}
        
    {/*select type */}
    <div className="form-group">
      <label htmlFor="type">Select a Plan</label>
      <select name = "type" id="type" 
      value = {type} className = "form-control"
      onChange={planhandleChange}
      >
       {types}
      </select>
    </div>
        {/*end select type */}
        
</form>
    </section>
  )
}
