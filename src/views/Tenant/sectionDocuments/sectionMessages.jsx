import React from "react";
import { Timeline } from "antd";
import IconMessages from "../../../assets/icons/chaticon.svg";

const { Item } = Timeline;

const SectionMessages = () => {
  return (
    <div className="main-content-tabs">
      <div className="content-messages-sections">
        <div>
          <Timeline>
            <Item>
              <div className="item-messages">
                <div>
                  <div
                    className="elipse-icon"
                    style={{ backgroundColor: "#FF0282" }}
                  >
                    <img src={IconMessages} alt="icon" width="20px"></img>
                  </div>
                  <div>
                    <strong>Patricia Ramirez</strong>
                    <span>Viernes, 4:18 pm</span>
                  </div>
                </div>
                <div>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Molestie luctus tempor mauris vitae rhoncus, faucibus integer.
                  Diam quis vivamus ut odio aliquam erat odio non. Lacinia
                  tellus risus pretium ut in porttitor nunc. Amet massa ac
                  semper in venenatis vulputate.
                </div>
              </div>
            </Item>
            <Item>
              <div>Data</div>
            </Item>
          </Timeline>
        </div>
        <div>2</div>
      </div>
    </div>
  );
};

export default SectionMessages;
