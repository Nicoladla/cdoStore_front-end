import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import LoadingDiv from "../../components/LoadingDiv";
import { BASE_COLOR } from "../../constants/colors";
import API_URLs from "../../constants/URLS";
import AuthContext from "../../contexts/AuthContext";

export default function MyCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useContext(AuthContext);
  function getMyCart() {
    const config = {
      headers: {
        Authorization: auth,
      },
    };

    try {
      const res = axios.get(`${API_URLs.myCart}`, config);
      setIsLoading(false);
      setCartProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getMyCart();
    //eslint-disable-next-line
  }, []);

  return (
    <PageContainer>
      <Header calledFrom={API_URLs.myCart} setProducts={setCartProducts} />
      <ProductsContainer>
        {isLoading ? (
          <LoadingDiv isLoading={isLoading} color={BASE_COLOR} />
        ) : (
          <ul>
            {cartProducts.map((p) => (
              <CartProduct>
                <Image src={p.image} />
                <ProductText>
                  <Title>
                    {p.name} ({p.amountInCart})
                  </Title>
                  <Amount>Disponível em estoque: {p.inStock}</Amount>
                  <Description>{p.description}</Description>
                  <Price>R${p.price}</Price>
                </ProductText>
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
`;

const ProductsContainer = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 20px auto;
`;

const CartProduct = styled.li`
  display: flex;
  align-items: center;
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
  align-items: flex-end;
  justify-content: space-between;
  width: 100%;
  height: 200px;
  margin-bottom: 15px;
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

const Price = styled.span`
  font-weight: bold;
  color: ${BASE_COLOR};
`;
