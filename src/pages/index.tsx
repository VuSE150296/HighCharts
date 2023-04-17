import { Inter } from "next/font/google";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const options = {
    chart: { type: "column" },
    title: {
      text: "Tình hình xuất khẩu",
    },
    tooltip: {
      outside: true,
      useHTML: true,
      formatter: function (
        this: Highcharts.TooltipPositionerPointObject
      ): string {
        return `<div class="tooltip">Số liệu cho tháng <b>${
          this.x + 1
        }</b> là <b>${this.y}</b></div>`;
      },
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      tickLength: 1,
    },

    yAxis: [
      {
        max: 100,
      },
    ],

    plotOptions: {
      series: {
        borderRadius: 3,
        pointPadding: 0,
        groupPadding: 0.2,
      },
    },
    series: [
      {
        pointWidth: 40,
        color: "red",
        data: [
          71.5, 16.4, 29.2, 44.0, 76.0, 35.6, 48.5, 71.5, 16.4, 29.2, 44.0,
          76.0,
        ],
      },
      {
        pointWidth: 40,
        color: "#407bfb",
        data: [
          30, 94.1, 29.2, 44.0, 76.0, 35.6, 48.5, 71.5, 16.4, 29.2, 44.0, 76.0,
        ],
      },
    ],
  };
  return (
    <>
      <div>
        <h1>Highcharts</h1>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
}
