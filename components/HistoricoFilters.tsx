type Habito = {
  id: number;
  nome: string;
  emoji: string;
  completado: boolean;
};

interface HistoricoFiltersProps {
  habitos: Habito[];
  habitoSelecionado: string;
  onHabitoChange: (value: string) => void;
  dataSelecionada: string;
  onDataChange: (value: string) => void;
}

export function HistoricoFilters({
  habitos,
  habitoSelecionado,
  onHabitoChange,
  dataSelecionada,
  onDataChange,
}: HistoricoFiltersProps) {
  return (
    <div className="w-full flex flex-col md:flex-row gap-4 mb-8">
      {/* Filtro de Hábito */}
      <div className="flex-1">
        <label className="text-sm text-gray-700 mb-1 block">Hábito:</label>
        <div className="flex">
          <select
            value={habitoSelecionado}
            onChange={(e) => onHabitoChange(e.target.value)}
            className="flex-1 px-3 py-2 bg-white text-gray-800 border border-[#4FC3F7] rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4FC3F7] focus:border-[#4FC3F7]"
          >
            <option value="Todos">Todos</option>
            {habitos.map((habito) => (
              <option key={habito.id} value={habito.nome} className="text-gray-800">
                {habito.nome}
              </option>
            ))}
          </select>
          <button className="px-4 py-2 bg-[#E1BEE7] text-purple-800 font-medium rounded-r-lg text-sm hover:bg-[#CE93D8] transition-colors whitespace-nowrap">
            QUI
          </button>
        </div>
      </div>

      {/* Filtro de Período */}
      <div className="flex-1">
        <label className="text-sm text-gray-700 mb-1 block">Período:</label>
        <div className="relative">
          <input
            type="date"
            value={dataSelecionada}
            onChange={(e) => onDataChange(e.target.value)}
            className="w-full px-3 py-2 bg-white text-gray-800 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4FC3F7]"
          />
        </div>
      </div>
    </div>
  );
}
