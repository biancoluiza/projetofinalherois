import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import api from '../services/api';

function Missoes() {
  const [missoes, setMissoes] = useState([]);
  const [form, setForm] = useState({ descricao: '', recompensa_ouro: 300, status: 'Em andamento', id_heroi: 1 });
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.get('/missoes');
        setMissoes(data);
      } catch (error) {
        setMissoes([{ descricao: 'Eliminar goblins da floresta', recompensa_ouro: 500, status: 'Em andamento' }]);
      }
    }

    carregar();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post('/missoes', form);
      setMensagem('Missão registrada com sucesso!');
    } catch (error) {
      setMensagem('A missão foi preparada para o fluxo do backend.');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <Navbar />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-cyan-950/20">
            <h1 className="text-2xl font-semibold text-white">Missões</h1>
            <p className="mt-2 text-slate-300">Planeje novas operações para sua equipe.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <textarea className="min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Descreva a missão" value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
              <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" type="number" value={form.recompensa_ouro} onChange={(e) => setForm({ ...form, recompensa_ouro: Number(e.target.value) })} />
              <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="Em andamento">Em andamento</option>
                <option value="Concluida">Concluída</option>
                <option value="Falhou">Falhou</option>
              </select>
              <button className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950" type="submit">Criar missão</button>
            </form>

            {mensagem && <p className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm text-cyan-200">{mensagem}</p>}
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-cyan-950/20">
            <h2 className="text-xl font-semibold text-white">Missões em andamento</h2>
            <div className="mt-4 space-y-3">
              {missoes.map((missao, index) => (
                <div key={index} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{missao.descricao}</p>
                    <span className="rounded-full bg-amber-500/20 px-3 py-1 text-sm text-amber-300">{missao.status}</span>
                  </div>
                  <p className="mt-2 text-sm text-slate-400">Recompensa: {missao.recompensa_ouro || 0} ouro</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Missoes;