import React from 'react';
import './WeatherCard.css';

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
        // TODO: Only show Div if data exists
        <div className="bg-slate-200 rounded-lg shadow-md p-4 w-80">
            {/* TODO Add Favorite Button */}
            {/* TODO: Add State if US */}
            {/* TODO: Add Country  */}
            <div className="text-4xl text-black font-semibold mb-2">
                        {data ? <p>{data.name}</p> : null}
            </div>
            <div className="flex"> 
                <div className="w-1/2">
                    
                    <div className="flex text-3xl text-black items-center mb-2">
                        {data.main ? <p>{data.main.temp.toFixed()}°F</p> : null}
                    </div>
                    <div className="flex text-base text-black  items-center mb-2">
                        {data.main ? <p>{data.main.temp_max.toFixed()}°F / {data.main.temp_min.toFixed()}°F</p> : null}
                    </div>
                    <div className="text-base text-black  mb-2">
                        {data.main ? <p>Humidity: {data.main.humidity}%</p> : null}
                    </div>
                </div>
                <div className="w-1/2">
                    {/* TODO Move on Placement and Icon */}
                    <div className="mr-2 mb-2 text-3xl text-black">
                        {data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                    <div className="w-14 h-14 mb-2" >
                        {w_icon ? <img className="object-scale-down" src={w_icon} alt="" /> : null}            
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default WeatherCard;
