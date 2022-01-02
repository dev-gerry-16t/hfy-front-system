import React from "react";
import { ReactComponent as IconEditSquareHfy } from "./svgFile/editSquare.svg";

const IconEditSquare = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconEditSquareHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconEditSquare;
