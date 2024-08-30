import { useEffect, useState } from "react";
import useFetchEmployees from "../../hooks/useFetchEmployees";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Container from "../UI/Container";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { EquipementType } from "../../types/types";
import { toast } from "react-toastify";

const UpdateEquipement = () => {
  const { employees } = useFetchEmployees();
  const [equipement, setEquipement] = useState<EquipementType>({
    brand: "",
    name: "",
    ram: "",
    proc: "",
    serial: "",
    date_service: "",
    employee_id: null,
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/equipements/${id}`)
      .then((result) => {
        setEquipement(result.data.Result[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/update_equipement", {
        equipement: equipement,
        id: id,
      })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/equipement");
          toast.success("Equipement modifié");
        } else {
          console.log(result.data.Error);
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
                value={equipement.brand}
              />
              <Input
                type="text"
                isLabel={true}
                label="Nom de la machine"
                name="name"
                onChange={handleChange}
                isRequired={true}
                value={equipement.name}
              />
              <Input
                type="text"
                isLabel={true}
                label="Numéro de série"
                name="serial"
                onChange={handleChange}
                isRequired={true}
                value={equipement.serial}
              />
              <Input
                type="date"
                isLabel={true}
                label="Date d'achat"
                name="date_service"
                onChange={handleChange}
                isRequired={true}
                value={equipement.date_service}
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
                  <option value="">-- Non attribué --</option>
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
                value={equipement.ram}
              />
              <Input
                type="text"
                isLabel={true}
                label="Processeur"
                name="proc"
                onChange={handleChange}
                isRequired={true}
                value={equipement.proc}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-5">
          <Button type="danger" onClick={() => navigate(-1)}>
            Annuler
          </Button>
          <Button type="main" submit={true}>
            Modifier
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default UpdateEquipement;
