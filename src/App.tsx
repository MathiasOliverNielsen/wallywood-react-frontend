import "./styles/index.scss";
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/home/home";
import { MainLayout } from "./layouts/MainLayout";
import { Posters } from "./pages/posters/posters";
import { Login } from "./pages/login/Login";
import { AboutUs } from "./pages/aboutUs/aboutUs";
import { ContactUs } from "./pages/contactUs/contactUs";
import { PosterDetail } from "./pages/posterDetail/posterDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/posters" element={<Posters />} />
            <Route path="/posters/:id" element={<PosterDetail />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
