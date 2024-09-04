import { useEffect, useState } from "react";
import Container from "../../components/UI/Container";
import { CongeType } from "../../types/types";
import { useApiAdmin } from "../../axios";
import CongesTable from "../../components/conges/CongesTable";

const AdminConges = () => {
  const [congePending, setCongePending] = useState<CongeType[]>();
  const apiAdmin = useApiAdmin();

  const fetchConges = () => {
    apiAdmin
      .get("/congesAll")
      .then((result) => {
        setCongePending(result.data.Result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchConges();
  }, []);
  return (
    <Container className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-bold">Liste des congés</h2>
      </div>
      <div>
        {congePending && (
          <CongesTable
            conges={congePending}
            fullDisplay={true}
            admin={true}
            fetchParentData={fetchConges}
          />
        )}
      </div>
    </Container>
  );
};

export default AdminConges;
