import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/recrutamento', label: 'Recrutar' },
  { to: '/missoes', label: 'Missões' },
  { to: '/perfil', label: 'Perfil' },
];

function Navbar() {
  return (
    <nav className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-lg shadow-cyan-950/30 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Portal dos Heróis</p>
        <h2 className="text-lg font-semibold text-white">Missões de elite</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;