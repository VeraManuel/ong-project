import React, { useState } from 'react';
import { useSelector } from 'react-redux';
//react Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

//import state
import {selectImg} from './sliderSlice'



const Slider = () => {
  const img = useSelector(selectImg);
  //const dispatch = useDispatch();

  
  //state initial: array of 3 objects
  const [arrayImg, setArrayImg] = useState(img)

  return ( 
    <Carousel>
      <div>
          <img className="img__carrousel" src={arrayImg[0].imageUrl} alt="imgExample"/>
          
      </div>
      <div>
          <img className="img__carrousel" src={arrayImg[1].imageUrl} alt="imgExample"/>
          
      </div>
      <div>
          <img className="img__carrousel" src={arrayImg[2].imageUrl} alt="imgExample"/>
         
      </div>
    </Carousel>
   );
}
 
export default Slider;
