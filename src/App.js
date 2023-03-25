import Footer from "components/footer/Footer";
import ModalVideoPlayTrailer from "components/modalVideo/ModalVideoPlayTrailer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "routes/Admin";
import Home from "routes/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home></Home>}></Route>
        <Route path="/admin/*" element={<Admin></Admin>}></Route>
      </Routes>
      <Footer></Footer>
      <ModalVideoPlayTrailer></ModalVideoPlayTrailer>
    </BrowserRouter>
  );
}

export default App;
