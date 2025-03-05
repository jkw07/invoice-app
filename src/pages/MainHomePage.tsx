import logo from "../../public/assets/logo/logo1mini.png";
import { useNavigation } from "../hooks/useNavigation";
import { LoginForm } from "../components/LoginForm";

export const MainHomePage = () => {
  const { goToInvoicesModule } = useNavigation();
  return (
    <div className="app">
      <div className="main-logo">
        <img src={logo} alt="logo"></img>
      </div>
      <h1>Faktury</h1>
      <div className="login-container">
        <div onClick={goToInvoicesModule}>Logowanie....(click)</div>
        <LoginForm />
      </div>
    </div>
  );
};
