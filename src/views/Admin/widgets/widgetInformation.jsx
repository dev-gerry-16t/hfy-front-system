import React from "react";
import isNil from "lodash/isNil";
import styled from "styled-components";
import ENVIROMENT from "../../../utils/constants/enviroments";

const CardInformation = styled.div`
  display: grid;
  grid-template-rows: 3fr 1fr 1fr 2fr;
  background: #fff;
  height: 100%;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

const TopCardInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 120px;
    margin-top: 10px;
  }
  h1 {
    font-weight: 700;
    font-size: 0.9em;
    margin: 0px;
  }
  span {
    font-weight: 200;
    color: #b7b7b7;
  }
  a {
    font-size: 0.8em;
  }
`;

const MiddleMonthAmount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 0.5em;
  h1 {
    font-weight: 700;
    margin: 0px;
    font-size: 1.5em;
  }
  span {
    font-weight: 200;
    font-size: 0.8em;
  }
`;

const MiddleContactUser = styled.div`
  margin-top: 0.5em;
  padding: 0px 1.5em;
  div {
    i {
      margin-right: 5px;
      font-weight: bold;
    }
  }
`;

const BottomCardInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-size: 0.9em;
  padding: 0.6em 1.5em;
  div {
    display: flex;
    justify-content: space-between;
  }
`;

const WidgetInformation = (props) => {
  const {
    fullName,
    labelTenant,
    fullAddress,
    currentSalary,
    emailAddress,
    phoneNumber,
    occupationActivity,
    citizenId,
    taxId,
    bucketSource,
    idDocument,
    thumbnail,
  } = props;

  const handlerSplitElement = (toSplit) => {
    const resultSplit = toSplit.split(",");
    return isNil(resultSplit[0]) === false ? resultSplit[0] : "Dirección";
  };

  const replaceUrl = (address) => {
    let domainPath = "https://www.google.com/maps/search/";

    if (isNil(address) === false) {
      const replaceString = address.replaceAll(" ", "+");
      domainPath = domainPath + replaceString;
    }
    return domainPath;
  };

  const number_format = (amount, decimals) => {
    amount = parseFloat(amount.replace(/[^0-9\.]/g, ""));
    decimals = decimals || 0;
    if (isNaN(amount) || amount === 0) return parseFloat(0).toFixed(decimals);
    amount = "" + amount.toFixed(decimals);

    let amount_parts = amount.split("."),
      regexp = /(\d+)(\d{2})/;

    while (regexp.test(amount_parts[0]))
      amount_parts[0] = amount_parts[0].replace(regexp, "$1" + "-" + "$2");

    return amount_parts.join(".");
  };

  return (
    <CardInformation>
      <TopCardInformation>
        <div
          style={{
            width: 120,
            height: 120,
            overflow: "hidden",
          }}
        >
          <img
            src={
              isNil(idDocument) === false && isNil(bucketSource) === false
                ? `${ENVIROMENT}/api/viewFile/${idDocument}/${bucketSource}`
                : thumbnail
            }
            alt="Perfil"
            width="120"
          />
        </div>
        <h1>{fullName}</h1>
        <span>{labelTenant}</span>
        <div>
          <i
            className="fa fa-map-marker"
            style={{
              color: "#1890ff",
              marginRight: 5,
            }}
          />
          <a href={replaceUrl(fullAddress)} target="_blank">
            {handlerSplitElement(fullAddress)}
          </a>
        </div>
      </TopCardInformation>
      <MiddleMonthAmount>
        <h1>{currentSalary}</h1>
        <span>Ingresos mensuales</span>
      </MiddleMonthAmount>
      <MiddleContactUser>
        <div>
          <i className="fa fa-envelope-o" />
          <span>{emailAddress}</span>
        </div>
        <div>
          <i className="fa fa-phone" />
          <span>{number_format(phoneNumber)}</span>
        </div>
      </MiddleContactUser>
      <BottomCardInformation>
        <div>
          <strong>RFC:</strong>
          <span>{taxId}</span>
        </div>
        <div>
          <strong>CURP:</strong>
          <span>{citizenId}</span>
        </div>
      </BottomCardInformation>
    </CardInformation>
  );
};

export default WidgetInformation;
