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
        <div className="section-type-messages">
          <div>Redactar mensaje</div>
          <TextArea />
        </div>
      </div>
    </div>
  );
};

export default SectionMessages;
