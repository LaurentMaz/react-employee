import { useEffect, useState } from "react";
import axios from "axios";

const useFetchCurrentAdmin = () => {
  const [currentAdminId, setCurrentAdminId] = useState();
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
          setCurrentAdminId(result.data.Result.id);
        } else {
          console.log(result.data.Error);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCurrentAdmin();
  }, []);

  return {
    currentAdminEmail,
    setCurrentAdminEmail,
    isCurrentSuperAdmin,
    currentAdminId,
  };
};

export default useFetchCurrentAdmin;
