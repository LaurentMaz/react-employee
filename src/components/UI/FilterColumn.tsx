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
              setData={setFilterState}
              placeholder="Rechercher par nom ou prénom"
              value={filterState}
            />
          </div>
        );
      case "status":
        return (
          <div>
            <RadioList
              key={filterState}
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
      className="flex flex-col gap-5 fixed top-[23%] bg-white px-3 py-4 rounded shadow-2xl w-[25%]"
      style={{
        // transform: "translate(-50%, -50%)", // Centre horizontalement et verticalement
        zIndex: 1000,
      }}
    >
      {displayFilter()}
      <div className="flex gap-2">
        <Button
          className="text-xs"
          type="danger"
          onClick={() => setFilterMenu({ ...filterMenu, visible: false })}
        >
          Fermer
        </Button>
        <Button
          className="text-xs"
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
