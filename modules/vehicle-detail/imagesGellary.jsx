'use client'
import React from 'react'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import car1 from "../../public/cars/car_carsol-1.svg"


const Gellary = ({images}) => {

  const imageslist = [
    {
      original: images[0],
      thumbnail: images[0],
    },
    {
      original: "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723879579/j5b8fgnfjoeevdk51fym.svg",
      thumbnail: "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723879579/j5b8fgnfjoeevdk51fym.svg",
    },
    {
      original: "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
      thumbnail: "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
    },
    {
      original: "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883495/hwbr6ifnsxp3gppfvniv.svg",
      thumbnail: "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883495/hwbr6ifnsxp3gppfvniv.svg",
    },
    {
      original:  "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883538/o72kklbqq0p9zjamhjsl.svg",
      thumbnail:  "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883538/o72kklbqq0p9zjamhjsl.svg"
    },
    {
      original: "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
      thumbnail: "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
    },
  ];
  
  return (
 <ImageGallery items={imageslist}  showBullets={true}  showNav={false}/>
  )
}

export default Gellary