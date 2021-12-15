import styled from "styled-components";

const ButtonCheck = styled.button`
  border: ${(props) =>
    props.select === true ? "1px solid #FF0083" : "1px solid #d6d8e7"};
  border-radius: 0.5em;
  background: ${(props) =>
    props.select === true ? "rgba(255, 0, 131, 0.2)" : "transparent"};
  color: #000;
  font-weight: 500;
  padding: 0.5em 0.8em;
  box-shadow: ${(props) =>
    props.select ? "0px 0px 5px 2px rgba(255, 0, 131, 0.15)" : "none"};
  @media screen and (max-width: 1320px) {
    font-size: 12px;
  }
`;

const GeneralCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
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
      border-radius: 1em;
      color: #fff;
      background: var(--color-primary);
      font-weight: 500;
    }
  }
  .content-cards {
    padding: 2em 2em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
    max-height: 30em;
    overflow-y: scroll;
  }
  @media screen and (max-width: 640px) {
    font-size: 12px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    min-width: auto;
  }
  @media screen and (max-width: 420px) {
    font-size: 10px;
  }
`;

const LoaderAction = styled.div`
  position: fixed;
  width: 95vw;
  height: 90vh;
  z-index: 10001;
  top: 0;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-weight: 600;
    font-size: 20px;
    background: rgba(255, 255, 255, 0.5) !important;
    backdrop-filter: blur(5px);
    margin: 15px 0px 0px 0px;
    color: rgba(255, 2, 130, 1);
  }
`;

const ContentForm = styled.div`
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  padding-bottom: 0.3em;
  position: relative;
  .back-button {
    position: absolute;
    button {
      background: transparent;
      border: none;
    }
  }
  .shared-by-info {
  }
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
  .button-actions {
    display: flex;
    justify-content: center;
    gap: 2em;
    margin: 2em 0px;
  }
  @media screen and (max-width: 640px) {
    .header-title {
      padding: 1em 5px;
      position: relative;
      h1 {
        font-size: 14px;
      }
      .shared-by-info {
        position: absolute;
        bottom: 0px;
      }
    }
  }
  @media screen and (max-width: 500px) {
  }
  @media screen and (max-width: 420px) {
  }
`;

const ButtonNextBackPage = styled.button`
  background: transparent;
  border: none;
  color: ${(props) =>
    props.block === true ? "#6E7191" : "var(--color-primary)"};
  font-weight: 500;
  cursor: ${(props) => (props.block === true ? "no-drop" : "pointer")};
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
  .type-form-property-location {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 20px;
    .subtitle-form {
      margin-bottom: 2em;
      h1 {
        margin: 0;
        color: var(--color-primary);
        font-weight: 700;
      }
    }
    .no-location {
      padding: 1em 0px;
      border: 1px solid #d6d8e7;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        margin-top: 4em;
        color: rgba(78, 75, 102, 0.2);
        font-weight: 700;
      }
    }
    .location-map {
      width: 100%;
      height: 21em;
      display: flex;
      position: relative;
    }
  }
  .next-back-buttons {
    display: flex;
    justify-content: center;
    gap: 3em;
    margin-top: 2em;
  }
  @media screen and (max-width: 1320px) {
    padding: 2em 3em;
  }
  @media screen and (max-width: 1170px) {
    .type-form-property-location {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 910px) {
    padding: 1em 10px;
  }
`;

const Container = styled.div`
  padding: 2em;
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  @media screen and (max-width: 650px) {
    padding: 2em 5px;
  }
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
  LoaderAction,
  GeneralCard,
  ButtonCheck,
};
