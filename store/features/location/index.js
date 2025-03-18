import { createSlice } from '@reduxjs/toolkit';
import { locationApi } from '@/services/location';

const initialState = {
  provinces: [],
  cities: [],
  suburbs: [],
  selectedProvince: null,
  selectedCity: null,
  selectedSuburb: null
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSelectedProvince: (state, action) => {
      state.selectedProvince = action.payload;
      state.selectedCity = null;
      state.selectedSuburb = null;
      state.cities = [];
      state.suburbs = [];
    },
    setSelectedCity: (state, action) => {
      state.selectedCity = action.payload;
      state.selectedSuburb = null;
      state.suburbs = [];
    },
    setSelectedSuburb: (state, action) => {
      state.selectedSuburb = action.payload;
    },
    clearLocationSelections: (state) => {
      state.selectedProvince = null;
      state.selectedCity = null;
      state.selectedSuburb = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        locationApi.endpoints.getProvinces.matchFulfilled,
        (state, { payload }) => {
          state.provinces = payload;
        }
      )
      .addMatcher(
        locationApi.endpoints.getCities.matchFulfilled,
        (state, { payload }) => {
          state.cities = payload;
        }
      )
      .addMatcher(
        locationApi.endpoints.getSuburbs.matchFulfilled,
        (state, { payload }) => {
          state.suburbs = payload;
        }
      );
  }
});

export const {
  setSelectedProvince,
  setSelectedCity,
  setSelectedSuburb,
  clearLocationSelections
} = locationSlice.actions;

export default locationSlice.reducer;