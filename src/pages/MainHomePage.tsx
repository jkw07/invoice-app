import logo from "../../public/assets/logo/logo1mini.png";
import { LoginForm } from "../components/LoginForm";

export const MainHomePage = () => {
  return (
    <div className="app">
      <div className="main-logo">
        <img src={logo} alt="logo"></img>
      </div>
      <h1>Faktury</h1>
      <LoginForm />
    </div>
  );
};
