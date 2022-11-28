import { useContext } from "react";
import styled from "styled-components";
import ConfirmProducts from "../contexts/ConfirmProductsContext";

export default function ConfirmPurchase() {
  const { confirmProducts } = useContext(ConfirmProducts);
  console.log(confirmProducts);

  return (
    <ConfirmPurchaseScreen>
      <ConfirmScreen>
        <header>Você deseja realizar a compra?</header>
        <Content>
          <section>
            {/*             <ul>
              <p>Produtos:</p>
              <li>1 Fone top R$ 200,00</li>
              <li>2 Teclado pop it its R$ 200,00</li>
              <li>1 Teclado de luizinha R$ 200,00</li>
            </ul> */}
            <p>Produtos:</p>
            <table border="1">
              <tr>
                <td>1</td>
                <td>Fone top</td>
                <td>R$ 200,00</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Teclado pop it its</td>
                <td>R$ 250,00</td>
              </tr>
            </table>
            <p>Valor total: R$ 10.000,00</p>
          </section>
          <div></div>
          <section>
            <p>Cliente: Nicolas</p>
          </section>
        </Content>
        <Buttons>
          <button>Cancelar</button>
          <button>Confirmar</button>
        </Buttons>
      </ConfirmScreen>
    </ConfirmPurchaseScreen>
  );
}

const ConfirmPurchaseScreen = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfirmScreen = styled.div`
  background-color: #fff;
  width: 80%;
  height: 55vh;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  header {
    background-color: #ed643d;
    color: #fff;
    font-weight: bold;
    width: 100%;
    height: 12%;
    border-radius: 10px 10px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Content = styled.main`
  width: 100%;
  height: 73%;
  display: flex;
  justify-content: space-between;

  div {
    background-color: #eda793;
    width: 1px;
    height: 80%;
    margin: auto 0;
  }

  section {
    width: 50%;
    padding: 10px;
  }

  section:first-child {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Buttons = styled.footer`
  border-radius: 0 0 10px 10px;
  width: 100%;
  height: 15%;
  border-top: 2px solid #eda793;
  display: flex;
  justify-content: end;
  align-items: center;

  button {
    background-color: #ed643d;
    color: #fff;
    width: 90px;
    height: 40px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    margin: 0 15px 0 0;
  }
`;
