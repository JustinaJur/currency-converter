import React from "react";

import CurrenciesList from "./Components/CurrenciesList";

function App() {
  return (
    <div className="container card-wrapper">
      <hr />
      <h3 className="card-header">Currency Converter</h3>
      <CurrenciesList />
    </div>
  );
}

export default App;
