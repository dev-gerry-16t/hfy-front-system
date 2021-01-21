import React from "react";
import {
  Layout,
  Avatar,
  Rate,
  Modal,
  Input,
  Row,
  Col,
  Select,
  Spin,
  Tooltip,
  Upload,
  Radio,
} from "antd";
import CustomFileUpload from "./customFileUpload";

const { Dragger } = Upload;

const SectionDocumentation = (props) => {
  const { onClickBack, onClickNext } = props;
  return (
    <div className="content-typeform-formulary">
      <h3>Documentación</h3>
      <div className="section-top-documentation">
        <div className="section-card-documentation">
          <div className="section-title-card-doc">
            <strong>Selfie</strong>
            <span style={{ visibility: "hidden" }}>N/A</span>
          </div>
          <div className="section-content-card-doc">
            <CustomFileUpload />
          </div>
        </div>
        <div className="section-card-documentation">
          <div className="section-title-card-doc">
            <strong>INE</strong>
            <span>Frente y vuelta</span>
          </div>
          <div className="section-content-card-doc">
            <CustomFileUpload />
            <CustomFileUpload />
          </div>
        </div>
        <div className="section-card-documentation">
          <div className="section-title-card-doc">
            <strong>Carta laboral</strong>
            <span>Membretada y firmada</span>
          </div>
          <div className="section-content-card-doc">
            <CustomFileUpload />
          </div>
        </div>
      </div>
      <div className="section-bottom-documentation">
        <div className="section-card-documentation">
          <div className="section-title-card-doc">
            <strong>últimos 3 comprobantes de ingreso</strong>
            <span style={{ visibility: "hidden" }}>N/A</span>
          </div>
          <div className="section-content-card-doc">
            <CustomFileUpload />
            <CustomFileUpload />
            <CustomFileUpload />
          </div>
        </div>
      </div>
      <div className="button_actions">
        <button
          type="button"
          onClick={onClickBack}
          className="button_secondary"
        >
          <span>Regresar</span>
        </button>
        <button type="button" onClick={onClickNext} className="button_primary">
          <span>Continuar</span>
        </button>
      </div>
    </div>
  );
};

export default SectionDocumentation;
