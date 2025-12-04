import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // כתובת הבסיס לסביבת פיתוח (לוקאלי) – אפשר לפתוח כשעובדים מקומית
  // baseURL: "https://eshop-project-react.onrender.com/api", // כתובת הבסיס לסביבת Production (שרת אמיתי / Render)
  withCredentials: true, // מבטיח שהבקשות ישלחו יחד עם cookies (כמו HttpOnly token)
});
