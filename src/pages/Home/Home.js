import { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_COLOR } from "../../constants/colors.js";
import axios from "axios";
import URLS from "../../constants/URLS.js";
import Product from "./Product.js";
import LoadingDiv from "../../components/LoadingDiv.js";
import Header from "../../components/Header.js";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(products);

  function getProducts() {
    axios
      .get(`${URLS.products}`)
      .then((res) => {
        setIsLoading(false);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <PageContainer>
      <Header />
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
  margin: 0 auto;
  background-color: white;
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
