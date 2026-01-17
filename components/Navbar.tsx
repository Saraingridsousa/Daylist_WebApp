'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Home, 
  ListTodo, 
  History, 
  FileText, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { authService } from '@/lib/auth.service';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Início', href: '/listaDeHabitos', icon: <Home size={20} /> },
  { label: 'Agenda', href: '/agenda', icon: <ListTodo size={20} /> },
  { label: 'Histórico', href: '/historico', icon: <History size={20} /> },
  { label: 'Relatório', href: '/relatorio', icon: <FileText size={20} /> },
  { label: 'Perfil', href: '/perfil', icon: <User size={20} /> },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUserName(user.nome || user.email?.split('@')[0] || 'Usuário');
      } catch {
        setUserName('Usuário');
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('user');
      router.push('/login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  // Não mostrar navbar em páginas de autenticação
  const authPages = ['/login', '/signup', '/dados-pessoais', '/'];
  if (authPages.includes(pathname)) {
    return null;
  }

  return (
    <>
      {/* Navbar Desktop */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/listaDeHabitos" className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#AB2F50]">Daylist</span>
            </Link>

            {/* Nav Items */}
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-[#AB2F50] text-white'
                      : 'text-gray-600 hover:bg-[#FFC9D780] hover:text-[#AB2F50]'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Olá, {userName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                title="Sair"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Navbar Mobile */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="px-4 h-14 flex justify-between items-center">
          <Link href="/listaDeHabitos" className="flex items-center gap-2">
            <span className="text-lg font-bold text-[#AB2F50]">Daylist</span>
          </Link>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-14 left-0 right-0 bg-white shadow-lg border-t">
            <div className="px-4 py-2 border-b">
              <span className="text-sm text-gray-600">Olá, {userName}</span>
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 transition-colors ${
                  pathname === item.href
                    ? 'bg-[#AB2F50] text-white'
                    : 'text-gray-600 hover:bg-[#FFC9D780]'
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 border-t"
            >
              <LogOut size={20} />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        )}
      </nav>

      {/* Bottom Navigation Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.slice(0, 5).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'text-[#AB2F50]'
                  : 'text-gray-400'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Spacer para o conteúdo não ficar atrás da navbar */}
      <div className="h-16 md:h-16" />
      
      {/* Spacer inferior para a navegação mobile */}
      <div className="md:hidden h-16" />
    </>
  );
}
