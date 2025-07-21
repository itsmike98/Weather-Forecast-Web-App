import { formatUnixTimestamp } from "../utils/formatUnixTimestamp";
import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../css/Weekly-prediction.css";
import annotationPlugin from 'chartjs-plugin-annotation';
import { getWeatherIcon } from "../utils/getWeatherIcon";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";



export default function HourlyForecast({city, apiKey}) {
// Horas para la prevision de horas
const [hourLabels, setHourLabels] = useState([]);
// Grados por horas para la prevision de horas
const [degrees, setDegrees] = useState([]);
// Iconos de cada hora
const [hourIcons, setHourIcons] = useState([]);


//Plugin de chartJS para poner los iconos en la X
 const xScaleImage = {
    id: 'xScaleImage',
    afterDatasetsDraw(chart, args, plugin) {
    const { ctx, chartArea: { bottom }, scales: { x } } = chart;
    ctx.save();

    const dataset = chart.config._config.data.datasets[0];
    const images = dataset?.images;

    if (!images || !Array.isArray(images)) return; // Previene el error

    images.forEach((image, index) => {
        const label = new Image();
        label.src = image;
        const width = 30;
        const height = 30;
        ctx.drawImage(label, x.getPixelForValue(index) - (width / 2), x.top - 40, height, width);
    });
}

}

// Registro del chart de linea con el plugin creado.
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    annotationPlugin,
    xScaleImage,
);

function minorDegree(degreesList) {
    // Filtra valores inválidos como null
    const filtered = degreesList.filter(val => typeof val === 'number');

    if (filtered.length === 0) return 0; // Manejo de caso vacío

    let minorNum = filtered[0];
    for (let i = 1; i < filtered.length; i++) {
        if (filtered[i] < minorNum) {
            minorNum = filtered[i];
        }
    }
    return minorNum - 10; // Opcional: restas 2 para dar margen en la escala Y
}

 const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false }, // Oculta la leyenda
        title: { display: false },  // Oculta el título
        tooltip: { enabled: false }, // Opcional: oculta el tooltip al pasar el mouse
        annotation: {
            annotations: {
                point1: {
                    clip: false,
                    type: 'label',
                    xValue: 1,
                    yValue: degrees[1]  - 1.5,
                    content: [`${degrees[1]}°`],
                    position: {
                        x: 'center',
                        y: 'bottom'
                    },
                    font: {
                        size: 18
                    },
                    color: '#fff',
                },
                point2: {
                    clip: false,
                    type: 'label',
                    xValue: 2,
                    yValue: degrees[2]  - 1.5,
                    content: [`${degrees[2]}°`],
                    position: {
                        x: 'center',
                        y: 'bottom'
                    },
                    font: {
                        size: 18
                    },
                    color: '#fff',
                },
                point3: {
                    clip: false,
                    type: 'label',
                    xValue: 3,
                    yValue: degrees[3] - 1.5,
                    content: [`${degrees[3]}°`],
                    position: {
                        x: 'center',
                        y: 'bottom'
                    },
                    font: {
                        size: 18
                    },
                    color: '#fff',
                },
                point4: {
                    clip: false,
                    type: 'label',
                    xValue: 4,
                    yValue: degrees[4] - 1.5,
                    content: [`${degrees[4]}°`],
                    position: {
                        x: 'center',
                        y: 'bottom'
                    },
                    font: {
                        size: 18
                    },
                    color: '#fff',
                },
                point5: {
                    clip: false,
                    type: 'label',
                    xValue: 5,
                    yValue: degrees[5] - 1.5,
                    content: [`${degrees[5]}°`],
                    position: {
                        x: 'center',
                        y: 'bottom'
                    },
                    font: {
                        size: 18
                    },
                    color: '#fff',
                },
                point6: {
                    clip: false,
                    type: 'label',
                    xValue: 6,
                    yValue: degrees[6] - 1.5,
                    content: [`${degrees[6]}°`],
                    position: {
                        x: 'center',
                        y: 'bottom'
                    },
                    font: {
                        size: 18
                    },
                    color: '#fff',
                },
                point7: {
                    clip: false,
                    type: 'label',
                    xValue: 7,
                    yValue: degrees[7] - 1.5,
                    content: [`${degrees[7]}°`],
                    position: {
                        x: 'center',
                        y: 'bottom'
                    },
                    font: {
                        size: 18
                    },
                    color: '#fff',
                },
                point8: {
                    clip: false,
                    type: 'label',
                    xValue: 8,
                    yValue: degrees[8] - 1.5,
                    content: [`${degrees[8]}°`],
                    position: {
                        x: 'center',
                        y: 'bottom'
                    },
                    font: {
                        size: 18
                    },
                    color: '#fff',
                }
            }
        },
        xScaleImage,
    },
    scales: {
        x: {
            display: true, 
            grid: { display: false },
            ticks: {
                color: '#ffffff',
                font: {
                    size: 14,
                }
            }
        },
        y: {
            min: minorDegree(degrees),
            display: false,
            grid: { display: false },
            offset: 100,
        },
    },

}

// peticion del forecast por horas
useEffect(() => {

    axios.get(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&appid=${apiKey}`)
      .then(function (response) {
        const hoursList = [];
        const degreesList = [];
        const iconsList = [];

        //recorremos cada tres horas y guardamos en array
        for (let i = 0; i<=23; i++){
            if(i % 3 === 0 ){
                const hour = formatUnixTimestamp(response.data.list[i].dt, "hour").toString();
                let formatHour = "";
                if(hour.length === 1){
                    formatHour = "0" + hour + ":00h";
                } else{
                    formatHour = hour + ":00h";
                }
                const degree = Math.round(response.data.list[i].main.temp);
                hoursList.push(formatHour);
                degreesList.push(degree);
                iconsList.push(getWeatherIcon("", response.data.list[i].weather[0].icon));
            }
        }

        //Añadimos espacios al principio y final y guardamos los arrays
        hoursList.unshift("");
        hoursList.push("");
        setHourLabels(hoursList);

        degreesList.unshift(null);
        degreesList.push(null);
        setDegrees(degreesList);

        iconsList.unshift("");
        iconsList.push("");
        setHourIcons(iconsList);
      })
      .catch(function (error) {
        console.log("Ha sucedido un error" + error);
      });
  }, [city, apiKey]);

 const data = {
    labels: hourLabels,
    datasets: [
        {
            label: 'Ventas',
            data: degrees,
            borderColor: 'rgba(255, 102, 0, 1)',
            tension: 0.4,
            images: hourIcons,
        },
    ],
}  
    return (
        <>
            <div className="weekly-prediction">
                <div className="chart-container">
                    <Line className="chart-canvas" key={0} options={options} data={data} />
                </div>
            </div>
        </>
    )
}