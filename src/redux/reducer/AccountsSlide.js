import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../../api/userApi";
import { PAGINATION_LIMIT } from "../../constant/constant";

const initialState = {
  accounts: [],
  account: {},
  status: "IDLE",
  meta: {},
  totalAccounts: [],
};

export const fetchAccounts = createAsyncThunk(
  "accounts/fetchAll",
  async (params) => {
    try {
      const { data } = await userApi.getUsers({
        search: params?.search,
      });
      const response = await userApi.getUsers({
        page: 1,
        limit: PAGINATION_LIMIT,
        ...params,
      });
      return {
        totalAccounts: data,
        data: response.data,
        meta: {
          page: params?.page || 1,
          limit: PAGINATION_LIMIT,
          totalPage: Math.ceil(data.length / PAGINATION_LIMIT),
        },
      };
    } catch (error) {
      throw error;
    }
  }
);

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
  reducers: {
    resetAccount: (state) => {
      state.account = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.fulfilled, (state, { payload }) => {
        state.accounts = payload.data;
        state.meta = payload.meta;
        state.status = "SUCCESS";
        state.totalAccounts = payload.totalAccounts;
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
export const { resetAccount } = AccountSlice.actions;
export const selectAccountState = (state) => state.accounts;
