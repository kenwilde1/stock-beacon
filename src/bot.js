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

    try {
      const { price, timestamp } = await getPrice(`${command.toUpperCase()}`);
      const convertedTimestamp = convertTimezone(
        timestamp["3. Last Refreshed"]
      );
      const embedMsg = formatEmbed(
        command.toUpperCase(),
        price,
        convertedTimestamp
      );
      message.channel.send({ embed: embedMsg });
    } catch (error) {
      message.channel.send(
        ` \`\`\`Sorry, there's no ticker data available for $${command} \`\`\``
      );
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
