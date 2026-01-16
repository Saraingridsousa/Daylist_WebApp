export default function CTASection() {
  return (
    <section className="w-full py-16" style={{background: '#FEF7BC'}}>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4">
        {/* Imagem à esquerda */}
        <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto">
          <div className="rounded-full border-8 border-white bg-[#E6E6FD] p-2" style={{boxShadow: '0 2px 16px #e6e6fd'}}>
            <img src="/Telas.svg" alt="Telas" className="w-48 h-48 md:w-64 md:h-64 object-contain" />
          </div>
        </div>
        {/* Texto à direita */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center md:text-left" style={{ color: '#254A91', fontFamily: 'Quicksand, Arial, sans-serif' }}>
            Sincronize em todas as plataformas.
          </h2>
          <p className="text-lg md:text-xl text-[#254A91] mb-6 text-center md:text-left" style={{fontFamily: 'Quicksand, Arial, sans-serif'}}>
            Seja no seu celular, computador, tablet ou relógio, o Daylist oferece sincronização em tempo real e conexão perfeita.
          </p>
          <button
            className="bg-white text-[#7CA3D6] px-8 py-4 rounded-full font-bold text-lg shadow-md border border-[#BFD6F6] hover:bg-blue-50 transition-all hover:scale-105 mt-2"
            style={{ fontFamily: 'Quicksand, Arial, sans-serif', boxShadow: '0 4px 8px #BFD6F6', minWidth: '320px' }}
          >
            ENTRE OU REGISTRE-SE
          </button>
        </div>
      </div>
    </section>
  );
}
