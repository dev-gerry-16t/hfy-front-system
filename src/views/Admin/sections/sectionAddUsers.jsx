import React, { useEffect, useState } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
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
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import Arrow from "../../../assets/icons/Arrow.svg";
import FrontFunctions from "../../../utils/actions/frontFunctions";

const { Option } = Select;

const SectionAddUsers = (props) => {
  const {
    isModalVisible,
    onClose,
    spinVisible,
    dataTenantSearch,
    dataSecondTenant,
    dataAdviserSearch,
    dataOwnerSearch,
    onSearchTenant,
    onSearchSecondTenant,
    onSearchAdviser,
    onSearchOwner,
    onSendInformation,
  } = props;
  const frontFunctions = new FrontFunctions();
  const initialDataForm = {
    emailOwner: null,
    emailAdviser: null,
    emailTenant: null,
    emailTenant2: null,
    nameOwner: null,
    lastNameOwner: null,
    mothersLastNameOwner: null,
    nameTenant: null,
    lastNameTenant: null,
    mothersLastNameTenant: null,
    personType: null,
    nameTenant2: null,
    lastNameTenant2: null,
    mothersLastNameTenant2: null,
    personType2: null,
    nameAdviser: null,
    lastNameAdviser: null,
    mothersLastNameAdviser: null,
  };
  const [dataForm, setDataForm] = useState(initialDataForm);

  const LoadingSpin = <SyncOutlined spin />;

  useEffect(() => {
    if (isEmpty(dataOwnerSearch) === false) {
      setDataForm({
        ...dataForm,
        nameOwner: dataOwnerSearch.givenName,
        lastNameOwner: dataOwnerSearch.lastName,
        mothersLastNameOwner: dataOwnerSearch.mothersMaidenName,
      });
    }
  }, [dataOwnerSearch]);

  useEffect(() => {
    if (isEmpty(dataTenantSearch) === false) {
      setDataForm({
        ...dataForm,
        nameTenant: dataTenantSearch.givenName,
        lastNameTenant: dataTenantSearch.lastName,
        mothersLastNameTenant: dataTenantSearch.mothersMaidenName,
        personType: dataTenantSearch.idPersonType,
      });
    }
  }, [dataTenantSearch]);

  useEffect(() => {
    if (isEmpty(dataSecondTenant) === false) {
      setDataForm({
        ...dataForm,
        nameTenant2: dataSecondTenant.givenName,
        lastNameTenant2: dataSecondTenant.lastName,
        mothersLastNameTenant2: dataSecondTenant.mothersMaidenName,
        personType2: dataSecondTenant.idPersonType,
      });
    }
  }, [dataSecondTenant]);

  useEffect(() => {
    if (isEmpty(dataAdviserSearch) === false) {
      setDataForm({
        ...dataForm,
        nameAdviser: dataAdviserSearch.givenName,
        lastNameAdviser: dataAdviserSearch.lastName,
        mothersLastNameAdviser: dataAdviserSearch.mothersMaidenName,
      });
    }
  }, [dataAdviserSearch]);

  return (
    <Modal
      visible={isModalVisible}
      closable={false}
      footer={false}
      style={{ top: 20 }}
      width={600}
    >
      <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
        <div className="form-modal">
          <div className="title-head-modal">
            <button
              className="arrow-back-to"
              type="button"
              onClick={() => {
                onClose();
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <h1>Agregar Prospectos</h1>
          </div>
          <div className="main-form-information">
            <p>Ingresa la información del Propietario</p>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.emailOwner}
                  placeholder={"Correo"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      emailOwner: e.target.value,
                    });
                  }}
                  onBlur={() => {
                    onSearchOwner(dataForm.emailOwner);
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Input
                  value={dataForm.nameOwner}
                  placeholder={"Nombre"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      nameOwner: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.lastNameOwner}
                  placeholder={"Apellido paterno"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      lastNameOwner: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Input
                  value={dataForm.mothersLastNameOwner}
                  placeholder={"Apellido materno"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      mothersLastNameOwner: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <p>Ingresa la información del Inquilino</p>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.emailTenant}
                  placeholder={"Correo"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      emailTenant: e.target.value,
                    });
                  }}
                  onBlur={() => {
                    onSearchTenant(dataForm.emailTenant);
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Select
                  placeholder="Tipo de persona"
                  value={dataForm.personType}
                  onChange={(value, option) => {
                    setDataForm({ ...dataForm, personType: value });
                  }}
                >
                  <Option value={1}>Fisica</Option>
                  <Option value={2}>Moral</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input
                  value={dataForm.nameTenant}
                  placeholder={
                    dataForm.personType !== 2 ? "Nombre" : "Razon social"
                  }
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      nameTenant: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            {dataForm.personType !== 2 && (
              <Row>
                <Col span={11}>
                  <Input
                    value={dataForm.lastNameTenant}
                    placeholder={"Apellido paterno"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        lastNameTenant: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} />
                <Col span={11}>
                  <Input
                    value={dataForm.mothersLastNameTenant}
                    placeholder={"Apellido materno"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        mothersLastNameTenant: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
            )}
            <p>Ingresa la información del segundo inquilino (Opcional)</p>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.emailTenant2}
                  placeholder={"Correo"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      emailTenant2: e.target.value,
                    });
                  }}
                  onBlur={() => {
                    onSearchSecondTenant(
                      dataForm.emailTenant2,
                      dataTenantSearch.idCustomerTenant
                    );
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Select
                  placeholder="Tipo de persona"
                  value={dataForm.personType2}
                  onChange={(value, option) => {
                    setDataForm({ ...dataForm, personType2: value });
                  }}
                >
                  <Option value={1}>Fisica</Option>
                  <Option value={2}>Moral</Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Input
                  value={dataForm.nameTenant2}
                  placeholder={
                    dataForm.personType !== 2 ? "Nombre" : "Razon social"
                  }
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      nameTenant2: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            {dataForm.personType2 !== 2 && (
              <Row>
                <Col span={11}>
                  <Input
                    value={dataForm.lastNameTenant2}
                    placeholder={"Apellido paterno"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        lastNameTenant2: e.target.value,
                      });
                    }}
                  />
                </Col>
                <Col span={2} />
                <Col span={11}>
                  <Input
                    value={dataForm.mothersLastNameTenant2}
                    placeholder={"Apellido materno"}
                    onChange={(e) => {
                      setDataForm({
                        ...dataForm,
                        mothersLastNameTenant2: e.target.value,
                      });
                    }}
                  />
                </Col>
              </Row>
            )}
            <p>Ingresa la información del Asesor</p>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.emailAdviser}
                  placeholder={"Correo/No Asesor"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      emailAdviser: e.target.value,
                    });
                  }}
                  onBlur={() => {
                    onSearchAdviser(dataForm.emailAdviser);
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Input
                  value={dataForm.nameAdviser}
                  placeholder={"Nombre"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      nameAdviser: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <Input
                  value={dataForm.lastNameAdviser}
                  placeholder={"Apellido paterno"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      lastNameAdviser: e.target.value,
                    });
                  }}
                />
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Input
                  value={dataForm.mothersLastNameAdviser}
                  placeholder={"Apellido materno"}
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      mothersLastNameAdviser: e.target.value,
                    });
                  }}
                />
              </Col>
            </Row>
          </div>
          <div className="button_init_primary">
            <button
              type="button"
              onClick={() => {
                const arrayTenants = [];

                if (
                  isNil(dataForm.emailTenant) === false &&
                  isNil(dataForm.nameTenant) === false
                ) {
                  const object = {
                    ...dataTenantSearch,
                    id: 1,
                    idPersonType: dataForm.personType,
                    givenName: dataForm.nameTenant,
                    lastName: dataForm.lastNameTenant,
                    mothersMaidenName: dataForm.mothersLastNameTenant,
                    emailAddress: dataForm.emailTenant,
                    phoneNumber: null,
                  };

                  arrayTenants.push(object);
                }

                if (
                  isNil(dataForm.emailTenant2) === false &&
                  isNil(dataForm.nameTenant2) === false
                ) {
                  const object1 = {
                    ...dataSecondTenant,
                    id: 2,
                    idPersonType: dataForm.personType2,
                    givenName: dataForm.nameTenant2,
                    lastName: dataForm.lastNameTenant2,
                    mothersMaidenName: dataForm.mothersLastNameTenant2,
                    emailAddress: dataForm.emailTenant2,
                    phoneNumber: null,
                  };
                  arrayTenants.push(object1);
                }
                const dataResult = {
                  idCustomer: dataOwnerSearch.idCustomer,
                  idPersonType: 1,
                  givenName: dataForm.nameOwner,
                  lastName: dataForm.lastNameOwner,
                  mothersMaidenName: dataForm.mothersLastNameOwner,
                  emailAddress: dataForm.emailOwner,
                  customerTenant: arrayTenants,
                  idCustomerAgent: dataAdviserSearch.idCustomerAgent,
                };
                onSendInformation(dataResult);
              }}
            >
              <span>Enviar Prospectos</span>
            </button>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default SectionAddUsers;
