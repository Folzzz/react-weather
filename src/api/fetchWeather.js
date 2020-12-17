import axios from 'axios';

const URL = `https://api.openweathermap.org/data/2.5/weather`;
const apiKey = '49a88a1645a1f04ded3baa4062fe8e9c';

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: apiKey,
        }
    });

    return data;
}