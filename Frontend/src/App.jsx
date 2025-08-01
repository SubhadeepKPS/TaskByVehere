import "./App.css";
import Signup from "./Signup";
import Login from "./LoginPage";
import Dashboard from "./Dashboard";
import appStore from "./utils/appStore";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={appStore}>
      <>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <div>
            <Signup />
          </div>
          <div>
            <Login />
          </div>
        </div>
        <div>
          <Dashboard />
        </div>
      </>
    </Provider>
  );
}

export default App;
