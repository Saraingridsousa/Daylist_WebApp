export function HistoricoNavbar() {
  return (
    <div className="w-full bg-[#789CCB] flex justify-center">
      <div className="w-full max-w-4xl flex justify-end py-4 px-4 md:px-6">
        <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
