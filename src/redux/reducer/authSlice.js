import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";

export const signUp = createAsyncThunk("auth/signup", async (data) => {
  try {
    const res = await userApi.addUser(data);
    return res.data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogged: false,
    userInfo: {},
  },
  reducers: {
    signIn: (state, { payload }) => {
      state.isLogged = true;
      state.userInfo = payload;
    },
    signOut: (state) => {
      state.isLogged = false;
      state.userInfo = {};
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice;
