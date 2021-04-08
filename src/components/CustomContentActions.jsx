import React from "react";
import Arrow from "../assets/icons/Arrow.svg";

const CustomContentActions = (props) => {
  const { onClick, titleSection, children, isVisible } = props;
  let component = <></>;
  if (isVisible === true) {
    component = (
      <div className="actions-information-tenant">
        <div className="tabs-tenant-information">
          <div className="form-modal">
            <div className="title-head-modal">
              <button className="arrow-back-to" type="button" onClick={onClick}>
                <img src={Arrow} alt="backTo" width="30" />
              </button>
              <h1>{titleSection}</h1>
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }
  return component;
};

export default CustomContentActions;
