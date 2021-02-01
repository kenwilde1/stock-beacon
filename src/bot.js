require("dotenv").config();
const {
  getPrice,
  formatEmbed,
  formatEmbedHelp,
  getNews,
  formatNews,
} = require("./utilities");
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

    switch (command) {
      case "help":
        const helpEmbed = formatEmbedHelp();
        message.channel.send({ embed: helpEmbed });
        break;
      case "news":
        try {
          const newsData = await getNews(args);
          message.channel.send({ embed: formatNews(newsData) });
        } catch (error) {
          message.channel.send(
            "```Sorry, there was no news for that ticker```"
          );
        }

        break;
      default:
        const price = await getPrice(`${command.toUpperCase()}`);
        if (price != "0") {
          const timestamp = new Date();
          const embedMsg = formatEmbed(command.toUpperCase(), price, timestamp);
          message.channel.send({ embed: embedMsg });
        } else {
          message.channel.send(
            ` \`\`\`Sorry, there's no ticker data available for $${command} \`\`\``
          );
        }
    }
  }
});

client.login(process.env.DISCORD_TOKEN);
