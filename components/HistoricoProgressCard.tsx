import Image from "next/image";

interface HistoricoProgressCardProps {
  dataCurta: string;
  porcentagem: number;
}

export function HistoricoProgressCard({ dataCurta, porcentagem }: HistoricoProgressCardProps) {
  return (
    <div className="w-full bg-[#FFCDD2] rounded-2xl p-4 md:p-5 mb-8 flex items-center gap-4 shadow-sm">
      <div className="w-16 h-16 flex-shrink-0">
        <Image
          src="/capii.png"
          alt="Capivara mascote"
          width={64}
          height={64}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1">
        <p className="text-gray-800 text-sm md:text-base leading-snug">
          No dia {dataCurta}, você completou{" "}
          <span className="font-bold">{porcentagem}%</span> dos seus hábitos!!{" "}
          <span className="text-yellow-500">⭐</span>
        </p>
      </div>
    </div>
  );
}
