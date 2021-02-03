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

const { Option } = Select;

const CustomReferences = (props) => {
  const {
    onClickBack,
    onClickNext,
    dataFormSave,
    title,
    onClickAdd,
    dataReferences,
  } = props;
  const initialForm = {
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    phoneNumber: null,
    emailAddress: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [isVisibleAdd, setIsVisibleAdd] = useState(true);

  useEffect(() => {
    if (isEmpty(dataReferences) === false) {
      setDataForm(dataReferences);
    }
  }, [dataReferences]);

  return (
    <>
      <p>{title}</p>
      <Row>
        <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
          <Input
            placeholder={"Nombres"}
            onChange={(e) => {
              setDataForm({ ...dataForm, givenName: e.target.value });
            }}
            suffix={<img src={IconProfile} alt="profile" width="15" />}
            value={dataForm.givenName}
          />
        </Col>
        <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
        <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
          <Input
            placeholder={"Apellido paterno"}
            onChange={(e) => {
              setDataForm({ ...dataForm, lastName: e.target.value });
            }}
            suffix={<img src={IconProfile} alt="profile" width="15" />}
            value={dataForm.lastName}
          />
        </Col>
        <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
        <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
          <Input
            placeholder={"Apellido materno"}
            onChange={(e) => {
              setDataForm({ ...dataForm, mothersMaidenName: e.target.value });
            }}
            suffix={<img src={IconProfile} alt="profile" width="15" />}
            value={dataForm.mothersMaidenName}
          />
        </Col>
      </Row>
      <Row>
        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
          <Input
            placeholder={"Telefono"}
            onChange={(e) => {
              setDataForm({ ...dataForm, phoneNumber: e.target.value });
            }}
            value={dataForm.phoneNumber}
          />
        </Col>
        <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
          <Input
            placeholder={"Correo"}
            onChange={(e) => {
              setDataForm({ ...dataForm, emailAddress: e.target.value });
            }}
            value={dataForm.emailAddress}
          />
        </Col>
        {isVisibleAdd === true && (
          <div style={{ width: "100%" }}>
            <div className="button_actions">
              <button
                type="button"
                onClick={() => {
                  setIsVisibleAdd(false);
                  onClickAdd(dataForm);
                }}
                className="button_primary"
              >
                <span>
                  {isEmpty(dataReferences) === false ? "Guardar" : "Agregar"}
                </span>
              </button>
            </div>
          </div>
        )}
      </Row>
    </>
  );
};

export default CustomReferences;
