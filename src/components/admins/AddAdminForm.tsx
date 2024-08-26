import { Link } from "react-router-dom";
import Container from "../UI/Container";
import AvailableEmployeeTable from "./AvailableEmployeeTable";
import { FaBackspace } from "react-icons/fa";

const AddAdminForm = () => {
  return (
    <Container className="flex flex-col gap-10">
      <div className="flex items-center gap-3">
        <Link to={"/dashboard"}>
          <FaBackspace className="text-2xl text-red-500 cursor-pointer" />
        </Link>

        <h2 className="text-xl font-bold">Ajouter des administrateur</h2>
      </div>

      <div>
        <div className="w-full flex flex-col gap-3">
          <label className="font-semibold" htmlFor={"category"}>
            Utilisateurs:
          </label>
          <div>
            <AvailableEmployeeTable />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddAdminForm;
