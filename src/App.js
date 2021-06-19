import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import weather from "./api/weather";
import MoreInfo from "./components/MoreInfo";
import "./css/App.css";
function App() {
  const apiKey = "3e0c3fa6099f0f29dc1363a2e9e27d5b";
  let [lat, setLat] = useState("");
  let [long, setLong] = useState("");
  let [term, setTerm] = useState("");
  let [weatherData, setWeatherData] = useState(null);
  let [open, setOpen] = useState(false);
  let [selected, setSelected] = useState([]);
  const getPosition = () => {
    return new Promise((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject)
    );
  };
  const getWeather = async (lat, long) => {
    let data = await weather.get(
      `/2.5/forecast?lat=${lat}&lon=${long}&cnt=40&appid=${apiKey}&units=metric`
    );
    setWeatherData(data);
  };
  const onInputChange = (e) => {
    setTerm(e.target.value);
  };
  const onInputSubmit = (e) => {
    e.preventDefault();
    weather
      .get(`/2.5/forecast?q=${term}&cnt=40&appid=${apiKey}&units=metric`)
      .then((res) => setWeatherData(res));
  };

  useEffect(() => {
    getPosition().then((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, [term]);

  useEffect(() => {
    if (lat !== "" && long !== "") {
      getWeather(lat, long);
    }
  }, [lat, long, term]);

  const renderWeather = () => {
    if (weatherData == null) {
      return "";
    } else {
      let data = weatherData.data;
      let array = data.list.map((day) => {
        let d = new Date(day.dt_txt);
        let date = d.getDate();
        return date;
      });
      let filteredDays = array.filter((Day, j) => j === array.indexOf(Day));
      let today = data.list.filter((day1) => {
        let d1 = new Date(day1.dt_txt);
        let date1 = d1.getDate();
        return date1 === filteredDays[0];
      });
      let tomorrow = data.list.filter((day2) => {
        let d2 = new Date(day2.dt_txt);
        let date2 = d2.getDate();
        return date2 === filteredDays[1];
      });
      let thirdDay = data.list.filter((day3) => {
        let d3 = new Date(day3.dt_txt);
        let date3 = d3.getDate();
        return date3 === filteredDays[2];
      });
      let fourthDay = data.list.filter((day4) => {
        let d4 = new Date(day4.dt_txt);
        let date4 = d4.getDate();
        return date4 === filteredDays[3];
      });
      let fifthDay = data.list.filter((day5) => {
        let d5 = new Date(day5.dt_txt);
        let date5 = d5.getDate();
        return date5 === filteredDays[4];
      });
      let sixthDay = data.list.filter((day6) => {
        let d6 = new Date(day6.dt_txt);
        let date6 = d6.getDate();
        return date6 === filteredDays[5];
      });
      const weatherDisplay = (arr, day) => {
        return (
          <div className="content_align">
            <div className="day_name">{day}</div>
            <p className="weather">{arr[1].weather[0].description}</p>
            <span id="sun" className="material-icons">
              light_mode
            </span>
            <i id="clouds" className="material-icons">
              clouds
            </i>
            <i id="thermostat" className="material-icons">
              thermostat
            </i>
            {arr[1].main.temp}°C
            <p className="real_temp">Real feel:{arr[1].main.feels_like}°C</p>
          </div>
        );
      };
      let cloudy = () => {
        return (
          <div>
            <i className="material-icons">clouds</i>
            <i className="material-icons">clouds</i>
          </div>
        );
      };
      let sunny = () => {
        return (
          <div>
            <i className="material-icons">light_mode</i>
          </div>
        );
      };
      let date = (array) => {
        let date = new Date(array[0].dt_txt);
        let days = ["SUN", "MON", "TUE", "WED", "THUR", "FRI", "SAT"];
        let day = date.getDay();
        return days[day];
      };

      let onClicked = (arr) => {
        setOpen(!open);
        setSelected(arr);
      };
      return (
        <div className="weather_container">
          <div className="display" onClick={() => onClicked(today)}>
            {weatherDisplay(today, date(today))}
          </div>
          <div className="display" onClick={() => onClicked(tomorrow)}>
            {weatherDisplay(tomorrow, date(tomorrow))}
          </div>
          <div className="display" onClick={() => onClicked(thirdDay)}>
            {weatherDisplay(thirdDay, date(thirdDay))}
          </div>
          <div className="display" onClick={() => onClicked(fourthDay)}>
            {weatherDisplay(fourthDay, date(fourthDay))}
          </div>
          <div className="display" onClick={() => onClicked(fifthDay)}>
            {weatherDisplay(fifthDay, date(fifthDay))}
          </div>
          <div className="display" onClick={() => onClicked(sixthDay)}>
            {weatherDisplay(sixthDay, date(sixthDay))}
          </div>
          {console.log(weatherData)}
          {console.log(today)}
          <div className={open ? "more_info_open" : "more_info_close"}>
            <table className="heading">
              <tbody>
                <tr>
                  <td>weather</td>
                  <td>time</td>
                  <td>min temp</td>
                  <td>max temp</td>
                  <td>wind speed</td>
                  <td>humidity</td>

                  <i
                    style={{ float: "right" }}
                    onClick={() => setOpen(!open)}
                    className="material-icons"
                  >
                    close
                  </i>
                </tr>
              </tbody>
            </table>
            <MoreInfo selected={selected} />
          </div>
        </div>
      );
    }
  };
  return (
    <div className="main_div">
      <NavBar
        term={term}
        onInputChange={onInputChange}
        onInputSubmit={onInputSubmit}
        weatherData={weatherData}
      />
      {renderWeather()}
    </div>
  );
}
export default App;
