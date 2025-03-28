import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProvince: null,
  selectedCity: null,
  selectedSuburb: null,  // Changed from selectedState
  provinces: [],
  cities: [],
  suburbs: [],          // Changed from states
  isLoading: false,
  error: null
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    // Set error state
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    // Set provinces list
    setProvinces: (state, action) => {
      state.provinces = action.payload;
      state.isLoading = false;
    },

    // Set cities list
    setCities: (state, action) => {
      state.cities = action.payload;
      state.isLoading = false;
    },

    // Set suburbs list
    setSuburbs: (state, action) => {
      state.suburbs = action.payload;
      state.isLoading = false;
    },

    // Set selected province
    selectProvince: (state, action) => {
      state.selectedProvince = action.payload;
      // Reset child selections when province changes
      state.selectedCity = null;
      state.selectedSuburb = null;
      // Clear cities and suburbs lists
      state.cities = [];
      state.suburbs = [];
    },

    // Set selected city
    selectCity: (state, action) => {
      state.selectedCity = action.payload;
      // Reset suburb selection when city changes
      state.selectedSuburb = null;
      // Clear suburbs list
      state.suburbs = [];
    },

    // Set selected suburb
    selectSuburb: (state, action) => {
      state.selectedSuburb = action.payload;
    },

    // Reset all selections
    resetLocations: (state) => {
      state.selectedProvince = null;
      state.selectedCity = null;
      state.selectedSuburb = null;
      state.cities = [];
      state.suburbs = [];
      state.error = null;
    }
  },
});

// Export actions
export const {
  setLoading,
  setError,
  setProvinces,
  setCities,
  setSuburbs,
  selectProvince,
  selectCity,
  selectSuburb,
  resetLocations
} = locationSlice.actions;

// Selectors
export const selectAllProvinces = (state) => state.location.provinces;
export const selectAllCities = (state) => state.location.cities;
export const selectAllSuburbs = (state) => state.location.suburbs;
export const selectCurrentProvince = (state) => state.location.selectedProvince;
export const selectCurrentCity = (state) => state.location.selectedCity;
export const selectCurrentSuburb = (state) => state.location.selectedSuburb;
export const selectLocationLoading = (state) => state.location.isLoading;
export const selectLocationError = (state) => state.location.error;

export default locationSlice.reducer;