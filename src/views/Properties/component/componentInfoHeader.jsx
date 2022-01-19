import React, { useState } from "react";
import styled from "styled-components";

const MessageTop = styled.div`
  position: relative;
  max-height: ${(props) => (props.visible === true ? "500px" : "0px")};
  overflow: hidden;
  background: #f7f7fc;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15);
  color: rgba(78, 75, 102, 1);
  transition: all 0.4s ease-out;
  .text-props {
    padding: 10px 25px 10px 10px;
    font-weight: 500;
    font-size: 12px;
  }
  .btn-close {
    position: absolute;
    right: 5px;
    top: 5px;
    button {
      font-weight: 800;
      font-size: 16px;
      background: transparent;
      border: none;
    }
  }
`;

const ComponentInfoHeader = ({ text }) => {
  const [visible, setVisible] = useState(true);
  return (
    <MessageTop visible={visible}>
      <div className="text-props"><strong>Nota: </strong>{text}</div>
      <div className="btn-close">
        <button
          onClick={() => {
            setVisible(!visible);
          }}
        >
          X
        </button>
      </div>
    </MessageTop>
  );
};

export default ComponentInfoHeader;
