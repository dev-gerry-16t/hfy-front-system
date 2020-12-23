import React, { useEffect } from "react";
import { connect } from "react-redux";

const Auth = (props) => {
  const { history } = props;

  useEffect(() => {
    setTimeout(() => {
      history.push("/dashboard");
    }, 3000);
  }, []);

  return (
    <div className="loader-auth-spiner">
      <div />
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
