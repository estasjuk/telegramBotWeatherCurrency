require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;

const { 
    createForecastInterfaceForThree,
    createForecastInterfaceForSix,
    createPrivatUsdExchangeInterface,
    createPrivatEurExchangeInterface,
    createMonoUsdExchangeInterface,
    createMonoEurExchangeInterface,
} = require('./app');

const { startMenu, weather, currency, bankUsd, bankEur } = require('./options');

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Choose option: Weather forecast or Currency exchange",
    startMenu
  );
});

bot.onText(/Weather Forecast in Munich/, (msg) => {
  bot.sendMessage(msg.chat.id, "Please, choose the interval", weather);
});

bot.onText(/Every 3 hours/, async (msg) => {
  const text = await createForecastInterfaceForThree();
  bot.sendMessage(msg.chat.id, text, weather);
});

bot.onText(/Every 6 hours/, async (msg) => {
  const text = await createForecastInterfaceForSix();
  bot.sendMessage(msg.chat.id, text, weather);
});

bot.onText(/Currency Exchange/, (msg) => {
  bot.sendMessage(msg.chat.id, "Please, choose the currency", currency);
});

bot.onText(/USD/, (msg) => {
  bot.sendMessage(msg.chat.id, "Please, choose the bank", bankUsd);
});

bot.onText(/PrivatUsd/, async (msg) => {
  const text = await createPrivatUsdExchangeInterface();
  bot.sendMessage(msg.chat.id, text, bankUsd);
});

bot.onText(/MonoUsd/, async (msg) => {
 const text = await createMonoUsdExchangeInterface();
  bot.sendMessage(msg.chat.id, text, bankUsd);
});

bot.onText(/EUR/, (msg) => {
  bot.sendMessage(msg.chat.id, "Please, choose the bank", bankEur);
});

bot.onText(/PrivatEur/, async (msg) => {
   const text = await createPrivatEurExchangeInterface();
  bot.sendMessage(msg.chat.id, text, bankEur);
});

bot.onText(/MonoEur/, async (msg) => {
  const text = await createMonoEurExchangeInterface();
  bot.sendMessage(msg.chat.id, text, bankEur);
});


bot.onText(/Back/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "Choose option: Weather forecast or Currency exchange",
    startMenu
  );
});