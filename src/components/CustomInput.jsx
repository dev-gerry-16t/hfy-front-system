import React from "react";
import isNil from "lodash/isNil";
import { Input } from "antd";

const CustomInput = (props) => {
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
    <Input
      id={isNil(id) === false ? id : null}
      value={value}
      type={isNil(type) === false ? type : "text"}
      suffix={isNil(suffix) === false ? suffix : null}
      placeholder={placeholder}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      maxLength={isNil(maxLength) === false ? maxLength : null}
      minLength={isNil(minLength) === false ? minLength : null}
    />
  );
};

export default CustomInput;
