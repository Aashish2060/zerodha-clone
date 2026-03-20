import React, { useState, createContext } from "react";
import BuyActionWindow from "./BuyActionWindow";

// ✅ Context create
const GeneralContext = createContext({
  openBuyWindow: (uid, mode) => {},
  closeBuyWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [orderMode, setOrderMode] = useState("BUY");

  // ✅ OPEN (BUY / SELL)
  const handleOpenBuyWindow = (uid, mode = "BUY") => {
    console.log("OPEN WINDOW:", uid, mode); // 🔥 DEBUG

    setSelectedStockUID(uid);
    setOrderMode(mode);
    setIsBuyWindowOpen(true);
  };

  // ✅ CLOSE
  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setOrderMode("BUY");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
      }}
    >
      {children}

      {/* ✅ BUY / SELL WINDOW */}
      {isBuyWindowOpen && selectedStockUID && (
        <BuyActionWindow
          uid={selectedStockUID}
          mode={orderMode}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;