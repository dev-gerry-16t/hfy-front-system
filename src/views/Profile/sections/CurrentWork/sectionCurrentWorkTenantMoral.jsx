import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../../utils/actions/actions";
import CustomInputCurrency from "../../../../components/customInputCurrency";
import CustomInputTypeForm from "../../../../components/CustomInputTypeForm";
import CustomSelect from "../../../../components/CustomSelect";
import CustomTextArea from "../../../../components/customTextArea";
import ContextProfile from "../../context/contextProfile";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
  ComponentRadio,
} from "../../constants/styleConstants";
import { ReactComponent as IconActivity } from "../../../../assets/iconSvg/svgFile/iconActivity.svg";
import { ReactComponent as Arrow } from "../../../../assets/icons/Arrow.svg";
import WidgetUploadDocument from "../../widget/widgetUploadDocument";
import WidgetModalConfirmation from "../../widget/widgetModalConfirmation";

const UploadSection = styled.div`
  width: 18em;
  height: 8.8em;
  border: 1px dashed #a0a3bd;
  border-radius: 4px;
  background: #f7f7fc;
  .upload-file {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 100%;
    padding: 1em 0;
    cursor: pointer;
    span {
      font-size: 0.8em;
      color: #a0a3bd;
      text-align: center;
      font-weight: 700;
    }
  }
`;

const ContentFile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em 0px;
`;

const SectionCurrentWork = (props) => {
  const { callGlobalActionApi, dataProfile, onclickBack, onclickNext } = props;
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
  });
  const [dataOccupations, setDataOccupations] = useState([]);
  const [dataDocument, setDataDocument] = useState([]);
  const [dataVerificationInfo, setDataVerificationInfo] = useState([]);
  const [isOpenVerification, setIsOpenVerification] = useState(false);
  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { dataCustomerDetail, identifier, type, matchParams, history } =
    dataContexProfile;

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

  const handlerCallGetCustomerDocument = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          identifier,
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
      hasOtherIncomes,
      hasCar,
      carriagePlate,
      nIV,
      isCCAccepted,
      cCDigitalSignature,
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
      hasOtherIncomes,
      hasCar,
      carriagePlate,
      nIV,
      isCCAccepted,
      cCDigitalSignature,
    });
  };

  useEffect(() => {
    if (isEmpty(dataCustomerDetail) === false) {
      handlerSetStateDataDetail(dataCustomerDetail);
    }
  }, [dataContexProfile]);

  useEffect(() => {
    handlerCallInitApis();
    handlerCallGetCustomerDocument();
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
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
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
          </Row>
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
        </div>
        <div
          className="label-indicator"
          style={{
            margin: "3em 0px",
            borderBottom: "1px solid var(--color-primary)",
            paddingBottom: "0.5em",
          }}
        />
        <h1 className="subtitle-header">Documentos</h1>
        <WidgetUploadDocument
          handlerCallGetCustomerDocument={() => {
            handlerCallGetCustomerDocument();
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

    //   <h1>Documentos</h1>
    //   <div>3 estados de cuenta</div>
    //   <div>Carta laboral</div>
    //   <button onClick={() => {}}>Guardar</button>
    // </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionCurrentWork);
