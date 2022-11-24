import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import ResetCss from "./assets/styles/ResetCss";
import AuthContext from "./contexts/AuthContext";
import SignIn from "./pages/Authentication/SignIn";
import Home from "./pages/Home/Home";
import MyCart from "./pages/MyCart/MyCart";

function App() {
  const [auth, setAuth] = useState("637fb023d48311dd6c9f26c0");

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
