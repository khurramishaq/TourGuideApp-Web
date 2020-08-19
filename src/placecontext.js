import React, { Component } from 'react'

import firebase from './components/firebase'

const PlaceContext = React.createContext();
// <RoomContext.Provider value={'Hallo'}
class PlaceProvider extends Component {
  state = {
    places: [],
    sortedPlaces: [],
    loading: true,
    type: 'all',
    area: [],
    city: [],
   
  };

  //getData

  componentDidMount = async() => {
    await this.getData()
    // let places = this.formatData(items);

    // this.setState({
    //   places,
    //   sortedPlaces: places,
    //   loading: false,
    // });

    // this.getData();

    // this.setState({
    //   loading: false
    // })

  }

  getData = () => {
    firebase
      .firestore()
      .collection("Area")
      .get()
      .then(async (snapshot) => {
        await snapshot.forEach(async doc => {
          this.state.area.push(doc.id)
          this.setState({
            area: this.state.area
          })
          firebase
            .firestore()
            .collection("Area")
            .doc(doc.id)
            .collection("City")
            .get()
            .then(async (snapshot) => {
              await snapshot.forEach(doc1 => {
                let c = {
                  name: doc1.id,
                  id: doc1.id,
                  area: doc.id
                }
                this.state.city.push(c)
                this.setState({
                  city: this.state.city
                })
                firebase
                  .firestore()
                  .collection("Area")
                  .doc(doc.id)
                  .collection("City")
                  .doc(doc1.id)
                  .collection("Places")
                  .get()
                  .then(async (snapshot) => {
                    await snapshot.forEach(doc2 => {
                      let p = {
                        id: doc2.id,
                        name: doc2.data().Name,
                        description: doc2.data().Description,
                        images: doc2.data().image,
                        city: doc1.id,
                        area: doc.id,
                        slug: this.convertToSlug(doc2.data().Name)
                      }
                      this.state.places.push(p)
                      this.setState({
                        places: this.state.places
                      })
                    })

                  }).catch(error => {
                    var errorMessage = error.message;
                    console.log(errorMessage)
                  })
              })

            }).catch(error => {
              var errorMessage = error.message;
              console.log(errorMessage)
            })
        })

      }).catch(error => {
        var errorMessage = error.message;
        console.log(errorMessage)
      })
  }

  convertToSlug(Text) {
    return Text
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');
  }


  // formatData() {
  //   let tempItems = items.map(item => {
  //     let id = item.sys.id
  //     let images = item.fields.images.map(image =>
  //       image.fields.file.url);

  //     let place = { ...item.fields, images, id };
  //     return place;
  //   });
  //   return tempItems
  // }

  getPlace = (slug) => {
    let tempPlaces = [...this.state.places];
    const place = tempPlaces.find(place => place.slug ===
      slug);
    return place;
  }

  placehandleChange = event => {
    const target = event.target

    const value = target.type === 'checkbox' ?
      target.checked : target.value
    const name = event.target.name
    this.setState(
      {
        [name]: value
      },
      this.filterPlaces
    );
  };

  filterPlaces = () => {
    let {
      places, type, area, city, day, midpoint
    } = this.state


    // all the rooms 
    let tempPlaces = [...places];

    //filter by type
    if (type !== 'all') {
      tempPlaces = tempPlaces.filter(place => place.type ===
        type);
    }

    //filter by area
    if (area !== 'all') {
      tempPlaces = tempPlaces.filter(place => place.area ===
        area);
    }

    //filter by city
    if (city !== 'all') {
      tempPlaces = tempPlaces.filter(place => place.city ===
        city);
    }

    //change state
    this.setState({
      sortedPlaces: tempPlaces
    })
  };

  render() {
    return (
      <PlaceContext.Provider value={{
        ...this.state,
        getPlace: this.getPlace,
        placehandleChange: this.placehandleChange
      }}>
        {this.props.children}
      </PlaceContext.Provider>
    )
  }
}

const PlaceConsumer = PlaceContext.Consumer;

const PlanConsumer = PlaceContext.Consumer;

export function withPlaceConsumer(Component) {
  return function ConsumerWrapper(props) {
    return <PlaceConsumer>
      {value => <Component {...props} placecontext={value} />}
    </PlaceConsumer>

  }
}
export function withPlanConsumer(Component) {
  return function ConsumerWrapper(props) {
    return <PlanConsumer>
      {value => <Component {...props} placecontext={value} />}
    </PlanConsumer>

  }
}

export { PlaceProvider, PlaceConsumer, PlaceContext, PlanConsumer };
