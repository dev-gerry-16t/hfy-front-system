import React from "react";
import { ReactComponent as IconChevronLeftHfy } from "./svgFile/arrowLeft2.svg";

const IconChevronLeft = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconChevronLeftHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconChevronLeft;
