import { Dispatch, SetStateAction } from "react";

interface RadioListProps {
  labels: string[];
  name: string;
  setParentState: Dispatch<SetStateAction<string>>;
  parentState: string;
}

const RadioList = ({
  labels,
  name,
  setParentState,
  parentState,
}: RadioListProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParentState(e.target.value);
  };

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
            checked={parentState === label}
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
