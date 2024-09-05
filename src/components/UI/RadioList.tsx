import { Dispatch, SetStateAction, useEffect } from "react";

interface RadioListProps {
  labels: string[];
  name: string;
  setValue: Dispatch<SetStateAction<string>> | null;
  value: string;
}

const RadioList = ({ labels, name, setValue, value }: RadioListProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue && setValue(e.target.value);
  };

  useEffect(() => {
    console.log("RENDER");
  }, []);

  return (
    <div className="flex flex-wrap">
      {labels.map((label) => (
        <div key={label} className="flex items-center me-4">
          <input
            id={`${label.toLowerCase()}-radio`}
            type="radio"
            value={label}
            name={name}
            className="w-4 h-4 "
            checked={value === label}
            onChange={handleChange}
          ></input>
          <label
            htmlFor={`${label.toLowerCase()}-radio`}
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
          >
            {label}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioList;
