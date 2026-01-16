export default function ModalExcluirHabito() {
    return (
        <div className="w-full max-w-md bg-[#FEF7BC] gap-4 flex flex-col items-center justify-center p-6 rounded-lg shadow-lg overflow-visible text-[#FC809F]">
            <h2 className="text-2xl">Excluir Hábito</h2> 
            <span>Tem certeza que deseja excluir este hábito?</span>
            <button className="mt-5">
                <span className="bg-[#FC809F] text-white px-3 py-2 rounded-lg hover:bg-[#ede7b7] hover:text-[#FC809F] transition mt-6">Excluir Hábito</span>
            </button>
        </div>
    );
}   