import logo from "../../public/assets/logo/logo2.png";
import { useNavigation } from "../hooks/useNavigation";

export const MainHomePage = () => {
  const {
    goToInvoicesModule
  } = useNavigation();
  return (
    <div className="app">
      <div className="main-logo">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="login-container">
        <div onClick={goToInvoicesModule}>Logowanie....(click)</div>
      </div>
    </div>
  );
};
