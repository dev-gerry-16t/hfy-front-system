import React from "react";
import { ReactComponent as IconChevronUpHfy } from "./svgFile/arrowUp2.svg";

const IconChevronUp = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconChevronUpHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconChevronUp;
