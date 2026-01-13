export default function SyncSection() {
  return (
    <section className="bg-gradient-to-b from-pink-300 to-yellow-200 py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-5xl mx-auto">
          {/* Ilustração de Dispositivos */}
          <div className="relative">
            <div className="bg-purple-200 rounded-full w-64 h-64 flex items-center justify-center">
              <div className="space-y-4">
                {/* Desktop */}
                <div className="bg-gray-800 rounded-lg p-2 w-40 h-24 flex items-center justify-center border-4 border-gray-700">
                  <div className="bg-pink-200 w-full h-full rounded flex items-center justify-center text-xs">
                    🦫
                  </div>
                </div>
                {/* Mobile/Tablet */}
                <div className="flex gap-2 justify-center">
                  <div className="bg-gray-800 rounded-lg p-1 w-16 h-20 flex items-center justify-center border-2 border-gray-700">
                    <div className="bg-pink-200 w-full h-full rounded flex items-center justify-center text-xs">
                      🦫
                    </div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-1 w-12 h-16 flex items-center justify-center border-2 border-gray-700">
                    <div className="bg-pink-200 w-full h-full rounded flex items-center justify-center text-xs">
                      🦫
                    </div>
                  </div>
                </div>
              </div>
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
