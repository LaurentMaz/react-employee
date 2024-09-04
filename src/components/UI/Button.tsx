import clsx from "clsx";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  type: "danger" | "main" | "warning" | "secondary";
  className?: string;
  link?: boolean;
  to?: string;
  children: ReactNode;
  onClick?: (...args: any[]) => void;
  disabled?: boolean;
  submit?: boolean;
  icon?: ReactNode;
  dataSet?: string;
}

const Button = ({
  type,
  className,
  link,
  to = "",
  children,
  onClick = () => {},
  disabled = false,
  submit,
  icon,
  dataSet,
}: ButtonProps) => {
  let btnClass = "";

  const submitType = submit ? "submit" : "button";

  switch (type) {
    case "danger":
      btnClass =
        "flex gap-1 justify-center cursor-pointer items-center bg-red-500 text-white p-3 rounded";
      break;
    case "warning":
      btnClass =
        "flex gap-1 justify-center cursor-pointer items-center bg-amber-400 text-white p-3 rounded";
      break;
    case "main":
      btnClass =
        "bg-teal-500 gap-1 justify-center hover:bg-teal-400 rounded p-2 font-bold text-white";
      break;
    case "secondary":
      btnClass =
        "bg-white gap-1 justify-center hover:bg-teal-400 hover:text-white rounded p-2 font-bold text-teal-500 border border-teal-500";
      break;
    default:
      break;
  }
  return link ? (
    <Link to={to} className={clsx(btnClass, className, disabled && "disabled")}>
      {icon && icon}
      {children}
    </Link>
  ) : (
    <button
      data-data={dataSet}
      onClick={onClick}
      className={clsx(
        btnClass,
        className,
        disabled && "cursor-not-allowed opacity-50"
      )}
      disabled={disabled}
      type={submitType}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
