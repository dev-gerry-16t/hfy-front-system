import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import isEmpty from "lodash/isEmpty";
import { Skeleton } from "antd";
import EmptyGraph from "../../../assets/icons/EmptyGraph.svg";

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
        type: "column",
      },
      title: {
        text: "Estadística Mensual",
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
        {
          name: "Gastos",
          data: arrayExpenses,
          color: "#EF280F",
        },
        {
          name: "Balance",
          data: arrayBalance,
          color: "#32cd32",
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
    <div className="card-chart-information-v2">
      <div className="title-cards">Ganancias</div>

      {finishCallApis === true && isEmpty(dataOptions) === false && (
        <div style={{ height: "100%" }}>
          <HighchartsReact highcharts={Highcharts} options={dataOptions} />
        </div>
      )}
      {finishCallApis === false && <Skeleton loading active />}
      {finishCallApis === true && isEmpty(dataOptions) === true && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 230,
          }}
        >
          <div className="empty-screen-make">
            <div className="info-screen-make" style={{ marginTop: 10 }}>
              <img src={EmptyGraph} alt="sin_datos" />
              <label>Aún no hay información</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionStatsChart;
