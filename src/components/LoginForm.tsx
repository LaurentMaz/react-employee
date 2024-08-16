import Input from "./input";

const LoginForm = () => {
  return (
    <form className="flex flex-col gap-5 w-[60%] m-auto">
      <Input isLabel={true} label="Email" name="email" type="email" />

      <Input
        isLabel={true}
        label="Mot de passe"
        name="password"
        type="password"
      />

      <button className="bg-teal-500 hover:bg-teal-400 rounded p-2 font-bold text-white">
        Connexion
      </button>
    </form>
  );
};

export default LoginForm;
