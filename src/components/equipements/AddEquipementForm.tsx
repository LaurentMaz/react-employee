import { useState } from "react";
import { EquipementType } from "../../types/types";
import Input from "../UI/Input";
import Container from "../UI/Container";
import useFetchEmployees from "../../hooks/useFetchEmployees";
import Button from "../UI/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddEquipementForm = () => {
  const { employees } = useFetchEmployees();
  const [equipement, setEquipement] = useState<EquipementType>({
    brand: "",
    name: "",
    type: "",
    ram: "",
    proc: "",
    serial: "",
    date_service: "",
    employee_id: null,
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/add_equipement", equipement)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/equipement");
          toast.success("Equipement ajouté");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value === "" ? null : e.target.value;
    setEquipement({ ...equipement, [e.target.name]: value });
  };
  return (
    <Container className="justify-start">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 w-full m-auto items-center justify-start mt-10"
      >
        <div className="flex w-full gap-10">
          <div className=" flex flex-col gap-5 w-full justify-start">
            <h2 className="text-xl font-bold text-teal-500">
              Identifiants machine
            </h2>
            <div className="flex flex-col gap-5 w-full">
              <Input
                type="text"
                isLabel={true}
                label="Marque"
                name="brand"
                onChange={handleChange}
                isRequired={true}
              />
              <Input
                type="text"
                isLabel={true}
                label="Nom de la machine"
                name="name"
                onChange={handleChange}
                isRequired={true}
              />
              <Input
                type="text"
                isLabel={true}
                label="Numéro de série"
                name="serial"
                onChange={handleChange}
                isRequired={true}
              />
              <Input
                type="date"
                isLabel={true}
                label="Date d'achat"
                name="date_service"
                onChange={handleChange}
                isRequired={true}
              />

              <div>
                <label className="font-semibold" htmlFor={"category"}>
                  Utilisateur:
                </label>
                <select
                  onChange={handleChange}
                  value={equipement.employee_id ? equipement.employee_id : ""}
                  name="employee_id"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={""} disabled>
                    -- Choisir un utilisateur --
                  </option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.firstName + " " + employee.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-5 w-full justify-start">
            <h2 className="text-xl font-bold text-teal-500">Compo machine</h2>
            <div className="flex flex-col gap-5 w-full">
              <Input
                type="number"
                isLabel={true}
                label="RAM(Go)"
                name="ram"
                onChange={handleChange}
                isRequired={true}
              />
              <Input
                type="text"
                isLabel={true}
                label="Processeur"
                name="proc"
                onChange={handleChange}
                isRequired={true}
              />
              <div>
                <label className="font-semibold" htmlFor={"category"}>
                  Type de machine :
                </label>
                <select
                  onChange={handleChange}
                  value={equipement.type ? equipement.type : ""}
                  name="type"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value={""} disabled>
                    -- Choisir un type --
                  </option>
                  <option value={"laptop"}>Oridnateur portable</option>
                  <option value={"desktop"}>Ordinateur fixe</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5">
          <Button type="danger" link={true} to="/dashboard/equipement">
            Annuler
          </Button>
          <Button type="main" submit={true}>
            Ajouter
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AddEquipementForm;
