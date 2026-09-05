/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Settings,
  Shield,
  History,
  Sliders,
  Save,
  CheckCircle2,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Ambito, ParametroTarifarioConfig } from '../types';
import { PARAMETROS_TARIFARIOS_DEMO } from '../data/mockData';

interface AdministracionViewProps {
  selectedAmbito: Ambito;
}

export const AdministracionView: React.FC<AdministracionViewProps> = ({ selectedAmbito }) => {
  const [parametros, setParametros] = useState<ParametroTarifarioConfig[]>(PARAMETROS_TARIFARIOS_DEMO);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleUpdateValor = (id: string, nuevoValor: number) => {
    setParametros(prev =>
      prev.map(p => (p.id === id ? { ...p, valor: nuevoValor } : p))
    );
  };

  const handleGuardarParametros = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Administración, Parámetros Anuales & Seguridad RBAC
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configuración dinámica de tarifas, campañas agrícolas, roles y trazabilidad de auditoría
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-3 py-1.5 rounded-2xl bg-sky-50 text-sky-800 border border-sky-200">
            Campaña Activa: 2026-I (Aprobada por ANA)
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Parámetros de campaña 2026 actualizados con éxito en la base de datos centralizada.</span>
        </div>
      )}

      {/* Grid: Parámetros Anuales + Roles / Auditoría */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Parámetros de Tarifas (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-sky-600" />
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Parámetros Tarifarios Configurables (Sin Hardcoding)
              </h2>
              <p className="text-[11px] text-slate-500">
                Valores actualizables por campaña según Resoluciones Directorales y Jefaturales vigentes
              </p>
            </div>
          </div>

          <form onSubmit={handleGuardarParametros} className="space-y-4">
            {parametros.map(param => (
              <div key={param.id} className="p-3 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{param.concepto}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                    {param.añoVigencia}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{param.normativaReferencia}</p>
                <div className="flex items-center gap-3 pt-1">
                  <label className="text-xs font-semibold text-slate-700">Valor ({param.unidadMedida}):</label>
                  <div className="flex items-center gap-1.5 flex-1 max-w-[200px]">
                    <input
                      type="number"
                      step="0.0001"
                      value={param.valor}
                      onChange={e => handleUpdateValor(param.id, parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-1.5 bg-white rounded-xl border border-slate-200 text-xs font-mono font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-2xl transition-colors shadow-2xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Guardar Parámetros de Campaña 2026</span>
            </button>
          </form>
        </div>

        {/* Roles RBAC y Trazabilidad (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Roles Box */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Shield className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Roles y Permisos de Acceso (RBAC)
              </h2>
            </div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Administrador General OUA</p>
                  <p className="text-[11px] text-slate-500">Acceso total: Padrón, tarifas, PDA, GIS</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">Activo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Sectorista / Operador de Compuertas</p>
                  <p className="text-[11px] text-slate-500">Registro de campo, aforos y estado de turnos PDA</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold">Campo</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800">Tesorero / Caja OUA</p>
                  <p className="text-[11px] text-slate-500">Cobranza, liquidaciones y recibos</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Caja</span>
              </div>
            </div>
          </div>

          {/* Trazabilidad / Auditoría */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <History className="w-4 h-4 text-slate-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Registro de Auditoría & Trazabilidad
              </h2>
            </div>
            <div className="space-y-2 text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                <span className="text-[10px] text-slate-400 block font-sans">02/09/2026 22:45 • Ing. Agrícola</span>
                <span className="font-bold text-slate-900">TURNO #014:</span> Estado cambiado de 'Programado' a 'En Ejecución'.
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                <span className="text-[10px] text-slate-400 block font-sans">02/09/2026 21:10 • Tesorería</span>
                <span className="font-bold text-slate-900">RECIBO REC-2026-0089:</span> Pago registrado S/. 259.95 (Liquidado).
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
                <span className="text-[10px] text-slate-400 block font-sans">02/09/2026 19:30 • GIS Specialist</span>
                <span className="font-bold text-slate-900">CATASTRO:</span> Actualización de polígono predial UC-04821.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
