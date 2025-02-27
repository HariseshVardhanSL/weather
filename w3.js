// const API_KEY = "your_actual_api_key_here"; // 🚨 Replace with your actual API Key

// function getLocation() {
//     if (navigator.geolocation) {
//         document.getElementById("loading").style.display = "block";
//         console.log("🔍 Getting location...");
//         navigator.geolocation.getCurrentPosition(getWeather, showError);
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }
// }

// function getWeather(position) {
//     const lat = position.coords.latitude;
//     const lon = position.coords.longitude;
//     console.log(`📍 Location detected: Latitude ${lat}, Longitude ${lon}`);

//     const geoUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`;

//     fetch(geoUrl)
//         .then(response => {
//             if (!response.ok) throw new Error("Failed to fetch location data. Check API Key.");
//             return response.json();
//         })
//         .then(geoData => {
//             if (geoData.length === 0) throw new Error("No location data found.");
//             console.log("🌍 Geocoding Data:", geoData);

//             const city = geoData[0]?.name || "Unknown Location";
//             const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

//             return fetch(weatherUrl).then(response => {
//                 if (!response.ok) throw new Error("Failed to fetch weather data. Check API Key.");
//                 return response.json();
//             }).then(data => {
//                 console.log("🌤 Weather Data:", data);
//                 document.getElementById("loading").style.display = "none";
//                 document.getElementById("weatherDisplay").style.display = "block";

//                 document.getElementById("cityName").textContent = `📍 Location: ${city}`;
//                 document.getElementById("temperature").textContent = `🌡 Temperature: ${data.main.temp}°C`;
//                 document.getElementById("condition").textContent = `☁ Condition: ${data.weather[0].description}`;
//                 document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
//                 document.getElementById("wind").textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;

//                 document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
//             });
//         })
//         .catch(error => {
//             document.getElementById("loading").style.display = "none";
//             alert("⚠️ Error: " + error.message);
//             console.error("❌ API Error:", error);
//         });
// }

// function showError(error) {
//     document.getElementById("loading").style.display = "none";
//     switch(error.code) {
//         case error.PERMISSION_DENIED:
//             alert("❌ Permission denied! Please allow location access.");
//             break;
//         case error.POSITION_UNAVAILABLE:
//             alert("📍 Location information is unavailable.");
//             break;
//         case error.TIMEOUT:
//             alert("⏳ The request to get user location timed out.");
//             break;
//         default:
//             alert("❌ An unknown error occurred.");
//             break;
//     }
// }
const API_KEY = "f00c38e0279b7bc85480c3fe775d518c"; // 🚨 Replace with your real API Key!

async function getLocation() {
    if (!navigator.geolocation) {
        alert("❌ Geolocation is not supported by this browser.");
        return;
    }

    document.getElementById("loading").style.display = "block";
    console.log("🔍 Getting location...");

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log(`📍 Location: ${lat}, ${lon}`);

        try {
            // Fetch weather data
            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
            let response = await fetch(weatherUrl);

            if (!response.ok) throw new Error(`API Error: ${response.status} (Check API Key)`);

            let data = await response.json();
            console.log("🌤 Weather Data:", data);

            document.getElementById("loading").style.display = "none";
            document.getElementById("weatherDisplay").style.display = "block";

            document.getElementById("cityName").textContent = `📍 Location: ${data.name}`;
            document.getElementById("temperature").textContent = `🌡 Temperature: ${data.main.temp}°C`;
            document.getElementById("condition").textContent = `☁ Condition: ${data.weather[0].description}`;
            document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
            document.getElementById("wind").textContent = `💨 Wind Speed: ${data.wind.speed} m/s`;

            document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        } catch (error) {
            document.getElementById("loading").style.display = "none";
            alert(`⚠️ Error: ${error.message}`);
            console.error("❌ Fetch Error:", error);
        }
    }, showError);
}

function showError(error) {
    document.getElementById("loading").style.display = "none";
    alert("❌ Location Error: " + error.message);
}
