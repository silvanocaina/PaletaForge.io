import { Link } from "react-router";
import ButtonForm from "../../components/buttonForm";
import InputForm from "../../components/inputForm";
import SpotlightForm from "../../components/spotlight_form";
import './styles.css'
function CreateUserPage() {
  const submitEvent = (e: React.SubmitEvent, ref: React.RefObject<any>) => {
    e.preventDefault();
    console.log(ref.current)
  };

  return (
    <>
      <main>
        <SpotlightForm width={500} height={500} submit={submitEvent}>
          <h2 id="title">Bem Vindo</h2>
          <p id="text">Crie para começar sua jornada</p>
          <InputForm name="username" type="text" labelText="Nome do usuario" />
          <InputForm name="email" type="email" labelText="E-mail"/>
          <InputForm name="password" type="password" labelText="Senha" showEntropy={true} />
          <ButtonForm value="Criar" id="fsubmit" />
          <div id="sign-in">
            <p>Você já tem uma conta? </p>
            <Link to="/user/auth">Entre</Link>
          </div>
        </SpotlightForm>
      </main>
    </>
  );
}

export default CreateUserPage;
