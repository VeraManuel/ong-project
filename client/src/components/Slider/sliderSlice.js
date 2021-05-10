import { createSlice } from '@reduxjs/toolkit';

export const imgCarousel = createSlice({
  name: 'img',
  initialState: {
    //TODO: Array of img for example
    arrayImg: [{
      imageUrl: "https://i.ibb.co/Bfw0GZx/Foto-4.jpg",
      text: "img1"
    },{
      imageUrl: "https://i.ibb.co/T8JJRJ9/Foto-5.jpg",
      text: "img2"
    },{
      imageUrl: "https://i.ibb.co/f4HhGMp/Foto-10.jpg",
      text: "img3"
    }, {
      imageUrl: "https://i.ibb.co/GHz32cF/Foto-11.jpg",
      text: "img4"
    }]
  },
  reducers: {

  },
});

// The function below is called a selector and allows us to select a value from
// the state. 
export const selectImg = state => state.img.arrayImg

export default imgCarousel.reducer;
