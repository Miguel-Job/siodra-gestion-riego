/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SIODRA — Área Funcional 1: Gestión OUA
 * Padrón Oficial de Usuarios OUA con Control de Turno Semanal (1 Turno/Semana)
 * y Validación Obligatoria de Entrelazamiento Predio / UC con Área Bajo Riego.
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
  CheckCircle,
  Lock,
  Unlock,
  Layers,
  MapPin,
  HelpCircle,
  X,
  UserPlus
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
  const [notificacionToast, setNotificacionToast] = useState<string | null>(null);

  // Local state for registered users and cadastral land parcels (Predios/UC)
  const [usuarios, setUsuarios] = useState<UsuarioAgrario[]>(USUARIOS_DEMO);
  const [prediosLista, setPrediosLista] = useState<PredioCatastral[]>(PREDIOS_DEMO);

  // Form states for new user modal
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoApellido, setNuevoApellido] = useState('');
  const [nuevoTipoDoc, setNuevoTipoDoc] = useState<'DNI' | 'RUC'>('DNI');
  const [nuevoDni, setNuevoDni] = useState('');
  const [nuevoTelefono, setNuevoTelefono] = useState('');

  // Entrelazamiento Catastral: Predio/UC y Área Bajo Riego
  const [modoPredio, setModoPredio] = useState<'existente' | 'nuevo'>('existente');
  const [selectedPredioId, setSelectedPredioId] = useState<string>('');
  const [areaBajoRiegoInput, setAreaBajoRiegoInput] = useState<string>('');
  
  // States if registering a new cadastral unit (UC)
  const [nuevaUcCodigo, setNuevaUcCodigo] = useState(`UC-048${21 + usuarios.length}`);
  const [nuevoNombrePredio, setNuevoNombrePredio] = useState('');
  const [nuevoAreaTotalHa, setNuevoAreaTotalHa] = useState<number>(10.0);
  const [nuevaTomaId, setNuevaTomaId] = useState<string>('toma-001');
  const [nuevoCultivoId, setNuevoCultivoId] = useState<string>('cult-001');

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

  // Derived information for the selected / active predio
  const predioExistente = useMemo(() => {
    return prediosLista.find(p => p.id === selectedPredioId);
  }, [prediosLista, selectedPredioId]);

  const superficieTotalHa = useMemo(() => {
    if (modoPredio === 'existente') {
      return predioExistente?.areaTotalHa || 0;
    }
    return Number(nuevoAreaTotalHa) || 0;
  }, [modoPredio, predioExistente, nuevoAreaTotalHa]);

  const ucNombreResumen = useMemo(() => {
    if (modoPredio === 'existente') {
      return predioExistente ? `${predioExistente.unidadCatastral} — ${predioExistente.nombrePredio}` : '';
    }
    return nuevaUcCodigo.trim() && nuevoNombrePredio.trim() ? `${nuevaUcCodigo} — ${nuevoNombrePredio}` : '';
  }, [modoPredio, predioExistente, nuevaUcCodigo, nuevoNombrePredio]);

  // Validation rules for interlocking: UC must be valid AND area under irrigation must be > 0 and <= total area
  const tieneUcValida = useMemo(() => {
    if (modoPredio === 'existente') {
      return Boolean(selectedPredioId && selectedPredioId !== '');
    }
    return Boolean(nuevaUcCodigo.trim() && nuevoNombrePredio.trim() && nuevoAreaTotalHa > 0);
  }, [modoPredio, selectedPredioId, nuevaUcCodigo, nuevoNombrePredio, nuevoAreaTotalHa]);

  const areaRiegoNumero = useMemo(() => {
    const val = Number(areaBajoRiegoInput);
    return isNaN(val) ? 0 : val;
  }, [areaBajoRiegoInput]);

  const tieneAreaRiegoValida = useMemo(() => {
    if (!tieneUcValida) return false;
    if (areaRiegoNumero <= 0) return false;
    if (superficieTotalHa > 0 && areaRiegoNumero > superficieTotalHa) return false;
    return true;
  }, [tieneUcValida, areaRiegoNumero, superficieTotalHa]);

  const entrelazamientoValido = tieneUcValida && tieneAreaRiegoValida;

  const puedeAperturarUsuario = useMemo(() => {
    return Boolean(
      nuevoNombre.trim() &&
      nuevoApellido.trim() &&
      nuevoDni.trim().length >= 8 &&
      entrelazamientoValido
    );
  }, [nuevoNombre, nuevoApellido, nuevoDni, entrelazamientoValido]);

  // Percentage of area under irrigation
  const porcentajeAprovechamiento = useMemo(() => {
    if (superficieTotalHa <= 0 || areaRiegoNumero <= 0) return 0;
    return Math.min(100, Math.round((areaRiegoNumero / superficieTotalHa) * 100));
  }, [superficieTotalHa, areaRiegoNumero]);

  // Reset form handler
  const resetFormulario = () => {
    setNuevoNombre('');
    setNuevoApellido('');
    setNuevoTipoDoc('DNI');
    setNuevoDni('');
    setNuevoTelefono('');
    setSelectedPredioId('');
    setAreaBajoRiegoInput('');
    setModoPredio('existente');
    setNuevaUcCodigo(`UC-048${21 + usuarios.length}`);
    setNuevoNombrePredio('');
    setNuevoAreaTotalHa(10.0);
  };

  const handleSeleccionarPredioExistente = (predioId: string) => {
    setSelectedPredioId(predioId);
    const p = prediosLista.find(item => item.id === predioId);
    if (p) {
      // Pre-fill area under irrigation with the parcel's current registered area
      setAreaBajoRiegoInput(String(p.areaBajoRiegoHa));
    } else {
      setAreaBajoRiegoInput('');
    }
  };

  const handleCrearUsuario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!puedeAperturarUsuario) return;

    const newUserId = `usr-${Date.now()}`;
    const newCodigoUsuario = `OUA-DEMO-${String(usuarios.length + 1).padStart(3, '0')}`;
    let predioFinalId = selectedPredioId;

    // Handle cadastral parcel linkage
    if (modoPredio === 'nuevo') {
      const newPredioId = `pred-${Date.now()}`;
      predioFinalId = newPredioId;
      const nuevoPredio: PredioCatastral = {
        id: newPredioId,
        codigoPredio: `PRD-2026-${String(prediosLista.length + 1).padStart(3, '0')}`,
        nombrePredio: nuevoNombrePredio.trim(),
        unidadCatastral: nuevaUcCodigo.trim().toUpperCase(),
        usuarioId: newUserId,
        sectorId: 'sec-001',
        areaTotalHa: Number(nuevoAreaTotalHa),
        areaBajoRiegoHa: areaRiegoNumero,
        cultivoId: nuevoCultivoId,
        duaId: 'dua-001',
        tomaId: nuevaTomaId,
        conduccionId: 'cond-002',
        coordenadasUTM: {
          este: 258200 + (prediosLista.length * 150),
          norte: 8725100 + (prediosLista.length * 150),
          zona: '18S'
        },
        estadoCobranza: 'Al Día'
      };
      setPrediosLista([nuevoPredio, ...prediosLista]);
    } else {
      // Update existing parcel with new user assignment and updated irrigated area
      setPrediosLista(prev =>
        prev.map(p =>
          p.id === selectedPredioId
            ? { ...p, usuarioId: newUserId, areaBajoRiegoHa: areaRiegoNumero }
            : p
        )
      );
    }

    const newUser: UsuarioAgrario = {
      id: newUserId,
      codigoUsuario: newCodigoUsuario,
      nombres: nuevoNombre.trim(),
      apellidos: nuevoApellido.trim(),
      tipoDocumento: nuevoTipoDoc,
      numeroDocumento: nuevoDni.trim(),
      telefono: nuevoTelefono.trim() || '999-000-111',
      comisionId: selectedAmbito.id,
      condicion: 'Activo',
      fechaRegistro: new Date().toISOString().split('T')[0],
      avatarInitials: `${nuevoNombre.trim()[0]}${nuevoApellido.trim()[0]}`.toUpperCase(),
      prediosIds: [predioFinalId]
    };

    setUsuarios([newUser, ...usuarios]);
    setShowNuevoUsuarioModal(false);
    resetFormulario();

    setNotificacionToast(
      `¡Usuario ${newUser.nombres} ${newUser.apellidos} aperturado con éxito! Vinculado a ${ucNombreResumen} con ${areaRiegoNumero} ha bajo riego.`
    );
    setTimeout(() => setNotificacionToast(null), 5000);

    const ficha = getFichaIntegralPorUsuario(newUser.id);
    if (ficha) onSelectFicha(ficha);
  };

  const filteredUsers = usuarios.filter(u =>
    u.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.codigoUsuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.numeroDocumento.includes(searchTerm)
  );

  const filteredPredios = prediosLista.filter(p =>
    p.nombrePredio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.unidadCatastral.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.codigoPredio.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDuas = DUAS_DEMO.filter(d =>
    d.codigoDUA.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.resolucionDirectoral.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {/* Dynamic Notification Toast */}
      {notificacionToast && (
        <div className="p-3.5 rounded-2xl bg-emerald-900 text-white shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{notificacionToast}</span>
          </div>
          <button
            onClick={() => setNotificacionToast(null)}
            className="text-emerald-200 hover:text-white text-xs font-bold px-2 py-0.5 rounded-lg hover:bg-emerald-800"
          >
            ✕
          </button>
        </div>
      )}

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
              Padrón {usuarios.length} Usuarios OUA
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            "¿Quién utiliza el agua, en qué predio y bajo qué condiciones?" • Padrón con Entrelazamiento Catastral Obligatorio y Rol Semanal
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
            <span>Predios & UC ({prediosLista.length})</span>
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
                Padrón activo con {usuarios.length} usuarios. Cada usuario debe solicitar o recibir agua exactamente una vez por semana.
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
              placeholder={`Buscar en ${subTab} (ej. Ramos, Palpa, DUA, DNI, UC)...`}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            />
          </div>

          {subTab === 'usuarios' && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  resetFormulario();
                  setShowNuevoUsuarioModal(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold self-end sm:self-auto transition-colors shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Registrar Nuevo Usuario OUA</span>
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Usuarios */}
        {subTab === 'usuarios' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-2">CÓDIGO & USUARIO</th>
                  <th className="pb-2">DOC. IDENTIDAD</th>
                  <th className="pb-2">PREDIO & UC ENTLAZADA</th>
                  <th className="pb-2">ÁREA RIEGO</th>
                  <th className="pb-2">TURNO SEMANAL (1/SEM)</th>
                  <th className="pb-2">ESTADO</th>
                  <th className="pb-2 text-right">ACCIONES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(u => {
                  const prediosUsuario = prediosLista.filter(p => p.usuarioId === u.id);
                  const predio = prediosUsuario[0] || prediosLista[0];
                  const totalRiego = prediosUsuario.reduce((acc, p) => acc + p.areaBajoRiegoHa, 0) || predio.areaBajoRiegoHa;
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
                        <p className="text-[10px] text-sky-800 font-mono font-bold">{predio.unidadCatastral}</p>
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
                  const user = usuarios.find(u => u.id === p.usuarioId) || usuarios[0];
                  const toma = TOMAS_DEMO.find(t => t.id === p.tomaId) || TOMAS_DEMO[0];
                  const cultivo = CULTIVOS_DEMO.find(c => c.id === p.cultivoId) || CULTIVOS_DEMO[0];

                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3">
                        <span className="font-bold text-slate-900">{p.nombrePredio}</span>
                        <p className="text-[10px] font-mono text-sky-800 font-bold">{p.unidadCatastral}</p>
                      </td>
                      <td className="py-3">
                        <span className="font-semibold text-slate-800">{user.nombres} {user.apellidos}</span>
                        <p className="text-[10px] font-mono text-slate-500">{user.codigoUsuario}</p>
                      </td>
                      <td className="py-3 font-mono">
                        <strong className="text-slate-900">{p.areaBajoRiegoHa} ha bajo riego</strong>
                        <span className="text-slate-400 text-[10px]"> / {p.areaTotalHa} ha total</span>
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
                  const user = usuarios.find(u => u.id === d.usuarioId) || usuarios[0];
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

      {/* Modal: Aperturar Nuevo Usuario OUA con Entrelazamiento Catastral */}
      {showNuevoUsuarioModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  OUA
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    Apertura de Nuevo Usuario Agrario
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                      Entrelazamiento Catastral
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Registro en Padrón Oficial con vinculación obligatoria de Predio (UC) y Área Bajo Riego
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowNuevoUsuarioModal(false);
                  resetFormulario();
                }}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCrearUsuario} className="space-y-4 text-xs">
              {/* Sección 1: Datos Personales del Usuario */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-600" />
                  1. Identificación del Usuario Agrario
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Nombres *</label>
                    <input
                      type="text"
                      required
                      value={nuevoNombre}
                      onChange={e => setNuevoNombre(e.target.value)}
                      placeholder="Ej. Juan Andrés"
                      className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Apellidos *</label>
                    <input
                      type="text"
                      required
                      value={nuevoApellido}
                      onChange={e => setNuevoApellido(e.target.value)}
                      placeholder="Ej. Quispe Morales"
                      className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tipo Documento</label>
                    <select
                      value={nuevoTipoDoc}
                      onChange={e => setNuevoTipoDoc(e.target.value as 'DNI' | 'RUC')}
                      className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none text-slate-800 font-medium"
                    >
                      <option value="DNI">DNI (8 dígitos)</option>
                      <option value="RUC">RUC (11 dígitos)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">N.° Documento *</label>
                    <input
                      type="text"
                      required
                      value={nuevoDni}
                      onChange={e => setNuevoDni(e.target.value)}
                      placeholder={nuevoTipoDoc === 'DNI' ? '8 dígitos' : '11 dígitos'}
                      maxLength={nuevoTipoDoc === 'DNI' ? 8 : 11}
                      className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none font-mono text-slate-900 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Teléfono / Celular</label>
                    <input
                      type="text"
                      value={nuevoTelefono}
                      onChange={e => setNuevoTelefono(e.target.value)}
                      placeholder="999-000-000"
                      className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none text-slate-800 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Sección 2: Entrelazamiento Catastral Obligatorio */}
              <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                    <Home className="w-3.5 h-3.5 text-emerald-600" />
                    2. Predio / Unidad Catastral (UC) Asignada *
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                    Requisito de Apertura
                  </span>
                </div>

                {/* Sub-selector: Asociar Existente vs Registrar Nueva UC */}
                <div className="flex items-center gap-2 p-1 bg-white rounded-xl border border-slate-200 text-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setModoPredio('existente');
                      setSelectedPredioId('');
                      setAreaBajoRiegoInput('');
                    }}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                      modoPredio === 'existente' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Vincular a Unidad Catastral Existente ({prediosLista.length} en base)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setModoPredio('nuevo');
                      setSelectedPredioId('');
                      setAreaBajoRiegoInput('8.0');
                    }}
                    className={`flex-1 py-1.5 rounded-lg font-semibold transition-colors ${
                      modoPredio === 'nuevo' ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    + Registrar Nueva Unidad Catastral
                  </button>
                </div>

                {/* Caso A: Seleccionar Predio / UC Existente */}
                {modoPredio === 'existente' && (
                  <div className="space-y-2">
                    <label className="font-semibold text-slate-700 block">
                      Seleccionar Predio / Unidad Catastral (UC) correspondiente *
                    </label>
                    <select
                      value={selectedPredioId}
                      onChange={e => handleSeleccionarPredioExistente(e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                    >
                      <option value="">-- Seleccione la Unidad Catastral (UC) a vincular --</option>
                      {prediosLista.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.unidadCatastral} — {p.nombrePredio} (Área total: {p.areaTotalHa} ha)
                        </option>
                      ))}
                    </select>

                    {predioExistente && (
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200 text-[11px] grid grid-cols-3 gap-2">
                        <div>
                          <span className="text-slate-400 block text-[10px]">PREDIO:</span>
                          <strong className="text-slate-800">{predioExistente.nombrePredio}</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">SUPERFICIE TOTAL:</span>
                          <strong className="font-mono text-slate-800">{predioExistente.areaTotalHa} ha</strong>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">TOMA DE ENTREGA:</span>
                          <strong className="font-mono text-sky-900">{predioExistente.tomaId.toUpperCase()}</strong>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Caso B: Registrar Nueva UC */}
                {modoPredio === 'nuevo' && (
                  <div className="space-y-2.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Código Unidad Catastral (UC) *</label>
                        <input
                          type="text"
                          required
                          value={nuevaUcCodigo}
                          onChange={e => setNuevaUcCodigo(e.target.value)}
                          placeholder="Ej. UC-04841"
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-mono font-bold text-sky-900 uppercase"
                        />
                      </div>
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Nombre del Predio / Parcela *</label>
                        <input
                          type="text"
                          required
                          value={nuevoNombrePredio}
                          onChange={e => setNuevoNombrePredio(e.target.value)}
                          placeholder="Ej. Parcela Santa Rosa"
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-medium text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Área Total del Predio (ha) *</label>
                        <input
                          type="number"
                          step="0.1"
                          min="0.5"
                          required
                          value={nuevoAreaTotalHa}
                          onChange={e => setNuevoAreaTotalHa(Number(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-mono font-bold text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Toma de Entrega</label>
                        <select
                          value={nuevaTomaId}
                          onChange={e => setNuevaTomaId(e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-mono text-slate-800"
                        >
                          {TOMAS_DEMO.map(t => (
                            <option key={t.id} value={t.id}>
                              {t.codigoToma} — {t.nombre}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="font-semibold text-slate-700 block mb-1">Cultivo Proyectado</label>
                        <select
                          value={nuevoCultivoId}
                          onChange={e => setNuevoCultivoId(e.target.value)}
                          className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-slate-800"
                        >
                          {CULTIVOS_DEMO.map(c => (
                            <option key={c.id} value={c.id}>
                              {c.nombre} ({c.moduloRiegoLpsHa} L/s/ha)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Campo Entrelazado: Área Bajo Riego (ha) */}
                <div className="pt-2 border-t border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5 text-sky-600" />
                      <span>3. Área Bajo Riego (ha) según Predio / UC *</span>
                    </label>
                    <span className="text-[10px] font-mono text-slate-500">
                      Entrelazado con UC ({superficieTotalHa > 0 ? `Máx. ${superficieTotalHa} ha` : 'Pendiente UC'})
                    </span>
                  </div>

                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
                      max={superficieTotalHa > 0 ? superficieTotalHa : undefined}
                      disabled={!tieneUcValida}
                      value={areaBajoRiegoInput}
                      onChange={e => setAreaBajoRiegoInput(e.target.value)}
                      placeholder={
                        tieneUcValida
                          ? `Ingrese superficie bajo riego (ej. ${superficieTotalHa > 0 ? Math.min(superficieTotalHa, 8.5) : 8.5})`
                          : 'Primero seleccione o defina una Unidad Catastral (UC) válida'
                      }
                      className={`w-full px-3.5 py-2.5 rounded-xl border font-mono font-bold text-sm transition-colors ${
                        !tieneUcValida
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          : tieneAreaRiegoValida
                          ? 'bg-white border-emerald-300 text-slate-900 ring-2 ring-emerald-500/20'
                          : 'bg-white border-amber-300 text-slate-900'
                      }`}
                    />
                    <span className="absolute right-3 top-2.5 font-bold text-xs text-slate-400 font-mono">
                      ha
                    </span>
                  </div>

                  {/* Dynamic Area Indicator */}
                  {tieneUcValida && (
                    <div className="flex items-center justify-between text-[11px] pt-1 text-slate-600">
                      <span>
                        Superficie Total del Predio:{' '}
                        <strong className="font-mono text-slate-900">{superficieTotalHa} ha</strong>
                      </span>
                      {tieneAreaRiegoValida && (
                        <span className="font-bold text-emerald-700 font-mono">
                          {areaRiegoNumero} ha bajo riego ({porcentajeAprovechamiento}% aprovechamiento)
                        </span>
                      )}
                    </div>
                  )}

                  {tieneUcValida && areaRiegoNumero > superficieTotalHa && superficieTotalHa > 0 && (
                    <p className="text-[11px] font-bold text-rose-600">
                      ⚠️ El área bajo riego ({areaRiegoNumero} ha) no puede exceder el área total del predio ({superficieTotalHa} ha).
                    </p>
                  )}
                </div>
              </div>

              {/* NOTA DE RESTRICCIÓN OPERATIVA INSTITUCIONAL */}
              {!entrelazamientoValido ? (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 space-y-2">
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <span className="font-bold text-[11px] uppercase tracking-wide text-rose-800 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-rose-600" />
                        NOTA DE RESTRICCIÓN OPERATIVA — LEY 29338 & D.S. N.° 020-2025-MIDAGRI
                      </span>
                      <p className="text-[11px] text-rose-700 leading-relaxed">
                        <strong>Apertura no permitida:</strong> Todo nuevo usuario del padrón debe contar obligatoriamente con la vinculación formal de su <strong>Predio (Unidad Catastral)</strong> y el <strong>Área Bajo Riego (ha)</strong> según dicha UC. Ambos datos están estrictamente entrelazados; si no se selecciona o no se define un área bajo riego válida mayor a 0 ha, el sistema no autorizará la apertura del usuario agrario.
                      </p>
                    </div>
                  </div>

                  {/* Checklist of missing constraints */}
                  <div className="pt-1.5 border-t border-rose-200/80 flex flex-wrap items-center gap-2 text-[10px] font-mono">
                    <span
                      className={`px-2 py-0.5 rounded-md font-semibold ${
                        tieneUcValida ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-200 text-rose-900 font-bold'
                      }`}
                    >
                      {tieneUcValida ? '✓ Unidad Catastral (UC) Definida' : '✗ Falta Seleccionar / Asignar UC'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-md font-semibold ${
                        tieneAreaRiegoValida ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-200 text-rose-900 font-bold'
                      }`}
                    >
                      {tieneAreaRiegoValida
                        ? `✓ Área Bajo Riego Válida (${areaRiegoNumero} ha)`
                        : '✗ Falta Ingresar Área Bajo Riego (> 0 ha)'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-[11px] text-emerald-800 block">
                        ✓ Vinculación Catastral Conforme — Apertura Habilitada
                      </span>
                      <span className="text-[10px] text-emerald-700">
                        Predio {ucNombreResumen} entrelazado exitosamente con {areaRiegoNumero} ha bajo riego ({porcentajeAprovechamiento}% del área total).
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                    Habilitado
                  </span>
                </div>
              )}

              {/* Acciones del Modal */}
              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowNuevoUsuarioModal(false);
                    resetFormulario();
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!puedeAperturarUsuario}
                  className={`px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
                    puedeAperturarUsuario
                      ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
                  }`}
                  title={
                    !puedeAperturarUsuario
                      ? 'Complete todos los campos requeridos y el entrelazamiento catastral para habilitar'
                      : 'Aperturar y registrar usuario en el padrón'
                  }
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>
                    {puedeAperturarUsuario ? 'Aperturar y Guardar Usuario en Padrón' : 'Apertura Bloqueada (Complete UC y Área de Riego)'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
