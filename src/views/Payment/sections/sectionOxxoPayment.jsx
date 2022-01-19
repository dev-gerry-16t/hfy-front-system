import React, { useEffect, useState } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import styled from "styled-components";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Layout, Table, message } from "antd";
import isNil from "lodash/isNil";
import GLOBAL_CONSTANTS from "../../../utils/constants/globalConstants";
import FrontFunctions from "../../../utils/actions/frontFunctions";
import { callPostPaymentService } from "../../../utils/actions/actions";
import { Payment } from "../constants/styleConstants";
import ComponentLoadSection from "../../../components/componentLoadSection";
import CustomInputTypeForm from "../../../components/CustomInputTypeForm";

const CardPayment = styled.div`
  min-width: 400px;
  .data-card {
    padding: 5px 6px;
    border-radius: 5px;
    border: 1px solid #d6d8e7;
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
  @media screen and (max-width: 640px) {
    width: 100%;
    min-width: auto;
  }
`;

const PaymentPoster = styled.div`
  display: flex;
  justify-content: center;
  h1 {
    font-weight: 700;
  }
`;

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#6b7c93",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Poppins,Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "rgba(0, 0, 0, 0.2)",
        fontWeight: "600",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const iconOxxo =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEEAAAAjCAYAAADLy2cUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAgcSURBVHgB7VlrdFTVFd53ZpJh8iSEGJQFJYFCa4IPpC0CRZuoyIKyILQKiSwihgo08iYiBBR5tNosC7qgYpdiBbq0REOhvORhpYCFYG0DlCCBBAmZyeQx7/e9d3vuvcm5c3LDZPAXEr61Zs05Z++z73f2PWfvfWYA7uAOJHDhHefuxN4m0BUBco8TiRFuM5DFhlDEk35R2JiY57aGjStABI7fnXySDI2A2xwIeKqJi8vpO9Hslfq6doGwJ2Vad3CABA64n6VDYEJ730AFaY/kAOihu4A44scA5XKbOkE3oqIHdC9w7dGAOsE5fSGIHh/cykgsWw76zP7MWPDA5+Cv+BTE5hbpsEcPRBoKqBN8uw4Dut1wqyJ52x8ZB/DnLoJj5osQqvwffBeQPECTgq4rZf2AvhBfWgy9zx2EdF819BFrId1zAXqdqgBT0VTgEuM7TNBD8vYNkO6vhvgVxRFtxy8qgrsslZD07mug62gnDAlrFoPpmUm0H6qsAtuThbIDdHelQvzyuZD61T5I914g/K7I/FIrd0Pc7HzgkhMhalgSsrebYQCGfxxzSlFwuTES+Lp6tE3+DZ3TPPrXjNw+axl2tCt9WnPzUQwEqZ7t6eJO9VpyCxAFQX1eTR1aM34uy+wzl6Jgd0bmd/U62qcv1NhtgIw1XTrBXfYORgvRH0DH3JXyvMbUB1FobFZlLg9aM8cwBKz9R6LQYFV13B5sznpCQ7Rp0KOsLa8PW8Y8pfBbvxmjRjCIjoVrbs4JzkVrNXYCx06ho/hltE17AZ3LXkf+61rWEWQhLTn58nzprYYjVHMVLQn3KgT0mRj412lG7phdqiz6h49SkpakbAyeqWL0bPnz23ZAiXadlVXonPeKwo/w5y/UsPyIA1ufnBGdExrv/gnjfcFsRXvBfO1W1WWia+Ub7GLPX0RLzCDlTf1hCyPzle9Xxje+x4x739upHKOH88jDRGwZNaVNbyuj59myQ9lpacNQqDeri3N70UGOhYYfl4HOkt8zNvhLdWgxDunaCa5V7MLshUs6PavtH9fyMka/tW03SB//oeOMzL/nCOu0/9dgY/y9aB0wCvlvGhSnkxfgKmVthshbbXeus2Q9I3PcIObQXb14HaNvy5+ncYImOxjHPkLboRNfgu/9cogE79vbAL1+2o/NG0vbzsIlINTVq7Yn5NC2aG4E++TnSW3iBUPWEND3u1shRKK9lA1UPSu05hYAhnjF/i9GqvxIlvD++UOIyO+dv4Jw5ZrKIWekRod1AkmdhoeyaNf/j8PQFcRWBwT2qHqxw7JpW7huAXv+PMBAQDPPOXcV8Bcvy+3Avs/A90GFRgd9fnDMegnEhkY6pu9/D20Hj5yAroAuDwQ/+4L2Yx7I0ugwTuBiY4Azqjdo4RszRAPhmiXMRiwjC1WeBf78JVb/61rw//1QGFME16I1IFqaGD3/zr0Q2Hs0jK2OqUtEazNExc9sVTsxBo2ccQIGQ8xbM2T2g2hgGKjqSds7HPGLn4OYsN0hQT84A5K3rIOwog3i5j8Luj5pjF6PKeMgZvh96oAoAvqDtMulpUJU/MIqTXR7NHL2OJA3wn/xlUpi0ljgDFrPMQZSe0JsrnrO+DNVtG18bDQkrl3K2G+HadY0iB3zU6WdPxESXpqjsc3Fx0HPv70lx4l2CBcuq/wm5DI7tzNwSYkQM3o47YfC5tM1dBzwl++jbcND2WB6fhpEQsLLC+QH0fk7lfm69N5yOQwG5Xou7TLbL8mPVq12uR88dhr4qmpSlveDhPUlRE9xthQAfX/5mNrTZ/SHpE2v0n5g7xGV39AhYJpTEJnfit8ycSSwO0Kco3VCrweYOgFDIXSuKEOzYWCHOiEDPZs+YNJP4OhJOT+bSToLnjnLyJwlv1PK5XGFKDhcaP3BKNlm6Gx1pynPv/coM+569U2liErMRuFaAytbvREthkGaOsGz4V2W34kzpFgbGF3FKNXa4XW9BP5qPXpIASMthqQdFJtaGblUkTX96DGl0Fm3iZGRNKs4p82+VFpL357N21i9bZ+oOj3vl+8l6gNE+R4hV6TjZ5Ln+Vl+1y3oeet9hd/bO1BsbEHWA0Fsvm/czd0dJGNiMIRRgei1Pv6M4sBnlzKi0PlLpEobrClibHmzWRP//DdaegxhdJqHTUASaKmOVCk2ptyv8FuwmtxZ/NHx4wW0T33hhneHG16lPa9vAcf0BUyx0xmk62zLw3kQOHScxJChkPRGKZWhzQG2iSQOBIKaeVxKEm2L9WawF71IIj9bT4T+cw5cS9bTvq5vHxJrlCDp2bAVHFPngVB7LRI94L88J/PzfbjnhjoRQ7//I5KnDxwD4/gcMM2YAjFDB5M6wAiiyw2hU/+Vg6j/k4Ny6jKQtJeycxNwPdsWRzKBo3gVCJevdm774wMQQ5wWO2o4kIsPCDWd63n/tB10vVMgrngGeN/cCnz1FdXGrk8hsP9zME5+AkwFk8DwYBboehjlNBgkL8dfvh8ChCO5k0Ak0EQtHQfyy1LkUNupBQ5Mhb+CxNeWgS6tFx12l5YBiQ1wq4L8srT2HqhdKbXpTjA9NY540Bu9lbgecnET99zToB80gBEFDx8H4VIdsTkeblWQP2EQyjfL7bA/X3A7+br5nfD9xWqO416RGnQnCKcLfcDbobsAdRwtX6kT9I27DvHIFUE3Afnz5WJ7W02RZkcFB3gQugM4OK6faPtI7YYB9/VK4gPiQtDhCBI9Y+E2A3n7XgHhgBFxBzfZ3n3O/h1EiW8BC1bHHR1prYkAAAAASUVORK5CYII=";

