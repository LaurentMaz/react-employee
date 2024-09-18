import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";

const UpdateCategory = () => {
  const { id, name } = useParams();
  const [category, setCategory] = useState<string>(name ? name : "");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/auth/update_category", { category, id })
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/category");
          toast.success("Catégorie modifiée");
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
        <Button type="danger" link={true} to="/dashboard/category">
          Annuler
        </Button>
        <Button type="main" submit={true}>
          Modifier
        </Button>
      </div>
    </form>
  );
};

export default UpdateCategory;
