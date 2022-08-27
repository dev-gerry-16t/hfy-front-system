import React, { useState, useEffect } from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { GeneralCard } from "../constants/styles";
import ComponentLoadSection from "../../../components/componentLoadSection";
import CustomPaymentMessage from "../../../components/customPaymentMessage";

const InfoPayment = styled.div`
  .title-concept {
    font-weight: 700;
    font-size: 1.5em;
    text-align: center;
  }
  .header-card-payment {
    display: flex;
    justify-content: center;
    padding: 2em 0px;
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
      @media screen and (max-width: 320px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .inclusive-payment {
    border: 1px solid #4e4b66;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 1em;
    .inclusive-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
`;

const SectionPaymentInfo = ({ dataInfoPayment, onUpdateInfo }) => {
  const [isLoadApi, setIsLoadApi] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlerOnClickPayment = async () => {
    let channel = null;
    setIsLoadApi(true);
    const channelName = "payment_users_contract";
    try {
      channel = new BroadcastChannel(channelName);
      channel.onmessage = (message) => {
        if (message.data === "close_payment_contract") {
          clearInterval(intervalWindow);
          openPayment.close();
          setTimeout(() => {
            setIsLoadApi(false);
          }, 1500);
        }
        if (message.data === "payment_succesed") {
          clearInterval(intervalWindow);
          openPayment.close();
          setPaymentSuccess(true);
          setTimeout(() => {
            setIsLoadApi(false);
            onUpdateInfo();
          }, 3000);
        }
      };
    } catch (error) {}

    const openPayment = window.open(
      `/websystem/payment-service/${dataInfoPayment.idOrderPayment}`,
      "targetWindow",
      `scrollbars=yes,
        resizable=yes,
        width=360,
        height=900`
    );

    let intervalWindow = setInterval(() => {
      if (openPayment.closed === true) {
        setIsLoadApi(false);
        if (isNil(channel) === false) {
          channel.close();
        }
        clearInterval(intervalWindow);
      }
    }, 2000);
  };

  const handlerShowInclusive = (arrayString) => {
    const arrayParse =
      isEmpty(arrayString) === false ? JSON.parse(arrayString) : [];
    return arrayParse.map((row) => {
      return (
        <div className="inclusive-info">
          <span>{row.label}</span>
          <strong>{row.text}</strong>
        </div>
      );
    });
  };

  return (
    <GeneralCard>
      <CustomPaymentMessage
        onClose={() => {
          setPaymentSuccess(false);
        }}
        visibleOnboard={paymentSuccess}
      />
      <ComponentLoadSection
        isLoadApi={isLoadApi}
        text="Realizando Pago"
        position="absolute"
      >
        <div className="header-title">
          <h1>Información de pago</h1>
        </div>
        <div className="content-cards">
          <InfoPayment>
            <h1 className="title-concept">
              {dataInfoPayment.orderPaymentConcept}
            </h1>
            <div className="header-card-payment">
              <div className="amount-to-pay">
                <strong>Monto a pagar</strong>{" "}
                <span>{dataInfoPayment.amountFormatted}</span>
              </div>
            </div>
            <div className="inclusive-payment">
              <h3
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                Incluye
              </h3>
              {handlerShowInclusive(dataInfoPayment.serviceDescription)}
            </div>
          </InfoPayment>
          <div className="button-payment">
            <button onClick={handlerOnClickPayment}>Realizar pago</button>
          </div>
        </div>
      </ComponentLoadSection>
    </GeneralCard>
  );
};

export default SectionPaymentInfo;
