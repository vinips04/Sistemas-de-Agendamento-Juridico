import { LayoutDashboard, UserCheck, Scale, Calendar, CalendarClock, AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useDashboardData } from '../../hooks/useDashboardData';
import { StatsCard, AppointmentList } from '../../components/dashboard';

export function Dashboard() {
  const { userId } = useAuth();
  const { stats, upcomingAppointments, isLoading, error, refetch } = useDashboardData(userId);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <LayoutDashboard className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-sm text-slate-500">Visão geral do sistema</p>
            </div>
          </div>
          {!isLoading && (
            <button
              onClick={refetch}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </button>
          )}
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <div className="flex items-center gap-2 text-red-800">
            <AlertCircle className="h-5 w-5" />
            <p className="font-medium">Erro ao carregar dados</p>
          </div>
          <p className="mt-1 text-sm text-red-700">{error}</p>
          <button
            onClick={refetch}
            className="mt-3 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-800 transition-colors hover:bg-red-200"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total de Clientes"
          value={stats?.totalClients ?? 0}
          icon={UserCheck}
          isLoading={isLoading}
          iconColor="text-primary"
          bgColor="bg-primary/10"
        />
        <StatsCard
          title="Processos Ativos"
          value={stats?.activeProcesses ?? 0}
          icon={Scale}
          isLoading={isLoading}
          iconColor="text-emerald-600"
          bgColor="bg-emerald-50"
        />
        <StatsCard
          title="Agendamentos Hoje"
          value={stats?.todayAppointments ?? 0}
          icon={Calendar}
          isLoading={isLoading}
          iconColor="text-[hsl(43,74%,49%)]"
          bgColor="bg-amber-50"
        />
        <StatsCard
          title="Próximos 7 Dias"
          value={stats?.weekAppointments ?? 0}
          icon={CalendarClock}
          isLoading={isLoading}
          iconColor="text-violet-600"
          bgColor="bg-violet-50"
        />
      </div>

      {/* Upcoming Appointments */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <CalendarClock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Próximos Agendamentos</h2>
            <p className="text-sm text-slate-500">Seus compromissos agendados</p>
          </div>
        </div>
        <AppointmentList appointments={upcomingAppointments} isLoading={isLoading} />
      </div>
    </div>
  );
}
