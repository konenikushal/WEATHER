import React from 'react';

import clear_icon from "./assets/clear.png";
import cloud_icon from "./assets/cloud.png";
import drizzle_icon from "./assets/drizzle.png";
import rain_icon from "./assets/rain.png";
import snow_icon from "./assets/snow.png";


import { useState, useEffect } from "react";


function WeatherCard({data}) {
    const[w_icon, setW_icon] = useState(null);
   
    useEffect(() => {
        const iconMapping = {
            "01d": clear_icon,
            "01n": clear_icon,
            "02d": cloud_icon,
            "02n": cloud_icon,
            "03d": drizzle_icon,
            "03n": drizzle_icon,
            "04d": drizzle_icon,
            "04n": drizzle_icon,
            "09d": rain_icon,
            "09n": rain_icon,
            "10d": rain_icon,
            "10n": rain_icon,
            "11d": rain_icon,
            "11n": rain_icon,
            "13d": snow_icon,
            "13n": snow_icon,};
    
        // Check if data exists and if the icon code is in the mapping
        if (data && data.weather && data.weather[0] && data.weather[0].icon) {
            const iconCode = data.weather[0].icon;
            if (iconMapping.hasOwnProperty(iconCode)) {
                // Set the icon based on the mapping
                setW_icon(iconMapping[iconCode]);
            } else {
                // Handle the case when the icon code is not in the mapping
                console.error("Unknown weather icon code:", iconCode);
            }
        }
    }, [data]);

    console.log(data)
    return (
        // TODO: Style like Card
        <div className="top">
            {/* TODO Add Favorite Button */}
            {/* TODO: Add State if US */}
            {/* TODO: Add Country  */}
            <div className="location">
                {data ? <p>{data.name}</p> : null}
            </div>
            <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="highlow">
                {data.main ? <p>{data.main.temp_max.toFixed()}°F / {data.main.temp_min.toFixed()}°F</p> : null}
            </div>
            <div className="humidity">
                {data.main ? <p>Humidity: {data.main.humidity}%</p> : null}
            </div>
            {/* TODO Move on Placement and Icon */}
            <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
                {w_icon ? <img src={w_icon} alt="" /> : null}
            </div>
        </div>
    );
}

export default WeatherCard;
