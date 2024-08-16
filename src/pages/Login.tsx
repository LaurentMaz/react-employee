import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <>
      <div className="flex flex-col w-[500px] gap-10 items-center justify-center  rounded-md px-10 py-20 shadow-2xl">
        <h2 className="text-2xl font-bold">Authentification</h2>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
