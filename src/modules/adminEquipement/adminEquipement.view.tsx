import EquipementTable from "../../components/equipements/EquipementTable";
import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";

const AdminEquipementView = () => {
  return (
    <Container className="flex flex-col mt-16 gap-10">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">Liste des équipements</h1>
        <Button type="main" link={true} to="/dashboard/addEquipement">
          Ajouter un équipement
        </Button>
      </div>
      <div>
        <EquipementTable />
      </div>
    </Container>
  );
};

export default AdminEquipementView;
