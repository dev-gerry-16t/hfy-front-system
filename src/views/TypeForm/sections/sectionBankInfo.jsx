import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
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
  DatePicker,
} from "antd";
import IconProfile from "../../../assets/icons/Profile.svg";

const { Option } = Select;

const SectionBankInfo = (props) => {
  const { onClickBack, onClickFinish, dataBank, dataFormSave } = props;
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

  const DescriptionItem = ({ title, content }) => (
    <div
      className="site-description-item-profile-wrapper"
      style={{ textAlign: "center" }}
    >
      <strong className="site-description-item-profile-p-label">{title}</strong>
      <br />
      {content}
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
      {confirmData === false && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <div className="option-select-radio">
                  <span
                    style={{
                      color: "var(--color-primary)",
                      fontWeight: "bold",
                    }}
                  >
                    ¿Como quieres tus pagos de renta?
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
                      placeholder={"Numero de cuenta"}
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
                      signingAvailabilityAt: moment(momentFormat).format(
                        "YYYY-MM-DD"
                      ),
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
                onClick={() => {
                  setConfirmData(true);
                }}
                className="button_primary"
              >
                <span>Continuar</span>
              </button>
            </div>
          </Col>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        </Row>
      )}
      {confirmData === true && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
            <p>
              Verifica que tu información sea correcta, de lo contrario no
              podras hacer modificaciones.
            </p>
            {dataForm.isInCash === false || dataForm.isInCash === 0 ? (
              <>
                <Row>
                  <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                    <DescriptionItem
                      title="A nombre de"
                      content={dataForm.accountHolder}
                    />
                  </Col>
                  <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                  <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                    <DescriptionItem
                      title="Banco"
                      content={dataForm.idBankText}
                    />
                  </Col>
                  <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                  <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                    <DescriptionItem
                      title="Sucursal"
                      content={dataForm.bankBranch}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                    <DescriptionItem
                      title="Numero de cuenta"
                      content={dataForm.accountNumber}
                    />
                  </Col>
                  <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                  <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                    <DescriptionItem
                      title="Clave interbancaria"
                      content={dataForm.clabeNumber}
                    />
                  </Col>
                  <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                  <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                    <DescriptionItem
                      title="Fecha de firma de contrato"
                      content={moment(
                        dataForm.signingAvailabilityAt,
                        "YYYY-MM-DD"
                      ).format("DD MMMM YYYY")}
                    />
                  </Col>
                </Row>
              </>
            ) : (
              <Row>
                <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                  <DescriptionItem
                    title="Información de Pago"
                    content="Tu pago será en efectivo"
                  />
                </Col>
              </Row>
            )}
            <div className="button_actions">
              <button
                type="button"
                onClick={() => {
                  setConfirmData(false);
                }}
                className="button_secondary"
              >
                <span>Cancelar</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onClickFinish(dataForm);
                }}
                className="button_primary"
              >
                <span>Confirmar</span>
              </button>
            </div>
          </Col>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        </Row>
      )}
    </div>
  );
};

export default SectionBankInfo;
