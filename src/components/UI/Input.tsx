import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface inputProps {
  isLabel?: boolean;
  label?: string;
  name: string;
  type: string;
  value?: string;
  isRequired?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  isLabel = false,
  label,
  name,
  type,
  value,
  isRequired = false,
  disabled,
  onChange,
}: inputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [typeState, setTypeState] = useState(type);

  useEffect(() => {
    if (typeState === "password" && showPassword && name === "password") {
      setTypeState("text");
    } else if (typeState === "text" && !showPassword && name === "password") {
      setTypeState("password");
    }
  }, [showPassword]);

  return (
    <div className="w-full">
      {isLabel && (
        <label className="font-semibold" htmlFor={name}>
          {label}:
        </label>
      )}
      <div className="flex items-center justify-center">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type={typeState}
          name={name}
          onChange={onChange}
          value={value}
          required={isRequired}
          disabled={disabled}
        />
        {type === "password" && (
          <span
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
