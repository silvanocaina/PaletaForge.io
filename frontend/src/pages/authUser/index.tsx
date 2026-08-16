import ButtonForm from "../../components/buttonForm";
import InputForm from "../../components/inputForm";
import SpotlightForm from "../../components/spotlight_form";
import './styles.css'
import { Link } from "react-router";
function AuthUserPage() {

  const submitEvent =  (e: React.SubmitEvent, ref: React.RefObject<any>) => {
    e.preventDefault();
  };

  return (
    <>
      <main>
        <SpotlightForm width={500} height={425} submit={submitEvent}>
          <h2 id="title">Bem Vindo</h2>
          <p id="text">Entre para explorar um mundo rico de cores</p>
          <InputForm  name="email" type="email" labelText="E-mail"/>
          <InputForm  name="password" type="password" labelText="Senha" />
          <ButtonForm value="Autenticar" id="fsubmit" />
          <div id="sign-in">
            <p>Você não tem uma conta? </p>
            <Link to="/user/create">Crie uma</Link>
          </div>
        </SpotlightForm>
      </main>
    </>
  );
}

export default AuthUserPage;
