import React from "react";
import { ReactComponent as IconBidHfy } from "./svgFile/iconBid.svg";

const IconBid = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconBidHfy fill={backGround} stroke={color} width={size} height={size} />
  );
};

export default IconBid;
