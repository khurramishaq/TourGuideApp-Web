import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import PlaceContainer from '../components/PlaceContainer'

const Places = () =>  {
    return (
        <>
        <Hero hero = "placeshero">
            <Banner title = "Places">
                <Link to = "/" className = "btn-primary">
                    return to home
                </Link>
            </Banner>
        </Hero>
        <PlaceContainer/>
        </>
    )
} 

export default Places;
