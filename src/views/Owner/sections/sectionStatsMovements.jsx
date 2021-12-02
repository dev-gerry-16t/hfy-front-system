import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import { Skeleton } from "antd";
import styled from "styled-components";
import EmptyMovement from "../../../assets/icons/EmptyMovement.svg";
import IconIn from "../../../assets/icons/IconIn.svg";
import IconOut from "../../../assets/icons/IconOut.svg";

const CircleIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  justify-content: center;
  background: #df90b8;
`;

const DisplayFlex = styled.div`
  display: flex;
  border-bottom: 1px solid #f7f7fc;
  padding: 10px 0px;
  font-size: 12px;
  @media screen and (max-width: 1000px) {
    font-size: 10px;
  }
`;

const IconImage = styled.div`
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 420px) {
    flex: 1 1 5px;
    padding: 0px 5px;
  }
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2 1 150px;
  color: #4e4b66;
`;

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 90px;
  align-items: flex-end;
  justify-content: center;
  margin-right: 10px;
  color: #4e4b66;
`;

const SectionStatsMovements = (props) => {
  const { dataInformation, finishCallApis } = props;
  const icons = {
    IconIn,
    IconOut,
  };

  return (
    <div className="card-chart-information-v2">
      <div className="title-cards">Movimientos</div>
      {finishCallApis === true && isEmpty(dataInformation) === false && (
        <div style={{ height: "100%" }}>
          <div
            style={{
              maxHeight: 250,
              overflowY: "scroll",
            }}
          >
            {dataInformation.map((row) => {
              return (
                <DisplayFlex>
                  <IconImage>
                    <CircleIcon>
                      <img
                        width="25"
                        src={icons[row.style]}
                        alt="icon-payment"
                      />
                    </CircleIcon>
                  </IconImage>
                  <Information>
                    <strong>{row.transactionTitle}</strong>
                    <span>{row.transactionDetail}</span>
                    <span>{row.transactionConcept}</span>
                  </Information>
                  <Payment>
                    <strong>{row.amountFormat}</strong>
                    <span>{row.transactionDateDescription}</span>
                    <strong>{row.transactionStatus}</strong>
                  </Payment>
                </DisplayFlex>
              );
            })}
          </div>
        </div>
      )}
      {finishCallApis === false && <Skeleton loading active />}
      {finishCallApis === true && isEmpty(dataInformation) === true && (
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
              <img src={EmptyMovement} alt="sin_datos" />
              <label>Aún no hay movimientos</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionStatsMovements;
