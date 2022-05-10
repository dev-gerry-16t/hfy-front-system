import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import styled, { keyframes } from "styled-components";
import { Row, Col } from "antd";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
  ComponentRadio,
} from "../constants/styleConstants";
import ContextForm from "../context/contextForm";
import CustomDialog from "../../../components/CustomDialog";
import { IconDelete, IconEditSquare, IconEye } from "../../../assets/iconSvg";
import CustomSelect from "../../../components/CustomSelect";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import CustomReactMati from "../../../components/customReactMati";

const rotate360 = keyframes`
0% { transform: rotate(0) }
50%{transform: rotate(200deg)}
100% { transform: rotate(360deg) }
`;

const ButtonFiles = styled.button`
  width: 2em;
  height: 2em;
  border-radius: 0.5em;
  background: rgba(214, 216, 231, 0.64);
  border: none;
  margin-right: 0.3em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentFile = styled.div`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0px;
  @media screen and (max-width: 320px) {
    width: 100%;
    font-size: 12px;
  }
`;

const AlignItems = styled.div`
  display: flex;
  justify-content: space-around;
`;

const UploadSection = styled.div`
  width: 18em;
  height: 8.8em;
  border: 1px dashed #a0a3bd;
  border-radius: 4px;
  background: #f7f7fc;
  position: relative;
  .upload-file {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 1em 0;
    cursor: pointer;
    span {
      font-size: 0.8em;
      color: #a0a3bd;
      text-align: center;
      font-weight: 700;
    }
  }
  .content-file-preview {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40%;
    background: #fff;
    height: 100%;
    margin: 0px auto;
    font-size: 3em;
    color: var(--color-primary);
    img {
      width: 2.4em;
      height: 2.9em;
      object-fit: cover;
    }
  }
  .content-buttons-file {
    position: absolute;
    bottom: 1em;
    right: 1em;
    display: none;
  }
  &:hover {
    .content-buttons-file {
      display: flex;
      flex-direction: row;
    }
  }
  @media screen and (max-width: 420px) {
    width: 100%;
    .content-buttons-file {
      display: flex;
      flex-direction: row;
    }
  }
  @media screen and (max-width: 320px) {
    .content-file-preview {
      img {
        width: 100%;
      }
    }
  }
