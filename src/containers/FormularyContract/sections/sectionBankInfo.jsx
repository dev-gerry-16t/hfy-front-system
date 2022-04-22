import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col } from "antd";
import {
  ContentForm,
  ButtonNextBackPage,
  FormProperty,
  ComponentRadio,
} from "../constants/styleConstants";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelect from "../../../components/CustomSelect";

const SectionBankInfo = ({ onClickBack, onClickNext, callGlobalActionApi }) => {
  const [errorClabe, setErrorClabe] = useState(false);
  const [dataBankText, setDataBankText] = useState("");
  const [dataForm, setDataForm] = useState({});
  const [idBank, setIdBank] = useState(null);

  const frontFunctions = new FrontFunctions();

  const handlerCallBankCatalog = async (clabe = null) => {
    try {
      if (isNil(clabe) === false && isEmpty(clabe) === false) {
        const response = await callGlobalActionApi(
          {
            idCustomer: null,
            idSystemUser: null,
            idLoginHistory: null,
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

  return (
    <ContentForm>
      <div className="header-title">
        <h1>Información Bancaria del Propietario</h1>
      </div>
      <FormProperty>
        <div className="label-indicator">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <span>Por favor llena todos los campos correspondientes.</span>
              <br />
              <span>
                Esta información se usará para indicar en el contrato de
                arrendamiento a que cuenta el inquilino tiene que realizar los
                depósitos de renta.
              </span>
            </Col>
          </Row>
        </div>
        <div className="type-property">
          <Row>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
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
          </Row>
          <Row gutter={10}>
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
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
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
              <CustomInputTypeForm
                value={dataBankText}
                placeholder=""
                label="Banco"
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
            <Col span={12} xs={{ span: 24 }} md={{ span: 12 }}>
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
              onClickBack();
            }}
          >
            {"<< "}
            <u>{"Atrás"}</u>
          </ButtonNextBackPage>
          <ButtonNextBackPage
            block={false}
            onClick={async () => {
              onClickNext();
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

const mapStateToProps = (state) => {};

const mapDispatchToProps = (dispatch) => ({
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionBankInfo);
