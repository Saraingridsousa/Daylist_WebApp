export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-blue-200/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🦫</span>
          <h1 className="text-xl font-bold text-blue-900">Daylist</h1>
        </div>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
          ENTRAR
        </button>
      </div>
    </header>
  );
}
