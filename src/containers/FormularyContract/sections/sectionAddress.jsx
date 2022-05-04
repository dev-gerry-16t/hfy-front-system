import React, { useState, useContext, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import styled from "styled-components";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
  ComponentRadio,
} from "../constants/styleConstants";
import ContextForm from "../context/contextForm";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import CustomSelect from "../../../components/CustomSelect";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.3em;
  span {
    color: var(--color-primary);
  }
`;

const SectionAddress = (props) => {
  const { callGlobalActionApi, onClickBack, onClickNext } = props;
  const [dataAddress, setDataAddress] = useState({
    street: null,
    streetNumber: null,
    suite: null,
    idZipCode: null,
    neighborhood: null,
  });
  const [idZipCode, setIdZipCode] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [zipCodeStateCity, setZipCodeStateCity] = useState({
    state: null,
    city: null,
  });
  const [openOtherNeighborhood, setOpenOtherNeighborhood] = useState(false);
  const [dataZipCatalog, setDataZipCatalog] = useState([]);

  const dataContextForm = useContext(ContextForm);
  const { dataFormSave, onSetInformation, idCustomerType } = dataContextForm;

  const frontFunctions = new FrontFunctions();

  const hanlderCallGetZipCodeAdress = async (code, id) => {
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer: null,
          idSystemUser: null,
          idLoginHistory: null,
          type: 1,
          zipCode: code,
        },
        null,
        API_CONSTANTS.ANONYMOUS.GET_ZIP_CODE_ADRESS,
        "POST",
        false
      );

      const responseResult1 =
        isNil(response) === false &&
        isNil(response.response1) === false &&
        isNil(response.response1[0]) === false
          ? response.response1[0]
          : {};
      const responseResult2 =
        isNil(response) === false && isNil(response.response2) === false
          ? response.response2
          : [];
      const state =
        isEmpty(responseResult1) === false ? responseResult1.state : "";
      const city =
        isEmpty(responseResult1) === false ? responseResult1.municipality : "";
      const neighborhood = responseResult2.find((row) => {
        return row.idZipCode === id;
      });
      if (
        isNil(neighborhood) === false &&
        isNil(neighborhood.isOpen) === false &&
        neighborhood.isOpen === true
      ) {
        setOpenOtherNeighborhood(true);
      }

      setIdZipCode(isEmpty(responseResult2) ? "" : id);
      setDataZipCatalog(responseResult2);
      setZipCodeStateCity({
        state,
        city,
      });
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    if (isEmpty(dataFormSave) === false) {
      const { street, streetNumber, suite, idZipCode, neighborhood, zipCode } =
        dataFormSave;
      setDataAddress({
        ...dataAddress,
        street,
        streetNumber,
        suite,
        idZipCode,
        neighborhood,
      });
      if (isNil(zipCode) === false && isNil(idZipCode) === false) {
        setZipCode(zipCode, idZipCode);
        hanlderCallGetZipCodeAdress(zipCode, idZipCode);
      }
    }
  }, [dataFormSave]);

  return (
    <ContentForm>
      <div className="header-title">
        <h1>
          Domicilio Actual{" "}
          {idCustomerType === "2" ? "Propietario" : "Inquilino"}
        </h1>
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <span>Por favor llena todos los campos correspondientes.</span>
              <br />
              <span>Ingresa el domicilio en donde vive actualmente</span>
            </Col>
          </Row>
        </div>
        <div className="type-property">
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <CustomInputTypeForm
                value={dataAddress.street}
                placeholder=""
                label="Calle *"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataAddress({
                    ...dataAddress,
                    street: value,
                  });
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <CustomInputTypeForm
                value={dataAddress.streetNumber}
                placeholder=""
                label="Número exterior *"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataAddress({
                    ...dataAddress,
                    streetNumber: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <CustomInputTypeForm
                value={dataAddress.suite}
                placeholder=""
                label="Número interior"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataAddress({
                    ...dataAddress,
                    suite: value,
                  });
                }}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
              <CustomInputTypeForm
                value={zipCode}
                placeholder=""
                label="Código postal *"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={async (value) => {
                  if (value.length <= 5) {
                    setZipCode(value);
                    if (value.length === 5) {
                      hanlderCallGetZipCodeAdress(value, "");
                    } else {
                      setDataAddress({
                        ...dataAddress,
                        zipCode: null,
                        neighborhood: null,
                        idZipCode: null,
                      });
                      setIdZipCode(null);
                      setOpenOtherNeighborhood(false);
                      setZipCodeStateCity({
                        state: null,
                        city: null,
                      });
                    }
                  }
                }}
                type="number"
              />
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <CustomInputTypeForm
                value={zipCodeStateCity.state}
                placeholder=""
                label="Estado *"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
                type="text"
                isBlock={true}
              />
            </Col>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <CustomInputTypeForm
                value={zipCodeStateCity.city}
                placeholder=""
                label="Municipio/Delegación *"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
                type="text"
                isBlock={true}
              />
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <CustomSelect
                value={idZipCode}
                placeholder=""
                label="Colonia *"
                data={dataZipCatalog}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value, option) => {
                  setDataAddress({
                    ...dataAddress,
                    idZipCode: value,
                  });
                  setIdZipCode(value);
                  setOpenOtherNeighborhood(option.isOpen);
                }}
              />
            </Col>
            {openOtherNeighborhood === true && (
              <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
                <CustomInputTypeForm
                  value={dataAddress.neighborhood}
                  placeholder="Indica la colonia"
                  label="Otra colonia"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataAddress({
                      ...dataAddress,
                      neighborhood: value,
                    });
                  }}
                  type="text"
                />
              </Col>
            )}
          </Row>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage
            block={false}
            onClick={() => {
              onClickBack();
            }}
          >
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                await onSetInformation(dataAddress);
                onClickNext();
              } catch (error) {}
            }}
          >
            <u>{idCustomerType === "2" ? "Siguiente" : "Finalizar"}</u>
            {" >>"}
          </ButtonNextBackPage>
        </div>
      </FormProperty>
    </ContentForm>
  );
};

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method, token) =>
    dispatch(callGlobalActionApi(data, id, constant, method, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionAddress);
