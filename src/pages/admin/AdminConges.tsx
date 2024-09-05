import { useEffect, useState } from "react";
import Container from "../../components/UI/Container";
import { CongeType } from "../../types/types";
import { useApiAdmin } from "../../axios";
import CongesTable from "../../components/conges/CongesTable";

const AdminConges = () => {
  const [allConges, setAllconges] = useState<CongeType[]>();
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
    <Container className="flex flex-col gap-5">
      <div className="flex gap-20">
        <div>
          <h2 className="text-2xl font-bold">Liste des congés</h2>
        </div>
      </div>
      <div>
        {allConges && (
          <CongesTable
            conges={allConges}
            fullDisplay={true}
            admin={true}
            fetchData={fetchConges}
          />
        )}
      </div>
    </Container>
  );
};

export default AdminConges;
