import React from "react";
import isNil from "lodash/isNil";
import { Input } from "antd";

const CustomInputTypeForm = (props) => {
  const {
    value,
    id,
    suffix,
    placeholder,
    onChange,
    type,
    maxLength,
    minLength,
  } = props;
  return (
    <div style={{ position: "relative" ,marginBottom:15}}>
      <label
        style={{
          position: "absolute",
          bottom: 30,
          left: 12,
          color: "#4E4B66",
          fontSize: 12,
        }}
      >
        {placeholder}
      </label>
      <Input
        id={isNil(id) === false ? id : null}
        value={value}
        type={isNil(type) === false ? type : "text"}
        suffix={isNil(suffix) === false ? suffix : null}
        placeholder=""
        onChange={(e) => {
          onChange(e.target.value);
        }}
        maxLength={isNil(maxLength) === false ? maxLength : null}
        minLength={isNil(minLength) === false ? minLength : null}
      />
    </div>
  );
};

export default CustomInputTypeForm;
