import { apiConfig } from "./apiConfig";

export const userApi = {
  addUser: (data) => apiConfig.post("/users", data),
  getUsers: (params) =>
    apiConfig.get("/users", {
      params,
    }),
  remove: (id) => apiConfig.delete(`/users/${id}`),
  getUser: (id) => apiConfig.get(`/users/${id}`),
  updateUser: ({ id, ...data }) => apiConfig.put(`/users/${id}`, data),
};
