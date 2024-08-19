import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <nav className="flex flex-col gap-5">
      <Link to="/dashboard" className="font-black text-xl">
        EMPLOY'EES
      </Link>
      <ul className="flex flex-col gap-2">
        <NavItem to="/dashboard" title="Home" Icon={AiOutlineDashboard} />
        <NavItem
          to="/dashboard/employee"
          title="Gestion des employés"
          Icon={IoPeopleOutline}
        />
        <NavItem
          to="/dashboard/category"
          title="Catégories"
          Icon={LuLayoutDashboard}
        />
        <NavItem
          to="/dashboard/profil"
          title="Profil"
          Icon={IoPersonCircleOutline}
        />
        <NavItem to="/" title="Déconnexion" Icon={TbLogout2} />
      </ul>
    </nav>
  );
};

export default Navbar;
