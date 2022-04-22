import React from "react";
import styled from "styled-components";
import { Row, Col } from "antd";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
  ComponentRadio,
} from "../constants/styleConstants";
import CustomDialog from "../../../components/CustomDialog";

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

const SectionIdentity = ({ onClickNext }) => {
  return (
    <ContentForm>
      <div className="header-title">
        <h1>Documentos de identidad</h1>
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <span>
                Comenzaremos con la verificación de tu documento de identidad
              </span>
              <br />
              <span>
                Para evitar errores en la información personal que aparecerá en
                el contrato de arrendamiento es necesario capturar una foto de
                tu identificación oficial y de ser necesario una selfie.
              </span>
            </Col>
          </Row>
        </div>
        <div className="type-property">
          <AlignItems>
            <ContentFile>
              <UploadSection>
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
                />
              </UploadSection>
            </ContentFile>
            <ContentFile>
              <UploadSection>
                <div className="upload-file">
                  <i
                    className="fa fa-camera"
                    style={{ fontSize: "2em", color: "#A0A3BD" }}
                  ></i>
                  <span>Identificación Oficial (Frontal)</span>
                </div>
              </UploadSection>
            </ContentFile>
            <ContentFile>
              <UploadSection>
                <div className="upload-file">
                  <i
                    className="fa fa-camera"
                    style={{ fontSize: "2em", color: "#A0A3BD" }}
                  ></i>
                  <span>Identificación Oficial (Trasera)</span>
                </div>
              </UploadSection>
            </ContentFile>
          </AlignItems>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage block={true} onClick={() => {}}>
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              onClickNext();
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

export default SectionIdentity;
