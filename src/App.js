import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import NavigationBar from "./components/NavigationBar";
function App() {
  return (
    <>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;