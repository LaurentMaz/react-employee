import { useEffect, useState } from "react";
import { CongeType } from "../../types/types";
import { useApiAdmin } from "../../axios";
import AdminCongesView from "./adminConges.view";

const AdminCongesController = () => {
  const [allConges, setAllconges] = useState<CongeType[]>([]);
  const apiAdmin = useApiAdmin();

  const fetchConges = () => {
    apiAdmin
      .get("/congesAll")
      .then((result) => {
        setAllconges(result.data.Result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchConges();
  }, []);
  return (
    <>
      <AdminCongesView allConges={allConges} fetchConges={fetchConges} />
    </>
  );
};

export default AdminCongesController;
