import React, { useState } from "react";
import moment from "moment";
import "moment/locale/es";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

const WidgetPaymentAccept = (props) => {
  const {
    dataIncidenceDetail,
    isVisiblePayment,
    valueTextArea,
    onChangeTextArea,
    onClickSendMessage,
    onClickAcceptPayment,
    onClickAcceptService,
    onClickSendMessageService,
  } = props;
  const [isVisibleComments, setIsVisibleComments] = useState(false);
  let component = <></>;
  if (
    isVisiblePayment === true &&
    isNil(dataIncidenceDetail.isPaymentAccepted) === true &&
    dataIncidenceDetail.requieresConfirmation === false &&
    isNil(dataIncidenceDetail.confirmProvider) === true
  ) {
    component = (
      <div className="card-information">
        <div className="tag-card"></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3>
            {dataIncidenceDetail.hasProvider === true
              ? "Tu incidencia ha generado un servicio con un cargo de"
              : "Tu incidencia ha generado un cargo de"}
          </h3>
          <strong style={{ fontSize: 18, margin: "10px 0px" }}>
            {dataIncidenceDetail.amountFormat}
          </strong>
          {isVisibleComments === false ? (
            <>
              <span style={{ margin: "10px 0px" }}>¿Aceptas el cargo?</span>
              <div className="two-action-buttons-banner">
                <button
                  type="button"
                  onClick={() => {
                    setIsVisibleComments(true);
                  }}
                >
                  <span>Rechazar</span>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      onClickAcceptPayment(true);
                    } catch (error) {}
                  }}
                >
                  <span>Aceptar</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div
                className="section-message"
                style={{ width: "100%", marginBottom: 10 }}
              >
                <textarea
                  placeholder="Ingresa tus motivos"
                  className="text-comment-dialog"
                  value={valueTextArea}
                  onChange={(e) => {
                    onChangeTextArea(e.target.value);
                  }}
                />
                <button type="button" onClick={onClickSendMessage}>
                  <i className="fa fa-send" />
                </button>
              </div>
              <div className="two-action-buttons-banner">
                <button
                  type="button"
                  onClick={() => {
                    setIsVisibleComments(false);
                  }}
                >
                  <span>Regresar</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  } else if (
    isVisiblePayment === true &&
    isNil(dataIncidenceDetail.isPaymentAccepted) === false &&
    dataIncidenceDetail.isPaymentAccepted === true &&
    dataIncidenceDetail.requieresConfirmation === false &&
    isNil(dataIncidenceDetail.confirmProvider) === true
  ) {
    component = (
      <div className="card-information">
        <div className="tag-card"></div>
        <div style={{ marginTop: 10 }}>
          <h3>
            {dataIncidenceDetail.hasProvider === true
              ? "¡Excelente!, en un momento asignaremos tu servicio solicitado."
              : "En un momento nos estaremos comunicando contigo."}
          </h3>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://homify-docs-users.s3.us-east-2.amazonaws.com/homify-wait.png"
              width="100"
              alt="Espera por favor"
            />
          </div>
        </div>
      </div>
    );
  } else if (
    isVisiblePayment === true &&
    isNil(dataIncidenceDetail.isPaymentAccepted) === false &&
    dataIncidenceDetail.isPaymentAccepted === true &&
    dataIncidenceDetail.requieresConfirmation === true &&
    isNil(dataIncidenceDetail.confirmProvider) === true
  ) {
    component = (
      <div className="card-information">
        <div className="tag-card"></div>
        <div style={{ marginTop: 10 }}>
          <h3>Se te asigno el siguiente servicio.</h3>
          <strong>{dataIncidenceDetail.provider}</strong>
          <br />
          <span>
            Fecha y hora:
            <br />
            <strong>
              {moment(
                dataIncidenceDetail.scheduleDate,
                "YYYY-MM-DDTHH:mm:ss"
              ).format("DD MMMM YYYY HH:mm")}{" "}
              hrs.
            </strong>
          </span>
          <br />
          {isVisibleComments === false ? (
            <div
              style={{
                marginTop: 10,
                textAlign: "center",
              }}
            >
              <span style={{ marginBottom: 10 }}>¿Aceptas el servicio?</span>
              <div
                className="two-action-buttons-banner"
                style={{ marginTop: 10 }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setIsVisibleComments(true);
                  }}
                >
                  <span>No</span>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      onClickAcceptService(true);
                    } catch (error) {}
                  }}
                >
                  <span>Aceptar</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <div
                className="section-message"
                style={{ width: "100%", marginBottom: 10 }}
              >
                <textarea
                  placeholder="Ingresa tus motivos"
                  className="text-comment-dialog"
                  value={valueTextArea}
                  onChange={(e) => {
                    onChangeTextArea(e.target.value);
                  }}
                />
                <button type="button" onClick={onClickSendMessageService}>
                  <i className="fa fa-send" />
                </button>
              </div>
              <div className="two-action-buttons-banner">
                <button
                  type="button"
                  onClick={() => {
                    setIsVisibleComments(false);
                  }}
                >
                  <span>Regresar</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  } else if (dataIncidenceDetail.confirmProvider === true) {
    component = (
      <div className="card-information">
        <div className="tag-card"></div>
        <div style={{ marginTop: 10 }}>
          <h3>Pronto nuestro proveedor de servicio estará en tu casa.</h3>
          <strong>{dataIncidenceDetail.provider}</strong>
          <br />
          <span>
            Fecha y hora:
            <br />
            <strong>
              {moment(
                dataIncidenceDetail.scheduleDate,
                "YYYY-MM-DDTHH:mm:ss"
              ).format("DD MMMM YYYY HH:mm")}{" "}
              hrs.
            </strong>
          </span>
        </div>
      </div>
    );
  }
  return component;
};

export default WidgetPaymentAccept;
