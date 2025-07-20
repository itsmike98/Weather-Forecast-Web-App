import "../css/Daily-forecast.css";

export default function DailyForecast() {
    return (
        <>
            <div className='daily-forecast'>
                <h3>Predición semanal</h3>
                <ul>
                    <li>
                        <span>Lunes</span>
                        <span><img src="Weather-icons/Sun.svg" alt="weather-icon" /> 25°</span>
                    </li>
                    <li>
                        <span>Martes</span>
                        <span><img src="Weather-icons/Sun.svg" alt="weather-icon" /> 25°</span>
                    </li>
                    <li>
                        <span>Miércoles</span>
                        <span><img src="Weather-icons/Sun.svg" alt="weather-icon" /> 25°</span>
                    </li>
                    <li>
                        <span>Jueves</span>
                        <span><img src="Weather-icons/Sun.svg" alt="weather-icon" /> 25°</span>
                    </li>
                    <li>
                        <span>Viernes</span>
                        <span><img src="Weather-icons/Sun.svg" alt="weather-icon" /> 25°</span>
                    </li>
                    <li>
                        <span>Sábado</span>
                        <span><img src="Weather-icons/Sun.svg" alt="weather-icon" /> 25°</span>
                    </li>
                    <li>
                        <span>Domingo</span>
                        <span><img src="Weather-icons/Sun.svg" alt="weather-icon" /> 25°</span>
                    </li>
                </ul>

            </div>
        </>
    )
}