import styled from "styled-components";

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
  letter-spacing: 0.75px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 2%;
  padding: 1em 0;
  @media screen and (max-width: 520px) {
    flex-direction: column;
    align-items: center;
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

export { Container, ContentCards, ContentAddFilter, EmptyData };
