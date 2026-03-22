import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// 🔑 Replace with your actual Google Client ID
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

const Login = () => {
  const googleBtnRef = useRef(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://zerodha-clone-1-8nnk.onrender.com/api/auth";

  useEffect(() => {
    const loadGoogleScript = () => {
      if (document.getElementById("google-gsi-script")) {
        initGoogleButton();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.id = "google-gsi-script";
      script.async = true;
      script.defer = true;
      script.onload = initGoogleButton;
      document.body.appendChild(script);
    };

    const initGoogleButton = () => {
      if (!window.google || !googleBtnRef.current) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleSuccess,
      });
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: "outline",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
        width: 394,
      });
    };

    loadGoogleScript();
  }, []);

  // ✅ THE FIX: Pass token in URL so port 3001 can read it
  // localStorage on port 3000 is invisible to port 3001
  const redirectToDashboard = (token, user) => {
    const name = encodeURIComponent(user?.name || "");
window.location.href = `https://zerodha-clone-c64p.vercel.app?token=${token}&name=${name}`;
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${API_URL}/google`, {
        token: credentialResponse.credential,
      });
      redirectToDashboard(response.data.token, response.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Google login failed. Please try again.");
      console.error("Google login error:", err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!email || !password) {
        setError("Email and password are required");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/login`, { email, password });

      // ✅ Pass token in URL — NOT just localStorage
      redirectToDashboard(response.data.token, response.data.user);

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        .login-page {
          min-height: 100vh; display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f0f4ff; position: relative; overflow: hidden;
        }
        .login-page::before {
          content: ''; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(33, 90, 208, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(33, 90, 208, 0.04) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none;
        }
        .left-panel {
          flex: 1; display: flex; flex-direction: column;
          justify-content: center; padding: 60px 72px; position: relative;
        }
        .brand-logo {
          position: absolute; top: 40px; left: 60px;
          display: flex; align-items: center; gap: 10px;
        }
        .logo-mark {
          width: 38px; height: 38px;
          background: linear-gradient(135deg, #215ad0, #1a45a8);
          border-radius: 9px; display: flex; align-items: center;
          justify-content: center; font-weight: 700; font-size: 19px;
          color: white; box-shadow: 0 4px 14px rgba(33, 90, 208, 0.35);
        }
        .logo-text { font-size: 22px; font-weight: 700; color: #0d1b3e; letter-spacing: -0.5px; }
        .tagline-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(33, 90, 208, 0.08); border: 1px solid rgba(33, 90, 208, 0.18);
          border-radius: 20px; padding: 6px 14px; margin-bottom: 28px;
        }
        .badge-dot { width: 6px; height: 6px; background: #215ad0; border-radius: 50%; animation: blink 2s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .tagline-badge span { font-size: 12px; color: #215ad0; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }
        .hero-heading { font-size: 46px; font-weight: 700; color: #0d1b3e; line-height: 1.12; letter-spacing: -1.5px; margin-bottom: 18px; }
        .hero-heading .accent { color: #215ad0; }
        .hero-sub { font-size: 15px; color: #5a6a8a; line-height: 1.75; margin-bottom: 52px; font-weight: 400; max-width: 380px; }
        .stats-row { display: flex; gap: 36px; align-items: center; }
        .stat-item .val { font-size: 26px; font-weight: 700; color: #0d1b3e; letter-spacing: -0.5px; }
        .stat-item .lbl { font-size: 11px; color: #8a9ab8; margin-top: 2px; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 500; }
        .stat-sep { width: 1px; height: 36px; background: #d0d8ee; }
        .trust-row { display: flex; gap: 20px; margin-top: 52px; flex-wrap: wrap; }
        .trust-chip { display: flex; align-items: center; gap: 6px; background: white; border: 1px solid #dce4f5; border-radius: 8px; padding: 8px 14px; font-size: 12px; color: #3a4a6b; font-weight: 500; box-shadow: 0 1px 4px rgba(33, 90, 208, 0.06); }
        .right-panel { width: 490px; background: white; border-left: 1px solid #dce4f5; display: flex; flex-direction: column; justify-content: center; padding: 52px 48px; position: relative; box-shadow: -8px 0 40px rgba(33, 90, 208, 0.06); }
        .form-header { margin-bottom: 28px; }
        .form-header h2 { font-size: 26px; font-weight: 700; color: #0d1b3e; letter-spacing: -0.5px; margin-bottom: 5px; }
        .form-header p { font-size: 13px; color: #8a9ab8; }
        .google-btn-container { width: 100%; margin-bottom: 22px; display: flex; justify-content: center; min-height: 44px; }
        .divider { display: flex; align-items: center; gap: 12px; margin-bottom: 22px; }
        .divider hr { flex: 1; border: none; border-top: 1px solid #e8edf7; }
        .divider span { font-size: 11px; color: #b0bcd8; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; white-space: nowrap; }
        .login-form { display: flex; flex-direction: column; gap: 15px; }
        .form-row { display: flex; flex-direction: column; gap: 5px; }
        .form-row label { font-size: 11px; font-weight: 600; color: #8a9ab8; text-transform: uppercase; letter-spacing: 0.8px; }
        .form-row input { width: 100%; background: #f7f9fe; border: 1.5px solid #e0e8f6; border-radius: 9px; padding: 11px 14px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #0d1b3e; outline: none; transition: border-color 0.18s, background 0.18s, box-shadow 0.18s; }
        .form-row input::placeholder { color: #b8c5de; }
        .form-row input:focus { border-color: #215ad0; background: white; box-shadow: 0 0 0 3px rgba(33, 90, 208, 0.08); }
        .forgot-row { display: flex; justify-content: flex-end; margin-top: -8px; }
        .forgot-link { font-size: 12px; color: #215ad0; text-decoration: none; font-weight: 500; }
        .forgot-link:hover { text-decoration: underline; }
        .error-box { background: #fff0f0; border: 1px solid #fbc8c8; border-radius: 8px; padding: 10px 14px; font-size: 13px; color: #c0392b; text-align: center; margin-bottom: 14px; }
        .submit-btn { width: 100%; background: linear-gradient(135deg, #215ad0, #1a45a8); color: white; border: none; border-radius: 9px; padding: 13px; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; margin-top: 4px; letter-spacing: -0.2px; box-shadow: 0 4px 16px rgba(33, 90, 208, 0.3); transition: opacity 0.18s, transform 0.1s, box-shadow 0.18s; }
        .submit-btn:hover:not(:disabled) { opacity: 0.92; box-shadow: 0 6px 20px rgba(33, 90, 208, 0.4); }
        .submit-btn:active:not(:disabled) { transform: scale(0.99); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .form-footer { text-align: center; margin-top: 18px; font-size: 13px; color: #8a9ab8; }
        .form-footer a { color: #215ad0; text-decoration: none; font-weight: 600; }
        .form-footer a:hover { text-decoration: underline; }
        .terms-note { font-size: 11px; color: #b0bcd8; text-align: center; margin-top: 14px; line-height: 1.7; }
        .terms-note a { color: #8a9ab8; text-decoration: underline; }
        @media (max-width: 900px) {
          .left-panel { display: none; }
          .right-panel { width: 100%; border-left: none; padding: 40px 24px; box-shadow: none; }
        }
      `}</style>

      <div className="login-page">
        <div className="left-panel">
          <div className="brand-logo">
            <div className="logo-mark">Z</div>
            <span className="logo-text">Zerodha</span>
          </div>
          <div style={{ maxWidth: 460 }}>
            <div className="tagline-badge">
              <div className="badge-dot"></div>
              <span>India's No. 1 Broker</span>
            </div>
            <h1 className="hero-heading">
              Welcome<br /><span className="accent">back to</span><br />Zerodha.
            </h1>
            <p className="hero-sub">
              Your portfolio is waiting. Log in to track your investments,
              place orders, and stay on top of the markets — all in one place.
            </p>
            <div className="stats-row">
              <div className="stat-item"><div className="val">₹0</div><div className="lbl">Equity Delivery</div></div>
              <div className="stat-sep"></div>
              <div className="stat-item"><div className="val">1.3Cr+</div><div className="lbl">Active Clients</div></div>
              <div className="stat-sep"></div>
              <div className="stat-item"><div className="val">15+</div><div className="lbl">Years Trusted</div></div>
            </div>
            <div className="trust-row">
              <div className="trust-chip">🔒 SEBI Regulated</div>
              <div className="trust-chip">⚡ Instant KYC</div>
              <div className="trust-chip">📱 Mobile First</div>
            </div>
          </div>
        </div>

        <div className="right-panel">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p>Login to access your Zerodha account</p>
          </div>
          <div className="google-btn-container" ref={googleBtnRef}></div>
          <div className="divider"><hr /><span>or login with email</span><hr /></div>
          {error && <div className="error-box">{error}</div>}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-row">
              <label>Email</label>
              <input type="email" value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="rahul@example.com" />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input type="password" value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Enter your password" />
            </div>
            <div className="forgot-row">
              <a href="/forgot-password" className="forgot-link">Forgot password?</a>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login to Account →"}
            </button>
          </form>
          <p className="form-footer">
            Don't have an account? <a href="/signup">Sign up here</a>
          </p>
          <p className="terms-note">
            Protected by <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;