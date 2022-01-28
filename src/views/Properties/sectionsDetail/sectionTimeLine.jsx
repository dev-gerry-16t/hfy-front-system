import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { Skeleton } from "antd";
import styled from "styled-components";
import { keyframes } from "styled-components";
import EmptyMovement from "../../../assets/icons/EmptyMovement.svg";
import IconIn from "../../../assets/icons/IconIn.svg";
import IconOut from "../../../assets/icons/IconOut.svg";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import { setDataUserRedirect } from "../../../utils/dispatchs/userRedirectDispatch";
import ContextProperty from "../context/contextProperty";

const CardStepsY = styled.div`
  padding: 15px 0px;
`;

const GeneralCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  display: ${(props) => (props.visible === true ? "block" : "none")};
  .header-title {
    border-bottom: 0.5px solid #4e4b66;
    display: flex;
    justify-content: space-between;
    padding: 1em;
    h1 {
      margin: 0;
      color: var(--color-primary);
      font-weight: 700;
    }
  }
  .content-cards {
    min-height: 30em;
    padding: 2em 1em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

  .content-card {
    padding: 1em 1em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }
  @media screen and (max-width: 500px) {
    .content-card {
      padding: 1em 0px;
    }
  }
`;

const Card = styled.div`
  min-height: 96px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  cursor: pointer;
  opacity: ${(props) =>
    props.finish === false && props.select === false ? "0.3" : "1"};
  .content-icon {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    .line-dashed-y-wrap {
      height: 100%;
      display: flex;
      justify-content: center;
      .line-dashed-y {
        width: 2px;
        height: 100%;
        border-left: ${(props) =>
          props.finish === true ? "2px dashed #ff0282" : "2px dashed #FCDDEC"};
      }
    }
  }
  .info-step {
    cursor: pointer;
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

const translate = keyframes`
  0% {
    transform: translate(0px);
  }

  10%{

    transform: translate(-4px);

  }

  20%{
    transform: translate(-8px);

  }
  40%{
    transform: translate(-10px);

  }
  80%{
    transform: translate(-8px);

  }

  100% {
    transform: translate(0px);
  }
`;

const nonTranslate = keyframes`
  from{
    transform: translate(0px);
  }

  to{
    transform: translate(0px);    
  }
`;

const IconStep = styled.div`
  position: relative;
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
  padding: 2px;
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
  &::before {
    content: "";
    right: 50px;
    position: absolute;
    border-style: solid;
    border-width: 7px 0px 7px 7px;
    border-color: ${(props) =>
      props.select === true
        ? "transparent transparent transparent var(--color-primary)"
        : "transparent transparent transparent transparent"};
    animation: ${(props) => (props.select === true ? translate : nonTranslate)}
      0.9s linear infinite;
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
        <div className="line-dashed-y-wrap">
          <div className="line-dashed-y"></div>
        </div>
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
    setDataUserRedirect,
    onOpenComponent,
    isOpenComponent,
    dataTimeLine,
  } = props;
  const { dataApplication } = props;
  const dataContexProperty = useContext(ContextProperty);
  const {
    dataDetail,
    updateProperty,
    getById,
    onGetConfigSteps = () => {},
  } = dataContexProperty;
  const { idProperty, idApartment } = dataDetail;
  const [currentStep, setCurrentStep] = useState(0);
  const frontFunctions = new FrontFunctions();

  return (
    <GeneralCard
      visible={isEmpty(dataTimeLine) === false}
      id="timeline-process"
    >
      <div className="header-title">
        <h1>Proceso</h1>
      </div>
      <div className="content-card">
        <CardStepsY>
          {isEmpty(dataTimeLine) === false &&
            dataTimeLine.map((row) => {
              return (
                <CardStep
                  title={row.title}
                  description={row.description}
                  icon={row.style}
                  finish={row.isCompleted}
                  select={row.isCurrent}
                  onClick={async () => {
                    if (isEmpty(row.stepAdditionalConfig) === false) {
                      const configIntro = JSON.parse(row.stepAdditionalConfig);
                      onGetConfigSteps(configIntro);
                    }
                    if (isNil(row.path) === false) {
                      await setDataUserRedirect({
                        backPath: window.location.pathname,
                      });
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
    </GeneralCard>
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
  setDataUserRedirect: (data) => dispatch(setDataUserRedirect(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionTimeLine);
