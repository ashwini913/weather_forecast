import React from "react";
import "../css/MoreInfo.css";

function MoreInfo({ selected }) {
  const time = (obj) => {
    let hours = new Date(obj.dt_txt).getHours();
    let time = hours > 12 ? hours - 12 + ":00 P.M" : hours + ":00 A.M";
    return time;
  };
  return selected.map((obj) => {
    return (
      <div className="container" key={obj.dt}>
        <table>
          <tbody>
            <tr>
              <i id="cloud" className="material-icons">
                clouds
              </i>
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
}
export default MoreInfo;
