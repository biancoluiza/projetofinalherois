import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import api from '../services/api';

function Recrutamento() {
  const [guildas, setGuildas] = useState([]);
  const [form, setForm] = useState({ nome: '', classe: 'Guerreiro', poder: 80, id_guilda: 1, id_usuario: 1 });
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await api.get('/guildas');
        setGuildas(data);
      } catch (error) {
        setGuildas([{ id_guilda: 1, nome: 'Ordem Arcana' }]);
      }
    }

    carregar();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await api.post('/herois', {
        ...form,
        avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
      });
      setMensagem('Herói recrutado com sucesso!');
    } catch (error) {
      setMensagem('Falha ao recrutar herói, mas o painel foi preparado para o fluxo.');
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <Navbar />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-cyan-950/20">
            <h1 className="text-2xl font-semibold text-white">Recrutamento</h1>
            <p className="mt-2 text-slate-300">Convide novos talentos para fortalecer sua guilda.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Nome do herói" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
              <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" placeholder="Classe" value={form.classe} onChange={(e) => setForm({ ...form, classe: e.target.value })} />
              <input className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" type="number" value={form.poder} onChange={(e) => setForm({ ...form, poder: Number(e.target.value) })} />
              <select className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3" value={form.id_guilda} onChange={(e) => setForm({ ...form, id_guilda: Number(e.target.value) })}>
                {guildas.map((guilda) => (
                  <option key={guilda.id_guilda} value={guilda.id_guilda}>{guilda.nome}</option>
                ))}
              </select>
              <button className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-slate-950" type="submit">Recrutar herói</button>
            </form>

            {mensagem && <p className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm text-cyan-200">{mensagem}</p>}
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-cyan-950/20">
            <h2 className="text-xl font-semibold text-white">Guildas disponíveis</h2>
            <div className="mt-4 space-y-3">
              {guildas.map((guilda) => (
                <div key={guilda.id_guilda} className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
                  <p className="font-medium text-white">{guilda.nome}</p>
                  <p className="mt-1 text-sm text-slate-400">{guilda.descricao}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Recrutamento;