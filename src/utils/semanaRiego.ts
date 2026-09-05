/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SIODRA — Utilidad de Control de Riego Semanal (Regla OUA: 1 Turno por Semana por Usuario)
 */

import { DistribucionTurnoPDA, UsuarioAgrario } from '../types';

export interface SemanaInfo {
  semanaNumero: number;
  año: number;
  inicioSemana: string; // YYYY-MM-DD (Lunes)
  finSemana: string; // YYYY-MM-DD (Domingo)
  etiqueta: string; // e.g., "Semana 36 (31 Ago - 06 Set 2026)"
}

export interface ValidacionTurnoSemanalResult {
  puedePedir: boolean;
  turnoExistente?: DistribucionTurnoPDA;
  mensaje: string;
  semanaInfo: SemanaInfo;
}

/**
 * Obtiene el lunes y domingo de la semana a la que pertenece la fecha dada
 */
export function getSemanaInfo(fechaStr: string): SemanaInfo {
  // Parsing date safely (avoid timezone shift by extracting year, month, day)
  const [year, month, day] = fechaStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  // Day of week: 0 is Sunday, 1 is Monday, ..., 6 is Saturday
  const dayOfWeek = date.getDay();
  // Adjust to Monday-based week (Monday = 0, Sunday = 6)
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

  const monday = new Date(date);
  monday.setDate(date.getDate() + mondayOffset);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // ISO Week Number calculation
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  const semanaNumero = 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);

  const formatFecha = (d: Date) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'];
  const etiqueta = `Semana ${semanaNumero} (${monday.getDate()} ${meses[monday.getMonth()]} - ${sunday.getDate()} ${meses[sunday.getMonth()]} ${sunday.getFullYear()})`;

  return {
    semanaNumero,
    año: year,
    inicioSemana: formatFecha(monday),
    finSemana: formatFecha(sunday),
    etiqueta
  };
}

/**
 * Verifica si dos fechas pertenecen a la misma semana lunes-domingo
 */
export function estanEnMismaSemana(fecha1: string, fecha2: string): boolean {
  const sem1 = getSemanaInfo(fecha1);
  const sem2 = getSemanaInfo(fecha2);
  return sem1.inicioSemana === sem2.inicioSemana;
}

/**
 * Valida la regla OUA: Cada usuario agrario debe tener un máximo de 1 turno por semana
 */
export function validarTurnoSemanal(
  usuarioId: string,
  fechaDeseada: string,
  turnos: DistribucionTurnoPDA[],
  turnoIdExcluir?: string
): ValidacionTurnoSemanalResult {
  const semanaInfo = getSemanaInfo(fechaDeseada);

  // Buscar si el usuario ya tiene un turno en esta misma semana
  const turnoExistente = turnos.find(t => {
    if (turnoIdExcluir && t.id === turnoIdExcluir) return false;
    if (t.usuarioId !== usuarioId) return false;
    // Ignorar turnos anulados o suspendidos si aplica
    if (t.estado === 'Suspendido') return false;
    return estanEnMismaSemana(t.fechaInicio, fechaDeseada);
  });

  if (turnoExistente) {
    return {
      puedePedir: false,
      turnoExistente,
      mensaje: `El usuario ya cuenta con el Turno #${turnoExistente.numeroTurno} (${turnoExistente.codigoTurno}) asignado para el ${turnoExistente.fechaInicio} a las ${turnoExistente.horaInicio} hrs en la ${semanaInfo.etiqueta}. Según la regla operativa de la OUA, la frecuencia máxima permitida es de 1 turno por semana por usuario.`,
      semanaInfo
    };
  }

  return {
    puedePedir: true,
    mensaje: `Frecuencia semanal aprobada: El usuario tiene disponible su turno correspondiente a la ${semanaInfo.etiqueta} (0/1 turnos asignados).`,
    semanaInfo
  };
}

/**
 * Retorna los días de la semana y sus turnos ordenados cronológicamente
 */
export const DIAS_SEMANA = [
  { clave: 'Lunes', offset: 0, corto: 'Lun' },
  { clave: 'Martes', offset: 1, corto: 'Mar' },
  { clave: 'Miércoles', offset: 2, corto: 'Mié' },
  { clave: 'Jueves', offset: 3, corto: 'Jue' },
  { clave: 'Viernes', offset: 4, corto: 'Vie' },
  { clave: 'Sábado', offset: 5, corto: 'Sáb' },
  { clave: 'Domingo', offset: 6, corto: 'Dom' }
];

export function getDiaSemanaNombre(fechaStr: string): string {
  const [year, month, day] = fechaStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return dias[date.getDay()];
}
