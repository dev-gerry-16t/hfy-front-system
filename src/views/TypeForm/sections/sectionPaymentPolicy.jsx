import React from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CustomCheckPayment from "./customCheckPayment";

const stripePromise = loadStripe(
  "pk_test_51IiP07KoHiI0GYNakthTieQzxatON67UI2LJ6UNdw8TM2ljs9lHMXuw5a6E2gWoHARTMdH9X4KiMZPdosbPyqscq00dAVe9bPd"
);

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Poppins",
    },
  ],
};

const SectionPaymentPolicy = ({
  callPostPaymentServices,
  dataFormSave,
  onRedirect,
  totalPolicy,
  dataProfile,
}) => {
  return (
    <div className="content-typeform-formulary">
      <h3>Pago en linea de Póliza Jurídica</h3>
      <Row>
        <Col span={9} xs={{ span: 24 }} md={{ span: 9 }} />
        <Col span={6} xs={{ span: 24 }} md={{ span: 6 }}>
          <div className="banner-move-tenant">
            <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
              <div
                className="checkout-payment-hfy"
                style={{ background: "#fff", fontFamily: "Poppins" }}
              >
                <CustomCheckPayment
                  callPostPaymentServices={callPostPaymentServices}
                  dataProfile={dataProfile}
                  totalPolicy={totalPolicy}
                  onRedirect={onRedirect}
                  idOrderPayment={dataFormSave.idOrderPayment}
                />
              </div>
            </Elements>
          </div>
        </Col>
        <Col span={9} xs={{ span: 24 }} md={{ span: 9 }} />
      </Row>
    </div>
  );
};

export default SectionPaymentPolicy;
