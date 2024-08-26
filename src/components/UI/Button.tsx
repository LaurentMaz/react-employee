import clsx from "clsx";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  type: string;
  className?: string;
  link?: boolean;
  to?: string;
  children: ReactNode;
  handleClick: () => void;
}

const Button = ({
  type,
  className,
  link,
  to = "",
  children,
  handleClick,
}: ButtonProps) => {
  let btnClass = "";

  switch (type) {
    case "danger":
      btnClass =
        "flex justify-center cursor-pointer items-center bg-red-500 text-white p-3 rounded";
      break;
    case "warning":
      btnClass =
        "flex justify-center cursor-pointer items-center bg-amber-400 text-white p-3 rounded";
      break;
    case "main":
      btnClass =
        "bg-teal-500 hover:bg-teal-400 rounded p-2 font-bold text-white";
      break;
    default:
      break;
  }
  return link ? (
    <Link to={to} className={clsx(btnClass, className)}>
      {children}
    </Link>
  ) : (
    <button onClick={handleClick} className={clsx(btnClass, className)}>
      {children}
    </button>
  );
};

export default Button;
