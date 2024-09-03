import axios from "axios";
export default async function getCoordinates(city) {
    let response = await axios.get("https://geocoding-by-api-ninjas.p.rapidapi.com/v1/geocoding", {
        params: { city },
        headers: {
            "x-rapidapi-key": process.env.API_KEY,
            "x-rapidapi-host": "geocoding-by-api-ninjas.p.rapidapi.com"
        }
    })
        .then(data1 => {
            let coordinates = data1.data[0];
            return coordinates;
        })
    return response;
}