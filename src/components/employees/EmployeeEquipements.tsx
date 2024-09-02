import { useEffect, useState } from "react";
import { EquipementType } from "../../types/types";
import axios from "axios";
import { FaComputer } from "react-icons/fa6";
import { MdLaptopMac } from "react-icons/md";

const EmployeeEquipements = () => {
  const [equipements, setEquipements] = useState<EquipementType[]>();
  useEffect(() => {
    axios
      .get("http://localhost:3000/employee/equipements/")
      .then((result) => {
        if (result.data.Status) setEquipements(result.data.Result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex gap-5">
      {equipements?.map((equipement) => (
        <div className="flex flex-col items-center mt-5 justify-center shadow-md rounded-md p-5">
          {equipement.type == "desktop" ? (
            <FaComputer className="text-6xl text-teal-700" />
          ) : (
            <MdLaptopMac className="text-6xl text-teal-700" />
          )}
          <div>
            <b>Marque :</b> {equipement.brand}
          </div>
          <div>
            <b>Nom :</b> {equipement.name}
          </div>
          <div>
            <b>Numéro de série :</b> {equipement.serial}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeEquipements;
