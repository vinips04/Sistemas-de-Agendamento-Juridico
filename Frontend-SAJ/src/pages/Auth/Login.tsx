import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Gavel, Lock, User } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(username, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Painel Esquerdo - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          <div className="mb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
              <Gavel className="h-8 w-8 text-[hsl(43,74%,49%)]" />
            </div>
            <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
              Sistema de<br />Agendamento<br />Jurídico
            </h1>
            <p className="text-lg text-white/70 max-w-md">
              Gerencie seus processos, clientes e agendamentos com eficiência e segurança.
            </p>
          </div>

          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-3 text-white/60">
              <div className="h-1.5 w-1.5 rounded-full bg-[hsl(43,74%,49%)]"></div>
              <span className="text-sm">Gestão completa de processos</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <div className="h-1.5 w-1.5 rounded-full bg-[hsl(43,74%,49%)]"></div>
              <span className="text-sm">Agenda integrada</span>
            </div>
            <div className="flex items-center gap-3 text-white/60">
              <div className="h-1.5 w-1.5 rounded-full bg-[hsl(43,74%,49%)]"></div>
              <span className="text-sm">Controle de clientes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Painel Direito - Formulário */}
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo Mobile */}
          <div className="mb-8 text-center lg:hidden">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg">
              <Gavel className="h-7 w-7 text-[hsl(43,74%,49%)]" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              SAJ
            </h1>
            <p className="text-sm text-slate-500">Sistema de Agendamento Jurídico</p>
          </div>

          {/* Título do Form */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Bem-vindo de volta
            </h2>
            <p className="text-sm text-slate-500">
              Entre com suas credenciais para acessar o sistema
            </p>
          </div>

          {/* Card de Login */}
          <div className="rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username */}
              <div>
                <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-700">
                  Usuário
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <User className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 pl-11 pr-4 py-3 text-slate-900 placeholder-slate-400 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Digite seu usuário"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <Lock className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 pl-11 pr-4 py-3 text-slate-900 placeholder-slate-400 transition-all duration-300 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Digite sua senha"
                    required
                  />
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-lg bg-primary px-4 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-[hsl(213,56%,30%)] hover:shadow-lg hover:shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:shadow-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    Entrando...
                  </span>
                ) : (
                  'Entrar'
                )}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
              Sistema de Agendamento Jurídico
            </p>
            <p className="text-xs text-slate-400 mt-1">
              &copy; 2025 Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
