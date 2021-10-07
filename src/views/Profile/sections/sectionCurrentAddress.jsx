import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import CustomSelect from "../../../components/CustomSelect";
import ContextProfile from "../context/contextProfile";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import CustomInputCurrency from "../../../components/customInputCurrency";

const SectionCurrentAddress = (props) => {
  const { callGlobalActionApi, dataProfile } = props;
  const [idZipCode, setIdZipCode] = useState(null);
  const [zipCodeStateCity, setZipCodeStateCity] = useState({
    state: null,
    city: null,
  });
  const [openOtherNeighborhood, setOpenOtherNeighborhood] = useState(false);
  const [dataZipCatalog, setDataZipCatalog] = useState([]);
  const [dataForm, setDataForm] = useState({
    isOwn: null,
    lessorFullName: null,
    lessorPhoneNumber: null,
    currentTimeRange: null,
    currentTime: null,
    currentRent: null,
    street: null,
    streetNumber: null,
    suite: null,
    idZipCode: null,
    neighborhood: null,
    zipCode: null,
  });

  const frontFunctions = new FrontFunctions();

  const dataContexProfile = useContext(ContextProfile);
  const { dataUserType } = dataContexProfile;

  const handlerCallSetCustomerAddress = async (data) => {
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
        API_CONSTANTS.CUSTOMER.SET_CUSTOMER_ADDRESS,
        "PUT"
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const hanlderCallGetZipCodeAdress = async (code, id) => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          type: 1,
          zipCode: code,
        },
        null,
        API_CONSTANTS.GET_ZIP_CODE_ADRESS
      );
      const responseResult1 =
        isNil(response) === false &&
        isNil(response.response1) === false &&
        isNil(response.response1[0]) === false
          ? response.response1[0]
          : {};
      const responseResult2 =
        isNil(response) === false && isNil(response.response2) === false
          ? response.response2
          : [];
      const neighborhood = responseResult2.find((row) => {
        return row.idZipCode === id;
      });
      if (
        isNil(neighborhood) === false &&
        isNil(neighborhood.isOpen) === false &&
        neighborhood.isOpen === true
      ) {
        setOpenOtherNeighborhood(true);
      }

      setIdZipCode(isEmpty(responseResult2) ? "" : id);
      setDataZipCatalog(responseResult2);
      setZipCodeStateCity({
        state: isEmpty(responseResult1) === false ? responseResult1.state : "",
        city:
          isEmpty(responseResult1) === false
            ? responseResult1.municipality
            : "",
      });
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  const formTenantUser = (
    <>
      <CustomInputTypeForm
        value={dataForm.street}
        placeholder=""
        label="Calle"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataForm({
            ...dataForm,
            street: value,
          });
        }}
        type="text"
      />
      <CustomInputTypeForm
        value={dataForm.streetNumber}
        placeholder=""
        label="Número exterior"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataForm({
            ...dataForm,
            streetNumber: value,
          });
        }}
        type="number"
      />
      <CustomInputTypeForm
        value={dataForm.suite}
        placeholder=""
        label="Número interior"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataForm({
            ...dataForm,
            suite: value,
          });
        }}
        type="number"
      />
      <CustomInputTypeForm
        value={dataForm.zipCode}
        placeholder=""
        label="Código postal"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataForm({
            ...dataForm,
            zipCode: value,
          });
          hanlderCallGetZipCodeAdress(value, "");
        }}
        type="number"
      />
      <CustomInputTypeForm
        value={zipCodeStateCity.state}
        placeholder=""
        label="Estado"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {}}
        type="text"
      />
      <CustomInputTypeForm
        value={zipCodeStateCity.city}
        placeholder=""
        label="Municipio/Delegación"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {}}
        type="text"
      />
      <CustomSelect
        value={idZipCode}
        placeholder=""
        label="Colonia"
        data={dataZipCatalog}
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value, option) => {
          setDataForm({
            ...dataForm,
            idZipCode: value,
          });
          setIdZipCode(value);
          setOpenOtherNeighborhood(option.isOpen);
        }}
      />
      {openOtherNeighborhood === true && (
        <CustomInputTypeForm
          value={dataForm.neighborhood}
          placeholder="Indica la colonia"
          label="Otra colonia"
          error={false}
          errorMessage="Este campo es requerido"
          onChange={(value) => {
            setDataForm({
              ...dataForm,
              neighborhood: value,
            });
          }}
          type="text"
        />
      )}
      <CustomSelect
        value={dataForm.isOwn}
        placeholder=""
        label="La propiedad actual es"
        data={[
          {
            id: 1,
            text: "Propia",
          },
          {
            id: 0,
            text: "Rentada",
          },
        ]}
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataForm({
            ...dataForm,
            isOwn: value,
          });
        }}
      />
      {dataForm.isOwn == "0" && (
        <>
          <CustomInputTypeForm
            value={dataForm.lessorFullName}
            placeholder=""
            label="Nombre del arrendador"
            error={false}
            errorMessage="Este campo es requerido"
            onChange={(value) => {
              setDataForm({
                ...dataForm,
                lessorFullName: value,
              });
            }}
            type="text"
          />
          <CustomInputTypeForm
            value={dataForm.lessorPhoneNumber}
            placeholder=""
            label="Teléfono del arrendador"
            error={false}
            errorMessage="Este campo es requerido"
            onChange={(value) => {
              setDataForm({
                ...dataForm,
                lessorPhoneNumber: value,
              });
            }}
            type="number"
          />
          <CustomInputCurrency
            value={dataForm.currentRent}
            placeholder=""
            label="Monto de renta"
            error={false}
            errorMessage="Este campo es requerido"
            onChange={(value) => {
              setDataForm({
                ...dataForm,
                currentRent: value,
              });
            }}
            type="number"
          />
          <CustomInputTypeForm
            value={dataForm.currentTime}
            placeholder=""
            label="Tiempo habitando"
            error={false}
            errorMessage="Este campo es requerido"
            onChange={(value) => {
              setDataForm({
                ...dataForm,
                currentTime: value,
              });
            }}
            type="number"
          />
          <CustomSelect
            value={dataForm.currentTimeRange}
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
                currentTimeRange: value,
              });
            }}
          />
        </>
      )}
    </>
  );

  const formOwnerUser = (
    <>
      <CustomInputTypeForm
        value={dataForm.street}
        placeholder=""
        label="Calle"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataForm({
            ...dataForm,
            street: value,
          });
        }}
        type="text"
      />
      <CustomInputTypeForm
        value={dataForm.streetNumber}
        placeholder=""
        label="Número exterior"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataForm({
            ...dataForm,
            streetNumber: value,
          });
        }}
        type="number"
      />
      <CustomInputTypeForm
        value={dataForm.suite}
        placeholder=""
        label="Número interior"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataForm({
            ...dataForm,
            suite: value,
          });
        }}
        type="number"
      />
      <CustomInputTypeForm
        value={dataForm.zipCode}
        placeholder=""
        label="Código postal"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {
          setDataForm({
            ...dataForm,
            zipCode: value,
          });
          hanlderCallGetZipCodeAdress(value, "");
        }}
        type="number"
      />
      <CustomInputTypeForm
        value={zipCodeStateCity.state}
        placeholder=""
        label="Estado"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {}}
        type="text"
      />
      <CustomInputTypeForm
        value={zipCodeStateCity.city}
        placeholder=""
        label="Municipio/Delegación"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {}}
        type="text"
      />
      <CustomSelect
        value={idZipCode}
        placeholder=""
        label="Colonia"
        data={dataZipCatalog}
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value, option) => {
          setDataForm({
            ...dataForm,
            idZipCode: value,
          });
          setIdZipCode(value);
          setOpenOtherNeighborhood(option.isOpen);
        }}
      />
      {openOtherNeighborhood === true && (
        <CustomInputTypeForm
          value={dataForm.neighborhood}
          placeholder="Indica la colonia"
          label="Otra colonia"
          error={false}
          errorMessage="Este campo es requerido"
          onChange={(value) => {
            setDataForm({
              ...dataForm,
              neighborhood: value,
            });
          }}
          type="text"
        />
      )}
    </>
  );

  const typeFormUser = (userType) => {
    let component = <div />;
    switch (userType) {
      case "1":
      case "2":
        component = formTenantUser;
        break;
      case "3":
      case "4":
        component = formOwnerUser;
        break;
      default:
        component = <div />;

        break;
    }
    return component;
  };

  const handlerSetStateDataDetail = (data) => {
    const {
      isOwn,
      lessorFullName,
      lessorPhoneNumber,
      currentTimeRange,
      currentTime,
      currentRent,
      street,
      streetNumber,
      suite,
      idZipCode,
      neighborhood,
      zipCode,
    } = data;
    setDataForm({
      isOwn,
      lessorFullName,
      lessorPhoneNumber,
      currentTimeRange,
      currentTime,
      currentRent,
      street,
      streetNumber,
      suite,
      idZipCode,
      neighborhood,
      zipCode,
    });
    hanlderCallGetZipCodeAdress(zipCode, idZipCode);
  };

  useEffect(() => {
    if (
      isEmpty(dataContexProfile) === false &&
      isEmpty(dataContexProfile.dataCustomerDetail) === false
    ) {
      handlerSetStateDataDetail(dataContexProfile.dataCustomerDetail);
    }
  }, [dataContexProfile]);

  return (
    <div
      style={{
        width: 200,
        fontSize: 12,
      }}
    >
      <h1>Dirección actual</h1>

      {typeFormUser(dataUserType)}
      <button
        onClick={() => {
          handlerCallSetCustomerAddress(dataForm);
        }}
      >
        Guardar
      </button>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionCurrentAddress);
