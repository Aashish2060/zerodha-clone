import React, { useState } from "react";

const Apps = () => {
  const [showConfirm, setShowConfirm] = useState(false);

  // Read user from localStorage
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  })();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "http://localhost:3000/login";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap');

        .apps-page {
          font-family: 'DM Sans', sans-serif;
          padding: 32px;
          background: #f7f9fe;
          min-height: 100vh;
        }

        .apps-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e0e8f6;
        }

        .apps-title {
          font-size: 22px;
          font-weight: 700;
          color: #0d1b3e;
          letter-spacing: -0.5px;
        }

        .apps-subtitle {
          font-size: 13px;
          color: #8a9ab8;
          margin-top: 3px;
        }

        /* User info card */
        .user-card {
          background: white;
          border: 1px solid #e0e8f6;
          border-radius: 14px;
          padding: 24px;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 2px 12px rgba(33, 90, 208, 0.06);
        }

        .user-avatar {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, #215ad0, #1a45a8);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .user-info .user-name {
          font-size: 16px;
          font-weight: 600;
          color: #0d1b3e;
        }

        .user-info .user-label {
          font-size: 12px;
          color: #8a9ab8;
          margin-top: 2px;
        }

        /* Apps grid */
        .apps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 32px;
        }

        .app-card {
          background: white;
          border: 1px solid #e0e8f6;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          box-shadow: 0 1px 4px rgba(33, 90, 208, 0.05);
          transition: box-shadow 0.18s, border-color 0.18s;
          cursor: pointer;
        }

        .app-card:hover {
          border-color: #215ad0;
          box-shadow: 0 4px 16px rgba(33, 90, 208, 0.12);
        }

        .app-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }

        .app-name {
          font-size: 14px;
          font-weight: 600;
          color: #0d1b3e;
        }

        .app-desc {
          font-size: 12px;
          color: #8a9ab8;
          line-height: 1.5;
        }

        .app-tag {
          display: inline-flex;
          align-items: center;
          background: #f0f4ff;
          border: 1px solid #dce4f5;
          border-radius: 20px;
          padding: 3px 10px;
          font-size: 11px;
          color: #215ad0;
          font-weight: 500;
          width: fit-content;
        }

        /* Logout section */
        .logout-section {
          background: white;
          border: 1px solid #e0e8f6;
          border-radius: 14px;
          padding: 24px;
          box-shadow: 0 2px 12px rgba(33, 90, 208, 0.06);
        }

        .logout-section h3 {
          font-size: 15px;
          font-weight: 600;
          color: #0d1b3e;
          margin-bottom: 6px;
        }

        .logout-section p {
          font-size: 13px;
          color: #8a9ab8;
          margin-bottom: 16px;
        }

        .btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-logout {
          background: #fff0f0;
          color: #c0392b;
          border: 1.5px solid #fbc8c8;
          border-radius: 9px;
          padding: 10px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s;
        }

        .btn-logout:hover {
          background: #ffe0e0;
          border-color: #f5a0a0;
        }

        .btn-home {
          background: linear-gradient(135deg, #215ad0, #1a45a8);
          color: white;
          border: none;
          border-radius: 9px;
          padding: 10px 22px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(33, 90, 208, 0.25);
          transition: opacity 0.18s;
        }

        .btn-home:hover { opacity: 0.9; }

        /* Confirm dialog */
        .confirm-overlay {
          position: fixed;
          inset: 0;
          background: rgba(13, 27, 62, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .confirm-box {
          background: white;
          border-radius: 16px;
          padding: 32px;
          width: 360px;
          box-shadow: 0 20px 60px rgba(13, 27, 62, 0.2);
          text-align: center;
        }

        .confirm-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .confirm-box h3 {
          font-size: 18px;
          font-weight: 700;
          color: #0d1b3e;
          margin-bottom: 8px;
        }

        .confirm-box p {
          font-size: 13px;
          color: #8a9ab8;
          margin-bottom: 24px;
          line-height: 1.6;
        }

        .confirm-btns {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .btn-cancel {
          background: #f0f4ff;
          color: #215ad0;
          border: 1.5px solid #dce4f5;
          border-radius: 9px;
          padding: 10px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s;
        }

        .btn-cancel:hover { background: #e0e8f6; }

        .btn-confirm-logout {
          background: #c0392b;
          color: white;
          border: none;
          border-radius: 9px;
          padding: 10px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.18s;
        }

        .btn-confirm-logout:hover { opacity: 0.88; }
      `}</style>

      <div className="apps-page">

        {/* Header */}
        <div className="apps-header">
          <div>
            <div className="apps-title">Apps & Settings</div>
            <div className="apps-subtitle">Manage your connected apps and account</div>
          </div>
        </div>

        {/* User Info */}
        <div className="user-card">
          <div className="user-avatar">
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="user-info">
            <div className="user-name">{user?.name || "User"}</div>
            <div className="user-label">Zerodha Account · Active</div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="apps-grid">
          {[
            { icon: "📊", name: "Kite", desc: "Trade stocks, F&O, and more", color: "#e8f4fd", tag: "Trading" },
            { icon: "📈", name: "Console", desc: "Reports, statements & tax P&L", color: "#e8fdf0", tag: "Analytics" },
            { icon: "💰", name: "Coin", desc: "Direct mutual fund investments", color: "#fdf8e8", tag: "Invest" },
            { icon: "🔔", name: "Nudge", desc: "Smart nudges for better investing", color: "#f8e8fd", tag: "Alerts" },
            { icon: "📰", name: "Pulse", desc: "Market news and insights", color: "#fde8e8", tag: "News" },
            { icon: "🛡️", name: "Kite Connect", desc: "API platform for developers", color: "#e8edf8", tag: "Developer" },
          ].map((app) => (
            <div className="app-card" key={app.name}>
              <div className="app-icon" style={{ background: app.color }}>{app.icon}</div>
              <div className="app-name">{app.name}</div>
              <div className="app-desc">{app.desc}</div>
              <div className="app-tag">{app.tag}</div>
            </div>
          ))}
        </div>

        {/* Logout Section */}
        <div className="logout-section">
          <h3>Account Actions</h3>
          <p>Go back to the Zerodha home page or logout of your account securely.</p>
          <div className="btn-row">
            <button
              className="btn-home"
              onClick={() => window.location.href = "http://localhost:3000"}
            >
              🏠 Go to Home
            </button>
            <button
              className="btn-logout"
              onClick={() => setShowConfirm(true)}
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirm Dialog */}
      {showConfirm && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <div className="confirm-icon">🚪</div>
            <h3>Logout of Zerodha?</h3>
            <p>You'll be taken back to the login page. Your data is safe and will be here when you return.</p>
            <div className="confirm-btns">
              <button className="btn-cancel" onClick={() => setShowConfirm(false)}>
                Cancel
              </button>
              <button className="btn-confirm-logout" onClick={handleLogout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Apps;