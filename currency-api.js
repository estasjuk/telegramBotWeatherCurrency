const axios = require('axios');

const instancePrivat = axios.create({
    baseURL: 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5',
});

const instanceMono = axios.create({
    baseURL: 'https://api.monobank.ua/bank/currency',
});

const getPrivatExchange = async () => {
    const response = await instancePrivat.get();
    return response.data;
};

const getMonoExchange = async () => {
    const response = await instanceMono.get();
    return response.data;
};

module.exports = {
    getPrivatExchange,
    getMonoExchange,
};