import React from "react";
import { Timeline } from "antd";
import IconMessages from "../../../assets/icons/chaticon.svg";

const { Item } = Timeline;

const SectionCardItemMessage = () => {
  return (
    <Item>
      <div className="item-messages">
        <div className="item-message-1">
          <div className="elipse-icon" style={{ backgroundColor: "#FF0282" }}>
            <img src={IconMessages} alt="icon" width="20px"></img>
          </div>
          <div className="message-name-send">
            <strong>Patricia Ramirez</strong>
            <span style={{ fontSize: "12px" }}>Inquilino</span>
            <span>Viernes, 4:18 pm</span>
          </div>
        </div>
        <div className="item-message-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie
          luctus tempor mauris vitae rhoncus, faucibus integer. Diam quis.
        </div>
        <div className="response-message-item">
          <textarea placeholder="Responder" maxlength="150" />
        </div>
      </div>
    </Item>
  );
};

export default SectionCardItemMessage;
