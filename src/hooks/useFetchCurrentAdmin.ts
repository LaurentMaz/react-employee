import { useEffect, useState } from "react";
import axios from "axios";

const useFetchCurrentAdmin = () => {
  const [currentAdminEmail, setCurrentAdminEmail] = useState("");
  const [isCurrentSuperAdmin, setIsCurrentSuperAdmin] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const fetchCurrentAdmin = async () => {
      try {
        const result = await axios.get(
          `http://localhost:3000/auth/currentAdmin`
        );
        if (result.data.Status) {
          setCurrentAdminEmail(result.data.Result.email);
          setIsCurrentSuperAdmin(result.data.Result.isSuperAdmin);
        } else {
          console.log(result.data.Error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrentAdmin();
  }, []);

  return { currentAdminEmail, setCurrentAdminEmail, isCurrentSuperAdmin };
};

export default useFetchCurrentAdmin;
