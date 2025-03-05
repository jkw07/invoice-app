import logo from "../../public/assets/logo/logo2.png";
//import { useNavigation } from "../hooks/useNavigation";

export const MainHomePage = () => {
  //const { goToInvoicesModule } = useNavigation();
  const handleAddClient = () => {
    if (!window.api || !window.api.createClient) {
      console.error("window.api.createClient is not defined!");
      return;
    }
    window.api.createClient(
      "Jan Kowalski",
      "ul. Nowa 10, 00-00 Kraków",
      "jan@example.com",
      "123456789",
      1
    );
    setTimeout(async () => {
      const updatedClients = await window.api.getClients();
      console.log("Lista klientów po dodaniu:", updatedClients);
    }, 500);
  };
  return (
    <div className="app">
      <div className="main-logo">
        <img src={logo} alt="logo"></img>
      </div>
      <div className="login-container">
        <div onClick={handleAddClient}>Logowanie....(click)</div>
      </div>
    </div>
  );
};
