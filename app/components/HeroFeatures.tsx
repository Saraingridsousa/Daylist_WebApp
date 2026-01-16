
const features = [
  {
    title: "Gestão de Hábitos",
    description:
      "Crie e organize hábitos sob medida para você. Defina metas, escolha a frequência ideal e acompanhe comportamentos de saúde, estudos ou lazer em um só lugar",
  },
  {
    title: "Agenda Inteligente",
    description:
      "Visualize suas tarefas diárias e semanais de forma clara. Nossa interface destaca o que é prioridade agora, ajudando você a viver um dia de cada vez, sem ansiedade.",
  },
  {
    title: "Insights com IA",
    description:
      "Receba relatórios gerados por Inteligência Artificial. Entenda seus padrões, receba dicas motivacionais e descubra como melhorar sua constância.",
  },
  {
    title: "Monitoramento Visual",
    description:
      "Acompanhe sua evolução através de gráficos intuitivos. Veja o quanto você já cumpriu das suas metas e celebre cada pequena vitória visualmente.",
  },
  {
    title: "Sistema de Ofensiva",
    description:
      "Mantenha a constância. Transforme disciplina em jogo. Acumule dias seguidos de metas batidas, aumente sua ofensiva e sinta a motivação de não quebrar a corrente.",
  },
  {
    title: "Interface Zen",
    description:
      "Simples e focada. Um design limpo, livre de distrações sociais e focado apenas no seu progresso. Navegue de forma fluida em qualquer dispositivo, seja no computador ou celular.",
  },
];

export default function HeroFeatures() {
  return (
    <section className="w-full flex flex-col items-center justify-center pt-8 pb-0 bg-gradient-to-b from-[#FDE6F6] via-[#FDE6F6] to-[#FDE6F6]" style={{background: 'radial-gradient(circle at center, #FFD6E6 0%, #FDE6F6 100%)'}}>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-0" style={{marginTop: '0'}}>
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center" style={{fontFamily: 'Quicksand, Arial, sans-serif'}}>
            <h3 className="text-xl font-semibold mb-4" style={{fontFamily: 'Quicksand, Arial, sans-serif'}}>{feature.title}</h3>
            <p className="text-base text-gray-700 leading-relaxed" style={{fontFamily: 'Quicksand, Arial, sans-serif'}}>{feature.description}</p>
          </div>
        ))}
      </div>
      {/* Botão com capivara grande na lateral */}
      <div className="w-full flex flex-col items-center justify-center mt-12 mb-0">
        <div className="flex items-center justify-center gap-4 relative w-full" style={{minHeight: '180px'}}>
          <img src="/Capivara_comp.svg" alt="Capivara" className="absolute left-0 bottom-0 w-56 h-56 md:w-72 md:h-72 -mb-10 -ml-10 z-10" style={{maxWidth: 'none'}} />
          <div className="flex-1"></div>
          <button
            className="bg-white text-[#7CA3D6] px-8 py-4 rounded-full font-bold text-lg shadow-md border border-[#BFD6F6] hover:bg-blue-50 transition-all hover:scale-105 mx-auto"
            style={{ fontFamily: 'Quicksand, Arial, sans-serif', boxShadow: '0 4px 8px #BFD6F6', minWidth: '320px' }}
          >
            ENTRE OU REGISTRE-SE
          </button>
          <div className="flex-1"></div>
        </div>
      </div>
    </section>
  );
}
