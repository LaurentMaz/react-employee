import { Link, useNavigate } from "react-router-dom";
import NavItem from "../UI/NavItem";

import { GoHome } from "react-icons/go";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";

const NavbarEmployee = () => {
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
          to={`/home/employeeDetail/30`}
          title="Profil"
          Icon={IoPersonCircleOutline}
        />
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
