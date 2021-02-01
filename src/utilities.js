const fetch = require("node-fetch");
const discord = require("discord.js");
const moment = require("moment");

const getPrice = async (ticker) => {
  let price;
  let timestamp;
  const request = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${process.env.API_KEY}`
  );
  const response = await request.json();
  console.log(response);
  return response.c;
};

const getNews = async (ticker) => {
  const today = `${moment([
    moment().year(),
    moment().month(),
    moment().date(),
  ]).format("YYYY-MM-DD")}`;
  const request = await fetch(
    `https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${today}&to=${today}&token=c0c3bu748v6qi47j2nm0`
  );
  const data = await request.json();
  const getRandom = Math.floor(Math.random() * data.length - 1);
  return data[getRandom];
};

const formatNews = (data) => {
  const { headline, image, related, source, url } = data;

  const embed = new discord.MessageEmbed()
    .setColor("#209e3f")
    .setTitle("Read More Here")
    .addFields(
      {
        name: "Headline",
        value: headline,
      },
      {
        name: "Source",
        value: source,
      },
      {
        name: "Related",
        value: related,
      }
    )
    .setURL(url)
    .setImage(`${image}`)
    .setTimestamp();
  return embed;
};

const formatEmbedHelp = () => {
  const embed = new discord.MessageEmbed()
    .setColor("#209e3f")
    .setTitle("List of commands")
    .addFields(
      {
        name: "![ticker]",
        value: "Get price for defined ticker",
      },
      {
        name: "!news [ticker]",
        value:
          "Get a trending news article to read that is related to your ticker",
      }
    );
  return embed;
};

const formatEmbed = (ticker, price, timestamp) => {
  const embed = new discord.MessageEmbed()
    .setColor("#209e3f")
    .setTitle(`$${ticker}`)
    .setURL(`https://finance.yahoo.com/quote/${ticker}`)
    .setImage(
      "https://a.thumbs.redditmedia.com/nmh5l-zCsmmc3y2ehfjtWRJjGmCEWEJDTjtW3AGMz60.png"
    )
    .addFields({
      name: "Price",
      value: `$${price}`,
    })
    .setTimestamp();
  return embed;
};

// exports
exports.formatNews = formatNews;
exports.getNews = getNews;
exports.formatEmbedHelp = formatEmbedHelp;
exports.formatEmbed = formatEmbed;
exports.getPrice = getPrice;
