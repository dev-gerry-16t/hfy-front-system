import React from "react";
import styled from "styled-components";

const CardDocuments = styled.div`
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

const CardInfoDocuments = styled.div`
  overflow-y: scroll;
  max-height: 30em;
  padding: 1em;
  .info-document {
    display: grid;
    grid-template-columns: auto 1fr;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 6px 0px,
      rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    border-radius: 1em;
    margin-bottom: 1em;
    div {
      padding: 0.5em;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        font-weight: 500;
      }
    }
  }
`;

const Document = () => {
  return (
    <div className="info-document">
      <div>
        <img
          src="https://enbici.life/wp-content/themes/fox/images/placeholder.jpg"
          alt=""
          width="50"
        />
      </div>
      <div>
        <span>Identificación Frontal</span>
      </div>
    </div>
  );
};

const WidgetDocuments = () => {
  return (
    <CardDocuments>
      <h1>Documentos</h1>
      <CardInfoDocuments>
        <Document />
        <Document />
        <Document />
        <Document />
        <Document />
        <Document />
      </CardInfoDocuments>
    </CardDocuments>
  );
};

export default WidgetDocuments;
