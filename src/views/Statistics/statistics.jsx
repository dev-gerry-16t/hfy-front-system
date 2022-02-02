import React, { useEffect, useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Progress } from "antd";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";

const ChartPie = ({ dataStats }) => {
  return <HighchartsReact highcharts={Highcharts} options={dataStats} />;
};

const ChartColumn = ({ dataStats }) => {
  return <HighchartsReact highcharts={Highcharts} options={dataStats} />;
};

const ChartStateColumn = ({ dataStats }) => {
  return <HighchartsReact highcharts={Highcharts} options={dataStats} />;
};

const ChartActiveUsers = ({ dataStats }) => {
  const [dataChart, setDataChart] = useState({});

  useEffect(() => {
    if (isEmpty(dataStats) === false) {
      const periodTime = dataStats.map((row) => {
        return row.descriptionPeriod;
      });
      const dataParse = dataStats.map((row) => {
        return row.totalInPeriod;
      });
      const dataChartOptions = {
        chart: {
          type: "area",
        },
        title: {
          text: "",
        },
        xAxis: {
          categories: periodTime,
        },
        yAxis: {
          labels: {
            format: "{value}%",
          },
          title: {
            text: "Porcentaje total",
          },
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "Total",
            data: dataParse,
          },
        ],
      };
      setDataChart(dataChartOptions);
    }
  }, [dataStats]);
  return <HighchartsReact highcharts={Highcharts} options={dataChart} />;
};

const Content = styled.div`
  position: relative;
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  display: grid;
  grid-template-areas:
    "graph1 graph1 graph3"
    "graph4 graph4 graph2"
    "graph5 graph5 graph5"
    "graph6 graph6 graph6"
    "graph7 graph7 graph7";
  grid-gap: 1em;
  .container-graph {
    background: #fff;
    border-radius: 5px;
    box-shadow: 0px 6px 5px 2px rgba(205, 213, 219, 0.6);
    .title-graph {
      padding: 5px 1em;
      h1 {
        font-weight: 800;
        font-size: 1em;
      }
    }
    .graph {
      div[data-highcharts-chart="0"] {
        display: flex;
        justify-content: center;
      }
    }
  }
  .graph-1 {
    grid-area: graph1;
  }
  .graph-2 {
    grid-area: graph2;
  }
  .graph-3 {
    grid-area: graph3;
  }
  .graph-4 {
    grid-area: graph4;
  }
  .graph-5 {
    grid-area: graph5;
  }
  .graph-6 {
    grid-area: graph6;
  }
  .graph-7 {
    grid-area: graph7;
  }
`;

const AntStatistics = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1em 0px;
  .info-graph {
    margin-top: 1.5em;
    display: flex;
    justify-content: space-around;
    gap: 1em;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        font-size: 0.8em;
      }
      h2 {
        font-weight: 800;
        font-size: 2em;
      }
    }
  }
