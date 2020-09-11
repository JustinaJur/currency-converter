const express = require("express");
const app = express();
const cors = require("cors");

const { getCurrenciesRates, getCurrencyRate } = require("./Api/Index.js");

app.use(cors());
app.use(express.json());

app.get("/currency", getCurrenciesRates);

app.get("/currency/:id", getCurrencyRate);

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
