import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_COLOR } from "../../constants/colors.js";
import axios from "axios";
import URLS from "../../constants/URLS.js";
import Product from "./Product.js";
import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext.js";
import LoadingDiv from "../../components/LoadingDiv.js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useContext(AuthContext);

  console.log(auth);

  useEffect(() => {
    axios
      .get(`${URLS.products}`)
      .then((res) => {
        setIsLoading(false);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <PageContainer>
      <Header>
        <h1>cdoStore</h1>
        {auth || (
          <AuthDiv>
            <Link to="/sign-in">Login </Link>|
            <Link to="/sign-up"> Cadastro</Link>
          </AuthDiv>
        )}
      </Header>
      <ProductsContainer>
        {isLoading ? (
          <LoadingDiv isLoading={isLoading} color={BASE_COLOR} />
        ) : (
          <ul>
            {products.map((p) => (
              <Product
                key={p._id}
                id={p._id}
                name={p.name}
                description={p.description}
                price={p.price}
                image={p.image}
              />
            ))}
          </ul>
        )}
      </ProductsContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  /* width: 800px; */
  height: fit-content;
  min-height: 100vh;
  margin: 0 auto;
  background-color: white;
  -webkit-box-shadow: -1px 1px 19px 3px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: -1px 1px 19px 3px rgba(0, 0, 0, 0.13);
  box-shadow: -1px 1px 19px 3px rgba(0, 0, 0, 0.13);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  background-color: ${BASE_COLOR};
  position: relative;
  color: white;
  font-weight: bold;
  font-size: 20px;

  a {
    color: white;
  }

  h1 {
    font-size: 80px;
  }
`;

const AuthDiv = styled.div`
  position: absolute;
  top: 30px;
  right: 50px;
`;

const ProductsContainer = styled.main`
  display: flex;
  align-items: center;
  ul {
    overflow: scroll;
    flex-wrap: wrap;
    display: flex;
    align-items: flex-start;
    margin-top: 20px;
  }
`;
