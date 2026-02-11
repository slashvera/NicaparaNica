import { useEffect, useState } from "react";
import { getStudents } from "../api/students";
import { Chart } from 'primereact/chart';

export default function GenderChart() {
  const [students, setStudents] = useState([]);
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    getStudents()
      .then(res => {
        const femaleCount = res.data.filter(s => s.gender === "F").length;
        const maleCount = res.data.filter(s => s.gender === "M").length;

        const data = {
          labels: ['Mujeres', 'Varones'],
          datasets: [
            {
              data: [femaleCount, maleCount],
              backgroundColor: ['#ec4899', '#3b82f6'], // pink-500 y blue-500
              hoverBackgroundColor: ['#f472b6', '#60a5fa'] // pink-400 y blue-400
            }
          ]
        };

        const options = {
          plugins: {
            legend: {
              labels: {
                color: '#ffffff',
                usePointStyle: true
              }
            }
          }
        };

        setChartData(data);
        setChartOptions(options);
      })
      .catch(err => console.error("Error cargando estudiantes:", err));
  }, []);

  return (
    <div className="card w-full max-w-xs bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white shadow-xl hover:scale-105 transition-transform duration-300">
      <div className="card-body flex flex-col items-center">
        <h2 className="card-title mb-4">Distribución por género</h2>
        <Chart type="pie" data={chartData} options={chartOptions} className="w-48 h-48" />
      </div>
    </div>
  );
}