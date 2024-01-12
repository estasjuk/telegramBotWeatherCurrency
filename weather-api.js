const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/forecast?',
    params: {
        lat: '48.137154',
        lon: '11.576124',
        appid: '11127d0d42ff742dd514939ed9da8345',
  },
});

const getWeatherForecast = async () => {
    const { data } = await instance.get();
    return data.list;
};

module.exports = {
    getWeatherForecast,
};