export default function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-blue-200 via-pink-200 to-pink-300 pt-24 pb-16 overflow-hidden">
      {/* Capivaras decorativas */}
      <div className="absolute top-40 left-10 text-6xl animate-bounce">
        🦫
      </div>
      <div className="absolute top-32 left-1/4 text-5xl animate-pulse">
        🦫
      </div>
      <div className="absolute top-36 right-1/4 text-5xl animate-bounce delay-100">
        🦫
      </div>
      <div className="absolute top-40 right-10 text-6xl animate-pulse delay-200">
        🦫
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Tire seus objetivos
          <br />
          do papel
        </h1>
        <p className="text-xl md:text-2xl text-blue-900 mb-12 max-w-2xl mx-auto">
          Coloque na lista e dê um check na vida, um dia de cada vez.
        </p>

        {/* Grid de Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          <FeatureCard
            title="Gestão de Hábitos"
            description="Acompanhe hábitos diários com facilidade. Visualize seu progresso e celebre suas conquistas com um sistema de ofensivas e lembretes inteligentes."
          />
          <FeatureCard
            title="Agenda Inteligente"
            description="Organize suas tarefas de forma eficiente. O Daylist organiza automaticamente suas prioridades e sugere os melhores horários para executá-las."
          />
          <FeatureCard
            title="Insights com IA"
            description="Receba análises personalizadas sobre sua produtividade. Aprenda com seus padrões e melhore continuamente com recomendações inteligentes."
          />
          <FeatureCard
            title="Monitoramento Visual"
            description="Acompanhe visualmente seu progresso diário. Gráficos e estatísticas que tornam suas conquistas mais tangíveis e motivadoras."
          />
          <FeatureCard
            title="Sistema de Ofensiva"
            description="Mantenha a consistência e construa sequências de dias produtivos. Quanto maior sua ofensiva, maior sua motivação para continuar."
          />
          <FeatureCard
            title="Interface Zen"
            description="Design limpo e minimalista que não distrai. Foque no que importa com uma interface intuitiva e agradável aos olhos."
          />
        </div>

        {/* CTA com Capivara */}
        <div className="flex items-center justify-center gap-4">
          <div className="text-7xl">🦫</div>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-lg">
            ENTRE OU REGISTRE-SE
          </button>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <h3 className="text-lg font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
