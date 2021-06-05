import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import { Input, Row, Col, Select, Radio, DatePicker, Alert, Modal } from "antd";

const { Option } = Select;

const SectionBankInfo = (props) => {
  const {
    onClickBack,
    onClickFinish,
    dataBank,
    dataFormSave,
    dataProperties,
    onGetProperties,
    dataPropertiesInfo,
  } = props;
  const initialForm = {
    isInCash: null,
    idBank: null,
    idBankText: null,
    bankBranch: null,
    accountHolder: null,
    accountNumber: null,
    clabeNumber: null,
    signingAvailabilityAt: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);
  const [confirmData, setConfirmData] = useState(false);

  const DescriptionItem = ({ title, content, isRequired }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{ fontFamily: "Poppins" }}
    >
      <strong
        className="site-description-item-profile-p-label"
        style={{ marginRight: 10 }}
      >
        {title}:
      </strong>
      <span
        style={{
          color: isRequired === true ? "red" : "",
          fontWeight: isRequired === true ? "bold" : "",
        }}
      >
        {content}
      </span>
    </div>
  );

  useEffect(() => {
    if (isEmpty(dataFormSave) === false && isEmpty(dataBank) === false) {
      const selectDefaultDataBank = dataBank.find((row) => {
        return dataFormSave.idBank === row.idBank;
      });
      setDataForm({
        ...dataFormSave,
        idBankText:
          isNil(selectDefaultDataBank) === false
            ? selectDefaultDataBank.text
            : "",
      });
    }
  }, [dataFormSave, dataBank]);

  return (
    <div className="content-typeform-formulary">
      <h3>
        {confirmData === false
          ? "Información Bancaria"
          : "Confirmar Información bancaria"}
      </h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          {isEmpty(dataProperties) === false && dataForm.isFirstTime === false && (
            <div className="message-typeform-requires">
              <Alert
                message={
                  <div style={{ width: "100%" }}>
                    Los siguientes campos son requeridos:
                    <br />
                    <ul>
                      {dataProperties.map((row) => {
                        return <li>{row.label}</li>;
                      })}
                    </ul>
                  </div>
                }
                type="error"
              />
            </div>
          )}
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <div className="option-select-radio">
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontWeight: "bold",
                  }}
                >
                  ¿Cómo deseas tus pagos de renta?
                </span>
                <Radio.Group
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, isInCash: value });
                  }}
                  value={
                    dataForm.isInCash === true || dataForm.isInCash === 1
                      ? 1
                      : isNil(dataForm.isInCash) === false
                      ? 0
                      : null
                  }
                >
                  <Radio value={1}>Efectivo</Radio>
                  <Radio value={0}>Cuenta Bancaria</Radio>
                </Radio.Group>
              </div>
            </Col>
          </Row>
          {(dataForm.isInCash === false || dataForm.isInCash === 0) && (
            <>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Select
                    placeholder="Banco"
                    showSearch
                    value={dataForm.idBank}
                    onChange={(value, option) => {
                      setDataForm({
                        ...dataForm,
                        idBank: value,
                        idBankText: option.children,
                      });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {isEmpty(dataBank) === false &&
                      dataBank.map((row) => {
                        return <Option value={row.id}>{row.text}</Option>;
                      })}
                  </Select>
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.bankBranch}
                    placeholder={"Sucursal"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        bankBranch: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <Input
                    value={dataForm.accountHolder}
                    placeholder={"A nombre de"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        accountHolder: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                  <Input
                    value={dataForm.accountNumber}
                    placeholder={"Número de cuenta"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        accountNumber: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={14} xs={{ span: 24 }} md={{ span: 14 }}>
                  <Input
                    value={dataForm.clabeNumber}
                    placeholder={"Clave interbancaria"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        clabeNumber: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
            </>
          )}

          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <DatePicker
                value={
                  isNil(dataForm.signingAvailabilityAt) === false
                    ? moment(dataForm.signingAvailabilityAt, "YYYY-MM-DD")
                    : null
                }
                placeholder="Fecha de firma de contrato"
                onChange={(momentFormat, date) => {
                  setDataForm({
                    ...dataForm,
                    signingAvailabilityAt:
                      moment(momentFormat).format("YYYY-MM-DD"),
                  });
                }}
                format="DD MMMM YYYY"
              />
            </Col>
          </Row>
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
              onClick={async () => {
                try {
                  await onGetProperties({
                    idTypeForm: dataForm.idTypeForm,
                    stepIn: 3,
                    jsonProperties: JSON.stringify(dataForm),
                  });
                  setConfirmData(true);
                } catch (error) {}
              }}
              className="button_primary"
            >
              <span>Continuar</span>
            </button>
          </div>
        </Col>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
      </Row>
      <Modal
        style={{ top: 20 }}
        visible={confirmData}
        closable={false}
        footer={false}
      >
        <div className="form-modal">
          <div className="title-head-modal">
            <h1>Confirma tu información</h1>
          </div>
          <div className="main-form-information">
            <p>
              {isEmpty(dataPropertiesInfo) === false &&
              isNil(dataPropertiesInfo[0].stepIn) === false
                ? dataPropertiesInfo[0].stepIn
                : ""}
            </p>
            <Row>
              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                {isEmpty(dataPropertiesInfo) === false &&
                  dataPropertiesInfo.map((row) => {
                    return (
                      <DescriptionItem
                        title={row.typeFormProperty}
                        content={row.typeFormPropertyValue}
                        isRequired={row.isRequired}
                      />
                    );
                  })}
              </Col>
            </Row>
          </div>
          <div className="two-action-buttons">
            <button
              type="button"
              onClick={() => {
                setConfirmData(false);
              }}
            >
              <span>Regresar</span>
            </button>
            <button
              type="button"
              className={
                isEmpty(dataPropertiesInfo) === false &&
                dataPropertiesInfo[0].canBeSkiped === false
                  ? "disabled"
                  : ""
              }
              onClick={async () => {
                if (
                  isEmpty(dataPropertiesInfo) === false &&
                  dataPropertiesInfo[0].canBeSkiped === true
                ) {
                  onClickFinish(dataForm);
                  setConfirmData(false);
                }
              }}
            >
              <span>Confirmar</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SectionBankInfo;
