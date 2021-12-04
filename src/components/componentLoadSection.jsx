import React, { useState, useEffect } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const ComponentLoadSection = ({
  children,
  isLoadApi,
  position = "fixed",
  text = "Espera por favor...",
}) => {
  const LoadingSpin = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: position,
      }}
    >
      <SyncOutlined spin />
      <span
        style={{
          marginTop: "10px",
          width: "180px",
        }}
      >
        {text}
      </span>
    </div>
  );

  return (
    <Spin indicator={LoadingSpin} spinning={isLoadApi} delay={100}>
      {children}
    </Spin>
  );
};

export default ComponentLoadSection;
