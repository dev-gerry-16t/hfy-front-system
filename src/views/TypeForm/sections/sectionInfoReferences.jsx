import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
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
  Radio,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";
import CustomReferences from "./customReference";

const { Option } = Select;

const SectionInfoReferences = (props) => {
  const {
    onClickBack,
    onClickNext,
    dataFormSave,
    onClickSendReferences,
    dataReferences,
  } = props;
  const initialForm = {
    jobPosition: null,
    economicDependents: null,
    companyName: null,
    currentSalary: null,
    antiquityTimeRange: null,
    antiquity: null,
    bossName: null,
    bossEmailAddress: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [isVisibleButtonContinue, setIsVisibleButtonContinue] = useState(false);

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      setDataForm(dataFormSave);
    }
  }, [dataFormSave]);

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
              setIsVisibleButtonContinue(true);
            }}
          />
          <div className="button_actions">
            <button
              type="button"
              onClick={onClickBack}
              className="button_secondary"
            >
              <span>Regresar</span>
            </button>

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
