export const queryKeys = {
    auth: {
      all: ['auth'],
      user: () => [...queryKeys.auth.all, 'user'],
    },
    vehicles: {
      all: ['vehicles'],
      list: (filters) => [...queryKeys.vehicles.all, 'list', filters],
      detail: (id) => [...queryKeys.vehicles.all, 'detail', id],
      favorites: (userId) => [...queryKeys.vehicles.all, 'favorites', userId],
      topPerforming: () => [...queryKeys.vehicles.all, 'top-performing'],
    },
    reviews: {
      all: ['reviews'],
      user: (userId) => [...queryKeys.reviews.all, 'user', userId],
      dealer: (dealerId) => [...queryKeys.reviews.all, 'dealer', dealerId],
      vehicle: (vehicleId) => [...queryKeys.reviews.all, 'vehicle', vehicleId],
    },
    blogs: {
      all: ['blogs'],
      list: (filters) => [...queryKeys.blogs.all, 'list', filters],
      browse: () => [...queryKeys.blogs.all, 'browse'],
      search: (query) => [...queryKeys.blogs.all, 'search', query],
    },
    videos: {
      all: ['videos'],
      list: (filters) => [...queryKeys.videos.all, 'list', filters],
      browse: () => [...queryKeys.videos.all, 'browse'],
      detail: (id) => [...queryKeys.videos.all, 'detail', id],
    },
    comparison: {
      all: ['comparison'],
      list: () => [...queryKeys.comparison.all, 'list'],
      top: () => [...queryKeys.comparison.all, 'top'],
    },
  };
