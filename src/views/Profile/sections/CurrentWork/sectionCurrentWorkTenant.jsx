import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import {
  callGlobalActionApi,
  callAddDocument,
} from "../../../../utils/actions/actions";
import CustomInputCurrency from "../../../../components/customInputCurrency";
import CustomInputTypeForm from "../../../../components/CustomInputTypeForm";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTextArea from "../../../../components/customTextArea";
import ContextProfile from "../../context/contextProfile";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
  ComponentRadio,
} from "../../constants/styleConstants";
import { ReactComponent as Arrow } from "../../../../assets/icons/Arrow.svg";
import WidgetUploadDocument from "../../widget/widgetUploadDocument";
import WidgetModalConfirmation from "../../widget/widgetModalConfirmation";
import {
  catalogIncomeWay,
  catalogIncomePeriod,
} from "../../constants/staticCatalogs";

const SectionCurrentWork = (props) => {
  const {
    callGlobalActionApi,
    dataProfile,
    onclickBack,
    onclickNext,
    callAddDocument,
  } = props;
  const [dataForm, setDataForm] = useState({
    idOccupationActivity: null,
    economicDependents: null,
    companyName: null,
    currentSalary: null,
    antiquityTimeRange: null,
    antiquity: null,
    bossName: null,
    bossEmailAddress: null,
    bossPhoneNumber: null,
    otherIncomes: null,
    otherIncomesDescription: null,
    hasOtherIncomes: null,
    hasCar: null,
    carriagePlate: null,
    nIV: null,
    isCCAccepted: null,
    cCDigitalSignature: null,
    childrenNo: null,
    requiresAdditionalIncomes: null,
    hasAdditionalIncomes: null,
    additionalIncomes: null,
    idIncomePeriod: null,
    idIncomeWay: null,
  });
  const [dataOccupations, setDataOccupations] = useState([]);
  const [dataDocument, setDataDocument] = useState([]);
  const [dataVerificationInfo, setDataVerificationInfo] = useState([]);
  const [isOpenVerification, setIsOpenVerification] = useState(false);

  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const {
    dataCustomerDetail,
    identifier,
    type,
    history,
    matchParams,
    getById,
  } = dataContexProfile;

  const handlerCallValidateCustomerPropertiesInTab = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          identifier,
          idCustomer,
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

  const handlerCallSetCustomerWorkingInfo = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.SET_CUSTOMER_WORKING_INFO,
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

  const hanlderCallGetOccupations = async () => {
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
        API_CONSTANTS.CATALOGS.GET_CATALOG_OCCUPATIONS
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataOccupations(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetCustomerDocument = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          identifier,
          ...data,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_CUSTOMER_DOCUMENT
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false
          ? response.response[0]
          : [];
      setDataDocument(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallInitApis = async () => {
    hanlderCallGetOccupations();
  };

  const handlerSetStateDataDetail = (data) => {
    const {
      idOccupationActivity,
      economicDependents,
      companyName,
      currentSalary,
      antiquityTimeRange,
      antiquity,
      bossName,
      bossEmailAddress,
      bossPhoneNumber,
      otherIncomes,
      otherIncomesDescription,
      hasCar,
      carriagePlate,
      nIV,
      isCCAccepted,
      cCDigitalSignature,
      childrenNo,
      hasOtherIncomes,
      requiresAdditionalIncomes,
      hasAdditionalIncomes,
      additionalIncomes,
      idIncomePeriod,
      idIncomeWay,
    } = data;
    setDataForm({
      idOccupationActivity,
      economicDependents,
      companyName,
      currentSalary,
      antiquityTimeRange,
      antiquity,
      bossName,
      bossEmailAddress,
      bossPhoneNumber,
      otherIncomes,
      otherIncomesDescription,
      hasCar,
      carriagePlate,
      nIV,
      isCCAccepted,
      cCDigitalSignature,
      childrenNo,
      hasOtherIncomes,
      requiresAdditionalIncomes,
      hasAdditionalIncomes,
      additionalIncomes,
      idIncomePeriod,
      idIncomeWay,
    });
  };

  useEffect(() => {
    if (isEmpty(dataCustomerDetail) === false) {
      handlerSetStateDataDetail(dataCustomerDetail);
    }
  }, [dataCustomerDetail]);

  useEffect(() => {
    handlerCallInitApis();
  }, []);

  return (
    <ContentForm>
      {isNil(matchParams) === false && (
        <div className="back-button">
          <button
            onClick={() => {
              history.push("/websystem/profile");
            }}
          >
            <Arrow width="25px" />
          </button>
        </div>
      )}
      <div className="header-title">
        <h1>Información Socioeconómica</h1>
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
              <CustomInputTypeForm
                value={dataForm.companyName}
                placeholder=""
                label="Nombre de la empresa"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    companyName: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomSelect
                value={dataForm.idOccupationActivity}
                placeholder=""
                label="Puesto/Ocupación"
                data={dataOccupations}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    idOccupationActivity: value,
                  });
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <Row>
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomInputTypeForm
                    value={dataForm.antiquity}
                    placeholder=""
                    label="Antigüedad"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        antiquity: value,
                      });
                    }}
                    type="number"
                  />
                </Col>
                <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
                <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                  <CustomSelect
                    value={dataForm.antiquityTimeRange}
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
                        antiquityTimeRange: value,
                      });
                    }}
                  />
                </Col>
              </Row>
            </Col>

            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputCurrency
                value={dataForm.currentSalary}
                placeholder=""
                label="Sueldo mensual"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    currentSalary: value,
                  });
                }}
                type="number"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.economicDependents}
                placeholder=""
                label="Número de dependientes económicos"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    economicDependents: value,
                  });
                }}
                type="number"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.childrenNo}
                placeholder=""
                label="Número de hijos"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    childrenNo: value,
                  });
                }}
                type="number"
              />
            </Col>
          </Row>
          <Row style={{ margin: "2em 0px" }}>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <ComponentRadio>
                <strong>¿Tienes otros ingresos?</strong>
                <div className="radio-inputs-options">
                  <label className="input-radio">
                    <input
                      type="radio"
                      checked={dataForm.hasOtherIncomes == true}
                      name="other-incomes"
                      onClick={() => {
                        setDataForm({
                          ...dataForm,
                          hasOtherIncomes: true,
                        });
                      }}
                    />
                    Si
                  </label>
                  <label className="input-radio">
                    <input
                      type="radio"
                      name="other-incomes"
                      checked={dataForm.hasOtherIncomes == false}
                      onClick={() => {
                        setDataForm({
                          ...dataForm,
                          hasOtherIncomes: false,
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
          {dataForm.hasOtherIncomes == true && (
            <Row>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <CustomInputCurrency
                  value={dataForm.otherIncomes}
                  placeholder=""
                  label="Monto de otros ingresos"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    setDataForm({
                      ...dataForm,
                      otherIncomes: value,
                    });
                  }}
                  type="number"
                />
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <CustomTextArea
                  placeholder="Descripción de otros ingresos"
                  label="Descripción"
                  value={dataForm.otherIncomesDescription}
                  maxlength="1000"
                  onChange={(e) => {
                    setDataForm({
                      ...dataForm,
                      otherIncomesDescription: e,
                    });
                  }}
                  error={false}
                  errorMessage="Este campo es requerido"
                />
              </Col>
            </Row>
          )}
          {dataForm.requiresAdditionalIncomes && (
            <Row style={{ margin: "2em 0px" }}>
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                <ComponentRadio>
                  <strong>¿Tu cónyuge aporta ingresos adicionales?</strong>
                  <div className="radio-inputs-options">
                    <label className="input-radio">
                      <input
                        type="radio"
                        checked={dataForm.hasAdditionalIncomes == true}
                        name="other-additional-incomes"
                        onClick={() => {
                          setDataForm({
                            ...dataForm,
                            hasAdditionalIncomes: true,
                          });
                        }}
                      />
                      Si
                    </label>
                    <label className="input-radio">
                      <input
                        type="radio"
                        name="other-additional-incomes"
                        checked={dataForm.hasAdditionalIncomes == false}
                        onClick={() => {
                          setDataForm({
                            ...dataForm,
                            hasAdditionalIncomes: false,
                          });
                        }}
                      />
                      No
                    </label>
                  </div>
                </ComponentRadio>
              </Col>
              <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
              <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
                {dataForm.hasAdditionalIncomes == true && (
                  <CustomInputCurrency
                    value={dataForm.additionalIncomes}
                    placeholder=""
                    label="Monto de ingresos"
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({
                        ...dataForm,
                        additionalIncomes: value,
                      });
                    }}
                    type="number"
                  />
                )}
              </Col>
            </Row>
          )}
        </div>
        <div
          className="label-indicator"
          style={{
            margin: "3em 0px",
            borderBottom: "1px solid var(--color-primary)",
            paddingBottom: "0.5em",
          }}
        />
        <h1 className="subtitle-header">Información de Jefe Directo</h1>
        <div className="type-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.bossName}
                placeholder=""
                label="Nombre"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    bossName: value,
                  });
                }}
                type="text"
              />
            </Col>

            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}></Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.bossEmailAddress}
                placeholder=""
                label="Correo electrónico"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    bossEmailAddress: value,
                  });
                }}
                type="email"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.bossPhoneNumber}
                placeholder=""
                label="Teléfono"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    bossPhoneNumber: value,
                  });
                }}
                type="number"
              />
            </Col>
          </Row>
        </div>
        <div
          className="label-indicator"
          style={{
            margin: "3em 0px",
            borderBottom: "1px solid var(--color-primary)",
            paddingBottom: "0.5em",
          }}
        />
        <h1
          className="subtitle-header"
          style={{
            marginBottom: 15,
          }}
        >
          Documentos
        </h1>
        <Row>
          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
            <CustomSelect
              value={dataForm.idIncomeWay}
              placeholder=""
              label="Forma en que compruebas ingresos *"
              data={catalogIncomeWay}
              error={false}
              errorMessage="Este campo es requerido"
              onChange={(value) => {
                setDataForm({
                  ...dataForm,
                  idIncomeWay: value,
                  idIncomePeriod: null,
                });
                if (value == 1) {
                  handlerCallGetCustomerDocument({
                    idIncomeWay: value,
                    idIncomePeriod: null,
                  });
                }
              }}
            />
          </Col>
          <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
          <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
            {dataForm.idIncomeWay == 2 && (
              <CustomSelect
                value={dataForm.idIncomePeriod}
                placeholder=""
                label="Indica la periodicidad de tus pagos *"
                data={catalogIncomePeriod}
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    idIncomePeriod: value,
                  });
                  handlerCallGetCustomerDocument({
                    idIncomePeriod: value,
                    idIncomeWay: dataForm.idIncomeWay,
                  });
                }}
              />
            )}
          </Col>
        </Row>
        <WidgetUploadDocument
          handlerCallGetCustomerDocument={() => {
            handlerCallGetCustomerDocument({
              idIncomePeriod: dataForm.idIncomePeriod,
              idIncomeWay: dataForm.idIncomeWay,
            });
          }}
          dataDocument={dataDocument}
          type={type}
        />
        <div
          className="label-indicator"
          style={{
            margin: "3em 0px",
            paddingBottom: "0.5em",
          }}
        >
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
                await handlerCallSetCustomerWorkingInfo(dataForm);
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
                await handlerCallSetCustomerWorkingInfo(dataForm);
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
  callAddDocument: (file, data, callback) =>
    dispatch(callAddDocument(file, data, callback)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionCurrentWork);
