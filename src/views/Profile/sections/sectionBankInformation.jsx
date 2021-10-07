import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../../utils/constants/apiConstants";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callGlobalActionApi } from "../../../utils/actions/actions";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";
import ContextProfile from "../context/contextProfile";

const SectionBankInformation = (props) => {
  const { callGlobalActionApi, dataProfile } = props;
  const [dataForm, setDataForm] = useState({
    bankBranch: null,
    accountHolder: null,
    accountNumber: null,
    clabeNumber: null,
  });
  const [dataBankText, setDataBankText] = useState("");
  const [idBank, setIdBank] = useState(null);
  const [errorClabe, setErrorClabe] = useState(false);

  const frontFunctions = new FrontFunctions();
  const dataContexProfile = useContext(ContextProfile);
  const { dataUserType } = dataContexProfile;

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

  const formTenantUser = (
    <>
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
      <CustomInputTypeForm
        value={dataBankText}
        placeholder=""
        label="Banco"
        error={false}
        errorMessage="Este campo es requerido"
        onChange={(value) => {}}
        type="text"
      />
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
    </>
  );

  const typeFormUser = (userType) => {
    let component = <div />;
    switch (userType) {
      case "1":
      case "2":
      case "3":
      case "4":
        component = formTenantUser;
        break;
      default:
        component = <div />;

        break;
    }
    return component;
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
      <h1>Información bancaria</h1>
      {typeFormUser(dataUserType)}
      <button
        onClick={() => {
          handlerCallUpdateCustomerAccount({ ...dataForm, idBank });
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
)(SectionBankInformation);
