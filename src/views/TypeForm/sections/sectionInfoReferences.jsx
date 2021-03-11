import React from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col } from "antd";
import CustomReferences from "./customReference";

const SectionInfoReferences = (props) => {
  const {
    onClickNext,
    dataFormSave,
    onClickSendReferences,
    dataReferences,
  } = props;

  return (
    <div className="content-typeform-formulary">
      <h3>Referencias</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <CustomReferences
            dataReferences={
              isEmpty(dataReferences) === false &&
              isNil(dataReferences[0]) === false
                ? dataReferences[0]
                : []
            }
            title="Referencia 1"
            onClickAdd={(data) => {
              onClickSendReferences({
                ...data,
                idTypeForm: dataFormSave.idTypeForm,
              });
            }}
          />
          <CustomReferences
            dataReferences={
              isEmpty(dataReferences) === false &&
              isNil(dataReferences[1]) === false
                ? dataReferences[1]
                : []
            }
            title="Referencia 2"
            onClickAdd={(data) => {
              onClickSendReferences({
                ...data,
                idTypeForm: dataFormSave.idTypeForm,
              });
            }}
          />
          <CustomReferences
            dataReferences={
              isEmpty(dataReferences) === false &&
              isNil(dataReferences[2]) === false
                ? dataReferences[2]
                : []
            }
            title="Referencia 3"
            onClickAdd={(data) => {
              onClickSendReferences({
                ...data,
                idTypeForm: dataFormSave.idTypeForm,
              });
            }}
          />
          <div className="button_actions">
            {/* <button
              type="button"
              onClick={onClickBack}
              className="button_secondary"
            >
              <span>Regresar</span>
            </button> */}

            <button
              type="button"
              onClick={onClickNext}
              className="button_primary"
            >
              <span>Continuar</span>
            </button>
          </div>
        </Col>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
      </Row>
    </div>
  );
};

export default SectionInfoReferences;
