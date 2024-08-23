import Container from "../components/UI/Container";
import useEmployeeContext from "../hooks/useEmployeeContext";

const EmployeeDetail = () => {
  const { FetchEmpError, employee } = useEmployeeContext();

  return (
    <Container>
      {FetchEmpError ? (
        <div>Erreur: {FetchEmpError}</div>
      ) : (
        <div>
          {employee && (
            <div>
              <h1>
                {employee.firstName} {employee.lastName}
              </h1>
              {/* Affichez d'autres informations sur l'employé ici */}
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default EmployeeDetail;
