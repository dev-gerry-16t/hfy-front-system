import React, { useState } from "react";
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
  } = props;
  const [isVisibleComments, setIsVisibleComments] = useState(false);
  let component = <></>;
  if (
    isVisiblePayment === true &&
    isNil(dataIncidenceDetail.isPaymentAccepted) === true
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
                  maxlength="150"
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
    dataIncidenceDetail.isPaymentAccepted === true
  ) {
    component = (
      <div className="card-information">
        <div className="tag-card"></div>
        En unos momentos te asignaremos tu servicio solicitado
      </div>
    );
  }
  return component;
};

export default WidgetPaymentAccept;
