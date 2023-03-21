import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "routes/Admin";
import Home from "routes/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home></Home>}></Route>
        <Route path="/admin" element={<Admin></Admin>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
