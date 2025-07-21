import "../css/Daily-forecast.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { getWeatherIcon } from "../utils/getWeatherIcon";

export default function DailyForecast({ city, apiKey, nocheDia }) {
    const [apiCity, setApiCity] = useState("");
    const [dailyForecast, setDailyForecast] = useState([]);
    const currentDay = new Date().getDay() + 1;
    const weekDays = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"];

    useEffect(() => {
        if (!city) return;

        axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=6&appid=${apiKey}`)
            .then(function (response) {
                console.log(response.data);
                setApiCity(response.data.city.name);
                setDailyForecast(response.data.list);
            })
            .catch(function (error) {
                console.log("Ha habido un error con la llamada en daily forecast: " + error);
            });
    }, [city, apiKey]);

    useEffect(() => {
        if (dailyForecast.length > 0) {
            console.log("Este es el print", dailyForecast[0]);
        }
    }, [dailyForecast]);



    return (
        <>
            <div className='daily-forecast'>
                <h3>Predición semanal en {apiCity}</h3>
                {dailyForecast.length > 0 ? (
                    <ul>
                        {dailyForecast.map((day, index) => {
                            const dayIndex = (new Date().getDay() + index + 1) % 7;
                            return (
                                <li key={index}>
                                    <span>{weekDays[dayIndex]}</span>
                                    <span>
                                        <img
                                            src={getWeatherIcon(nocheDia, day.weather[0].icon)}
                                            alt="weather-icon"
                                        />
                                        {Math.round(day.temp.day)}°
                                    </span>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <span>Cargando información</span>
                )}


            </div>
        </>
    )
}