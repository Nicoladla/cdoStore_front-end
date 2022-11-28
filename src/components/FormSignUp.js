import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import swal from "sweetalert";

import API_URLs from "../constants/URLS";
import { ThreeDots } from "react-loader-spinner";

export default function FormSignUp() {
  const navigate = useNavigate();

  const inputConfirmPassword = useRef();
  const inputEmail = useRef();

  const [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [messageError, setMessageError] = useState({
    confirmPassword: "",
    email: "",
  });

  function updateRegistrationData(e) {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });

    clearValidationError(e);
  }

  function clearValidationError(e) {
    if (messageError[e.target.name] !== "") {
      setMessageError({ ...messageError, [e.target.name]: "" });

      if (e.target.name === "email") {
        inputEmail.current.style.border = "1px solid #d6d6d6";
      } else {
        inputConfirmPassword.current.style.border = "1px solid #d6d6d6";
      }
    }
  }

  function validatePasswords(e) {
    e.preventDefault();

    const passwordsSame =
      registrationData.password === registrationData.confirmPassword;

    if (!passwordsSame) {
      setMessageError({
        ...messageError,
        confirmPassword: "Senha de confirmação inválida",
      });

      inputConfirmPassword.current.style.border = "1px solid #db0404";
      inputConfirmPassword.current.focus();
      return;
    }

    registerUser();
  }

  function registerUser() {
    setIsRegistering(true);

    const newRegistrationData = { ...registrationData };
    delete newRegistrationData.confirmPassword;

    axios
      .post(API_URLs.signUp, newRegistrationData)
      .then(rumResponse)
      .catch(rumError);
  }

  function rumResponse() {
    setIsRegistering(false);
    setTimeout(() => navigate("/sign-in"), 2100);

    swal({
      icon: "success",
      text: "O usuário foi cadastrado com sucesso!",
      timer: 2000,
      buttons: false,
    });
  }

  function rumError(err) {
    setIsRegistering(false);

    if (err.response.status === 409) {
      setMessageError({
        ...messageError,
        email: err.response.data.message,
      });
      inputEmail.current.style.border = "1px solid #db0404";
      inputEmail.current.focus();
      return;
    }

    swal({
      icon: "error",
      text: `${err.response.data.message}`,
    });
  }

  return (
    <>
      <Form onSubmit={validatePasswords}>
        <input
          type="text"
          name="name"
          placeholder="Nome"
          minLength={3}
          value={registrationData.name}
          onChange={updateRegistrationData}
          disabled={isRegistering}
          required
        />
        <input
          ref={inputEmail}
          type="email"
          name="email"
          placeholder="email"
          value={registrationData.email}
          onChange={updateRegistrationData}
          disabled={isRegistering}
          required
        />
        <p>{messageError.email}</p>
        <input
          type="password"
          name="password"
          placeholder="Senha"
          minLength={6}
          value={registrationData.password}
          onChange={updateRegistrationData}
          disabled={isRegistering}
          required
        />
        <input
          ref={inputConfirmPassword}
          type="password"
          name="confirmPassword"
          placeholder="Confirmar Senha"
          minLength={6}
          value={registrationData.confirmPassword}
          onChange={updateRegistrationData}
          disabled={isRegistering}
          required
        />
        <p>{messageError.confirmPassword}</p>

        <button type="submit" disabled={isRegistering}>
          {isRegistering ? (
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
    </>
  );
}

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
