import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styled from "styled-components";
import { Layout, Table, message } from "antd";
import isNil from "lodash/isNil";
import GLOBAL_CONSTANTS from "../../utils/constants/globalConstants";
import { callGetTransactions } from "../../utils/actions/actions";
import {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
} from "./constants/styleConstants";
import SectionSpeiPayment from "./sections/sectionSpeiPayment";
import SectionCardPayment from "./sections/sectionCardPayment";
import SectionOxxoPayment from "./sections/sectionOxxoPayment";

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
      span {
        border: 1px solid var(--color-primary);
        padding: 0.5em;
        border-radius: 7px;
        font-weight: 600;
        color: var(--color-primary);
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
  const { dataProfile, callGetTransactions } = props;
  const [tabSelect, setTabSelect] = useState("1");
  const stripePromise = loadStripe(dataProfile.publicKeyStripe);

  return (
    <Content>
      <ContentForm>
        <div className="header-title">
          <h1>Elige un método de pago</h1>
        </div>
        <div className="section-payment-method">
          <h2></h2>
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
                    {row.text} {row.id === "1" && <span>Sin comisión</span>}
                  </h1>
                  <hr />
                </Tab>
              );
            })}
          </TabsProperty>
          <CardPaymentMethod>
            <div className="header-card-payment">
              <div className="amount-to-pay">
                <strong>Monto a pagar</strong> <span>$3,450.00 MXN</span>
              </div>
            </div>
            <div className="card-body-payment">
              {tabSelect === "1" && <SectionSpeiPayment />}
              {tabSelect === "2" && (
                <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                  <SectionCardPayment />
                </Elements>
              )}
              {tabSelect === "3" && (
                <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
                  <SectionOxxoPayment />
                </Elements>
              )}
            </div>
          </CardPaymentMethod>
        </div>
      </ContentForm>
    </Content>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callGetTransactions: (data) => dispatch(callGetTransactions(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsService);
