import React, { useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import NumberFormat from "react-number-format";
import { Input, Row, Col, Modal, Select, Radio, Timeline } from "antd";
import Arrow from "../../../assets/icons/Arrow.svg";

const { Option } = Select;

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <strong className="site-description-item-profile-p-label">{title}:</strong>
    <br />
    {isNil(content) === false ? content : "N/A"}
  </div>
);

const WidgetReferenceModal = (props) => {
  const {
    isModalVisible,
    dataForm,
    setDataForm,
    dataRelatioshipTypes,
    dataHistory,
    dataReferenceStatus,
    onSaveDataScore,
    setIsModalVisible,
  } = props;
  return (
    <Modal
      visible={isModalVisible}
      closable={false}
      footer={false}
      style={{ top: 20 }}
      width={600}
    >
      <div className="form-modal">
        <div className="title-head-modal">
          <button
            className="arrow-back-to"
            type="button"
            onClick={() => {
              setIsModalVisible(false);
            }}
          >
            <img src={Arrow} alt="backTo" width="30" />
          </button>
          <h1>Información de Referencia</h1>
        </div>
        <div
          className="main-form-information"
          style={{ fontFamily: "Poppins" }}
        >
          <Row>
            <Col span={10} xs={{ span: 24 }} md={{ span: 10 }}>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <DescriptionItem
                    title="Tipo de referencia"
                    content={dataForm.referenceType}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <DescriptionItem
                    title="Nombre de la referencia"
                    content={dataForm.fullName}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <DescriptionItem
                    title="Correo"
                    content={dataForm.emailAddress}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <DescriptionItem
                    title="Teléfono"
                    content={
                      isNil(dataForm.phoneNumber) === false ? (
                        <a
                          href={
                            isNil(dataForm.phoneNumber) === false
                              ? `https://api.whatsapp.com/send?phone=52${dataForm.phoneNumber}`
                              : "#"
                          }
                          target="_blank"
                        >
                          {dataForm.phoneNumber}
                        </a>
                      ) : (
                        "N/A"
                      )
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col span={14} xs={{ span: 24 }} md={{ span: 14 }}>
              <p style={{ textAlign: "center" }}>Historial de cambios</p>
              <div style={{ height: 260, overflowY: "scroll" }}>
                {isEmpty(dataHistory) === false ? (
                  <Timeline>
                    {dataHistory.map((row) => {
                      return (
                        <Timeline.Item>
                          <div>
                            <p style={{ margin: "0px" }}>
                              <strong>{row.createdByUser}</strong> |{" "}
                              <strong>{row.createdAt} hrs</strong>
                            </p>
                            <div>
                              <div
                                style={{ color: "black !important" }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    isNil(row.description) === false
                                      ? row.description
                                      : "",
                                }}
                              />
                            </div>
                          </div>
                        </Timeline.Item>
                      );
                    })}
                  </Timeline>
                ) : (
                  <strong style={{ display: "flex", justifyContent: "center" }}>
                    Aún no hay un historial
                  </strong>
                )}
              </div>
            </Col>
          </Row>
          <p>Ingresa la información de la referencia</p>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <Select
                placeholder="Parentesco"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                onChange={(value, option) => {
                  setDataForm({
                    ...dataForm,
                    idRelationshipType: value,
                    idRelationshipTypeText: option.children,
                  });
                }}
                value={dataForm.idRelationshipType}
              >
                {isEmpty(dataRelatioshipTypes) === false &&
                  dataRelatioshipTypes.map((row) => {
                    return (
                      <Option
                        value={row.idRelationshipType}
                        onClick={() => {
                          return row;
                        }}
                      >
                        {row.text}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
          </Row>
          <Row>
            <Col span={9} xs={{ span: 24 }} md={{ span: 9 }}>
              <NumberFormat
                id={null}
                customInput={Input}
                thousandSeparator=","
                decimalSeparator="."
                decimalPrecision={2}
                allowNegative={false}
                prefix=""
                suffix=""
                value={
                  isNil(dataForm.currentTime) === false
                    ? dataForm.currentTime
                    : ""
                }
                className="inputLogin"
                floatingLabelText=""
                isVisible
                toBlock={false}
                disable={false}
                placeholder="Tiempo de conocerlo"
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                  setDataForm({
                    ...dataForm,
                    currentTime: floatValue,
                  });
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
            <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
            <Col span={5} xs={{ span: 24 }} md={{ span: 5 }}>
              <Select
                placeholder="Periodo"
                onChange={(value, option) => {
                  setDataForm({
                    ...dataForm,
                    currentTimeRange: value,
                    currentTimeRangeText: option.children,
                  });
                }}
                value={dataForm.currentTimeRange}
              >
                <Option value={"M"} onClick={() => {}}>
                  Meses
                </Option>
                <Option value={"Y"} onClick={() => {}}>
                  Años
                </Option>
              </Select>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
              <div className="option-select-radio">
                <span
                  style={{
                    color: "var(--color-primary)",
                    fontWeight: "bold",
                  }}
                >
                  ¿Lo recomendaría?
                </span>
                <Radio.Group
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      isRecommended: e.target.value,
                    });
                  }}
                  value={
                    dataForm.isRecommended === 1 ||
                    dataForm.isRecommended === true
                      ? 1
                      : isNil(dataForm.isRecommended) === false
                      ? 0
                      : null
                  }
                >
                  <Radio value={1}>Si</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={15} xs={{ span: 24 }} md={{ span: 15 }}>
              <Select
                placeholder="Estatus"
                onChange={(value, option) => {
                  setDataForm({
                    ...dataForm,
                    idPersonalReferenceStatus: value,
                  });
                }}
                value={dataForm.idPersonalReferenceStatus}
              >
                {isEmpty(dataReferenceStatus) === false &&
                  dataReferenceStatus.map((row) => {
                    return (
                      <Option
                        value={row.idPersonalReferenceStatus}
                        onClick={() => {
                          return row;
                        }}
                      >
                        {row.text}
                      </Option>
                    );
                  })}
              </Select>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
              <NumberFormat
                id={null}
                customInput={Input}
                thousandSeparator=","
                decimalSeparator="."
                decimalPrecision={2}
                allowNegative={false}
                prefix=""
                suffix=""
                value={
                  isNil(dataForm.rating) === false
                    ? dataForm.rating
                    : dataForm.score
                }
                className="inputLogin"
                floatingLabelText=""
                isVisible
                toBlock={false}
                disable={false}
                placeholder="Score 0-5"
                onValueChange={(values) => {
                  const { formattedValue, value, floatValue } = values;
                  setDataForm({
                    ...dataForm,
                    rating: floatValue,
                  });
                }}
                onClick={(event) => {}}
                onFocus={(event) => {}}
                onBlur={(event) => {}}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <textarea
                className="textarea-form-modal ant-input"
                placeholder="Observaciones"
                value={
                  isNil(dataForm.observations) === false
                    ? dataForm.observations
                    : ""
                }
                maxlength="1000"
                onChange={(e) => {
                  setDataForm({
                    ...dataForm,
                    observations: e.target.value,
                  });
                }}
              />
            </Col>
          </Row>
        </div>
        <div className="button_init_primary">
          <button
            type="button"
            onClick={async () => {
              try {
                await onSaveDataScore(dataForm);
                setIsModalVisible(false);
              } catch (error) {}
            }}
          >
            <span>Guardar</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default WidgetReferenceModal;
