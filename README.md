<h1 align="center">Stock Beacon</h1>

<p align="center">
  <img width="460" height="300" src="./src/readmelogo.png">
</p>

Discord Bot that provides Intraday Time Series Data for tickers available on the NYSE.

The Bot was built using Node.js. Here are the following packages/dependencies:

- [Discord.js](https://discord.js.org/#/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [moment-timezone](https://momentjs.com/timezone/docs/#/using-timezones/)

The Data source used was [Alpha Vantage](https://www.alphavantage.co/documentation/) REST API. It provides intraday time series data of any equity provided that's listed on the NYSE.

Want to run it locally?

```
-> git clone https://github.com/kenwilde1/stock-beacon.git
-> cd stock-beacon/
-> npm run dev
```

Example Usage: (The prefix is '!' for all commands)

```
-> !IBM
```

Example Output:

```
$AMC
13.4500 USD
as of: Sat Jan 30 2021 01:00:00 GMT+0000 (GMT)
```

The Bot is deployed to Herouku, alternatively, you can authorize it for your Discord Server [here](https://discord.com/oauth2/authorize?client_id=805516936594063377&scope=bot)
