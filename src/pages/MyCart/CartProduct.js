import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import swal from "sweetalert";
import LoadingDiv from "../../components/LoadingDiv";
import { BASE_COLOR } from "../../constants/colors";
import API_URLs from "../../constants/URLS";
import AuthContext from "../../contexts/AuthContext";

export default function CartProduct(props) {
  const {
    id,
    name,
    description,
    price,
    image,
    inStock,
    amountInCart,
    wasClickedId,
    setWasClickedId,
  } = props;

  const { auth } = useContext(AuthContext);

  function deleteFromCart(id) {
    swal({
      type: "warning",
      text: "Tem certeza que deseja remover item?",
      buttons: ["Cancelar", "Remover"],
    }).then(async (value) => {
      if (value) {
        setWasClickedId(undefined);
        const config = {
          headers: {
            Authorization: auth,
          },
        };
        try {
          await axios.delete(`${API_URLs.myCart}/${id}/?all=true`, config);
          setWasClickedId(undefined);
        } catch (err) {
          console.log(err);
          swal({
            icon: "error",
            title: "Ops!...",
            text: err.response.data.message,
          });
        }
      }
    });
  }

  async function removeFromCart(id) {
    const config = {
      headers: {
        Authorization: auth,
      },
    };
    try {
      await axios.delete(`${API_URLs.myCart}/${id}`, config);
      setWasClickedId(undefined);
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
    const config = {
      headers: {
        Authorization: auth,
      },
    };
    try {
      await axios.post(`${API_URLs.myCart}/${id}`, {}, config);
      setWasClickedId(undefined);
    } catch (err) {
      console.log(err);
      swal({
        icon: "error",
        title: "Ops!...",
        text: err.response.data.message,
      });
    }
  }

  return (
    <ItemCart key={id}>
      <Image src={image} />
      <ProductText>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <Amount>Em estoque: {inStock}</Amount>
      </ProductText>
      <Options>
        <ButtonCancel>
          <ion-icon
            onClick={() => deleteFromCart(id)}
            name="trash-outline"
          ></ion-icon>
        </ButtonCancel>
        <AmountOptions>
          <Button onClick={() => removeFromCart(id)}>-</Button>
          <span>{amountInCart}</span>
          <Button onClick={() => addOnCart(id)}>+</Button>
        </AmountOptions>
        <Price>
          <span>
            {wasClickedId === id ? (
              console.log(id)
            ) : (
              // <LoadingDiv isLoading={true} />
              <>
                R$
                {(price * amountInCart)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}{" "}
                (x
                {amountInCart})
              </>
            )}
          </span>
        </Price>
      </Options>
    </ItemCart>
  );
}

const ItemCart = styled.li`
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
const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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
