import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const AddCategoryForm = () => {
  const [category, setCategory] = useState<string>();
  const navigate = useNavigate();

  const addCategory = () => {
    axios
      .post("http://localhost:3000/auth/add_category", { category })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
          toast.success("Catégorie ajoutée");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCategory();
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
        isRequired={true}
      />

      <div className="flex gap-5">
        <Button type="danger" link={true} to="/dashboard/category">
          Annuler
        </Button>
        <Button type="main" submit={true}>
          Ajouter
        </Button>
      </div>
    </form>
  );
};

export default AddCategoryForm;
