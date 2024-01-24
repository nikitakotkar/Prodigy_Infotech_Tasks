import './WheatherApp.css'
import cloudIcon from "./Components/cloud.png";
import humidityIcon from "./Components/humidity.png";
import searchIcon from "./Components/search.png";
import windIcon from "./Components/wind.png";

const WeatherApp = () => {
  const apiKey = "43e3d8668c10e05111a47c5f2048b78f";

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
      let response = await fetch(url);
      let data = await response.json();

      const humidity = document.getElementsByClassName("humidity-percentage");
      const wind = document.getElementsByClassName("wind-rate");
      const temperature = document.getElementsByClassName("wheather-temp");
      const location = document.getElementsByClassName("wheather-location");

      humidity[0].innerHTML = `${data.main.humidity} %`;
      wind[0].innerHTML = `${data.wind.speed} km/h`;
      temperature[0].innerHTML = `${data.main.temp} °C`;
      location[0].innerHTML = data.name;
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='Search' />
        <div className="search-icon" onClick={() => { search() }}>
          <img src={searchIcon} alt='' />
        </div>
      </div>
      <div className="wheather-image">
        <img src={cloudIcon} alt='' />
      </div>
      <div className="wheather-temp">
        24°C
      </div>
      <div className="wheather-location">
        London
      </div>
      <div className="data-container">
        <div className="element">
          <img src={windIcon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">
              64%
            </div>
            <div className="text">
              Humidity
            </div>
          </div>
        </div>
        <div className="element">
          <img src={humidityIcon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">
              18 km/h
            </div>
            <div className="text">
              Wind Speed
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
