import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 🔑 Replace with your actual Google Client ID from console.cloud.google.com
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com";

const Signup = () => {
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3002/api/auth";

  // ✅ Load Google Identity Services script and render button
  useEffect(() => {
    const loadGoogleScript = () => {
      // Avoid adding script twice
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
        text: "signup_with",
        shape: "rectangular",
        width: 394,
      });
    };

    loadGoogleScript();
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${API_URL}/google`, {
        token: credentialResponse.credential,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Google sign-up failed. Please try again.");
      console.error("Google signup error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const response = await axios.post(`${API_URL}/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Error signing up");
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }

        .signup-page {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f0f4ff;
          position: relative;
          overflow: hidden;
        }

        .signup-page::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(33, 90, 208, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(33, 90, 208, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .left-panel {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 60px 72px;
          position: relative;
        }

        .brand-logo {
          position: absolute;
          top: 40px;
          left: 60px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-mark {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, #215ad0, #1a45a8);
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 19px;
          color: white;
          box-shadow: 0 4px 14px rgba(33, 90, 208, 0.35);
        }

        .logo-text {
          font-size: 22px;
          font-weight: 700;
          color: #0d1b3e;
          letter-spacing: -0.5px;
        }

        .tagline-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(33, 90, 208, 0.08);
          border: 1px solid rgba(33, 90, 208, 0.18);
          border-radius: 20px;
          padding: 6px 14px;
          margin-bottom: 28px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: #215ad0;
          border-radius: 50%;
          animation: blink 2s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .tagline-badge span {
          font-size: 12px;
          color: #215ad0;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .hero-heading {
          font-size: 46px;
          font-weight: 700;
          color: #0d1b3e;
          line-height: 1.12;
          letter-spacing: -1.5px;
          margin-bottom: 18px;
        }

        .hero-heading .accent { color: #215ad0; }

        .hero-sub {
          font-size: 15px;
          color: #5a6a8a;
          line-height: 1.75;
          margin-bottom: 52px;
          font-weight: 400;
          max-width: 380px;
        }

        .stats-row {
          display: flex;
          gap: 36px;
          align-items: center;
        }

        .stat-item .val {
          font-size: 26px;
          font-weight: 700;
          color: #0d1b3e;
          letter-spacing: -0.5px;
        }

        .stat-item .lbl {
          font-size: 11px;
          color: #8a9ab8;
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          font-weight: 500;
        }

        .stat-sep {
          width: 1px;
          height: 36px;
          background: #d0d8ee;
        }

        .trust-row {
          display: flex;
          gap: 20px;
          margin-top: 52px;
          flex-wrap: wrap;
        }

        .trust-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: white;
          border: 1px solid #dce4f5;
          border-radius: 8px;
          padding: 8px 14px;
          font-size: 12px;
          color: #3a4a6b;
          font-weight: 500;
          box-shadow: 0 1px 4px rgba(33, 90, 208, 0.06);
        }

        /* Right Panel */
        .right-panel {
          width: 490px;
          background: white;
          border-left: 1px solid #dce4f5;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 52px 48px;
          position: relative;
          box-shadow: -8px 0 40px rgba(33, 90, 208, 0.06);
        }

        .form-header {
          margin-bottom: 28px;
        }

        .form-header h2 {
          font-size: 26px;
          font-weight: 700;
          color: #0d1b3e;
          letter-spacing: -0.5px;
          margin-bottom: 5px;
        }

        .form-header p {
          font-size: 13px;
          color: #8a9ab8;
        }

        /* Google button container */
        .google-btn-container {
          width: 100%;
          margin-bottom: 22px;
          display: flex;
          justify-content: center;
          min-height: 44px;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 22px;
        }

        .divider hr {
          flex: 1;
          border: none;
          border-top: 1px solid #e8edf7;
        }

        .divider span {
          font-size: 11px;
          color: #b0bcd8;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          white-space: nowrap;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .form-row {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .form-row label {
          font-size: 11px;
          font-weight: 600;
          color: #8a9ab8;
          text-transform: uppercase;
          letter-spacing: 0.8px;
        }

        .form-row input {
          width: 100%;
          background: #f7f9fe;
          border: 1.5px solid #e0e8f6;
          border-radius: 9px;
          padding: 11px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #0d1b3e;
          outline: none;
          transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
        }

        .form-row input::placeholder { color: #b8c5de; }

        .form-row input:focus {
          border-color: #215ad0;
          background: white;
          box-shadow: 0 0 0 3px rgba(33, 90, 208, 0.08);
        }

        .error-box {
          background: #fff0f0;
          border: 1px solid #fbc8c8;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #c0392b;
          text-align: center;
          margin-bottom: 14px;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #215ad0, #1a45a8);
          color: white;
          border: none;
          border-radius: 9px;
          padding: 13px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          margin-top: 4px;
          letter-spacing: -0.2px;
          box-shadow: 0 4px 16px rgba(33, 90, 208, 0.3);
          transition: opacity 0.18s, transform 0.1s, box-shadow 0.18s;
        }

        .submit-btn:hover:not(:disabled) {
          opacity: 0.92;
          box-shadow: 0 6px 20px rgba(33, 90, 208, 0.4);
        }

        .submit-btn:active:not(:disabled) { transform: scale(0.99); }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .form-footer {
          text-align: center;
          margin-top: 18px;
          font-size: 13px;
          color: #8a9ab8;
        }

        .form-footer a {
          color: #215ad0;
          text-decoration: none;
          font-weight: 600;
        }

        .form-footer a:hover { text-decoration: underline; }

        .terms-note {
          font-size: 11px;
          color: #b0bcd8;
          text-align: center;
          margin-top: 14px;
          line-height: 1.7;
        }

        .terms-note a { color: #8a9ab8; text-decoration: underline; }

        @media (max-width: 900px) {
          .left-panel { display: none; }
          .right-panel {
            width: 100%;
            border-left: none;
            padding: 40px 24px;
            box-shadow: none;
          }
        }
      `}</style>

      <div className="signup-page">

        {/* ── Left Panel ── */}
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
              Invest in your<br />
              <span className="accent">financial future</span><br />
              today.
            </h1>

            <p className="hero-sub">
              Join over 1.3 crore investors who trust Zerodha for stocks,
              F&amp;O, mutual funds, and more — at industry-lowest brokerage.
            </p>

            <div className="stats-row">
              <div className="stat-item">
                <div className="val">₹0</div>
                <div className="lbl">Equity Delivery</div>
              </div>
              <div className="stat-sep"></div>
              <div className="stat-item">
                <div className="val">1.3Cr+</div>
                <div className="lbl">Active Clients</div>
              </div>
              <div className="stat-sep"></div>
              <div className="stat-item">
                <div className="val">15+</div>
                <div className="lbl">Years Trusted</div>
              </div>
            </div>

            <div className="trust-row">
              <div className="trust-chip">🔒 SEBI Regulated</div>
              <div className="trust-chip">⚡ Instant KYC</div>
              <div className="trust-chip">📱 Mobile First</div>
            </div>
          </div>
        </div>

        {/* ── Right Panel ── */}
        <div className="right-panel">
          <div className="form-header">
            <h2>Create Account</h2>
            <p>Start your investment journey in minutes</p>
          </div>

          {/* ✅ Google button rendered via GSI script — no library needed */}
          <div className="google-btn-container" ref={googleBtnRef}></div>

          <div className="divider">
            <hr />
            <span>or sign up with email</span>
            <hr />
          </div>

          {error && <div className="error-box">{error}</div>}

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-row">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Rahul Sharma"
              />
            </div>

            <div className="form-row">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="rahul@example.com"
              />
            </div>

            <div className="form-row">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
              />
            </div>

            <div className="form-row">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account →"}
            </button>
          </form>

          <p className="form-footer">
            Already have an account? <a href="/login">Login here</a>
          </p>

          <p className="terms-note">
            By signing up, you agree to our{" "}
            <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;