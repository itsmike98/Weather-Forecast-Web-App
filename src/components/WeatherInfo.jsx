import "../css/Weather-info.css";
import { getWeatherIcon } from "../utils/getWeatherIcon";

export default function WeatherInfo({ cityData, nocheDia }) {

    return (
        <>
            <div className="info-container">
                <div className="city-container">
                    <img src="Weather-icons/Location-icon.svg" alt="Location-icon" />
                    {/* Ciudad introducida por el usuario, barcelona esta como predefinida en el state de app.jsx */}
                    {cityData ? <span>{cityData.name}, {cityData.sys.country}</span> : <p>Cargando...</p>}
                </div>

                <div className="main-info-container">
                    {/* Descripcion del tiempo con la primera letra mayus */}
                    {cityData ? (
                        <h2 className="prediction">
                            {cityData.weather[0].description.charAt(0).toUpperCase() + cityData.weather[0].description.slice(1)}
                        </h2>
                    ) : (
                        <p>Cargando...</p>
                    )}

                    {/* Temperatura de la ciudad indicada */}
                    {cityData ? <h1>{Math.round(cityData.main.temp)}°C</h1> : <p>Cargando...</p>}
                </div>

                <div className="humidity-container">
                    <span><img src="Weather-icons/Drop.svg" alt="Drop-icon" />Humedad</span>
                    {/* Humedad de la ciudad indicada */}
                    {cityData ? <h2>{cityData.main.humidity}<span className="percentage">%</span></h2> : <p>Cargando...</p>}
                </div>
            </div>
        </>
    )
}