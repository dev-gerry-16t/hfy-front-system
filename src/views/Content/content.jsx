import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";

const { Header, Sider, Content } = Layout;

const ViewContent = () => {
  console.log('hola');
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      Content
    </Content>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewContent);
