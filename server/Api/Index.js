const xmlToJson = require("../Utils/xmlToJson");
const pool = require("../db");

const getCurrenciesRates = async (req, res) => {
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
};

getCurrencyRate = async (req, res) => {
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
};

module.exports = {
  getCurrenciesRates,
  getCurrencyRate,
};
