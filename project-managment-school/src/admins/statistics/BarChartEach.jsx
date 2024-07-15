import { Bar } from "react-chartjs-2";
export const BarChartEach = ({ chartData }) => {
  return (
    <div className="chart-container md:w-[60%]  md:h-[40%]">
      <h2 style={{ textAlign: "center" }}>عدد التلاميذ في كل شهر</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: false,
              text: "عدد التلاميذ في كل شهر",
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};
