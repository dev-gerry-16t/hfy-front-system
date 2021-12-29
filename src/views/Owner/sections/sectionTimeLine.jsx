import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { Skeleton } from "antd";
import styled from "styled-components";
import EmptyMovement from "../../../assets/icons/EmptyMovement.svg";
import IconIn from "../../../assets/icons/IconIn.svg";
import IconOut from "../../../assets/icons/IconOut.svg";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";

const CardStepsY = styled.div`
  padding: 15px 0px;
`;

const Card = styled.div`
  height: 96px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  cursor: pointer;
  opacity: ${(props) =>
    props.finish === false && props.select === false ? "0.3" : "1"};
  .content-icon {
    display: flex;
    justify-content: center;
    position: relative;
    cursor: pointer;
    .line-dashed-y {
      position: absolute;
      border: ${(props) =>
        props.finish === true ? "2px dashed #ff0282" : "2px dashed #FCDDEC"};
      transform: rotate(90deg);
      top: 66px;
      width: 50px;
    }
  }
  .info-step {
    font-size: 14px;
    h1 {
      margin: 0px;
      color: #200e32;
      font-weight: 600;
    }
    u {
      cursor: pointer;
    }
    .color-now {
      color: var(--color-primary);
    }
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 640px) {
    .info-step {
      font-size: 12px;
    }
  }
  @media screen and (max-width: 420px) {
  }
`;

const IconStep = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: transparent;
  /* border: 1px solid var(--color-primary); */
  border: ${(props) =>
    props.finish === true
      ? "none"
      : props.select === true
      ? "1px solid var(--color-primary)"
      : "none"};
  display: flex;
  justify-content: center;
  align-items: center;
  .icon-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${(props) =>
      props.finish === true ? "var(--color-primary)" : "#FCDDEC"};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) =>
      props.finish === true ? "#fff" : "var(--color-primary)"};
    font-size: 20px;
  }
`;

const CardStep = ({ title, description, finish, select, icon, onClick }) => {
  return (
    <Card finish={finish} select={select} onClick={onClick}>
      <div className="content-icon">
        <IconStep finish={finish} select={select}>
          <div className="icon-circle">
            <i className={finish === true ? "fa fa-check" : icon}></i>
          </div>
        </IconStep>
        <div className="line-dashed-y"></div>
      </div>
      <div className="info-step">
        <h1>{title}</h1>
        <span>{description}</span>
        <u
          className="color-now"
          style={{
            visibility: "hidden",
          }}
        >
          Saber más
        </u>
      </div>
    </Card>
  );
};

const SectionTimeLine = (props) => {
  const {
    dataInformation,
    finishCallApis,
    callGlobalActionApi,
    dataProfile,
    history,
    onOpenComponent = () => {},
    isVisibleVerification,
  } = props;
  const [dataTimeLine, setDataTimeLine] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const frontFunctions = new FrontFunctions();

  // const icons = {
  //   IconIn,
  //   IconOut,
  // };

  const handlerCallGetCustomerTimeLine = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_TIME_LINE
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataTimeLine(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetCustomerTimeLine();
  }, []);

  useEffect(() => {
    if (isVisibleVerification === false) {
      handlerCallGetCustomerTimeLine();
    }
  }, [isVisibleVerification]);

  return (
    <>
      {isEmpty(dataTimeLine) === false && (
        <div className="card-timeline-process">
          <div className="title-cards">Proceso</div>
          <CardStepsY>
            {dataTimeLine.map((row) => {
              return (
                <CardStep
                  title={row.title}
                  description={row.description}
                  icon={row.style}
                  finish={row.isCompleted}
                  select={row.isCurrent}
                  onClick={() => {
                    if (isNil(row.path) === false) {
                      history.push(row.path);
                    }
                    if (row.isCurrent === true) {
                      onOpenComponent(row.idComponent);
                    }
                  }}
                />
              );
            })}
          </CardStepsY>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant) =>
    dispatch(callGlobalActionApi(data, id, constant)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionTimeLine);
