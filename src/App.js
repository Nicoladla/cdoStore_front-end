import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import ResetCss from "./assets/styles/ResetCss";
import AuthContext from "./contexts/AuthContext";
import SignIn from "./pages/Authentication/SignIn";
import Home from "./pages/Home/Home";
import MyCart from "./pages/MyCart/MyCart";

function App() {
  const [auth, setAuth] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzgzMDhkN2UwZGNkYjVkYjQ1YTYzMTYiLCJpYXQiOjE2Njk1MzE4NjUsImV4cCI6MTY2OTU1MzQ2NX0.tZV23gPTBfAsoYe3CACW_a7RlEkZPJnu-HsJqF6dJMQ"
  );

  return (
    <>
      <ResetCss />
      <GlobalStyle />
      <AuthContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <Routes>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/my-cart" element={<MyCart />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
