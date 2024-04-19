import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productApi } from "../../api/productApi";

const initialState = {
  products: [],
  product: {},
  productsFilter: [],
  status: "IDLE",
};

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    const response = await productApi.getProducts();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getProduct = createAsyncThunk("product/getProduct", async (id) => {
  try {
    const response = await productApi.getProduct(id);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const addProduct = createAsyncThunk("product/add", async (newData) => {
  try {
    const response = await productApi.addProduct(newData);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteProduct = createAsyncThunk("product/delete", async (id) => {
  try {
    await productApi.removeProduct(id);
    return id;
  } catch (error) {
    throw error;
  }
});

export const editProduct = createAsyncThunk("product/edit", async (data) => {
  try {
    if (!data.id) {
      throw new Error("Invalid ID");
    }

    const response = await productApi.updateProduct(data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductByCategoryId: (state, { payload }) => {
      state.productsFilter = state.products.filter(
        (it) => it.categoryId === payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload;
        state.productsFilter = action.payload;
      }
    });

    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.products = state.products.filter((it) => it.id !== payload);
    });

    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.product = payload;
    });
  },
});

export const { getProductByCategoryId } = productSlice.actions;
export default productSlice.reducer;
export const selectProduct = (state) => state.product;
