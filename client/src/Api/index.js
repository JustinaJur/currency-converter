import axios from "axios";

export const getCurrenciesList = async () => {
  const { data } = await axios.get("http://localhost:5000/currency");

  return data;
};

export const getCurrencyRate = async (currency) => {
  const { data } = await axios.get(
    `http://localhost:5000/currency/${currency}`
  );

  return data;
};
