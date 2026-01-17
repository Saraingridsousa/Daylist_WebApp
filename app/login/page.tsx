'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { authService } from '@/lib/auth.service';
import AuthShell from '../../components/auth/AuthShell';


function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Verificar se há erro na URL
  useEffect(() => {
    const urlError = searchParams.get('error');
    if (urlError) {
      setError(urlError);
    }
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {      
      const { user } = await authService.login({ email, senha: password });
      const userJson = JSON.stringify(user);
      localStorage.setItem('user', userJson);
      // Depois de logar, redirecione para a página principal
      router.push('/listaDeHabitos');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login. Tente novamente.';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Login"
      imageSrc='/assets/capLogin.png'
      error={error}
      footer={(
        <p className="text-center text-gray-600 text-sm">
          Não tem conta?{' '}
          <Link href="/signup" className="text-[#AB2F5080] hover:text-[#AB2F50D4] font-semibold">
            Inscreva-se
          </Link>
        </p>
      )}
      classname="max-w-md w-full"
    >
      {/* Formulário do login */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Input de email */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700">
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
        <div className='pt-3'>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700">
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
        <div className='flex justify-center mx-20 pt-10'>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FFC9D7D4] hover:bg-[#AB2F5080] disabled:bg-[#AB2F5040] text-black py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </AuthShell>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Carregando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
