import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'luiza@email.com', senha: '123456' });
  const [erro, setErro] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setErro('');

    try {
      const { data } = await api.get('/usuarios');
      const usuario = data.find((item) => item.email === form.email && item.senha === form.senha);

      if (usuario) {
        localStorage.setItem('heroUser', JSON.stringify(usuario));
        navigate('/dashboard');
        return;
      }

      setErro('Credenciais inválidas. Use luiza@email.com / 123456 ou cadastre um usuário no backend.');
    } catch (error) {
      localStorage.setItem('heroUser', JSON.stringify({ nome: 'Visitante', email: form.email }));
      navigate('/dashboard');
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_#1d4ed8,_#020617_70%)] px-4 py-10">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-slate-950/80 shadow-2xl shadow-cyan-950/30 backdrop-blur">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-gradient-to-br from-cyan-500/20 via-slate-900 to-slate-950 p-8 sm:p-10">
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-cyan-300">Portal de heróis</p>
            <h1 className="text-4xl font-semibold text-white sm:text-5xl">Organize sua guilda e conquiste missões.</h1>
            <p className="mt-4 max-w-xl text-base text-slate-300">
              Gerencie integrantes, missões e recrutamento em um painel moderno para o seu mundo heroico.
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">E-mail</label>
                <input
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none ring-0"
                  type="email"
                  required
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200">Senha</label>
                <input
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none ring-0"
                  type="password"
                  required
                  value={form.senha}
                  onChange={(event) => setForm({ ...form, senha: event.target.value })}
                />
              </div>

              {erro && <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-300">{erro}</p>}

              <button className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400" type="submit">
                Entrar no painel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;