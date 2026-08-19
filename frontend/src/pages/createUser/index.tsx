import "./styles.css";
import ButtonForm from "../../components/buttonForm";
import InputForm from "../../components/inputForm";
import SpotlightForm from "../../components/spotlight_form";
import { MyToastContainer, new_notification } from "../../utils/notification";
import { timeout } from "../../utils/delay";
import {
  CreateUser,
  emailRules,
  passwordRules,
  usernameRules,
} from "../../schemas/user";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../../utils/backend_api";
import { AxiosError } from "axios";

// ####################
// ###  Componente  ###
// ####################

function CreateUserPage() {
  // navegar em urls
  const navigate = useNavigate();
  // Esquema completo de validação
  const schema = CreateUser;
  // Esta esperando resposta do servidor?
  const [loading, setLoading] = useState(false);

  // Evento de enviar do formulario
  const submitEvent = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const form = e.target;
      const formData = new FormData(form);

      // Corpo da requisição, onde pode dar erro ser não for valido
      const bodyData = schema.parse({
        username: formData.get("username").toString(),
        email: formData.get("email").toString(),
        password: formData.get("password").toString(),
      });

      const response = await api.post(`/users`, bodyData);

      new_notification("", "Usuario criado com sucesso");

      await timeout(1500);

      // Navegar para o feed
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        new_notification("", error.response?.data?.message ?? 'Sem messagem');
      }
      else {
        new_notification("", "Não foi possivel criar usuario");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <SpotlightForm width={500} height={500} submit={submitEvent}>
          <h2 id="title">Bem Vindo</h2>
          <p id="text">Crie para começar sua jornada</p>
          <InputForm
            name="username"
            type="text"
            labelText="Nome do usuario"
            rules={usernameRules}
          />
          <InputForm
            name="email"
            type="email"
            labelText="E-mail"
            rules={emailRules}
          />
          <InputForm
            name="password"
            type="password"
            labelText="Senha"
            showEntropy={true}
            rules={passwordRules}
          />
          <ButtonForm value="Criar" id="fsubmit" isLoading={loading} />
          <div id="sign-in">
            <p>Você já tem uma conta? </p>
            <Link to="/user/auth">Entre</Link>
          </div>
        </SpotlightForm>
      </main>
      <MyToastContainer />
    </>
  );
}

export default CreateUserPage;
