import humidityImg from '/img/humidity.png';
import windImg from '/img/wind.png';

export function markupWeather(params) {
  const description = params.weather[0].description;
  const iconWeather = params.weather[0].icon;
  const temperature = Math.round(params.main.temp);
  const feelsLikeTemperature = Math.round(params.main.feels_like);
  const windSpeed = Math.round((params.wind.speed * 1000) / 3600);
  const name = params.name;
  const humidity = params.main.humidity;

  saveSearchQuery(name);


  const weatherCondition = params.weather[0].main;
  updateBackground(weatherCondition);


  return `<div>
              <img src="https://openweathermap.org/img/wn/${iconWeather}@2x.png" alt="weather" class="weather" />
              <p class="description">${description}</p>
            </div>
            <div class="temperature">
              <h2>${temperature}°с</h2>
              <div class="feels-like">
                <p class="feels-like-value">${feelsLikeTemperature}°с</p>
                <p>Відчувається як</p>
              </div>
            </div>
            <h1>${name}</h1>
            <div>
              <ul class="params-weather">
                <li class="params-weather-item">
                  <img src=${humidityImg} alt="humidity" />
                  <div class="params-weather-value">
                    <p class="humidity">${humidity}%</p>
                    <p>Вологість</p>
                  </div>
                </li>
                <li class="params-weather-item">
                  <img src=${windImg} alt="wind" />
                  <div class="params-weather-value">
                    <p class="wind">${windSpeed} м/с</p>
                    <p>Швидкість вітру</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>`;
}


function updateBackground(weatherCondition) {
  const body = document.body;

  body.style.backgroundSize = 'cover';
  body.style.backgroundPosition = 'center';
  body.style.backgroundRepeat = 'no-repeat';

  switch (weatherCondition) {
    case 'Clear':
      body.style.backgroundImage = "url('./img/sunny.jpg')"; // Солнечно
      break;
    case 'Rain':
      body.style.backgroundImage = "url('./img/rainy.jpg')"; // Дождь
      break;
    case 'Clouds':
      body.style.backgroundImage = "url('./img/cloudy.jpg')"; // Облачно
      break;
    case 'Snow':
      body.style.backgroundImage = "url('./img/snowy.jpg')"; // Снег
      break;
    case 'Thunderstorm':
      body.style.backgroundImage = "url('./img/thunderstorm.jpg')"; // Гроза
      break;
    case 'Drizzle':
      body.style.backgroundImage = "url('./img/drizzle.jpg')"; // Мелкий дождь
      break;
    case 'Mist':
    case 'Fog':
      body.style.backgroundImage = "url('./img/foggy.jpg')"; // Туман
      break;
    default:
      body.style.backgroundImage = "url('./img/default.jpg')"; // Дефолтный фон
  }
}

// Функция для сохранения городов в LocalStorage
function saveSearchQuery(cityName) {
  let searches = JSON.parse(localStorage.getItem('searches')) || [];
  if (!searches.includes(cityName)) {
    searches.push(cityName);
    localStorage.setItem('searches', JSON.stringify(searches));
  }
}

// Функция для отображения сохраненных запросов
export function displaySearchHistory() {
  const dropdown = document.querySelector('.search-dropdown');
  let searches = JSON.parse(localStorage.getItem('searches')) || [];

  // Проверяем, есть ли сохраненные города
  if (searches.length === 0) {
    dropdown.innerHTML = `<li class="dropdown-item">No cities found</li>`;
    return;
  }

  // Отображаем города
  dropdown.innerHTML = searches
    .map(city => `<li class="dropdown-item">${city}</li>`)
    .join('');
}

// Функция для загрузки дефолтного фона при первой загрузке
export function setDefaultBackground() {
  const body = document.body;

  // Дефолтный фон (например, облака)
  body.style.backgroundImage = "url('./img/default.jpg')";
  body.style.backgroundSize = 'cover';
  body.style.backgroundPosition = 'center';
  body.style.backgroundRepeat = 'no-repeat';
}
