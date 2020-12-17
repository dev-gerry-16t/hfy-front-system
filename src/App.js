import "./App.css";
import LoginDemo from "./containers/Login/login";
import GLOBAL_CONSTANTS from "./utils/constants/gobalConstants";

const App = () => {
  return (
    <div className="App">
      <LoginDemo />
      {GLOBAL_CONSTANTS.VERSION}
    </div>
  );
};

export default App;
