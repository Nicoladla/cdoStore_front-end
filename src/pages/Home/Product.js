import styled from "styled-components";
import { BASE_COLOR } from "../../constants/colors";
import axios from "axios";
import API_URLs from "../../constants/URLS";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import swal from "sweetalert";

export default function Product({ id, name, description, price, image }) {
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

  function showGenericError(message) {
    swal({
      icon: "error",
      title: "Ops!...",
      text: message,
    });
  }

  function tryAddItemOnCart() {
    const config = {
      headers: {
        Authorization: auth,
      },
    };
    axios
      .post(`${API_URLs.myCart}/${id}`, {}, config)
      .then(() => navigate("/my-cart"))
      .catch((err) => showGenericError(err.response.data.message));
  }

  function addToCart() {
    if (!auth) {
      return showLoginError();
    }

    tryAddItemOnCart();
  }

  return (
    <ProductContainer>
      <Name>{name}</Name>
      <Image src={image} />
      <Description>
        <Text>{description}</Text>
        <Price>R${price}</Price>
      </Description>
      <PurchaseDiv>
        <ButtonAddCart onClick={addToCart}>
          Comprar <ion-icon name="cart-outline"></ion-icon>
        </ButtonAddCart>
      </PurchaseDiv>
    </ProductContainer>
  );
}

const ProductContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  width: 280px;
  min-height: 200px;
  border-radius: 3px;
  padding: 20px;
  margin-bottom: 30px;
  -webkit-box-shadow: -1px 1px 19px 3px rgba(0, 0, 0, 0.13);
  -moz-box-shadow: -1px 1px 19px 3px rgba(0, 0, 0, 0.13);
  box-shadow: -1px 1px 19px 3px rgba(0, 0, 0, 0.13);

  &:hover {
    cursor: pointer;
  }
`;

const Name = styled.h1`
  font-weight: bold;
  font-size: 19px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 200px;
  height: 200px;
`;

const Description = styled.div`
  min-height: 60px;
  height: fit-content;
  width: 100%;
`;

const Text = styled.div`
  font-size: 23px;
  margin-bottom: 10px;
`;
const Price = styled.div`
  font-weight: bold;
  color: ${BASE_COLOR};
  font-size: 30px;
`;

const PurchaseDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const ButtonAddCart = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 50px;
  background-color: ${BASE_COLOR};
  border-radius: 5px;
  color: white;
  border: none;
  font-weight: 700;
  font-size: 30px;
  ion-icon {
    font-size: 40px;
  }
`;
