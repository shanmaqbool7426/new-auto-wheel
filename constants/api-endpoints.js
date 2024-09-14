
const BASE_URL = 'https://auto-wheel-be.vercel.app'
// const BASE_URL = 'http://localhost:5000'

export const API_ENDPOINTS = {
    MAKES: `${BASE_URL}/api/browes-by-make`,
    BODIES: `${BASE_URL}/api/browes-by-body`,
    VEHICLES_TYPE: (type) => {
      let url = `${BASE_URL}/api/vehicle/vehicles-by-type`;
      if (type) {
        url += `?type=${encodeURIComponent(type)}`;
      }
      return url;
    },
    VEHICLES_Listing:`${BASE_URL}/api/vehicle/vehicles-listing`,
    VEHICLE_DETAIL:`${BASE_URL}/api/vehicle`,
    VEHICLE_ADD:`${BASE_URL}/api/vehicle`,
    SIMILAR_VEHICLES:`${BASE_URL}/api/vehicle/getSimilarVehicles`,
    COMPARISONS: 'https://fakestoreapi.com/products',
    INSTANT_USED_CARS: 'https://fakestoreapi.com/products',
    BROWSE_VIDEOS: `${BASE_URL}/api/video/browse-videos`,
    COMMENT: `${BASE_URL}/api/comment`,
    VIDEOS: `${BASE_URL}/api/video/video-listing/`,
    BLOGS: `${BASE_URL}/api/blog/blog-listing/`,
    BROWSE_BLOGS: `${BASE_URL}/api/blog/browse-blogs`,
    TAGS:`${BASE_URL}/api/tag`,
    SIGNUP:`${BASE_URL}/api/user/register`,
    LOGIN:`${BASE_URL}/api/user/login`,
    VERIFY_OTP:`${BASE_URL}/api/user/verify-user`,
    SUBMITREVIEW:`${BASE_URL}/api/reviews`,
    GET_ALL_REVIEWS:`${BASE_URL}/api/reviews`,
    IMAGE_UPLOADS:`${BASE_URL}/upload-image`
  };
  