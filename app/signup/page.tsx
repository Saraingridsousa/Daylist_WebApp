'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { authService } from '@/lib/auth.service';
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
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      const { user, needsEmailConfirmation } = await authService.registrar({ name, email, senha: password });
      const userJson = JSON.stringify(user);
      localStorage.setItem('user', userJson);
      
      if (needsEmailConfirmation) {
        // Mostrar mensagem de sucesso e pedir para verificar email
        setSuccess(true);
      } else {
        // Redirecionar diretamente para dados-pessoais
        router.push('/dados-pessoais');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar conta. Tente novamente.';
      setError(errorMessage);
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Tela de sucesso quando precisa confirmar email
  if (success) {
    return (
      <AuthShell
        title="Verifique seu email"
        imageSrc='/assets/capSignUp.png'
        classname="max-w-xl w-full"
      >
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 mx-auto text-green-500" />
          <p className="text-gray-700">
            Enviamos um link de confirmação para:
          </p>
          <p className="font-semibold text-[#AB2F50]">{email}</p>
          <p className="text-sm text-gray-600">
            Clique no link enviado para ativar sua conta e continuar o cadastro.
          </p>
          <div className="pt-4">
            <Link 
              href="/login" 
              className="text-[#AB2F50] hover:underline font-medium"
            >
              Voltar para o login
            </Link>
          </div>
        </div>
      </AuthShell>
    );
  }

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
