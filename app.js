const moment = require('moment');
const fs = require('fs');
const path = require('path');
const { getWeatherForecast } = require('./weather-api');
const { getPrivatExchange, getMonoExchange } = require('./currency-api');


const transformDate = (rawDate) => {
    const transformedDate = moment(rawDate).format('dddd, Do MMMM YYYY');
    return transformedDate;
};

const transformTime = (rawDate) => {
    const transformedTime = rawDate.slice(11, 16);
    return transformedTime;
};

const convertKelvinToCelsius = (kelvin) => {
    const celsius = Math.round(kelvin - 273);
    return celsius;
};

const createForecastInterfaceForThree = async () => {
    try {
        let forecastMessage = 'Weather forecast in Munich';
        const forecast = await getWeatherForecast();

        forecast.map((item, index, array) => {
            const currentDate = array[index].dt_txt.slice(0, 11);
            const previousDate = index === 0 ? 0 : array[index - 1].dt_txt.slice(0, 11);
            const formattedDate = transformDate(item.dt_txt);
            const { temp, feels_like } = item.main;
            const time = transformTime(item.dt_txt);
            const description = item.weather[0].description;
            const tempCels = convertKelvinToCelsius(temp) > 0 ? `+${convertKelvinToCelsius(temp)}` : convertKelvinToCelsius(temp);
            const feelsLikeCels = convertKelvinToCelsius(feels_like) > 0 ? `+${convertKelvinToCelsius(feels_like)}` : convertKelvinToCelsius(feels_like);
           
            if (currentDate !== previousDate) {
                forecastMessage += `\n ${formattedDate} \n ${time} Temperature ${tempCels}, feels like ${feelsLikeCels}, ${description}`;
            }
            else forecastMessage += `  \n ${time} Temperature ${tempCels}, feels like ${feelsLikeCels}, ${description}`;
        }
        );
        return forecastMessage;
    }
    catch (error) {
        console.log(error.message);
    }
};

const createForecastInterfaceForSix = async () => {
    try {
        let forecastMessage = 'Weather forecast in Munich';
        const forecast = await getWeatherForecast();

        forecast.filter((_, index) => index % 2 === 0).map((item, index, array) => {
            const currentDate = array[index].dt_txt.slice(0, 11);
            const previousDate = index === 0 ? 0 : array[index - 1].dt_txt.slice(0, 11);
            const formattedDate = transformDate(item.dt_txt);
            const { temp, feels_like } = item.main;
            const time = transformTime(item.dt_txt);
            const description = item.weather[0].description;
            const tempCels = convertKelvinToCelsius(temp) > 0 ? `+${convertKelvinToCelsius(temp)}` : convertKelvinToCelsius(temp);
            const feelsLikeCels = convertKelvinToCelsius(feels_like) > 0 ? `+${convertKelvinToCelsius(feels_like)}` : convertKelvinToCelsius(feels_like);
           
            if (currentDate !== previousDate) {
                forecastMessage += `\n ${formattedDate} \n ${time} Temperature ${tempCels}, feels like ${feelsLikeCels}, ${description}`;
            }
            else forecastMessage += `  \n ${time} Temperature ${tempCels}, feels like ${feelsLikeCels}, ${description}`;
        }
        );
         
        return forecastMessage;
    }
    catch (error) {
        console.log(error.message);
    }
};

const createPrivatUsdExchangeInterface = async () => {
    try {
        let usdExchangeMessage = ``;
        const exchange = await getPrivatExchange();
        exchange.filter(({ ccy }) => ccy === 'USD')
                .map( ({sale, buy}) => {
        usdExchangeMessage += `\n Current exchange USD to UAH: \n Sale: ${(Number(sale).toFixed(2))} \n Buy: ${Number(buy).toFixed(2)}`;
        }
    );
        return usdExchangeMessage;
    }
    catch (error) {
        console.log(error.message);
    }
};

const createPrivatEurExchangeInterface = async () => {
    try {
        let eurExchangeMessage = ``;
        const exchange = await getPrivatExchange();
        exchange.filter(({ ccy }) => ccy === 'EUR')
                .map( ({sale, buy}) => {
        eurExchangeMessage += `\n Current exchange EUR to UAH: \n Sale: ${(Number(sale).toFixed(2))} \n Buy: ${Number(buy).toFixed(2)}`;
        }
    );
        return eurExchangeMessage;
    }
    catch (error) {
        console.log(error.message);
    }
};

const createMonoUsdExchangeInterface = async () => {
    try {
        const db = path.join(__dirname, 'mono-usd.txt');
        const currentRequestTime = Date.now();
        let checkTimeInterval = fs.readFileSync(db, "utf8");
        
        if (Number(checkTimeInterval.slice(0, 13)) < (currentRequestTime - 60000)) {
            let usdExchangeMessage = ``;
            const exchange = await getMonoExchange();

            const filter = exchange.find((item) => item.currencyCodeA === 840 && item.currencyCodeB === 980);
            const { rateSell, rateBuy } = filter;
            usdExchangeMessage += `\n Current exchange USD to UAH: \n Sale: ${(Number(rateSell).toFixed(2))} \n Buy: ${Number(rateBuy).toFixed(2)}`;
            fs.writeFile(db, (String(currentRequestTime) + usdExchangeMessage), function(err){});
            return usdExchangeMessage;
        }
        
        else {
            return checkTimeInterval.slice(13, checkTimeInterval.length);;
        };
}
    catch (error) {
        console.log(error.message);
    }
};

const createMonoEurExchangeInterface = async () => {
    try {
    const db = path.join(__dirname, 'mono-eur.txt');
        const currentRequestTime = Date.now();
        let checkTimeInterval = fs.readFileSync(db, "utf8");

        if (Number(checkTimeInterval.slice(0, 13)) < (currentRequestTime - 60000)) {
            let eurExchangeMessage = ``;
            const exchange = await getMonoExchange();

            const filter = exchange.find((item) => item.currencyCodeA === 978 && item.currencyCodeB === 980);
            const { rateSell, rateBuy } = filter;
            eurExchangeMessage += `\n Current exchange EUR to UAH: \n Sale: ${(Number(rateSell).toFixed(2))} \n Buy: ${Number(rateBuy).toFixed(2)}`;
            fs.writeFile(db, (String(currentRequestTime) + eurExchangeMessage), function (err) { });
            return eurExchangeMessage;
        }
        else {
            return checkTimeInterval.slice(13, checkTimeInterval.length);
        };
    }
    catch (error) {
        console.log(error.message);
    }
};

createMonoUsdExchangeInterface();

module.exports = {
    createForecastInterfaceForThree,
    createForecastInterfaceForSix,
    createPrivatUsdExchangeInterface,
    createPrivatEurExchangeInterface,
    createMonoUsdExchangeInterface,
    createMonoEurExchangeInterface,
};