import './App.css'
import DailyForecast from './components/DailyForecast';
import Header from './components/Header';
import WeatherInfo from './components/WeatherInfo';
import HourlyForecast from './components/HourlyForecast';
import { useState, useEffect, use } from 'react';
import axios from "axios";

function App() {

  // Logica de la ciudad seleccionada
  // Variable para guardar el nombre de la ciudad introducida por el usuario
  const [city, setCity] = useState("Barcelona");
  // Para guardar los datos del tiempo de la ciudad
  const [cityData, setCityData] = useState("");
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  //Estado para controlar si es de noche o de dia
  const [nocheDia, setNocheDia] = useState("");

  // Get weather info
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=es`)
      .then(function (response) {
        setCityData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {

        console.log("Ha sucedido un error" + error);
      });
  }, [city]);


  //Es de noche o de dia?
  useEffect(() => {
    if (cityData && cityData.sys && cityData.dt) {
      const { sunrise, sunset } = cityData.sys;
      const currentTime = cityData.dt;

      const esDeDia = currentTime >= sunrise && currentTime <= sunset;
      setNocheDia(esDeDia ? "day" : "night");
    }
  }, [cityData]);

  useEffect(() => {
    if(nocheDia){
      console.log(nocheDia);
    }
  },[nocheDia]);

  return (
    <>
      <div className='grid-container'>
        <Header setCity={setCity} nocheDia={nocheDia}/>
        <WeatherInfo cityData={cityData} />
        <div className='weather-icon-container'>
          <img src="Weather-icons/Sun.svg" alt="weather-icon" />
        </div>
        <DailyForecast />
        <HourlyForecast city={city} apiKey={apiKey} />
      </div>
    </>
  )
}
export default App;