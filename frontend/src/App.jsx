import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Perfil";
import Recrutamento from "./pages/Recrutamento";
import Missoes from "./pages/Missoes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/perfil" element={<Perfil />} />

        <Route path="/recrutamento" element={<Recrutamento />} />

        <Route path="/missoes" element={<Missoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;