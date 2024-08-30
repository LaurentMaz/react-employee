import { useNavigate, useParams } from "react-router-dom";
import Input from "../UI/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import useFetchCurrentAdmin from "../../hooks/useFetchCurrentAdmin";
import Button from "../UI/Button";

const UpdateAdmin = () => {
  const [adminChecked, setAdminChecked] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const { isCurrentSuperAdmin } = useFetchCurrentAdmin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit !");
    axios
      .put(`http://localhost:3000/auth/update_admin/${id}`, {
        email,
        adminChecked,
        password,
      })
      .then(() => {
        navigate("/dashboard");
        toast.success("Admin modifiée");
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "password") setPassword(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/auth/admin/${id}`)
      .then((result) => {
        if (result.data.Status) {
          setEmail(result.data.Result[0].email);
          setAdminChecked(result.data.Result[0].isSuperAdmin);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-[50%] m-auto items-center justify-center mt-10"
    >
      <Input
        isLabel={true}
        label="Email"
        name="email"
        type="text"
        onChange={handleChange}
        value={email}
      />
      <Input
        isLabel={true}
        label="Nouveau mot de passe"
        name="password"
        type="password"
        onChange={handleChange}
      />
      {isCurrentSuperAdmin ? (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            checked={adminChecked}
            onChange={() => setAdminChecked(!adminChecked)}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Super Admin
          </span>
        </label>
      ) : (
        ""
      )}

      <div className="flex gap-5">
        <Button type="danger" link={true} to="/dashboard">
          Annuler
        </Button>
        <Button submit={true} type="main">
          Modifier
        </Button>
      </div>
    </form>
  );
};

export default UpdateAdmin;
