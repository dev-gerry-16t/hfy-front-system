import styled from "styled-components";

const Container = styled.div`
  font-size: 16px;
  padding: 1.5em 1em;
  font-family: Poppins;
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
`;

const MainInfo = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const InfoVerify = styled.div`
  font-size: 14px;
  position: relative;
  border: 1px solid #ff0282;
  box-sizing: border-box;
  border-radius: 20px;
  width: 500px;
  .icon-top {
    position: absolute;
    display: flex;
    justify-content: center;
    width: 100%;
    top: -40px;
    .circle-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 81px;
      height: 81px;
      border-radius: 50%;
      background: var(--color-primary);
    }
  }
  .info-main {
    margin-top: 50px;
    padding: 0px 25px;
    h2 {
      font-size: 1em;
      font-weight: bold;
      text-align: center;
      margin-bottom: 25px;
    }
    p {
      text-align: justify;
      letter-spacing: 0.75px;
    }
  }
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
  Container,
  HeaderContainer,
  MainContainer,
  MainInfo,
  InfoVerify,
  MainButtons,
  ComponentRadio,
};
