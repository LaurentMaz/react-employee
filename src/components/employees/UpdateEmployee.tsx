import { useEffect, useState } from "react";
import useFetchCategories from "../../hooks/useFetchCategories";
import { employeeType } from "../../types/types";
import Input from "../UI/Input";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const UpdateEmployee = () => {
  const { categories, loading, error } = useFetchCategories();
  if (error) console.log(error);
  const navigate = useNavigate();
  const { id } = useParams();

  const [employee, setEmployee] = useState<employeeType>({
    id: 0,
    lastName: "",
    firstName: "",
    email: "",
    // password: "",
    salary: "",
    address: "",
    category: null,
    // picture: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/employee/${id}`)
      .then((result) => {
        if (result.data.Status) {
          console.log(result.data.result);
          setEmployee({
            ...employee,
            id: result.data.Result[0].id,
            firstName: result.data.Result[0].firstName,
            lastName: result.data.Result[0].lastName,
            email: result.data.Result[0].email,
            // password: result.data.Result[0].password,
            salary: result.data.Result[0].salary,
            address: result.data.Result[0].address,
            category: result.data.Result[0].category_id,
            // picture: result.data.Result[0].picture,
          });
        } else {
          console.log("Une erreur innatendue est survenue");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.type === "file" && e.target instanceof HTMLInputElement) {
      const file = e.target.files ? e.target.files[0] : null;
      setEmployee({ ...employee, [e.target.name]: file });
    } else {
      const value = e.target.value === "" ? null : e.target.value;
      setEmployee({ ...employee, [e.target.name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3000/auth/update_employee/${id}`, employee)
      .then((result) => {
        navigate("/dashboard/employee");
        toast.success("Employé modifié");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-[50%] m-auto items-center justify-center mt-10"
    >
      <Input
        isLabel={true}
        label="Nom"
        name="lastName"
        type="text"
        onChange={handleChange}
        value={employee.lastName}
      />
      <Input
        isLabel={true}
        label="Prénom"
        name="firstName"
        type="text"
        onChange={handleChange}
        value={employee.firstName}
      />
      <Input
        isLabel={true}
        label="Email"
        name="email"
        type="email"
        onChange={handleChange}
        value={employee.email}
      />
      {/* <Input
        isLabel={true}
        label="Mot de passe"
        name="password"
        type="password"
        onChange={handleChange}
        value={employee.password}
      /> */}
      <Input
        isLabel={true}
        label="Salaire (€)"
        name="salary"
        type="number"
        onChange={handleChange}
        value={employee.salary}
      />
      <Input
        isLabel={true}
        label="Adresse"
        name="address"
        type="string"
        onChange={handleChange}
        value={employee.address}
      />
      <div className="w-full">
        <label className="font-semibold" htmlFor={"category"}>
          Catégorie:
        </label>
        {loading ? (
          "Chargement des catégories..."
        ) : (
          <select
            onChange={handleChange}
            value={employee?.category !== null ? employee?.category : ""}
            name="category"
            id="category"
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value={""} disabled>
              -- Choisir une catégorie --
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* <Input
        isLabel={true}
        label="Photo"
        name="picture"
        type="file"
        onChange={handleChange}
      />
      <div className="w-full flex justify-start items-start">
        <img
          className="w-[150px]"
          src={"http://localhost:3000/images/" + employee.picture}
          alt=""
        />
      </div> */}

      <div className="flex gap-5">
        <button className="bg-red-500 hover:bg-red-400 rounded p-2 font-bold text-white w-full">
          <Link to={"/dashboard/employee"}>Annuler</Link>
        </button>
        <button className="bg-teal-500 hover:bg-teal-400 rounded p-2 font-bold text-white w-full">
          Modifier
        </button>
      </div>
    </form>
  );
};

export default UpdateEmployee;
