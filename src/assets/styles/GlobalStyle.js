import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: content-box;
}

body{
  font-family: 'Roboto', sans-serif;
}

button:hover{
  cursor: pointer;
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
