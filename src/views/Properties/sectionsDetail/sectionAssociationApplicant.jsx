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
import { ReactComponent as IconAssociate } from "../../../assets/iconSvg/svgFile/iconAssociate.svg";
import { ReactComponent as IconRejected } from "../../../assets/iconSvg/svgFile/iconRejected.svg";

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

const catalogAssociation = [
  { id: "1", text: "Aceptar" },
  { id: "2", text: "Rechazar" },
];

const SectionAssociationApplicant = (props) => {
  const { callGlobalActionApi, dataProfile, history } = props;
  const dataContexProperty = useContext(ContextProperty);
  const { dataDetail, updateProperty } = dataContexProperty;
  const {
    fullAddress,
    idProperty,
    idApartment,
    canAcceptInvitation,
    identifier,
  } = dataDetail;
  const [visibleModal, setVisibleModal] = useState(false);
  const [finishProcess, setFinishProcess] = useState(false);
  const [selectAssociation, setSelectAssociation] = useState(null);
  const [methodAssociation, setMethodAssociation] = useState(null);
  const [selectProperty, setSelectProperty] = useState(null);
  const [acceptProperty, setAcceptProperty] = useState(true);
  const [dataPropertyParent, setDataPropertyParent] = useState({});
  const [newInfoProperty, setNewInfoProperty] = useState({});
  const [dataProperty, setDataProperty] = useState([]);
  const frontFunctions = new FrontFunctions();

  const handlerCallApplyToProperty = async (data, id) => {
    const { idSystemUser, idLoginHistory } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        id,
        API_CONSTANTS.CUSTOMER.APPLY_TO_PROPERTY,
        "PUT"
      );
      return response.response;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  useEffect(() => {
    if (canAcceptInvitation === true) {
      setVisibleModal(true);
    }
  }, [canAcceptInvitation]);

  return (
    <Modal
      visible={visibleModal}
      closable={finishProcess === false}
      footer={false}
      style={{ top: 20 }}
      width={600}
      onCancel={() => {
        if (finishProcess === false) {
          setVisibleModal(false);
        }
      }}
    >
      {finishProcess === false && (
        <FormModal>
          <h1>Invitación a propiedad</h1>
          <p>
            Has recibido una invitación para ser inquilino en esta propiedad
          </p>
          <div className="icon-image-send">
            <IconMailLetter />
          </div>

          <div>
            <Row>
              <Col span={24}>
                <MultiSelect>
                  <span style={{ textAlign: "center" }}>
                    ¿Qué deseas hacer con tu invitación?
                  </span>
                  <div className="button-actions-select">
                    {catalogAssociation.map((row) => {
                      return (
                        <ButtonCheck
                          select={row.id === selectAssociation}
                          onClick={() => {
                            if (row.id === "1") {
                              setAcceptProperty(true);
                            }
                            if (row.id === "2") {
                              setAcceptProperty(false);
                            }
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
                    const response = await handlerCallApplyToProperty(
                      {
                        isAccepted: acceptProperty,
                        idApartment,
                        identifier,
                      },
                      idProperty
                    );
                    setFinishProcess(true);
                  } catch (error) {}
                }}
              >
                Finalizar
              </ButtonsModal>
            </div>
          )}
        </FormModal>
      )}
      {finishProcess === true && (
        <FormModal>
          <h1>Se procesó con éxito tu solicitud</h1>
          <p>
            {selectAssociation === "2"
              ? "Haz rechazado la invitación a esta propiedad"
              : "¡Felicidades, aceptaste la invitación a la propiedad!"}
          </p>
          <div className="icon-image-send">
            {selectAssociation === "2" ? <IconRejected /> : <IconAssociate />}
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
                setVisibleModal(false);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionAssociationApplicant);
