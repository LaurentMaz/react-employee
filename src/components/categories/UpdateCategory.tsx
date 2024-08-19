import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../Input";
import { useState } from "react";

const UpdateCategory = () => {
  const { id, name } = useParams();
  const [category, setCategory] = useState<string>(name ? name : "");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/auth/update_category", { category, id })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 w-[50%] m-auto items-center justify-center mt-10"
    >
      <Input
        isLabel={true}
        label="Catégorie"
        name="category"
        type="text"
        onChange={handleChange}
        value={category}
      />

      <div className="flex gap-5">
        <button className="bg-red-500 hover:bg-red-400 rounded p-2 font-bold text-white w-full">
          <Link to={"/dashboard/category"}>Annuler</Link>
        </button>
        <button className="bg-teal-500 hover:bg-teal-400 rounded p-2 font-bold text-white w-full">
          Modifier
        </button>
      </div>

      {/* {loginError && <span className="text-red-500">{loginError}</span>} */}
    </form>
  );
};

export default UpdateCategory;
