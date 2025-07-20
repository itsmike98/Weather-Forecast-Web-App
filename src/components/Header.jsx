import "../css/Header.css";
import { useState } from "react";

export default function Header({ setCity, nocheDia }) {

    //Obtener la hora en tiempo real
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setInterval(() => {
        setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 1000);
    const date = new Date();
    //Dias de la semana
    const dayNames = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado",];
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Nobiembre", "Diciembre"];
    //returns 0 to 6
    const day = date.getDay();
    const dayString = date.toLocaleString().split("/");
    const month = date.getMonth();
    const dateToString = `${dayString[1]} ${monthNames[month]} ${dayString[2].split(',')[0]}`;


    // Obtenemos la ciudad escrita al hacer submit
    const handleForm = (event) => {
        setCity(event.target[0].value);
        event.preventDefault();
    }

    return (
        <>
            <header>
                <form onSubmit={handleForm}>
                    <input type="text" id="city-finder" name="city-finder" placeholder="Find your city" />
                </form>
                <div className="day-night-toggle">
                    <img
                        className={nocheDia === "day" ? "toggle-icon toggle-active" : "toggle-icon"}
                        src="Weather-icons/day-night/Sun.svg"
                        alt="sun-icon"
                    />
                    <img
                        className={nocheDia === "night" ? "toggle-icon toggle-active" : "toggle-icon"}
                        src="Weather-icons/day-night/Moon.svg"
                        alt="moon-icon"
                    />

                </div>
                <div className="date-container">
                    <span>{time}</span>
                    <span>{dayNames[day]} | {dateToString}</span>
                </div>
            </header>
        </>
    )
}