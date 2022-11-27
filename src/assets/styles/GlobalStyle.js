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

input{
  background-color: #f2f2f2;
  border: 1px solid #d6d6d6;
  border-radius: 5px;
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  padding-left: 10px;
  outline: none;

  &:disabled{
    background-color: #e3e3e3;
  }
}
`;

export default GlobalStyle;
