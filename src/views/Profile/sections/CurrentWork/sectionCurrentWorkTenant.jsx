import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
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

const SectionCurrentWork = (props) => {
  const { callGlobalActionApi, dataProfile } = props;
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
    childrenNo: null,
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
      childrenNo,
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
    <div
      style={{
        width: 200,
        fontSize: 12,
      }}
    >
      <h1>Información económica y laboral</h1>
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
      <h1>Documentos</h1>
      <div>3 estados de cuenta</div>
      <div>Carta laboral</div>
      <button onClick={() => {}}>Guardar</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(SectionCurrentWork);
