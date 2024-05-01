import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryApi } from "../../api/categoryApi";
import { PAGINATION_LIMIT } from "../../constant/constant";

const initialState = {
  categories: [],
  category: {},
  status: "IDLE",
  meta: {},
  totalCategories: [],
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (params) => {
    try {
      const { data } = await categoryApi.getCategories({
        search: params?.search,
      });
      const response = await categoryApi.getCategories({
        page: 1,
        limit: PAGINATION_LIMIT,
        ...params,
      });
      return {
        totalCategories: data,
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

export const getCategory = createAsyncThunk(
  "category/getCategory",
  async (id) => {
    try {
      const response = await categoryApi.getCategory(id);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addCategory = createAsyncThunk("category/add", async (newData) => {
  try {
    const response = await categoryApi.addCategory(newData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id) => {
    try {
      await categoryApi.removeCategory(id);
      return id;
    } catch (error) {
      throw error;
    }
  }
);

export const editCategory = createAsyncThunk("category/edit", async (data) => {
  try {
    if (!data.id) {
      throw new Error("Invalid ID");
    }

    const response = await categoryApi.updateCategory(data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategory: (state) => {
      state.category = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload.data;
      state.meta = payload.meta;
      state.totalCategories = payload.totalCategories;
    });

    builder.addCase(deleteCategory.fulfilled, (state, { payload }) => {
      state.categories = state.categories.filter((it) => it.id !== payload);
    });

    builder.addCase(getCategory.fulfilled, (state, { payload }) => {
      state.category = payload;
    });
  },
});

export default categorySlice.reducer;
export const { resetCategory } = categorySlice.actions;
export const selectCategories = (state) => state.category;
