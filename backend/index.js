import express from "express";
import cors from "cors";
import getWeather from "./getWeatherData.js";
import dotenv from "dotenv";
const app = express();
app.use(cors());
dotenv.config();
app.get("/weather", async (req, res) => {
    const city = req.query.city;
    const data = await getWeather(city);
    res.json(data);
});
app.listen(3000, () => {
    console.log("Up and running on port 3000!!!");
});