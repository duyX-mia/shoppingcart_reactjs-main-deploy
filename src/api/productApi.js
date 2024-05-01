import { apiConfigV2 } from "./apiConfig";

export const productApi = {
  addProduct: (data) => apiConfigV2.post("/products", data),
  getProducts: (params) => apiConfigV2.get("/products", { params }),
  removeProduct: (id) => apiConfigV2.delete(`/products/${id}`),
  getProduct: (id) => apiConfigV2.get(`/products/${id}`),
  updateProduct: ({ id, ...data }) => apiConfigV2.put(`/products/${id}`, data),
};
