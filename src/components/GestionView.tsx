/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SIODRA — Área Funcional 1: Gestión OUA
 * Padrón Oficial de 20 Usuarios OUA con Control de Turno Semanal (1 Turno/Semana)
 */

import React, { useState, useMemo } from 'react';
import {
  Users,
  Home,
  FileCheck,
  Sprout,
  Plus,
  Search,
  ChevronRight,
  ShieldCheck,
  Phone,
  CheckCircle2,
  ExternalLink,
  Calendar,
  Clock,
  Droplet,
  AlertTriangle,
  Play,
  Sparkles,
  CheckCircle
} from 'lucide-react';
import {
  UsuarioAgrario,
  PredioCatastral,
  DerechoUsoAgua,
  CultivoUsoTierra,
  FichaIntegral360Data,
  Ambito,
  DistribucionTurnoPDA
} from '../types';
import {
  USUARIOS_DEMO,
  PREDIOS_DEMO,
  DUAS_DEMO,
  CULTIVOS_DEMO,
  TOMAS_DEMO,
  CONDUCCIONES_DEMO,
  DISTRIBUCION_TURNOS_DEMO,
  getFichaIntegralPorUsuario
} from '../data/mockData';
import { getSemanaInfo, getDiaSemanaNombre } from '../utils/semanaRiego';

interface GestionViewProps {
  selectedAmbito: Ambito;
  onSelectFicha: (ficha: FichaIntegral360Data) => void;
  onOpenFichaModal: () => void;
  turnos?: DistribucionTurnoPDA[];
  onPedirTurnoUsuario?: (usuarioId: string, fecha?: string) => void;
}

