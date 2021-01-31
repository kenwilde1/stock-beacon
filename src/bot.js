// Import Libraries
require("dotenv").config();
const fetch = require("node-fetch");
const { Client, Channel } = require("discord.js");
const PREFIX = "!";

// Create an Instance of Client
const client = new Client();

client.on("ready", () => {
  console.log(`${client.user.username} has powered up.`);
});

const getPrice = async (ticker) => {
  let price;
  let timestamp;
  const request = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=5min&apikey=${process.env.API_KEY}`
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

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [command, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    const { price, timestamp } = await getPrice(`${command.toUpperCase()}`);

    let messageHeader = `$${command.toUpperCase()}\n`;
    let messageContent = `${price} USD\n`;
    let messageTimestamp = `as of: ${timestamp["3. Last Refreshed"]}`;

    let finalMessage = ` \`\`\`${messageHeader}${messageContent}${messageTimestamp} \`\`\` `;

    message.channel.send(`${finalMessage}`);
  }
});

client.login(process.env.DISCORD_TOKEN);
