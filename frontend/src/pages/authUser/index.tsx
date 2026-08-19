import "./styles.css";
import ButtonForm from "../../components/buttonForm";
import InputForm from "../../components/inputForm";
import SpotlightForm from "../../components/spotlight_form";
import { AuthUser } from "../../schemas/user";
import { api } from "../../utils/backend_api";
import { MyToastContainer, new_notification } from "../../utils/notification";
import { timeout } from "../../utils/delay";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { AxiosError } from "axios";

// ####################
// ###  Componente  ###
// ####################

function AuthUserPage() {
  // navegar em urls
  const navigate = useNavigate();
  // Esquema completo de validação
  const schema = AuthUser;
  // Esta esperando resposta do servidor?
  const [loading, setLoading] = useState(false);

  const submitEvent = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;
      const formData = new FormData(form);

      const bodyData = schema.parse({
        email: formData.get("email").toString(),
        password: formData.get("password").toString(),
      });

      const response = await api.post(`/auth/login`, bodyData);

      new_notification("", "Usuario autenticado com sucesso");

      await timeout(1500);

      // Navegar para o feed
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        new_notification("", error.response?.data?.message ?? 'Sem messagem');
      }
      else {

      new_notification("", "Não foi possivel authenticar usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <SpotlightForm width={500} height={425} submit={submitEvent}>
          <h2 id="title">Bem Vindo</h2>
          <p id="text">Entre para explorar um mundo rico de cores</p>
          <InputForm name="email" type="email" labelText="E-mail" />
          <InputForm name="password" type="password" labelText="Senha" />
          <ButtonForm value="Autenticar" id="fsubmit" isLoading={loading} />
          <div id="sign-in">
            <p>Você não tem uma conta? </p>
            <Link to="/user/create">Crie uma</Link>
          </div>
        </SpotlightForm>
      </main>
      <MyToastContainer />
    </>
  );
}

export default AuthUserPage;
