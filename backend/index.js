import express from "express";
import cors from "cors";
import getWeather from "./getWeatherData.js";
import dotenv from "dotenv";
const app = express();
app.use(cors());
dotenv.config();
const port = process.env.PORT || 3000;
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const data = await getWeather(city);
    res.json(data);
});
app.listen(port, () => {
    console.log(`Up and running on port ${port}!!!`);
});
