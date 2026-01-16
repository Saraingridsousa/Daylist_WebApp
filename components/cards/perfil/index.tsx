import Image from "next/image";

interface PerfilProps{
  idade?: number;
  genero?: string;
  peso?: number;
  altura?: number;
  dias?: number;
  progress?: number;
}
export default function PerfilCard({idade, genero, peso, altura, dias, progress}: PerfilProps) {

  return (
   <div className="flex flex-col w-full">
    <div className="flex flex-row w-full justify-around gap-6">
        <div className="bg-[#FED9FA] p-6 rounded-lg w-2/5 flex flex-row gap-8">
            <div className="flex flex-col gap-4 justify-start w-1/2">
              <div className="flex flex-col">
                <span>Idade:</span>
                <span className="text-sm text-gray-800">{idade}</span>
              </div>

              <div className="flex flex-col">
                <span>Altura:</span>
                <span className="text-sm text-gray-800">{altura}cm</span>
              </div>
            </div>

            <div className="flex flex-col gap-4 justify-start w-1/2">
                <div className="flex flex-col">
                <span>Gênero:</span>
                <span className="text-sm text-gray-800">{genero}</span>
              </div>
              <div className="flex flex-col">
                <span>Peso:</span>
                <span className="text-sm text-gray-800">{peso}Kg</span>
              </div>
            </div>
        </div>

        <div className="bg-[#FED9FA] p-6 rounded-lg w-2/5 flex flex-col justify-center items-center gap-2">
            <h3>Streak</h3>
            <Image
                alt="Streak Icon"
                src="/assets/perfilFire.png"
                width={25}
                height={25}
            />
            <span>{dias}</span>
            <span>Dias</span>
        </div>
    </div>
    <div className="flex flex-col w-full mt-10 pl-7 justify-around text-gray-900">
          <h2>Progresso Semanal:</h2>
          <div className="flex w-full flex-row gap-4 items-center">
            
              <div className="w-1/3 bg-gray-300 rounded-full h-4 mt-1">
                  <div className="bg-[#FC809F] h-4 rounded-full" style={{ width: `${progress}%` }}></div>
              </div>

            <span>{progress}% da meta semanal concluída!</span>
          </div>
    </div>
   </div>
  );
}