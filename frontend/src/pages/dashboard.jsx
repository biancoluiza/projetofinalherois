import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import api from '../services/api';

const fallback = {
  usuarios: [{ nome: 'Luiza', email: 'luiza@email.com' }],
  guildas: [{ nome: 'Ordem Arcana', descricao: 'Guilda especializada em magia' }],
  herois: [{ nome: 'Mercúrio', classe: 'Mago', poder: 95 }],
  missoes: [{ descricao: 'Eliminar goblins da floresta', recompensa_ouro: 500, status: 'Em andamento' }],
};

function Dashboard() {
  const [dados, setDados] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      try {
        const [usuarios, guildas, herois, missoes] = await Promise.all([
          api.get('/usuarios'),
          api.get('/guildas'),
          api.get('/herois'),
          api.get('/missoes'),
        ]);

        setDados({
          usuarios: usuarios.data,
          guildas: guildas.data,
          herois: herois.data,
          missoes: missoes.data,
        });
      } catch (error) {
        setDados(fallback);
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  const usuario = JSON.parse(localStorage.getItem('heroUser') || '{}');

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <Navbar />

        <section className="mb-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-cyan-950/20">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Bem-vindo de volta</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{usuario.nome || 'Heroína sem nome'}</h1>
          <p className="mt-2 max-w-2xl text-slate-300">
            Seu painel está pronto para acompanhar recrutas, missões e o progresso da sua guilda.
          </p>
        </section>

        {loading ? (
          <p className="text-slate-400">Carregando dados...</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">
              <p className="text-sm text-cyan-200">Heróis ativos</p>
              <p className="mt-2 text-3xl font-semibold text-white">{dados.herois.length}</p>
            </div>
            <div className="rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/10 p-5">
              <p className="text-sm text-fuchsia-200">Guildas</p>
              <p className="mt-2 text-3xl font-semibold text-white">{dados.guildas.length}</p>
            </div>
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5">
              <p className="text-sm text-amber-200">Missões</p>
              <p className="mt-2 text-3xl font-semibold text-white">{dados.missoes.length}</p>
            </div>
          </div>
        )}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-cyan-950/20">
            <h2 className="mb-4 text-xl font-semibold text-white">Resumo da semana</h2>
            <ul className="space-y-3 text-sm text-slate-300">
              {dados.missoes.slice(0, 3).map((missao, index) => (
                <li key={index} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <div className="flex items-center justify-between">
                    <span>{missao.descricao}</span>
                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-cyan-300">{missao.status}</span>
                  </div>
                  <p className="mt-2 text-slate-400">Recompensa: {missao.recompensa_ouro || 0} ouro</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-cyan-950/20">
            <h2 className="mb-4 text-xl font-semibold text-white">Equipe</h2>
            <div className="space-y-3">
              {dados.herois.slice(0, 3).map((heroi, index) => (
                <div key={index} className="rounded-2xl border border-slate-800 bg-slate-950/60 p-3">
                  <p className="font-medium text-white">{heroi.nome}</p>
                  <p className="text-sm text-slate-400">{heroi.classe} · Poder {heroi.poder}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;