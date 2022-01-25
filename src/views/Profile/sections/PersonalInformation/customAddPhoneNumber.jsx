import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Row, Col } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../../utils/actions/actions";
import CustomDialog from "../../../../components/CustomDialog";
import CustomSelect from "../../../../components/CustomSelect";
import CustomInputSelectCountry from "../../../../components/customInputSelectCountry";
import ComponentLoadSection from "../../../../components/componentLoadSection";
import ComponentVerifyCode from "./componentVerifyCode";

const AddFormContact = styled.div`
  font-family: Poppins;
  padding: 5px 20px 20px 20px;
  min-width: 350px;
  .close-dialog {
    text-align: right;
    button {
      background: transparent;
      border: none;
      font-weight: 700;
    }
  }
  .title-dialog {
    text-align: center;
    h1 {
      font-weight: 700;
      color: #000;
      font-size: 20px;
    }
  }
  .form-contact {
    margin-top: 15px;
  }
  .add-button {
    width: 100%;
    background: var(--color-primary);
    border: none;
    border-radius: 16px;
    color: #fff;
  }
`;

const CustomAddPhoneNumber = (props) => {
  const {
    isVisibleAddData,
    onClose,
    dataProfile,
    callGlobalActionApi,
    onAddDataInfo,
  } = props;
  const [dataPhoneTypes, setDataPhoneTypes] = useState([]);
  const [dataCountryPhone, setDataCountryPhone] = useState([]);
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [stepCode, setStepCode] = useState(1);
  const [countryCode, setCountryCode] = useState("52");
  const defaultData = {
    phoneNumber: "",
    idCounry: "1",
    idPhoneType: null,
    idCustomer: null,
    idPhoneNumber: null,
    code: null,
  };
  const [dataForm, setDataForm] = useState(defaultData);

  const frontFunctions = new FrontFunctions();

  const handlerCallGetAllCountries = async () => {
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
        API_CONSTANTS.GET_ALL_COUNTRIES
      );
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataCountryPhone(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallGetAllPhoneTypes = async () => {
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
        API_CONSTANTS.CATALOGS.GET_ALL_PHONE_TYPES
      );
      const responseResult =
        isNil(response.response) === false &&
        isEmpty(response.response) === false
          ? response.response
          : [];
      setDataPhoneTypes(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetAllCountries();
    handlerCallGetAllPhoneTypes();
  }, []);

  return (
    <CustomDialog
      isVisibleDialog={isVisibleAddData}
      onClose={() => {
        setDataForm(defaultData);
        setStepCode(1);
        onClose();
      }}
    >
      <ComponentLoadSection isLoadApi={isLoadApi}>
        <AddFormContact>
          <div className="close-dialog">
            <button
              onClick={() => {
                setDataForm(defaultData);
                onClose();
                setStepCode(1);
              }}
            >
              X
            </button>
          </div>

          {stepCode === 1 && (
            <>
              <div className="title-dialog">
                <h1>Agregar un teléfono</h1>
              </div>

              <div className="form-contact">
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <CustomSelect
                      value={dataForm.idPhoneType}
                      placeholder=""
                      label="Tipo de teléfono"
                      data={dataPhoneTypes}
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value, option) => {
                        console.log("value", value);
                        setDataForm({
                          ...dataForm,
                          idPhoneType: value,
                          requiresVerificationCode: option.canReceiveSMS,
                        });
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <CustomInputSelectCountry
                      value={dataForm.phoneNumber}
                      id={"country-1"}
                      label={"Teléfono"}
                      placeholder=""
                      mask={`+${countryCode} ## #### ####`}
                      onChange={(value) => {
                        setDataForm({
                          ...dataForm,
                          phoneNumber: value,
                        });
                      }}
                      error={false}
                      errorMessage=""
                      prefix=""
                      suffix=""
                      dataSelect={dataCountryPhone}
                      valueSelect={dataForm.idCounry}
                      onChangeSelect={(value, option) => {
                        setDataForm({
                          ...dataForm,
                          idCounry: value,
                        });
                        setCountryCode(option.countryCode);
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <button
                      className="add-button"
                      onClick={async () => {
                        try {
                          setIsLoadApi(true);
                          const response = await onAddDataInfo({
                            ...dataForm,
                            phoneNumber: `${dataForm.phoneNumber}`,
                            requiresVerificationCode: false,
                            isActive: true,
                            isMain: false,
                          });
                          if (dataForm.requiresVerificationCode === false) {
                            frontFunctions.showMessageStatusApi(
                              "¡Teléfono agregado correctamente!",
                              GLOBAL_CONSTANTS.STATUS_API.SUCCESS
                            );
                            onClose();
                            setStepCode(1);
                            setDataForm(defaultData);
                          } else {
                            await onAddDataInfo({
                              requiresVerificationCode: true,
                              idPhoneNumber: response.response.idPhoneNumber,
                              idCustomer: response.response.idCustomer,
                            });
                            setDataForm({
                              ...dataForm,
                              idPhoneNumber: response.response.idPhoneNumber,
                              idCustomer: response.response.idCustomer,
                            });
                            setStepCode(2);
                          }
                          setIsLoadApi(false);
                        } catch (error) {
                          setIsLoadApi(false);
                          setDataForm(defaultData);
                          throw error;
                        }
                      }}
                    >
                      Agregar
                    </button>
                  </Col>
                </Row>
              </div>
            </>
          )}
          {stepCode === 2 && (
            <>
              <div className="title-dialog">
                <h1>Ingresa tu código </h1>
              </div>
              <ComponentVerifyCode
                type="teléfono"
                onResendCode={async () => {
                  try {
                    setIsLoadApi(true);
                    await onAddDataInfo({
                      requiresVerificationCode: true,
                      idPhoneNumber: dataForm.idPhoneNumber,
                      idCustomer: dataForm.idCustomer,
                    });
                    setIsLoadApi(false);
                  } catch (error) {
                    setIsLoadApi(false);
                  }
                }}
                onValidateCode={async () => {
                  try {
                    setIsLoadApi(true);
                    await onAddDataInfo({
                      ...dataForm,
                      isActive: true,
                      isMain: false,
                    });
                    onClose();
                    setDataForm(defaultData);
                    setStepCode(1);
                    setIsLoadApi(false);
                    frontFunctions.showMessageStatusApi(
                      "Confirmación de código completa",
                      GLOBAL_CONSTANTS.STATUS_API.SUCCESS
                    );
                  } catch (error) {
                    setIsLoadApi(false);
                  }
                }}
                onChangeCode={(value) => {
                  setDataForm({
                    ...dataForm,
                    code: value,
                  });
                }}
                codeVerify={isNil(dataForm.code) === false ? dataForm.code : ""}
                userData={dataForm.phoneNumber}
              />
            </>
          )}
        </AddFormContact>
      </ComponentLoadSection>
    </CustomDialog>
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
)(CustomAddPhoneNumber);
