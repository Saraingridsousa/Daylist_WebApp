'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { perfilService } from '@/lib/perfil.service';
import AuthShell from '../../components/auth/AuthShell';

export default function PersonalDataPage() {
  const router = useRouter();
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!gender) {
      setError('Por favor, selecione uma opção de sexo.');
      return;
    }

    setLoading(true);

    try {
      const userJson = localStorage.getItem('user');
      const user = userJson ? JSON.parse(userJson) : null;
      if (!user || !user.id) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }
      const dataNascimento = new Date();
      dataNascimento.setFullYear(dataNascimento.getFullYear() - parseInt(age, 10));
      const ageString = dataNascimento.toISOString().split('T')[0];
      
      let sexo = 'N';
      if (gender === 'masculino') sexo = 'M';
      else if (gender === 'feminino') sexo = 'F';
      else if (gender === 'prefiro não dizer') sexo = 'N';
      
      await perfilService.atualizarBiometria({
        usuarioId: user.id,
        peso: parseFloat(weight),
        altura: parseInt(height, 10),
        dataNascimento: ageString,
        sexo,
      });
      router.push('/perfil');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao salvar dados. Tente novamente.';
      setError(errorMessage);
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Dados Pessoais"
      error={error}
      classname="max-w-xl w-full"
      imageSrc='/assets/capPesoalData.png'
      styleImage="-top-32"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sexo e Idade */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div>
                <label htmlFor="gender" className="block text-sm font-bold text-gray-700">
                  Sexo
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                  className="mt-1 w-full bg-[#FFC9D780] px-4 py-2 border border-[#AB2F5040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AB2F5080] focus:border-transparent transition text-[#AB2F50BF] cursor-pointer"
                  disabled={loading}
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="feminino">Feminino</option>
                  <option value="masculino">Masculino</option>
                  <option value="prefiro-nao-dizer">Prefiro não dizer</option>
                </select>
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-bold text-gray-700">
                  Idade
                </label>
                <input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Ex: 25"
                  required
                  className="mt-1 w-full bg-[#FFC9D780] px-4 py-2 border border-[#AB2F5040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AB2F5080] focus:border-transparent transition placeholder-[#AB2F5080] text-[#AB2F50BF]"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Altura e Peso */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div>
                <label htmlFor="height" className="block text-sm font-bold text-gray-700">
                  Altura (cm)
                </label>
                <input
                  id="height"
                  type="number"
                  min="50"
                  max="250"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="Ex: 170"
                  required
                  className="mt-1 w-full bg-[#FFC9D780] px-4 py-2 border border-[#AB2F5040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AB2F5080] focus:border-transparent transition placeholder-[#AB2F5080] text-[#AB2F50BF]"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="weight" className="block text-sm font-bold text-gray-700">
                  Peso (kg)
                </label>
                <input
                  id="weight"
                  type="number"
                  min="20"
                  max="300"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Ex: 70"
                  required
                  className="mt-1 w-full bg-[#FFC9D780] px-4 py-2 border border-[#AB2F5040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AB2F5080] focus:border-transparent transition placeholder-[#AB2F5080] text-[#AB2F50BF]"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Botão de confirmar */}
            <div className="mx-14 pt-10">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FFC9D7D4] hover:bg-[#AB2F5080] disabled:bg-[#AB2F5040] text-black py-3 px-4 rounded-lg transition duration-200 font-medium"
              >
                {loading ? 'Salvando...' : 'Confirmar'}
              </button>
            </div>
          </form>
        </AuthShell>
      );
    }
