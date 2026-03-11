const apiKey = "15cbebbb4a35c14aa14265f41be7f212";

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherDiv = document.getElementById("weather");

form.addEventListener("submit", getWeather);

async function getWeather(e){

e.preventDefault();

const city = cityInput.value;

try{

const response = await fetch(
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
);

if(!response.ok){
throw new Error("City not found");
}

const data = await response.json();

displayWeather(data);

}catch(error){

weatherDiv.classList.remove("hidden");

weatherDiv.innerHTML = `
<p>${error.message}</p>
`;

}

}

function displayWeather(data){

const city = data.name;
const country = data.sys.country;
const temp = Math.round(data.main.temp);
const description = data.weather[0].description;
const icon = data.weather[0].icon;

weatherDiv.classList.remove("hidden");

weatherDiv.innerHTML = `
<h2>${city}, ${country}</h2>

<img src="https://openweathermap.org/img/wn/${icon}@2x.png">

<p><strong>${temp}°C</strong></p>

<p>${description}</p>
`;

}