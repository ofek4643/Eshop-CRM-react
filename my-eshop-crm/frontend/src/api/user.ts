import { api } from "./api";

// משיכת משתמשים
export const getUsersApi = () => api.get("/user/admin/list/users");

// משיכת משתמש אדמין
export const getAdminApi = () => api.get("/user/admin");

// מחיקת משתמש לפי ID
export const deleteUserApi = (id: string) =>
  api.delete(`/user/admin/delete/${id}`);

// משיכת משתמש לפי ID
export const getUserByIdApi = (id: string) => api.get(`/user/admin/${id}`);

// שינוי הרשאות למשתמש לפי ID
export const switchPermissionsApi = (id: string, newRole: string) =>
  api.post(`/user/admin/switchPermissions/${id}`, { newRole });

// התנתקות
export const logoutUser = () => api.post("/auth/logout");
