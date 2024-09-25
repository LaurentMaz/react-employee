import { useEffect, useState } from "react";
import Container from "../../components/UI/Container";
import Input from "../../components/UI/Input";
import useFetchCategories from "../../hooks/useFetchCategories";
import { EquipementType, TicketsType } from "../../types/types";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useApiClient } from "../../axios";

const AddTicketForm = () => {
  const { categories } = useFetchCategories();
  const [ticket, setTicket] = useState<TicketsType>({
    titre: "",
    details: "",
    service: null,
    statut: "En attente",
    id_machine: null,
    urgence: null,
    emp_related: null,
  });
  const [equipements, setEquipements] = useState<EquipementType[]>();

  const navigate = useNavigate();
  const apiClient = useApiClient();

  useEffect(() => {
    apiClient
      .get("/equipements/")
      .then((result) => {
        if (result.data.Status) setEquipements(result.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target;

    if (e.target.name == "id_machine" && e.target.value == "") {
      setTicket({ ...ticket, id_machine: null });
    } else {
      setTicket({ ...ticket, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    apiClient
      .post("/add_ticket", ticket)
      .then((result) => {
        if (result.data.Status) {
          navigate("/home/tickets");
          toast.success("Ticket crée");
        } else {
          toast.error(result.data.ErrorMessage);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold">Nouveau ticket</h1>
      </div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Titre de la demande"
          name="titre"
          label="Titre"
          isLabel={true}
          value={ticket.titre}
          onChange={handleChange}
          isRequired={true}
        />
        <div>
          <label className="font-semibold" htmlFor="details">
            Détails
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="details"
            placeholder="Détails de la demande"
            id="details"
            value={ticket.details}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label className="font-semibold" htmlFor={"category"}>
            Service concerné:
          </label>
          <select
            onChange={(e) => handleChange(e)}
            value={ticket.service !== null ? ticket.service : ""}
            name="service"
            id="service"
            required
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""} disabled>
              -- Choisir un service --
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="font-semibold" htmlFor={"category"}>
            Urgence :
          </label>
          <select
            onChange={(e) => handleChange(e)}
            value={ticket.urgence !== null ? ticket.urgence : ""}
            name="urgence"
            id="urgence"
            required
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""} disabled>
              -- Choisir une urgence --
            </option>
            <option value="Faible">Faible</option>
            <option value="Modérée">Modérée</option>
            <option value="Urgent">Urgent</option>
            <option value="Aujourd'hui">Aujourd'hui</option>
          </select>
        </div>
        <div>
          <label className="font-semibold" htmlFor={"category"}>
            Equipement concerné:
          </label>
          <select
            onChange={(e) => handleChange(e)}
            value={ticket.id_machine !== null ? ticket.id_machine : ""}
            name="id_machine"
            id="id_machine"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""}>Aucun équipement concerné</option>
            {equipements?.map((equipement) => (
              <option key={equipement.id} value={equipement.id}>
                {equipement.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3">
          <Button type="danger" link={true} to="/home/tickets">
            Annuler
          </Button>
          <Button type="main" submit={true}>
            Envoyer
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AddTicketForm;
