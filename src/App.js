import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import ResetCss from "./assets/styles/ResetCss";
import SignIn from "./pages/Authentication/SignIn";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <ResetCss />
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
