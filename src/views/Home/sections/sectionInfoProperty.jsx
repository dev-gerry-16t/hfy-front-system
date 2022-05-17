import React, { useState, useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import styled from "styled-components";
import saqareX from "../../../assets/icons/saqareX.svg";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import CustomSelect from "../../../components/CustomSelect";
import CustomInputSelectCurrency from "../../../components/customInputSelectCurrency";
import CustomInputCurrency from "../../../components/customInputCurrency";
import { ComponentRadio, MainButtons, ErrorMessage } from "../constants/styles";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.3em;
  span {
    color: var(--color-primary);
  }
`;

const SectionInfoProperty = (props) => {
  const {
    dataProfile,
    callGlobalActionApi,
    onNext,
    onBack,
    dataSaveAddress,
    dataAddressInfoSave,
  } = props;
  const [dataPropertyTypes, setDataPropertyTypes] = useState([]);
  const [dataCommercialActivity, setDataCommercialActivity] = useState([]);
  const [dataCurrency, setDataCurrency] = useState([]);
  const [dataForm, setDataForm] = useState({
    idPropertyType: null,
    idCommercialActivity: null,
    idCurrency: "9F5E4F49-1525-4BAA-8C4E-4090A9082B6D",
    currentRent: null,
    maintenanceAmount: null,
    totalParkingSpots: null,
    isFurnished: null,
    address: "{}",
  });
  const [dataAddressInfo, setDataAddressInfo] = useState({
    idPropertyType: null,
    idCommercialActivity: null,
    idCurrency: "MXN",
    currentRent: null,
    maintenanceAmount: null,
    totalParkingSpots: null,
    isFurnished: null,
    street: null,
    streetNumber: null,
    suite: null,
    state: null,
    city: null,
    neighborhood: null,
    zipCode: null,
  });
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
  const [isVisibleError, setIsVisibleError] = useState(false);
  const [dataZipCatalog, setDataZipCatalog] = useState([]);

  const frontFunctions = new FrontFunctions();

  const hanlderCallGetZipCodeAdress = async (code, id) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
          zipCode: code,
        },
        null,
        API_CONSTANTS.GET_ZIP_CODE_ADRESS
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
        return row.idZipCode == id;
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

  const handlerCallGetAllCommercialActivities = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_COMMERCIAL_ACTIVITIES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataCommercialActivity(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllPropertyTypes = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_CATALOG_PROPERTY_TYPES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];

      setDataPropertyTypes(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllCurrencies = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idProperty: null,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_CURRENCIES
      );
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataCurrency(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetAllPropertyTypes();
    handlerCallGetAllCurrencies();
  }, []);

  useEffect(() => {
    if (isEmpty(dataSaveAddress) === false) {
      setDataForm({ ...dataForm, ...dataSaveAddress.dataForm });
      setDataAddress({ ...dataAddress, ...dataSaveAddress.dataAddress });
      hanlderCallGetZipCodeAdress(
        dataSaveAddress.dataAddress.zipCode,
        dataSaveAddress.dataAddress.idZipCode
      );
      setZipCode(dataSaveAddress.dataAddress.zipCode);
      setDataAddressInfo(dataAddressInfoSave);
    }
  }, [dataSaveAddress, dataAddressInfoSave]);

  return (
    <>
      <div>
        <Row>
          <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
            <CustomSelect
              value={dataForm.idPropertyType}
              placeholder=""
              label="Tipo de propiedad *"
              data={dataPropertyTypes}
              error={false}
              errorMessage="Este campo es requerido"
              onChange={(value, row) => {
                if (row.idPropertyType === 4) {
                  handlerCallGetAllCommercialActivities();
                }
                setDataForm({ ...dataForm, idPropertyType: value });
                setDataAddressInfo({
                  ...dataAddressInfo,
                  idPropertyType: row.text,
                });
              }}
            />
          </Col>
        </Row>
        {dataForm.idPropertyType == "4" && (
          <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
            <CustomSelect
              value={dataForm.idCommercialActivity}
              placeholder=""
              label="Actividad comercial del inmueble *"
              data={dataCommercialActivity}
              error={false}
              errorMessage="Este campo es requerido"
              onChange={(value, row) => {
                setDataForm({ ...dataForm, idCommercialActivity: value });
                setDataAddressInfo({
                  ...dataAddressInfo,
                  idCommercialActivity: row.text,
                });
              }}
            />
          </Col>
        )}
        <Row>
          <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
            <CustomInputSelectCurrency
              value={dataForm.currentRent}
              valueSelect={dataForm.idCurrency}
              dataSelect={dataCurrency}
              onChangeSelect={(value, row) => {
                setDataForm({ ...dataForm, idCurrency: value });
                setDataAddressInfo({
                  ...dataAddressInfo,
                  idCurrency: row.text,
                });
              }}
              placeholder=""
              label={"Precio de renta (no incluyas mantenimiento)*"}
              error={false}
              errorMessage="Este campo es requerido"
              onChange={(value, valueS, valueFormat) => {
                setDataForm({ ...dataForm, currentRent: value });
                setDataAddressInfo({
                  ...dataAddressInfo,
                  currentRent: valueFormat,
                });
              }}
              type="number"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
            <CustomInputCurrency
              value={dataForm.maintenanceAmount}
              placeholder=""
              label="Mantenimiento mensual *"
              error={false}
              errorMessage="Este campo es requerido"
              onChange={(value, valueS, valueFormat) => {
                setDataForm({
                  ...dataForm,
                  maintenanceAmount: isNil(value) === true ? 0 : value,
                });
                setDataAddressInfo({
                  ...dataAddressInfo,
                  maintenanceAmount: valueFormat,
                });
              }}
              type="number"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
            <CustomInputTypeForm
              value={dataForm.totalParkingSpots}
              placeholder=""
              label="Cajones de Estacionamiento *"
              error={false}
              errorMessage="Este campo es requerido"
              onChange={(value) => {
                setDataForm({ ...dataForm, totalParkingSpots: value });
                setDataAddressInfo({
                  ...dataAddressInfo,
                  totalParkingSpots: value,
                });
              }}
              type="number"
            />
          </Col>
        </Row>
        <Row>
          <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
            <ComponentRadio>
              <strong>¿El inmueble está amueblado? *</strong>
              <div className="radio-inputs-options">
                <label className="input-radio">
                  <input
                    type="radio"
                    checked={dataForm.isFurnished === true}
                    name="furnished-property"
                    onClick={() => {
                      setDataForm({
                        ...dataForm,
                        isFurnished: true,
                      });
                      setDataAddressInfo({
                        ...dataAddressInfo,
                        isFurnished: "Si",
                      });
                    }}
                  />
                  Si
                </label>
                <label className="input-radio">
                  <input
                    type="radio"
                    name="furnished-property"
                    checked={dataForm.isFurnished === false}
                    onClick={() => {
                      setDataForm({
                        ...dataForm,
                        isFurnished: false,
                      });
                      setDataAddressInfo({
                        ...dataAddressInfo,
                        isFurnished: "No",
                      });
                    }}
                  />
                  No
                </label>
              </div>
            </ComponentRadio>
          </Col>
        </Row>
        <Title>
          Dirección de la <span>Propiedad</span>
        </Title>
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
                setDataAddressInfo({
                  ...dataAddressInfo,
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
                setDataAddressInfo({
                  ...dataAddressInfo,
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
                setDataAddressInfo({
                  ...dataAddressInfo,
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
                  setDataAddressInfo({
                    ...dataAddressInfo,
                    zipCode: value,
                  });
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
                setDataAddressInfo({
                  ...dataAddressInfo,
                  neighborhood: option.text,
                });
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
                  setDataAddressInfo({
                    ...dataAddressInfo,
                    neighborhood: value,
                  });
                }}
                type="text"
              />
            </Col>
          )}
        </Row>
      </div>
      <ErrorMessage error={isVisibleError}>
        <img src={saqareX} alt="exclaim" />
        <span>Revisa que la información este completa</span>
      </ErrorMessage>
      <MainButtons>
        <button
          className="hfy-primary-button"
          onClick={() => {
            const {
              idPropertyType,
              idCommercialActivity,
              currentRent,
              idCurrency,
              maintenanceAmount,
              totalParkingSpots,
              isFurnished,
            } = dataForm;
            const { street, streetNumber, idZipCode, neighborhood } =
              dataAddress;
            if (
              isNil(idPropertyType) === false &&
              isNil(currentRent) === false &&
              isNil(idCurrency) === false &&
              isNil(maintenanceAmount) === false &&
              isNil(totalParkingSpots) === false &&
              isEmpty(totalParkingSpots) === false &&
              isNil(isFurnished) === false &&
              isNil(street) === false &&
              isEmpty(street) === false &&
              isNil(streetNumber) === false &&
              isEmpty(streetNumber) === false &&
              isNil(idZipCode) === false &&
              isNil(zipCode) === false &&
              isEmpty(zipCode) === false
            ) {
              if (
                idPropertyType === "4" &&
                isNil(idCommercialActivity) === true
              ) {
                setIsVisibleError(true);
                setTimeout(() => {
                  setIsVisibleError(false);
                }, 5000);
              } else {
                if (
                  openOtherNeighborhood === true &&
                  isNil(neighborhood) === true &&
                  isEmpty(neighborhood) === true
                ) {
                  setIsVisibleError(true);
                  setTimeout(() => {
                    setIsVisibleError(false);
                  }, 5000);
                } else {
                  const jsonProperty = {
                    ...dataForm,
                    address: JSON.stringify({
                      ...dataAddress,
                    }),
                  };
                  onNext(
                    {
                      ...dataAddressInfo,
                      state: zipCodeStateCity.state,
                      city: zipCodeStateCity.city,
                    },
                    jsonProperty,
                    {
                      dataForm,
                      dataAddress: { ...dataAddress, zipCode: zipCode },
                    }
                  );
                }
              }
            } else {
              setIsVisibleError(true);
              setTimeout(() => {
                setIsVisibleError(false);
              }, 5000);
            }
          }}
        >
          Siguiente
        </button>
        <button
          className="hfy-secondary-button"
          onClick={() => {
            const jsonProperty = {
              ...dataForm,
              address: JSON.stringify({
                ...dataAddress,
              }),
            };
            onBack(
              {
                ...dataAddressInfo,
                state: zipCodeStateCity.state,
                city: zipCodeStateCity.city,
              },
              jsonProperty,
              {
                dataForm,
                dataAddress: { ...dataAddress, zipCode: zipCode },
              }
            );
          }}
        >
          Regresar
        </button>
      </MainButtons>
    </>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionInfoProperty);
