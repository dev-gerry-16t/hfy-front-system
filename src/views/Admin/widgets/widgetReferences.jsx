import React from "react";
import styled from "styled-components";

const CardReferences = styled.div`
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

const CardInformation = styled.div`
  display: flex;
  min-width: 18em;
  flex-direction: column;
  padding: 0.7em 1em;
  border-radius: 1em;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

const SectionCardInfoReference = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 0.8em;
  flex-wrap: nowrap;
  align-items: center;
  max-width: 100%;
  overflow-x: scroll;
  .top-card-info {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    .score-reference {
      div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #1ce3ff;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .type-user-reference {
      font-weight: 500;
      text-align: center;
    }
  }
  .middle-card-info {
    margin-top: 0.8em;
    display: flex;
    flex-direction: column;
    i {
      font-weight: bold;
      margin-right: 0.7em;
    }
  }
  .bottom-card-info {
    margin-top: 1em;
    display: flex;
    justify-content: center;
    button {
      background: var(--color-primary);
      border: none;
      color: #fff;
      padding: 0.3em 1em;
      border-radius: 1em;
    }
  }
`;

const Card = (props) => {
  const {
    fullName,
    emailAddress,
    phoneNumber,
    relationshipType,
    canBeEvaluated,
  } = props;
  return (
    <CardInformation>
      <div className="top-card-info">
        <div className="score-reference">
          <div>
            <span>4.3</span>
          </div>
        </div>
        <div className="type-user-reference">{relationshipType}</div>
        <div></div>
      </div>
      <div className="middle-card-info">
        <div>
          <i className="fa fa-user-o" />
          <span>{fullName}</span>
        </div>
        <div>
          <i className="fa fa-envelope-o" />
          <span>{emailAddress}</span>
        </div>
        <div>
          <i className="fa fa-phone" />
          <span>{phoneNumber}</span>
        </div>
      </div>
      {canBeEvaluated === true && (
        <div className="bottom-card-info">
          <button>Calificar</button>
        </div>
      )}
    </CardInformation>
  );
};

const WidgetReferences = ({ dataReferences }) => {
  return (
    <CardReferences>
      <h1>Referencias</h1>
      <SectionCardInfoReference>
        {dataReferences.map((row) => {
          return <Card {...row} />;
        })}
      </SectionCardInfoReference>
    </CardReferences>
  );
};

export default WidgetReferences;
