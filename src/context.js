import React, { Component } from 'react';
import firebase from './components/firebase'
const RoomContext = React.createContext();

// <RoomContext.Provider value={'Hallo'}
class Provider extends Component {
  state = {
    hotels: [],
    sortedHotels: [],
    areas: ["All"],
    allCities: [{
      name: "All",
      id: "All",
      area: "All"
    }],
    cities: [{
      name: "All",
      id: "All",
      area: "All"
    }],
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    city: 'all',
    area: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    breakfast: false,
    driver: false
  };

  //getData

  componentDidMount() {
    this.getData()
    // let rooms = this.formatData(items)
    // let featuredRooms = rooms.filter(room =>
    //   room.featured === true);
    // let maxPrice = Math.max(...rooms.map(item =>
    //   item.price));

    // this.setState({
    //   rooms,
    //   featuredRooms,
    //   sortedRooms: rooms,
    //   loading: false,
    //   price: maxPrice,
    //   maxPrice,
    // });

  }

  getData = () => {
    firebase
      .firestore()
      .collection("Area")
      .get()
      .then(async (snapshot) => {
        await snapshot.forEach(async doc => {
          this.state.areas.push(doc.id)
          this.setState({
            areas: this.state.areas
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
                this.state.cities.push(c)
                this.state.allCities.push(c)
                this.setState({
                  cities: this.state.cities,
                  allCities: this.state.allCities
                })
                firebase
                  .firestore()
                  .collection("Area")
                  .doc(doc.id)
                  .collection("City")
                  .doc(doc1.id)
                  .collection("Hotels")
                  .get()
                  .then(async (snapshot) => {
                    await snapshot.forEach(doc2 => {
                      let h = {
                        id: doc2.id,
                        name: doc2.data().Name,
                        description: doc2.data().Description,
                        images: doc2.data().image,
                        city: doc1.id,
                        area: doc.id,
                        slug: this.convertToSlug(doc2.data().Name),
                        price: doc2.data().Price
                      }
                      this.state.hotels.push(h)
                      this.setState({
                        hotels: this.state.hotels,
                        sortedHotels: this.state.hotels
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

  //     let room = { ...item.fields, images, id };
  //     return room;

  //   });
  //   return tempItems
  // }


  getRoom = (slug) => {
    let tempRooms = [...this.state.hotels];
    const room = tempRooms.find(room => room.slug ===
      slug);
    console.log("room", room)
    return room;
  };

  // getRoom = (slug) => {
  //   let tempRooms = [...this.state.rooms];
  //   const room = tempRooms.find(room => room.slug ===
  //     slug);
  //   return room;
  // };



  //RoomHnadlechange

  handleChange = event => {
    const target = event.target

    const value = target.type === 'checkbox' ?
      target.checked : target.value
    const name = event.target.name
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  //filter rooms
  filterRooms = () => {
    let {
      rooms, type, capacity, price, city, breakfast,
      driver
    } = this.state


    // all the rooms 
    let tempRooms = [...rooms];
    //trnasform value
    capacity = parseInt(capacity);
    price = parseInt(price);

    //filter by type
    if (type !== 'all') {
      tempRooms = tempRooms.filter(room => room.type ===
        type);
    }

    //filter by city
    if (city !== 'all') {
      tempRooms = tempRooms.filter(room => room.city ===
        city);
    }
    //filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter(room =>
        room.capacity >= capacity);
    }

    //filter by price
    tempRooms = tempRooms.filter(room => room.price
      <= price);

    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast
        === true)
    }

    //filter by driver
    if (driver) {
      tempRooms = tempRooms.filter(room => room.driver
        === true)
    }

    //change state
    this.setState({
      sortedRooms: tempRooms
    })
  };


  render() {
    return (
      <>
        {<RoomContext.Provider value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}>
          {this.props.children}
        </RoomContext.Provider>}

      </>
    )

  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return <RoomConsumer>
      {value => <Component {...props} context={value} />}
    </RoomConsumer>

  }
};


export { Provider, RoomConsumer, RoomContext };
