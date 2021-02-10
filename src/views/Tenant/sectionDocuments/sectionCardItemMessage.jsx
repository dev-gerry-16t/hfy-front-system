import React, { useState } from "react";
import { Timeline } from "antd";
import IconMessages from "../../../assets/icons/chaticon.svg";
import Send from "../../../assets/icons/Send.svg";

const { Item } = Timeline;

const SectionCardItemMessage = (props) => {
  const { dataInfo, sendResponseMessage } = props;
  const [valueText, setValueText] = useState(null);

  return (
    <Item>
      <div className="item-messages">
        <div className="item-message-1">
          <div className="elipse-icon" style={{ backgroundColor: "var(--color-primary)" }}>
            <img src={IconMessages} alt="icon" width="20px"></img>
          </div>
          <div className="message-name-send">
            <strong>{dataInfo.sentByUser}</strong>
            <span style={{ fontSize: "12px" }}>Inquilino</span>
            <span>{dataInfo.sentAt}</span>
          </div>
        </div>
        <div className="item-message-2">{dataInfo.customerMessage}</div>
        <div
          className="response-message-item"
          style={{
            flexDirection: dataInfo.canReply === true ? "row" : "column",
            marginLeft: dataInfo.canReply === true ? "0px" : "10px",
          }}
        >
          {dataInfo.canReply === true ? (
            <>
              <textarea
                placeholder="Responder"
                value={valueText}
                maxlength="150"
                onChange={(e) => {
                  setValueText(e.target.value);
                }}
              />
              <button
                type="button"
                style={{ backgroundColor: "transparent", border: "none" }}
                onClick={() => {
                  sendResponseMessage({
                    visibilityRule: null,
                    idCustomerMessages: dataInfo.idCustomerMessage,
                    customerMessages: valueText,
                  });
                }}
              >
                <img src={Send} alt="search" />
              </button>
            </>
          ) : (
            <>
              <div
                className="item-message-1"
                style={{
                  flexDirection: "column",
                }}
              >
                <strong>{dataInfo.sentByUserParent}</strong>
                <span style={{ fontSize: "12px" }}>Inquilino</span>
                <span>{dataInfo.sentAtParent}</span>
              </div>
              <div
                className="item-message-2"
                style={{
                  marginTop: "10px",
                }}
              >
                {dataInfo.customerMessageParent}
              </div>
            </>
          )}
        </div>
      </div>
    </Item>
  );
};

export default SectionCardItemMessage;
