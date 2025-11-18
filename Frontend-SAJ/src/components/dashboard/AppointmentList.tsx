import { CalendarClock, Clock, UserCheck, Scale } from 'lucide-react';
import type { AppointmentWithDetails } from '../../types';

interface AppointmentListProps {
  appointments: AppointmentWithDetails[];
  isLoading?: boolean;
}

export function AppointmentList({ appointments, isLoading = false }: AppointmentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-xl border border-slate-100 bg-slate-50 p-5">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-lg bg-slate-200"></div>
              <div className="flex-1">
                <div className="h-4 w-3/4 rounded bg-slate-200"></div>
                <div className="mt-3 h-3 w-1/2 rounded bg-slate-200"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
          <CalendarClock className="h-8 w-8 text-slate-400" />
        </div>
        <p className="text-slate-500 font-medium">Nenhum agendamento encontrado</p>
        <p className="text-sm text-slate-400 mt-1">Os próximos compromissos aparecerão aqui</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {appointments.map((appointment) => {
        const appointmentDate = new Date(appointment.dateTime);
        const formattedTime = appointmentDate.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        const dayOfWeek = appointmentDate.toLocaleDateString('pt-BR', { weekday: 'long' });
        const dayNumber = appointmentDate.getDate().toString();
        const monthShort = appointmentDate.toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');

        return (
          <div
            key={appointment.id}
            className="group rounded-xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-md hover:border-slate-300"
          >
            <div className="flex items-start gap-4">
              {/* Date Badge */}
              <div className="flex h-14 w-14 flex-shrink-0 flex-col items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
                <span className="text-lg font-bold text-primary leading-none">
                  {dayNumber}
                </span>
                <span className="text-xs font-medium text-primary/70 uppercase">
                  {monthShort}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                {/* Time and Duration */}
                <div className="mb-2 flex items-center gap-3 text-sm">
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-semibold">{formattedTime}</span>
                  </div>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-500">{appointment.durationMinutes} min</span>
                  <span className="text-slate-300">|</span>
                  <span className="text-slate-400 text-xs capitalize">{dayOfWeek}</span>
                </div>

                {/* Client */}
                <div className="flex items-center gap-2 mb-1">
                  <UserCheck className="h-4 w-4 text-primary" />
                  <p className="font-semibold text-slate-900 truncate">{appointment.clientName}</p>
                </div>

                {/* Process */}
                {appointment.processNumber && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Scale className="h-3.5 w-3.5 text-slate-400" />
                    <span>Processo: <span className="font-medium">{appointment.processNumber}</span></span>
                  </div>
                )}

                {/* Description */}
                {appointment.description && (
                  <p className="mt-2 text-sm text-slate-500 line-clamp-2">{appointment.description}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
