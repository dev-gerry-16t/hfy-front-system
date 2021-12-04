import React, { useState, useEffect } from "react";
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
import CustomInputCurrency from "../../../components/customInputCurrency";
import CustomInputSelect from "../../../components/customInputSelect";
import ComponentLoadSection from "../../../components/componentLoadSection";

const { Option } = Select;

const ComponentAddAgent = (props) => {
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
    mothersMaidenName: null,
    commissionAmount: null,
    isActive: true,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [finishInvitation, setFinishInvitation] = useState(false);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [dataAgents, setDataAgents] = useState([]);
  const frontFunctions = new FrontFunctions();

  const handlerCallSearchCustomer = async (data = null) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 5,
          dataFiltered: data,
        },
        null,
        API_CONSTANTS.GET_SEARCH_CUSTOMER
      );

      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataAgents(responseResult);
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
              <h1>Comparte con Agente</h1>
              <p>
                Se le enviará una notificación al asesor para aceptar la
                invitación
              </p>
              <div>
                <Row>
                  <Col span={24}>
                    <CustomInputSelect
                      value={dataForm.emailAddress}
                      type="text"
                      label="Correo electrónico *"
                      error={false}
                      data={dataAgents}
                      onChange={(value) => {
                        if (isEmpty(value) === true) {
                          setDataAgents([]);
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
                      label="Nombre *"
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
                      label="Apellido paterno *"
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
                {dataProfile.idUserType === 4 && (
                  <Row>
                    <Col span={24}>
                      <CustomInputCurrency
                        value={dataForm.commissionAmount}
                        placeholder="Comisión que deseas compartir con este agente"
                        label="Monto de comisión"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            commissionAmount: value,
                          });
                        }}
                        type="number"
                        prefix="$"
                        suffix=""
                      />
                    </Col>
                  </Row>
                )}
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
                      setDataAgents([]);
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
                    setDataAgents([]);
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
                El agente ha sido notificado, te deseamos mucho exito en tu
                proceso
              </p>
              <div className="button-action">
                <ButtonsModal
                  onClick={() => {
                    onClose();
                    setFinishInvitation(false);
                    setDataForm(initialForm);
                    setDataAgents([]);
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

export default connect(mapStateToProps, mapDispatchToProps)(ComponentAddAgent);
