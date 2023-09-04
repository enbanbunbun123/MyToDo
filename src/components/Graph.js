import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement);

const BarChart = ({chartData}) => {
    const options = {
        scales: {
            x:{
                type: 'category',
                ticks: {
                    beginAtZero: true,
                    color: '#fff',
                },

            },
            y: {
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                    color: '#fff',
                    stepSize: 1,
                },
        
            }
        }
    };

    return <Bar data = {chartData} options={options}/>;
};

const Graph = ({ data }) => {
    const dates = data.map((item) => item.data);
    const counts = data.map((item) => item.count);

    const chartData = {
        labels: dates,
        datasets: [{
            label: 'タスク数',
            data: counts,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }],
    };

    return (
        <>
            <div>達成グラフ</div>
            <div>
                <BarChart chartData={chartData} />
            </div>
        </>
    );
};

export default Graph;