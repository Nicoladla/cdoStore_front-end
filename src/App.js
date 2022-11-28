import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyle from "./assets/styles/GlobalStyle";
import ResetCss from "./assets/styles/ResetCss";

import AuthContext from "./contexts/AuthContext";
import SignIn from "./pages/Authentication/SignIn";
import SignUp from "./pages/Authentication/SignUp";
import Home from "./pages/Home/Home";
import MyCart from "./pages/MyCart/MyCart";
import NotFound from "./pages/NotFound";

function App() {
  const [auth, setAuth] = useState("");

  return (
    <>
      <ResetCss />
      <GlobalStyle />

      <AuthContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/my-cart" element={<MyCart />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
}

export default App;
