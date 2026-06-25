import Navbar from '../components/navbar';

function Perfil() {
  const usuario = JSON.parse(localStorage.getItem('heroUser') || '{}');

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <Navbar />
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-cyan-950/20">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Perfil</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">{usuario.nome || 'Visitante'}</h1>
            <p className="mt-3 text-slate-300">{usuario.email || 'Entre para salvar seu perfil'}</p>
          </section>

          <section className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-cyan-950/20">
            <h2 className="text-xl font-semibold text-white">Resumo do perfil</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">Status: On-line</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">Guilda: Ordem Arcana</div>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">Missões concluídas: 12</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Perfil;