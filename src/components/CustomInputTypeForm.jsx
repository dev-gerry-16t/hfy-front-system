import React from "react";
import styled from "styled-components";
import isNil from "lodash/isNil";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import saqareX from "../assets/icons/saqareX.svg";

const Label = styled.label`
  color: ${(props) => (props.error ? "#DA1414" : "#4e4b66")};
  margin-left: 10px;
`;

const ContainerInput = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Poppins;
`;

const Input = styled.input`
  padding: 5px 6px;
  border-radius: 5px;
  background: ${(props) =>
    props.isBlock === false ? props.background : "#efefef4d"};
  cursor: ${(props) => (props.isBlock === false ? "auto" : "not-allowed")};
  border: ${(props) =>
    props.error ? "1px solid #DA1414" : "1px solid #d6d8e7"};
  outline: none;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  width: 100%;
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &:focus {
    border: 1px solid #b9bbc7;
  }
  &:hover {
    border: 1px solid #b9bbc7;
  }
  &::placeholder {
    font-weight: 600;
    color: rgba(0, 0, 0, 0.2);
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
  font-size: 10px;
  padding: 3px 0px 3px 5px;
  transition: visibility 0.1s linear, opacity 0.1s linear;
  span {
    margin-left: 3px;
  }
`;

const PositionTooltip = styled.div`
  position: absolute;
  right: 5px;
  top: 0;
`;

const PositionSuffix = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;

const CustomInputTypeForm = (props) => {
  const {
    value,
    id,
    suffix,
    label,
    placeholder,
    onChange,
    type,
    maxLength,
    minLength,
    error = false,
    errorMessage,
    info,
    onBlur = () => {},
    onKeyEnter = () => {},
    background = "transparent",
    isBlock = false,
  } = props;
  return (
    <ContainerInput>
      <Label error={error}>{label}</Label>
      <div
        style={{
          position: "relative",
        }}
      >
        <Input
          isBlock={isBlock}
          background={background}
          id={isNil(id) === false ? id : null}
          value={isNil(value) === true ? "" : value}
          type={isNil(type) === false ? type : "text"}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onKeyDown={(e) => {
            if (type === "number") {
              if (e.keyCode === 109 || e.keyCode === 107) {
                e.preventDefault();
              }
            }
          }}
          onKeyPress={(e) => {
            if (e.charCode === 13) {
              onKeyEnter();
            }
          }}
          onBlur={onBlur}
          maxLength={isNil(maxLength) === false ? maxLength : null}
          minLength={isNil(minLength) === false ? minLength : null}
          error={error}
          disabled={isBlock}
        />
        {isNil(info) === false && (
          <PositionTooltip>
            <Tooltip placement="top" title={info}>
              <div
                style={{
                  padding: "5px 0px 0px 5px",
                }}
              >
                <QuestionCircleOutlined />
              </div>
            </Tooltip>
          </PositionTooltip>
        )}
        {isNil(suffix) === false && <PositionSuffix>{suffix}</PositionSuffix>}
        <ErrorMessage error={error}>
          <img src={saqareX} alt="exclaim" />
          <span>{errorMessage}</span>
        </ErrorMessage>
      </div>
    </ContainerInput>
  );
};

export default CustomInputTypeForm;
