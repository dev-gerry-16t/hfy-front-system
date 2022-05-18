import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import {
  callGlobalActionApi,
  callSetImageProfile,
} from "../../../../utils/actions/actions";
import styled, { keyframes } from "styled-components";
import { Row, Col } from "antd";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
} from "../../constants/styleConstants";
import ContextProfile from "../../context/contextProfile";
import CustomValidationUser from "../../../../components/CustomValidationUser";
import WidgetModalConfirmation from "../../widget/widgetModalConfirmation";

const rotate360 = keyframes`
0% { transform: rotate(0) }
50%{transform: rotate(200deg)}
100% { transform: rotate(360deg) }
`;

const LoadSquare = styled.div`
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 250px;
  box-shadow: 0 10px 40px -10px rgb(0 64 128 / 20%);
  border-radius: 1em;
  .load-border {
    width: 100%;
    height: 100%;
    animation: ${rotate360} linear 4s infinite;
    span {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      transform: translate(-50%, -50%);
    }
    span:first-child {
      background: var(--color-primary);
    }
    span:last-child:after {
      background: var(--color-primary);
    }

    span:after {
      display: block;
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      left: 100%;
    }
  }
  .content-identity {
    position: absolute;
    width: 290px;
    height: 240px;
    background: #fff;
    top: 50%;
    left: 50%;
    border-radius: 1em;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    text-align: center;
    h1 {
      font-weight: 700;
      font-size: 1.4em;
    }
  }
`;

const ButtonContinue = styled.button`
  background: var(--color-primary);
  color: #fff;
  padding: 5px 1em;
  border: none;
  border-radius: 5px;
`;

const SectionIdentity = (props) => {
  const { callGlobalActionApi, onClickNext, dataProfile, updateInformation } =
    props;
  const [isVisibleVerification, setIsVisibleVerification] = useState(false);
  const [dataVerificationInfo, setDataVerificationInfo] = useState([]);
  const [isOpenVerification, setIsOpenVerification] = useState(false);

  const dataContextProfile = useContext(ContextProfile);
  const { identifier, idCustomerOwner } = dataContextProfile;

  const frontFunctions = new FrontFunctions();

  const handlerCallValidateCustomerPropertiesInTab = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          identifier,
          idCustomer:
            isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.VALIDATE_CUSTOMER_PROPERTIES_IN_TAB
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isNil(response.response[0][0].properties) === false &&
        isEmpty(response.response[0][0].properties) === false
          ? JSON.parse(response.response[0][0].properties)
          : [];

      setDataVerificationInfo(responseResult);
      if (isEmpty(responseResult) === false) {
        setIsOpenVerification(true);
        throw "Revisa la información requerida";
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  return (
    <ContentForm>
      <WidgetModalConfirmation
        data={dataVerificationInfo}
        isVisibleModal={isOpenVerification}
        onNextStep={() => {
          onClickNext();
        }}
        onClose={() => {
          setIsOpenVerification(false);
        }}
      />
      <CustomValidationUser
        isVisible={isVisibleVerification}
        onClose={() => {
          setIsVisibleVerification(false);
        }}
        finished={() => {}}
        metadata={{
          idCustomer: dataProfile.idCustomer,
        }}
        clientId={dataProfile.clientId}
        flowId={dataProfile.flowId}
        finishedProcess={() => {
          setIsVisibleVerification(false);
          updateInformation();
        }}
      />
      <div className="header-title">
        <h1>Verificación de cuenta</h1>
      </div>
      <FormProperty>
        <div className="label-indicator"></div>
        <div className="type-property">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <LoadSquare>
              <div className="load-border">
                <span></span>
                <span></span>
              </div>
              <div className="content-identity">
                <h1>Verificación</h1>
                <span>
                  Has clic en <strong>Verificarme</strong> para iniciar con tu
                  proceso de verificación de identidad
                </span>
                <div
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <ButtonContinue
                    onClick={() => {
                      setIsVisibleVerification(true);
                    }}
                  >
                    Verificarme
                  </ButtonContinue>
                </div>
              </div>
            </LoadSquare>
          </div>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage block={true} onClick={() => {}}>
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                await handlerCallValidateCustomerPropertiesInTab();
                onClickNext();
              } catch (error) {}
            }}
          >
            <u>{"Siguiente"}</u>
            {" >>"}
          </ButtonNextBackPage>
        </div>
      </FormProperty>
    </ContentForm>
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionIdentity);
