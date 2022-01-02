import React from "react";
import { ReactComponent as IconChevronRightHfy } from "./svgFile/arrowRight2.svg";

const IconChevronRight = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconChevronRightHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconChevronRight;
