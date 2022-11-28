import { Link } from "react-router-dom";
import styled from "styled-components";

import FormSignUp from "../../components/FormSignUp";

export default function SignUp() {
  return (
    <ScreeSignUp>
      <header>cdoStore</header>

      <FormSignUp />

      <p>
        Já tem uma conta? <Link to="/sign-in">Faça o login!</Link>
      </p>
    </ScreeSignUp>
  );
}

const ScreeSignUp = styled.div`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  header {
    margin-bottom: 50px;
    font-size: 30px;
  }

  p {
    font-size: 15px;
  }
  a {
    color: #ed9e87;
  }
`;
