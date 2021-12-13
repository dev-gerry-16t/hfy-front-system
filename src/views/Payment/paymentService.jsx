import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import { Layout, Table, message } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { API_CONSTANTS } from "../../utils/constants/apiConstants";
import ENVIROMENT from "../../utils/constants/enviroments";
import FrontFunctions from "../../utils/actions/frontFunctions";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import {
  callGetTransactions,
  callGlobalActionApi,
} from "../../utils/actions/actions";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "./constants/styleConstants";
import SectionSpeiPayment from "./sections/sectionSpeiPayment";
import SectionCardPayment from "./sections/sectionCardPayment";
import SectionOxxoPayment from "./sections/sectionOxxoPayment";
import { ReactComponent as IconPaymentCheck } from "../../assets/iconSvg/svgFile/iconPaymentCheck.svg";

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Poppins",
    },
  ],
};

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
`;

const TabsProperty = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2em;
`;

const Tab = styled.div`
  line-height: 5px;
  cursor: pointer;
  h1 {
    font-weight: bold;
    color: ${(props) =>
      props.selected === true ? "var(--color-primary)" : "#4e4b66"};
    span {
      margin-left: 10px;
      font-size: 10px;
    }
  }
  hr {
    width: 30%;
    background: #d6d8e7;
    margin: 0;
    border: 2px solid var(--color-primary);
    display: ${(props) => (props.selected === true ? "block" : "none")};
  }
`;

const CardPaymentMethod = styled.div`
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 8px;
  border-top: 6px solid var(--color-primary);
  .header-card-payment {
    display: flex;
    justify-content: center;
    padding: 2em 0px;
    border-bottom: 1px solid rgba(78, 75, 102, 0.3);
    .amount-to-pay {
      position: relative;
      span {
        border: 1px solid var(--color-primary);
        padding: 0.5em;
        border-radius: 7px;
        font-weight: 600;
        color: var(--color-primary);
      }
      p {
        position: absolute;
      }
    }
  }
  .card-body-payment {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding: 1em 0px 2em 0px;
  }
`;

const PaidService = styled.div`
  padding: 2em 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    color: #4e4b66;
    font-size: 24px;
    font-weight: 800;
    span {
      color: var(--color-primary);
    }
  }
  h2 {
    color: #4e4b66;
    margin: 20px 0px;
    font-size: 18px;
    font-weight: 600;
  }
  span {
    color: #4e4b66;
  }
  .button-payment {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    button {
      width: 250px;
      border-radius: 16px;
      padding: 3px 0px;
      background: var(--color-primary);
      border: none;
      color: #fff;
      font-weight: 600;
    }
  }
`;

const dataTabsPaymentMethod = [
  {
    id: "1",
    text: "Transferencia SPEI",
  },
  {
    id: "2",
    text: "Pago conTarjeta",
  },
  {
    id: "3",
    text: "Pago con OXXO",
  },
];

