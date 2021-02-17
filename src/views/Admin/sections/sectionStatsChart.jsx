import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Layout, Avatar, Rate, Modal, Skeleton } from "antd";

const SectionStatsChart = (props) => {
  const { dataStatsChart, finishCallApis } = props;
  const [dataOptions, setDataOptions] = useState({});

  const handlerConvertDataChart = (data) => {
    let arrayMonths = [];
    const columns = [
      { title: "Ventas", columnName: "gananciaFormat" },
      { title: "Póliza", columnName: "poliza" },
      { title: "Renovaciones", columnName: "renovaciones" },
    ];
    let mapDataChart = [];

    mapDataChart = data.map((row) => {
      let rowParse = {};
      let returnObject = {};
      const re = /&nbsp;/gi;
      for (const key in row) {
        const element = row[key];
        rowParse[key] =
          isEmpty(element) === false ? element.replace(re, " ") : element;
      }

      returnObject = {
        ...rowParse,
        name: "",
        y: isNil(row.ganancia) === false ? row.ganancia : 0,
      };

      return returnObject;
    });

    let stringColumns = "";
    columns.forEach((element) => {
      stringColumns = `${stringColumns}${element.title}: <b> {point.${element.columnName}}</b><br/>`;
    });

    data.forEach((element) => {
      arrayMonths.push(element.mes);
    });

    const dataChart = {
      chart: {
        type: "area",
      },
      title: {
        text: "Ventas",
      },
      tooltip: {
        pointFormat: stringColumns,
      },
      yAxis: {
        title: {
          text: "Monto",
        },
      },
      xAxis: {
        categories: arrayMonths,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: "Ganancias",
          data: mapDataChart,
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
      </div>
    </div>
  );
};

export default SectionStatsChart;