export const GestionView: React.FC<GestionViewProps> = ({
  selectedAmbito,
  onSelectFicha,
  onOpenFichaModal,
  turnos = DISTRIBUCION_TURNOS_DEMO,
  onPedirTurnoUsuario
}) => {
  const [subTab, setSubTab] = useState<'usuarios' | 'predios' | 'dua' | 'cultivos'>('usuarios');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNuevoUsuarioModal, setShowNuevoUsuarioModal] = useState(false);
  const [testNotification, setTestNotification] = useState<string | null>(null);

  // Local state for registered users
  const [usuarios, setUsuarios] = useState<UsuarioAgrario[]>(USUARIOS_DEMO);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoApellido, setNuevoApellido] = useState('');
  const [nuevoDni, setNuevoDni] = useState('');
  const [nuevoTelefono, setNuevoTelefono] = useState('');

  // Current active week info
  const semanaActual = useMemo(() => getSemanaInfo('2026-09-02'), []);

  // Map each user to their turn in the active week
  const turnosPorUsuarioEnSemana = useMemo(() => {
    const map = new Map<string, DistribucionTurnoPDA>();
    turnos.forEach(t => {
      const info = getSemanaInfo(t.fechaInicio);
      if (info.inicioSemana === semanaActual.inicioSemana) {
        map.set(t.usuarioId, t);
      }
    });
    return map;
  }, [turnos, semanaActual]);

  const statsSemanal = useMemo(() => {
    const conTurno = usuarios.filter(u => turnosPorUsuarioEnSemana.has(u.id)).length;
    const sinTurno = usuarios.length - conTurno;
    const porcentaje = Math.round((conTurno / usuarios.length) * 100);
    return { conTurno, sinTurno, porcentaje };
  }, [usuarios, turnosPorUsuarioEnSemana]);

  const filteredUsers = usuarios.filter(u =>
    u.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.codigoUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.numeroDocumento.includes(searchTerm)
  );

  const filteredPredios = PREDIOS_DEMO.filter(p =>
    p.nombrePredio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.unidadCatastral.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.codigoPredio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDuas = DUAS_DEMO.filter(d =>
    d.codigoDUA.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.resolucionDirectoral.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCrearUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoApellido || !nuevoDni) return;

    const newUser: UsuarioAgrario = {
      id: `usr-${Date.now()}`,
      codigoUsuario: `OUA-DEMO-${String(usuarios.length + 1).padStart(3, '0')}`,
      nombres: nuevoNombre,
      apellidos: nuevoApellido,
      tipoDocumento: 'DNI',
      numeroDocumento: nuevoDni,
      telefono: nuevoTelefono || '999-000-111',
      comisionId: selectedAmbito.id,
      condicion: 'Activo',
      fechaRegistro: new Date().toISOString().split('T')[0],
      avatarInitials: `${nuevoNombre[0]}${nuevoApellido[0]}`.toUpperCase(),
      prediosIds: ['pred-001']
    };

    setUsuarios([newUser, ...usuarios]);
    setShowNuevoUsuarioModal(false);
    setNuevoNombre('');
    setNuevoApellido('');
    setNuevoDni('');
    setNuevoTelefono('');

    const ficha = getFichaIntegralPorUsuario(newUser.id);
    if (ficha) onSelectFicha(ficha);
  };

  const triggerTestRuleBlock = () => {
    // Victoriano Ramos already has a turn this week (Mié 02 Set)
    if (onPedirTurnoUsuario) {
      onPedirTurnoUsuario('usr-001', '2026-09-04');
    }
  };

  const triggerTestNextWeek = () => {
    // Week 37 (e.g. 2026-09-09) has no turns yet -> allowed
    if (onPedirTurnoUsuario) {
      onPedirTurnoUsuario('usr-001', '2026-09-09');
    }
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xs">
              1
            </span>
            <h1 className="text-xl font-bold text-slate-900">
              Área Funcional 1: Gestión OUA
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Padrón 20/20 Usuarios OUA
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            "¿Quién utiliza el agua, en qué predio y bajo qué condiciones?" • Padrón de 20 Usuarios con Rol Semanal (1 Turno/Semana)
          </p>
        </div>

        {/* Subtabs Selector */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl gap-1 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setSubTab('usuarios')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
              subTab === 'usuarios' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-sky-600" />
            <span>Padrón Usuarios ({usuarios.length})</span>
          </button>

          <button
            onClick={() => setSubTab('predios')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
              subTab === 'predios' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-emerald-600" />
            <span>Predios & UC ({PREDIOS_DEMO.length})</span>
          </button>

          <button
            onClick={() => setSubTab('dua')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
              subTab === 'dua' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Derechos DUA ({DUAS_DEMO.length})</span>
          </button>

          <button
            onClick={() => setSubTab('cultivos')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
              subTab === 'cultivos' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sprout className="w-3.5 h-3.5 text-green-600" />
            <span>Cultivos & Demanda ({CULTIVOS_DEMO.length})</span>
          </button>
        </div>
      </div>

      {/* Interactive Testing & Weekly Irrigation Control Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-indigo-900 rounded-3xl p-5 text-white shadow-lg space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20">
              <Calendar className="w-5 h-5 text-sky-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm">
                  Control Semanal de Riego OUA — {semanaActual.etiqueta}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                  Regla Operativa: 1 Turno/Semana
                </span>
              </div>
              <p className="text-xs text-sky-200">
                Padrón activo con 20 usuarios. Cada usuario debe solicitar o recibir agua exactamente una vez por semana.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl font-mono">
              Cobertura Semanal: <strong className="text-emerald-300">{statsSemanal.conTurno}/{usuarios.length} ({statsSemanal.porcentaje}%)</strong>
            </span>
          </div>
        </div>

        {/* Quick Test Actions */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-[11px] text-sky-200 font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-sky-300" />
            Pruebas Rápidas de la Regla Semanal:
          </span>

          <button
            onClick={triggerTestRuleBlock}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-amber-200 font-bold transition-colors"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Probar Bloqueo (Segundo Turno en Misma Semana)</span>
          </button>

          <button
            onClick={triggerTestNextWeek}
            className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-400/20 hover:bg-emerald-400/30 border border-emerald-300/40 text-emerald-200 font-bold transition-colors"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
            <span>Probar Solicitud Próxima Semana (Semana 37)</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder={`Buscar en ${subTab} (ej. Ramos, Palpa, DUA, DNI)...`}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          {subTab === 'usuarios' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNuevoUsuarioModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold self-end sm:self-auto transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Registrar Nuevo Usuario OUA</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Usuarios (Padrón de 20 Usuarios) */}
        {subTab === 'usuarios' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-2">CÓDIGO & USUARIO</th>
                  <th className="pb-2">DOC. IDENTIDAD</th>
                  <th className="pb-2">PREDIO ASOCIADO</th>
                  <th className="pb-2">ÁREA RIEGO</th>
                  <th className="pb-2">TURNO SEMANAL (1/SEM)</th>
                  <th className="pb-2">ESTADO</th>
                  <th className="pb-2 text-right">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(u => {
                  const predios = PREDIOS_DEMO.filter(p => p.usuarioId === u.id);
                  const predio = predios[0] || PREDIOS_DEMO[0];
                  const totalRiego = predios.reduce((acc, p) => acc + p.areaBajoRiegoHa, 0) || predio.areaBajoRiegoHa;
                  const turnoSemanal = turnosPorUsuarioEnSemana.get(u.id);

                  return (
                    <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-sky-700 text-white font-bold text-xs flex items-center justify-center shadow-2xs">
                            {u.avatarInitials}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 hover:text-sky-700 cursor-pointer"
                              onClick={() => {
                                const ficha = getFichaIntegralPorUsuario(u.id);
                                if (ficha) {
                                  onSelectFicha(ficha);
                                  onOpenFichaModal();
                                }
                              }}
                            >
                              {u.nombres} {u.apellidos}
                            </span>
                            <p className="text-[10px] font-mono text-slate-500">{u.codigoUsuario}</p>
                          </div>
                        </div>
                      </td>

                      <td className="py-3">
                        <span className="font-mono text-slate-700 font-semibold">
                          {u.tipoDocumento}: {u.numeroDocumento}
                        </span>
                        <p className="text-[10px] text-slate-400 flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {u.telefono}
                        </p>
                      </td>

                      <td className="py-3">
                        <span className="font-medium text-slate-800">{predio.nombrePredio}</span>
                        <p className="text-[10px] text-slate-500 font-mono">{predio.unidadCatastral}</p>
                      </td>

                      <td className="py-3 font-mono font-bold text-slate-800">
                        {totalRiego.toFixed(1)} ha
                      </td>

                      {/* Turno Semanal Column */}
                      <td className="py-3">
                        {turnoSemanal ? (
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono">
                                1/1 Asignado
                              </span>
                              <span className="font-medium text-slate-800 text-[11px]">
                                {getDiaSemanaNombre(turnoSemanal.fechaInicio)} • {turnoSemanal.horaInicio} hrs
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-mono">
                              Turno #{turnoSemanal.numeroTurno} ({turnoSemanal.caudalLps} L/s • {turnoSemanal.volumenM3} m³)
                            </p>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-mono">
                              0/1 Pendiente
                            </span>
                            <span className="text-[10px] text-slate-400">Sin turno esta semana</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          {u.condicion}
                        </span>
                      </td>

                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Pedir Turno Button */}
                          <button
                            onClick={() => {
                              if (onPedirTurnoUsuario) {
                                onPedirTurnoUsuario(u.id);
                              }
                            }}
                            className="px-2.5 py-1 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 font-semibold text-[11px] transition-colors flex items-center gap-1"
                            title="Gestionar o solicitar turno de agua semanal"
                          >
                            <Calendar className="w-3 h-3 text-sky-600" />
                            <span>{turnoSemanal ? 'Reprogramar' : 'Pedir Turno'}</span>
                          </button>

                          {/* Ficha 360° Button */}
                          <button
                            onClick={() => {
                              const ficha = getFichaIntegralPorUsuario(u.id);
                              if (ficha) {
                                onSelectFicha(ficha);
                                onOpenFichaModal();
                              }
                            }}
                            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors"
                            title="Ver Ficha Integral 360°"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Predios & Unidades Catastrales */}
        {subTab === 'predios' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-2">PREDIO & UC</th>
                  <th className="pb-2">USUARIO ASIGNADO</th>
                  <th className="pb-2">SUPERFICIE TOTAL / RIEGO</th>
                  <th className="pb-2">CULTIVO PRINCIPAL</th>
                  <th className="pb-2">PUNTO DE ENTREGA (TOMA)</th>
                  <th className="pb-2">ESTADO COBRANZA</th>
                  <th className="pb-2 text-right">FICHA 360°</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPredios.map(p => {
                  const user = USUARIOS_DEMO.find(u => u.id === p.usuarioId) || USUARIOS_DEMO[0];
                  const toma = TOMAS_DEMO.find(t => t.id === p.tomaId) || TOMAS_DEMO[0];
                  const cultivo = CULTIVOS_DEMO.find(c => c.id === p.cultivoId) || CULTIVOS_DEMO[0];

                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3">
                        <span className="font-bold text-slate-900">{p.nombrePredio}</span>
                        <p className="text-[10px] font-mono text-slate-500">{p.unidadCatastral}</p>
                      </td>
                      <td className="py-3">
                        <span className="font-semibold text-slate-800">{user.nombres} {user.apellidos}</span>
                        <p className="text-[10px] font-mono text-slate-500">{user.codigoUsuario}</p>
                      </td>
                      <td className="py-3 font-mono">
                        <strong className="text-slate-900">{p.areaBajoRiegoHa} ha</strong>
                        <span className="text-slate-400 text-[10px]"> / {p.areaTotalHa} ha</span>
                      </td>
                      <td className="py-3">
                        <span className="font-semibold text-slate-800">{cultivo.nombre}</span>
                        <p className="text-[10px] text-slate-500">{cultivo.variedad}</p>
                      </td>
                      <td className="py-3">
                        <span className="font-mono font-bold text-sky-900">{toma.codigoToma}</span>
                        <p className="text-[10px] text-slate-500">{toma.nombre}</p>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.estadoCobranza === 'Al Día' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {p.estadoCobranza}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => {
                            const ficha = getFichaIntegralPorUsuario(user.id);
                            if (ficha) {
                              onSelectFicha(ficha);
                              onOpenFichaModal();
                            }
                          }}
                          className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-800"
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
        )}

        {/* Tab 3: Derechos de Uso de Agua (DUA) */}
        {subTab === 'dua' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-2">CÓDIGO DUA & RESOLUCIÓN</th>
                  <th className="pb-2">TITULAR (USUARIO)</th>
                  <th className="pb-2">TIPO DERECHO</th>
                  <th className="pb-2">VOLUMEN ANUAL ASIGNADO</th>
                  <th className="pb-2">CONSUMIDO EN CAMPAÑA</th>
                  <th className="pb-2">SALDO DISPONIBLE</th>
                  <th className="pb-2">ESTADO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredDuas.map(d => {
                  const user = USUARIOS_DEMO.find(u => u.id === d.usuarioId) || USUARIOS_DEMO[0];
                  const saldo = d.volumenAnualAsignadoM3 - d.volumenConsumidoCampañaM3;
                  const pct = Math.round((d.volumenConsumidoCampañaM3 / d.volumenAnualAsignadoM3) * 100);

                  return (
                    <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3">
                        <span className="font-mono font-bold text-slate-900">{d.codigoDUA}</span>
                        <p className="text-[10px] text-slate-500 font-mono">{d.resolucionDirectoral}</p>
                      </td>
                      <td className="py-3 font-semibold text-slate-800">
                        {user.nombres} {user.apellidos}
                      </td>
                      <td className="py-3 text-slate-600 font-medium">
                        {d.tipoDUA}
                      </td>
                      <td className="py-3 font-mono font-bold text-slate-900">
                        {d.volumenAnualAsignadoM3.toLocaleString()} m³
                      </td>
                      <td className="py-3 font-mono text-slate-700">
                        {d.volumenConsumidoCampañaM3.toLocaleString()} m³ ({pct}%)
                      </td>
                      <td className="py-3 font-mono font-bold text-emerald-700">
                        {saldo.toLocaleString()} m³
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {d.estado}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Cultivos */}
        {subTab === 'cultivos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CULTIVOS_DEMO.map(c => (
              <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{c.nombre}</span>
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.colorHex }} />
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Variedad: {c.variedad} • {c.tipoCiclo}</p>
                <div className="pt-2 border-t border-slate-200 text-[11px] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Módulo de Riego:</span>
                    <strong className="font-mono text-slate-900">{c.moduloRiegoLpsHa} L/s/ha</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Demanda Hídrica:</span>
                    <strong className="font-mono text-slate-900">{c.demandaHidricaM3Ha.toLocaleString()} m³/ha</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Registrar Nuevo Usuario OUA */}
      {showNuevoUsuarioModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Registrar Nuevo Usuario OUA</h3>
              <button
                onClick={() => setShowNuevoUsuarioModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCrearUsuario} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nombres</label>
                <input
                  type="text"
                  required
                  value={nuevoNombre}
                  onChange={e => setNuevoNombre(e.target.value)}
                  placeholder="Ej. Juan Andrés"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Apellidos</label>
                <input
                  type="text"
                  required
                  value={nuevoApellido}
                  onChange={e => setNuevoApellido(e.target.value)}
                  placeholder="Ej. Quispe Morales"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">DNI / RUC</label>
                  <input
                    type="text"
                    required
                    value={nuevoDni}
                    onChange={e => setNuevoDni(e.target.value)}
                    placeholder="8 dígitos"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Teléfono</label>
                  <input
                    type="text"
                    value={nuevoTelefono}
                    onChange={e => setNuevoTelefono(e.target.value)}
                    placeholder="999-000-000"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNuevoUsuarioModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-slate-900 text-white font-semibold"
                >
                  Guardar en Padrón
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
