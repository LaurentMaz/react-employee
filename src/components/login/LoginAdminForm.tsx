import { useState } from "react";
import Input from "../Input";
import { loginType } from "../../types/types";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const LoginAdminForm = () => {
  const [loginValues, setLoginValues] = useState<loginType>({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState();

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetEl = e.target.name;
    const targetValue = e.target.value;
    setLoginValues({
      ...loginValues,
      [targetEl]: targetValue,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/adminlogin", loginValues)
      .then((result) => {
        if (result.data.loginStatus) {
          navigate("/dashboard");
        } else {
          setLoginError(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-[60%] m-auto items-center justify-center"
    >
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
      <button className="bg-teal-500 hover:bg-teal-400 rounded p-2 font-bold text-white w-full">
        Connexion
      </button>
      <Link className="text-xs" to={"/employeeLogin"}>
        Employé ?
      </Link>
      <div className="h-5">
        {loginError && <span className="text-red-500">{loginError}</span>}
      </div>
    </form>
  );
};

export default LoginAdminForm;
