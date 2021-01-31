require("dotenv").config();
const axios = require("axios").default;

const getPrice = async (ticker) => {
  const request = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${process.env.API_KEY}`
  );
  const data = request.data["Time Series (5min)"];

  return data[Object.keys(data)[0]];
};

exports.getPrice = getPrice;
