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

export default function MyCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(cartProducts);

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

  async function deleteFromCart(id) {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: auth,
      },
    };
    try {
      await axios.delete(`${API_URLs.myCart}/${id}/?all=true`, config);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      swal({
        icon: "error",
        title: "Ops!...",
        text: err.response.data.message,
      });
    }
  }

  async function removeFromCart(id) {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: auth,
      },
    };
    try {
      await axios.delete(`${API_URLs.myCart}/${id}`, config);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      swal({
        icon: "error",
        title: "Ops!...",
        text: err.response.data.message,
      });
    }
  }

  async function addOnCart(id) {
    setIsLoading(true);
    const config = {
      headers: {
        Authorization: auth,
      },
    };
    try {
      await axios.post(`${API_URLs.myCart}/${id}`, {}, config);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      swal({
        icon: "error",
        title: "Ops!...",
        text: err.response.data.message,
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
    <PageContainer>
      <Header
        calledFrom={API_URLs.myCart}
        setIsLoading={setIsLoading}
        setProducts={setCartProducts}
      />
      <ProductsContainer>
        {isLoading ? (
          <LoadingDiv isLoading={isLoading} color={BASE_COLOR} />
        ) : cartProducts.length === 0 ? (
          <Options>Você ainda não tem itens no carrinho!</Options>
        ) : (
          <ul>
            {cartProducts.map((p) => (
              <CartProduct key={p._id}>
                <Image src={p.image} />
                <ProductText>
                  <Title>{p.name}</Title>
                  <Description>{p.description}</Description>
                  <Amount>Em estoque: {p.inStock}</Amount>
                </ProductText>
                <Options>
                  <ButtonCancel>
                    <ion-icon
                      onClick={() => deleteFromCart(p._id)}
                      name="trash-outline"
                    ></ion-icon>
                  </ButtonCancel>
                  <AmountOptions>
                    <Button onClick={() => removeFromCart(p._id)}>-</Button>
                    <span>{p.amountInCart}</span>
                    <Button onClick={() => addOnCart(p._id)}>+</Button>
                  </AmountOptions>
                  <Price>
                    <span>
                      R$
                      {(p.price * p.amountInCart).toString().replace(".", ",")}
                    </span>
                  </Price>
                </Options>
              </CartProduct>
            ))}
          </ul>
        )}
      </ProductsContainer>
    </PageContainer>
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
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
`;

const CartProduct = styled.li`
  display: flex;
  justify-content: space-around;
  padding: 15px;
  border-radius: 3px;
  -webkit-box-shadow: -1px 1px 19px 3px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: -1px 1px 19px 3px rgba(0, 0, 0, 0.13);
  box-shadow: -1px 1px 19px 3px rgba(0, 0, 0, 0.13);
  margin-bottom: 15px;
  font-size: 20px;
`;

const ProductText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 40%;
  height: 200px;
`;

const Title = styled.span`
  font-weight: bold;
  font-size: 19px;
`;

const Amount = styled.span``;

const Image = styled.img`
  object-fit: cover;
  width: 200px;
  height: 200px;
  margin-bottom: 15px;
`;

const Description = styled.span``;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 200px;
`;

const ButtonCancel = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background-color: ${BASE_COLOR};
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: white;
  border-radius: 3px;
  padding: 5px;
`;

const AmountOptions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  text-align: center;
  width: 100px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 30px;
  background-color: ${BASE_COLOR};
  border: none;
  color: white;
  border-radius: 3px;
  font-size: 20px;
  font-weight: bold;
`;
const Price = styled.span`
  font-weight: bold;
  color: ${BASE_COLOR};
`;
