import React from "react";
import { ReactComponent as IconPolicyHfy } from "./svgFile/iconPolicy.svg";

const IconPolicy = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconPolicyHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconPolicy;
