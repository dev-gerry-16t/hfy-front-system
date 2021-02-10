import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import moment from "moment";
import NumberFormat from "react-number-format";
import {
  InfoCircleOutlined,
  UserOutlined,
  SyncOutlined,
  CloseOutlined,
} from "@ant-design/icons";
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
  const {
    onClickBack,
    onClickFinish,
    dataFormSave,
    onChangeZipCode,
    dataZipCatalog,
    dataZipCodeAdress,
    dataDocuments,
    typeDocument,
  } = props;
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
  const [isOpenInput, setIsOpenInput] = useState(false);
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
    if (isEmpty(dataFormSave) === false) {
      setDataForm(dataFormSave);
      onChangeZipCode(dataFormSave.collateralPropertyZipCode);
    }
  }, [dataFormSave]);

  useEffect(() => {
    if (isEmpty(dataZipCodeAdress) === false) {
      setDataForm({
        ...dataForm,
        collateralPropertyState: dataZipCodeAdress.state,
        collateralPropertyCity: dataZipCodeAdress.municipality,
      });
    }
  }, [dataZipCodeAdress]);

  return (
    <div className="content-typeform-formulary">
      <h3>
        {confirmData === false
          ? "Información Aval"
          : "Confirmar Información Aval"}
      </h3>
      {confirmData === false && (
        <Row>
          <Col span={4} xs={{ span: 24 }} md={{ span: 4 }} />
          <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <div className="option-select-radio">
                  <span style={{ color: "var(--color-primary)", fontWeight: "bold" }}>
                    ¿Cuentas con Aval?
                  </span>
                  <Radio.Group
                    onChange={(e) => {
                      const value = e.target.value;
                      setDataForm({ ...dataForm, hasEndorsement: value });
                    }}
                    value={
                      dataForm.hasEndorsement === true ||
                      dataForm.hasEndorsement === 1
                        ? 1
                        : 0
                    }
                  >
                    <Radio value={1}>Si</Radio>
                    <Radio value={0}>No</Radio>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
            {(dataForm.hasEndorsement === 1 ||
              dataForm.hasEndorsement === true) && (
              <>
                <p>Información personal</p>
                <Row>
                  <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                    <Input
                      value={dataForm.endorsementGivenName}
                      placeholder={"Nombres"}
                      onChange={(e) => {
                        const value = e.target.value;
                        setDataForm({
                          ...dataForm,
                          endorsementGivenName: value,
                        });
                      }}
                      suffix={
                        <img src={IconProfile} alt="profile" width="15" />
                      }
                    />
                  </Col>
                  <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
                  <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                    <Input
                      value={dataForm.endorsementLastName}
                      placeholder={"Apellido paterno"}
                      onChange={(e) => {
                        const value = e.target.value;
                        setDataForm({
                          ...dataForm,
                          endorsementLastName: value,
                        });
                      }}
                      suffix={
                        <img src={IconProfile} alt="profile" width="15" />
                      }
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
                      suffix={
                        <img src={IconProfile} alt="profile" width="15" />
                      }
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
                      value={dataForm.collateralPropertyZipCode}
                      placeholder={"Código postal"}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length >= 5) {
                          setDataForm({
                            ...dataForm,
                            collateralPropertyZipCode: value,
                          });
                          onChangeZipCode(e.target.value);
                        } else {
                          setDataForm({
                            ...dataForm,
                            collateralPropertyNeighborhood: null,
                            collateralPropertyIdZipCoode: null,
                            collateralPropertyZipCode: value,
                          });
                        }
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
                    {isOpenInput === false ? (
                      <Select
                        placeholder="Colonia"
                        value={dataForm.collateralPropertyIdZipCoode}
                        onChange={(value, option) => {
                          const dataSelect = option.onClick();
                          setIsOpenInput(dataSelect.isOpen);
                          if (dataSelect.isOpen === true) {
                            setDataForm({
                              ...dataForm,
                              collateralPropertyNeighborhood: null,
                              collateralPropertyIdZipCoode: value,
                            });
                          } else {
                            setDataForm({
                              ...dataForm,
                              collateralPropertyNeighborhood: option.children,
                              collateralPropertyIdZipCoode: value,
                            });
                          }
                        }}
                      >
                        {isEmpty(dataZipCatalog) === false &&
                          dataZipCatalog.map((row) => {
                            return (
                              <Option
                                value={row.idZipCode}
                                onClick={() => {
                                  return row;
                                }}
                              >
                                {row.neighborhood}
                              </Option>
                            );
                          })}
                      </Select>
                    ) : (
                      <Input
                        value={dataForm.collateralPropertyNeighborhood}
                        placeholder={"Indicar Colonia"}
                        suffix={
                          <Tooltip title="Cerrar">
                            <CloseOutlined
                              style={{ color: "rgba(0,0,0,.45)" }}
                              onClick={() => {
                                setIsOpenInput(false);
                                setDataForm({
                                  ...dataForm,
                                  collateralPropertyIdZipCoode: null,
                                  collateralPropertyNeighborhood: null,
                                });
                              }}
                            />
                          </Tooltip>
                        }
                        onChange={(e) => {
                          setDataForm({
                            ...dataForm,
                            collateralPropertyNeighborhood: e.target.value,
                          });
                        }}
                      />
                    )}
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
                        setDataForm({
                          ...dataForm,
                          notaryName: e.target.value,
                        });
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
                      <CustomFileUpload
                        acceptFile="image/png, image/jpeg, image/jpg"
                        dataDocument={
                          isEmpty(dataDocuments) === false &&
                          isNil(dataDocuments[0]) === false
                            ? dataDocuments[0]
                            : {}
                        }
                        typeDocument={typeDocument}
                      />
                      <CustomFileUpload
                        acceptFile="image/png, image/jpeg, image/jpg"
                        dataDocument={
                          isEmpty(dataDocuments) === false &&
                          isNil(dataDocuments[1]) === false
                            ? dataDocuments[1]
                            : {}
                        }
                        typeDocument={typeDocument}
                      />
                    </div>
                  </div>
                  <div className="section-card-documentation">
                    <div className="section-title-card-doc">
                      <strong>Escrituras de la propiedad</strong>
                      <span style={{ visibility: "hidden" }}>N/A</span>
                    </div>
                    <div className="section-content-card-doc">
                      <CustomFileUpload
                        acceptFile="image/png, image/jpeg, image/jpg, .pdf, .doc, .docx"
                        dataDocument={
                          isEmpty(dataDocuments) === false &&
                          isNil(dataDocuments[2]) === false
                            ? dataDocuments[2]
                            : {}
                        }
                        typeDocument={typeDocument}
                      />
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
                onClick={() => {
                  setConfirmData(true);
                }}
                className="button_primary"
              >
                <span>Finalizar</span>
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
            <p>Información personal</p>
            <Row>
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="¿Cuentas con Aval?"
                  content={
                    dataForm.hasEndorsement === true ||
                    dataForm.hasEndorsement === 1
                      ? "Si"
                      : "No"
                  }
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
                <DescriptionItem
                  title="Nombre completo"
                  content={`${dataForm.endorsementGivenName} ${dataForm.endorsementLastName} ${dataForm.endorsementMothersMaidenName}`}
                />
              </Col>
            </Row>
            <Row>
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Telefono"
                  content={dataForm.endorsementPhoneNumber}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={16} xs={{ span: 24 }} md={{ span: 16 }}>
                <DescriptionItem
                  title="Correo"
                  content={dataForm.endorsementEmailAddress}
                />
              </Col>
            </Row>
            <p>Dirección de la propiedad en garantia</p>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="Calle"
                  content={dataForm.collateralPropertyStreet}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Numero"
                  content={dataForm.collateralPropertyStreetNumber}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Colonia"
                  content={dataForm.collateralPropertyNeighborhood}
                />
              </Col>
            </Row>
            <Row>
              <Col span={8} xs={{ span: 24 }} md={{ span: 8 }}>
                <DescriptionItem
                  title="Municipio/Delegación"
                  content={dataForm.collateralPropertyCity}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Estado"
                  content={dataForm.collateralPropertyState}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={7} xs={{ span: 24 }} md={{ span: 7 }}>
                <DescriptionItem
                  title="Código postal"
                  content={dataForm.collateralPropertyZipCode}
                />
              </Col>
            </Row>
            <p>Escrituras</p>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <DescriptionItem
                  title="Numero de las escrituras"
                  content={dataForm.documentNumber}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <DescriptionItem
                  title="Fecha de firma de las escrituras"
                  content={moment(
                    dataForm.documentSignedAt,
                    "YYYY-MM-DD"
                  ).format("DD MMMM YYYY")}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <DescriptionItem
                  title="Lugar de la firma de las escrituras"
                  content={dataForm.signedAtPlace}
                />
              </Col>
              <Col span={1} xs={{ span: 24 }} md={{ span: 1 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <DescriptionItem
                  title="Número de la notaria"
                  content={dataForm.notaryOfficeNumber}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                <DescriptionItem
                  title="Nombre del notario"
                  content={dataForm.notaryOfficeNumber}
                />
              </Col>
            </Row>
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

export default SectionInfoAval;
