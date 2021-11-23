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
} from "../../constants/styleConstants";
import { ReactComponent as IconActivity } from "../../../../assets/iconSvg/svgFile/iconActivity.svg";

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
    hasCar: null,
    carriagePlate: null,
    nIV: null,
    isCCAccepted: null,
    cCDigitalSignature: null,
  });
  const [dataOccupations, setDataOccupations] = useState([]);
  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { dataCustomerDetail } = dataContexProfile;

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
    });
  };

  useEffect(() => {
    if (isEmpty(dataCustomerDetail) === false) {
      handlerSetStateDataDetail(dataCustomerDetail);
    }
  }, [dataContexProfile]);

  useEffect(() => {
    handlerCallInitApis();
  }, []);

  return (
    <ContentForm>
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
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <CustomInputCurrency
                value={dataForm.otherIncomes}
                placeholder=""
                label="Otros ingresos"
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
        <div className="type-property">
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <ContentFile>
                <UploadSection>
                  <label className="upload-file" for={`id-file-1`}>
                    <IconActivity width="55px" height="55px" stroke="#A0A3BD" />
                    <span>Primer comprobante de ingresos</span>
                  </label>
                  <input
                    id={`id-file-1`}
                    accept="image/*,.pdf,.docx"
                    style={{ display: "none" }}
                    type="file"
                    onChange={() => {}}
                  />
                </UploadSection>
              </ContentFile>
            </Col>
            <Col span={2} xs={{ span: 24 }} md={{ span: 2 }} />
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <ContentFile>
                <UploadSection>
                  <label className="upload-file" for={`id-file-2`}>
                    <IconActivity width="55px" height="55px" stroke="#A0A3BD" />
                    <span>Carta Laboral</span>
                  </label>
                  <input
                    id={`id-file-2`}
                    accept="image/*,.pdf,.docx"
                    style={{ display: "none" }}
                    type="file"
                    onChange={() => {}}
                  />
                </UploadSection>
              </ContentFile>
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <ContentFile>
                <UploadSection>
                  <label className="upload-file" for={`id-file-3`}>
                    <IconActivity width="55px" height="55px" stroke="#A0A3BD" />
                    <span>Segundo comprobante de ingresos</span>
                  </label>
                  <input
                    id={`id-file-3`}
                    accept="image/*,.pdf,.docx"
                    style={{ display: "none" }}
                    type="file"
                    onChange={() => {}}
                  />
                </UploadSection>
              </ContentFile>
            </Col>
          </Row>
          <Row>
            <Col span={11} xs={{ span: 24 }} md={{ span: 11 }}>
              <ContentFile>
                <UploadSection>
                  <label className="upload-file" for={`id-file-4`}>
                    <IconActivity width="55px" height="55px" stroke="#A0A3BD" />
                    <span>Tercer comprobante de ingresos</span>
                  </label>
                  <input
                    id={`id-file-4`}
                    accept="image/*,.pdf,.docx"
                    style={{ display: "none" }}
                    type="file"
                    onChange={() => {}}
                  />
                </UploadSection>
              </ContentFile>
            </Col>
          </Row>
        </div>
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
            onClick={() => {
              onclickNext(dataForm);
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
