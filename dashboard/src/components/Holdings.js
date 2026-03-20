import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "./VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  // ✅ FETCH DATA + AUTO REFRESH
  useEffect(() => {
    const fetchHoldings = () => {
      axios
        .get("http://localhost:3002/allHoldings")
        .then((res) => {
          setAllHoldings(res.data);
        })
        .catch((err) => console.error(err));
    };

    fetchHoldings();

    // 🔥 Auto refresh every 2 sec
    const interval = setInterval(fetchHoldings, 2000);

    return () => clearInterval(interval);
  }, []);

  // ✅ GRAPH DATA
  const labels = allHoldings.map((item) => item.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  // ✅ CALCULATIONS
  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty,
    0
  );

  const currentValue = allHoldings.reduce(
    (acc, stock) => acc + stock.price * stock.qty,
    0
  );

  const pnl = currentValue - totalInvestment;
  const pnlPercent =
    totalInvestment === 0
      ? 0
      : ((pnl / totalInvestment) * 100).toFixed(2);

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {/* ✅ TABLE */}
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              <th>Day chg.</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnlValue = curValue - stock.avg * stock.qty;

              const isProfit = pnlValue >= 0;
              const profClass = isProfit ? "profit" : "loss";
              const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>

                  <td className={profClass}>
                    {pnlValue.toFixed(2)}
                  </td>

                  <td className={profClass}>
                    {stock.net || "0%"}
                  </td>

                  <td className={dayClass}>
                    {stock.day || "0%"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ✅ SUMMARY */}
      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 className={pnl >= 0 ? "profit" : "loss"}>
            {pnl.toFixed(2)} ({pnlPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>

      {/* ✅ GRAPH */}
      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;