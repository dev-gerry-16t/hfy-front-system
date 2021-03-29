import React, { useState } from "react";
import { Timeline, Button } from "antd";
import isEmpty from "lodash/isEmpty";
import SectionCardItemMessage from "./sectionCardItemMessage";
import MessagesIcon from "../../../assets/icons/MessagesIcon.svg";

const SectionMessages = (props) => {
  const { dataMessages, onSendMessages, getMoreCoincidences } = props;
  const [valueText, setValueText] = useState(null);

  return (
    <div className="main-content-tabs">
      <div className="content-messages-sections">
        <div className="section-history-messages">
          <Timeline>
            {isEmpty(dataMessages) === false &&
              dataMessages.map((row) => {
                return (
                  <SectionCardItemMessage
                    dataInfo={row}
                    sendResponseMessage={(data) => {
                      onSendMessages(data);
                    }}
                  />
                );
              })}
          </Timeline>
          {isEmpty(dataMessages) === true && (
            <div className="empty-screen-make">
              <div className="info-screen-make" style={{ marginTop: 10 }}>
                <img src={MessagesIcon} height={62} alt="sin_mensajes" />
                <label>Aún no hay mensajes</label>
              </div>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {isEmpty(dataMessages) === false && (
              <Button
                type="link"
                onClick={() => {
                  getMoreCoincidences();
                }}
              >
                Mostrar mas
              </Button>
            )}
          </div>
        </div>
        <div className="section-type-messages-fixed">
          <div className="section-type-messages">
            <div className="text-header">Redactar mensaje</div>
            <textarea
              value={valueText}
              maxlength="200"
              onChange={(e) => {
                setValueText(e.target.value);
              }}
            />
          </div>
          <div className="button_init_primary">
            <button
              type="button"
              onClick={() => {
                onSendMessages({
                  visibilityRule: null,
                  idCustomerMessages: null,
                  customerMessages: valueText,
                });
              }}
            >
              <span>Enviar mensaje</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionMessages;
