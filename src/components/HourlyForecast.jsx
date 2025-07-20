import { formatUnixTimestamp } from "../utils/formatUnixTimestamp";
import axios from "axios";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "../css/Weekly-prediction.css";
import annotationPlugin from 'chartjs-plugin-annotation';
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

//Plugin de chartJS para poner los iconos en la X
 const xScaleImage = {
    id: 'xScaleImage',
    afterDatasetsDraw(chart, args, plugin) {
        const { ctx, data, chartArea: { bottom }, scales: { x } } = chart;
        ctx.save();

        data.datasets[0].images.forEach((image, index) => {
            const label = new Image();
            label.src = image;
            const width = 30;
            const height = 30;
            ctx.drawImage(label, x.getPixelForValue(index) - (width / 2), x.top - 40, height, width);
        })
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
            min: 19,
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
            }
        }

        //Añadimos espacios al principio y final y guardamos los arrays
        hoursList.unshift("");
        hoursList.push("");

        console.log(hoursList);
        setHourLabels(hoursList);

        degreesList.unshift(null);
        degreesList.push(null);
        setDegrees(degreesList);
      })
      .catch(function (error) {
        console.log("Ha sucedido un error" + error);
      });
  }, []);

 const data = {
    labels: hourLabels,
    datasets: [
        {
            label: 'Ventas',
            data: degrees,
            borderColor: 'rgba(75,192,192,1)',
            tension: 0.4,
            images: ['', 'Weather-icons/Sun.svg', 'Weather-icons/Sun.svg', 'Weather-icons/Sun.svg', 'Weather-icons/Sun.svg', 'Weather-icons/Sun.svg', 'Weather-icons/Sun.svg', 'Weather-icons/Sun.svg', 'Weather-icons/Sun.svg', '',],
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