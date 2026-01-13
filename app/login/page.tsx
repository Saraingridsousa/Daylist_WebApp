'use client';

import { useState, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {      
      // Simulação de delay de requisição
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Depois de logar, redirecione para a página principal
      router.push('/');
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[radial-gradient(circle,#FFC0A1_13%,#FFC9D7_55%,#FED9FA_100%)] min-h-screen flex items-center justify-center p-4">
      <div className="relative w-full max-w-md flex justify-center">
        {/* Imagem atrás do card */}
        <Image
          alt="Daylist Logo"
          src="/assets/capLogin.png"
          width={150}
          height={150}
          className="absolute -top-28 left-1/2 -translate-x-1/2 z-0"
        />
        <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 pt-10 w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">
              Login
            </h1>
          </div>

          {/* Mensagem de erro */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Formulário do login */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Input de email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="w-full bg-[#FFC9D780] px-4 py-2 border border-[#AB2F5040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AB2F5080] focus:border-transparent transition placeholder-[#AB2F5080] text-[#AB2F50BF]"
                disabled={loading}
              />
            </div>

            {/* Input de senha */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#FFC9D780] px-4 py-2 border border-[#AB2F5040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AB2F5080] focus:border-transparent transition placeholder-[#AB2F5080] text-[#AB2F50BF]"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={loading}
                >
                  {showPassword ? <Eye className='w-5 text-[#AB2F5080]'/> : <EyeOff className='w-5 text-[#AB2F5080]' />}
                </button>
              </div>
            </div>


            {/* Botao de entrar */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FFC9D7D4] hover:bg-[#AB2F5080] disabled:bg-[#AB2F5040] text-black py-2 px-4 rounded-lg transition duration-200"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Fazer conta */}
          <p className="text-center text-gray-600 text-sm mt-6">
            Não tem conta?{' '}
            <Link href="/signup" className="text-[#AB2F5080] hover:text-[#AB2F50D4] font-semibold">
              Inscreva-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
