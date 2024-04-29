import "./App.css";
//const css = require("./App.css");
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage";
import SignInPage from "./pages/SignInPage";
import Dashboard from "./pages/Dashboard";
import CreateClient from "./pages/CreateClient";
import Clients from "./pages/Clients";
import ForgotPassword from "./pages/ForgotPassword"
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/createclient" element={<CreateClient />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/reset-password/change-password" element={<ChangePassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
