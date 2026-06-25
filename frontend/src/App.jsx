import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Perfil from './pages/perfil';
import Recrutamento from './pages/recrutamento';
import Missoes from './pages/missoes';

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