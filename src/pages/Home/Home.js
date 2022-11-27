import { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_COLOR } from "../../constants/colors.js";
import axios from "axios";
import API_URLs from "../../constants/URLS.js";
import Product from "./Product.js";
import LoadingDiv from "../../components/LoadingDiv.js";
import Header from "../../components/Header.js";
import swal from "sweetalert";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function showGenericError(message) {
    swal({
      icon: "error",
      title: "Ops!...",
      text: message,
    });
  }

  async function getProducts() {
    try {
      const res = await axios.get(`${API_URLs.products}`);
      setProducts(res.data);
      setIsLoading(false);
    } catch (err) {
      showGenericError(err.response.data);
    }
  }

  useEffect(() => {
    getProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <PageContainer>
      <Header
        calledFrom={API_URLs.products}
        setIsLoading={setIsLoading}
        setProducts={setProducts}
      />
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
  height: fit-content;
  min-height: 100vh;
  @media (max-width: 700px) {
    margin-top: 100px;
  }
`;

const ProductsContainer = styled.main`
  width: 80%;
  margin: 0 auto;
  ul {
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;
  }
`;
