import React from "react";
import isNil from "lodash/isNil";
import isEmpty from "lodash/isEmpty";
import { Select } from "antd";

const { Option } = Select;

const CustomSelectTypeForm = (props) => {
  const {
    value,
    id,
    suffix,
    placeholder,
    onChange,
    type,
    maxLength,
    minLength,
    data,
  } = props;
  return (
    <div style={{ position: "relative", marginBottom: 15 }}>
      <label
        style={{
          position: "absolute",
          bottom: 32,
          left: 12,
          color: "#4E4B66",
          fontSize: 12,
        }}
      >
        {placeholder}
      </label>
      <Select
        placeholder=""
        showSearch
        value={value}
        onChange={(val, option) => {
          onChange(val, option);
        }}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {isEmpty(data) === false &&
          data.map((row) => {
            return (
              <Option value={row[id]} onClick={() => row}>
                {row.text}
              </Option>
            );
          })}
      </Select>
    </div>
  );
};

export default CustomSelectTypeForm;