const PaymentsService = (props) => {
  const {
    dataProfile,
    dataUserRedirect,
    callGetTransactions,
    callGlobalActionApi,
    match,
    history,
  } = props;
  const [tabSelect, setTabSelect] = useState("1");
  const [dataPayment, setDataPayment] = useState({});
  const [isOkPayment, setIsOkPayment] = useState(null);
  const [amountTaxes, setAmountTaxes] = useState("$ 0.00 MXN");
  const [labelErrorPayment, setLabelErrorPayment] = useState("");

  const stripePromise = loadStripe(dataProfile.publicKeyStripe);
  const frontFunctions = new FrontFunctions();

  const handlerGetCatalogGWtransaction = async (data) => {
    const { idSystemUser, idLoginHistory, token, idContract } = dataProfile;
    const { params } = match;

    try {
      const responseInfo = await fetch(
        `${ENVIROMENT}${API_CONSTANTS.GET_CATALOG_AMOUNT_FOR_GW_TRANSACTION}`,
        {
          method: "POST",
          body: JSON.stringify({
            idOrderPayment: params.idOrderPayment,
            idSystemUser,
            idLoginHistory,
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (isNil(responseInfo.status) === false && responseInfo.status !== 200) {
        throw isNil(responseInfo.statusText) === false
          ? responseInfo.statusText
          : "";
      }
      const resultInfo = await responseInfo.json();
      setAmountTaxes(
        isEmpty(resultInfo) === false &&
          isEmpty(resultInfo.response) === false &&
          isEmpty(resultInfo.response.result) === false &&
          isNil(resultInfo.response.result.amountFormat) === false
          ? resultInfo.response.result.amountFormat
          : "$ 0.00 MXN"
      );
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerCallGetOrderPaymentById = async () => {
    const { idSystemUser, idLoginHistory, idCustomer } = dataProfile;
    const { params } = match;
    try {
      const response = await callGlobalActionApi(
        {
          idCustomer,
          idSystemUser,
          idLoginHistory,
          idOrderPayment: params.idOrderPayment,
        },
        null,
        API_CONSTANTS.CUSTOMER.GET_ORDER_PAYMENT_BY_ID
      );
      const responseResult =
        isEmpty(response) === false &&
        isNil(response.response) === false &&
        isNil(response.response[0]) === false &&
        isNil(response.response[0][0]) === false
          ? response.response[0][0]
          : {};
      setDataPayment(responseResult);
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        error,
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
    }
  };

  useEffect(() => {
    handlerCallGetOrderPaymentById();
    handlerGetCatalogGWtransaction();
  }, []);

  return (
    <Content>
      <ContentForm>
        {isNil(isOkPayment) === true &&
          isNil(dataPayment.isPaid) === false &&
          dataPayment.isPaid === false && (
            <>
              <div className="header-title">
                <h1>
                  {isNil(dataPayment.isPaid) === false &&
                  dataPayment.isPaid === false
                    ? "Elige un método de pago"
                    : "Proceso pagado"}
                </h1>
                {isNil(dataPayment.hfInvoice) === false && (
                  <div>
                    Folio: <strong>{dataPayment.hfInvoice}</strong>
                  </div>
                )}
              </div>
              <div className="info-payment-detail">
                {isNil(dataPayment.fullAddress) === false && (
                  <div>Propiedad: {dataPayment.fullAddress}</div>
                )}
                {isNil(dataPayment.orderPaymentConcept) === false && (
                  <div>Concepto: {dataPayment.orderPaymentConcept}</div>
                )}
              </div>
              <div className="section-payment-method">
                <TabsProperty>
                  {dataTabsPaymentMethod.map((row) => {
                    return (
                      <Tab
                        selected={tabSelect === row.id}
                        onClick={() => {
                          setTabSelect(row.id);
                        }}
                      >
                        <h1>
                          {row.text}{" "}
                          {row.id === "1" && <span>Sin comisión</span>}
                        </h1>
                        <hr />
                      </Tab>
                    );
                  })}
                </TabsProperty>
                <CardPaymentMethod>
                  <div className="header-card-payment">
                    <div className="amount-to-pay">
                      <strong>Monto a pagar</strong>{" "}
                      <span>
                        {tabSelect === "1"
                          ? dataPayment.formattedAmount
                          : amountTaxes}
                      </span>
                    </div>
                  </div>
                  <div className="card-body-payment">
                    {tabSelect === "1" && (
                      <SectionSpeiPayment dataPayment={dataPayment} />
                    )}
                    {tabSelect === "2" && (
                      <Elements
                        stripe={stripePromise}
                        options={ELEMENTS_OPTIONS}
                      >
                        <SectionCardPayment
                          dataPayment={dataPayment}
                          onOkPayment={(estatus, label) => {
                            setIsOkPayment(estatus);
                            setLabelErrorPayment(label);
                          }}
                        />
                      </Elements>
                    )}
                    {tabSelect === "3" && (
                      <Elements
                        stripe={stripePromise}
                        options={ELEMENTS_OPTIONS}
                      >
                        <SectionOxxoPayment dataPayment={dataPayment} />
                      </Elements>
                    )}
                  </div>
                </CardPaymentMethod>
              </div>
            </>
          )}
        {(isNil(isOkPayment) === false ||
          (isNil(dataPayment.isPaid) === false &&
            dataPayment.isPaid === true)) && (
          <PaidService>
            <h1>
              Pago <span>{isOkPayment === true ? "Exitoso" : "Fallido"}</span>
            </h1>
            <IconPaymentCheck />
            <h2>{isOkPayment === true ? "¡Felicidades!" : "¡Oh no!"}</h2>
            <span>
              {isOkPayment === true
                ? "Disfruta de los beneficios que Homify tiene para ti."
                : labelErrorPayment}
            </span>
            <div className="button-payment">
              <button
                onClick={() => {
                  if (isOkPayment === true) {
                    history.push(
                      isEmpty(dataUserRedirect) === false &&
                        isNil(dataUserRedirect.backPath) === false
                        ? dataUserRedirect.backPath
                        : dataProfile.path
                    );
                  } else {
                    setIsOkPayment(null);
                    setTabSelect("1");
                    setLabelErrorPayment("");
                  }
                }}
              >
                {isOkPayment === true
                  ? "Continuar"
                  : "Intentar otro método de pago"}
              </button>
            </div>
          </PaidService>
        )}
      </ContentForm>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataUserRedirect } = state;
  return {
    dataProfile: dataProfile.dataProfile,
    dataUserRedirect: dataUserRedirect.dataUserRedirect,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGetTransactions: (data) => dispatch(callGetTransactions(data)),
  callGlobalActionApi: (data, id, constant, method) =>
    dispatch(callGlobalActionApi(data, id, constant, method)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsService);
