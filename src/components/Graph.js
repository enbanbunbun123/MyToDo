import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement);

const countCompletedTasks = (data) => {
    const completedTasksColumn = data.find(column => column.title === "完了済み");
    return completedTasksColumn ? completedTasksColumn.tasks.length : 0;
}

const BarChart = ({taskCount}) => {
    const chartData = {
        labels: ["完了済み"],
        datasets: [{
            label: 'タスク数',
            data: [taskCount],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            x:{
                type: 'category',
                ticks: {
                    beginAtZero: true,
                }
            },
            y: {
                type: 'linear',
                ticks: {
                    beginAtZero: true,
                    stepSize: 1,
                }
            }
        }
    };

    return <Bar data = {chartData} options={options}/>;
};

const Graph = ({data}) => {
    const completedTaskCount = countCompletedTasks(data);

    return (
        <div>
            {/* <BarChart taskCount={completedTasks ? completedTasks.tasks.length : 0} /> */}
            <BarChart taskCount={completedTaskCount} />
        </div>
    );
};

export default Graph;