import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BASE_COLOR } from "../constants/colors";
// import API_URLs from "../constants/URLS";
import AuthContext from "../contexts/AuthContext";

export default function Header({ calledFrom, setProducts, setIsLoading }) {
  const [searchForm, setSearchForm] = useState("");

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate("/my-cart");

  function handleForm(e) {
    setSearchForm(e.target.value.toLowerCase());
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      search();
    }
  }

  async function search() {
    const config = {
      headers: {
        Authorization: auth,
      },
    };
    setIsLoading(true);
    try {
      const res = await axios.get(`${calledFrom}/?name=${searchForm}`, config);
      setProducts(res.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <HeaderDiv>
      <DivSearch>
        <InputSearch
          onChange={handleForm}
          onKeyDown={handleKeyDown}
          placeholder="Pesquisar"
        />
        <ion-icon onClick={search} name="search-outline"></ion-icon>
      </DivSearch>
      <h1>cdoStore</h1>
      {}
      {auth || (
        <AuthDiv>
          <Link to="/sign-in">Login </Link>|<Link to="/sign-up"> Cadastro</Link>
        </AuthDiv>
      )}
    </HeaderDiv>
  );
}

const HeaderDiv = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100px;
  background-color: ${BASE_COLOR};
  color: white;
  font-weight: bold;
  font-size: 20px;

  a {
    color: white;
  }

  h1 {
    font-size: 80px;
    @media (max-width: 700px) {
      display: none;
    }
  }

  ion-icon {
    font-size: 50px;
  }

  @media (max-width: 700px) {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 100;
  }
`;

const DivSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 250px;

  ion-icon {
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const InputSearch = styled.input`
  height: 30px;
  font-size: 20px;
  width: 80%;
`;

const AuthDiv = styled.div`
  top: 30px;
  right: 50px;
`;
