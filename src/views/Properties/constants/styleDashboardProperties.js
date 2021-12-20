import styled from "styled-components";

const ButtonIcon = styled.button`
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding: 1em 2em;
  font-size: 16px;
  .header-filter {
    h1 {
      font-size: 1.3em;
    }
  }
  @media screen and (max-width: 1200px) {
    padding: 1em 1em;
  }
  @media screen and (max-width: 640px) {
    padding: 1em 5px;
    .header-filter {
      h1 {
        font-size: 16px;
      }
    }
  }
`;

const ContentCards = styled.div`
  font-family: Poppins;
  margin-top: 25px;
  .body-cards-property {
    letter-spacing: 0.75px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 2%;
    padding: 1em 0;
  }
  .body-cards-property-x {
    margin: 20px 0px;
    padding: 10px 10px;
    display: flex;
    flex-direction: row;
    width: 100%;
    flex-wrap: nowrap;
    gap: 20px;
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .button-actions-header {
    display: none;
  }
  @media screen and (max-width: 520px) {
    background: #ffffff;
    box-shadow: 0px 6px 22px 12px rgb(205 213 219 / 60%);
    border-radius: 0.5em;
    .body-cards-property {
      flex-direction: column;
      align-items: center;
    }
    .button-actions-header {
      display: flex;
      justify-content: space-between;
      border-bottom: 0.5px solid #4e4b66;
      padding: 1em;

      h1 {
        font-weight: 700;
        margin: 0px;
        color: #4e4b66;
        font-size: 16px;
      }
    }
  }
`;

const ContentAddFilter = styled.div`
  font-size: 16px;
  font-family: Poppins;
  padding: 1em 2em;
  background: ${(props) => (props.owner === true ? "#fff" : "transparent")};
  box-shadow: ${(props) =>
    props.owner === true
      ? "0px 6px 22px 12px rgba(205, 213, 219, 0.6)"
      : "none"};
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-weight: 700;
    margin: 0px;
    color: #4e4b66;
    font-size: 20px;
  }
  .button-actions-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    button {
      border-radius: 0.8em;
      border: none;
      background: ${(props) => props.background};
      color: #fff;
      padding: 0.125em 2em;
      font-weight: 600;
      letter-spacing: 0.75px;
    }
  }
  .content-filter-dad {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
  }
  .filter-actions-components {
  }
  @media screen and (max-width: 1750px) {
    font-size: 14px;
    .content-filter-dad {
      flex-direction: column;
      align-items: center;
    }
  }
  @media screen and (max-width: 1200px) {
    width: 100%;
    padding: 1em 1em;
    .filter-actions-components {
      width: 100%;
    }
  }
  @media screen and (max-width: 640px) {
    font-size: 12px;
    padding: 1em 0px;
    .button-actions-header {
      flex-direction: column;
      align-items: center;
    }
  }
  @media screen and (max-width: 420px) {
    font-size: 10px;
  }
`;

const EmptyData = styled.div`
  width: 100%;
  height: 30em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    color: rgba(78, 75, 102, 0.45);
    font-weight: 700;
    text-align: center;
  }
`;

const Content = styled.div`
  overflow-y: scroll;
  font-size: 16px;
  font-family: Poppins;
  padding: 1em;
  letter-spacing: 0.75px;
  display: grid;
  grid-template-columns: 3fr 1fr;
  position: relative;
  @media screen and (max-width: 1160px) {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  @media screen and (max-width: 500px) {
    padding: 1em 5px;
  }
`;

const ContainerDown = styled.div`
  padding: 0px 1em;
  margin: 5em 1em 2em 1em;
  @media screen and (max-width: 500px) {
    padding: 0px 0px;
    margin: 5em 0px 2em 0px;
  }
`;

const TabsProperty = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2em;
  gap: 20px;
  max-width: 100%;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 640px) {
    font-size: 14px;
  }
  @media screen and (max-width: 420px) {
    font-size: 12px;
    padding: 0px 5px;
  }
  @media screen and (max-width: 360px) {
    font-size: 10px;
    padding: 0px 5px;
  }
`;

const Tab = styled.div`
  cursor: pointer;
  h1 {
    font-weight: bold;
    color: ${(props) =>
      props.selected === true ? "var(--color-primary)" : "#4e4b66"};
  }
  hr {
    width: 30%;
    background: #d6d8e7;
    margin: 0;
    border: 2px solid var(--color-primary);
    display: ${(props) => (props.selected === true ? "block" : "none")};
  }
  @media screen and (max-width: 420px) {
    line-height: 10px;
  }
`;

const ButtonAction = styled.button`
  background: ${(props) => (props.primary ? "var(--color-primary)" : "#FFF")};
  border: ${(props) =>
    props.primary ? "none" : "1px solid var(--color-primary)"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  padding: 0.2em 2em;
  border-radius: 1em;
`;

const GeneralCard = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 0.5em;
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
  }
  .content-cards {
    min-height: 30em;
    padding: 2em 2em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

  .content-card {
    padding: 2em 2em;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
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
        max-width: 192px;

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
    .top-info {
      display: flex;
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
          font-size:18px;
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

const ContentRight = styled.div`
  padding: 0 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  font-size: 16px;
  @media screen and (max-width: 640px) {
    font-size: 12px;
  }
  @media screen and (max-width: 500px) {
    padding: 0px 0px;
  }
  @media screen and (max-width: 420px) {
    font-size: 10px;
  }
`;

const ButtonDocument = styled.button`
  border: none;
  background: ${(props) =>
    props.primary ? "var(--color-primary)" : "transparent"};
  color: ${(props) => (props.primary ? "#fff" : "var(--color-primary)")};
  text-decoration: ${(props) => (props.primary ? "" : "underline")};
  font-weight: 600;
  border-radius: 1em;
  padding: 0px 1em;
`;

const SharedByUser = styled.div`
  font-style: italic;
  font-size: 12px;
  text-decoration: underline;
  @media screen and (max-width: 640px) {
    font-size: 10px;
  }
`;

const SeparateServices = styled.div`
  background: #fff;
  box-shadow: 0px 6px 22px 12px rgba(205, 213, 219, 0.6);
  border-radius: 4px;
  margin-top: 2em;
  font-size: 16px;
  .services-header {
    border-bottom: 0.5px solid #4e4b66;
    padding: 1em 2em;
    h1 {
      color: var(--color-primary);
      font-weight: 700;
    }
  }
  @media screen and (max-width: 640px) {
    font-size: 12px;
  }
  @media screen and (max-width: 420px) {
    font-size: 10px;
  }
`;

export {
  Container,
  ContentCards,
  ContentAddFilter,
  EmptyData,
  ButtonIcon,
  Content,
  ContainerDown,
  TabsProperty,
  Tab,
  ButtonAction,
  GeneralCard,
  Card,
  ContentRight,
  ButtonDocument,
  SharedByUser,
  SeparateServices,
};
