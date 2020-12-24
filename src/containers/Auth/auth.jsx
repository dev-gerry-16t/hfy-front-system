import React, { useEffect } from "react";
import { connect } from "react-redux";

const Auth = (props) => {
  const { history } = props;

  useEffect(() => {
    setTimeout(() => {
      console.log('STORAGE',localStorage.getItem('idSystemUser'));
      history.push("/app/viewContent");
    }, 3000);
  }, []);

  return <div className="loader-auth-spiner" />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
