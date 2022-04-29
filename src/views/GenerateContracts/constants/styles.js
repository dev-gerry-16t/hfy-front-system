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
      border-radius: 1em;
      color: #fff;
      background: var(--color-primary);
      font-weight: 500;
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
`;

export { GeneralCard };
