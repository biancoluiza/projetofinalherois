import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 p-4 rounded-xl mb-6 flex gap-4">
      <Link to="/dashboard">Dashboard</Link>

      <Link to="/recrutamento">Recrutar</Link>

      <Link to="/missoes">Missões</Link>

      <Link to="/perfil">Perfil</Link>
    </nav>
  );
}

export default Navbar;