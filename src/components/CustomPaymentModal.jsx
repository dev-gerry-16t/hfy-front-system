import React, { useState, useEffect } from "react";
import {
  Elements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Modal, Input, Row, Col, Select, Spin, Tooltip, Radio } from "antd";
import { SyncOutlined, CloseOutlined } from "@ant-design/icons";
import Arrow from "../assets/icons/Arrow.svg";

const { Option } = Select;

const stripePromise = loadStripe(
  "pk_test_51IiP07KoHiI0GYNakthTieQzxatON67UI2LJ6UNdw8TM2ljs9lHMXuw5a6E2gWoHARTMdH9X4KiMZPdosbPyqscq00dAVe9bPd"
);

const MyCustomCheck = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="FormGroup"></fieldset>
      <fieldset className="FormGroup">
        <CardElement />
      </fieldset>
      <button type="submit" disabled={!stripe}>
        Realizar pago
      </button>
    </form>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Poppins",
    },
  ],
};

const CustomPaymentModal = (props) => {
  const { isModalVisible, onClose, spinVisible } = props;

  const LoadingSpin = <SyncOutlined spin />;
  return (
    <Modal
      style={{ top: 20 }}
      visible={isModalVisible}
      closable={false}
      footer={false}
    >
      <Spin indicator={LoadingSpin} spinning={spinVisible} delay={200}>
        <div className="form-modal">
          <div className="title-head-modal">
            <button
              className="arrow-back-to"
              type="button"
              onClick={() => {
                onClose();
              }}
            >
              <img src={Arrow} alt="backTo" width="30" />
            </button>
            <h1>Realizar Pago</h1>
          </div>
          <div className="main-form-information">
            <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
              <MyCustomCheck />
            </Elements>
          </div>
        </div>
      </Spin>
    </Modal>
  );
};

export default CustomPaymentModal;
