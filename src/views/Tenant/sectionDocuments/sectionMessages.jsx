import React from "react";
import { Timeline, Input } from "antd";
import SectionCardItemMessage from "./sectionCardItemMessage";

const { TextArea } = Input;

const SectionMessages = () => {
  return (
    <div className="main-content-tabs">
      <div className="content-messages-sections">
        <div className="section-history-messages">
          <Timeline>
            <SectionCardItemMessage />
            <SectionCardItemMessage />
          </Timeline>
        </div>
        <div className="section-type-messages-fixed">
          <div className="section-type-messages">
            <div className="text-header">Redactar mensaje</div>
            <textarea maxlength="200" />
          </div>
          <div className="button_init_primary">
            <button type="button" onClick={() => {}}>
              <span>Enviar mensaje</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionMessages;
