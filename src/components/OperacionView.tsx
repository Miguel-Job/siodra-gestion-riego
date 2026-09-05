/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SIODRA — Área Funcional 2: Operación Hidráulica & PDA
 * Rol de Riego Semanal de la OUA (1 Turno por Usuario por Semana para 20 Usuarios)
 */

import React, { useState, useMemo } from 'react';
import {
  GitFork,
  Calendar,
  Clock,
  MapPin,
  List,
  AlertTriangle,
  CheckCircle2,
  Play,
  Plus,
  ArrowRight,
  Gauge,
  Sliders,
  ExternalLink,
  Droplet,
  ChevronLeft,
  ChevronRight,
  Filter,
  Users
} from 'lucide-react';
import {
  Ambito,
  DistribucionTurnoPDA,
  ConduccionCanal,
  TomaEntrega,
  InfraestructuraHidraulica,
  FichaIntegral360Data
} from '../types';
import {
  CONDUCCIONES_DEMO,
  TOMAS_DEMO,
  INFRAESTRUCTURA_DEMO,
  USUARIOS_DEMO,
  PREDIOS_DEMO,
  getFichaIntegralPorUsuario
} from '../data/mockData';
import { getSemanaInfo, DIAS_SEMANA, getDiaSemanaNombre } from '../utils/semanaRiego';

interface OperacionViewProps {
  selectedAmbito: Ambito;
  turnos: DistribucionTurnoPDA[];
  onOpenNuevoTurno: (usuarioId?: string, fecha?: string) => void;
  onSelectFicha: (ficha: FichaIntegral360Data) => void;
  onOpenFichaModal: () => void;
  onUpdateTurnoEstado: (turnoId: string, nuevoEstado: any) => void;
}

