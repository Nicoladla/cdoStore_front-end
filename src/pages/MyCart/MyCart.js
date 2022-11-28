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
import CartProduct from "../../components/CartProduct";
import { ColorRing } from "react-loader-spinner";
import ConfirmPurchase from "../../components/ConfirmPurchase";

export default function MyCart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubtotalLoading, setIsSubtotalLoading] = useState(false);

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  const subTotalInfo = calculateSubTotalInfo();

  function calculateSubTotalInfo() {
    if (cartProducts) {
      let totalItems = 0;
      let subTotal = 0;
      for (let item of cartProducts) {
        totalItems += item.amountInCart;
        subTotal += item.amountInCart * item.price;
      }
      return {
        totalItems,
        subTotal,
      };
    }
    return 0;
  }

  function showLoginError() {
    swal({
      icon: "error",
      title: "Parece que você não está logado!",
      text: "Deseja fazer login?",
      button: "Fazer login",
    }).then((value) => {
      if (value) {
        navigate("/sign-in");
      }
    });
  }

  function confirmPurchase() {
    const info = cartProducts.map((p) => {
      return [{ name: p.name, price: p.price, amount: p.amountInCart }];
    });
    info.total = subTotalInfo.subTotal;
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
      return showLoginError();
    }

    getMyCart();
    //eslint-disable-next-line
  }, [isLoading, isSubtotalLoading]);

  return (
    <>
      <Header
        calledFrom={API_URLs.myCart}
        setIsLoading={setIsLoading}
        setProducts={setCartProducts}
      />
      <PageContainer>
        <ProductsContainer>
          <ConfirmPurchase />
          {isLoading ? (
            <LoadingDiv isLoading={isLoading} color={BASE_COLOR} />
          ) : cartProducts.length === 0 ? (
            <Options>Você ainda não tem itens no carrinho!</Options>
          ) : (
            <>
              <SubTotalDiv>
                <Text>
                  Subtotal:
                  <Strong>
                    R$
                    {subTotalInfo.subTotal
                      .toFixed(2)
                      .toString()
                      .replace(".", ",")}
                  </Strong>
                </Text>
                <Button onClick={confirmPurchase}>
                  {isSubtotalLoading ? (
                    <ColorRing
                      visible={isSubtotalLoading}
                      height="55"
                      width="65"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={["white", "white", "white", "white", "white"]}
                    />
                  ) : (
                    <>Fechar pedido ({subTotalInfo.totalItems} itens) </>
                  )}
                </Button>
              </SubTotalDiv>
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
                    setIsSubtotalLoading={setIsSubtotalLoading}
                  />
                ))}
              </ul>
            </>
          )}
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

const SubTotalDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

const Text = styled.div`
  height: 40px;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  background-color: ${BASE_COLOR};
  color: white;
  font-size: 25px;
  border-radius: 3px;
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

const Strong = styled.span`
  font-size: 25px;
  font-weight: bold;
  color: ${BASE_COLOR};
`;
