import axios from "axios";
import { CongeType } from "../../types/types";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useFetchCongeTypes from "../../hooks/useFetchCongeTypes";
import Container from "../../components/UI/Container";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const AddCongeForm = () => {
  const [congeItem, setCongeItem] = useState<CongeType>({
    congeTypesId: null,
    startDate: "",
    endDate: "",
    status: "En cours",
    reason: "",
  });

  const { congeTypes } = useFetchCongeTypes();

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/employee/add_conge", congeItem)
      .then((result) => {
        if (result.data.Status) {
          navigate("/home/conges");
          toast.success("Demande envoyée");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const value = e.target.value === "" ? null : e.target.value;
    setCongeItem({ ...congeItem, [e.target.name]: value });
  };

  return (
    <Container className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold">Demande de congé</h1>
      </div>
      <div className="w-[60%]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <div className="flex gap-5">
              <Input
                name="startDate"
                type="date"
                label="Date de début"
                isLabel={true}
                onChange={handleChange}
                isRequired={true}
              />
              <Input
                name="endDate"
                type="date"
                label="Date de fin"
                isLabel={true}
                isRequired={true}
                onChange={handleChange}
              />
            </div>
            <span className="text-teal-500">Jours comptés : 3</span>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor={"category"}>
              Type de congé :
            </label>
            <select
              onChange={handleChange}
              required
              value={congeItem.congeTypesId ? congeItem.congeTypesId : ""}
              name="congeTypesId"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={""} disabled>
                -- Choisir un type de congé --
              </option>
              {congeTypes.map((congeType) => (
                <option key={congeType.id} value={congeType.id}>
                  {congeType.name}
                </option>
              ))}
            </select>
          </div>
          <Input
            type="text"
            isLabel={true}
            label="Raison (optionnel)"
            onChange={handleChange}
            name="reason"
          />

          <div className="flex gap-5 mt-5">
            <Button type="danger" link={true} to="/home/conges">
              Annuler
            </Button>
            <Button type="main" submit={true}>
              Envoyer
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default AddCongeForm;
