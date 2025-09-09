import React, { useState } from "react";
import styles from "./Login.module.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { adminLoginApi, verifyOtpApi } from "../../api/auth";
import type { AppDispatch } from "../../store/store";
import { setUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";

// קומפוננטה להתחברות
const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("login");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // פונקציה התחברות
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let errors = false;

    if (!/^[^\s@]+@[^\s@]+\.(com|co\.il)$/.test(email)) {
      errors = true;
    }
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      errors = true;
    }

    // במידה ויש שגיאה
    if (errors) {
      toast.error("יש למלא את כל השדות בצורה תקינה");
      return;
    }

    // אימות התחברות
    try {
      setLoading(true);
      const res = await adminLoginApi({ email, password });
      toast.success(res.data.message);
      setStep("otp");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data?.error);
    } finally {
      setLoading(false);
    }
  };

  // פוקנציה לאימות קוד
  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await verifyOtpApi({ code: otp });
      dispatch(setUser(res.data.user));
      navigate("/");
      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {step === "login" ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.iconWrapper}>
            <span className={styles.lockIcon}>🔒</span>
          </div>
          <h2 className={styles.title}>כניסת מנהלים</h2>

          <div className={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              disabled={loading}
              autoComplete="email"
            />
            <label
              className={`${styles.label} ${email ? styles.labelActive : ""}`}
            >
              כתובת איימל
            </label>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              disabled={loading}
              autoComplete="password"
            />
            <label
              className={`${styles.label} ${
                password ? styles.labelActive : ""
              }`}
            >
              סיסמה
            </label>
          </div>

          <button
            type="submit"
            className={loading ? styles.buttonLoading : styles.button}
            disabled={loading}
          >
            {loading ? (
              <>
                <span>מתחבר...</span>
                <span className={styles.loadingSpinner}></span>
              </>
            ) : (
              "המשך לאימות"
            )}
          </button>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleOtpSubmit}>
          <h2 className={styles.title}>אימות דו-שלבי</h2>
          <p className={styles.miniTitle}>
            הזן את הקוד בן 6 הספרות שנשלח למייל
          </p>

          <div className={styles.inputGroup}>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className={styles.input}
              disabled={loading}
              maxLength={6}
            />
            <label
              className={`${styles.label} ${otp ? styles.labelActive : ""}`}
            >
              קוד אימות *
            </label>
          </div>

          <button
            type="submit"
            className={loading ? styles.buttonLoading : styles.button}
            disabled={loading}
          >
            {loading ? "בודק..." : "אמת והתחבר"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
