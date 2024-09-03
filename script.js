const searchButton = document.querySelector("#search-city");
const city1 = document.querySelector("#city");
const spanCity = document.querySelector(".city");
const otherCity = document.querySelectorAll(".text-start");
function windDirection(deg) {
    let direction;
    switch (true) {
        case (deg > 24 && deg <= 68):
            direction = "NorthEast";
            break;
        case (deg > 68 && deg <= 113):
            direction = "East";
            break;
        case (deg > 113 && deg <= 158):
            direction = "SouthEast";
            break;
        case (deg > 158 && deg <= 203):
            direction = "South";
            break;
        case (deg > 203 && deg <= 248):
            direction = "SouthWest";
            break;
        case (deg > 248 && deg <= 293):
            direction = "West";
            break;
        case (deg > 293 && deg <= 336):
            direction = "NorthWest";
            break;
        default:
            direction = "North";
            break;
    }
    return direction;
}
function convertTime(sec) {
    const myDate = new Date(sec * 1000);
    return myDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
async function getWeather(city = "Delhi", n = 0) {
    fetch(`http://localhost:3000/weather?city=${city}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(res => {
            let { cloud_pct, temp, feels_like, humidity, min_temp, max_temp,
                wind_speed, wind_degrees, sunrise, sunset } = res;
            if (!n) {
                document.querySelectorAll(".temp")[n].innerHTML = temp;
                document.querySelector(".min_temp").innerHTML = min_temp + "&deg;C";
                document.querySelector(".max_temp").innerHTML = max_temp + "&deg;C";
                document.querySelector(".cloud_pct").innerHTML = cloud_pct + "&percnt;";
                document.querySelectorAll(".feels_like")[n].innerHTML = feels_like + "&deg;C";
                document.querySelectorAll(".humidity")[n].innerHTML = humidity;
                document.querySelector(".wind_speed").innerHTML = (wind_speed * (18 / 5)).toFixed(2);
                if (wind_speed) document.querySelector(".wind_degrees").innerHTML = windDirection(wind_degrees);
                else document.querySelector(".wind_degrees").innerHTML = "";
                document.querySelector(".sunrise").innerHTML = convertTime(sunrise);
                document.querySelector(".sunset").innerHTML = convertTime(sunset);
                spanCity.innerText = city;
            }
            else {
                document.querySelectorAll(".temp")[n].innerHTML = temp;
                document.querySelectorAll(".feels_like")[n].innerHTML = feels_like + "&deg;C";
                document.querySelectorAll(".humidity")[n].innerHTML = humidity;
            }
        })
        .catch(err => alert("Invalid Place Name!"));
}
getWeather();
searchButton.addEventListener("click", e => {
    e.preventDefault();
    getWeather(city1.value);
});
for (let i = 0; i < 4; i++) {
    getWeather(otherCity[i].innerText, i + 1);
}