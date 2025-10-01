
import React from 'react';
import { UserRole } from '../types';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-slate-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-sky-600">Smile Center</h1>
          <p className="mt-2 text-slate-500">Sistema de Gestión Dental</p>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-center text-slate-700">Seleccione su rol para ingresar</h2>
          <div className="flex flex-col gap-4 pt-4">
            <button
              onClick={() => onLogin(UserRole.ADMIN)}
              className="w-full px-4 py-3 font-bold text-white transition-transform transform bg-sky-600 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 hover:scale-105"
            >
              Admin
            </button>
            <button
              onClick={() => onLogin(UserRole.SECRETARY)}
              className="w-full px-4 py-3 font-bold text-white transition-transform transform bg-slate-500 rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-300 hover:scale-105"
            >
              Secretaria
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
