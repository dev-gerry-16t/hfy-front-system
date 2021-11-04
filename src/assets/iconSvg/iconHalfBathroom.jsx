import React from "react";
import { ReactComponent as IconHalfBathroomHfy } from "./svgFile/iconHalfBathroom.svg";

const IconHalfBathroom = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconHalfBathroomHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconHalfBathroom;
