// const BASE_URL = 'https://auto-wheel-be.vercel.app'
// // const BASE_URL = 'http://localhost:5000'

// export const API_ENDPOINTS = {
//     MAKES: `${BASE_URL}/api/browes-by-make`,
//     MAKES_WITH_POPULAR: `${BASE_URL}/api/browes-by-make`,
//     BODIES: `${BASE_URL}/api/browes-by-body`,
//     VEHICLES_TYPE: (type) => {
//       let url = `${BASE_URL}/api/vehicle/vehicles-by-type`;
//       if (type) {
//         url += `?type=${encodeURIComponent(type)}`;
//       }
//       return url;
//     },
//     VEHICLES_Listing:`${BASE_URL}/api/vehicle/vehicles-listing`,
//     VEHICLE_DETAIL:`${BASE_URL}/api/vehicle`,
//     VEHICLE_ADD:`${BASE_URL}/api/vehicle`,
//     SIMILAR_VEHICLES:`${BASE_URL}/api/vehicle/getSimilarVehicles`,
//     COMPARISONS: 'https://fakestoreapi.com/products',
//     INSTANT_USED_CARS: 'https://fakestoreapi.com/products',
//     BROWSE_VIDEOS: `${BASE_URL}/api/video/browse-videos`,
//     COMMENT: `${BASE_URL}/api/comment`,
//     VIDEOS: `${BASE_URL}/api/video/video-listing/`,
//     BLOGS: `${BASE_URL}/api/blog/blog-listing/`,
//     BROWSE_BLOGS: `${BASE_URL}/api/blog/browse-blogs`,
//     TAGS:`${BASE_URL}/api/tag`,
//     SIGNUP:`${BASE_URL}/api/user/register`,
//     LOGIN:`${BASE_URL}/api/user/login`,
//     VERIFY_OTP:`${BASE_URL}/api/user/verify-user`,
//     SUBMITREVIEW:`${BASE_URL}/api/reviews`,
//     GET_ALL_REVIEWS:`${BASE_URL}/api/reviews`,
//     IMAGE_UPLOADS:`${BASE_URL}/upload-image`
//   };

// export const BASE_URL = "https://auto-wheel-be.vercel.app";
export const BASE_URL = 'http://localhost:5000'; // Uncomment for local development

