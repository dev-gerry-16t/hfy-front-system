import React from "react";
import { connect } from "react-redux";

const Auth = () => {
  return (
    <div className="loader-auth-spiner">
      <div />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
