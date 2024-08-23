import { Link } from "react-router-dom";

const Start = () => {
  return (
    <>
      <div className="flex flex-col w-[500px] gap-10 items-center justify-center  rounded-md px-10 py-20 shadow-2xl">
        <h2 className="text-2xl font-bold">Authentification</h2>
        <div className="flex gap-10 justify-between items-center">
          <Link to={"/employeeLogin"}>
            <div className="bg-teal-700 text-white p-3 rounded-lg">Employé</div>
          </Link>
          <Link to={"/adminLogin"}>
            <div className="bg-red-700 text-white p-3 rounded-lg">Admin</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Start;
