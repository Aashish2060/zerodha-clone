import React, { useState, useContext } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, mode = "BUY" }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  // ✅ FIX: useContext
  const generalContext = useContext(GeneralContext);

const handleOrderClick = async () => {
  try {
    console.log("ORDER:", uid, stockQuantity, stockPrice, mode);

    const res = await axios.post("https://zerodha-clone-1-8nnk.onrender.com/newOrder", {
      name: uid,
      qty: Number(stockQuantity),
      price: Number(stockPrice),
      mode: mode,
    });

    console.log("SUCCESS:", res.data);

    // ✅ CLOSE ALWAYS AFTER SUCCESS
    generalContext.closeBuyWindow();

  } catch (error) {
    console.error("Order failed:", error.response?.data || error.message);

    // 🔥 IMPORTANT: even on error close window (optional but recommended)
    generalContext.closeBuyWindow();
  }
};

  const handleCancelClick = () => {
    // ✅ FIX
    generalContext.closeBuyWindow();
  };

  return (
    <div className="container" id="buy-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              step="0.05"
              value={stockPrice}
              onChange={(e) => setStockPrice(e.target.value)}
            />
          </fieldset>
        </div>
      </div>

      <div className="buttons">
        <span>
          Margin required ₹{(stockQuantity * stockPrice || 0).toFixed(2)}
        </span>

        <div>
          {/* ✅ FIX: button instead of Link */}
          <button
            className={`btn ${
              mode === "BUY" ? "btn-blue" : "btn-red"
            }`}
            onClick={handleOrderClick}
          >
            {mode}
          </button>

          {/* ✅ FIX */}
          <button className="btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;