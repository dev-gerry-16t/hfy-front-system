import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col } from "antd";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../../utils/actions/actions";
import CustomInputTypeForm from "../../../../components/CustomInputTypeForm";
import CustomAddPhoneNumber from "./customAddPhoneNumber";
import CustomAddEmailAddress from "./customAddEmailAddress";

const ButtonNextBackPage = styled.button`
  background: transparent;
  border: none;
  color: ${(props) =>
    props.block === true ? "#6E7191" : "var(--color-primary)"};
  font-weight: 500;
  cursor: ${(props) => (props.block === true ? "no-drop" : "pointer")};
  margin-bottom: 25px;
`;

const ComponentContactInformation = ({
  dataEmail,
  dataPhoneNumber,
  dataProfile,
  callGlobalActionApi,
  getById,
  idCustomer,
}) => {
  const [isVisibleAddPhone, setIsVisibleAdPhone] = useState(false);
  const [isVisibleAddEmail, setIsVisibleAdEmail] = useState(false);
  const frontFunctions = new FrontFunctions();

  const handlerCallSetCustomerPhoneNumber = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.SET_CUSTOMER_PHONE_NUMBER,
        "PUT"
      );
      return response;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallSetCustomerEmailAddress = async (data) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.SET_CUSTOMER_EMAIL_ADDRESS,
        "PUT"
      );
      return response;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  return (
    <>
      <CustomAddPhoneNumber
        isVisibleAddData={isVisibleAddPhone}
        onAddDataInfo={async (data) => {
          try {
            const response = await handlerCallSetCustomerPhoneNumber(data);
            getById();
            return response;
          } catch (error) {
            throw error;
          }
        }}
        onClose={() => {
          setIsVisibleAdPhone(false);
        }}
      />
      <CustomAddEmailAddress
        isVisibleAddData={isVisibleAddEmail}
        onAddDataInfo={async (data) => {
          try {
            const response = await handlerCallSetCustomerEmailAddress(data);
            getById();
            return response;
          } catch (error) {
            throw error;
          }
        }}
        onClose={() => {
          setIsVisibleAdEmail(false);
        }}
      />
      <h1 className="subtitle-header">Tus datos de contacto</h1>
      <p>
        La información agregada será verificada mediante códigos enviados a tus
        correos o mensajes de texto a tus teléfonos agregados (solo móvil).
      </p>
      <div className="type-property">
        <Row>
          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
            <Row>
              {isEmpty(dataPhoneNumber) === false &&
                dataPhoneNumber.map((row) => {
                  return (
                    <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                      <CustomInputTypeForm
                        value={row.phoneNumber}
                        placeholder=""
                        label="Teléfono"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {}}
                        type="number"
                        suffix={<i className="fa fa-phone"></i>}
                      />
                    </Col>
                  );
                })}
              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                <ButtonNextBackPage
                  onClick={() => {
                    setIsVisibleAdPhone(true);
                  }}
                >
                  <u>Agregar teléfono +</u>
                </ButtonNextBackPage>
              </Col>
            </Row>
          </Col>
          <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
            <Row>
              {isEmpty(dataEmail) === false &&
                dataEmail.map((row) => {
                  return (
                    <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                      <CustomInputTypeForm
                        value={row.emailAddress}
                        placeholder=""
                        label="Correo"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {}}
                        type="email"
                        suffix={<i className="fa fa-envelope-o"></i>}
                      />
                    </Col>
                  );
                })}
              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                <ButtonNextBackPage
                  onClick={() => {
                    setIsVisibleAdEmail(true);
                  }}
                >
                  <u>Agregar correo +</u>
                </ButtonNextBackPage>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentContactInformation);
