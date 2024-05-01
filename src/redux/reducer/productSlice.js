import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productApi } from "../../api/productApi";
import { PAGINATION_LIMIT } from "../../constant/constant";

const initialState = {
  products: [],
  product: {},
  status: "IDLE",
  meta: {},
};

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (params) => {
    try {
      const { data } = await productApi.getProducts({
        name: params?.name,
        categoryId: params?.categoryId,
      });
      const response = await productApi.getProducts({
        page: 1,
        limit: PAGINATION_LIMIT,
        ...params,
      });
      return {
        data: response.data,
        meta: {
          page: params?.page || 1,
          limit: PAGINATION_LIMIT,
          totalPage: Math.ceil(
            data.length / (params?.limit || PAGINATION_LIMIT)
          ),
        },
      };
    } catch (error) {
      throw error;
    }
  }
);

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
    resetProduct: (state) => {
      state.product = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.products = payload.data;
      state.meta = payload.meta;
    });

    builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
      state.products = state.products.filter((it) => it.id !== payload);
    });

    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.product = payload;
    });

    builder.addCase(getProducts.rejected, (state) => {
      state.products = [];
      state.meta = {};
    });
  },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
export const selectProduct = (state) => state.product;
