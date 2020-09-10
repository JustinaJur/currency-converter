import React, { useEffect, useState } from "react";

import { getCurrenciesList, getCurrencyRate } from "../Api/index.js";

const CurrenciesList = () => {
  const [currenciesList, setCurrenciesList] = useState([]);
  const [selectedCurrency, setCurrency] = useState("");
  const [enteredAmount, setAmount] = useState(0);
  const [result, setResult] = useState(null);

  const getCurrencies = async () => {
    try {
      const response = await getCurrenciesList();
      const currenciesList = response.map((item) => item[1]);
      const defaultCurrency = currenciesList[0].Ccy[0];

      setCurrenciesList(currenciesList);
      setCurrency(defaultCurrency);
    } catch (err) {
      console.error(err.message);
    }
  };

  const convertCurrency = async () => {
    try {
      const { currency_rate: rate } = await getCurrencyRate(selectedCurrency);
      const result = (parseFloat(rate) * enteredAmount).toFixed(2);

      setResult(result);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <div className="card">
      <label className="list-group-item font-weight-bold">Amount in EUR:</label>
      <input
        className="list-group-item"
        type="number"
        onChange={(e) => setAmount(e.target.value)}
        placeholder="e.g. 10"
      />
      <label className="list-group-item font-weight-bold">Convert to:</label>
      <select
        onChange={(e) => setCurrency(e.target.value)}
        className="list-group-item"
        value={selectedCurrency}
      >
        {currenciesList.map((item) => (
          <option key={item.Ccy}>{item.Ccy}</option>
        ))}
      </select>
      <button onClick={convertCurrency} className="btn btn-info btn-lg">
        Convert
      </button>
      <div className="list-group-item font-weight-bold">Result: {result}</div>
    </div>
  );
};

export default CurrenciesList;
