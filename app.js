import Chart from "chart.js";

const datePar = document.querySelector(".date-par");
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const cityInput = document.querySelector("#city-input");
const humidityPar = document.querySelector(".humidity-val");
const mainPhotoCont = document.querySelector(".main-photo");
const tempText = document.querySelector(".temp-text");
const windSpeedText = document.querySelector(".wind-speed-val");
let currentWeather;

const getDayOfTheWeek = () => {
    const date = new Date();
    return daysOfWeek[date.getDay()];
};
const getMonth = () => {
    const date = new Date();
    return months[date.getMonth() - 1];
};
const setDate = () => {
    const date = new Date();
    datePar.innerHTML = `${date.getHours()}:${date.getMinutes() < 10 ? '0': ''}${date.getMinutes()}, ${getDayOfTheWeek()}, ${getMonth()} ${date.getDate()}, ${date.getFullYear()}`;
};


async function getWeather() {
    const location = cityInput.value;
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=7248edd397334736a38154003240312&q=${location}&aqi=no`);
        if(!response.ok){
            throw new Error(`Respone status: ${response.status}`);
        }
        const weather = await response.json();
        console.log(weather.current);
        
        // const img = document.createElement("img");
        // img.setAttribute("src", weather.current.condition.icon) 
        // mainPhotoCont.appendChild(img);

        tempText.innerHTML = weather.current.temp_c + "°C";

        humidityPar.hidden = false;
        humidityPar.innerHTML = weather.current.humidity + "%";

        windSpeedText.hidden = false;
        windSpeedText.innerHTML = weather.current.wind_kph + "km/h";
    }catch(e){

    }
}


setDate();
setInterval(setDate, 1000);

cityInput.addEventListener("change", getWeather);