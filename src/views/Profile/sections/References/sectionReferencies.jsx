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
  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { dataDetailReference, getById } = dataContexProfile;

  const handlerCallSetPersonalReference = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.SET_PERSONAL_REFERENCE,
        "PUT"
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
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <span>
                Por favor llena todos los campos correspondientes de tus
                referencias. Recuerda que debes agregar como mínimo 3
                referencias.
              </span>
            </Col>
          </Row>
        </div>
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
          <Row justify="center">
            <Col span={5}>
              <ButtonNextBackPage
                block={false}
                onClick={() => {
                  setIsOpenAddReferences(true);
                }}
              >
                <u>{"Agregar referencia +"}</u>
              </ButtonNextBackPage>
            </Col>
          </Row>
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
            onClick={() => {
              onclickNext(dataForm);
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
