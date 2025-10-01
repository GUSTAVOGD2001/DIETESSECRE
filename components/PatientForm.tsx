import React, { useState, useEffect } from 'react';
import { Patient } from '../types';

interface PatientFormProps {
  patient: Patient | null;
  onSave: (patientData: Partial<Patient>) => void;
  onCancel: () => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ patient, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (patient) {
      setFormData({
        name: patient.name,
        lastName: patient.lastName,
        dateOfBirth: patient.dateOfBirth,
        phone: patient.phone,
        email: patient.email,
      });
    } else {
      setFormData({ name: '', lastName: '', dateOfBirth: '', phone: '', email: '' });
    }
  }, [patient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...patient, ...formData });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" aria-modal="true" role="dialog">
      <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-2xl">
        <h2 className="mb-6 text-2xl font-bold text-slate-800">{patient ? 'Editar Paciente' : 'Añadir Nuevo Paciente'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nombre</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">Apellido</label>
              <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
            </div>
          </div>
          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-slate-700">Fecha de Nacimiento</label>
            <input type="date" name="dateOfBirth" id="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Teléfono</label>
              <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 mt-1 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500" />
            </div>
          </div>
          <div className="flex justify-end pt-6 space-x-4">
            <button type="button" onClick={onCancel} className="px-4 py-2 font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
              Cancelar
            </button>
            <button type="submit" className="px-4 py-2 font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientForm;