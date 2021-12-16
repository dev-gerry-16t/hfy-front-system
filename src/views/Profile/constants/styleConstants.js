import styled from "styled-components";

const ComponentRadio = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .radio-inputs-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 200px;
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

const ButtonCenterPrimary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px 0px;
  button {
    padding: 5px 2em;
    border: none;
    background: var(--color-primary);
    border-radius: 16px;
    color: #fff;
    font-weight: 600;
  }
`;

const ContentForm = styled.div`
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  padding-bottom: 0.3em;
  .header-title {
    padding: ${(props) => (props.owner ? "1em 1em" : "1em 6em")};
    border-bottom: 0.5px solid #4e4b66;
    display: flex;
    justify-content: space-between;
    h1 {
      margin: 0;
      color: var(--color-primary);
      font-weight: 700;
    }
  }
  .back-button {
    position: absolute;
    button {
      background: transparent;
      border: none;
    }
  }
  .subtitle-header {
    margin: 0;
    color: var(--color-primary);
    font-weight: 700;
  }
  .button-actions {
    display: flex;
    justify-content: center;
    gap: 2em;
    margin: 2em 0px;
  }
  @media screen and (max-width: 640px) {
    .header-title {
      padding: 1em 15px;
    }
  }
`;

const ButtonNextBackPage = styled.button`
  background: transparent;
  border: none;
  color: ${(props) =>
    props.block === true ? "#6E7191" : "var(--color-primary)"};
  font-weight: 500;
  cursor: ${(props) => (props.block === true ? "no-drop" : "pointer")};
  @media screen and (max-width: 420px) {
    u {
      display: none;
    }
  }
`;

const LineSeparator = styled.hr`
  width: 100%;
  background: #d6d8e7;
  top: 8%;
  left: 9%;
  margin: 2em 0;
  opacity: ${(props) => (props.opacity ? props.opacity : "1")};
`;

const FormProperty = styled.div`
  padding: 4em 6em;
  .label-indicator {
    span {
      font-size: 1em;
    }
  }
  .type-property {
    margin-top: 3em;
    .section-card-reference {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 20px;
      margin: 1em 0px;
    }
  }
  .type-form-property {
    .subtitle-form {
      margin-bottom: 2em;
      h1 {
        margin: 0;
        color: var(--color-primary);
        font-weight: 700;
      }
    }
  }
  .next-back-buttons {
    display: flex;
    justify-content: center;
    gap: 3em;
    margin-top: 2em;
  }
  @media screen and (max-width: 640px) {
    padding: 2em 3em;
  }
  @media screen and (max-width: 420px) {
    padding: 1em 1em;
  }
  @media screen and (max-width: 320px) {
    padding: 1em 5px;
  }
`;

const Container = styled.div`
  padding: 2em;
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
`;

const ButtonIcon = styled.button`
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormModal = styled.div`
  font-family: Poppins;
  padding: 1em 2em;
  h1 {
    text-align: center;
    color: var(--color-primary);
  }
  h2 {
    color: #4e4b66;
    font-weight: 700;
    text-align: center;
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
    .input-checkbox {
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
    }
  }
  .button-action {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  .button-action-row {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
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

export {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
  Container,
  ButtonIcon,
  FormModal,
  ButtonsModal,
  ButtonCenterPrimary,
  ComponentRadio,
};
