import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import SignatureCanvas from "react-signature-canvas";
import "antd/dist/antd.css";
import { Checkbox, message, Spin, Modal } from "antd";
import { PhoneOutlined, SyncOutlined } from "@ant-design/icons";
import { callGlobalActionApi } from "../../utils/actions/actions";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import FrontFunctions from "../../utils/actions/frontFunctions";
import ENVIROMENT from "../../utils/constants/enviroments";
import logo from "../../assets/img/logo.png";
import { ReactComponent as IconInvitation } from "../../assets/iconSvg/svgFile/iconMailLetter.svg";
import { ReactComponent as IconSendInvitation } from "../../assets/iconSvg/svgFile/iconSendInvitation.svg";
import ComponentLoadSection from "../../components/componentLoadSection";

const FormModal = styled.div`
  font-family: Poppins;
  padding: 1em 2em;
  h1 {
    text-align: center;
    color: var(--color-primary);
  }
  h2 {
    color: #4e4b66;
    font-weight: 700;
    text-align: center;
  }
  .icon-image-send {
    text-align: center;
    margin: 4em 0px;
  }
  p {
    text-align: center;
    color: #4e4b66;
    font-size: 1em;
    margin: 2em 0px;
  }
  .image-platforms {
    margin: 2em 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .input-checkbox {
      input[type="checkbox"] {
        appearance: none;
        background-color: #fff;
        font: inherit;
        color: #fff;
        width: 1.15em;
        height: 1.15em;
        border: 1px solid var(--color-primary);
        border-radius: 5px;
        display: inline-grid;
        place-content: center;
        margin-right: 10px;
      }
      input[type="checkbox"]::before {
        content: "\\2713";
        transform: scale(0);
        width: 1.05em;
        height: 1.05em;
        border-radius: 5px;
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--color-primary);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      input[type="checkbox"]:checked::before {
        transform: scale(1);
      }
    }
  }
  .button-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
`;

const ButtonsModal = styled.button`
  border: none;
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  border-radius: 1em;
  padding: 5px 2em;
  margin-bottom: 5px;
  font-size: 1em;
  text-decoration: ${(props) => (props.primary ? "none" : "underline")};
  font-weight: 700;
`;

const ReportInvitation = (props) => {
  const { callGlobalActionApi, match } = props;
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [finishApi, setFinisApi] = useState(false);
  const frontFunctions = new FrontFunctions();

  const handlerCallProcessInvitation = async (datBit) => {
    const { params } = match;
    try {
      await callGlobalActionApi(
        {
          isAccepted: null,
          isReported: datBit,
          idSystemUser: null,
          idLoginHistory: null,
        },
        params.idInvitation,
        API_CONSTANTS.PROCESS_INVITATION,
        "PUT",
        false
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
    <div className="App">
      <div className="login_head_logo">
        <img src={logo} alt="Homify Logo" className="login_logo" />
      </div>
      <div className="login_main">
        <Modal
          visible={isModalVisible}
          closable={false}
          footer={false}
          style={{ top: 20 }}
          width={600}
        >
          <FormModal>
            {finishApi === false && (
              <>
                <ComponentLoadSection isLoadApi={isLoadApi} position="absolute">
                  <h1>Reportar invitación</h1>
                  <div className="icon-image-send">
                    <IconInvitation />
                  </div>
                  <h2>¿Deseas reportar la invitación recibida?</h2>
                  <p
                    style={{
                      padding: "0px 8em",
                      textAlign: "justify",
                      fontSize: "1em",
                    }}
                  >
                    Al reportar esta invitación dejaremos de enviarte correos de
                    este tipo.
                  </p>
                  <div className="button-action">
                    <ButtonsModal
                      onClick={async () => {
                        try {
                          setIsLoadApi(true);
                          await handlerCallProcessInvitation(true);
                          setIsLoadApi(false);
                          setFinisApi(true);
                        } catch (error) {
                          setIsLoadApi(false);
                        }
                      }}
                      primary
                    >
                      Reportar
                    </ButtonsModal>
                  </div>
                </ComponentLoadSection>
              </>
            )}
            {finishApi === true && (
              <>
                <h1>Reporte enviado</h1>
                <div className="icon-image-send">
                  <IconSendInvitation />
                </div>
                <h2>¡Tu reporte se realizó con éxito!</h2>
                <p
                  style={{
                    padding: "0px 8em",
                    textAlign: "justify",
                    fontSize: "1em",
                  }}
                >
                  Lamentamos este error, a partir de ahora no recibiras correos.
                </p>
              </>
            )}
          </FormModal>
        </Modal>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportInvitation);
