import { Dispatch, SetStateAction } from "react";
import { filterMenuType } from "../../types/types";
import Button from "./Button";
import SearchBar from "./SearchBar";
import RadioList from "./RadioList";

interface FilterColumnProps {
  filterMenu: filterMenuType;
  setFilterMenu: Dispatch<SetStateAction<filterMenuType>>;
}

const FilterColumn = ({ filterMenu, setFilterMenu }: FilterColumnProps) => {
  const { column, filterState, setFilterState } = filterMenu;

  const displayFilter = () => {
    switch (column) {
      case "employeeFullName":
        return (
          <div>
            <SearchBar
              setData={filterMenu.setFilterState}
              placeholder="Rechercher par nom ou prénom"
              value={filterMenu.filterState}
            />
          </div>
        );
      case "status":
        return (
          <div>
            <RadioList
              name="status"
              labels={["En cours", "Approuvé", "Rejeté", "Tous"]}
              setValue={setFilterState}
              value={filterState}
            />
          </div>
        );

      default:
        break;
    }
  };

  return (
    <div
      className="flex flex-col gap-5 fixed top-[30%] left-[50%] bg-white px-10 py-2 rounded shadow-lg w-[40%]"
      style={{
        transform: "translate(-50%, -50%)", // Centre horizontalement et verticalement
        zIndex: 1000,
      }}
    >
      {displayFilter()}
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
