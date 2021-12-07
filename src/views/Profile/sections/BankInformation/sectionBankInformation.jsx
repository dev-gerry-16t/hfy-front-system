import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../../utils/constants/globalConstants";
import FrontFunctions from "../../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../../utils/actions/actions";
import CustomInputTypeForm from "../../../../components/CustomInputTypeForm";
import ContextProfile from "../../context/contextProfile";
import { ReactComponent as Arrow } from "../../../../assets/icons/Arrow.svg";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "../../constants/styleConstants";

const SectionBankInformation = (props) => {
  const { callGlobalActionApi, dataProfile, onclickBack, onClickFinish } =
    props;
  const [dataForm, setDataForm] = useState({
    bankBranch: null,
    accountHolder: null,
    accountNumber: null,
    clabeNumber: null,
    password: null,
  });
  const [dataBankText, setDataBankText] = useState("");
  const [idBank, setIdBank] = useState(null);
  const [errorClabe, setErrorClabe] = useState(false);

  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { dataCustomerDetail, matchParams, history } = dataContexProfile;

  const handlerCallUpdateCustomerAccount = async (data) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          ...data,
        },
        idCustomer,
        API_CONSTANTS.CUSTOMER.SET_CUSTOMER_BANKING_ACCOUNT,
        "PUT"
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerCallBankCatalog = async (clabe = null) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      if (isNil(clabe) === false && isEmpty(clabe) === false) {
        const response = await callGlobalActionApi(
          {
            idCustomer,
            idSystemUser,
            idLoginHistory,
            type: 1,
            clabe,
          },
          null,
          API_CONSTANTS.GET_ALL_BANKS_CATALOG
        );
        const responseResult =
          isNil(response) === false &&
          isNil(response.response) === false &&
          isNil(response.response[0]) === false
            ? response.response[0]
            : [];
        setDataBankText(
          isEmpty(responseResult) === false &&
            isNil(responseResult.text) === false
            ? responseResult.text
            : ""
        );
        setErrorClabe(false);
        setIdBank(responseResult.idBank);
      } else {
        setDataBankText("");
        setErrorClabe(true);
        setIdBank(null);
      }
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const handlerSetStateDataDetail = (data) => {
    const { idBank, bankBranch, accountHolder, accountNumber, clabeNumber } =
      data;
    setDataForm({
      idBank,
      bankBranch,
      accountHolder,
      accountNumber,
      clabeNumber,
    });
    handlerCallBankCatalog(clabeNumber);
  };

  useEffect(() => {
    if (isEmpty(dataCustomerDetail) === false) {
      handlerSetStateDataDetail(dataCustomerDetail);
    }
  }, [dataCustomerDetail]);

  return (
    <ContentForm>
      {isNil(matchParams) === false && (
        <div className="back-button">
          <button
            onClick={() => {
              history.push("/websystem/profile");
            }}
          >
            <Arrow width="35px" />
          </button>
        </div>
      )}
      <div className="header-title">
        <h1>Información Bancaria</h1>
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <span>Por favor llena todos los campos correspondientes.</span>
            </Col>
          </Row>
        </div>
        <div className="type-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.accountHolder}
                placeholder=""
                label="Nombre del titular de la cuenta"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    accountHolder: value,
                  });
                }}
                type="text"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.password}
                placeholder="Por seguridad ingresa tu contraseña"
                label="Contraseña de inicio de sesión"
                error={true}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    password: value,
                  });
                }}
                type="password"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.clabeNumber}
                placeholder=""
                label="CLABE interbancaria (18 dígitos)"
                error={errorClabe}
                errorMessage="CLABE incompleta"
                onChange={(value) => {
                  if (value.length <= 18) {
                    setDataForm({
                      ...dataForm,
                      clabeNumber: value,
                    });
                    if (value.length === 18) {
                      handlerCallBankCatalog(value);
                    } else {
                      handlerCallBankCatalog("");
                    }
                  }
                }}
                type="number"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataBankText}
                placeholder=""
                label="Banco"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {}}
                type="text"
              />
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.accountNumber}
                placeholder=""
                label="Número de cuenta"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    accountNumber: value,
                  });
                }}
                type="number"
              />
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputTypeForm
                value={dataForm.bankBranch}
                placeholder=""
                label="Sucursal"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  setDataForm({
                    ...dataForm,
                    bankBranch: value,
                  });
                }}
                type="text"
              />
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
          {isNil(matchParams) === false && (
            <ButtonNextBackPage
              block={false}
              onClick={async () => {
                try {
                  await handlerCallUpdateCustomerAccount({
                    ...dataForm,
                    idBank,
                  });
                } catch (error) {}
              }}
            >
              <u>{"Guardar"}</u>
            </ButtonNextBackPage>
          )}
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              try {
                await handlerCallUpdateCustomerAccount({ ...dataForm, idBank });
                onClickFinish();
              } catch (error) {}
            }}
          >
            <u>{"Finalizar"}</u>
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
)(SectionBankInformation);
