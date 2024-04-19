import { apiConfig } from "./apiConfig";

export const userApi = {
  addUser: (data) => apiConfig.post("/users", data),
  getUsers: () => apiConfig.get("/users"),
  remove: (id) => apiConfig.delete(`/users/${id}`),
  getUser: (id) => apiConfig.get(`/users/${id}`),
  updateUser: ({ id, ...data }) => apiConfig.put(`/users/${id}`, data),
};
