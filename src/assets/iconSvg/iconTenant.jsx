import React from "react";
import { ReactComponent as IconTenantHfy } from "./svgFile/iconTenant.svg";

const IconTenant = (props) => {
  const { backGround = "transparent", color = "#000000", size = "24" } = props;
  return (
    <IconTenantHfy
      fill={backGround}
      stroke={color}
      width={size}
      height={size}
    />
  );
};

export default IconTenant;
