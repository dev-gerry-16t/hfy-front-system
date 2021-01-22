import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import NumberFormat from "react-number-format";
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
import CustomFileUpload from "./customFileUpload";

const { Option } = Select;

const SectionInfoAval = (props) => {
  const { onClickBack, onClickFinish, dataFormSave } = props;
  const initialForm = {
    hasEndorsement: null,
    endorsementGivenName: null,
    endorsementLastName: null,
    endorsementMothersMaidenName: null,
    endorsementEmailAddress: null,
    endorsementPhoneNumber: null,
    collateralPropertyStreet: null,
    collateralPropertySuite: null,
    collateralPropertyStreetNumber: null,
    collateralPropertyIdZipCoode: null,
    collateralPropertyNeighborhood: null,
    collateralPropertyCity: null,
    collateralPropertyState: null,
    documentNumber: null,
    documentSignedAt: null,
    notaryOfficeNumber: null,
    notaryName: null,
    signedAtPlace: null,
  };
  const [dataForm, setDataForm] = useState(initialForm);

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      setDataForm(dataFormSave);
    }
  }, [dataFormSave]);

  return (
    <div className="content-typeform-formulary">
      <h3>Información Aval</h3>
      <Row>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
        <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <div className="option-select-radio">
                <span style={{ color: "#ff0282", fontWeight: "bold" }}>
                  ¿Cuentas con Aval?
                </span>
                <Radio.Group
                  onChange={(e) => {
                    const value = e.target.value;
                    setDataForm({ ...dataForm, hasEndorsement: value });
                  }}
                  value={dataForm.hasEndorsement}
                >
                  <Radio value={1}>Si</Radio>
                  <Radio value={0}>No</Radio>
                </Radio.Group>
              </div>
            </Col>
          </Row>
          {dataForm.hasEndorsement === 1 && (
            <>
              <p>Información personal</p>
              <Row>
                <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                  <Input
                    value={dataForm.endorsementGivenName}
                    placeholder={"Nombres"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, endorsementGivenName: value });
                    }}
                    suffix={<img src={IconProfile} alt="profile" width="15" />}
                  />
                </Col>
                <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                  <Input
                    value={dataForm.endorsementLastName}
                    placeholder={"Apellido paterno"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, endorsementLastName: value });
                    }}
                    suffix={<img src={IconProfile} alt="profile" width="15" />}
                  />
                </Col>
                <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                  <Input
                    value={dataForm.endorsementMothersMaidenName}
                    placeholder={"Apellido materno"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        endorsementMothersMaidenName: value,
                      });
                    }}
                    suffix={<img src={IconProfile} alt="profile" width="15" />}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.endorsementPhoneNumber}
                    placeholder={"Telefono"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        endorsementPhoneNumber: value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.endorsementEmailAddress}
                    placeholder={"Correo"}
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({
                        ...dataForm,
                        endorsementEmailAddress: value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <p>Dirección de la propiedad en garantia</p>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <Input
                    value={dataForm.collateralPropertyStreet}
                    placeholder={"Calle"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        collateralPropertyStreet: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.collateralPropertyStreetNumber}
                    placeholder={"Numero"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        collateralPropertyStreetNumber: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.collateralPropertyIdZipCoode}
                    placeholder={"Código postal"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        collateralPropertyIdZipCoode: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.collateralPropertyState}
                    placeholder={"Estado"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        collateralPropertyState: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.collateralPropertyCity}
                    placeholder={"Municipio/Delegación"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        collateralPropertyCity: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Select
                    value={dataForm.collateralPropertyNeighborhood}
                    placeholder="Colonia"
                    onChange={(value, option) => {
                      setDataForm({
                        ...dataForm,
                        collateralPropertyNeighborhood: value,
                      });
                    }}
                  >
                    <Option value={1} onClick={() => {}}>
                      Granjas
                    </Option>
                    <Option value={2} onClick={() => {}}>
                      Americas
                    </Option>
                  </Select>
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              </Row>
              <p>Escrituras</p>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.documentNumber}
                    placeholder={"Numero de las escrituras"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        documentNumber: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <DatePicker
                    value={
                      isNil(dataForm.documentSignedAt) === false
                        ? moment(dataForm.documentSignedAt, "YYYY-MM-DD")
                        : null
                    }
                    placeholder="Fecha de firma de las escrituras"
                    onChange={(momentFormat, date) => {
                      setDataForm({
                        ...dataForm,
                        documentSignedAt: moment(momentFormat).format(
                          "YYYY-MM-DD"
                        ),
                      });
                    }}
                    format="DD MMMM YYYY"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <Input
                    value={dataForm.signedAtPlace}
                    placeholder={"Lugar de firma de la escritura"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        signedAtPlace: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.notaryOfficeNumber}
                    placeholder={"Número de la notaria"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        notaryOfficeNumber: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Input
                    value={dataForm.notaryName}
                    placeholder={"Nombre del notario"}
                    onChange={(e) => {
                      setDataForm({ ...dataForm, notaryName: e.target.value });
                    }}
                  />
                </Col>
              </Row>
              <p>Documentación</p>
              <div className="section-top-documentation">
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
                    <strong>Escrituras de la propiedad</strong>
                    <span style={{ visibility: "hidden" }}>N/A</span>
                  </div>
                  <div className="section-content-card-doc">
                    <CustomFileUpload />
                  </div>
                </div>
              </div>
            </>
          )}
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
              onClick={onClickFinish}
              className="button_primary"
            >
              <span>Finalizar</span>
            </button>
          </div>
        </Col>
        <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
      </Row>
    </div>
  );
};

export default SectionInfoAval;