const CardField = ({ onChange }) => (
  <div className="data-card">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const SectionOxxoPayment = (props) => {
  const { dataProfile, callPostPaymentService, dataPayment, onClickContinue } =
    props;
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [labelErrors, setLabelErrors] = useState("");
  const [paymentCancel, setPaymentCancel] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [dataForm, setDataForm] = useState({ email: "", name: "" });

  const frontFunctions = new FrontFunctions();

  const hanlderCallPostPaymentService = async (data, orderPayment) => {
    const { idSystemUser, idLoginHistory, idContract } = dataProfile;
    try {
      const response = await callPostPaymentService({
        ...data,
        idOrderPayment: orderPayment,
        idSystemUser,
        idLoginHistory,
      });
      const responseResult = response.response.result;
      return responseResult;
    } catch (error) {
      frontFunctions.showMessageStatusApi(
        isNil(error) === false
          ? error
          : "Error en el sistema, no se pudo ejecutar la petición",
        GLOBAL_CONSTANTS.STATUS_API.ERROR
      );
      throw error;
    }
  };

  const handlerOnSendInfoPayment = async (orderPayment) => {
    setProcessing(true);
    if (!stripe || !elements) {
      return;
    }
    try {
      const response = await hanlderCallPostPaymentService(
        {
          payment_method: null,
          payment_method_types: ["oxxo"],
        },
        orderPayment
      );
      const resultOxxo = await stripe.confirmOxxoPayment(
        response.idClientSecret,
        {
          payment_method: {
            billing_details: {
              name: dataForm.name,
              email: dataForm.email,
            },
          },
        }
      );
      if (resultOxxo.error) {
        setPaymentCancel(true);
        setLabelErrors(resultOxxo.error.message);
        frontFunctions.showMessageStatusApi(
          resultOxxo.error.message,
          GLOBAL_CONSTANTS.STATUS_API.ERROR
        );
      } else {
        setPaymentMethods(true);
      }
      setProcessing(false);
      // setTimeout(() => {
      //   onRedirect();
      // }, 5000);
    } catch (error) {
      setProcessing(false);
      setLabelErrors(
        "Tu banco rechazó la transacción, prueba con otra tarjeta o ponte en contacto con nosotros para saber otras alternativas de pago"
      );
      setPaymentCancel(true);
    }
  };

  return (
    <ComponentLoadSection
      isLoadApi={processing}
      position="absolute"
      text="Procesando..."
    >
      <Payment>
        <div className="icon-method">
          <img src={iconOxxo} alt="icon-homify" width="45px" />
          <h1>Pago con OXXO</h1>
        </div>
        <CardPayment>
          {paymentMethods === true && (
            <>
              <PaymentPoster>
                <h1>¡Esperamos pronto tu pago!</h1>
              </PaymentPoster>
              <div className="button-payment">
                <button
                  onClick={() => {
                    onClickContinue();
                  }}
                >
                  Continuar
                </button>
              </div>
            </>
          )}
          {paymentMethods !== true && (
            <>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={dataForm.name}
                    placeholder="Nombre completo *"
                    label=""
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({ ...dataForm, name: value });
                    }}
                    type="text"
                  />
                </Col>
              </Row>
              <Row>
                <Col span={24} xs={{ span: 24 }} md={{ span: 24 }}>
                  <CustomInputTypeForm
                    value={dataForm.email}
                    placeholder="Correo *"
                    label=""
                    error={false}
                    errorMessage="Este campo es requerido"
                    onChange={(value) => {
                      setDataForm({ ...dataForm, email: value });
                    }}
                    type="email"
                  />
                </Col>
              </Row>
              <div className="button-payment">
                <button
                  onClick={() => {
                    handlerOnSendInfoPayment(dataPayment.idOrderPayment);
                  }}
                >
                  Pagar con OXXO
                </button>
              </div>
            </>
          )}
        </CardPayment>
      </Payment>
    </ComponentLoadSection>
  );
};

const mapStateToProps = (state) => {
  const { dataProfile, dataProfileMenu } = state;
  return {
    dataProfile: dataProfile.dataProfile,
  };
};

const mapDispatchToProps = (dispatch) => ({
  callPostPaymentService: (data) => dispatch(callPostPaymentService(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionOxxoPayment);
