import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoryApi } from "../../api/categoryApi";

const initialState = {
  categories: [],
  category: {},
  status: "IDLE",
};

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async () => {
    try {
      const response = await categoryApi.getCategories();
      return response.data;
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      if (action.payload) {
        state.categories = action.payload;
      }
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
export const selectCategories = (state) => state.category;
