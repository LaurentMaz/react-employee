import { useRef, useState } from "react";
import Input from "./Input";
import axios from "axios";
import { employeeType } from "../../types/types";

interface SearchBarProps {
  data?: employeeType[];
  setData: any;
}

const SearchBar = ({ data, setData }: SearchBarProps) => {
  const [searchValue, setsearchValue] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setsearchValue(e.target.value);

    // Annule le timeout précédent s'il existe
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // Définit un nouveau timeout pour déclencher l'appel API après un délai
    timeoutRef.current = setTimeout(() => {
      axios
        .get("http://localhost:3000/auth/searchEmployee", {
          params: { searchValue: e.target.value },
        })
        .then((result) => {
          console.log(result);

          setData(result.data.Result);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }, 1000); // Délai de 1000ms
  };

  const timeoutRef = useRef<number | null>(null);

  return (
    <div>
      <Input
        onChange={handleChange}
        value={searchValue}
        type="text"
        name="search"
        placeholder="Rechercher un employé"
      />
    </div>
  );
};

export default SearchBar;
