import React, { useEffect } from "react";
import isEmpty from "lodash/isEmpty";
import isNil from "lodash/isNil";

const CustomStepsHomify = (props) => {
  const { steps, onClick, current, callBackFind } = props;

  useEffect(() => {
    if (isNil(current) === false && isEmpty(steps) === false) {
      const findSelectRow = steps.find((row, ix) => {
        return ix === current;
      });
      callBackFind(findSelectRow);
    }
  }, [current, steps]);

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
                onClick(index, row);
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
                  className={row.style}
                  style={{
                    color: current === index ? "#fff" : "#A0A3BD",
                  }}
                />
              </div>
              <span
                style={{
                  color: current !== index ? "#d6d8e7" : "var(--color-primary)",
                }}
                className="title-steps-typeform"
              >
                {row.tab}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default CustomStepsHomify;
