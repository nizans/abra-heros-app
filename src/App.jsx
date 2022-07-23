import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import AllHeroes from "./pages/AllHeroes";
import Favorites from "./pages/Favorites";
import Header from "./components/Header";
export const BASE_URL = "https://abra-training.herokuapp.com/api/";

function Main() {
  return (
    <div className="main">
      <Header />
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="" element={<AllHeroes />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>
    </Routes>
  );
}

export default App;
