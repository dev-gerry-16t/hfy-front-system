import styled from "styled-components";

const ContentForm = styled.div`
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
  padding-bottom: 0.3em;
  .header-title {
    padding: 1em 6em;
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
  .next-back-buttons {
    display: flex;
    justify-content: center;
    gap: 3em;
    margin-top: 2em;
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

export {
  ContentForm,
  ButtonNextBackPage,
  LineSeparator,
  FormProperty,
  Container,
  ButtonIcon,
};
