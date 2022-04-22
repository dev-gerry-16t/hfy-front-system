import React from "react";
import { Row, Col } from "antd";
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
import { isNil } from "lodash";

const SectionInfoUser = (props) => {
  const {
    idUserInRequest,
    idCustomerType,
    idPersonType,
    givenName,
    lastName,
    mothersMaidenName,
    emailAddress,
    idCountryPhoneNumber,
    idPhoneType,
    phoneNumber,
    isInfoProvidedByRequester,
    requiresVerfication,
    onSaveState,
  } = props;

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
        isInfoProvidedByRequester === false && (
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
                  checked={requiresVerfication === true}
                  name="verify-information"
                  onClick={() => {
                    onSaveState({
                      requiresVerfication: true,
                    });
                  }}
                />
                Si
              </label>
              <label className="input-radio">
                <input
                  type="radio"
                  name="verify-information"
                  checked={requiresVerfication === false}
                  onClick={() => {
                    onSaveState({
                      requiresVerfication: false,
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

export default SectionInfoUser;
