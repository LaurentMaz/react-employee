interface inputProps {
  isLabel?: boolean;
  label?: string;
  name: string;
  type: string;
}

const Input = ({ isLabel = false, label, name, type }: inputProps) => {
  return (
    <div>
      {isLabel && (
        <label className="font-semibold" htmlFor="email">
          {label}:
        </label>
      )}
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type={type}
        name={name}
      />
    </div>
  );
};

export default Input;
