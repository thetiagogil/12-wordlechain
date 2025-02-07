import { Navigate, Route, Routes } from "react-router-dom";
import { GamePage } from "../pages/game.page";

export const App = () => (
  <Routes>
    <Route path="/" element={<GamePage />} />
    <Route path="*" element={<Navigate to={"/"} />} />
  </Routes>
);
