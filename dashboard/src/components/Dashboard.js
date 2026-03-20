import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const name = params.get("name");

    console.log("TOKEN:", token);
    console.log("NAME:", name);

    // ✅ store token
    if (token) {
      localStorage.setItem("token", token);
    }

    // ✅ store user name
    if (name && name !== "undefined") {
      localStorage.setItem("user", JSON.stringify({ name }));
    }

    // ✅ clean URL AFTER storing (safe delay)
    if (token || name) {
      setTimeout(() => {
        window.history.replaceState({}, document.title, "/");
      }, 500);
    }

  }, []);

  return (
    <div className="dashboard-container">
      <GeneralContextProvider>
        <WatchList />
      
        <div className="content">
          <Routes>
            <Route path="/" element={<Summary />} />
            <Route path="orders" element={<Orders />} />
            <Route path="holdings" element={<Holdings />} />
            <Route path="positions" element={<Positions />} />
            <Route path="funds" element={<Funds />} />
            <Route path="apps" element={<Apps />} />
          </Routes>
        </div>
      </GeneralContextProvider>
    </div>
  );
};

export default Dashboard;