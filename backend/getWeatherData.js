import getCoordinates from "./getCoordinates.js";
import axios from "axios";
export default async function getWeather(city = "Delhi", n = 0) {
    let data = await getCoordinates(city);
    let response = await axios.get("https://weather-by-api-ninjas.p.rapidapi.com/v1/weather", {
        params: { lat: data.latitude, lon: data.longitude },
        headers: {
            "X-RapidAPI-Key": process.env.API_KEY,
            "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com"
        }
    })
        .then(res => {
            return res.data;
        })
    return response;
}