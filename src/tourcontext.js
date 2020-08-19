import React, { Component } from 'react'
import items from './tourdata'

const TourContext = React.createContext();
// <TourContext.Provider value={'Hallo'}
class TourProvider extends Component {
  state = {
      tours :[],
      sortedTours: [],
      loading: true,
      type:'all',
      city:'all',
      persons:1,
      price:0,
      noofdays:0,
      from:0,
      to:0,
      minPrice:0,
      maxPrice:0,
      day:false,
      night:false,
	    stay:false
  };

  //getData

  componentDidMount(){
    //this.getData
    let tours = this.formatData(items)
    let maxPrice = Math.max(...tours.map(item =>
      item.price));
     

    this.setState({
      tours,
      sortedTours:tours,
      loading:false,
      price: maxPrice,
      maxPrice,
     
    });

  }

formatData(){
  let tempItems = items.map(item =>{
    let id = item.sys.id
    let images = item.fields.images.map(image => 
      image.fields.file.url);

    let tourpackage = {...item.fields,images,id};
    return tourpackage;
  });
  return tempItems 
}

getTour = (slug) =>{
  let tempTours = [...this.state.tours];
  const tourpackage = tempTours.find(tourpackage => tourpackage.slug===
    slug);
    return tourpackage;
};

tourhandleChange = event => {
  const target = event.target

  const value = target.type === 'checkbox' ?
  target.checked:target.value
  const name = event.target.name
  this.setState(
    {
    [name]:value
  },
  this.filterTours
  );
};

filterTours = () =>{
  let{
    tours,type,persons,price,city,day,
    night,from,to,noofdays
  }= this.state


// all the tours 
let tempTours = [...tours];
//trnasform value
persons = parseInt(persons);
price = parseInt(price);
noofdays = parseInt(noofdays);

//filter by type
if(type !== 'all'){
  tempTours = tempTours.filter(tourpackage => tourpackage.type ===
    type);
}

//filter by from
if(from !== 'all'){
  tempTours = tempTours.filter(tourpackage => tourpackage.city ===
    city);
}

//filter by to
if(to !== 'all'){
  tempTours = tempTours.filter(tourpackage => tourpackage.city ===
    city);
}


//filter by persons
if(persons !== 1){
  tempTours = tempTours.filter(tourpackage => 
    tourpackage.persons >= persons);
};

//filter by days
if(noofdays !== 1){
  tempTours = tempTours.filter(tourpackage => 
    tourpackage.noofdays >= noofdays);
}


  //filter by price
tempTours = tempTours.filter(tourpackage => tourpackage.price 
  <= price);

//filter by day
if(day){
tempTours = tempTours.filter(tourpackage => tourpackage.breakfast
  === true)
}

//filter by night
if(night){
  tempTours = tempTours.filter(tourpackage => tourpackage.night
    === true)
  }

  //change state
this.setState({
  sortedTours:tempTours
})
};

    render() {
    return (
        <TourContext.Provider value={{
          ...this.state,
        getTour: this.getTour,
        tourhandleChange : this.tourhandleChange
        }}>
            {this.props.children}
        </TourContext.Provider>
    )
  }
}

const TourConsumer = TourContext.Consumer;

export function withTourConsumer(Component){
  return function ConsumerWrapper(props){
    return <TourConsumer>
{value => <Component {...props} tourcontext = {value}/>}
</TourConsumer>

  }
}

export {TourProvider, TourConsumer, TourContext};
