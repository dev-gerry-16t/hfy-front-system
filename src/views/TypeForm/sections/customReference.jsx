import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import { Input, Row, Col } from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";

const CustomReferences = (props) => {
  const { title, onClickAdd, dataReferences } = props;
  const initialForm = {
    givenName: null,
    lastName: null,
    mothersMaidenName: null,
    phoneNumber: null,
    emailAddress: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [isVisibleAdd, setIsVisibleAdd] = useState(true);
  const [clickAddReference, setClickAddReference] = useState(false);

  useEffect(() => {
    if (isEmpty(dataReferences) === false) {
      setDataForm(dataReferences);
    }
  }, [dataReferences]);

  return (
    <>
      <p style={{ marginBottom: 25 }}>{title}</p>
      <Row>
        <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
          <CustomInputTypeForm
            placeholder="Nombres*"
            onChange={(value) => {
              setDataForm({ ...dataForm, givenName: value });
            }}
            suffix={<img src={IconProfile} alt="profile" width="15" />}
            value={dataForm.givenName}
          />
        </Col>
        <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
        <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
          <CustomInputTypeForm
            placeholder="Apellido paterno*"
            onChange={(value) => {
              setDataForm({ ...dataForm, lastName: value });
            }}
            suffix={<img src={IconProfile} alt="profile" width="15" />}
            value={dataForm.lastName}
          />
        </Col>
        <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
        <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
          <CustomInputTypeForm
            placeholder="Apellido materno"
            onChange={(value) => {
              setDataForm({ ...dataForm, mothersMaidenName: value });
            }}
            suffix={<img src={IconProfile} alt="profile" width="15" />}
            value={dataForm.mothersMaidenName}
          />
        </Col>
      </Row>
      <Row>
        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
          <CustomInputTypeForm
            placeholder="Teléfono*"
            onChange={(value) => {
              setDataForm({ ...dataForm, phoneNumber: value });
            }}
            value={dataForm.phoneNumber}
          />
        </Col>
        <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
        <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
          <CustomInputTypeForm
            placeholder="Correo"
            onChange={(value) => {
              setDataForm({ ...dataForm, emailAddress: value });
            }}
            value={dataForm.emailAddress}
          />
        </Col>
        {isVisibleAdd === true && (
          <div style={{ width: "100%", marginBottom: 30 }}>
            <div className="button_actions">
              <button
                type="button"
                onClick={async () => {
                  try {
                    if (clickAddReference === false) {
                      setClickAddReference(true);
                      setIsVisibleAdd(false);
                      await onClickAdd(dataForm);
                      setClickAddReference(false);
                    }
                  } catch (error) {}
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
