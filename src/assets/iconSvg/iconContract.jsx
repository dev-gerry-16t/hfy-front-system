import React from "react";
import { ReactComponent as IconContractHfy } from "./svgFile/iconContract.svg";

const IconContract = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconContractHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconContract;
