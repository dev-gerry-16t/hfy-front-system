import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Modal, Row, Col, Select } from "antd";
import styled from "styled-components";
import { FormModal, ButtonsModal } from "../constants/styleConstants";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import { ReactComponent as IconSendInvitation } from "../../../assets/iconSvg/svgFile/iconSendInvitation.svg";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import CustomInputSelect from "../../../components/customInputSelect";
import ComponentLoadSection from "../../../components/componentLoadSection";

const { Option } = Select;

const Input = styled.input`
  padding: 5px 6px;
  border-radius: 5px;
  background: ${(props) => props.background};
  border: ${(props) =>
    props.error ? "1px solid #DA1414" : "1px solid #d6d8e7"};
  outline: none;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  width: 100%;
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    border: 1px solid #b9bbc7;
  }
  &:hover {
    border: 1px solid #b9bbc7;
  }
  &::placeholder {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.2);
  }
`;

const MultiSelect = styled.div`
  background: #fff;
  position: absolute;
  top: 57px;
  width: 100%;
  z-index: 1;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014,
    0 9px 28px 8px #0000000d;
  border-radius: 0px 0px 10px 10px;
  padding: 5px;
  max-height: 200px;
  overflow-y: scroll;
`;

const Item = styled.div`
  padding: 5px;
  border-bottom: 1px solid rgba(78, 75, 102, 0.2);
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &:hover {
    background-color: #ddd;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const ComponentAddCandidate = (props) => {
  const {
    isModalVisible,
    onClose,
    sendInvitation,
    callGlobalActionApi,
    dataProfile,
  } = props;
  const initialForm = {
    givenName: null,
    lastName: null,
    emailAddress: null,
    idCustomer: null,
    idInvitation: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [finishInvitation, setFinishInvitation] = useState(false);
  const [isVisibleSelect, setIsVisibleSelect] = useState(true);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [dataTenants, setDataTenants] = useState([]);
  const frontFunctions = new FrontFunctions();
  const selectRef = useRef(null);

  const handlerCallSearchCustomer = async (data = null) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 6,
          dataFiltered: data,
        },
        null,
        API_CONSTANTS.GET_SEARCH_CUSTOMER
      );

      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataTenants(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallSearchCustomer();
  }, []);

  return (
    <Modal
      visible={isModalVisible}
      closable={false}
      footer={false}
      style={{ top: 20 }}
      width={600}
    >
      <FormModal>
        <ComponentLoadSection isLoadApi={isLoadApi} position="absolute">
          {finishInvitation === false && (
            <>
              <h1>Agregar un Prospecto</h1>
              <p>
                Enviaremos una invitación a tu prospecto invitandolo a conocer y
                aplicar a esta propiedad a través de su correo electrónico.
              </p>
              <div>
                <Row>
                  <Col span={24}>
                    <CustomInputSelect
                      value={dataForm.emailAddress}
                      type="text"
                      label="Correo electrónico *"
                      error={false}
                      data={dataTenants}
                      onChange={(value) => {
                        if (isEmpty(value) === true) {
                          setDataTenants([]);
                        }
                        if (value.length >= 3) {
                          handlerCallSearchCustomer(value);
                        }
                        setDataForm({
                          ...dataForm,
                          emailAddress: value,
                          givenName: null,
                          lastName: null,
                          idCustomer: null,
                        });
                      }}
                      onSelectItem={(dataRecord) => {
                        setDataForm({
                          ...dataForm,
                          givenName: dataRecord.givenName,
                          lastName: dataRecord.lastName,
                          emailAddress: dataRecord.username,
                          idCustomer: dataRecord.idCustomer,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <CustomInputTypeForm
                      value={dataForm.givenName}
                      placeholder=""
                      label="Nombre"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({
                          ...dataForm,
                          givenName: value,
                        });
                      }}
                      type="text"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <CustomInputTypeForm
                      value={dataForm.lastName}
                      placeholder=""
                      label="Apellido paterno"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({
                          ...dataForm,
                          lastName: value,
                        });
                      }}
                      type="text"
                    />
                  </Col>
                </Row>
              </div>
              <div className="button-action">
                <ButtonsModal
                  primary
                  onClick={async () => {
                    try {
                      setIsLoadApi(true);
                      await sendInvitation(dataForm);
                      setDataForm(initialForm);
                      setFinishInvitation(true);
                      setDataTenants([]);
                      setIsLoadApi(false);
                    } catch (error) {
                      setIsLoadApi(false);
                    }
                  }}
                >
                  Enviar invitación
                </ButtonsModal>
                <ButtonsModal
                  onClick={() => {
                    onClose();
                    setDataForm(initialForm);
                    setDataTenants([]);
                  }}
                >
                  Cancelar
                </ButtonsModal>
              </div>
            </>
          )}
          {finishInvitation === true && (
            <>
              <h1>¡Todo está listo!</h1>
              <div className="icon-image-send">
                <IconSendInvitation />
              </div>
              <h2>La invitación ha sido enviada</h2>
              <p
                style={{
                  padding: "0px 8em",
                  textAlign: "justify",
                  fontSize: "1em",
                }}
              >
                El candidato ha sido notificado, te deseamos mucho exito en tu
                proceso
              </p>
              <div className="button-action">
                <ButtonsModal
                  onClick={() => {
                    onClose();
                    setFinishInvitation(false);
                    setDataForm(initialForm);
                    setDataTenants([]);
                  }}
                  primary
                >
                  Cerrar
                </ButtonsModal>
              </div>
            </>
          )}
        </ComponentLoadSection>
      </FormModal>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComponentAddCandidate);
