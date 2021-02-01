require("dotenv").config();
const { getPrice, convertTimezone, formatEmbed } = require("./utilities");
const { Client } = require("discord.js");
const PREFIX = "!";

// Create an Instance of Client
const client = new Client();

client.on("ready", () => {
  console.log(`${client.user.username} has powered up.`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(PREFIX)) {
    const [command, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      .split(/\s+/);

    const price = await getPrice(`${command.toUpperCase()}`);
    console.log(price);
    if (price != undefined) {
      const timestamp = new Date();
      const embedMsg = formatEmbed(command.toUpperCase(), price, timestamp);
      message.channel.send({ embed: embedMsg });
    } else {
      message.channel.send(
        ` \`\`\`Sorry, there's no ticker data available for $${command} \`\`\``
      );
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
