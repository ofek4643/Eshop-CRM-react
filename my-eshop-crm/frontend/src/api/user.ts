import { api } from "./api";

export const getUsersApi = () => api.get("/user/admin/list/users");

export const getAdminApi = () => api.get("/user/admin");

export const deleteUserApi = (id: string) =>
  api.delete(`/user/admin/delete/${id}`);

export const getUserByIdApi = (id: string) => api.get(`/user/admin/${id}`);

export const switchPermissionsApi = (id: string, newRole: string) =>
  api.post(`/user/admin/switchPermissions/${id}`, { newRole });

export const logoutUser = () => api.post("/auth/logout");
