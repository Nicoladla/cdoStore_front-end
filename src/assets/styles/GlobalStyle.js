import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: content-box;
}

a{
  color: black;
  text-decoration: none;
}

a:visited{
  color: none;
}
`;

export default GlobalStyle;