// Define base paths for commonly used API routes
const VEHICLE_BASE = `${BASE_URL}/api/vehicle`;
const NEW_VEHICLE_BASE = `${BASE_URL}/api/new-vehicles`;
const REVIEW_BASE = `${BASE_URL}/api/reviews`;
const VIDEO_BASE = `${BASE_URL}/api/video`;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/api/user/register`,
    LOGIN: `${BASE_URL}/api/user/login`,
    VERIFY_OTP: `${BASE_URL}/api/user/verify-user`,
    FORGOT_PASSWORD: `${BASE_URL}/api/user/password-reset-request`,
    RESET_PASSWORD: `${BASE_URL}/api/user/reset-password`,
  },
  COMPARISON: {
    BASE: `${BASE_URL}/api/comparison`,
    GET_COMPARISON_LIST: `${BASE_URL}/api/comparison/list`,
  },

  VEHICLE: {
    BASE: VEHICLE_BASE,
    LIST_BY_TYPE: (type) =>
      `${VEHICLE_BASE}/vehicles-by-type${
        type ? `?type=${encodeURIComponent(type)}` : ""
      }`,
    LISTINGS: `${VEHICLE_BASE}/vehicles-listing`,
    DETAIL: (id) => `${VEHICLE_BASE}/${id}`,
    ADD: `${VEHICLE_BASE}`,
    SIMILAR: `${VEHICLE_BASE}/getSimilarVehicles`,

    MAKES_WITH_POPULAR: (make, type) => {
      const queryParams = [];

      if (type) queryParams.push(`type=${encodeURIComponent(type)}`);
      if (make) queryParams.push(`make=${encodeURIComponent(make)}`);
      return `${VEHICLE_BASE}/get-popular-vehicles${
        queryParams.length ? `?${queryParams.join("&")}` : ""
      }`;
    },
  },
  NEW_VEHICLE: {
    BASE: NEW_VEHICLE_BASE,

    UPCOMMING: (make, type) => {
      const queryParams = [];
      if (type) queryParams.push(`type=${encodeURIComponent(type)}`);
      if (make) queryParams.push(`make=${encodeURIComponent(make)}`);

      return `${NEW_VEHICLE_BASE}/upcoming${
        queryParams.length ? `?${queryParams.join("&")}` : ""
      }`;
    },
    MAKE_BY_VEHICLES: (make, type) => {
      const queryParams = [];

      if (type) queryParams.push(`type=${encodeURIComponent(type)}`);
      if (make) queryParams.push(`make=${encodeURIComponent(make)}`);

      return `${NEW_VEHICLE_BASE}/make/${
        queryParams.length ? `?${queryParams.join("&")}` : ""
      }`;
    },

    MAKES_WITH_POPULAR: (make, type) => {
      const queryParams = [];

      if (type) queryParams.push(`type=${encodeURIComponent(type)}`);
      if (make) queryParams.push(`make=${encodeURIComponent(make)}`);
      return `${NEW_VEHICLE_BASE}/popular${
        queryParams.length ? `?${queryParams.join("&")}` : ""
      }`;
    },
    MAKES_WITH_POPULAR: (make, type) => {
      const queryParams = [];

      if (type) queryParams.push(`type=${encodeURIComponent(type)}`);
      if (make) queryParams.push(`make=${encodeURIComponent(make)}`);
      return `${NEW_VEHICLE_BASE}/popular${
        queryParams.length ? `?${queryParams.join("&")}` : ""
      }`;
    },
    NEWLY_LAUNCHED_VEHICLES: (make, type) => {
      const queryParams = [];

      if (type) queryParams.push(`type=${encodeURIComponent(type)}`);
      if (make) queryParams.push(`make=${encodeURIComponent(make)}`);
      return `${NEW_VEHICLE_BASE}/newly-launched${
        queryParams.length ? `?${queryParams.join("&")}` : ""
      }`;
    },

    LISTINGS: `${NEW_VEHICLE_BASE}/vehicles-listing`,
    DETAIL: (slug) => `${NEW_VEHICLE_BASE}/${slug}`,
    TOPCOMPARISON:`${NEW_VEHICLE_BASE}/comparison`,
    COMPARISON:`${NEW_VEHICLE_BASE}/compare`,
    // ADD: `${VEHICLE_BASE}`,
    // SIMILAR: `${VEHICLE_BASE}/getSimilarVehicles`
  },

  BROWSE: {
    BY_MAKE: `${BASE_URL}/api/browes-by-make`,
    MAKES_WITH_POPULAR: (make, type) => {
      return `${BASE_URL}/api/browes-by-make/makes-with-popular/${make}/${type}`;
    },
    BY_BODY: `${BASE_URL}/api/browes-by-body`,
  },

  REVIEWS: {
    BASE: REVIEW_BASE,
    SUBMIT: `${REVIEW_BASE}`,
    GET_ALL: `${REVIEW_BASE}`,
    REVIEWS_BY_VEHICLE: `${REVIEW_BASE}/by-vehicle`,
    REVIEWS_BY_VEHICLE_OVERALL: `${REVIEW_BASE}/overall-ratings`
  },

  VIDEOS: {
    BASE: VIDEO_BASE,
    BROWSE: `${VIDEO_BASE}/browse-videos`,
    LIST: `${VIDEO_BASE}/video-listing/`,
    DETAIL: (id) => `${VIDEO_BASE}/${id}`, // Dynamic ID for video detail
  },

  BLOGS: {
    LIST: `${BASE_URL}/api/blog/blog-listing/`,
    BROWSE: `${BASE_URL}/api/blog/browse-blogs`,
  },

  COMPARISON: {
    ADD: `${BASE_URL}/api/comparison/add`,
    GET: `${BASE_URL}/api/comparison`,
  },

  COMMENTS: {
    BASE: `${BASE_URL}/api/comment`,
  },
  BANNER:  `${BASE_URL}/api/banners/active`,

  TAGS: {
    BASE: `${BASE_URL}/api/tag`,
  },

  // Image Upload Endpoint
  IMAGE_UPLOAD: `${BASE_URL}/upload-image`,

  // External APIs (For Example Purposes)
  EXTERNAL: {
    COMPARISONS: "https://fakestoreapi.com/products",
    INSTANT_USED_CARS: "https://fakestoreapi.com/products",
  },
};
