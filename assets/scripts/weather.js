/* This script fetches weather data from the OpenWeatherMap API based on the user's current location and updates the weather description on the webpage. It also changes the background image or color based on the weather description.
Followed guide from documentation: https://openweathermap.org/current to get the weather data. 
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API to create the script to get current location.
Also watched a YouTube video to help me understand how to use the geolocation API: https://www.youtube.com/watch?v=VK9F8BWrOgY&t=204s
*/


const apiKey = ''; // OpenWeatherMap API key

// Function to fetch weather data from OpenWeatherMap API  // reference: https://openweathermap.org/current see also README.md
// This function is declared with the async keyword to indicate that it is asynchronous and returns a promise. It fetches weather data from the OpenWeatherMap API based on the provided latitude and longitude.
async function getWeather(latitude, longitude) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);  // reference: https://openweathermap.org/current  see also README.md
    const data = await response.json();
    console.log(data);  // Log the weather data to the console
    
    // Get the weather description
    const weatherDescription = data.weather[0].description;    // reference: https://openweathermap.org/weather-conditions  see also README.md
    
    // Update the weather description on the webpage
    document.getElementById('weather-description').textContent = `Weather: ${weatherDescription}`;
    
    // Change background based on weather description
    changeBackground(weatherDescription);
  } catch (error) {
    console.error('Error fetching weather data:', error);  // In case of an error, log the error to the console
  }
}

function changeBackground(weatherDescription) {
    const body = document.body;
    const weatherLower = weatherDescription.toLowerCase();
    
    // Map weather descriptions to background images
    const backgrounds = {
      'clear sky': 'url("assets/images/background/clear.png")', 
      'few clouds': 'url("assets/images/background/few-clouds.png")',
      'scattered clouds': 'url("assets/images/background/scattered-clouds.png")', 
      'broken clouds': 'url("assets/images/background/broken-clouds.png")',
      'shower rain': 'url("assets/images/background/shower.png")',
      'rain': 'url("assets/images/background/rain.png")',
      'thunderstorm': 'url("assets/images/background/thunderstorm.png")',
      'snow': 'url("assets/images/background/snow.png")',
      'mist': 'url("assets/images/background/mist.png")' 
    };
    
    
    // Set background based on weather description
  
    body.classList.remove('weather-background'); // Remove the class in case it was previously set
    
    if (backgrounds.hasOwnProperty(weatherLower)) {
      body.style.backgroundImage = backgrounds[weatherLower]; // Set the background image
      body.classList.add('weather-background'); // Add the class to apply additional styling
    }
  }

// Function to get current location and fetch weather data
function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      
      // Call getWeather with current location coordinates
      getWeather(latitude, longitude);
    }, error => {
      console.error('Error getting current location:', error);
    });
  } else {
    console.error('Geolocation is not supported by this browser.');
  }
}

// Call getCurrentLocationWeather function when the page loads
window.onload = getCurrentLocationWeather;