const startMenu = {
    reply_markup: {
          keyboard: [["Weather Forecast in Munich", "Currency Exchange" ]],
        resize_keyboard: true,
    },
  };
  
  const weather = {
    reply_markup: {
          keyboard: [["Every 3 hours", "Every 6 hours"], ["Back"]],
        resize_keyboard: true,
    },
  };
  
  const currency = {
    reply_markup: {
          keyboard: [["USD", "EUR"], ["Back"]],
        resize_keyboard: true,
    },
  };
  
  const bankUsd = {
    reply_markup: {
          keyboard: [["MonoUsd", "PrivatUsd"], ["Back"]],
        resize_keyboard: true,
    },
  };
  
  const bankEur = {
    reply_markup: {
          keyboard: [["MonoEur", "PrivatEur"], ["Back"]],
        resize_keyboard: true,
    },
  };
  
  module.exports = {
    startMenu,
    weather,
    currency,
    bankUsd,
    bankEur
  };