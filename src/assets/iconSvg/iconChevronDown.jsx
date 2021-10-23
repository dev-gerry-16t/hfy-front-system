import React from "react";
import { ReactComponent as IconChevronDownHfy } from "./svgFile/arrowDown2.svg";

const IconChevronDown = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconChevronDownHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconChevronDown;
