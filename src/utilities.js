const fetch = require("node-fetch");
const moment = require("moment-timezone");
const discord = require("discord.js");

const getPrice = async (ticker) => {
  let price;
  let timestamp;
  const request = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=${process.env.API_KEY}`
  );
  const response = await request.json();
  const data = await response;
  timestamp = response[Object.keys(response)[0]];
  console.log(timestamp);
  const obj = await data["Time Series (5min)"];
  price = await obj[Object.keys(obj)[0]]["1. open"];
  console.log(price);
  return { price, timestamp };
};

const convertTimezone = (time) => {
  let a = moment.tz(time, "America/New_York");
  a.format();
  a.utc().format();
  return a;
};

const formatEmbed = (ticker, price, timestamp) => {
  const embed = new discord.MessageEmbed()
    .setColor("#ffae00")
    .setTitle(`$${ticker}`)
    .setURL(`https://finance.yahoo.com/quote/${ticker}`)
    .setImage(
      "https://www.clipartkey.com/mpngs/m/9-97185_clip-art-logo-images-free-download-dollar-sign.png"
    )
    .addFields({
      name: "Open",
      value: `${price} USD`,
    })
    .setFooter(`data collected: ${timestamp}`);
  return embed;
};

// exports
exports.formatEmbed = formatEmbed;
exports.getPrice = getPrice;
exports.convertTimezone = convertTimezone;
