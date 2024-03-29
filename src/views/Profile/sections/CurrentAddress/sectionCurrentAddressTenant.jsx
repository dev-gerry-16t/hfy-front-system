import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import CustomInputTypeForm from "../../../../components/CustomInputTypeForm";
import CustomSelect from "../../../../components/CustomSelect";
import ContextProfile from "../../context/contextProfile";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../../utils/actions/actions";
import CustomInputCurrency from "../../../../components/customInputCurrency";
import { ReactComponent as Arrow } from "../../../../assets/icons/Arrow.svg";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
  ComponentRadio,
} from "../../constants/styleConstants";
import WidgetModalConfirmation from "../../widget/widgetModalConfirmation";

const SectionCurrentAddress = (props) => {
  const { callGlobalActionApi, dataProfile, onclickBack, onclickNext } = props;
  const [idZipCode, setIdZipCode] = useState(null);
  const [zipCodeStateCity, setZipCodeStateCity] = useState({
    state: null,
    city: null,
  });
  const [openOtherNeighborhood, setOpenOtherNeighborhood] = useState(false);
  const [dataZipCatalog, setDataZipCatalog] = useState([]);
  const [dataPropertyStates, setDataPropertyStates] = useState([]);
  const [openRequiresQty, setOpenRequiresQty] = useState(false);
  const [dataVerificationInfo, setDataVerificationInfo] = useState([]);
  const [isOpenVerification, setIsOpenVerification] = useState(false);
  const [dataForm, setDataForm] = useState({
    isOwn: null,
    lessorFullName: null,
    lessorPhoneNumber: null,
    currentTimeRange: null,
    currentTime: null,
    currentRent: null,
    street: null,
    streetNumber: null,
    suite: null,
    idZipCode: null,
    neighborhood: null,
    zipCode: null,
    idPropertyState: null,
    qtyDescription: null,
  });

  const frontFunctions = new FrontFunctions();

  const dataContexProfile = useContext(ContextProfile);
  const {
    dataCustomerDetail,
    matchParams,
    history,
    identifier,
    getById,
    idCustomerOwner,
  } = dataContexProfile;

  const handlerCallValidateCustomerPropertiesInTab = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          identifier,
          idCustomer:
            isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
          idSystemUser,
          idLoginHistory,
        },
        null,
        API_CONSTANTS.CUSTOMER.VALIDATE_CUSTOMER_PROPERTIES_IN_TAB
      );
      const responseResult =
        isNil(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false &&
        isNil(response.response[0][0].properties) === false &&
        isEmpty(response.response[0][0].properties) === false
          ? JSON.parse(response.response[0][0].properties)
          : [];

      setDataVerificationInfo(responseResult);
      if (isEmpty(responseResult) === false) {
        setIsOpenVerification(true);
        throw "Revisa la información requerida";
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallSetCustomerAddress = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer:
            isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
        API_CONSTANTS.CUSTOMER.SET_CUSTOMER_ADDRESS,
        "PUT"
      );
      const responseResult =
        isNil(response.response) === false &&
        isNil(response.response.message) === false
          ? response.response.message
          : "";
      frontFunctions.showMessageStatusApi(
        isEmpty(responseResult) === false
          ? responseResult
          : "Se ejecutó correctamente la solicitud",
        GLOBAL_CONSTANTS.STATUS_API.SUCCESS
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const hanlderCallGetZipCodeAdress = async (code, id) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer:
            isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
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
        state: isEmpty(responseResult1) === false ? responseResult1.state : "",
        city:
          isEmpty(responseResult1) === false
            ? responseResult1.municipality
            : "",
      });
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetAllPropertyStates = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer:
            isNil(idCustomerOwner) === false ? idCustomerOwner : idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_ALL_PROPERTY_STATES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataPropertyStates(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerSetStateDataDetail = (data) => {
    const {
      isOwn,
      lessorFullName,
      lessorPhoneNumber,
      currentTimeRange,
      currentTime,
      currentRent,
      street,
      streetNumber,
      suite,
      idZipCode,
      neighborhood,
      zipCode,
      idPropertyState,
      qtyDescription,
    } = data;

    setDataForm({
      isOwn,
      lessorFullName,
      lessorPhoneNumber,
      currentTimeRange,
      currentTime,
      currentRent,
      street,
      streetNumber,
      suite,
      idZipCode,
      neighborhood,
      zipCode,
      idPropertyState,
      qtyDescription,
    });
    hanlderCallGetZipCodeAdress(zipCode, idZipCode);
  };

  useEffect(() => {
    if (isEmpty(dataCustomerDetail) === false) {
      handlerSetStateDataDetail(dataCustomerDetail);
    }
  }, [dataCustomerDetail]);

  useEffect(() => {
    if (
      isEmpty(dataPropertyStates) === false &&
      isEmpty(dataCustomerDetail) === false
    ) {
      const findInfo = dataPropertyStates.find((row) => {
        return dataCustomerDetail.idPropertyState == row.idPropertyState;
      });
      if (isNil(findInfo) === false) {
        setOpenRequiresQty(findInfo.requiresQty);
      }
    }
  }, [dataPropertyStates, dataCustomerDetail]);

  useEffect(() => {
    hanlderCallGetAllPropertyStates();
  }, []);

  return (
    <ContentForm>
      {/*isNil(matchParams) === false && (
        <div className="back-button">
          <button
            onClick={() => {
              history.push("/websystem/profile");
            }}
          >
            <Arrow width="25px" />
          </button>
        </div>
      )*/}
      <div className="header-title">
        <h1>Dirección Actual</h1>
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <span>Por favor llena todos los campos correspondientes.</span>
            </Col>
          </Row>
        </div>
        <WidgetModalConfirmation
          data={dataVerificationInfo}
          isVisibleModal={isOpenVerification}
          onNextStep={() => {
            onclickNext(dataForm); //verifica que sea next o finish
          }}
          onClose={() => {
            setIsOpenVerification(false);
          }}
        />
        <div className="type-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={dataForm.street}
                    placeholder=""
                    label="Calle"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        street: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  span={11}
                  xs={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 11 }}
                >
                  <CustomInputTypeForm
                    value={dataForm.streetNumber}
                    placeholder=""
                    label="Número exterior"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        streetNumber: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
                <Col
                  span={2}
                  xs={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 2 }}
                />
                <Col
                  span={11}
                  xs={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 11 }}
                >
                  <CustomInputTypeForm
                    value={dataForm.suite}
                    placeholder=""
                    label="Número interior"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        suite: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  span={11}
                  xs={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 11 }}
                >
                  <CustomInputTypeForm
                    value={dataForm.zipCode}
                    placeholder=""
                    label="Código postal"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      let stateValue = {
                        ...dataForm,
                        zipCode: value,
                      };
                      if (value.length < 5) {
                        setOpenOtherNeighborhood(false);
                        stateValue = {
                          ...dataForm,
                          zipCode: value,
                          neighborhood: null,
                        };
                      }
                      setDataForm(stateValue);
                      hanlderCallGetZipCodeAdress(value, "");
                    }}
                    type="number"
                  />
                </Col>
                <Col
                  span={2}
                  xs={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 2 }}
                />
                <Col
                  span={11}
                  xs={{ span: 24 }}
                  md={{ span: 24 }}
                  lg={{ span: 11 }}
                >
                  <CustomInputTypeForm
                    isBlock={true}
                    value={zipCodeStateCity.state}
                    placeholder=""
                    label="Estado"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {}}
                    type="text"
                  />
                </Col>
              </Row>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={zipCodeStateCity.city}
                    placeholder=""
                    label="Municipio/Delegación"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {}}
                    type="text"
                    isBlock={true}
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomSelect
                    value={idZipCode}
                    placeholder=""
                    label="Colonia"
                    data={dataZipCatalog}
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value, option) => {
                      setDataForm({
                        ...dataForm,
                        idZipCode: value,
                      });
                      setIdZipCode(value);
                      setOpenOtherNeighborhood(option.isOpen);
                    }}
                  />
                </Col>
              </Row>
              {openOtherNeighborhood === true && (
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <CustomInputTypeForm
                      value={dataForm.neighborhood}
                      placeholder="Indica la colonia"
                      label="Otra colonia"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({
                          ...dataForm,
                          neighborhood: value,
                        });
                      }}
                      type="text"
                    />
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
          <Row
            style={{
              margin: "2em 0px",
            }}
          >
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <ComponentRadio>
                <strong>¿Eres el dueño?</strong>
                <div className="radio-inputs-options">
                  <label className="input-radio">
                    <input
                      type="radio"
                      checked={dataForm.isOwn == true}
                      name="is-own"
                      onClick={() => {
                        setDataForm({
                          ...dataForm,
                          isOwn: true,
                        });
                      }}
                    />
                    Si
                  </label>
                  <label className="input-radio">
                    <input
                      type="radio"
                      name="is-own"
                      checked={dataForm.isOwn == false}
                      onClick={() => {
                        setDataForm({
                          ...dataForm,
                          isOwn: false,
                        });
                      }}
                    />
                    No
                  </label>
                </div>
              </ComponentRadio>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}></Col>
          </Row>
          {(dataForm.isOwn === "1" ||
            dataForm.isOwn === 1 ||
            dataForm.isOwn === true ||
            dataForm.isOwn === "true") && (
            <>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomSelect
                    value={dataForm.idPropertyState}
                    placeholder=""
                    label="Estatus de tu propiedad"
                    data={dataPropertyStates}
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value, option) => {
                      setDataForm({
                        ...dataForm,
                        idPropertyState: value,
                      });
                      setOpenRequiresQty(option.requiresQty);
                    }}
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  {openRequiresQty === true && (
                    <CustomInputCurrency
                      value={dataForm.qtyDescription}
                      placeholder=""
                      label="Monto que pagas:"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({
                          ...dataForm,
                          qtyDescription: value,
                        });
                      }}
                      type="number"
                    />
                  )}
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Row>
                    <Col
                      span={11}
                      xs={{ span: 24 }}
                      md={{ span: 24 }}
                      lg={{ span: 11 }}
                    >
                      <CustomInputTypeForm
                        value={dataForm.currentTime}
                        placeholder=""
                        label="Tiempo habitando"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            currentTime: value,
                          });
                        }}
                        type="number"
                      />
                    </Col>
                    <Col
                      span={2}
                      xs={{ span: 24 }}
                      md={{ span: 24 }}
                      lg={{ span: 2 }}
                    />
                    <Col
                      span={11}
                      xs={{ span: 24 }}
                      md={{ span: 24 }}
                      lg={{ span: 11 }}
                    >
                      <CustomSelect
                        value={dataForm.currentTimeRange}
                        placeholder=""
                        label="Periodo"
                        data={[
                          {
                            id: "M",
                            text: "Meses",
                          },
                          {
                            id: "Y",
                            text: "Años",
                          },
                        ]}
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            currentTimeRange: value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}
          {(dataForm.isOwn === "0" ||
            dataForm.isOwn === 0 ||
            dataForm.isOwn === false ||
            dataForm.isOwn === "false") && (
            <>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.lessorFullName}
                    placeholder=""
                    label="Nombre del arrendador"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        lessorFullName: value,
                      });
                    }}
                    type="text"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.lessorPhoneNumber}
                    placeholder=""
                    label="Teléfono del arrendador"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        lessorPhoneNumber: value,
                      });
                    }}
                    type="number"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputCurrency
                    value={dataForm.currentRent}
                    placeholder=""
                    label="Monto que pagas:"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        currentRent: value,
                      });
                    }}
                    type="number"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <Row>
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomInputTypeForm
                        value={dataForm.currentTime}
                        placeholder=""
                        label="Tiempo habitando"
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            currentTime: value,
                          });
                        }}
                        type="number"
                      />
                    </Col>
                    <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                    <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                      <CustomSelect
                        value={dataForm.currentTimeRange}
                        placeholder=""
                        label="Periodo"
                        data={[
                          {
                            id: "M",
                            text: "Meses",
                          },
                          {
                            id: "Y",
                            text: "Años",
                          },
                        ]}
                        error={false}
                        errorMessage="Este campo es requerido"
                        onChange={(value) => {
                          setDataForm({
                            ...dataForm,
                            currentTimeRange: value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          )}
        </div>
        <div className="label-indicator" style={{}}>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <span>
                Antes de continuar por favor verifica que tus datos sean
                correctos.
              </span>
            </Col>
          </Row>
        </div>
        <div className="next-back-buttons">
          <ButtonNextBackPage
            block={false}
            onClick={() => {
              onclickBack(dataForm);
            }}
          >
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                await handlerCallSetCustomerAddress(dataForm);
                getById();
                handlerCallValidateCustomerPropertiesInTab();
              } catch (error) {}
            }}
          >
            Guardar
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                await handlerCallSetCustomerAddress(dataForm);
                getById();
                await handlerCallValidateCustomerPropertiesInTab();
                onclickNext(dataForm);
              } catch (error) {}
            }}
          >
            <u>{"Siguiente"}</u>
            {" >>"}
          </ButtonNextBackPage>
        </div>
      </FormProperty>
    </ContentForm>
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
)(SectionCurrentAddress);
