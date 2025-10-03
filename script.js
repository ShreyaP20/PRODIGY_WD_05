const apiKey = "da333995472736c5aed2c40cc038b012"; // Get free key from OpenWeatherMap
const searchBtn = document.getElementById("searchBtn");
const locBtn = document.getElementById("locBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

// Fetch weather by city
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p style="color:red">${error.message}</p>`;
    }
}

// Fetch weather by coordinates
// async function fetchWeatherByCoords(lat, lon) {
//     try {
//         const response = await fetch(
//             `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
//         );
//         const data = await response.json();
//         displayWeather(data);
//     } catch (error) {
//         weatherInfo.innerHTML = `<p style="color:red">Unable to fetch location weather.</p>`;
//     }
// }

// Display weather data
function displayWeather(data) {
    weatherInfo.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Weather:</strong> ${data.weather[0].description}</p>
    <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
    <p><strong>Feels Like:</strong> ${data.main.feels_like} °C</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}

// Event listeners
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

// locBtn.addEventListener("click", () => {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//             (pos) => {
//                 const { latitude, longitude } = pos.coords;
//                 fetchWeatherByCoords(latitude, longitude);
//             },
//             () => {
//                 weatherInfo.innerHTML = `<p style="color:red">Location access denied.</p>`;
//             }
//         );
//     } else {
//         weatherInfo.innerHTML = `<p style="color:red">Geolocation not supported.</p>`;
//     }
// });
