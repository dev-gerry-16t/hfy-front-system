import React from "react";
import { ReactComponent as IconDeleteHfy } from "./svgFile/delete.svg";

const IconDelete = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconDeleteHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconDelete;
