const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const xmlToJson = require("./helpers/xmlToJson");

app.use(cors());
app.use(express.json());

app.get("/currency", async (req, res) => {
  const url =
    "http://www.lb.lt//webservices/FxRates/FxRates.asmx/getCurrentFxRates?tp=EU";
  xmlToJson(url, async (err, data) => {
    if (err) {
      return console.err(err);
    }

    const rates = await data.FxRates.FxRate.map((item) => item.CcyAmt);

    rates.map((item) => {
      return pool.query(
        "INSERT INTO currency(currency_name, currency_rate) VALUES($1, $2) ON CONFLICT (currency_name) DO UPDATE SET currency_rate = excluded.currency_rate",
        [`${item[1].Ccy}`, `${item[1].Amt}`]
      );
    });

    res.json(rates);
  });
});

app.get("/currency/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const currencyName = await pool.query(
      "SELECT * FROM currency WHERE currency_name = $1",
      [id]
    );
    res.json(currencyName.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});
