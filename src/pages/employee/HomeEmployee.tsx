import axios from "axios";
import EmployeeEquipements from "../../components/employees/EmployeeEquipements";
import Container from "../../components/UI/Container";
import useEmployeeContext from "../../hooks/useEmployeeContext";
import { MdOutlineWavingHand } from "react-icons/md";
import { useEffect, useState } from "react";
import { CongeType } from "../../types/types";
import CongesTable from "../../components/CongesTable";

const HomeEmployee = () => {
  const { logedEmployee } = useEmployeeContext();
  const [congesPending, setCongesPending] = useState<CongeType[]>();

  const fetchPendingConges = () => {
    axios
      .get("http://localhost:3000/employee/conges")
      .then((result) => setCongesPending(result.data.Result))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPendingConges();
  }, []);

  return (
    <Container className="flex-col justify-start items-start gap-10">
      <div className="flex text-lg items-center justify-center gap-2">
        Bonjour {logedEmployee?.firstName}{" "}
        <span className="text-2xl">
          <MdOutlineWavingHand className="font-bold" />
        </span>
      </div>
      <div>
        <h2 className="text-xl font-bold">Mes équipements</h2>
        <EmployeeEquipements />
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-bold">Mes congés</h2>
        <div>
          {congesPending && (
            <CongesTable conges={congesPending} fullDisplay={false} />
          )}
        </div>
      </div>
    </Container>
  );
};

export default HomeEmployee;
