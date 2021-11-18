import React from "react";
import { ReactComponent as IconBathroomHfy } from "./svgFile/iconBathroom.svg";

const IconBathroom = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconBathroomHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconBathroom;
