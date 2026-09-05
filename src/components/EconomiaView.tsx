/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CircleDollarSign,
  Receipt,
  Calculator,
  AlertCircle,
  CheckCircle2,
  Clock,
  Plus,
  ArrowRight,
  TrendingDown,
  Layers,
  Scale
} from 'lucide-react';
import {
  Ambito,
  ObligacionCobranza,
  ParametroTarifarioConfig,
  FichaIntegral360Data
} from '../types';
import {
  PARAMETROS_TARIFARIOS_DEMO,
  OBLIGACIONES_COBRANZA_DEMO,
  USUARIOS_DEMO,
  PREDIOS_DEMO,
  getFichaIntegralPorUsuario
} from '../data/mockData';

interface EconomiaViewProps {
  selectedAmbito: Ambito;
  onSelectFicha: (ficha: FichaIntegral360Data) => void;
  onOpenFichaModal: () => void;
}

export const EconomiaView: React.FC<EconomiaViewProps> = ({
  selectedAmbito,
  onSelectFicha,
  onOpenFichaModal
}) => {
  const [obligaciones, setObligaciones] = useState<ObligacionCobranza[]>(OBLIGACIONES_COBRANZA_DEMO);
  const [parametros] = useState<ParametroTarifarioConfig[]>(PARAMETROS_TARIFARIOS_DEMO);
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  // Simulator state
  const [simUsuarioId, setSimUsuarioId] = useState(USUARIOS_DEMO[0].id);
  const [simConcepto, setSimConcepto] = useState('Tarifa O&M (RJ 0155-2022-ANA)');
  const [simAreaHa, setSimAreaHa] = useState<number>(10.8);
  const [simResultado, setSimResultado] = useState<number | null>(null);

  const totalFacturado = obligaciones.reduce((acc, o) => acc + o.montoTotalSoles, 0);
  const totalRecaudado = obligaciones.reduce((acc, o) => acc + o.montoPagadoSoles, 0);
  const totalMorosidad = obligaciones.reduce((acc, o) => acc + o.saldoPendienteSoles, 0);

  const handleCalcularSimulacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (simConcepto.includes('Tarifa O&M')) {
      const tarifaPorHa = 24.07; // From configured parameter
      setSimResultado(Number((simAreaHa * tarifaPorHa).toFixed(2)));
    } else {
      // Retribución ANA estimada
      const volEst = simAreaHa * 11500; // m3
      const retribPorM3 = 0.0118;
      setSimResultado(Number((volEst * retribPorM3).toFixed(2)));
    }
  };

  const handlePagarRecibo = (reciboId: string) => {
    setObligaciones(prev =>
      prev.map(o => {
        if (o.id === reciboId) {
          return {
            ...o,
            montoPagadoSoles: o.montoTotalSoles,
            saldoPendienteSoles: 0,
            estado: 'Pagado'
          };
        }
        return o;
      })
    );
  };

  const obligacionesFiltradas = obligaciones.filter(o => {
    if (filtroEstado === 'todos') return true;
    return o.estado.toLowerCase() === filtroEstado.toLowerCase();
  });

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xs">
              3
            </span>
            <h1 className="text-xl font-bold text-slate-900">
              Área Funcional 3: Economía & Tarifas
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Diferenciación estricta entre Tarifa O&M (Operador) y Retribución Económica (ANA) • DS 020-2025-MIDAGRI (2026)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200/60">
            Recaudación: {Math.round((totalRecaudado / totalFacturado) * 100)}%
          </span>
        </div>
      </div>

      {/* 3 Metric Cards for Economy */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">TOTAL FACTURADO (CAMPAÑA 2026-I)</p>
          <p className="text-2xl font-black text-slate-900">
            S/. {totalFacturado.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500">Tarifas O&M + Retribución Económica ANA</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
          <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">TOTAL RECAUDADO (EN CAJA)</p>
          <p className="text-2xl font-black text-emerald-700">
            S/. {totalRecaudado.toFixed(2)}
          </p>
          <p className="text-xs text-emerald-600 font-medium">Ingresos conformes liquidados</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-1">
          <p className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">SALDO PENDIENTE / MOROSIDAD</p>
          <p className="text-2xl font-black text-rose-600">
            S/. {totalMorosidad.toFixed(2)}
          </p>
          <p className="text-xs text-rose-500 font-medium">Gestión de cobranza activa</p>
        </div>
      </div>

      {/* Distinction Explanation Box (Regulatory rigor mandated by prompt) */}
      <div className="p-4 rounded-3xl bg-sky-50/60 border border-sky-200 text-xs space-y-2 text-sky-950">
        <div className="flex items-center gap-2 font-bold text-sky-900">
          <Scale className="w-4 h-4 text-sky-700 shrink-0" />
          <span>Diferenciación Normativa de Conceptos Económicos (Ley N.° 29338 & RJ N.° 0155-2022-ANA)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-[11px]">
          <div className="p-3 bg-white rounded-2xl border border-sky-100 space-y-1">
            <span className="font-bold text-sky-900 block">1. Retribución Económica por Uso de Agua</span>
            <p className="text-slate-600">
              Pago obligatorio que efectúan los usuarios a favor de la Autoridad Nacional del Agua (ANA) por el uso del recurso natural (bien de dominio público). <em>No es ingreso propio de la OUA.</em>
            </p>
          </div>
          <div className="p-3 bg-white rounded-2xl border border-sky-100 space-y-1">
            <span className="font-bold text-sky-900 block">2. Tarifa por Utilización de Infraestructura Hidráulica (O&M)</span>
            <p className="text-slate-600">
              Contraprestación por la operación, mantenimiento y administración de las redes hidráulicas mayores y menores a cargo de la Junta y Comisiones de Usuarios.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Cobranza Table + Calculation Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Cobranza Table (~65%) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Padrón de Cobranza & Liquidaciones
              </h2>
              <p className="text-xs text-slate-500">
                Control de recibos emitidos, pagos y saldos por predio
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filtroEstado}
                onChange={e => setFiltroEstado(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-slate-700 font-medium cursor-pointer"
              >
                <option value="todos">Estado: Todos</option>
                <option value="pagado">Pagado</option>
                <option value="pendiente">Pendiente</option>
                <option value="vencido">Vencido</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  <th className="pb-2">RECIBO & PERIODO</th>
                  <th className="pb-2">USUARIO & PREDIO</th>
                  <th className="pb-2">CONCEPTO TARIFARIO</th>
                  <th className="pb-2">MONTO</th>
                  <th className="pb-2">SALDO</th>
                  <th className="pb-2">ESTADO</th>
                  <th className="pb-2 text-right">ACCIÓN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {obligacionesFiltradas.map(o => {
                  const usuario = USUARIOS_DEMO.find(u => u.id === o.usuarioId) || USUARIOS_DEMO[0];
                  const predio = PREDIOS_DEMO.find(p => p.id === o.predioId) || PREDIOS_DEMO[0];

                  return (
                    <tr key={o.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3">
                        <span className="font-mono font-bold text-slate-900">{o.codigoRecibo}</span>
                        <p className="text-[11px] text-slate-500">{o.periodoMesAño}</p>
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
                          className="font-bold text-slate-900 hover:text-sky-700 text-left"
                        >
                          {usuario.nombres} {usuario.apellidos}
                          <p className="text-[11px] text-slate-500 font-mono font-normal">
                            {predio.unidadCatastral}
                          </p>
                        </button>
                      </td>

                      <td className="py-3 text-slate-700 font-medium">
                        {o.conceptoTarifario}
                        <p className="text-[10px] text-slate-400 font-mono">{o.baseCalculo}</p>
                      </td>

                      <td className="py-3 font-bold text-slate-900">
                        S/. {o.montoTotalSoles.toFixed(2)}
                      </td>

                      <td className="py-3 font-mono font-bold">
                        {o.saldoPendienteSoles > 0 ? (
                          <span className="text-rose-600">S/. {o.saldoPendienteSoles.toFixed(2)}</span>
                        ) : (
                          <span className="text-emerald-600">S/. 0.00</span>
                        )}
                      </td>

                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          o.estado === 'Pagado'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}>
                          {o.estado}
                        </span>
                      </td>

                      <td className="py-3 text-right">
                        {o.saldoPendienteSoles > 0 ? (
                          <button
                            onClick={() => handlePagarRecibo(o.id)}
                            className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[11px] transition-colors"
                          >
                            Cobrar
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-medium">Liquidado</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Simulador de Cálculo Tarifario (~35%) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Calculator className="w-4 h-4 text-sky-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Motor de Liquidación & Cálculo
            </h3>
          </div>

          <p className="text-xs text-slate-500">
            Calcula la obligación según: Usuario + Predio + Área bajo riego + Tarifa aprobada.
          </p>

          <form onSubmit={handleCalcularSimulacion} className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Usuario / Predio</label>
              <select
                value={simUsuarioId}
                onChange={e => {
                  setSimUsuarioId(e.target.value);
                  const predio = PREDIOS_DEMO.find(p => p.usuarioId === e.target.value);
                  if (predio) setSimAreaHa(predio.areaBajoRiegoHa);
                }}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 font-medium focus:outline-none"
              >
                {USUARIOS_DEMO.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.nombres} {u.apellidos} ({u.codigoUsuario})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Concepto Tarifario Configurado</label>
              <select
                value={simConcepto}
                onChange={e => setSimConcepto(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 font-medium focus:outline-none"
              >
                <option value="Tarifa O&M (RJ 0155-2022-ANA)">
                  Tarifa O&M: S/. 24.07 por ha bajo riego
                </option>
                <option value="Retribución Económica ANA (Ley 29338)">
                  Retribución ANA: S/. 0.0118 por m³ asignado
                </option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Área Bajo Riego (ha)
              </label>
              <input
                type="number"
                step="0.1"
                value={simAreaHa}
                onChange={e => setSimAreaHa(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 font-mono font-semibold"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl transition-colors shadow-2xs"
            >
              Liquidar & Calcular Obligación
            </button>
          </form>

          {simResultado !== null && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs space-y-1 animate-in fade-in">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                Resultado de Liquidación Automática
              </span>
              <p className="text-xl font-black text-emerald-950 font-mono">
                S/. {simResultado.toFixed(2)}
              </p>
              <p className="text-[11px] text-emerald-700">
                Base: {simAreaHa} ha bajo riego conforme a parámetros de Campaña 2026.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
