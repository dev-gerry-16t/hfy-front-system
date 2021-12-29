import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled from "styled-components";
import WidgetReferenceModal from "./widgetReferenceModal";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";

const CardReferences = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: #fff;
  height: 100%;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  h1 {
    margin-top: 0.3em;
    margin-bottom: 0px;
    text-align: center;
    font-weight: 700;
  }
`;

const CardInformation = styled.div`
  display: flex;
  min-width: 18em;
  flex-direction: column;
  padding: 0.7em 1em;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

  @media screen and (max-width: 1320px) {
    min-width: auto;
    width: 100%;
    padding: 0.7em 10px;
  }
`;

const SectionCardInfoReference = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0.8em;
  flex-wrap: nowrap;
  align-items: center;
  max-width: 100%;
  overflow-x: scroll;
  .top-card-info {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    .score-reference {
      div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #1ce3ff;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .type-user-reference {
      font-weight: 500;
      text-align: center;
    }
  }
  .middle-card-info {
    margin-top: 0.8em;
    display: flex;
    flex-direction: column;
    i {
      font-weight: bold;
      margin-right: 0.7em;
    }
  }
  .bottom-card-info {
    margin-top: 1em;
    display: flex;
    justify-content: center;
    button {
      background: var(--color-primary);
      border: none;
      color: #fff;
      padding: 0.3em 1em;
      border-radius: 1em;
    }
  }
  @media screen and (max-width: 1320px) {
    flex-direction: column;
    max-width: auto;
    max-height: 450px;
    overflow-y: scroll;
    padding: 15px 5px;
    justify-content: flex-start;
  }
`;

const Card = (props) => {
  const {
    fullName,
    emailAddress,
    phoneNumber,
    canBeEvaluated,
    score,
    referenceType,
    onClick,
  } = props;

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
      <div className="top-card-info">
        <div className="score-reference">
          {isNil(score) === false && (
            <div>
              <span>{score}</span>
            </div>
          )}
        </div>
        <div className="type-user-reference">{referenceType}</div>
        <div></div>
      </div>
      <div className="middle-card-info">
        <div>
          <i className="fa fa-user-o" />
          <span>{fullName}</span>
        </div>
        <div>
          <i className="fa fa-phone" />
          <span>{number_format(phoneNumber)}</span>
        </div>
        <div>
          <i className="fa fa-envelope-o" />
          <span>{emailAddress}</span>
        </div>
      </div>
      {canBeEvaluated === true && (
        <div className="bottom-card-info">
          <button onClick={onClick}>Ver</button>
        </div>
      )}
    </CardInformation>
  );
};

const WidgetReferences = ({
  dataReferences,
  dataProfile,
  callGlobalActionApi,
  dataRelatioshipTypes,
  dataReferenceStatus,
  idInvestigationProcess,
  updateDetailUser,
}) => {
  const [dataForm, setDataForm] = useState({});
  const [dataHistory, setDataHistory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const frontFunctions = new FrontFunctions();

  const handlerCallGetAuditReferences = async (id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer: null,
          idCustomerTenant: null,
          idContract: null,
          idPersonalReference: id,
          idSystemUser,
          idLoginHistory,
          topIndex: -1,
          type: 1,
        },
        null,
        API_CONSTANTS.GET_AUDIT_REFERENCES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataHistory(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallUpdatePersonalReferences = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      await callGlobalActionApi(
        {
          ...data,
          idSystemUser,
          idLoginHistory,
          idInvestigationProcess,
        },
        data.idPersonalReference,
        API_CONSTANTS.SET_PERSONAL_REFERENCE_FORM,
        "PUT"
      );
      updateDetailUser();
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  return (
    <CardReferences>
      <h1>Referencias</h1>
      <WidgetReferenceModal
        isModalVisible={isModalVisible}
        dataForm={dataForm}
        setDataForm={(data) => {
          setDataForm(data);
        }}
        dataRelatioshipTypes={dataRelatioshipTypes}
        dataHistory={dataHistory}
        dataReferenceStatus={dataReferenceStatus}
        onSaveDataScore={async (data) => {
          try {
            await handlerCallUpdatePersonalReferences(data);
          } catch (error) {
            throw error;
          }
        }}
        setIsModalVisible={(status) => {
          setIsModalVisible(status);
        }}
      />
      <SectionCardInfoReference>
        {dataReferences.map((row) => {
          return (
            <Card
              {...row}
              onClick={() => {
                handlerCallGetAuditReferences(row.idPersonalReference);
                setDataForm({ ...row });
                setIsModalVisible(true);
              }}
            />
          );
        })}
      </SectionCardInfoReference>
    </CardReferences>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WidgetReferences);
