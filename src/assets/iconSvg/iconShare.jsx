import React from "react";
import { ReactComponent as IconShareHfy } from "./svgFile/iconShare.svg";

const IconShare = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconShareHfy fill={backGround} stroke={color} width={size} height={size} />
  );
};

export default IconShare;
