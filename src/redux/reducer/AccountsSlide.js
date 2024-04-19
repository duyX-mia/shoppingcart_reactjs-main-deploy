import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userApi } from "../../api/userApi";

const initialState = {
  accounts: [],
  account: {},
  status: "IDLE",
};

export const fetchAccounts = createAsyncThunk("accounts/fetchAll", async () => {
  try {
    const response = await userApi.getUsers();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const fetchAccount = createAsyncThunk("accounts/fetch", async (id) => {
  try {
    const response = await userApi.getUser(id);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addAccount = createAsyncThunk(
  "accounts/add",
  async (newAccount) => {
    try {
      const response = await userApi.addUser(newAccount);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteAccount = createAsyncThunk("accounts/delete", async (id) => {
  try {
    await userApi.remove(id);
    return id;
  } catch (error) {
    throw error;
  }
});

export const editAccount = createAsyncThunk(
  "accounts/edit",
  async (account) => {
    try {
      if (!account.id) {
        throw new Error("Invalid account ID");
      }

      const response = await userApi.updateUser(account);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const AccountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        if (action.payload) {
          state.accounts = action.payload;
          state.status = "SUCCESS";
        }
      })
      .addCase(fetchAccounts.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchAccounts.rejected, (state) => {
        state.status = "FAIL";
      });

    builder.addCase(deleteAccount.fulfilled, (state, { payload }) => {
      state.accounts = state.accounts.filter((it) => it.id !== payload);
    });

    builder.addCase(fetchAccount.fulfilled, (state, { payload }) => {
      state.account = payload;
    });
  },
});

export default AccountSlice;
export const selectAccountState = (state) => state.accounts;
