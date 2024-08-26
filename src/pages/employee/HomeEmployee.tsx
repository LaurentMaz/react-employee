import Container from "../../components/UI/Container";
import useEmployeeContext from "../../hooks/useEmployeeContext";
import { MdOutlineWavingHand } from "react-icons/md";

const HomeEmployee = () => {
  const { employee } = useEmployeeContext();

  return (
    <Container>
      <div className="flex text-lg items-center justify-center gap-2">
        Bonjour {employee?.firstName}{" "}
        <span className="text-2xl">
          <MdOutlineWavingHand />
        </span>
      </div>
    </Container>
  );
};

export default HomeEmployee;
