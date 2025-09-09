import { api } from "./api";

// סוג להתחברות
interface AdminLoginData {
  email: string;
  password: string;
}

// סוג לאימות התחברות
interface VerifyOtpData {
  code: string;
}

// התחברות
export const adminLoginApi = (data: AdminLoginData) =>
  api.post("/auth/admin/login", data);

// אימות התחברות
export const verifyOtpApi = (data: VerifyOtpData) =>
  api.post("/auth/admin/verify-otp", data);
