import { Link } from "react-router-dom";
import { IconType } from "react-icons";

interface navItemProps {
  to: string;
  Icon: IconType;
  title: string;
  handleClick?: () => void;
}

const NavItem = ({ to, Icon, title, handleClick }: navItemProps) => {
  return (
    <li onClick={handleClick}>
      <Link
        to={to}
        className="flex items-center gap-1 text-lg hover:bg-teal-800 rounded p-2"
      >
        {<Icon />}
        {title}
      </Link>
    </li>
  );
};

export default NavItem;
