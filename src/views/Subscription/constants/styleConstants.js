import styled from "styled-components";

const FormModal = styled.div`
  font-size: 16px;
  font-family: Poppins;
  padding: 1em 2em;
  svg {
    width: 240px;
    height: 216px;
  }
  h1 {
    font-size: 2em;
    text-align: center;
    color: var(--color-primary);
  }
  h2 {
    color: #4e4b66;
    font-weight: 700;
    text-align: center;
  }
  h3 {
    text-align: center;
    font-weight: bold;
  }
  .icon-image-send {
    text-align: center;
    margin: 4em 0px;
  }
  p {
    text-align: center;
    color: #4e4b66;
    font-size: 1em;
    margin: 2em 0px;
  }
  .image-platforms {
    margin: 2em 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1em;
    .input-checkbox {
      width: 160px;
      display: flex;
      justify-content: space-between;
      .limit-to-public {
        border: 1px solid var(--color-primary);
        border-radius: 5px;
        color: var(--color-primary);
        width: 40px;
        height: 19px;
        display: flex;
        justify-content: center;
        align-items: center;
        right: -50px;
        top: 0px;
        position: absolute;
        span {
          font-size: 14px;
        }
      }
      .pay-publication {
        position: absolute;
        right: -100px;
        top: -10px;
        button {
          width: 90px;
          background: var(--color-primary);
          font-size: 10px;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0px 5px;
        }
      }
      input[type="checkbox"] {
        appearance: none;
        background-color: #fff;
        font: inherit;
        color: #fff;
        width: 1.15em;
        height: 1.15em;
        border: 1px solid var(--color-primary);
        border-radius: 5px;
        display: inline-grid;
        place-content: center;
        margin-right: 10px;
      }
      input[type="checkbox"]::before {
        content: "\\2713";
        transform: scale(0);
        width: 1.05em;
        height: 1.05em;
        border-radius: 5px;
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--color-primary);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      input[type="checkbox"]:checked::before {
        transform: scale(1);
      }
      input[type="checkbox"]:disabled {
        background: #d6d8e7;
        border: 1px solid #d6d8e7;
      }
    }
  }
  .button-action-subscription {
    text-align: center;
    border-bottom: 1px solid #4e4b66;
    padding-bottom: 30px;
    margin-bottom: 30px;
    button {
      border: 1px solid var(--color-primary);
      background: #fff;
      color: var(--color-primary);
      border-radius: 10px;
    }
  }
  .button-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .view-ticket-property {
    display: block;
  }
  @media screen and (max-width: 800px) {
    .view-ticket-property {
      display: none;
    }
  }

  @media screen and (max-width: 370px) {
    font-size: 12px;
    padding: 1em 5px;
    p {
      text-align: justify;
    }
  }
`;

const Circle = styled.div`
  margin-top: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: ${(props) => (props.ok === false ? "1px solid #000" : "none")};
  background: ${(props) =>
    props.ok === false ? "transparent" : "var(--color-primary)"};
`;

const DetailInfoSubscription = styled.div`
  margin-top: 1em;
  border-top: 1px solid var(--color-primary);
  margin-bottom: 10px;
  overflow: hidden;
  max-height: 500px;
  transition: all 0.6s ease-in-out;
  .option-subs {
    padding: 10px 5px;
    border-bottom: 0.5px solid #d6d8e7;
    display: flex;
    gap: 5px;
    span {
      color: #0a3949;
      font-size: 12px;
      font-weight: 500;
      text-align: left;
    }
  }
`;

const ButtonsModal = styled.button`
  border: none;
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  border-radius: 1em;
  padding: 5px 2em;
  margin-bottom: 5px;
  font-size: 1em;
  text-decoration: ${(props) => (props.primary ? "none" : "underline")};
  font-weight: 700;
`;

export { FormModal, ButtonsModal, DetailInfoSubscription, Circle };
