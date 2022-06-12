import { useState } from "react";
import { Chart } from "primereact/chart";

const Graficos = () => {
  const [basicData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "This year",
        backgroundColor: "#42A5F5",
        data: [200, 300, 400, 200, 100, 500, 700],
      },
      {
        label: "Last year",
        backgroundColor: "#FFA726",
        data: [100, 400, 300, 150, 400, 300, 500],
      },
    ],
  });

  const getLightTheme = () => {
    let basicOptions = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          labels: {
            color: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
          },
        },
      },
    };
    return {
      basicOptions,
    };
  };

  const { basicOptions } = getLightTheme();

  return (
    <div className="mt-12">
      <div className="card">
        <Chart type="bar" data={basicData} options={basicOptions} />
      </div>
    </div>
  );
};

export default Graficos;
