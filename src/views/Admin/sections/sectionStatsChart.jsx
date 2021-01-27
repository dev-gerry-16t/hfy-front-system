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
    let arrayProfit = [];
    let arrayExpenses = [];
    let arrayBalance = [];

    data.forEach((element) => {
      arrayMonths.push(element.mes);
      arrayProfit.push(element.ganancia);
      arrayExpenses.push(element.gasto);
      arrayBalance.push(element.balance);
    });
    const dataChart = {
      chart: {
        type: "area",
      },
      title: {
        text: "Comisiones",
      },
      tooltip: {
        pointFormat:
          "{series.name}: <b>${point.y:,.0f}</b><br/>Polizas: <b>10</b><br/>Renovaciones: <b>0</b><br/>",
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
          data: arrayProfit,
          color: "#4E51D8",
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
    <div className="card-chart-information total-width">
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
