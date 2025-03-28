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

// export const BASE_URL = "http://143.110.253.131:5000";
// export const BASE_URL = "https://auto-wheel-be.vercel.app";
export const BASE_URL = 'https://shan.lunashoes.shop'; // Uncomment for local development
// export const BASE_URL = 'http://localhost:5000'; // Uncomment for local development




// Define base paths for commonly used API routes
const VEHICLE_BASE = `${BASE_URL}/api/vehicle`;
const NEW_VEHICLE_BASE = `${BASE_URL}/api/new-vehicles`;
const REVIEW_BASE = `${BASE_URL}/api/reviews`;
const VIDEO_BASE = `${BASE_URL}/api/video`;
const USER_REVIEWS_BASE = `${BASE_URL}/api/user-reviews`;
const NEAR_BY_LOCATION_BASE = `${BASE_URL}/api/near-by-location`;
export const LOCATION_PROVINCES  = `${BASE_URL}/api/location/provinces`;
export const LOCATION_SUBURBS  = `${BASE_URL}/api/location/suburbs`;
export const LOCATION_CITIES  = `${BASE_URL}/api/location/cities`;
const DRIVE_BASE = `${BASE_URL}/api/drive`;
const TRANSMISSION_BASE = `${BASE_URL}/api/transmission`;
const FUEL_TYPE_BASE = `${BASE_URL}/api/fuel-type`;
const COLOR_BASE = `${BASE_URL}/api/color`;
const Competitor_BASE = `${BASE_URL}/api/competitor`;

export const API_ENDPOINTS = {
  AUTH: {
    SIGNUP: `${BASE_URL}/api/user/register`,
    LOGIN: `${BASE_URL}/api/user/login`,
    VERIFY_OTP: `${BASE_URL}/api/user/verify-user`,
    FORGOT_PASSWORD: `${BASE_URL}/api/user/password-reset-request`,
    RESET_PASSWORD: `${BASE_URL}/api/user/reset-password`,
    SOCIAL_LOGIN: `${BASE_URL}/api/user/social-login`,
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
    Update: (vehicleId) => `${VEHICLE_BASE}/update/${vehicleId}`,
    SIMILAR: `${VEHICLE_BASE}/getSimilarVehicles`,
    TRACK_VIEW: (id) => `${BASE_URL}/api/tracking/${id}/view`,
    BATCH_TRACK_VIEWS: `${BASE_URL}/api/tracking/batch-views`,
    VIEW_ANALYTICS: `${BASE_URL}/api/tracking/analytics/views`,

    MAKES_WITH_POPULAR: (make, type) => {
      const queryParams = [];

      if (type) queryParams.push(`type=${encodeURIComponent(type)}`);
      if (make) queryParams.push(`make=${encodeURIComponent(make)}`);
      return `${VEHICLE_BASE}/get-popular-vehicles${
        queryParams.length ? `?${queryParams.join("&")}` : ""
      }`;
    },
    TOP_PERFORMING_POSTS:`${VEHICLE_BASE}/get-user-top-performing-posts`,
    DETAIL_BY_SELLER: (vehicleId) => `${VEHICLE_BASE}/vehicle-by-seller/${vehicleId}`,
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
    VARIENTS: (slug) => `${NEW_VEHICLE_BASE}/variants/${slug}`,
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
    REVIEWS_BY_VEHICLE_OVERALL: `${REVIEW_BASE}/overall-ratings`,
  },
  USER_REVIEWS: {
    BASE: USER_REVIEWS_BASE,
    GET_USER_REVIEWS_BY_DEALER_ID: `${USER_REVIEWS_BASE}/dealer`
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
    SEARCH: `${BASE_URL}/api/blog/search`,
  },

  COMPARISON: {
    ADD: `${BASE_URL}/api/comparison/add`,
    GET: `${BASE_URL}/api/comparison`,
    COMPARISON_LIST: `${BASE_URL}/api/comparison/top`,
    TOP_COMPARISON: `${BASE_URL}/api/comparison/top-comparison`,
  },
  USER: {
    GET_DASHBOARD_OVERVIEW: `${BASE_URL}/api/vehicle/get-user-dashboard-overview`,
  },


  COMMENTS: {
    BASE: `${BASE_URL}/api/comment`,
  },
  BANNER:  `${BASE_URL}/api/banners/active`,

  TAGS: {
    BASE: `${BASE_URL}/api/tag`,
  },
  NEAR_BY_LOCATION: {
    GET: `${NEAR_BY_LOCATION_BASE}/active`,
  },
  DRIVE: {
    GET: (type) => `${DRIVE_BASE}/type?type=${type}`,
  },
  TRANSMISSION: {
    GET: (type) => `${TRANSMISSION_BASE}/type?type=${type}`,
  },
  FUEL_TYPE: {
    GET: (type) => `${FUEL_TYPE_BASE}/type?type=${type}`,
  },
  COLOR: {
    GET: (type) => `${COLOR_BASE}`,
  },
  COMPETITOR: {
    GET: (vehicleId) => `${Competitor_BASE}/vehicle/${vehicleId}`,
  },

  // Image Upload Endpoint
  IMAGE_UPLOAD: `${BASE_URL}/api/upload-image`,

  // External APIs (For Example Purposes)
  EXTERNAL: {
    COMPARISONS: "https://fakestoreapi.com/products",
    INSTANT_USED_CARS: "https://fakestoreapi.com/products",
  },
};
