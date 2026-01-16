export default function Hero() {
  return (
    <section className="relative w-full min-h-[420px] md:min-h-[520px] flex flex-col items-center justify-start pt-0 pb-0 bg-[#E6F0FB] overflow-hidden">
      {/* Título e subtítulo centralizados */}
      <div className="relative z-20 flex flex-col items-center justify-center mt-14 md:mt-20">
        <h1
          className="text-[2.5rem] md:text-[3.5rem] font-extrabold mb-2 tracking-wide"
          style={{
            color: '#fff',
            letterSpacing: '0.04em',
            fontFamily: 'Quicksand, Arial, sans-serif',
            WebkitTextStroke: '2px #BFD6F6',
            textShadow: '0 2px 0 #BFD6F6, 0 4px 12px #BFD6F6',
          }}
        >
          Tire seus<br className="block md:hidden" /> objetivos do papel
        </h1>
        <p
          className="text-base md:text-xl mb-2 max-w-2xl mx-auto font-medium"
          style={{
            color: '#7CA3D6',
            fontFamily: 'Quicksand, Arial, sans-serif',
          }}
        >
          Coloque na lista e dê um check na vida, um dia de cada vez.
        </p>
      </div>

      {/* Capivaras centralizadas sobre os arcos e linhas atrás */}
      <div className="relative flex flex-col items-center z-10 mt-8" style={{height: '180px'}}>
        <svg className="absolute top-0 left-0 w-full h-[140px] z-0" viewBox="0 0 1440 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 Q720,-20 1440,40" stroke="#BFD6F6" strokeWidth="4" fill="none" />
          <path d="M0,80 Q720,20 1440,80" stroke="#E6B6E6" strokeWidth="4" fill="none" />
          <path d="M0,120 Q720,60 1440,120" stroke="#FDE6F6" strokeWidth="4" fill="none" />
        </svg>
        <div className="flex flex-row gap-10 md:gap-20 items-end relative z-10 mt-6">
          <img src="/Card - Dormindo.svg" alt="Capivara Dormindo" className="w-32 h-32 md:w-40 md:h-40" />
          <img src="/Card - Bebendo água.svg" alt="Capivara Bebendo Água" className="w-32 h-32 md:w-40 md:h-40" />
          <img src="/Card - Exercício.svg" alt="Capivara Exercício" className="w-32 h-32 md:w-40 md:h-40" />
          <img src="/Card - Estudando.svg" alt="Capivara Estudando" className="w-32 h-32 md:w-40 md:h-40" />
        </div>
      </div>
    </section>
  );
}
