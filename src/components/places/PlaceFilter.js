import React, { Component } from 'react'
import Title from '../Title';
import PlaceList from '../PlaceList'
import firebase from '../firebase'
import Loader from 'react-loader-spinner'

export default class PlaceFilter extends Component {

    state = {
        places: [],
        sortedPlaces: [],
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
    };

    componentDidMount = async () => {

        await this.getData();

    }

    handleChange = (e) => {
        let {
            places,
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
                    sortedPlaces: places
                })
            } else {
                this.setState({
                    city: "All",
                    area: e.target.value
                })
                let placeFilter = [];
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

                placeFilter = places.filter(item => item.area === e.target.value);

                this.setState({
                    sortedPlaces: placeFilter
                })
            }
        } else {

            this.setState({
                city: e.target.value
            })
            let placeFilter = []
            if (area === "All") {
                if (e.target.value === "All") {
                    placeFilter = places;
                } else {
                    placeFilter = places.filter(item => item.city === e.target.value);
                }
            }
            else {
                placeFilter = places.filter(item => item.city === e.target.value && item.area === area);
            }
            this.setState({
                sortedPlaces: placeFilter
            })
        }
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
                                                places: this.state.places,
                                                sortedPlaces: this.state.places
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

        this.setState({
            loading: false
        })
    }

    convertToSlug(Text) {
        return Text
            .toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    render() {
        let {
            area,
            city,
            areas,
            cities,
            loading,
            sortedPlaces
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
                            <Title title="search Places"></Title>
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

                        <PlaceList places={sortedPlaces} />
                    </>
                }
            </div>
        )
    }
}
