import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import isEmpty from "lodash/isEmpty";
import { Skeleton } from "antd";
import EmptyGraph from "../../../assets/icons/EmptyGraph.svg";

const SectionStatsChartPie = (props) => {
  const { dataStatsChart, finishCallApis } = props;
  const [dataOptions, setDataOptions] = useState({});

  const handlerConvertDataChart = (data) => {
    const dataChart = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie",
      },
      title: {
        text: "Pólizas",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            distance: -60,
          },
        },
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "Total",
          colorByPoint: true,
          data: data,
        },
      ],
    };
    setDataOptions(dataChart);
  };

  useEffect(() => {
    if (isEmpty(dataStatsChart) === false) {
      handlerConvertDataChart(dataStatsChart);
    }
  }, [dataStatsChart]);

  return (
    <div className="card-chart-information ">
      <div className="title-cards">Grafica</div>
      <div>
        {finishCallApis === true && isEmpty(dataOptions) === false && (
          <HighchartsReact highcharts={Highcharts} options={dataOptions} />
        )}
        {finishCallApis === false && <Skeleton loading active />}
        {finishCallApis === true && isEmpty(dataOptions) === true && (
          <div className="empty-screen-make">
            <div className="info-screen-make" style={{ marginTop: 10 }}>
              <img src={EmptyGraph} alt="sin_datos" />
              <label>Aún no hay información</label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionStatsChartPie;
