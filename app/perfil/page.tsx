import PerfilCard from "@/components/cards/perfil";
import Image from "next/image";

export default function Perfil() {
  return (
    <main className="gap-5 w-full bg-[radial-gradient(circle,#FFC0A1_13%,#FFC9D7_55%,#FED9FA_100%)] flex min-h-screen flex-col items-center justify-center p-16">
      <div className="bg-white rounded-lg w-full max-w-4xl p-8 pb-20 flex flex-col gap-6 items-center shadow-lg text-gray-900">
        <div className="flex flex-row gap-6 justify-start items-center w-full">
          <Image 
            alt="Daylist Logo"
            src="/assets/capPerfil.png"
            width={70}
            height={70}
            className={``}
          />
          <h1 className="text-2xl">Bem vindo de volta, usuário!</h1>
        </div>
        <div className="flex justify-start w-full">
          <h2>Dados Pessoais:</h2>
        </div>
        {/* Cards */}
        <PerfilCard idade={25} genero="Masculino" peso={70} altura={175} dias={15} progress={75}/>

      </div>
    </main>
    );
}
