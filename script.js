const apiKey = process.env.API_KEY; // API key from OpenWeatherMap
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
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const weatherDesc = data.weather[0].description.toLowerCase();

    // Determine background based on weather
    let bg;
    if (weatherDesc.includes("cloud")) {
        bg = "linear-gradient(to bottom, #bdc3c7, #2c3e50)"; // cloudy gray
    } else if (weatherDesc.includes("rain") || weatherDesc.includes("drizzle")) {
        bg = "linear-gradient(to bottom, #4e54c8, #8f94fb)"; // rainy blue
    } else if (weatherDesc.includes("clear")) {
        bg = "linear-gradient(to bottom, #fbc2eb, #a6c1ee)"; // sunny/light
    } else if (weatherDesc.includes("snow")) {
        bg = "linear-gradient(to bottom, #83a4d4, #b6fbff)"; // snowy white
    } else if (weatherDesc.includes("storm") || weatherDesc.includes("thunder")) {
        bg = "linear-gradient(to bottom, #232526, #414345)"; // storm dark
    } else {
        bg = "linear-gradient(to bottom, #74ebd5, #acb6e5)"; // default
    }

    // Update card background
    const card = document.getElementById("weatherInfo");
    card.style.background = bg;

    // Update weather info
    card.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="${data.weather[0].description}" />
    <p><strong>Current temperature:</strong> ${data.main.temp.toFixed(2)}°C</p>
    <p><strong>Feels like:</strong> ${data.main.feels_like.toFixed(2)}°C</p>
    <p><strong>Max:</strong> ${data.main.temp_max.toFixed(2)}°C, <strong>Min:</strong> ${data.main.temp_min.toFixed(2)}°C</p>
    <p><strong>${capitalizeFirstLetter(weatherDesc)}</strong></p>
  `;
}

// Helper function
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
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
