import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

import API_URLs from "../../constants/URLS";
import AuthContext from "../../contexts/AuthContext";

export default function SignIn() {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  function updateLoginData(e) {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  }

  function loginUser(e) {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post(API_URLs.signIn, loginData)
      .then((res) => {
        setAuth(res.data);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        setMessageError(err.response.data.message);
      });
  }

  return (
    <ScreeSignIn>
      <header>cdoStore</header>

      <Form onSubmit={loginUser}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          onChange={updateLoginData}
          disabled={isLoading}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          minLength={6}
          value={loginData.password}
          onChange={updateLoginData}
          disabled={isLoading}
          required
        />
        <p>{messageError}</p>
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#ffe5de"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Cadastrar"
          )}
        </button>
      </Form>

      <p>
        Não tem uma conta? <Link to="/sign-up">Cadastre-se!</Link>
      </p>
    </ScreeSignIn>
  );
}

const ScreeSignIn = styled.div`
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

const Form = styled.form`
  width: 50%;
  display: flex;
  flex-direction: column;

  p {
    color: #db0404;
    font-size: 13px;
    margin: -5px 0 5px 2px;
  }

  button {
    background-color: #ed9e87;
    color: #ffe5de;
    width: 50%;
    height: 40px;
    margin: 10px auto 70px;
    border-radius: 5px;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:disabled {
    opacity: 0.7;
  }
`;
