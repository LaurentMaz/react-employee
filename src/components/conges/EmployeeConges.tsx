import useEmployeeContext from "../../hooks/useEmployeeContext";
import Button from "../UI/Button";
import Container from "../UI/Container";

const EmployeeConges = () => {
  const { congesAvalaible } = useEmployeeContext();
  return (
    <Container className="flex flex-col gap-5">
      <div className="shadow-lg p-10 rounded">
        <span className="text-xl font-bold">
          Total congés disponibles pour l'année en cours:{" "}
          <span className="text-teal-500 text-4xl">{congesAvalaible}</span>
        </span>
      </div>
      <div className="flex flex-col gap-10 w-full items-start justify-center mt-10">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex gap-10">
            <h2 className="text-2xl font-bold">
              Mes demandes de congés en cours
            </h2>
            <Button type="main" link={true} to="/home/add_conges">
              Faire une demande de congés
            </Button>
          </div>

          <div>
            <div>CONGES 1</div>
            <div>CONGES 2</div>
            <div>CONGES 3</div>
          </div>
        </div>

        <div className="flex w-full gap-10">
          <div className="flex flex-col gap-5 flex-1">
            <h2 className="text-2xl font-bold">Mes congés validés</h2>
            <div>
              <div>CONGES 1</div>
              <div>CONGES 2</div>
              <div>CONGES 3</div>
            </div>
          </div>
          <div className="flex flex-col gap-5 flex-1">
            <h2 className="text-2xl font-bold">Mes congés refusés</h2>
            <div>
              <div>CONGES 1</div>
              <div>CONGES 2</div>
              <div>CONGES 3</div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EmployeeConges;