`;

const LoadSquare = styled.div`
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 270px;
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
    height: 260px;
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
      font-size: 1.5em;
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
  const { callGlobalActionApi, onClickNext, onUpdateInformation } = props;

  const [dataSelfieSrc, setDataSelifeSrc] = useState(null);
  const [dataOfficialIdFrontSrc, setDataOfficialIdFrontSrc] = useState(null);
  const [dataOfficialIdBackSrc, setDataOfficialIdBackSrc] = useState(null);
  const [dataForm, setDataForm] = useState({});
  const [finishVerification, setFinishVerification] = useState(false);

  const dataContextForm = useContext(ContextForm);
  const { dataFormSave, idUserInRequest } = dataContextForm;

  const frontFunctions = new FrontFunctions();

  const handlerAddDocument = async (fileIndex, file) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileIndex);
    reader.onload = async (event) => {
      const imgElement = document.createElement("img");
      imgElement.src = event.target.result;
      imgElement.onload = async (event1) => {
        const canvas = document.createElement("canvas");
        const width = event1.target.width;
        const height = event1.target.height;

        const MAX_WIDTH = 1000;
        const scaleSize = MAX_WIDTH / width;

        canvas.width = MAX_WIDTH;
        canvas.height = height * scaleSize;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(event1.target, 0, 0, canvas.width, canvas.height);
        const srcEncoded = ctx.canvas.toDataURL("image/jpeg", 0.8);
        if (file === "selfie") {
          setDataSelifeSrc(srcEncoded);
        } else if (file === "id-front") {
          setDataOfficialIdFrontSrc(srcEncoded);
        } else if (file === "id-back") {
          setDataOfficialIdBackSrc(srcEncoded);
        }
      };
    };
  };

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      setFinishVerification(!dataFormSave.hasMatiFlow);
    }
  }, [dataFormSave]);

  return (
    <ContentForm>
      <div className="header-title">
        {isEmpty(dataFormSave) === false && (
          <h1>
            {dataFormSave.requiresVerification === true ||
            dataFormSave.requiresVerification === 1
              ? "Identidad"
              : "Documentos de identidad"}
          </h1>
        )}
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <span>Comenzaremos con la validación de tu identidad</span>
              <br />
              <span>
                Para evitar errores en la información personal que aparecerá en
                el contrato de arrendamiento es necesario{" "}
                <strong>tener a la mano una identificación oficial</strong> y de
                ser necesario una selfie.
              </span>
            </Col>
          </Row>
        </div>
        <div className="type-property">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isEmpty(dataFormSave) === false &&
            dataFormSave.hasMatiFlow === true ? (
              <LoadSquare>
                <div className="load-border">
                  <span></span>
                  <span></span>
                </div>
                <div className="content-identity">
                  <h1>
                    {isNil(dataFormSave.verificationStatus) === false
                      ? dataFormSave.verificationStatus
                      : "Documentos"}
                  </h1>
                  <span>
                    {isNil(dataFormSave.verificationDesc) === false
                      ? dataFormSave.verificationDesc
                      : "Haz clic en el botón para subir los documentos de identidad necesarios para el proceso"}
                  </span>
                  <div
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <CustomReactMati
                      clientId={dataFormSave.clientId}
                      flowId={dataFormSave.matiFlowId}
                      country="mx"
                      loaded={() => {}}
                      product="kyc"
                      color={document.getElementsByTagName("body")[0].className}
                      metadata={{
                        idUserInRequest,
                        idCustomer: dataFormSave.idCustomer,
                      }}
                      exited={() => {}}
                      finished={() => {
                        onUpdateInformation();
                      }}
                    />
                  </div>
                </div>
              </LoadSquare>
            ) : (
              <LoadSquare>
                <div className="load-border">
                  <span></span>
                  <span></span>
                </div>
                <div className="content-identity">
                  <h1>Concluido</h1>
                  <span>
                    Haz clic en Continuar o Siguiente para continuar con tu
                    proceso
                  </span>
                  <div
                    style={{
                      marginTop: "20px",
                    }}
                  >
                    <ButtonContinue
                      onClick={() => {
                        onClickNext();
                      }}
                    >
                      Continuar
                    </ButtonContinue>
                  </div>
                </div>
              </LoadSquare>
            )}
          </div>
          {/* <AlignItems>
            {isEmpty(dataFormSave) === false &&
              (dataFormSave.requiresVerification === 1 ||
                dataFormSave.requiresVerification === true) && (
                <ContentFile>
                  <UploadSection>
                    {isNil(dataSelfieSrc) === true && (
                      <>
                        <label className="upload-file" for="selfie-user-form">
                          <i
                            className="fa fa-camera"
                            style={{ fontSize: "2em", color: "#A0A3BD" }}
                          ></i>
                          <span>Tomate una foto (Solo la cara)</span>
                        </label>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          accept="image/*;capture=camera"
                          id="selfie-user-form"
                          onChange={(e) => {
                            const fileIndex = e.target.files[0];
                            handlerAddDocument(fileIndex, "selfie");
                          }}
                        />
                      </>
                    )}
                    {isNil(dataSelfieSrc) === false && (
                      <div className="content-file-preview">
                        <img src={dataSelfieSrc} alt="preview" />
                      </div>
                    )}
                    {isNil(dataSelfieSrc) === false && (
                      <div className="content-buttons-file">
                        {/* <ButtonFiles onClick={() => {}}>
                      <IconEye color="var(--color-primary)" />
                    </ButtonFiles> }
                        <ButtonFiles
                          onClick={async () => {
                            try {
                              setDataSelifeSrc(null);
                            } catch (error) {}
                          }}
                        >
                          <IconDelete color="var(--color-primary)" />
                        </ButtonFiles>
                      </div>
                    )}
                  </UploadSection>
                </ContentFile>
              )}
            <ContentFile>
              <UploadSection>
                {isNil(dataOfficialIdFrontSrc) === true && (
                  <>
                    <label className="upload-file" for="id-front-user-form">
                      <i
                        className="fa fa-camera"
                        style={{ fontSize: "2em", color: "#A0A3BD" }}
                      ></i>
                      <span>Identificación Oficial (Frontal)</span>
                    </label>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*;capture=camera"
                      id="id-front-user-form"
                      onChange={(e) => {
                        const fileIndex = e.target.files[0];
                        handlerAddDocument(fileIndex, "id-front");
                      }}
                    />
                  </>
                )}
                {isNil(dataOfficialIdFrontSrc) === false && (
                  <div className="content-file-preview">
                    <img src={dataOfficialIdFrontSrc} alt="preview" />
                  </div>
                )}
                {isNil(dataOfficialIdFrontSrc) === false && (
                  <div className="content-buttons-file">
                    {<ButtonFiles onClick={() => {}}>
                      <IconEye color="var(--color-primary)" />
                    </ButtonFiles>}
                    <ButtonFiles
                      onClick={async () => {
                        try {
                          setDataOfficialIdFrontSrc(null);
                        } catch (error) {}
                      }}
                    >
                      <IconDelete color="var(--color-primary)" />
                    </ButtonFiles>
                  </div>
                )}
              </UploadSection>
            </ContentFile>
            <ContentFile>
              <UploadSection>
                {isNil(dataOfficialIdBackSrc) === true && (
                  <>
                    <label className="upload-file" for="id-back-user-form">
                      <i
                        className="fa fa-camera"
                        style={{ fontSize: "2em", color: "#A0A3BD" }}
                      ></i>
                      <span>Identificación Oficial (Trasera)</span>
                    </label>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      accept="image/*;capture=camera"
                      id="id-back-user-form"
                      onChange={(e) => {
                        const fileIndex = e.target.files[0];
                        handlerAddDocument(fileIndex, "id-back");
                      }}
                    />
                  </>
                )}
                {isNil(dataOfficialIdBackSrc) === false && (
                  <div className="content-file-preview">
                    <img src={dataOfficialIdBackSrc} alt="preview" />
                  </div>
                )}
                {isNil(dataOfficialIdBackSrc) === false && (
                  <div className="content-buttons-file">
                    {<ButtonFiles onClick={() => {}}>
                      <IconEye color="var(--color-primary)" />
                    </ButtonFiles>}
                    <ButtonFiles
                      onClick={async () => {
                        try {
                          setDataOfficialIdBackSrc(null);
                        } catch (error) {}
                      }}
                    >
                      <IconDelete color="var(--color-primary)" />
                    </ButtonFiles>
                  </div>
                )}
              </UploadSection>
            </ContentFile>
          </AlignItems> */}
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage block={true} onClick={() => {}}>
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={finishVerification === false}
            onClick={async () => {
              try {
                if (finishVerification === true) {
                  onClickNext();
                }
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

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionIdentity);
