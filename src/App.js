import "./App.css";
import Login from "./containers/Login/login";
import RecoveryPassEnter from "./containers/Recovery/RecoveryPassEnter";
import RecoveryPassSentCode from "./containers/Recovery/RecoveryPassSentCode";
import RecoveryPassCode from "./containers/Recovery/RecoveryPassCode";
import RecoveryNewPass from "./containers/Recovery/RecoveryNewPass";
import Register from "./containers/Register/Register";
import RegisterForm from "./containers/Register/RegisterForm";
import logo from './assets/img/logo.png';

const App = () => {
  return (
    <div className="App">
      <div className="login_head_logo">
      <img src={logo} alt="Girl in a jacket" className="login_logo"/>
      </div>
      <Login />
      <RecoveryPassEnter />
      <RecoveryPassSentCode />
      <RecoveryPassCode />
      <RecoveryNewPass />
      <Register />
      <RegisterForm />
    </div>
  );
};

export default App;
