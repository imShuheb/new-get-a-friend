import React from 'react'
import Banner from './components/Banner'
import Works from './components/Works'
import KeyFeatures from './components/KeyFeatures'
import Reviews from './components/Reviews'
import Footer from './components/Footer'

const Home = () => {

    return (
        <React.Fragment>
            <Banner />
            <Works />
            <KeyFeatures />
            <Reviews />
            <Footer />
        </React.Fragment>
    )
}

export default Home