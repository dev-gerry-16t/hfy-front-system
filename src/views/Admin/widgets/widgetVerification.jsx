import React from "react";
import styled from "styled-components";

const CardVerification = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  background: #fff;
  height: 100%;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  h1 {
    margin-top: 0.3em;
    margin-bottom: 0px;
    text-align: center;
    font-weight: 700;
  }
`;

const WidgetVerification = () => {
  return (
    <CardVerification>
      <h1>Verificación</h1>
    </CardVerification>
  );
};

export default WidgetVerification;
