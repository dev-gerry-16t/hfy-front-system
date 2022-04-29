import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { connect } from "react-redux";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelect from "../../../components/CustomSelect";
import {
  Container,
  HeaderContainer,
  MainContainer,
  MainInfo,
  InfoVerify,
  MainButtons,
  ComponentRadio,
} from "../constants/styles";

const SectionInfoUser = (props) => {
  const {
    dataProfile,
    callGlobalActionApi,
    idUserInRequest,
    idCustomerType,
    idPersonType,
    idCountryNationality,
    givenName,
    lastName,
    mothersMaidenName,
    emailAddress,
    idCountryPhoneNumber,
    idPhoneType,
    phoneNumber,
    isInfoProvidedByRequester,
    requiresVerification,
    onSaveState,
    isFaceToFace,
  } = props;
  const [dataNationalities, setDataNationalities] = useState([]);

  const frontFunctions = new FrontFunctions();

  const hanlderCallGetNationalities = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer: idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
        },
        null,
        API_CONSTANTS.CATALOGS.GET_CATALOG_NATIONALITIES
      );
      const responseResult =
        isNil(response) === false && isNil(response.response) === false
          ? response.response
          : [];
      setDataNationalities(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    hanlderCallGetNationalities();
  }, []);

  return (
    <div>
      {/* <Row>
              <Col span={24}>
                <CustomSelect
                  value={""}
                  placeholder=""
                  label="Tipo de persona"
                  data={[
                    { id: "1", text: "Persona fisica" },
                    { id: "2", text: "Persona Moral" },
                  ]}
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    // setDataForm({
                    //   ...dataForm,
                    //   idCountryNationality: value,
                    // });
                  }}
                  isBlock={false}
                />
              </Col>
            </Row> */}
      <Row>
        <Col span={24}>
          <CustomSelect
            value={idCountryNationality}
            placeholder=""
            label="Nacionalidad *"
            data={dataNationalities}
            error={false}
            errorMessage="Este campo es requerido"
            onChange={(value, option) => {
              onSaveState({
                idCountryNationality: value,
                idCountryNationalityText: option.text,
              });
            }}
            isBlock={false}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <CustomInputTypeForm
            value={givenName}
            placeholder=""
            label="Nombre"
            error={false}
            errorMessage="Este campo es requerido"
            onChange={(value) => {
              onSaveState({
                givenName: value,
              });
            }}
            type="text"
            isBlock={false}
          />
        </Col>
      </Row>
      <Row gutter={10}>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInputTypeForm
            value={lastName}
            placeholder=""
            label="Apellido Paterno"
            error={false}
            errorMessage="Este campo es requerido"
            onChange={(value) => {
              onSaveState({
                lastName: value,
              });
            }}
            type="text"
            isBlock={false}
          />
        </Col>
        <Col xs={{ span: 24 }} md={{ span: 12 }}>
          <CustomInputTypeForm
            value={mothersMaidenName}
            placeholder=""
            label="Apellido Materno"
            error={false}
            errorMessage="Este campo es requerido"
            onChange={(value) => {
              onSaveState({
                mothersMaidenName: value,
              });
            }}
            type="text"
            isBlock={false}
          />
        </Col>
      </Row>
      {isNil(isFaceToFace) === false && isFaceToFace === "2" && (
        <>
          <Row>
            <Col span={24}>
              <CustomInputTypeForm
                value={emailAddress}
                placeholder=""
                label="Correo"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  onSaveState({
                    emailAddress: value,
                  });
                }}
                type="email"
                isBlock={false}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <CustomInputTypeForm
                value={phoneNumber}
                placeholder=""
                label="Teléfono WhatsApp"
                error={false}
                errorMessage="Este campo es requerido"
                onChange={(value) => {
                  onSaveState({
                    phoneNumber: value,
                  });
                }}
                type="tel"
                isBlock={false}
              />
            </Col>
          </Row>
        </>
      )}
      <Row>
        <Col span={24}>
          <ComponentRadio>
            <strong>
              ¿Quien ingresará la información personal para la elaboración del
              contrato?
            </strong>
            <div className="radio-inputs-options">
              <label className="input-radio">
                <input
                  type="radio"
                  checked={isInfoProvidedByRequester === true}
                  name="ingress-information"
                  onClick={() => {
                    onSaveState({
                      isInfoProvidedByRequester: true,
                    });
                  }}
                />
                Yo ingresaré su información
              </label>
              <label className="input-radio">
                <input
                  type="radio"
                  name="ingress-information"
                  checked={isInfoProvidedByRequester === false}
                  onClick={() => {
                    onSaveState({
                      isInfoProvidedByRequester: false,
                    });
                  }}
                />
                El usuario ingresará su información
              </label>
            </div>
          </ComponentRadio>
        </Col>
      </Row>
      {isNil(isInfoProvidedByRequester) === false &&
        isInfoProvidedByRequester === false &&
        isFaceToFace === "1" && (
          <>
            <Row>
              <Col span={24}>
                <CustomInputTypeForm
                  value={emailAddress}
                  placeholder=""
                  label="Correo"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    onSaveState({
                      emailAddress: value,
                    });
                  }}
                  type="email"
                  isBlock={false}
                />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <CustomInputTypeForm
                  value={phoneNumber}
                  placeholder=""
                  label="Teléfono WhatsApp"
                  error={false}
                  errorMessage="Este campo es requerido"
                  onChange={(value) => {
                    onSaveState({
                      phoneNumber: value,
                    });
                  }}
                  type="tel"
                  isBlock={false}
                />
              </Col>
            </Row>
          </>
        )}
      <Row>
        <Col span={24}>
          <ComponentRadio>
            <strong>
              ¿Deseas que el usuario sea verificado para evitar una suplantación
              de identidad?
            </strong>
            <div className="radio-inputs-options">
              <label className="input-radio">
                <input
                  type="radio"
                  checked={requiresVerification === true}
                  name="verify-information"
                  onClick={() => {
                    onSaveState({
                      requiresVerification: true,
                    });
                  }}
                />
                Si
              </label>
              <label className="input-radio">
                <input
                  type="radio"
                  name="verify-information"
                  checked={requiresVerification === false}
                  onClick={() => {
                    onSaveState({
                      requiresVerification: false,
                    });
                  }}
                />
                No
              </label>
            </div>
          </ComponentRadio>
        </Col>
      </Row>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionInfoUser);
