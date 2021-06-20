import React from "react";
import "../css/MoreInfo.css";

function MoreInfo({ selected, open, setOpen }) {
  const time = (obj) => {
    let hours = new Date(obj.dt_txt).getHours();
    let time = hours > 12 ? hours - 12 + ":00 P.M" : hours + ":00 A.M";
    return time;
  };

  const weatherList = () => {
    return selected.map((obj) => {
      return (
        <div className="container" key={obj.dt}>
          <table>
            <tbody>
              <tr>
                <td>{obj.weather[0].description}</td>
                <td>
                  <div>{time(obj)}</div>
                </td>
                <td>
                  <div>{obj.main.temp_min}°C</div>
                </td>
                <td>{obj.main.temp_max}°C</td>
                <td>
                  <div>{obj.wind.speed}m/s</div>
                </td>
                <td>
                  <div>{obj.main.humidity}%</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="heading">
        <h5>weather</h5>
        <h5>time</h5>
        <h5>min temp</h5>
        <h5>max temp</h5>
        <h5>wind speed</h5>
        <h5>humidity</h5>
        <div style={{ float: "right" }}>
          <i className="material-icons" onClick={() => setOpen(!open)}>
            close
          </i>
        </div>
      </div>

      {weatherList()}
    </div>
  );
}
export default MoreInfo;
