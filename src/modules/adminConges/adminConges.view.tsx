import CongesTable from "../../components/CongesTable";
import Container from "../../components/UI/Container";
import { CongeType } from "../../types/types";

interface adminCongesViewProps {
  allConges: CongeType[];
  fetchConges: () => void;
}

const AdminCongesView = ({ allConges, fetchConges }: adminCongesViewProps) => {
  return (
    <Container className="flex flex-col gap-5">
      <div className="flex gap-20">
        <div>
          <h2 className="text-2xl font-bold">Liste des congés</h2>
        </div>
      </div>
      <div>
        {allConges.length > 0 && (
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

export default AdminCongesView;
