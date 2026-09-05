/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Filter,
  Printer,
  Table,
  BarChart3,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { Ambito } from '../types';
import {
  USUARIOS_DEMO,
  PREDIOS_DEMO,
  DUAS_DEMO,
  CULTIVOS_DEMO,
  DISTRIBUCION_TURNOS_DEMO,
  OBLIGACIONES_COBRANZA_DEMO
} from '../data/mockData';

interface ReportesViewProps {
  selectedAmbito: Ambito;
}

export const ReportesView: React.FC<ReportesViewProps> = ({ selectedAmbito }) => {
  const [tipoReporte, setTipoReporte] = useState<'padron' | 'balance' | 'pda' | 'cobranza'>('padron');
  const [descargadoMsg, setDescargadoMsg] = useState('');

  const triggerDownload = (formato: string) => {
    setDescargadoMsg(`Generando y descargando ${tipoReporte.toUpperCase()} en formato ${formato}...`);
    setTimeout(() => {
      setDescargadoMsg('');
    }, 3000);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900">
            Módulo de Reportes Oficiales & Análisis Estadístico
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Generación consolidada de padrones y balances hídricos para la OUA y la Autoridad Nacional del Agua (ANA)
          </p>
        </div>

        {/* Format Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerDownload('Excel (.xlsx)')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar Excel</span>
          </button>
          <button
            onClick={() => triggerDownload('CSV (.csv)')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
          <button
            onClick={() => triggerDownload('PDF / Imprimir')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {descargadoMsg && (
        <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{descargadoMsg}</span>
        </div>
      )}

      {/* Select Report Type Pills */}
      <div className="flex items-center gap-2 overflow-x-auto bg-white p-2 rounded-2xl border border-slate-200">
        <button
          onClick={() => setTipoReporte('padron')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            tipoReporte === 'padron' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          1. Padrón General OUA & Predios
        </button>
        <button
          onClick={() => setTipoReporte('balance')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            tipoReporte === 'balance' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          2. Balance Hídrico Campaña 2026-I
        </button>
        <button
          onClick={() => setTipoReporte('pda')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            tipoReporte === 'pda' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          3. Registro PDA de Turnos & Aforos
        </button>
        <button
          onClick={() => setTipoReporte('cobranza')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            tipoReporte === 'cobranza' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
          }`}
        >
          4. Estado de Cobranza & Recaudación
        </button>
      </div>

      {/* Report Preview Container */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4 font-sans">
        {/* Report Official Header */}
        <div className="border-b border-slate-200 pb-4 text-center space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            AUTORIDAD NACIONAL DEL AGUA • JUNTA DE USUARIOS CHANCAY - HUARAL
          </p>
          <h2 className="text-lg font-black text-slate-900">
            {tipoReporte === 'padron' && 'PADRÓN INTEGRAL DE USUARIOS, PREDIOS Y DERECHOS DE AGUA (DUA)'}
            {tipoReporte === 'balance' && 'REPORTE CONSOLIDADO DE BALANCE HÍDRICO & DEMANDA AGRARIA'}
            {tipoReporte === 'pda' && 'REGISTRO OFICIAL DE TURNOS DE DISTRIBUCIÓN DE AGUA (PDA)'}
            {tipoReporte === 'cobranza' && 'REPORTE ECONÓMICO: TARIFA O&M Y RETRIBUCIÓN ECONÓMICA'}
          </h2>
          <p className="text-xs text-slate-500">
            Ámbito: {selectedAmbito.comisionNombre} • {selectedAmbito.sectorHidraulico} • Fecha de corte: 02/09/2026
          </p>
        </div>

        {/* Content of Preview Table */}
        <div className="overflow-x-auto">
          {tipoReporte === 'padron' && (
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 border-r border-slate-200">CÓDIGO OUA</th>
                  <th className="p-2.5 border-r border-slate-200">USUARIO AGRARIO</th>
                  <th className="p-2.5 border-r border-slate-200">DNI / RUC</th>
                  <th className="p-2.5 border-r border-slate-200">UNIDAD CATASTRAL</th>
                  <th className="p-2.5 border-r border-slate-200">ÁREA RIEGO (ha)</th>
                  <th className="p-2.5 border-r border-slate-200">DUA RESOLUCIÓN</th>
                  <th className="p-2.5">VOL. ASIGNADO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {USUARIOS_DEMO.map(u => {
                  const predio = PREDIOS_DEMO.find(p => p.usuarioId === u.id) || PREDIOS_DEMO[0];
                  const dua = DUAS_DEMO.find(d => d.id === predio.duaId) || DUAS_DEMO[0];
                  return (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="p-2.5 font-mono font-bold border-r border-slate-200">{u.codigoUsuario}</td>
                      <td className="p-2.5 font-medium border-r border-slate-200">{u.nombres} {u.apellidos}</td>
                      <td className="p-2.5 font-mono border-r border-slate-200">{u.numeroDocumento}</td>
                      <td className="p-2.5 font-mono font-bold text-sky-900 border-r border-slate-200">{predio.unidadCatastral}</td>
                      <td className="p-2.5 font-bold border-r border-slate-200">{predio.areaBajoRiegoHa} ha</td>
                      <td className="p-2.5 border-r border-slate-200">{dua.resolucionDirectoral}</td>
                      <td className="p-2.5 font-mono">{dua.volumenAnualAsignadoM3.toLocaleString()} m³</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {tipoReporte === 'balance' && (
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 border-r border-slate-200">CULTIVO / VARIEDAD</th>
                  <th className="p-2.5 border-r border-slate-200">SUPERFICIE TOTAL (ha)</th>
                  <th className="p-2.5 border-r border-slate-200">MÓDULO RIEGO (L/s/ha)</th>
                  <th className="p-2.5 border-r border-slate-200">DEMANDA TOTAL ($m^3$)</th>
                  <th className="p-2.5">VOLUMEN DISTRIBUIDO ($m^3$)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {CULTIVOS_DEMO.map(c => (
                  <tr key={c.id}>
                    <td className="p-2.5 font-bold border-r border-slate-200">{c.nombre} ({c.variedad})</td>
                    <td className="p-2.5 border-r border-slate-200">240.5 ha</td>
                    <td className="p-2.5 font-mono border-r border-slate-200">{c.moduloRiegoLpsHa} L/s/ha</td>
                    <td className="p-2.5 font-mono font-bold border-r border-slate-200">{(c.demandaHidricaM3Ha * 240).toLocaleString()} m³</td>
                    <td className="p-2.5 font-mono text-emerald-700 font-bold">382,400 m³ (Conforme)</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tipoReporte === 'cobranza' && (
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5 border-r border-slate-200">N° RECIBO</th>
                  <th className="p-2.5 border-r border-slate-200">USUARIO TITULAR</th>
                  <th className="p-2.5 border-r border-slate-200">CONCEPTO NORMATIVO</th>
                  <th className="p-2.5 border-r border-slate-200">MONTO EMITIDO</th>
                  <th className="p-2.5 border-r border-slate-200">PAGADO</th>
                  <th className="p-2.5">ESTADO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {OBLIGACIONES_COBRANZA_DEMO.map(o => {
                  const u = USUARIOS_DEMO.find(usr => usr.id === o.usuarioId) || USUARIOS_DEMO[0];
                  return (
                    <tr key={o.id}>
                      <td className="p-2.5 font-mono font-bold border-r border-slate-200">{o.codigoRecibo}</td>
                      <td className="p-2.5 font-medium border-r border-slate-200">{u.nombres} {u.apellidos}</td>
                      <td className="p-2.5 border-r border-slate-200">{o.conceptoTarifario}</td>
                      <td className="p-2.5 font-bold border-r border-slate-200">S/. {o.montoTotalSoles.toFixed(2)}</td>
                      <td className="p-2.5 font-bold text-emerald-700 border-r border-slate-200">S/. {o.montoPagadoSoles.toFixed(2)}</td>
                      <td className="p-2.5 font-bold">{o.estado}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
