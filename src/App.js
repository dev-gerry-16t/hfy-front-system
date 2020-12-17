import "./App.css";
import Login from "./containers/Login/login";
import logo from './assets/img/logo.png';

const App = () => {
  return (
    <div className="App">
      <div className="login_head_logo">
      <img src={logo} alt="Girl in a jacket" className="login_logo"/>
      </div>
      <Login />
    </div>
  );
};

export default App;
