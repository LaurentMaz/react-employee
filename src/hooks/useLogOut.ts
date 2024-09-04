import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useLogOut = () => {
  const navigate = useNavigate();

  const logOut = () => {
    Cookies.remove("token");
    navigate("/"); // Utilisation de navigate pour rediriger l'utilisateur
  };
  return logOut;
};

export default useLogOut;
