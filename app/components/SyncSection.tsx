export default function SyncSection() {
  return (
    <section className="w-full py-20" style={{background: '#FEF7BC'}}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">
          {/* Ilustração de Dispositivos */}
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-full w-64 h-64 flex items-center justify-center shadow-lg border-4 border-[#FDE6F6]">
              <img src="/Telas.svg" alt="Telas" className="w-56 h-56 object-contain" />
            </div>
          </div>

          {/* Texto */}
          <div className="text-center md:text-left max-w-md">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
              Sincronize em todas as plataformas.
            </h2>
            <p className="text-lg text-blue-800 leading-relaxed">
              Seja no seu celular, computador, tablet ou relógio, o Daylist oferece sincronização em tempo real e conexão perfeita.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
