import styled from "styled-components";

const GeneralCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  height: 100%;
  min-width: 375px;
  font-size: 16px;
  .header-title {
    border-bottom: 0.5px solid #4e4b66;
    display: flex;
    justify-content: space-between;
    padding: 1em;
    h1 {
      margin: 0;
      color: var(--color-primary);
      font-weight: 700;
    }
    button {
      border: none;
      color: #fff;
      background: transparent;
    }
  }
  .content-cards {
    font-size: 14px;
    padding: 2em 10px;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    height: 40em;
    overflow-y: scroll;
    .button-payment {
      display: flex;
      justify-content: center;
      button {
        background: var(--color-primary);
        color: #fff;
        font-weight: 600;
        border: none;
        padding: 5px 3em;
        border-radius: 1em;
      }
    }
  }
  @media screen and (max-width: 420px) {
    width: 100%;
    min-width: auto;
    .content-cards {
      padding: 2em 5px;
    }
  }
`;

const Card = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 4px;
  min-height: 6em;
  .card-document {
    padding: 1em;
    .top-info {
      display: flex;
      .icon-info {
        width: 43px;
        height: 42px;
        background: #eff0f6;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 250px;

        h3 {
          margin: 0px;
        }
        span {
          color: var(--color-primary);
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: flex-end;
    }
  }

  .card-user {
    padding: 1em;
    .title-publication {
      font-weight: 700;
    }
    .top-info {
      display: flex;
      gap: 10px;
      .icon-info-circle {
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: blue;
          color: #fff;
          font-size: 18px;
        }
      }
      .icon-info {
        width: 60px;
        height: 60px;
        background: #eff0f6;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        border-radius: 5px;
        position: relative;
        .score {
          position: absolute;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--color-primary);
          top: 4em;
          left: 4em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: 0.6em;
          color: #fff;
          span {
            font-weight: 300;
          }
        }
      }
      .name-info {
        font-size: 0.9em;
        line-height: 1.4em;
        max-width: 192px;
        display: flex;
        flex-direction: column;
        h3 {
          margin: 0px;
        }
        span {
          color: var(--color-primary);
        }
      }
    }
    .button-action {
      display: flex;
      justify-content: flex-end;
    }
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  visibility: ${(props) => (props.error ? "visible" : "hidden")};
  opacity: ${(props) => (props.error ? "1" : "0")};
  background: #feefef;
  color: #da1414;
  border-radius: 5px;
  font-size: 1em;
  padding: 3px 0px 3px 5px;
  transition: visibility 0.1s linear, opacity 0.1s linear;
  span {
    margin-left: 3px;
  }
`;

const Container = styled.div`
  font-size: 16px;
  padding: 1.5em 1em;
  font-family: Poppins;
  .subTitle-confirm-info {
    font-weight: 700;
    font-size: 1.3em;
    color: var(--color-primary);
    cursor: pointer;
  }
`;

const InfoPayment = styled.div`
  .header-card-payment {
    display: flex;
    justify-content: center;
    padding: 2em 0px;
    .amount-to-pay {
      position: relative;
      span {
        border: 1px solid var(--color-primary);
        padding: 0.5em;
        border-radius: 7px;
        font-weight: 600;
        color: var(--color-primary);
      }
      p {
        position: absolute;
      }
      @media screen and (max-width: 320px) {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    }
  }

  .inclusive-payment {
    border: 1px solid #4e4b66;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 1em;
    .inclusive-info {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  }
`;

const HeaderContainer = styled.div`
  text-align: center;
  h1 {
    font-size: 1.4em;
    font-weight: 800;
  }
  span {
    color: var(--color-primary);
  }
`;

const MainContainer = styled.div`
  text-align: center;
  margin: 1em 0px;
  h1 {
    font-size: 1.2em;
    font-weight: 600;
  }
`;

const MainInfo = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const MainButtons = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  row-gap: 1em;
  button {
    border-radius: 1em;
    border: none;
    padding: 0.5em 0px;
    font-weight: 600;
  }
  .hfy-primary-button {
    background: var(--color-primary);
    color: #fff;
  }
  .hfy-secondary-button {
    background: #fff;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);
  }
`;

const ComponentRadio = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .radio-inputs-options {
    display: flex;
    flex-direction: column;
    width: 100%;
    .input-radio {
      input[type="radio"] {
        appearance: none;
        background-color: #fff;
        margin-right: 5px;
        font: inherit;
        color: var(--color-primary);
        width: 1.15em;
        height: 1.15em;
        border: 1px solid var(--color-primary);
        border-radius: 50%;
        display: inline-grid;
        place-content: center;
      }
      input[type="radio"]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--color-primary);
      }
      input[type="radio"]:checked::before {
        transform: scale(1);
      }
    }
  }
  @media screen and (max-width: 640px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export {
  GeneralCard,
  Card,
  ErrorMessage,
  Container,
  InfoPayment,
  HeaderContainer,
  MainContainer,
  MainInfo,
  MainButtons,
  ComponentRadio,
};
