/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  X,
  Printer,
  ShieldCheck,
  User,
  Home,
  FileCheck,
  Sprout,
  GitFork,
  MapPin,
  Calendar,
  CircleDollarSign,
  Layers,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { FichaIntegral360Data } from '../types';
import { FICHA_INTEGRAL_DEMO } from '../data/mockData';

interface Ficha360ModalProps {
  ficha?: FichaIntegral360Data;
  onClose: () => void;
}

export const Ficha360Modal: React.FC<Ficha360ModalProps> = ({ ficha, onClose }) => {
  const activeFicha = ficha || FICHA_INTEGRAL_DEMO;
  const {
    usuario,
    predio,
    dua,
    cultivo,
    conduccion,
    toma,
    infraestructura,
    turnos = activeFicha.turnosHistorial || [],
    obligacionesCobranza = activeFicha.cobranza || []
  } = activeFicha;

  const totalDeuda = obligacionesCobranza.reduce((acc, o) => acc + o.saldoPendienteSoles, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-sky-700 text-white flex items-center justify-center font-bold text-sm">
              360°
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Ficha Integral 360° — {predio.unidadCatastral}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {usuario.condicion}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {usuario.nombres} {usuario.apellidos} • {predio.nombrePredio} • OUA: {usuario.codigoUsuario}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir Ficha</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs">
          {/* Top Banner Verification: "Registrar una vez, relacionar automáticamente" */}
          <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-sky-950 font-medium">
              <ShieldCheck className="w-4 h-4 text-sky-700" />
              <span>Consistencia Relacional Validad: ÁMBITO → USUARIO → PREDIO → DUA → CULTIVO → TOMA → CONDUCCIÓN → DISTRIBUCIÓN → COBRANZA</span>
            </div>
            <span className="text-[10px] font-mono text-sky-800 font-bold">ESTADO CONFORME</span>
          </div>

          {/* Dimension 1 & 2: Usuario y Predio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Usuario */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-200/80 pb-2">
                <User className="w-4 h-4 text-sky-600" />
                <span>1. Datos del Usuario Agrario</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <p><strong className="text-slate-800">Nombre Titular:</strong> {usuario.nombres} {usuario.apellidos}</p>
                <p><strong className="text-slate-800">Documento:</strong> {usuario.tipoDocumento} {usuario.numeroDocumento}</p>
                <p><strong className="text-slate-800">Código OUA:</strong> <span className="font-mono">{usuario.codigoUsuario}</span></p>
                <p><strong className="text-slate-800">Teléfono:</strong> {usuario.telefono}</p>
                <p><strong className="text-slate-800">Fecha Registro:</strong> {usuario.fechaRegistro}</p>
              </div>
            </div>

            {/* Predio */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-200/80 pb-2">
                <Home className="w-4 h-4 text-emerald-600" />
                <span>2. Catastro & Predio</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <p><strong className="text-slate-800">Unidad Catastral (UC):</strong> <span className="font-mono font-bold text-sky-900">{predio.unidadCatastral}</span></p>
                <p><strong className="text-slate-800">Nombre Predio:</strong> {predio.nombrePredio}</p>
                <p><strong className="text-slate-800">Área Bajo Riego:</strong> <span className="font-bold text-slate-900">{predio.areaBajoRiegoHa} ha</span> (Total: {predio.areaTotalHa} ha)</p>
                <p><strong className="text-slate-800">Estado Cobranza:</strong> {predio.estadoCobranza}</p>
                <p><strong className="text-slate-800">Coordenadas UTM 18S:</strong> <span className="font-mono">E: 256,420 • N: 8,725,180</span></p>
              </div>
            </div>
          </div>

          {/* Dimension 3 & 4: DUA y Cultivo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DUA */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-200/80 pb-2">
                <FileCheck className="w-4 h-4 text-amber-600" />
                <span>3. Derecho de Uso de Agua (DUA)</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <p><strong className="text-slate-800">Código DUA:</strong> <span className="font-mono font-bold">{dua.codigoDUA}</span></p>
                <p><strong className="text-slate-800">Resolución ANA:</strong> {dua.resolucionDirectoral}</p>
                <p><strong className="text-slate-800">Volumen Anual:</strong> <span className="font-mono font-bold text-sky-900">{dua.volumenAnualAsignadoM3.toLocaleString()} m³/año</span></p>
                <p><strong className="text-slate-800">Consumido en Campaña:</strong> {dua.volumenConsumidoCampañaM3.toLocaleString()} m³</p>
                <p><strong className="text-slate-800">Fuente:</strong> {dua.fuenteAgua} ({dua.tipoDUA})</p>
              </div>
            </div>

            {/* Cultivo */}
            <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-200/80 pb-2">
                <Sprout className="w-4 h-4 text-green-600" />
                <span>4. Cultivo & Demanda Hídrica</span>
              </div>
              <div className="space-y-1 text-slate-600">
                <p><strong className="text-slate-800">Cultivo:</strong> <span className="font-bold text-slate-900">{cultivo.nombre} ({cultivo.variedad})</span></p>
                <p><strong className="text-slate-800">Ciclo:</strong> {cultivo.tipoCiclo}</p>
                <p><strong className="text-slate-800">Módulo de Riego:</strong> <span className="font-mono font-bold text-slate-900">{cultivo.moduloRiegoLpsHa} L/s/ha</span></p>
                <p><strong className="text-slate-800">Demanda Hídrica:</strong> {cultivo.demandaHidricaM3Ha.toLocaleString()} m³/ha</p>
                <p><strong className="text-slate-800">Demanda Predial Total:</strong> {(cultivo.demandaHidricaM3Ha * predio.areaBajoRiegoHa).toLocaleString()} m³</p>
              </div>
            </div>
          </div>

          {/* Dimension 5, 6 & 7: Hidráulica (Conducción, Toma, Obras) */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 border-b border-slate-200/80 pb-2">
              <GitFork className="w-4 h-4 text-sky-600" />
              <span>5, 6 & 7. Red Hidráulica de Entrega (Conducción & Toma)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">CANAL DE CONDUCCIÓN</span>
                <p className="font-bold text-slate-900 mt-0.5">{conduccion.nombre}</p>
                <p className="text-[11px] text-slate-500">Jerarquía: {conduccion.jerarquia} • {conduccion.capacidadDisenoM3s} m³/s</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">TOMA DE ENTREGA</span>
                <p className="font-bold text-slate-900 mt-0.5">{toma.codigoToma} ({toma.nombre})</p>
                <p className="text-[11px] text-slate-500">Progresiva: {toma.progresivaKm} • {toma.margen}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">COMPUERTA & AFORO</span>
                <p className="font-bold text-slate-900 mt-0.5">{toma.tipoCompuerta}</p>
                <p className="text-[11px] text-slate-500">Apertura actual: {toma.aperturaActualPorcentaje}%</p>
              </div>
            </div>
          </div>

          {/* Dimension 8: Turnos PDA */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Calendar className="w-4 h-4 text-indigo-600" />
                <span>8. Programa de Distribución de Agua (PDA) — Turnos Asignados</span>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">Turnos activos: {turnos.length}</span>
            </div>
            <div className="space-y-2">
              {turnos.map(t => (
                <div key={t.id} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900">
                      Turno #{t.numeroTurno} ({t.fechaInicio} a las {t.horaInicio} hrs)
                    </span>
                    <p className="text-[11px] text-slate-500">
                      Caudal: <strong className="font-mono text-slate-800">{t.caudalLps} L/s</strong> • Duración: {t.duracionHoras} hrs • Volumen derivado: <strong className="font-mono text-sky-900">{t.volumenM3} m³</strong>
                    </p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                    {t.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dimension 9: Economía & Cobranza */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CircleDollarSign className="w-4 h-4 text-emerald-600" />
                <span>9. Estado Económico & Recaudación</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                totalDeuda === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {totalDeuda === 0 ? 'AL DÍA' : `DEUDA PENDIENTE: S/. ${totalDeuda.toFixed(2)}`}
              </span>
            </div>
            <div className="space-y-1.5">
              {obligacionesCobranza.map(o => (
                <div key={o.id} className="p-2 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-[11px]">
                  <div>
                    <span className="font-mono font-bold text-slate-900">{o.codigoRecibo}</span> — {o.conceptoTarifario} ({o.periodoMesAño})
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-900">S/. {o.montoTotalSoles.toFixed(2)}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700">
                      {o.estado}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
          >
            Cerrar Ficha
          </button>
        </div>
      </div>
    </div>
  );
};
