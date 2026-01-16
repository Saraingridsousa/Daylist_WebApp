'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { usuarioApi } from '../api/usuario';
import AuthShell from '../../components/auth/AuthShell';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      // await new Promise(resolve => setTimeout(resolve, 1000));
      const res = await usuarioApi.registrar({ name, email, senha: password });
      const user = res.data.user;
      const userJson = JSON.stringify(user);
      localStorage.setItem('user', userJson);
      router.push('/dados-pessoais');
    } catch (err) {
      setError('Erro ao criar conta. Tente novamente.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Criar conta"
      imageSrc='/assets/capSignUp.png'     
      error={error}
      footer={(
        <p className="text-center text-gray-600 text-sm">
          Já tem conta?{' '}
          <Link href="/login" className="text-[#AB2F5080] hover:text-[#AB2F50D4] font-semibold">
            Entrar
          </Link>
        </p>
      )}
      classname="max-w-2xl w-full"
    >
      <form onSubmit={handleSubmit} className="space-y-5 w-full">
        {/* Input de Nome e email */}
        <div className='flex flex-row w-full gap-6'>
            {/* Nome*/}
            <div className='w-full'>
                <label htmlFor="name" className="block text-sm font-bold text-gray-700">
                    Nome Completo
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome"
                    required
                    className="w-full bg-[#FFC9D780] px-4 py-2 border border-[#AB2F5040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AB2F5080] focus:border-transparent transition placeholder-[#AB2F5080] text-[#AB2F50BF]"
                    disabled={loading}
                />
            </div>
            {/* Email */}
            <div className='w-full'>
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
        </div>

        {/* Input de senha */}
        <div className='flex flex-row w-full gap-6'>
            {/* Senha */}
            <div className='w-full'>
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
            {/* Confirmar Senha */}
            <div className='w-full'>
                <label htmlFor="confirm-password" className="block text-sm font-bold text-gray-700">
                    Confirmar senha
                </label>
                <div className="relative">
                    <input
                    id="confirm-password"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#FFC9D780] px-4 py-2 border border-[#AB2F5040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AB2F5080] focus:border-transparent transition placeholder-[#AB2F5080] text-[#AB2F50BF]"
                    disabled={loading}
                    />
                    <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={loading}
                    >
                    {showConfirmPassword ? <Eye className='w-5 text-[#AB2F5080]'/> : <EyeOff className='w-5 text-[#AB2F5080]' />}
                    </button>
                </div>
            </div>
        </div>
        
        {/* Botao de criar conta */}
        <div className='flex justify-center mx-20 pt-10'>
            <button
            type="submit"
            disabled={loading}
            className=" w-full max-w-xs bg-[#FFC9D7D4] hover:bg-[#AB2F5080] disabled:bg-[#AB2F5040] text-black py-2 px-4 rounded-lg transition duration-200"
            >
            {loading ? 'Criando conta...' : 'Criar conta'}
            </button>
        </div>
      </form>
    </AuthShell>
  );
}
