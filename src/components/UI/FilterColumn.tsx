import { Dispatch, SetStateAction } from "react";
import { filterMenuType } from "../../types/types";
import Button from "./Button";
import SearchBar from "./SearchBar";

interface FilterColumnProps {
  filterMenu: filterMenuType;
  setFilterMenu: Dispatch<SetStateAction<filterMenuType>>;
  setFilterEmployee: Dispatch<SetStateAction<string>>;
  filterEmployee: string;
}

const FilterColumn = ({
  filterMenu,
  setFilterMenu,
  setFilterEmployee,
  filterEmployee,
}: FilterColumnProps) => {
  return (
    <div
      className="flex flex-col gap-5 fixed top-[30%] left-[50%] bg-white px-10 py-2 rounded shadow-lg w-[40%]"
      style={{
        transform: "translate(-50%, -50%)", // Centre horizontalement et verticalement
        zIndex: 1000,
      }}
    >
      <div>
        <SearchBar
          setData={setFilterEmployee}
          placeholder="Rechercher par nom ou prénom"
          value={filterEmployee}
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="danger"
          onClick={() => setFilterMenu({ ...filterMenu, visible: false })}
        >
          Fermer
        </Button>
        <Button
          type="main"
          onClick={() => setFilterMenu({ ...filterMenu, visible: false })}
        >
          Valider
        </Button>
      </div>
    </div>
  );
};

export default FilterColumn;
