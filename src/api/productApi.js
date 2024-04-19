import { apiConfigV2 } from "./apiConfig";

export const productApi = {
  addProduct: (data) => apiConfigV2.post("/products", data),
  getProducts: () => apiConfigV2.get("/products"),
  removeProduct: (id) => apiConfigV2.delete(`/products/${id}`),
  getProduct: (id) => apiConfigV2.get(`/products/${id}`),
  updateProduct: ({ id, ...data }) => apiConfigV2.put(`/products/${id}`, data),
};
