interface inputProps {
  isLabel?: boolean;
  label?: string;
  name: string;
  type: string;
  value?: string;
  isRequired?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  isLabel = false,
  label,
  name,
  type,
  value,
  isRequired = false,
  onChange,
}: inputProps) => {
  return (
    <div className="w-full">
      {isLabel && (
        <label className="font-semibold" htmlFor={name}>
          {label}:
        </label>
      )}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        required={isRequired}
      />
    </div>
  );
};

export default Input;
