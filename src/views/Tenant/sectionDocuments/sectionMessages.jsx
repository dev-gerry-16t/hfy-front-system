import React, { useState } from "react";
import { Timeline, Input, Button } from "antd";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";
import SectionCardItemMessage from "./sectionCardItemMessage";

const { TextArea } = Input;

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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              type="link"
              onClick={() => {
                getMoreCoincidences();
              }}
            >
              Mostrar mas
            </Button>
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
