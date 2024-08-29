import Button from "../../components/UI/Button";
import Container from "../../components/UI/Container";

const Equipement = () => {
  return (
    <Container className="flex flex-col mt-16 gap-10">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">Liste des équipements</h1>
        <Button type="main">Ajouter un équipement</Button>
      </div>
      <div></div>
      Liste
    </Container>
  );
};

export default Equipement;
