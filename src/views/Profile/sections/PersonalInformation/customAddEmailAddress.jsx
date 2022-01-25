import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Row, Col } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../../utils/actions/actions";
import CustomDialog from "../../../../components/CustomDialog";
import ComponentLoadSection from "../../../../components/componentLoadSection";
import ComponentVerifyCode from "./componentVerifyCode";
import CustomInputTypeForm from "../../../../components/CustomInputTypeForm";

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

const CustomAddEmailAddress = (props) => {
  const { isVisibleAddData, onClose, onAddDataInfo } = props;
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [stepCode, setStepCode] = useState(1);
  const defaultData = {
    emailAddress: "",
    idCustomer: null,
    idEmailAddress: null,
    code: null,
  };
  const [dataForm, setDataForm] = useState(defaultData);

  const frontFunctions = new FrontFunctions();

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
                <h1>Agregar un correo</h1>
              </div>

              <div className="form-contact">
                <Row>
                  <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                    <CustomInputTypeForm
                      value={dataForm.emailAddress}
                      placeholder=""
                      label="Correo electrónico"
                      error={false}
                      errorMessage="Este campo es requerido"
                      onChange={(value) => {
                        setDataForm({
                          ...dataForm,
                          emailAddress: value,
                        });
                      }}
                      type="text"
                      isBlock={false}
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
                            requiresVerificationCode: false,
                            isActive: true,
                            isMain: false,
                          });

                          await onAddDataInfo({
                            requiresVerificationCode: true,
                            idEmailAddress: response.response.idEmailAddress,
                            idCustomer: response.response.idCustomer,
                          });
                          setDataForm({
                            ...dataForm,
                            idEmailAddress: response.response.idEmailAddress,
                            idCustomer: response.response.idCustomer,
                          });
                          setStepCode(2);
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
                type="correo"
                onResendCode={async () => {
                  try {
                    setIsLoadApi(true);
                    await onAddDataInfo({
                      requiresVerificationCode: true,
                      idEmailAddress: dataForm.idEmailAddress,
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
                userData={dataForm.emailAddress}
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
)(CustomAddEmailAddress);
