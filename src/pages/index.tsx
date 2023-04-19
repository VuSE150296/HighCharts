import { Inter } from "next/font/google";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import { Utils } from "@/common/utils";

const inter = Inter({ subsets: ["latin"] });

interface iSelector {
  companyName: string;
  product: string;
  selected: boolean;
}

export default function Home() {
  const [selectors, setSelectors] = useState<iSelector[]>([
    { companyName: "", product: "Kim ngạch", selected: true },
    { companyName: "", product: "Sản lượng", selected: false },
  ]);
  const [series, setSeries] = useState<Highcharts.SeriesOptionsType[]>([]);
  const [optionsHighcharts, setOptionsHighCharts] =
    useState<Highcharts.Options>();
  const color = {
    night: {
      light: "#251F47",
      dark: "#131129",
    },
    green: "#399652",
    red: "#CF4627",
    white: {
      default: "#FFF",
      dark: "#F7F7F7",
    },
    purple: {
      default: "#6F4EF2",
    },
    yellow: "#FEB338",
    orange: "#CF4627",
  };

  const reRenderSeriesChart = () => {
    setSeries([
      {
        name: "2020",
        type: "column",
        data: Utils.getKimNgachData(),
        visible: false,
      },
      {
        name: "2021",
        type: "column",
        data: Utils.getKimNgachData(),
        visible: false,
      },
      {
        name: "2022",
        type: "column",
        data: Utils.getKimNgachData(),
        visible: false,
      },
      {
        name: "2023",
        type: "column",
        data: Utils.getKimNgachData(),
        visible: true,
      },
      {
        name: "2024",
        type: "column",
        data: Utils.getKimNgachData(),
        visible: true,
      },
    ]);
  };

  const reRenderChart = () => {
    const options: Highcharts.Options = {
      chart: {
        type: "column",
        backgroundColor: color.night.light,
        height: 600,
      },
      title: {
        text: "Tình hình xuất khẩu",
        align: "left",
        style: {
          color: color.white.default,
          fontFamily: "Roboto",
        },
        margin: 100,
      },
      tooltip: {
        outside: true,
        useHTML: true,
        formatter: function (
          this: Highcharts.TooltipFormatterContextObject
        ): string {
          return `<span style="font-size:10px">${this.series.name}</span><table>
        <tr><td style="color:${this.series.color};padding:0">${this.x}: </td>
        <td style="padding:0"><b>${this.y}</b></td></tr></table>`;
        },
      },
      xAxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        crosshair: true,
      },

      yAxis: {
        title: {
          text: "Values",
          style: {
            color: color.white.default,
          },
        },
        labels: {
          rotation: 0,
          style: {
            fontSize: "18px",
            fontFamily: "Roboto",
            color: color.white.default,
          },
        },
        gridLineWidth: 0,
      },
      series: series,
    };
    setOptionsHighCharts(options);
  };

  useEffect(() => {
    reRenderSeriesChart();
  }, [selectors]);
  useEffect(() => {
    reRenderChart();
  }, [series]);

  const handleSelect = (itemSelect: iSelector) => {
    const newSelector = selectors.map((item: iSelector) => {
      item.selected = false;
      if (item.product == itemSelect.product) {
        item.selected = true;
      }
      return item;
    });
    setSelectors(newSelector);
  };

  return (
    <>
      <div>
        <h1>Highcharts</h1>
        <HighchartsReact highcharts={Highcharts} options={optionsHighcharts} />
        <div className="absolute top-0 right-0 flex gap-4 mx-6 my-4">
          {selectors.map((item: iSelector) => {
            return (
              <button
                className="p-2 rounded-md"
                onClick={() => handleSelect(item)}
                style={{
                  backgroundColor: !item.selected
                    ? color.night.dark
                    : color.purple.default,
                }}
                key={item.product}
              >
                {item.product}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
