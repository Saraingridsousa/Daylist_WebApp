import Image from "next/image";

export function StatsDashboard() {
  return (
    <section className="w-full max-w-5xl rounded-[32px] overflow-hidden shadow-[0_20px_60px_-25px_rgba(64,64,64,0.45)]">
      <header className="bg-[#7ea4d7] px-8 py-5 flex items-center justify-between">
        <span className="text-white text-lg font-semibold tracking-wide">Estatísticas</span>
        <div className="w-12 h-12 rounded-full border border-white/70 bg-white/20 flex items-center justify-center">
          <svg
            aria-hidden
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="9" r="3.5" />
            <path d="M5.75 20c.55-3.4 2.83-5.5 6.25-5.5s5.7 2.1 6.25 5.5" />
          </svg>
        </div>
      </header>

      <div className="bg-[#fbd4fb] px-8 pb-12 pt-14">
        <h1 className="text-center text-4xl font-bold text-[#4874b1] drop-shadow-[0_2px_0_rgba(255,255,255,0.8)]">
          Suas Estatísticas de Hábitos
        </h1>

        <div className="mt-10 flex flex-wrap items-end justify-center gap-8">
          <div>
            <label className="block text-[#4874b1] font-semibold mb-2">Hábito:</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-2xl">💧</span>
              <select className="appearance-none bg-white rounded-xl border border-[#c9d6f3] py-3 pl-12 pr-11 text-[#4874b1] font-medium shadow-[0_10px_30px_-20px_rgba(72,116,177,0.7)] focus:outline-none">
                <option>Beber água</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#4874b1]">▾</span>
            </div>
          </div>

          <div>
            <label className="block text-[#4874b1] font-semibold mb-2">Período:</label>
            <div className="relative">
              <select className="appearance-none bg-white rounded-xl border border-[#c9d6f3] py-3 pl-5 pr-11 text-[#4874b1] font-medium shadow-[0_10px_30px_-20px_rgba(72,116,177,0.7)] focus:outline-none">
                <option>Últimas 4 semanas</option>
              </select>
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#4874b1]">▾</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="bg-white rounded-[28px] px-8 pt-10 pb-8 shadow-[0_20px_50px_-25px_rgba(72,116,177,0.6)]">
            <div className="flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <div
                  className="h-56 w-56 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#7ea4d7 0deg 288deg, #f6e599 288deg 360deg)",
                  }}
                />
                <div className="absolute h-36 w-36 rounded-full bg-white flex flex-col items-center justify-center text-center shadow-inner">
                  <span className="text-3xl font-bold text-[#4874b1]">80%</span>
                  <span className="text-sm text-[#7d7d7d]">Meta Cumprida</span>
                </div>
              </div>
              <p className="mt-8 text-[#4874b1] font-semibold">Realizado: 28 de 35 vezes</p>
              <p className="text-[#7d7d7d]">Meta: 35 vezes</p>
              <div className="mt-6">
                <Image
                  src="/capi.svg"
                  alt="Ilustração de uma capivara estudando"
                  width={120}
                  height={120}
                  priority
                />
              </div>
            </div>npm 
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-[28px] px-6 py-8 shadow-[0_20px_50px_-25px_rgba(72,116,177,0.6)] flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e9f2ff]">
                <svg
                  aria-hidden
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7ea4d7"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3.5c-3 2.8-5.5 6.1-5.5 8.7A5.5 5.5 0 0 0 12 17.7a5.5 5.5 0 0 0 5.5-5.5c0-2.6-2.5-6-5.5-8.7Z" />
                </svg>
              </div>
              <p className="mt-4 text-[#4874b1] font-semibold">Sua Ofensiva Atual:</p>
              <p className="text-[#7d7d7d] text-lg">15 dias🔥</p>
            </div>

            <div className="bg-white rounded-[28px] px-6 py-8 shadow-[0_20px_50px_-25px_rgba(72,116,177,0.6)] flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e9f2ff]">
                <svg
                  aria-hidden
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7ea4d7"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 20v-6" />
                  <path d="M12 20v-9" />
                  <path d="M18 20v-3" />
                  <path d="M4 4h16" />
                </svg>
              </div>
              <p className="mt-4 text-[#4874b1] font-semibold">Maior Sequência:</p>
              <p className="text-[#7d7d7d] text-lg">22 dias</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
