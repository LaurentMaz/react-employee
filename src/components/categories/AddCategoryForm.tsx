import { useState } from "react";
import Input from "../Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCategoryForm = () => {
  const [category, setCategory] = useState<string>();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
    console.log("submit");
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
      />

      <button className="bg-teal-500 hover:bg-teal-400 rounded p-2 font-bold text-white w-full">
        Ajouter
      </button>
      {/* {loginError && <span className="text-red-500">{loginError}</span>} */}
    </form>
  );
};

export default AddCategoryForm;
