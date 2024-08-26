import LoginAdminForm from "../../components/login/LoginAdminForm";

const LoginAdmin = () => {
  return (
    <>
      <div className="flex flex-col w-[500px] gap-10 items-center justify-center  rounded-md px-10 py-20 shadow-2xl">
        <h2 className="text-2xl font-bold">
          Authentification <span className="text-red-500">Admin</span>
        </h2>
        <LoginAdminForm />
      </div>
    </>
  );
};

export default LoginAdmin;