export const OperacionView: React.FC<OperacionViewProps> = ({
  selectedAmbito,
  turnos,
  onOpenNuevoTurno,
  onSelectFicha,
  onOpenFichaModal,
  onUpdateTurnoEstado
}) => {
  const [activeTab, setActiveTab] = useState<'distribucion' | 'conducciones' | 'tomas' | 'infraestructura'>('distribucion');
  const [viewMode, setViewMode] = useState<'calendario' | 'tabla' | 'linea_tiempo'>('calendario');
  const [diaFiltro, setDiaFiltro] = useState<string>('todos');
  const [semanaOffset, setSemanaOffset] = useState<number>(0); // 0 = current week (Semana 36), 1 = next week (Semana 37)

  // Reference date: 2026-09-02 (Miércoles)
  const fechaReferenciaStr = useMemo(() => {
    const base = new Date(2026, 8, 2); // 2026-09-02
    base.setDate(base.getDate() + semanaOffset * 7);
    const y = base.getFullYear();
    const m = String(base.getMonth() + 1).padStart(2, '0');
    const d = String(base.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }, [semanaOffset]);

  const semanaInfo = useMemo(() => getSemanaInfo(fechaReferenciaStr), [fechaReferenciaStr]);

  // Turnos belonging to this week
  const turnosDeLaSemana = useMemo(() => {
    return turnos.filter(t => {
      const info = getSemanaInfo(t.fechaInicio);
      return info.inicioSemana === semanaInfo.inicioSemana;
    });
  }, [turnos, semanaInfo]);

  // Calculations for week summary
  const volumenTotalSemanaM3 = useMemo(() => {
    return turnosDeLaSemana.reduce((acc, t) => acc + t.volumenM3, 0);
  }, [turnosDeLaSemana]);

  const caudalPromedioLps = useMemo(() => {
    if (turnosDeLaSemana.length === 0) return 0;
    const totalQ = turnosDeLaSemana.reduce((acc, t) => acc + t.caudalLps, 0);
    return Math.round((totalQ / turnosDeLaSemana.length) * 10) / 10;
  }, [turnosDeLaSemana]);

  const usuariosUnicosConTurno = useMemo(() => {
    const setUsr = new Set(turnosDeLaSemana.map(t => t.usuarioId));
    return setUsr.size;
  }, [turnosDeLaSemana]);

  // Generate 7 day objects for the calendar
  const diasCalendario = useMemo(() => {
    const [y, m, d] = semanaInfo.inicioSemana.split('-').map(Number);
    const monday = new Date(y, m - 1, d);

    return DIAS_SEMANA.map((dia, idx) => {
      const currentDay = new Date(monday);
      currentDay.setDate(monday.getDate() + idx);

      const yyyy = currentDay.getFullYear();
      const mm = String(currentDay.getMonth() + 1).padStart(2, '0');
      const dd = String(currentDay.getDate()).padStart(2, '0');
      const fechaStr = `${yyyy}-${mm}-${dd}`;

      const turnosDelDia = turnosDeLaSemana.filter(t => t.fechaInicio === fechaStr);
      const volumenDia = turnosDelDia.reduce((acc, t) => acc + t.volumenM3, 0);
      const esHoy = fechaStr === '2026-09-02';

      return {
        ...dia,
        fechaStr,
        diaNumero: currentDay.getDate(),
        mesNombre: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'][currentDay.getMonth()],
        turnos: turnosDelDia,
        volumenDia,
        esHoy
      };
    });
  }, [semanaInfo, turnosDeLaSemana]);

  // Filtered turnos for table view
  const turnosFiltrados = useMemo(() => {
    if (diaFiltro === 'todos') return turnosDeLaSemana;
    return turnosDeLaSemana.filter(t => {
      const nombreDia = getDiaSemanaNombre(t.fechaInicio).toLowerCase();
      return nombreDia === diaFiltro.toLowerCase();
    });
  }, [turnosDeLaSemana, diaFiltro]);

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xs">
              2
            </span>
            <h1 className="text-xl font-bold text-slate-900">
              Área Funcional 2: Operación Hidráulica & PDA
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 font-mono">
              Regla OUA: 1 Turno/Semana
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            "¿Cómo se distribuye el agua y mediante qué infraestructura?" • Programa de Distribución de Agua (PDA)
          </p>
        </div>

        {/* Action Button & Subnav */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl gap-1 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('distribucion')}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                activeTab === 'distribucion' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
              }`}
            >
              Distribución PDA ({turnosDeLaSemana.length})
            </button>
            <button
              onClick={() => setActiveTab('conducciones')}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                activeTab === 'conducciones' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
              }`}
            >
              Canales ({CONDUCCIONES_DEMO.length})
            </button>
            <button
              onClick={() => setActiveTab('tomas')}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                activeTab === 'tomas' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
              }`}
            >
              Tomas ({TOMAS_DEMO.length})
            </button>
            <button
              onClick={() => setActiveTab('infraestructura')}
              className={`px-3 py-1.5 rounded-xl transition-colors ${
                activeTab === 'infraestructura' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600'
              }`}
            >
              Obras de Arte
            </button>
          </div>

          <button
            onClick={() => onOpenNuevoTurno()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Solicitar Turno Semanal</span>
          </button>
        </div>
      </div>

      {/* Main Tab 1: Distribución PDA */}
      {activeTab === 'distribucion' && (
        <div className="space-y-4">
          {/* Weekly Metrics Banner */}
          <div className="bg-white p-4 md:p-5 rounded-3xl border border-slate-200/80 shadow-2xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Week Switcher */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
                  <button
                    onClick={() => setSemanaOffset(prev => prev - 1)}
                    className="p-1.5 rounded-xl hover:bg-white text-slate-600 transition-colors"
                    title="Semana anterior"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1 font-bold text-xs text-slate-900">
                    {semanaInfo.etiqueta}
                  </span>
                  <button
                    onClick={() => setSemanaOffset(prev => prev + 1)}
                    className="p-1.5 rounded-xl hover:bg-white text-slate-600 transition-colors"
                    title="Semana siguiente"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {semanaOffset !== 0 && (
                  <button
                    onClick={() => setSemanaOffset(0)}
                    className="text-[11px] font-bold text-sky-700 hover:underline"
                  >
                    Ir a Semana Actual
                  </button>
                )}
              </div>

              {/* 4 Key Hydraulic Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/70">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">PADRÓN OUA ASIGNADO</span>
                  <strong className="text-slate-900 font-mono text-sm">
                    {usuariosUnicosConTurno}/{USUARIOS_DEMO.length} Usuarios
                  </strong>
                  <span className="text-[10px] text-emerald-700 font-bold block">
                    {Math.round((usuariosUnicosConTurno / USUARIOS_DEMO.length) * 100)}% Cobertura 1 Turno/Sem
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/70">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">VOLUMEN SEMANAL</span>
                  <strong className="text-slate-900 font-mono text-sm">
                    {volumenTotalSemanaM3.toLocaleString()} m³
                  </strong>
                  <span className="text-[10px] text-slate-500 block">Derivación en red</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/70">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">CAUDAL PROMEDIO</span>
                  <strong className="text-sky-900 font-mono text-sm">
                    {caudalPromedioLps} L/s
                  </strong>
                  <span className="text-[10px] text-slate-500 block">Dotación por toma</span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200/70">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">REGLA OPERATIVA</span>
                  <strong className="text-slate-900 font-mono text-sm">
                    1 Turno / Semana
                  </strong>
                  <span className="text-[10px] text-emerald-700 font-semibold block">
                    Normativa OUA Activa
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* PDA Main Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
            {/* Header of PDA with 3 view modes */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Rol de Turnos de Riego Semanal — {semanaInfo.etiqueta}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                    {turnosDeLaSemana.length} Turnos Programados
                  </span>
                </h2>
                <p className="text-xs text-slate-500">
                  Distribución programada para los 20 usuarios del padrón oficial • Cubicación $V = Q \times t \times 3.6$
                </p>
              </div>

              <div className="flex items-center bg-slate-100 p-0.5 rounded-xl text-xs font-medium self-start sm:self-auto">
                <button
                  onClick={() => setViewMode('calendario')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                    viewMode === 'calendario' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Calendario Semanal</span>
                </button>
                <button
                  onClick={() => setViewMode('tabla')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                    viewMode === 'tabla' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Tabla ({turnosDeLaSemana.length})</span>
                </button>
                <button
                  onClick={() => setViewMode('linea_tiempo')}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-colors ${
                    viewMode === 'linea_tiempo' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Línea de Tiempo</span>
                </button>
              </div>
            </div>

            {/* VIEW MODE 1: CALENDARIO SEMANAL DINÁMICO (7 DÍAS) */}
            {viewMode === 'calendario' && (
              <div className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-2.5">
                  {diasCalendario.map((dia) => (
                    <div
                      key={dia.clave}
                      className={`p-3 rounded-2xl border flex flex-col justify-between min-h-[300px] transition-all ${
                        dia.esHoy
                          ? 'bg-sky-50/60 border-sky-300 ring-2 ring-sky-400/20'
                          : 'bg-slate-50/70 border-slate-200/80 hover:border-slate-300'
                      }`}
                    >
                      {/* Day Header */}
                      <div>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 mb-2.5">
                          <div>
                            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">
                              {dia.clave}
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">
                              {dia.diaNumero} {dia.mesNombre} {dia.esHoy ? '• HOY' : ''}
                            </span>
                          </div>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-mono">
                            {dia.turnos.length}
                          </span>
                        </div>

                        {/* List of Shifts for this Day */}
                        <div className="space-y-2">
                          {dia.turnos.length === 0 ? (
                            <div className="py-8 text-center text-slate-400 text-[11px]">
                              <span>Sin turnos</span>
                            </div>
                          ) : (
                            dia.turnos.map(t => {
                              const usr = USUARIOS_DEMO.find(u => u.id === t.usuarioId) || USUARIOS_DEMO[0];
                              const pred = PREDIOS_DEMO.find(p => p.id === t.predioId) || PREDIOS_DEMO[0];

                              return (
                                <div
                                  key={t.id}
                                  onClick={() => {
                                    const ficha = getFichaIntegralPorUsuario(usr.id);
                                    if (ficha) {
                                      onSelectFicha(ficha);
                                      onOpenFichaModal();
                                    }
                                  }}
                                  className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs hover:border-sky-400 hover:shadow-xs transition-all cursor-pointer group text-left"
                                >
                                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-600 mb-1">
                                    <span className="text-sky-900 group-hover:text-sky-700">
                                      {t.horaInicio} hrs
                                    </span>
                                    <span
                                      className={`px-1.5 py-0.2 rounded-md ${
                                        t.estado === 'En Ejecución'
                                          ? 'bg-emerald-100 text-emerald-800'
                                          : t.estado === 'Programado'
                                          ? 'bg-sky-100 text-sky-800'
                                          : 'bg-slate-100 text-slate-600'
                                      }`}
                                    >
                                      {t.estado}
                                    </span>
                                  </div>

                                  <p className="text-[11px] font-bold text-slate-900 truncate">
                                    {usr.nombres} {usr.apellidos}
                                  </p>

                                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-100">
                                    <span>{t.tomaId.toUpperCase()}</span>
                                    <span className="font-bold text-slate-700">{t.caudalLps} L/s</span>
                                    <span>{t.volumenM3} m³</span>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>

                      {/* Day Footer Summary & Add Button */}
                      <div className="pt-2 mt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 font-mono">
                          Total: <strong className="text-slate-800">{dia.volumenDia.toLocaleString()} m³</strong>
                        </span>
                        <button
                          onClick={() => onOpenNuevoTurno(undefined, dia.fechaStr)}
                          className="text-sky-700 hover:text-sky-900 font-bold flex items-center gap-0.5 hover:underline"
                          title={`Programar turno para el ${dia.clave}`}
                        >
                          <Plus className="w-3 h-3" />
                          <span>Pedir</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* VIEW MODE 2: TABLA DE TURNOS */}
            {viewMode === 'tabla' && (
              <div className="space-y-3">
                {/* Day Filter Pills */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
                  <span className="text-slate-400 font-semibold mr-1 flex items-center gap-1 text-[11px]">
                    <Filter className="w-3 h-3" /> Filtrar por Día:
                  </span>
                  <button
                    onClick={() => setDiaFiltro('todos')}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-colors ${
                      diaFiltro === 'todos' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Todos ({turnosDeLaSemana.length})
                  </button>
                  {DIAS_SEMANA.map(d => (
                    <button
                      key={d.clave}
                      onClick={() => setDiaFiltro(d.clave.toLowerCase())}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-colors ${
                        diaFiltro === d.clave.toLowerCase()
                          ? 'bg-sky-800 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {d.clave}
                    </button>
                  ))}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                        <th className="pb-2">N° TURNO & DÍA</th>
                        <th className="pb-2">USUARIO (PADRÓN OUA)</th>
                        <th className="pb-2">PREDIO & TOMA</th>
                        <th className="pb-2">FECHA & HORA</th>
                        <th className="pb-2">CAUDAL & HORAS</th>
                        <th className="pb-2">VOLUMEN ($m^3$)</th>
                        <th className="pb-2">ESTADO OPERATIVO</th>
                        <th className="pb-2 text-right">FICHA 360°</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {turnosFiltrados.map(turno => {
                        const usuario = USUARIOS_DEMO.find(u => u.id === turno.usuarioId) || USUARIOS_DEMO[0];
                        const predio = PREDIOS_DEMO.find(p => p.id === turno.predioId) || PREDIOS_DEMO[0];
                        const toma = TOMAS_DEMO.find(t => t.id === turno.tomaId) || TOMAS_DEMO[0];
                        const diaNombre = getDiaSemanaNombre(turno.fechaInicio);

                        return (
                          <tr key={turno.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-3">
                              <span className="font-mono font-bold text-slate-900">Turno #{turno.numeroTurno}</span>
                              <p className="text-[10px] text-sky-800 font-semibold">{diaNombre}</p>
                            </td>

                            <td className="py-3">
                              <button
                                onClick={() => {
                                  const ficha = getFichaIntegralPorUsuario(usuario.id);
                                  if (ficha) {
                                    onSelectFicha(ficha);
                                    onOpenFichaModal();
                                  }
                                }}
                                className="text-left group font-bold text-slate-900 hover:text-sky-700"
                              >
                                {usuario.nombres} {usuario.apellidos}
                                <p className="text-[10px] text-slate-500 font-normal font-mono">
                                  {usuario.codigoUsuario}
                                </p>
                              </button>
                            </td>

                            <td className="py-3">
                              <strong className="text-slate-800">{predio.nombrePredio}</strong>
                              <p className="text-[10px] text-slate-500 font-mono">Toma {toma.codigoToma}</p>
                            </td>

                            <td className="py-3">
                              <span className="text-slate-800 font-medium">{turno.fechaInicio}</span>
                              <p className="text-[11px] text-slate-500 font-mono font-bold">{turno.horaInicio} hrs</p>
                            </td>

                            <td className="py-3">
                              <strong className="text-sky-900 font-mono">{turno.caudalLps} L/s</strong>
                              <p className="text-[11px] text-slate-500">{turno.duracionHoras} horas</p>
                            </td>

                            <td className="py-3 font-bold font-mono text-slate-900">
                              {turno.volumenM3.toLocaleString()} m³
                            </td>

                            <td className="py-3">
                              <select
                                value={turno.estado}
                                onChange={e => onUpdateTurnoEstado(turno.id, e.target.value)}
                                className={`text-[11px] font-bold px-2 py-1 rounded-xl border cursor-pointer focus:outline-none ${
                                  turno.estado === 'En Ejecución'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : turno.estado === 'Programado'
                                    ? 'bg-sky-50 text-sky-700 border-sky-200'
                                    : turno.estado === 'Ejecutado'
                                    ? 'bg-slate-100 text-slate-700 border-slate-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}
                              >
                                <option value="Programado">Programado</option>
                                <option value="En Ejecución">En Ejecución</option>
                                <option value="Ejecutado">Ejecutado</option>
                                <option value="Reprogramado">Reprogramado</option>
                                <option value="Suspendido">Suspendido</option>
                              </select>
                            </td>

                            <td className="py-3 text-right">
                              <button
                                onClick={() => {
                                  const ficha = getFichaIntegralPorUsuario(usuario.id);
                                  if (ficha) {
                                    onSelectFicha(ficha);
                                    onOpenFichaModal();
                                  }
                                }}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-sky-600 hover:bg-sky-50"
                                title="Ver Ficha 360°"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* VIEW MODE 3: LÍNEA DE TIEMPO */}
            {viewMode === 'linea_tiempo' && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="text-xs font-bold text-slate-800">
                  Secuencia Operativa de Apertura y Cierre de Compuertas — {semanaInfo.etiqueta}
                </h3>
                <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-sky-200">
                  {turnosDeLaSemana.map((t) => {
                    const usr = USUARIOS_DEMO.find(u => u.id === t.usuarioId) || USUARIOS_DEMO[0];
                    const diaNombre = getDiaSemanaNombre(t.fechaInicio);

                    return (
                      <div key={t.id} className="relative">
                        <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-sky-600 ring-4 ring-white"></div>
                        <div className="bg-white p-3 rounded-2xl border border-slate-200 text-xs flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900">
                              {diaNombre} {t.fechaInicio} • {t.horaInicio} hrs — {usr.nombres} {usr.apellidos}
                            </span>
                            <p className="text-[11px] text-slate-500">
                              Toma {t.tomaId.toUpperCase()} • Caudal {t.caudalLps} L/s • Duración {t.duracionHoras} hrs • Volumen {t.volumenM3} m³
                            </p>
                          </div>
                          <span
                            className={`font-bold px-2 py-0.5 rounded-full text-[10px] border ${
                              t.estado === 'En Ejecución'
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                : t.estado === 'Programado'
                                ? 'bg-sky-50 text-sky-800 border-sky-200'
                                : 'bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            {t.estado}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Conducciones */}
      {activeTab === 'conducciones' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CONDUCCIONES_DEMO.map(c => (
            <div key={c.id} className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                  {c.codigo}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {c.estado}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{c.nombre}</h3>
              <p className="text-xs text-slate-500">Jerarquía: {c.jerarquia}</p>
              <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Longitud:</span>
                  <strong className="font-mono">{c.longitudKm} km</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Capacidad Diseño:</span>
                  <strong className="font-mono text-sky-900">{c.capacidadDisenoM3s} m³/s</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tipo Sección:</span>
                  <span className="text-slate-700 font-medium">{c.tipoSeccion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Tomas */}
      {activeTab === 'tomas' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {TOMAS_DEMO.map(t => (
            <div key={t.id} className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sky-900">{t.codigoToma}</span>
                <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded-md text-slate-700">
                  {t.progresivaKm}
                </span>
              </div>
              <h4 className="font-bold text-xs text-slate-900">{t.nombre}</h4>
              <p className="text-[11px] text-slate-500">Compuerta: {t.tipoCompuerta}</p>
              <div className="pt-2 border-t border-slate-100 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Capacidad Máx:</span>
                  <strong className="font-mono text-slate-900">{t.capacidadMaximaLps} L/s</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Apertura:</span>
                  <strong className="font-mono text-emerald-700">{t.aperturaActualPorcentaje}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Predios:</span>
                  <span className="font-mono text-slate-700">{t.usuariosAtendidosCount} asignados</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Obras de Arte */}
      {activeTab === 'infraestructura' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {INFRAESTRUCTURA_DEMO.map(i => (
            <div key={i.id} className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md">
                  {i.codigo}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {i.estado}
                </span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{i.nombre}</h4>
              <p className="text-xs text-slate-500">Tipo: {i.tipo} • {i.progresiva}</p>
              <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Capacidad Hidráulica:</span>
                  <strong className="font-mono text-slate-900">{i.capacidadM3s} m³/s</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Última Inspección:</span>
                  <span className="font-mono text-slate-600">{i.ultimaInspeccion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