`;

const StatisticsHomify = (props) => {
  const { callGlobalActionApi, dataProfile } = props;
  const frontFunctions = new FrontFunctions();
  const [statsPropertyForAgent, setStatsPropertyForAgent] = useState({});
  const [statsAgentWithProperty, setStatsAgentWithProperty] = useState({});
  const [statsPropertyOperation, setStatsPropertyOperation] = useState({});
  const [statsPropertyState, setStatsPropertyState] = useState([]);
  const [statsPerDay, setStatsPerDay] = useState([]);
  const [statsPerWeek, setStatsPerWeek] = useState([]);
  const [statsPerMonth, setStatsPerMonth] = useState([]);

  const filterArray = (inputArr) => {
    var found = {};
    var out = inputArr.filter((element) => {
      return found.hasOwnProperty(element.idState)
        ? false
        : (found[element.idState] = true);
    });
    return out;
  };

  const handlerCallGetAdviserStats = async (id = null) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          jsonConditions: null,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_ADVISER_STATS
      );
      const responseResult =
        isEmpty(response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      const responseResult1 =
        isEmpty(response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response[1]) === false &&
        isNil(response.response[1][0]) === false
          ? response.response[1][0]
          : [];
      const responseResult2 =
        isEmpty(response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response[2]) === false
          ? response.response[2]
          : [];
      const responseResult3 =
        isEmpty(response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response[3]) === false
          ? response.response[3]
          : [];
      if (isEmpty(responseResult) === false) {
        const parseData = responseResult.map((row) => {
          return {
            fullName: row.fullName,
            name: "Propiedades",
            y: row.percentPerAdviser,
            totalUserProperties: row.totalUserProperties,
          };
        });
        setStatsPropertyForAgent({
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: "pie",
          },
          title: {
            text: "",
          },
          tooltip: {
            pointFormat: "Total: <b>{point.totalUserProperties}</b>",
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
                format: "<b>{point.fullName}</b>: {point.y:.2f} %",
                distance: 10,
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
              data: parseData,
            },
          ],
        });
      }
      if (isEmpty(responseResult2) === false) {
        const parseData = responseResult2.map((row) => {
          return {
            name: row.operationType,
            y: row.totalPercent,
            grandTotal: row.grandTotal,
            drilldown: row.operationType,
            color:
              row.operationType == "Renta"
                ? "rgb(241,92,128)"
                : "rgb(135,180,231)",
          };
        });
        const dataChart = {
          chart: {
            type: "column",
          },
          title: {
            text: "",
          },
          xAxis: {
            type: "category",
          },
          yAxis: {
            title: {
              text: "Porcentaje total",
            },
          },
          tooltip: {
            pointFormat: "{series.name}: <b>{point.grandTotal}</b>",
          },
          accessibility: {
            point: {
              valueSuffix: "%",
            },
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: "{point.y:.1f}%",
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
              data: parseData,
            },
          ],
        };
        setStatsPropertyOperation(dataChart);
      }
      setStatsAgentWithProperty(responseResult1);
      if (isEmpty(responseResult3) === false) {
        const filterResult = filterArray(responseResult3);
        const statesArray = filterResult.map((row) => {
          return row.state;
        });
        const dataStatesRent = filterResult.map((row) => {
          const filterRent = responseResult3.filter((rowFilter) => {
            return (
              rowFilter.idState === row.idState &&
              rowFilter.idOperationType === 1
            );
          });
          return {
            y:
              isEmpty(filterRent) === false &&
              isNil(filterRent[0]) === false &&
              isNil(filterRent[0].totalPercent) === false
                ? filterRent[0].totalPercent
                : 0,
            total:
              isEmpty(filterRent) === false &&
              isNil(filterRent[0]) === false &&
              isNil(filterRent[0].grandTotal) === false
                ? filterRent[0].grandTotal
                : 0,
          };
        });
        const dataStatesVent = filterResult.map((row) => {
          const filterVent = responseResult3.filter((rowFilter) => {
            return (
              rowFilter.idState === row.idState &&
              rowFilter.idOperationType === 2
            );
          });
          return {
            y:
              isEmpty(filterVent) === false &&
              isNil(filterVent[0]) === false &&
              isNil(filterVent[0].totalPercent) === false
                ? filterVent[0].totalPercent
                : 0,
            total:
              isEmpty(filterVent) === false &&
              isNil(filterVent[0]) === false &&
              isNil(filterVent[0].grandTotal) === false
                ? filterVent[0].grandTotal
                : 0,
          };
        });
        const dataChart = {
          chart: {
            type: "column",
          },
          title: {
            text: "",
          },
          xAxis: {
            categories: statesArray,
            crosshair: true,
          },
          yAxis: {
            title: {
              text: "Porcentaje total",
            },
          },
          accessibility: {
            point: {
              valueSuffix: "%",
            },
          },
          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true,
                format: "{point.y:.1f}%",
              },
            },
          },
          tooltip: {
            pointFormat: "{series.name}: <b>{point.total}</b>",
          },
          credits: {
            enabled: false,
          },
          series: [
            {
              name: "Renta",
              data: dataStatesRent,
              color: "rgb(241,92,128)",
            },
            {
              name: "Venta",
              data: dataStatesVent,
              color: "rgb(135,180,231)",
            },
          ],
        };
        setStatsPropertyState(dataChart);
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetUserStats = async (id = null) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          jsonConditions: null,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_USER_STATS
      );
      const responseResult =
        isEmpty(response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      const responseResult1 =
        isEmpty(response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response[1]) === false
          ? response.response[1]
          : [];
      const responseResult2 =
        isEmpty(response) === false &&
        isEmpty(response.response) === false &&
        isNil(response.response[2]) === false
          ? response.response[2]
          : [];
      setStatsPerDay(responseResult);
      setStatsPerWeek(responseResult1);
      setStatsPerMonth(responseResult2);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetAdviserStats();
    handlerCallGetUserStats();
  }, []);

  return (
    <Content>
      <div className="container-graph graph-1">
        <div className="title-graph">
          <h1>% Propiedades por asesor</h1>
        </div>
        <div className="graph">
          {isEmpty(statsPropertyForAgent) === false && (
            <ChartPie dataStats={statsPropertyForAgent} />
          )}
        </div>
      </div>
      <div className="container-graph graph-2">
        <div className="title-graph">
          <h1>% Asesores con propiedad</h1>
        </div>
        <div className="graph">
          {isEmpty(statsAgentWithProperty) === false && (
            <AntStatistics>
              <div>
                <Progress
                  type="circle"
                  percent={statsAgentWithProperty.totalPercent}
                  width={250}
                />
              </div>
              <div className="info-graph">
                <div>
                  <span>Total de asesores</span>
                  <h2>{statsAgentWithProperty.totalAdviser}</h2>
                </div>
                <div>
                  <span>Total Con propiedad</span>
                  <h2>{statsAgentWithProperty.totalAdvisersWithProperty}</h2>
                </div>
              </div>
            </AntStatistics>
          )}
        </div>
      </div>
      <div className="container-graph graph-3">
        <div className="title-graph">
          <h1>Tipo de operación</h1>
        </div>
        <div className="graph">
          {isEmpty(statsPropertyOperation) === false && (
            <ChartColumn dataStats={statsPropertyOperation} />
          )}
        </div>
      </div>
      <div className="container-graph graph-4">
        <div className="title-graph">
          <h1>% Propiedades por localidad</h1>
        </div>
        <div className="graph">
          {isEmpty(statsPropertyState) === false && (
            <ChartStateColumn dataStats={statsPropertyState} />
          )}
        </div>
      </div>
      <div className="container-graph graph-5">
        <div className="title-graph">
          <h1>Actividad diaria de asesores</h1>
        </div>
        <div className="graph" id="graph-per-day">
          <ChartActiveUsers dataStats={statsPerDay} />
        </div>
      </div>
      <div className="container-graph graph-6">
        <div className="title-graph">
          <h1>Actividad semanal de asesores</h1>
        </div>
        <div className="graph">
          <ChartActiveUsers dataStats={statsPerWeek} />
        </div>
      </div>
      <div className="container-graph graph-7">
        <div className="title-graph">
          <h1>Actividad mensual de asesores</h1>
        </div>
        <div className="graph">
          <ChartActiveUsers dataStats={statsPerMonth} />
        </div>
      </div>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
    dataProfileMenu: dataProfileMenu.dataProfileMenu,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant) =>
    dispatch(callGlobalActionApi(data, id, constant)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsHomify);
