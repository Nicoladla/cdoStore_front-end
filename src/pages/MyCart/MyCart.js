import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import Header from "../../components/Header";
import LoadingDiv from "../../components/LoadingDiv";
import { BASE_COLOR } from "../../constants/colors";
import API_URLs from "../../constants/URLS";
import AuthContext from "../../contexts/AuthContext";
import CartProduct from "./CartProduct";

export default function MyCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wasClickedId, setWasClickedId] = useState(undefined);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function showLoginError() {
    swal({
      icon: "error",
      title: "Parece que você não está logado!",
      text: "Deseja fazer Login?",
      buttons: ["Cancelar", "Fazer Login"],
    }).then((value) => {
      if (value) {
        navigate("/login");
      }
    });
  }

  async function getMyCart() {
    const config = {
      headers: {
        Authorization: auth,
      },
    };

    try {
      const res = await axios.get(`${API_URLs.myCart}`, config);
      setIsLoading(false);
      setCartProducts(res.data);
    } catch (err) {
      console.log(err);
      swal({
        icon: "error",
        title: "Ops!...",
        text: err.response.data,
      });
    }
  }

  useEffect(() => {
    if (!auth) {
      showLoginError();
    }

    getMyCart();
    //eslint-disable-next-line
  }, [isLoading]);

  return (
    <>
      <Header
        calledFrom={API_URLs.myCart}
        setIsLoading={setIsLoading}
        setProducts={setCartProducts}
      />
      <PageContainer>
        <ProductsContainer>
          {isLoading ? (
            <LoadingDiv isLoading={isLoading} color={BASE_COLOR} />
          ) : cartProducts.length === 0 ? (
            <Options>Você ainda não tem itens no carrinho!</Options>
          ) : (
            <ul>
              {cartProducts.map((p) => (
                <CartProduct
                  key={p._id}
                  id={p._id}
                  name={p.name}
                  description={p.description}
                  price={p.price}
                  image={p.image}
                  inStock={p.inStock}
                  amountInCart={p.amountInCart}
                  wasClickedId={wasClickedId}
                  setWasClickedId={setWasClickedId}
                />
              ))}
            </ul>
          )}
          <Button>Fechar pedido</Button>
        </ProductsContainer>
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  min-height: 100vh;
  height: fit-content;
  margin: 0 auto;
  background-color: white;
  @media (max-width: 700px) {
    margin-top: 100px;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
`;
const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 200px;
`;

const Button = styled.button`
  width: 50%;
  height: 50px;
  border: none;
  background-color: ${BASE_COLOR};
  color: white;
  font-size: 25px;
  border-radius: 3px;
`;
