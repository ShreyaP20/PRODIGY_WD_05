const apiKey = "da333995472736c5aed2c40cc038b012"; // API key from OpenWeatherMap
const searchBtn = document.getElementById("searchBtn");
const locBtn = document.getElementById("locBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

const countries = {
    "AF": "Afghanistan",
    "AL": "Albania",
    "DZ": "Algeria",
    "AD": "Andorra",
    "AO": "Angola",
    "AR": "Argentina",
    "AM": "Armenia",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BE": "Belgium",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BA": "Bosnia and Herzegovina",
    "BR": "Brazil",
    "BG": "Bulgaria",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CL": "Chile",
    "CN": "China",
    "CO": "Colombia",
    "CR": "Costa Rica",
    "HR": "Croatia",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "FI": "Finland",
    "FR": "France",
    "DE": "Germany",
    "GR": "Greece",
    "GL": "Greenland",
    "GT": "Guatemala",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KW": "Kuwait",
    "LA": "Laos",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LY": "Libya",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MG": "Madagascar",
    "MY": "Malaysia",
    "MV": "Maldives",
    "MX": "Mexico",
    "MC": "Monaco",
    "MN": "Mongolia",
    "MA": "Morocco",
    "MM": "Myanmar",
    "NP": "Nepal",
    "NL": "Netherlands",
    "NZ": "New Zealand",
    "NG": "Nigeria",
    "KP": "North Korea",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PS": "Palestine",
    "PA": "Panama",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PL": "Poland",
    "PT": "Portugal",
    "QA": "Qatar",
    "RO": "Romania",
    "RU": "Russia",
    "SA": "Saudi Arabia",
    "RS": "Serbia",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SO": "Somalia",
    "ZA": "South Africa",
    "KR": "South Korea",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syria",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
};


// Fetch weather by city
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();
        displayWeather(data);

        // Clear search input after successful fetch
        cityInput.value = "";
    } catch (error) {
        weatherInfo.innerHTML = `<p style="color:red">${error.message}</p>`;
    }
}

// Fetch weather by coordinates
async function fetchWeatherByCoords(lat, lon) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        weatherInfo.innerHTML = `<p style="color:red">Unable to fetch location weather.</p>`;
    }
}

// Display weather data
function displayWeather(data) {
    weatherInfo.innerHTML = `
    <div class="card-header"><h3>${data.name}, ${countries[data.sys.country]}</h3></div>
    <div class="card-body">
    <h1>${data.main.temp}°C</h1> 
    <p>${data.weather[0].description}</p>
    <p><strong>H:</strong> ${data.main.temp_max} °C | <strong>L:</strong> ${data.main.temp_min} °C</p>
    <p><strong>Feels Like:</strong> ${data.main.feels_like} °C</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    </div>
  `;
    document.getElementById("weatherInfo").style.display = "block";
}

// Event listeners
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

locBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            () => {
                weatherInfo.innerHTML = `<p style="color:red">Location access denied.</p>`;
            }
        );
    } else {
        weatherInfo.innerHTML = `<p style="color:red">Geolocation not supported.</p>`;
    }
});


window.addEventListener("load", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                fetchWeatherByCoords(latitude, longitude);

            },
            () => {
                weatherInfo.innerHTML = `<p style="color:red">Location access denied. Please search manually.</p>`;
            }
        );
    } else {
        weatherInfo.innerHTML = `<p style="color:red">Geolocation not supported in this browser.</p>`;
    }
});
