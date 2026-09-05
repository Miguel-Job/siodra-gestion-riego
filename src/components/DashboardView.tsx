/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ArrowUpRight,
  TrendingUp,
  Calendar,
  Plus,
  Filter,
  Download,
  ChevronRight,
  Wifi,
  Waves,
  MapPin,
  ExternalLink,
  Droplet,
  CheckCircle2,
  Clock,
  Check
} from 'lucide-react';
import {
  Ambito,
  FichaIntegral360Data,
  DistribucionTurnoPDA,
  UsuarioAgrario,
  PredioCatastral,
  AuthUser
} from '../types';
import {
  USUARIOS_DEMO,
  PREDIOS_DEMO,
  DUAS_DEMO,
  CULTIVOS_DEMO,
  TOMAS_DEMO,
  CONDUCCIONES_DEMO,
  DISTRIBUCION_TURNOS_DEMO,
  OBLIGACIONES_COBRANZA_DEMO,
  getFichaIntegralPorUsuario,
  FICHA_INTEGRAL_DEMO
} from '../data/mockData';

interface DashboardViewProps {
  selectedAmbito: Ambito;
  selectedFicha?: FichaIntegral360Data;
  onSelectFicha: (ficha: FichaIntegral360Data) => void;
  onOpenNuevoTurno: () => void;
  onOpenVisorGisCompleto?: () => void;
  onOpenFichaModal?: () => void;
  onNavigate?: (tab: string) => void;
  turnos: DistribucionTurnoPDA[];
  currentUser?: AuthUser;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  selectedAmbito,
  selectedFicha: propSelectedFicha,
  onSelectFicha,
  onOpenNuevoTurno,
  onOpenVisorGisCompleto,
  onOpenFichaModal,
  onNavigate,
  turnos,
  currentUser
}) => {
  const selectedFicha = propSelectedFicha || FICHA_INTEGRAL_DEMO;
  const [filtroCultivo, setFiltroCultivo] = useState<string>('todos');
  const [periodoVista, setPeriodoVista] = useState<'Mensual' | 'Campaña'>('Mensual');

  const handleOpenGis = () => {
    if (onOpenVisorGisCompleto) onOpenVisorGisCompleto();
    else if (onNavigate) onNavigate('gis');
  };

  const handleOpenModal = () => {
    if (onOpenFichaModal) onOpenFichaModal();
  };

  // Filter turnos and users
  const turnosFiltrados = turnos.filter(t => {
    if (filtroCultivo === 'todos') return true;
    const predio = PREDIOS_DEMO.find(p => p.id === t.predioId);
    return predio?.cultivoId === filtroCultivo;
  });

  return (
    <div className="space-y-5">
      {/* Top Banner: Greeting, Sector Info & Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Bienvenido, <span className="text-slate-800">{currentUser?.nombreCompleto || 'Ing. Carlos Ramírez'}</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Supervisión operativa de tomas, dotaciones y aforos en tiempo real • {selectedAmbito.comisionNombre}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>Campaña Agrícola 2026-I: 29 Jun - 29 Ago</span>
          </div>

          <button
            onClick={onOpenNuevoTurno}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Nuevo Turno de Riego</span>
          </button>
        </div>
      </div>

      {/* 4 Sleek Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Capacidad / Dotación Total */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Capacidad Total OUA</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <Droplet className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-800 tracking-tight">78,989</span>
            <span className="text-xs font-medium text-slate-400">m³ saldo</span>
          </div>
          <div className="mt-2.5 flex items-center text-xs text-emerald-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5 mr-1 shrink-0" />
            <span>+2.4% vs mes anterior</span>
          </div>
        </div>

        {/* Metric 2: Caudal Actual Río / Red */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Caudal Derivado</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
              <Waves className="w-4 h-4 text-sky-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-800 tracking-tight">18.42</span>
            <span className="text-xs font-medium text-slate-400">m³/s</span>
          </div>
          <div className="mt-2.5 flex items-center text-xs text-slate-500 font-medium">
            <span className="text-slate-500 font-mono">Bocatoma La Esperanza Km 00</span>
          </div>
        </div>

        {/* Metric 3: Eficiencia de Distribución */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Eficiencia Dist. PDA</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-800 tracking-tight">98.4%</span>
            <span className="text-xs font-medium text-emerald-600 font-semibold">óptimo</span>
          </div>
          <div className="mt-2.5 flex items-center text-xs text-emerald-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5 mr-1 shrink-0" />
            <span>+1.1% según RJ 0155-ANA</span>
          </div>
        </div>

        {/* Metric 4: Tomas y Alertas Activas */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tomas Operativas</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Wifi className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-800 tracking-tight">12</span>
            <span className="text-xs font-medium text-slate-400">tomas activas</span>
          </div>
          <div className="mt-2.5 flex items-center text-xs text-slate-500 font-medium">
            <span>2 turnos en ejecución</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Functional Layout (Padrón PDA & Ficha 360 Relacional) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (Padrón OUA & Turnos de Distribución PDA) - ~60% */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                  Padrón OUA & Turnos de Distribución (PDA)
                </h2>
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200/50">
                  Sector Chancay
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Control de dotación de riego, toma activa y tarifa devengada
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={filtroCultivo}
                  onChange={e => setFiltroCultivo(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="todos">Filtro Cultivos: Todos</option>
                  {CULTIVOS_DEMO.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.nombre} ({c.variedad})
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => alert('Descargando Padrón PDA en formato oficial CSV/Excel...')}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                title="Exportar Padrón PDA"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Relational Table */}
          <div className="overflow-x-auto -mx-5 px-5">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-2 font-bold">USUARIO & UC PREDIO</th>
                  <th className="pb-2 font-bold">DUA / CULTIVO</th>
                  <th className="pb-2 font-bold">TOMA / CANAL</th>
                  <th className="pb-2 font-bold">TURNO PDA</th>
                  <th className="pb-2 font-bold">TARIFA O&M</th>
                  <th className="pb-2 font-bold text-right">ACCIÓN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {turnosFiltrados.map(turno => {
                  const usuario = USUARIOS_DEMO.find(u => u.id === turno.usuarioId) || USUARIOS_DEMO[0];
                  const predio = PREDIOS_DEMO.find(p => p.id === turno.predioId) || PREDIOS_DEMO[0];
                  const dua = DUAS_DEMO.find(d => d.id === predio.duaId) || DUAS_DEMO[0];
                  const cultivo = CULTIVOS_DEMO.find(c => c.id === predio.cultivoId) || CULTIVOS_DEMO[0];
                  const toma = TOMAS_DEMO.find(t => t.id === turno.tomaId) || TOMAS_DEMO[0];
                  const conduccion = CONDUCCIONES_DEMO.find(cd => cd.id === turno.conduccionId) || CONDUCCIONES_DEMO[0];
                  const cobranza = OBLIGACIONES_COBRANZA_DEMO.find(c => c.predioId === predio.id) || OBLIGACIONES_COBRANZA_DEMO[0];

                  const isSelected = selectedFicha?.usuario?.id === usuario.id;

                  return (
                    <tr
                      key={turno.id}
                      onClick={() => {
                        const ficha = getFichaIntegralPorUsuario(usuario.id);
                        if (ficha) onSelectFicha(ficha);
                      }}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer group ${
                        isSelected ? 'bg-emerald-50/50 font-medium' : ''
                      }`}
                    >
                      {/* Usuario & UC Predio */}
                      <td className="py-3 pr-2">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-white'
                          }`}>
                            {usuario.avatarInitials}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                                {usuario.nombres} {usuario.apellidos}
                              </span>
                              {isSelected && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 font-mono">
                              {predio.unidadCatastral} • DNI {usuario.numeroDocumento}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* DUA / Cultivo */}
                      <td className="py-3 px-2">
                        <div className="font-semibold text-slate-800">{dua.codigoDUA}</div>
                        <span
                          className="inline-block px-1.5 py-0.5 rounded-md text-[10px] font-medium mt-0.5"
                          style={{
                            backgroundColor: `${cultivo.colorHex}15`,
                            color: cultivo.colorHex
                          }}
                        >
                          {cultivo.nombre} {cultivo.variedad} ({predio.areaBajoRiegoHa} ha)
                        </span>
                      </td>

                      {/* Toma / Canal */}
                      <td className="py-3 px-2">
                        <div className="font-bold text-slate-800">{toma.codigoToma}</div>
                        <p className="text-[11px] text-slate-500 truncate max-w-[110px]">
                          {conduccion.nombre}
                        </p>
                      </td>

                      {/* Turno PDA */}
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              turno.estado === 'En Ejecución'
                                ? 'bg-emerald-500 animate-pulse'
                                : turno.estado === 'Programado'
                                ? 'bg-sky-500'
                                : 'bg-slate-400'
                            }`}
                          ></span>
                          <span className={`font-semibold ${
                            turno.estado === 'En Ejecución' ? 'text-emerald-700' : 'text-slate-700'
                          }`}>
                            {turno.estado}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {turno.horaInicio} ({turno.duracionHoras} hrs)
                        </p>
                      </td>

                      {/* Tarifa O&M */}
                      <td className="py-3 px-2">
                        <div className="font-bold text-slate-900">
                          S/. {cobranza.montoTotalSoles.toFixed(2)}
                        </div>
                        <span className={`text-[10px] font-semibold ${
                          cobranza.estado === 'Pagado' ? 'text-emerald-600' : 'text-amber-600'
                        }`}>
                          {cobranza.estado}
                        </span>
                      </td>

                      {/* Acción */}
                      <td className="py-3 pl-2 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const ficha = getFichaIntegralPorUsuario(usuario.id);
                            if (ficha) onSelectFicha(ficha);
                            onOpenFichaModal();
                          }}
                          className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                          title="Abrir Ficha 360°"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer stats */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              Mostrando {turnosFiltrados.length} de {selectedAmbito.totalUsuarios} usuarios en PDA •{' '}
              <strong className="text-emerald-600 font-semibold">Aforos al 98.4% de fiabilidad</strong>
            </span>
            <div className="flex items-center gap-1 self-end sm:self-auto">
              <button className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px]">
                Anterior
              </button>
              <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                1
              </span>
              <button className="px-2.5 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-[11px]">
                Siguiente
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: FICHA 360° RELACIONAL INTEGRAL - ~40% */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3.5">
          {/* Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="font-bold text-sm text-slate-900">
                Ficha 360° Relacional Integral
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-mono">
              PostGIS Live Link
            </span>
          </div>

          <p className="text-[11px] text-slate-500 font-medium">
            Vínculo automático: Usuario ⇄ Predio ⇄ DUA ⇄ Toma ⇄ GIS
          </p>

          {/* Section 1: Active User & Parcel */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                USUARIO OUA ACTIVO
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Al Día
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900">
              {selectedFicha.usuario.nombres} {selectedFicha.usuario.apellidos}
            </p>
            <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
              <span>
                Predio: <strong className="text-slate-800">{selectedFicha.predio.nombrePredio}</strong> • UC:{' '}
                <strong className="font-mono text-slate-800">{selectedFicha.predio.unidadCatastral}</strong>
              </span>
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold pt-0.5">
              Área Bajo Riego: {selectedFicha.predio.areaBajoRiegoHa} ha / {selectedFicha.predio.areaTotalHa} ha tot
            </p>
          </div>

          {/* Section 2: DUA & Infraestructura side by side */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                DERECHO HÍDRICO DUA
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1">
                {selectedFicha.dua.resolucionDirectoral}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Volumen: <strong className="text-slate-800">{selectedFicha.dua.volumenAnualAsignadoM3.toLocaleString()} m³</strong>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                INFRAESTRUCTURA DE ENTREGA
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1">
                {selectedFicha.toma.nombre}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Canal: <strong className="text-slate-800">{selectedFicha.conduccion.codigo} ({selectedFicha.toma.progresivaKm})</strong>
              </p>
            </div>
          </div>

          {/* Section 3: Turno Actual & Tarifa side by side */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                TURNO ACTUAL PROGRAMADO
              </span>
              <p className="text-xs font-bold text-slate-900 mt-1">
                Turno N° {selectedFicha.turnoActual?.numeroTurno || '14'} • {selectedFicha.turnoActual?.caudalLps || 120.0} L/s
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Duración: <strong className="text-slate-800">{selectedFicha.turnoActual?.duracionHoras || 6.5} horas</strong>
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                TARIFA O&M (RJ 0155-ANA)
              </span>
              <p className="text-xs font-bold text-emerald-700 mt-1">
                Saldo: S/. 0.00
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pagado: S/. 260.00 al día
              </p>
            </div>
          </div>

          {/* Section 4: Dark GIS Mini Map Viewer (matching mockup image) */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#0b132b] text-white p-3 space-y-2 relative shadow-inner">
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-cyan-400" />
                UTM: {selectedFicha.predio.coordenadasUTM.este} E • {selectedFicha.predio.coordenadasUTM.norte} N
              </span>
              <span className="bg-cyan-950/80 text-cyan-300 px-2 py-0.5 rounded border border-cyan-800 text-[9px] font-sans font-bold">
                Capa Catastral
              </span>
            </div>

            {/* Dark Spatial Visualizer SVG */}
            <div className="h-28 w-full bg-[#070d1e] rounded-lg relative overflow-hidden border border-cyan-900/40 p-2">
              <svg viewBox="0 0 320 110" className="w-full h-full">
                {/* Grid Lines */}
                <line x1="0" y1="30" x2="320" y2="30" stroke="#1c2541" strokeWidth="0.5" />
                <line x1="0" y1="60" x2="320" y2="60" stroke="#1c2541" strokeWidth="0.5" />
                <line x1="0" y1="90" x2="320" y2="90" stroke="#1c2541" strokeWidth="0.5" />
                <line x1="80" y1="0" x2="80" y2="110" stroke="#1c2541" strokeWidth="0.5" />
                <line x1="160" y1="0" x2="160" y2="110" stroke="#1c2541" strokeWidth="0.5" />
                <line x1="240" y1="0" x2="240" y2="110" stroke="#1c2541" strokeWidth="0.5" />

                {/* Canal Line (Glowing cyan) */}
                <path
                  d="M10,20 Q120,40 220,25 T310,15"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />
                <text x="210" y="16" fill="#7dd3fc" fontSize="7" fontFamily="monospace" fontWeight="bold">
                  Canal CD-001 (18.5 m³/s)
                </text>

                {/* Toma Point */}
                <circle cx="210" cy="26" r="4.5" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                <text x="220" y="32" fill="#ffffff" fontSize="8" fontWeight="bold">
                  {selectedFicha.toma.codigoToma}
                </text>

                {/* Lateral branch */}
                <path
                  d="M210,26 L220,50 L230,65"
                  stroke="#0284c7"
                  strokeWidth="2"
                  strokeDasharray="3,2"
                  fill="none"
                />

                {/* Parcel Polygon (Cadastral plot) */}
                <polygon
                  points="215,55 285,45 295,95 225,100"
                  fill="rgba(56, 189, 248, 0.15)"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                />
                <text x="225" y="72" fill="#38bdf8" fontSize="8" fontWeight="bold" fontFamily="monospace">
                  {selectedFicha.predio.unidadCatastral}
                </text>
                <text x="225" y="82" fill="#bae6fd" fontSize="7">
                  {selectedFicha.cultivo.nombre} Hass • {selectedFicha.predio.areaBajoRiegoHa} ha
                </text>
              </svg>

              {/* Map Zoom Controls */}
              <div className="absolute right-2 bottom-2 flex flex-col gap-1">
                <button className="w-5 h-5 rounded bg-slate-800/80 text-white text-[10px] flex items-center justify-center hover:bg-slate-700">
                  +
                </button>
                <button className="w-5 h-5 rounded bg-slate-800/80 text-white text-[10px] flex items-center justify-center hover:bg-slate-700">
                  -
                </button>
              </div>
            </div>

            {/* Bottom bar of mini GIS map */}
            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[11px] text-cyan-200">
                Compuerta CP-03: <strong className="text-emerald-400">Apertura 65%</strong>
              </span>
              <button
                onClick={handleOpenGis}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
              >
                Abrir Visor Completo →
              </button>
            </div>
          </div>

          <button
            onClick={handleOpenModal}
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Ver Ficha Integral 360° Detallada (10 Dimensiones)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
