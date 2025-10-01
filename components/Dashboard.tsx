import React from 'react';
import { Appointment, Patient } from '../types';
import { UsersIcon, CalendarIcon } from './Icons';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="flex items-center p-6 bg-white rounded-xl shadow-lg">
    <div className="p-3 mr-4 text-sky-500 bg-sky-100 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="text-2xl font-semibold text-slate-800">{value}</p>
    </div>
  </div>
);

const UpcomingAppointments: React.FC<{ appointments: Appointment[] }> = ({ appointments }) => (
  <div className="p-6 bg-white rounded-xl shadow-lg">
    <h3 className="mb-4 text-xl font-semibold text-slate-800">Próximas Citas</h3>
    <div className="space-y-4">
      {appointments.slice(0, 4).map((apt) => (
        <div key={apt.id} className="flex items-center p-3 transition-all bg-slate-50 rounded-lg hover:bg-slate-100">
          <img src={apt.patientAvatarUrl} alt={apt.patientName} className="w-10 h-10 mr-4 rounded-full" />
          <div className="flex-grow">
            <p className="font-semibold text-slate-700">{apt.patientName}</p>
            <p className="text-sm text-slate-500">{apt.reason}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-sky-600">{apt.time}</p>
            <p className="text-sm text-slate-500">{new Date(apt.date).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

interface DashboardProps {
  patients: Patient[];
  appointments: Appointment[];
}

const Dashboard: React.FC<DashboardProps> = ({ patients, appointments }) => {
  const totalPatients = patients.length;
  const totalAppointments = appointments.length;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-slate-800">Inicio</h1>
      <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard title="Total de Pacientes" value={totalPatients} icon={<UsersIcon className="w-6 h-6" />} />
        <StatCard title="Total de Citas" value={totalAppointments} icon={<CalendarIcon className="w-6 h-6" />} />
      </div>
      <div className="mt-8">
        <UpcomingAppointments appointments={appointments} />
      </div>
    </div>
  );
};

export default Dashboard;