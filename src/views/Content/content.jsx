import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";

const { Content } = Layout;

const ViewContent = () => {
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      Content1
    </Content>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ViewContent);
