import LoginEmployeeForm from "../../components/login/LoginEmployeeForm";

const LoginEmployee = () => {
  return (
    <>
      <div className="flex flex-col w-[500px] gap-10 items-center justify-center  rounded-md px-10 py-20 shadow-2xl">
        <h2 className="text-2xl font-bold">
          Authentification <span className="text-teal-500">Employé</span>
        </h2>
        <LoginEmployeeForm />
      </div>
    </>
  );
};

export default LoginEmployee;
