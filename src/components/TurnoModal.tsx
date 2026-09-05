/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SIODRA — Modal de Programación de Turno PDA con Validación de Frecuencia Semanal OUA (1 Turno/Semana)
 */

import React, { useState, useMemo } from 'react';
import {
  X,
  Calendar,
  Clock,
  Gauge,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  GitFork,
  Droplet,
  UserCheck,
  RefreshCw,
  Info
} from 'lucide-react';
import { DistribucionTurnoPDA } from '../types';
import {
  USUARIOS_DEMO,
  PREDIOS_DEMO,
  TOMAS_DEMO,
  CONDUCCIONES_DEMO,
  DUAS_DEMO
} from '../data/mockData';
import { validarTurnoSemanal, getSemanaInfo } from '../utils/semanaRiego';

interface TurnoModalProps {
  onClose: () => void;
  onGuardarTurno: (nuevoTurno: DistribucionTurnoPDA, turnoExistenteId?: string) => void;
  turnos?: DistribucionTurnoPDA[];
  initialUsuarioId?: string;
  initialFecha?: string;
}

export const TurnoModal: React.FC<TurnoModalProps> = ({
  onClose,
  onGuardarTurno,
  turnos = [],
  initialUsuarioId,
  initialFecha = '2026-09-03'
}) => {
  const [usuarioId, setUsuarioId] = useState(initialUsuarioId || USUARIOS_DEMO[0].id);
  const [predioId, setPredioId] = useState(PREDIOS_DEMO[0].id);
  const [fechaInicio, setFechaInicio] = useState(initialFecha);
  const [horaInicio, setHoraInicio] = useState('08:00');
  const [caudalLps, setCaudalLps] = useState<number>(120);
  const [duracionHoras, setDuracionHoras] = useState<number>(5.5);
  const [responsable, setResponsable] = useState('Tec. Víctor Huamán (Sectorista)');
  const [permitirReprogramacion, setPermitirReprogramacion] = useState(false);

  // Selected entities derived automatically
  const selectedUsuario = useMemo(
    () => USUARIOS_DEMO.find(u => u.id === usuarioId) || USUARIOS_DEMO[0],
    [usuarioId]
  );
  
  const prediosDelUsuario = useMemo(
    () => PREDIOS_DEMO.filter(p => p.usuarioId === usuarioId),
    [usuarioId]
  );

  const selectedPredio = useMemo(
    () => PREDIOS_DEMO.find(p => p.id === predioId && p.usuarioId === usuarioId) || prediosDelUsuario[0] || PREDIOS_DEMO[0],
    [predioId, usuarioId, prediosDelUsuario]
  );

  const selectedToma = useMemo(
    () => TOMAS_DEMO.find(t => t.id === selectedPredio.tomaId) || TOMAS_DEMO[0],
    [selectedPredio]
  );

  const selectedConduccion = useMemo(
    () => CONDUCCIONES_DEMO.find(c => c.id === selectedToma.conduccionId) || CONDUCCIONES_DEMO[0],
    [selectedToma]
  );

  const selectedDua = useMemo(
    () => DUAS_DEMO.find(d => d.id === selectedPredio.duaId) || DUAS_DEMO[0],
    [selectedPredio]
  );

  // Real-time volume calculation formula: V = Q (L/s) * 3600 * t (h) / 1000 = Q * t * 3.6
  const volumenM3 = Math.round(caudalLps * duracionHoras * 3.6);

  // Remaining DUA quota check
  const saldoDuaM3 = selectedDua.volumenAnualAsignadoM3 - selectedDua.volumenConsumidoCampañaM3;
  const saldoSuficiente = saldoDuaM3 >= volumenM3;

  // REGLA OUA: 1 Turno por usuario por semana
  const validacionSemanal = useMemo(() => {
    return validarTurnoSemanal(selectedUsuario.id, fechaInicio, turnos);
  }, [selectedUsuario.id, fechaInicio, turnos]);

  const semanaInfo = useMemo(() => getSemanaInfo(fechaInicio), [fechaInicio]);

  // Can submit: must have sufficient DUA quota AND either pass weekly rule or have force reschedule enabled
  const puedeConfirmar = saldoSuficiente && (validacionSemanal.puedePedir || permitirReprogramacion);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!puedeConfirmar) return;

    const nuevoTurno: DistribucionTurnoPDA = {
      id: `turno-${Date.now()}`,
      numeroTurno: Math.floor(Math.random() * 900) + 120,
      codigoTurno: `TRN-2026-${Math.floor(Math.random() * 900) + 120}`,
      campaña: '2026-I',
      usuarioId: selectedUsuario.id,
      predioId: selectedPredio.id,
      duaId: selectedDua.id,
      tomaId: selectedToma.id,
      conduccionId: selectedConduccion.id,
      sectorId: selectedPredio.sectorId,
      fechaInicio,
      horaInicio,
      duracionHoras,
      caudalLps,
      volumenM3,
      estado: 'Programado',
      responsableDistribuidor: responsable,
      observaciones: validacionSemanal.turnoExistente && permitirReprogramacion
        ? `Reprogramación autorizada de turno semanal (Reemplaza Turno #${validacionSemanal.turnoExistente.numeroTurno})`
        : `Turno semanal regular para ${selectedUsuario.nombres} ${selectedUsuario.apellidos}. Asignación 1 turno/semana.`
    };

    const turnoReemplazadoId = validacionSemanal.turnoExistente && permitirReprogramacion
      ? validacionSemanal.turnoExistente.id
      : undefined;

    onGuardarTurno(nuevoTurno, turnoReemplazadoId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-sky-700 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              PDA
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Solicitud & Programación de Turno de Riego
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">
                  Regla OUA: 1 Turno/Sem
                </span>
              </h3>
              <p className="text-[11px] text-slate-500">
                Integración con Padrón de 20 Usuarios, Licencia DUA y Rol Hidráulico Semanal
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* User selection (20 users available) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Usuario OUA ({USUARIOS_DEMO.length} en Padrón)
              </label>
              <select
                value={usuarioId}
                onChange={e => {
                  setUsuarioId(e.target.value);
                  const firstPred = PREDIOS_DEMO.find(p => p.usuarioId === e.target.value);
                  if (firstPred) setPredioId(firstPred.id);
                  setPermitirReprogramacion(false);
                }}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              >
                {USUARIOS_DEMO.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.codigoUsuario} — {u.nombres} {u.apellidos}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Predio Catastral (UC)</label>
              <select
                value={selectedPredio.id}
                onChange={e => setPredioId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 font-medium text-slate-800 focus:outline-none"
              >
                {prediosDelUsuario.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.unidadCatastral} ({p.nombrePredio}) • {p.areaBajoRiegoHa} ha
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Validation Banner: Regla OUA de 1 turno por usuario por semana */}
          {!validacionSemanal.puedePedir ? (
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 space-y-2">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold block text-[11px] uppercase tracking-wide text-amber-800">
                    ⚠️ Restricción Operativa: Frecuencia Semanal OUA Excedida
                  </span>
                  <p className="text-[11px] leading-relaxed mt-0.5">
                    {validacionSemanal.mensaje}
                  </p>
                </div>
              </div>

              {/* Reprogramming override option */}
              <div className="pt-2 border-t border-amber-200/70 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={permitirReprogramacion}
                    onChange={e => setPermitirReprogramacion(e.target.checked)}
                    className="rounded text-sky-600 focus:ring-sky-500 w-4 h-4"
                  />
                  <span className="font-bold text-[11px] text-amber-950">
                    Autorizar Reprogramación (Reemplazar Turno #{validacionSemanal.turnoExistente?.numeroTurno})
                  </span>
                </label>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-amber-200 text-amber-900">
                  1 Turno/Sem
                </span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200/80 text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-bold block text-[11px]">
                    Frecuencia Reglamentaria OUA Aprobada
                  </span>
                  <span className="text-[11px] text-emerald-700">
                    Usuario sin turnos en {semanaInfo.etiqueta}. Cupo disponible (0/1).
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono">
                1 Turno/Semana
              </span>
            </div>
          )}

          {/* Auto-derived hydraulic route */}
          <div className="p-3 bg-sky-50/70 rounded-2xl border border-sky-100 flex items-center justify-between text-[11px] text-sky-900">
            <div>
              <span className="font-bold block text-sky-950">Infraestructura Asignada:</span>
              <span>
                Toma {selectedToma.codigoToma} ({selectedToma.nombre}) • Canal {selectedConduccion.nombre}
              </span>
            </div>
            <div className="text-right">
              <span className="font-bold block text-sky-950">Saldo DUA Campaña:</span>
              <span className={`font-mono font-bold ${saldoSuficiente ? 'text-emerald-700' : 'text-rose-700'}`}>
                {saldoDuaM3.toLocaleString()} m³
              </span>
            </div>
          </div>

          {/* Schedule fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Fecha de Turno</label>
              <input
                type="date"
                required
                value={fechaInicio}
                onChange={e => {
                  setFechaInicio(e.target.value);
                  setPermitirReprogramacion(false);
                }}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
              <span className="text-[10px] text-slate-500 block mt-1">
                {semanaInfo.etiqueta}
              </span>
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Hora de Apertura (24h)</label>
              <input
                type="time"
                required
                value={horaInicio}
                onChange={e => setHoraInicio(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 font-medium focus:outline-none"
              />
            </div>
          </div>

          {/* Flow & Duration */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Caudal Programado (L/s)</label>
              <input
                type="number"
                required
                min={10}
                max={500}
                value={caudalLps}
                onChange={e => setCaudalLps(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 font-mono font-bold text-slate-900"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Duración (Horas)</label>
              <input
                type="number"
                required
                step="0.5"
                min={0.5}
                max={48}
                value={duracionHoras}
                onChange={e => setDuracionHoras(Number(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 font-mono font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Responsable */}
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Sectorista / Responsable Operativo</label>
            <input
              type="text"
              value={responsable}
              onChange={e => setResponsable(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800"
            />
          </div>

          {/* Real-time Calculation Result Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase">VOLUMEN TOTAL A DERIVAR</span>
              <span className="text-[10px] font-mono text-slate-500">V = Q (L/s) × t (h) × 3.6</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-slate-900 font-mono">
                {volumenM3.toLocaleString()} m³
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Volumen Conforme
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!puedeConfirmar}
              className={`px-5 py-2 rounded-xl font-semibold shadow-xs transition-colors flex items-center gap-1.5 ${
                puedeConfirmar
                  ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {validacionSemanal.turnoExistente && permitirReprogramacion ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reprogramar Turno Semanal</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Confirmar Turno Semanal</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
