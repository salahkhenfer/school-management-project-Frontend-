import React, { useState } from "react";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { BarChartEach } from "./BarChartEach";

Chart.register(CategoryScale);

function BarChart() {
  const Data = [
    { month: "January", students: 20 },
    { month: "February", students: 15 },
    { month: "March", students: 30 },
    { month: "April", students: 25 },
    { month: "May", students: 40 },
    { month: "June", students: 10 },
    { month: "July", students: 45 },
    { month: "August", students: 35 },
    { month: "September", students: 28 },
    { month: "October", students: 22 },
    { month: "November", students: 30 },
    { month: "December", students: 18 },
  ];
  const threshold = 20; // العتبة لتغيير اللون

  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.month),
    datasets: [
      {
        label: "Number of Students",
        data: Data.map((data) => data.students),
        backgroundColor: Data.map((data) =>
          data.students < threshold ? "#8196ff" : "#001a9f"
        ),
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <div>
      {" "}
      <BarChartEach chartData={chartData} />
    </div>
  );
}

export default BarChart;
