import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import ChangePassword from "./components/ChangePassword";

function App() {
  return (
    <>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/changepassword" element={<ChangePassword />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;