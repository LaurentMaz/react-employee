import { Link, useNavigate } from "react-router-dom";

import { GoHome } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import useEmployeeContext from "../hooks/useEmployeeContext";
import NavItem from "./UI/NavItem";

const NavbarEmployee = () => {
  const { logedEmployee } = useEmployeeContext();
  const navigate = useNavigate();
  const logOut = () => {
    axios
      .get("http://localhost:3000/employee/logout")
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("authEmployee");
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <nav className="flex flex-col gap-5">
      <Link to="/home" className="font-black text-xl">
        EMPLOY'EES
      </Link>
      <ul className="flex flex-col gap-2">
        <NavItem to="/home" title="Home" Icon={GoHome} />
        <NavItem
          to={`/home/profil/${logedEmployee?.id}`}
          title="Profil"
          Icon={IoPersonCircleOutline}
        />
        <NavItem to={`/home/conges/`} title="Congés" Icon={FaRegCalendarAlt} />
        <NavItem
          to="/"
          title="Déconnexion"
          Icon={TbLogout2}
          handleClick={logOut}
        />
      </ul>
    </nav>
  );
};

export default NavbarEmployee;
