interface recapBoxProps {
  title: string;
  total: string;
}

const RecapBox = ({ title, total }: recapBoxProps) => {
  return (
    <div className="border flex flex-col p-5 shadow-xl w-[30%] rounded-lg">
      <div className="flex items-center justify-center border-b-2 py-5">
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <div className="py-5 text-lg flex justify-between">
        <span className="font-semibold ">Total : </span>
        <span className="font-semibold ">{total}</span>
      </div>
    </div>
  );
};

export default RecapBox;
