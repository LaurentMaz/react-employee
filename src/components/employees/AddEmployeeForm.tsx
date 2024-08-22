import { useState } from "react";
import useFetchCategories from "../../hooks/useFetchCategories";
import Input from "../Input";
import { employeeType } from "../../types/types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddEmployeeForm = () => {
  const { categories, loading, error } = useFetchCategories();
  const [employee, setEmployee] = useState<employeeType>({
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category: null,
    picture: "",
  });
  const navigate = useNavigate();

  if (error) console.log(error);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    /**
     * Add employee's state data into FormData because of file management needs
     */
    const formData = new FormData();
    for (const key in employee) {
      formData.append(key, employee[key as keyof typeof employee] as any);
    }

    axios
      .post("http://localhost:3000/auth/add_employee", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/employee");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

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
      />
      <Input
        isLabel={true}
        label="Prénom"
        name="firstName"
        type="text"
        onChange={handleChange}
      />
      <Input
        isLabel={true}
        label="Email"
        name="email"
        type="email"
        onChange={handleChange}
      />
      <Input
        isLabel={true}
        label="Mot de passe"
        name="password"
        type="password"
        onChange={handleChange}
      />
      <Input
        isLabel={true}
        label="Salaire"
        name="salary"
        type="number"
        onChange={handleChange}
      />
      <Input
        isLabel={true}
        label="Adresse"
        name="address"
        type="string"
        onChange={handleChange}
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
            value={employee.category !== null ? employee.category : ""}
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

      <Input
        isLabel={true}
        label="Photo"
        name="picture"
        type="file"
        onChange={handleChange}
      />

      <button className="bg-teal-500 hover:bg-teal-400 rounded p-2 font-bold text-white w-full">
        Ajouter
      </button>
      {/* {loginError && <span className="text-red-500">{loginError}</span>} */}
    </form>
  );
};

export default AddEmployeeForm;
