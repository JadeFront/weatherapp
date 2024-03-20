import React, { useState } from 'react'
import './WeatherApp.css'
import axios from'axios'
import { FaCloudSunRain, FaTemperatureHigh, FaWind } from "react-icons/fa6";


const WeatherApp = () => {
    //updating the info when you search for weather information of a place
    const [ weatherInfo, setWeatherInfo ] = useState({});
    //for searching location
    const [ location, setLocation] = useState("");

    //api key you can get when you login in https://openweathermap.org/api
    const apiKey = 'af08efc97b6e60e634f79b4331828a29';
    //api link where you get all the weather information
    //api is a used to get a request and response between two program
    //we request weather information of a location from the  https://openweathermap.org/api server and it gives us a response
    const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;

    //function to get information from the api
    //axios is a library we use to reaquest data from the server
    //you can use axios by typing npm install axios in the terminal
    const searchLocation = () => {
        axios.get(apiLink).then((res) => {
            setWeatherInfo(res.data)
        })
        .catch((error) => {
            console.log('Error fetching weather data:', error);
            setWeatherInfo({error: 'Location not found'});
        });
        setWeatherInfo('')
    }

  return (
    <div className='weather-container'>
        {/* input the location  */}
        <input 
            type='text'
            value={location}
            onChange={e => setLocation(e.target.value)}
            onKeyPress={searchLocation}
            placeholder='location'
        />
        {/* display the location */}
        <h1 className='location'>{weatherInfo.name}</h1>

        {/* display the temperature */}
        <p className='icon'><FaCloudSunRain /></p>
        {/* condition if it is true then display the weather temp else display null */}
        {weatherInfo.main ? <p>{weatherInfo.main.temp.toFixed()}&deg;F</p> : null}

        {weatherInfo.weather ? <p>{weatherInfo.weather[0].main}</p> : null}

        {/* display the humidity and wind */}
        {/* condition if location is defined then show */}
        {weatherInfo.name !== undefined && 
        <div className='humidity-wind'>
            <div className='humidity'>
                 {/* condition if it is true then display the humidity else display null */}
                {weatherInfo.main ? <p>{weatherInfo.main.humidity}%</p> : null}
                <p className=''><FaTemperatureHigh /></p>
            </div>

            <div className='wind'>
                {/* condition if it is true then display the wind else display null */}
                {weatherInfo.wind ? <p>{weatherInfo.wind.speed.toFixed()} MPH</p> : null}
                <p className=''><FaWind /></p>
            </div>

        </div>}
    </div>
  )
}

export default WeatherApp