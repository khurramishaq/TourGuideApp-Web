import React, { Component } from 'react'
import Title from '../Title';
import RoomList from '../RoomList'
import firebase from '../firebase'
import Loader from 'react-loader-spinner'

export default class HotelFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotels: [],
            sortedHotels: [],
            loading: true,
            type: 'all',
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
            area: "All",
            city: "All"
        }
    }

    componentDidMount = async () => {

        await this.getData();

        this.setState({
            loading: false
        })
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
                                                hotel: this.state.hotels,
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

    handleChange = (e) => {
        let {
            hotels,
            allCities,
            cities,
            city,
            area
        } = this.state
        if (e.target.id === "area") {

            if (e.target.value === "All") {
                this.setState({
                    cities: allCities,
                    area: e.target.value,
                    city: "All",
                    sortedHotels: hotels
                })
            } else {
                this.setState({
                    city: "All",
                    area: e.target.value,

                })
                let hotelFilter = [];
                let cityFilter = [];
                cityFilter = allCities.filter(item => item.area === e.target.value);
                cities = [];
                let all = {
                    name: "All",
                    id: "All",
                    area: "All"
                }

                cityFilter.unshift(all);

                this.setState({
                    cities: cityFilter
                })

                hotelFilter = hotels.filter(item => item.area === e.target.value);

                this.setState({
                    sortedHotels: hotelFilter
                })
            }
        } else {
            this.setState({
                city: e.target.value
            })
            let hotelFilter = []
            if (area === "All") {
                if (e.target.value === "All") {
                    hotelFilter = hotels;
                } else {
                    hotelFilter = hotels.filter(item => item.city === e.target.value);
                }
            }
            else {
                hotelFilter = hotels.filter(item => item.city === e.target.value && item.area === area);
            }
            this.setState({
                sortedHotels: hotelFilter
            })
        }
    }

    convertToSlug(Text) {
        return Text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    render() {
        console.log("city", this.state.city)
        let {
            area,
            city,
            areas,
            cities,
            loading,
            sortedHotels
        } = this.state
        return (
            <div>
                {loading ?
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Loader type="ThreeDots" color="#af9a7d" height="100" width="100" />

                    </div>
                    : <>
                        <section className="filter-container">
                            <Title title="search hotels"></Title>
                            <form className="filter-form">

                                {/*select area */}
                                <div className="form-group">
                                    <label htmlFor="area">select area</label>
                                    <select name="area" id="area"
                                        className="form-control"
                                        value={area}
                                        onChange={this.handleChange}
                                    >
                                        {areas.map(item => <option value={item}>{item}</option>)}
                                    </select>
                                </div>
                                {/*end select area */}

                                {/* select city */}
                                <div className="form-group">
                                    <label htmlFor="city">select city</label>
                                    <select name="city" id="city"
                                        className="form-control"
                                        value={city}
                                        onChange={this.handleChange}
                                    >

                                        {cities.map(item => <option value={item.name}>{item.name}</option>)}
                                    </select>
                                </div>
                                {/*end select city */}

                                {/*select type */}
                                {/* <div className="form-group">
                            <label htmlFor="type">Place</label>
                            <select name="type" id="type"
                                value={type} className="form-control"
                                onChange={placehandleChange}
                            >
                                {types}
                            </select>
                        </div> */}
                                {/*end select type */}

                            </form>
                        </section>

                        <RoomList rooms={sortedHotels} />
                    </>
                }
            </div>
        )
    }
}
