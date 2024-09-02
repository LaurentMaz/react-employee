import EmployeeEquipements from "../../components/employees/EmployeeEquipements";
import Container from "../../components/UI/Container";
import useEmployeeContext from "../../hooks/useEmployeeContext";
import { MdOutlineWavingHand } from "react-icons/md";

const HomeEmployee = () => {
  const { logedEmployee } = useEmployeeContext();

  return (
    <Container className="flex-col justify-start items-start gap-10">
      <div className="flex text-lg items-center justify-center gap-2">
        Bonjour {logedEmployee?.firstName}{" "}
        <span className="text-2xl">
          <MdOutlineWavingHand className="font-bold" />
        </span>
      </div>
      <div>
        <h2 className="text-xl font-bold">Vos équipements</h2>
        <EmployeeEquipements />
      </div>
      <div>
        <h2 className="text-xl font-bold">Vos congés</h2>
      </div>
    </Container>
  );
};

export default HomeEmployee;
