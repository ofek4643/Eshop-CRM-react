import { api } from "./api";

interface AdminLoginData {
  email: string;
  password: string;
}

interface VerifyOtpData {
  code: string;
}

// התחברות מנהל
export const adminLoginApi = (data: AdminLoginData) =>
  api.post("/auth/admin/login", data);

// אימות OTP
export const verifyOtpApi = (data: VerifyOtpData) =>
  api.post("/auth/admin/verify-otp", data);
