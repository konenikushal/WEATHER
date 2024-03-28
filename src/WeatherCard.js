import React from 'react';



function WeatherCard({data}) {

    console.log(data)
    return (
        // TODO: Style like Card
        <div className="top">
            {/* TODO Add Favorite Button */}
            {/* TODO: Add State if US */}
            <div className="location">
                {data ? <p>{data.name}</p> : null}
            </div>
            <div className="temp">
                {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="highlow">
                {data.main ? <p>{data.main.temp_max.toFixed()}°F / {data.main.temp_min.toFixed()}°F</p> : null}
            </div>
            {/* TODO: Think we need to make a dif API Call to get precent chance of rain */}
            {/* <div className="rain">
                {data.main ? <p>{data.main.temp_max.toFixed()}°F / {data.main.temp_min.toFixed()}°F</p> : null}
            </div> */}
            {/* TODO Move on Placement and Icon */}
            <div className="description">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
        </div>
    );
}

export default WeatherCard;
