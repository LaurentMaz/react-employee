import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const useApiClient = () => {
  const navigate = useNavigate();

  // Créez une instance d'axios
  const apiClient = axios.create({
    baseURL: "http://localhost:3000/employee",
  });

  // Intercepteur de réponse
  apiClient.interceptors.response.use(
    (response) => {
      return response; // Retourne la réponse si tout va bien
    },
    (error) => {
      // Vérifiez si l'erreur est due à un token expiré
      if (error.response) {
        if (
          error.response.status == "401" &&
          error.response.data.Error.message == "jwt expired"
        ) {
          Cookies.remove("token"); // Supprimez le token
          navigate("/"); // Redirigez l'utilisateur vers la page de connexion
        }
      } else {
        console.log("Error:", error.message);
      }

      return Promise.reject(error); // Rejetez l'erreur pour le traitement ultérieur
    }
  );

  return apiClient;
};
