import { useEffect, useState } from "react";
import useFetchCategories from "../../hooks/useFetchCategories";
import { employeeType } from "../../types/types";
import Input from "../UI/Input";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Button from "../UI/Button";

interface UpdateEmployeeProps {
  from: string;
}

const UpdateEmployee = ({ from }: UpdateEmployeeProps) => {
  const { categories, loading, error } = useFetchCategories();
  if (error) console.log(error);
  const navigate = useNavigate();

  const { id } = useParams();

  const [employee, setEmployee] = useState<employeeType>({
    id: 0,
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category: null,
    picture: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (from == "admin") {
      axios
        .get(`http://localhost:3000/auth/employee/${id}`)
        .then((result) => {
          if (result.data.Status) {
            setEmployee({
              ...employee,
              id: result.data.Result[0].id,
              firstName: result.data.Result[0].firstName,
              lastName: result.data.Result[0].lastName,
              email: result.data.Result[0].email,
              salary: result.data.Result[0].salary,
              address: result.data.Result[0].address,
              category: result.data.Result[0].category_id,
              picture: result.data.Result[0].picture,
            });
          }
        })
        .catch((err) => console.log(err));
    } else if (from == "employee") {
      axios
        .get(`http://localhost:3000/employee/detail`)
        .then((result) => {
          if (result.data.Status) {
            setEmployee({
              ...employee,
              id: result.data.Result.id,
              firstName: result.data.Result.firstName,
              lastName: result.data.Result.lastName,
              email: result.data.Result.email,
              salary: result.data.Result.salary,
              address: result.data.Result.address,
              category: result.data.Result.category_id,
              picture: result.data.Result.picture,
            });
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.type === "file" && e.target instanceof HTMLInputElement) {
      const file = e.target.files ? e.target.files[0] : null;
      setSelectedFile(file);
    } else {
      const value = e.target.value === "" ? null : e.target.value;
      setEmployee({ ...employee, [e.target.name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", employee.firstName);
    formData.append("lastName", employee.lastName);
    formData.append("email", employee.email);
    formData.append("salary", employee.salary);
    formData.append("address", employee.address);
    formData.append("category", employee.category?.toString() || "");
    if (employee.password) {
      formData.append("password", employee.password);
    }
    if (selectedFile) {
      formData.append("picture", selectedFile);
    }

    axios
      .put(`http://localhost:3000/auth/update_employee/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        from === "admin" ? navigate("/dashboard/employee") : navigate("/home");
        toast.success("Données modifiés");
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
      <Input
        isLabel={true}
        label="Mot de passe"
        name="password"
        type="password"
        onChange={handleChange}
      />

      <Input
        isLabel={true}
        label="Salaire (€)"
        name="salary"
        type="number"
        onChange={handleChange}
        value={employee.salary}
        disabled={from === "employee"}
      />
      <Input
        isLabel={true}
        label="Adresse"
        name="address"
        type="text"
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
            disabled={from === "employee"}
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

      <Input
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
      </div>

      <div className="flex gap-5">
        {from !== "profil" && (
          <Button type="danger" onClick={() => navigate(-1)}>
            Annuler
          </Button>
        )}
        <Button type="main" submit={true}>
          Modifier
        </Button>
      </div>
    </form>
  );
};

export default UpdateEmployee;
