"use client";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Gallery = ({ images }) => {
  // Use the provided images if available; otherwise, use a set of dummy images
  const imagesList =
    images.length > 0
      ? images.map((image) => ({
          original: image,
          thumbnail: image,
        }))
      : [
          {
            original: "/cars/car_carsol-1.svg",
            thumbnail: "/cars/car_carsol-1.svg",
          },
          {
            original:
              "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723879579/j5b8fgnfjoeevdk51fym.svg",
            thumbnail:
              "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723879579/j5b8fgnfjoeevdk51fym.svg",
          },
          {
            original:
              "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
            thumbnail:
              "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
          },
          {
            original:
              "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883495/hwbr6ifnsxp3gppfvniv.svg",
            thumbnail:
              "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883495/hwbr6ifnsxp3gppfvniv.svg",
          },
          {
            original:
              "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883538/o72kklbqq0p9zjamhjsl.svg",
            thumbnail:
              "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883538/o72kklbqq0p9zjamhjsl.svg",
          },
          {
            original:
              "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
            thumbnail:
              "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
          },
        ];
  // const imagesList = [
  //   {
  //     original: "/cars/car_carsol-1.svg",
  //     thumbnail: "/cars/car_carsol-1.svg",
  //   },
  //   {
  //     original:
  //       "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723879579/j5b8fgnfjoeevdk51fym.svg",
  //     thumbnail:
  //       "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723879579/j5b8fgnfjoeevdk51fym.svg",
  //   },
  //   {
  //     original:
  //       "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
  //     thumbnail:
  //       "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
  //   },
  //   {
  //     original:
  //       "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883495/hwbr6ifnsxp3gppfvniv.svg",
  //     thumbnail:
  //       "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883495/hwbr6ifnsxp3gppfvniv.svg",
  //   },
  //   {
  //     original:
  //       "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883538/o72kklbqq0p9zjamhjsl.svg",
  //     thumbnail:
  //       "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883538/o72kklbqq0p9zjamhjsl.svg",
  //   },
  //   {
  //     original:
  //       "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
  //     thumbnail:
  //       "http://res.cloudinary.com/dcfpazr4b/image/upload/v1723883430/pxsssmw2eeegbmpsfrkp.png",
  //   },
  // ];

  return (
    <>
      <style jsx global>{`
        /* Main image container styling */
        .image-gallery-slide {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        /* Set fixed height for main image container */
        .image-gallery-slide-wrapper {
          // height: 435px !important;  
        }
        
        .image-gallery-swipe {
          height: 100%;
        }
        
        .image-gallery-slides {
          height: 100%;
        }
        
        .image-gallery-slide {
          height: 100%;
        }
        
        .image-gallery-image {
          height: 435px !important;
          object-fit: cover !important;
          object-position: center !important;
        }
        
        /* Remove fixed height in fullscreen mode */
        .fullscreen .image-gallery-image {
          height: auto !important;
          max-height: 100vh !important;
        }
        
        /* Thumbnail styling */
        .image-gallery-thumbnail {
          border-radius: 5px;
          overflow: hidden;
          margin: 0 4px;
          transition: all 0.3s ease;
          width: 132px;
          height: 83px;
        }
        
        .image-gallery-thumbnail img {
          width: 132px;
          height: 83px;
           border-radius: 5px;
          object-fit: cover;
        }
        
        .image-gallery-thumbnail:hover {
          border: 2px solid #ff0000 !important;
        }
        
        .image-gallery-thumbnail.active {
          border: 2px solid #ff0000 !important;
          transform: scale(1.05);
        }
        
        .image-gallery-thumbnails-container {
          margin-top: 10px;
        }
        
        /* Hide bullets/dots */
        .image-gallery-bullets {
          display: none !important;
        }
        
        /* Style navigation arrows */
        .image-gallery-left-nav,
        .image-gallery-right-nav {
          background-color: rgba(255, 0, 0, 0.7) !important;
          border-radius: 50%;
          width: 30px !important;
          height: 30px !important;
          padding: 8px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .image-gallery-left-nav:hover,
        .image-gallery-right-nav:hover {
          background-color: rgba(255, 0, 0, 1) !important;
        }
        
        /* Position the arrows */
        .image-gallery-left-nav {
          left: 10px !important;
        }
        
        .image-gallery-right-nav {
          right: 10px !important;
        }
        
        /* Make the arrow icons smaller */
        .image-gallery-left-nav::before,
        .image-gallery-right-nav::before {
          font-size: 20px !important;
          color: white !important;
        }
        
        /* Overall gallery container */
        .image-gallery {
          margin: 0 auto;
          max-width: 100%;
          border-radius: 10px;
          overflow: hidden;
        }
        
        /* Fullscreen button styling */
        .image-gallery-fullscreen-button {
          // background-color: rgba(255, 0, 0, 0.7) !important;
          border-radius: 50%;
          width: 30px !important;
          height: 30px !important;
          padding: 5px !important;
          right: 10px !important;
          bottom: 10px !important;
        }

      `}</style>
      <ImageGallery 
        items={imagesList} 
        showBullets={false}
        showNav={true}
        showPlayButton={false}
        // showFullscreenButton={true}
        slideDuration={450}
        // thumbnailPosition="bottom"
        lazyLoad={true}
        useBrowserFullscreen={true}
      />
    </>
  );
};

export default Gallery;
