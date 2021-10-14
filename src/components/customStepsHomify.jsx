import React from "react";
import isEmpty from "lodash/isEmpty";

const CustomStepsHomify = (props) => {
  const { steps, onClick, current } = props;

  return (
    <div className="steps-style-header">
      <hr />
      {isEmpty(steps) === false &&
        steps.map((row, index) => {
          return (
            <div
              className="step-icon"
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                onClick(index);
              }}
            >
              <div
                className={
                  current === index
                    ? "background-circle-active"
                    : "background-circle-inactive"
                }
                style={{ alignItems: "center" }}
              >
                <i
                  className={row.icon}
                  style={{
                    color: current === index ? "#fff" : "#A0A3BD",
                  }}
                />
              </div>
              <span
                style={{
                  visibility: current !== index ? "visible" : "hidden",
                  color: "#d6d8e7",
                }}
                className="title-steps-typeform"
              >
                {row.title}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default CustomStepsHomify;
