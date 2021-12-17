import React, { useState } from "react";
import styled from "styled-components";
import { Modal } from "antd";
import ComponentLoadSection from "./componentLoadSection";

const FormModal = styled.div`
  font-family: Poppins;
  padding: 1em 2em;
  h1 {
    text-align: center;
    color: var(--color-primary);
    font-size: 24px;
    font-weight: bold;
  }
  h2 {
    color: #4e4b66;
    font-weight: 600;
    text-align: center;
    font-size: 18px;
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

const CustomModalMessage = (props) => {
  const {
    title = "",
    icon = <div />,
    subTitle = "",
    mainText = "",
    isModalVisible = false,
    onClose = () => {},
    isVisibleLeft = true,
    labelLeft = "",
    onClickLeft = () => {},
    isVisibleRight = true,
    labelRight = "",
    onClickRight = () => {},
  } = props;
  const [isLoadApi, setIsLoadApi] = useState(false);

  return (
    <Modal
      visible={isModalVisible}
      closable={true}
      footer={false}
      style={{ top: 20 }}
      width={600}
      onCancel={() => {
        onClose();
      }}
    >
      <FormModal>
        <ComponentLoadSection isLoadApi={isLoadApi} position="absolute">
          <h1>{title}</h1>
          <div className="icon-image-send">{icon}</div>
          <h2>{subTitle}</h2>
          <p
            style={{
              textAlign: "center",
              fontSize: "1em",
            }}
          >
            {mainText}
          </p>
          <div className="button-action-row">
            {isVisibleLeft === true && (
              <ButtonsModal
                onClick={async () => {
                  try {
                    setIsLoadApi(true);
                    await onClickLeft();
                    setIsLoadApi(false);
                    onClose();
                  } catch (error) {
                    setIsLoadApi(false);
                  }
                }}
                primary
              >
                {labelLeft}
              </ButtonsModal>
            )}
            {isVisibleRight === true && (
              <ButtonsModal onClick={onClickRight}>{labelRight}</ButtonsModal>
            )}
          </div>
        </ComponentLoadSection>
      </FormModal>
    </Modal>
  );
};

export default CustomModalMessage;
