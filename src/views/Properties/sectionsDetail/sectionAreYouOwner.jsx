import React, { useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import { Modal, Row, Col } from "antd";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import styled from "styled-components";
import ContextProperty from "../context/contextProperty";
import CustomSelect from "../../../components/CustomSelect";
import { ReactComponent as IconMailLetter } from "../../../assets/iconSvg/svgFile/iconMailLetter.svg";
import ComponentLoadSection from "../../../components/componentLoadSection";
import { ReactComponent as IconStyleCheck } from "../../../assets/iconSvg/svgFile/iconStyleCheck.svg";
import CustomInputSelect from "../../../components/customInputSelect";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";

const MultiSelect = styled.div`
  margin: 1em 0px;
  display: flex;
  flex-direction: column;
  .button-actions-select {
    display: flex;
    justify-content: space-around;
    gap: 1em;
  }
`;

const ButtonCheck = styled.button`
  border: ${(props) =>
    props.select === true ? "1px solid #FF0083" : "1px solid #d6d8e7"};
  border-radius: 0.5em;
  background: ${(props) =>
    props.select === true ? "rgba(255, 0, 131, 0.2)" : "transparent"};
  color: #000;
  font-weight: 500;
  padding: 0.5em 0.8em;
  box-shadow: ${(props) =>
    props.select ? "0px 0px 5px 2px rgba(255, 0, 131, 0.15)" : "none"};
`;

const catalogOwner = [
  { id: "1", text: "Si soy el dueño" },
  { id: "2", text: "No soy el dueño" },
];

const SectionAreYouOwner = (props) => {
  const { callGlobalActionApi, dataProfile, history, visibleModal, onClose } =
    props;
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail, updateProperty, getById } = dataContexProperty;
  const {
    fullAddress,
    idProperty,
    idApartment,
    canAcceptInvitation,
    identifier,
  } = dataDetail;
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [errorMail, setErrorMail] = useState(false);
  const [dataOwners, setDataOwners] = useState([]);
  const [finishProcess, setFinishProcess] = useState(false);
  const [selectAssociation, setSelectAssociation] = useState(null);
  const [dataForm, setDataForm] = useState({
    idCustomerOwner: null,
    ownerEmailAddress: null,
    ownerPhoneNumber: null,
    ownerGivenName: null,
    ownerLastName: null,
    isPropertyConfiguered: true,
  });
  const frontFunctions = new FrontFunctions();

  const handlerCallSearchCustomer = async (data = null) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 4,
          dataFiltered: data,
        },
        null,
        API_CONSTANTS.GET_SEARCH_CUSTOMER
      );

      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataOwners(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  return (
    <Modal
      visible={visibleModal}
      closable={true}
      footer={false}
      style={{ top: 20 }}
      width={600}
      onCancel={() => {
        onClose();
      }}
    >
      {finishProcess === false && (
        <ComponentLoadSection isLoadApi={isLoadApi} position="absolute">
          <FormModal>
            <h1>Confirmación de datos</h1>
            <p
              style={{
                textAlign: "center",
                margin: "2em 0px 10px 0px",
              }}
            >
              La información que proporciones a continuación servirá para
              continuar con el proceso de generación personalizada de contrato.
            </p>
            <div>
              <Row>
                <Col span={24}>
                  <MultiSelect>
                    <span style={{ textAlign: "center" }}>
                      ¿Eres el dueño de esta propiedad?
                    </span>
                    <div className="button-actions-select">
                      {catalogOwner.map((row) => {
                        return (
                          <ButtonCheck
                            select={row.id === selectAssociation}
                            onClick={() => {
                              setSelectAssociation(row.id);
                            }}
                          >
                            {row.text}
                          </ButtonCheck>
                        );
                      })}
                    </div>
                  </MultiSelect>
                </Col>
              </Row>
            </div>
            {selectAssociation == "2" && (
              <div>
                <p>Ingresa la información del dueño de la propiedad.</p>
                <Row>
                  <Col span={24}>
                    <CustomInputSelect
                      value={dataForm.ownerEmailAddress}
                      type="text"
                      placeholder="Busca o agrega un usuario"
                      label="Correo electrónico *"
                      error={errorMail}
                      data={dataOwners}
                      errorMessage="Correo inválido"
                      onChange={(value) => {
                        const emailRegex =
                          /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
                        const validateTypeEmail = emailRegex.test(value);
                        setErrorMail(!validateTypeEmail);
                        if (isEmpty(value) === true) {
                          setDataOwners([]);
                        }
                        if (value.length >= 3) {
                          handlerCallSearchCustomer(value);
                        }
                        setDataForm({
                          ...dataForm,
                          ownerGivenName: null,
                          ownerLastName: null,
                          ownerEmailAddress: value,
                          idCustomerOwner: null,
                        });
                      }}
                      onSelectItem={(dataRecord) => {
                        setDataForm({
                          ...dataForm,
                          ownerGivenName: dataRecord.givenName,
                          ownerLastName: dataRecord.lastName,
                          ownerEmailAddress: dataRecord.username,
                          idCustomerOwner: dataRecord.idCustomer,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <CustomInputTypeForm
                      value={dataForm.ownerPhoneNumber}
                      placeholder=""
                      label="Teléfono"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({ ...dataForm, ownerPhoneNumber: value });
                      }}
                      type="number"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <CustomInputTypeForm
                      value={dataForm.ownerGivenName}
                      placeholder=""
                      label="Nombre *"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({ ...dataForm, ownerGivenName: value });
                      }}
                      type="text"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <CustomInputTypeForm
                      value={dataForm.ownerLastName}
                      placeholder=""
                      label="Apellido paterno"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({ ...dataForm, ownerLastName: value });
                      }}
                      type="text"
                    />
                  </Col>
                </Row>
              </div>
            )}
            {isNil(selectAssociation) === false && (
              <div
                className="button-action"
                style={{
                  marginTop: "2em",
                }}
              >
                <ButtonsModal
                  primary
                  onClick={async () => {
                    try {
                      setIsLoadApi(true);
                      await updateProperty({ ...dataForm, idApartment });
                      getById();
                      setFinishProcess(true);
                      setIsLoadApi(false);
                    } catch (error) {
                      setIsLoadApi(false);
                    }
                  }}
                >
                  Finalizar
                </ButtonsModal>
              </div>
            )}
          </FormModal>
        </ComponentLoadSection>
      )}
      {finishProcess === true && (
        <FormModal>
          <h1>Se procesó con éxito tu solicitud</h1>
          <p>Te seguiremos informando de los siguientes pasos a seguir.</p>
          <div className="icon-image-send">
            <IconStyleCheck />
          </div>
          <div
            className="button-action"
            style={{
              marginTop: "2em",
            }}
          >
            <ButtonsModal
              primary
              onClick={() => {
                onClose();
              }}
            >
              Cerrar
            </ButtonsModal>
          </div>
        </FormModal>
      )}
    </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionAreYouOwner);
