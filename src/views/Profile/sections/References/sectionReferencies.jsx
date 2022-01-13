import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../../utils/actions/actions";
import CustomInputTypeForm from "../../../../components/CustomInputTypeForm";
import ContextProfile from "../../context/contextProfile";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "../../constants/styleConstants";
import ComponentAddReference from "./sectionAddReferences";
import { IconDelete, IconEditSquare } from "../../../../assets/iconSvg";
import WidgetModalConfirmation from "../../widget/widgetModalConfirmation";

const CardReference = styled.div`
  width: 290px;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 10px;
  .header-buttons {
    display: flex;
    justify-content: right;
    padding: 10px;
  }
  .info-reference {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 0px 0.8em 0.8em 0.8em;
  }
`;

const ButtonHeader = styled.button`
  background: transparent;
  border: none;
`;

const SectionReferences = (props) => {
  const { callGlobalActionApi, dataProfile, onclickNext, onclickBack } = props;
  const [dataForm, setDataForm] = useState({});
  const [dataDefaultReference, setDataDefaultReference] = useState({});
  const [isOpenAddReferences, setIsOpenAddReferences] = useState(false);
  const [dataVerificationInfo, setDataVerificationInfo] = useState([]);
  const [isOpenVerification, setIsOpenVerification] = useState(false);

  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { dataDetailReference, getById, identifier } = dataContexProfile;

  const handlerCallValidateCustomerPropertiesInTab = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          identifier,
          idCustomer,
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

  const handlerCallSetPersonalReference = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.SET_PERSONAL_REFERENCE,
        "PUT"
      );
      const responseResult =
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : "";
      frontFunctions.showMessageStatusApi(
        isEmpty(responseResult) === false
          ? responseResult
          : "Se ejecutó correctamente la solicitud",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
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
      <div className="header-title">
        <h1>Referencias</h1>
      </div>
      <FormProperty>
        <ComponentAddReference
          isModalVisible={isOpenAddReferences}
          dataDefaultReference={dataDefaultReference}
          onClose={() => {
            setIsOpenAddReferences(false);
            setDataDefaultReference({});
          }}
          onSendInformation={async (data) => {
            try {
              await handlerCallSetPersonalReference(data);
              getById();
            } catch (error) {
              throw error;
            }
          }}
        />
        <div className="label-indicator">
          <Row>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <span>
                Por favor llena todos los campos correspondientes de tu
                referencia.
                <br />
                Recuerda que no deben de vivir en el mismo domicilio.
                <br />
                Si la dirección donde actualmente resides es propia, entonces
                deberás de agregar como mínimo tres referencias, caso contrario
                deberás de proporcionar un mínimo de dos.
              </span>
            </Col>
          </Row>
        </div>
        <WidgetModalConfirmation
          data={dataVerificationInfo}
          isVisibleModal={isOpenVerification}
          onNextStep={() => {
            onclickNext(dataForm); //verifica que sea next o finish
          }}
          onClose={() => {
            setIsOpenVerification(false);
          }}
        />
        <div className="type-property">
          <div className="section-card-reference">
            {isEmpty(dataDetailReference) === false &&
              dataDetailReference.map((row) => {
                return (
                  <CardReference>
                    <div className="header-buttons">
                      <ButtonHeader
                        onClick={() => {
                          setDataDefaultReference(row);
                          setIsOpenAddReferences(true);
                        }}
                      >
                        <IconEditSquare
                          color="var(--color-primary)"
                          size="15px"
                        />
                      </ButtonHeader>
                      <ButtonHeader
                        onClick={async () => {
                          try {
                            await handlerCallSetPersonalReference({
                              idPersonalReference: row.idPersonalReference,
                              isActive: false,
                            });
                            getById();
                          } catch (error) {}
                        }}
                      >
                        <IconDelete color="var(--color-primary)" size="15px" />
                      </ButtonHeader>
                    </div>
                    <div className="info-reference">
                      <strong>
                        {row.givenName} {row.lastName} {row.mothersMaidenName}
                      </strong>
                      <u>{row.emailAddress}</u>
                      <span>{row.phoneNumber}</span>
                    </div>
                  </CardReference>
                );
              })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ButtonNextBackPage
              block={false}
              onClick={() => {
                setIsOpenAddReferences(true);
              }}
            >
              {"Agregar referencia +"}
            </ButtonNextBackPage>
          </div>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage
            block={false}
            onClick={() => {
              onclickBack(dataForm);
            }}
          >
            {"<< "}
            <>{"Atrás"}</>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                await handlerCallValidateCustomerPropertiesInTab();
                onclickNext(dataForm);
              } catch (error) {}
            }}
          >
            <>{"Siguiente"}</>
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionReferences);
