import React, { useState } from 'react';
import { Patient, Appointment } from '../types';

interface AppointmentFormProps {
  patients: Patient[];
  onSave: (appointmentData: Omit<Appointment, 'id' | 'patientName' | 'patientAvatarUrl'>) => void;
  onCancel: () => void;
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ patients, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    patientId: patients.length > 0 ? patients[0].id.toString() : '',
    date: '',
    time: '',
    reason: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientId) {
        alert("Por favor seleccione un paciente.");
        return;
    }
    onSave({ ...formData, patientId: parseInt(formData.patientId, 10) });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" aria-modal="true" role="dialog">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">Agendar Nueva Cita</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="patientId" className="block text-sm font-medium text-slate-700">Paciente</label>
            <select name="patientId" id="patientId" value={formData.patientId} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500">
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name} {p.lastName}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-slate-700">Fecha</label>
              <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-medium text-slate-700">Hora</label>
              <input type="time" name="time" id="time" value={formData.time} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
            </div>
          </div>
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-slate-700">Motivo de la Cita</label>
            <textarea name="reason" id="reason" value={formData.reason} onChange={handleChange} required rows={3} className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
          </div>
          <div className="flex justify-end pt-6 space-x-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              Agendar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;