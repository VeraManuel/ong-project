import React, {Fragment} from 'react';
import  Slider  from '../Slider/Slider'
import Welcome from './Welcome'
import NewNews from './NewNews'
import Testimonials from '../Testimonials/Testimonials'


const Home = () =>{
    return(
        <Fragment>
            <Slider/>
            <Welcome/>
            <NewNews/>
            <Testimonials/>
        </Fragment>
    )
}

export default Home