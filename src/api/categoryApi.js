import { apiConfigV2 } from "./apiConfig";

export const categoryApi = {
  addCategory: (data) => apiConfigV2.post("/categories", data),
  getCategories: (params) => apiConfigV2.get("/categories", { params }),
  removeCategory: (id) => apiConfigV2.delete(`/categories/${id}`),
  getCategory: (id) => apiConfigV2.get(`/categories/${id}`),
  updateCategory: ({ id, ...data }) =>
    apiConfigV2.put(`/categories/${id}`, data),
};
