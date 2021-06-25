import React from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import { Row, Col } from "antd";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CustomCheckPayment from "./customCheckPayment";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";

const stripePromise = loadStripe(GLOBAL_CONSTANTS.PUBLIC_STRIPE_KEY);

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
      <h3>Pago en línea de Póliza Jurídica</h3>
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