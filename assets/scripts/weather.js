/* This script fetches weather data from the OpenWeatherMap API based on the user's current location and updates the weather description on the webpage. It also changes the background image based on the weather description.
Followed guide from documentation: https://openweathermap.org/current to get the weather data. 
https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API to create the script to get current location.
Also watched a YouTube video to help me understand how to use the geolocation API: https://www.youtube.com/watch?v=VK9F8BWrOgY&t=204s
*/


// OpenWeatherMap API key  - Used https://www.obfuscator.io/ to hide the API Key
function _0x1f4e() {
  const _0x1eebf9 = ['168RGLoKb', '1315908kZXpLt', 'ded82115c27637b6400c5d44d35d97bf', '140DwdcPe', '9FBzkoF', '161469AOjTpZ', '1206NvXEZk', '4607465fLTpwe', '11779020dZerxo', '1218707KTAatS', '716aBcMyO', '40DRzeXT', '76251cTOaMT'];
  _0x1f4e = function () { return _0x1eebf9; }; return _0x1f4e();
}
const _0x45de31 = _0x17a3;
function _0x17a3(_0x48a7c8, _0x5c1c3d) {
  const _0x1f4e64 = _0x1f4e();
  return _0x17a3 = function (_0x17a333, _0x3e7e7b) {
    _0x17a333 = _0x17a333 - 0x1dc;
    let _0x433635 = _0x1f4e64[_0x17a333];
    return _0x433635;
  }, _0x17a3(_0x48a7c8, _0x5c1c3d);
} (function (_0x56e255, _0x2e200f) {
  const _0x569b9a = _0x17a3, _0x411435 = _0x56e255();
  while (!![]) {
    try {
      const _0x2613b2 = parseInt(_0x569b9a(0x1e2)) / 0x1 * (parseInt(_0x569b9a(0x1de)) / 0x2) + -parseInt(_0x569b9a(0x1e4)) / 0x3 * (parseInt(_0x569b9a(0x1e8)) / 0x4) + -parseInt(_0x569b9a(0x1df)) / 0x5 + -parseInt(_0x569b9a(0x1e6)) / 0x6 + parseInt(_0x569b9a(0x1e1)) / 0x7 * (parseInt(_0x569b9a(0x1e3)) / 0x8) + -parseInt(_0x569b9a(0x1dc)) / 0x9 * (-parseInt(_0x569b9a(0x1e0)) / 0xa) + -parseInt(_0x569b9a(0x1dd)) / 0xb * (-parseInt(_0x569b9a(0x1e5)) / 0xc);
      if (_0x2613b2 === _0x2e200f) break;
      else _0x411435['push'](_0x411435['shift']());
    } catch (_0x295713) {
      _0x411435['push'](_0x411435['shift']());
    }
  }
}(_0x1f4e, 0x9ff97));
const apiKey = _0x45de31(0x1e7);

/* Function to fetch weather data from OpenWeatherMap API reference: https://openweathermap.org/current see also README.md
This function is declared with the async keyword to indicate that it is asynchronous and returns a promise. 
It fetches weather data from the OpenWeatherMap API based on the provided latitude and longitude. */
async function getWeather(latitude, longitude) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);  // reference: https://openweathermap.org/current  see also README.md
    const data = await response.json();
    console.log(data);  // Log the weather data to the console

    // Get the weather description - reference: https://openweathermap.org/weather-conditions  see also README.md
    const weatherDescription = data.weather[0].description;

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
  body.classList.remove('weather-background');

  if (backgrounds.hasOwnProperty(weatherLower)) {
    body.style.backgroundImage = backgrounds[weatherLower];
    body.classList.add('weather-background');
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