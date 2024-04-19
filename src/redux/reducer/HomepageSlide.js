import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  slides: [],
  status: "IDLE",
};

export const fetchCarouselImage = createAsyncThunk(
  "homepage/carousel/fetch",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/carouselImages");
      return response.data;
    } catch (error) {
      console.error("Error when get carousel slide");
      throw error;
    }
  }
);

export const HomepageSlice = createSlice({
  name: "homepage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarouselImage.fulfilled, (state, action) => {
        state.slides = action.payload;
        state.status = "SUCCESS";
      })
      .addCase(fetchCarouselImage.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchCarouselImage.rejected, (state) => {
        state.status = "FAIL";
      });
  },
});

export default HomepageSlice;
export const selectHomepageState = (state) => state.homepage;
