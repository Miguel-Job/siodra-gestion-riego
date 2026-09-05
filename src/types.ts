/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SIODRA — Sistema Integrado de Operación y Distribución de Recursos Hídricos Agrarios
 * Modelo de Datos Relacional y Espacial Integral
 */

export type TipoDUA = 'Licencia de Uso de Agua' | 'Permiso de Uso de Agua' | 'Autorización de Uso de Agua';
export type TipoFuenteAgua = 'Superficial (Río Chancay)' | 'Subterránea (Pozo Agrario)' | 'Drenaje/Retorno';
export type EstadoTurnoPDA = 'Programado' | 'En Ejecución' | 'Ejecutado' | 'Reprogramado' | 'Suspendido';
export type EstadoCobranza = 'Pagado' | 'Pendiente' | 'Vencido' | 'Parcial' | 'Anulado';
export type TipoConceptoTarifario = 'Tarifa O&M (RJ 0155-2022-ANA)' | 'Retribución Económica ANA (Ley 29338)' | 'Cuota Extraordinaria OUA';
export type EstadoInfraestructura = 'Bueno' | 'Regular' | 'Crítico' | 'En Mantenimiento';

export interface AuthUser {
  id: string;
  username: string;
  nombreCompleto: string;
  cargo: string;
  rol: 'Sectorista' | 'Administrador' | 'Tesorero' | 'Operador';
  comision: string;
  avatarInitials: string;
  email: string;
  ultimoAcceso?: string;
}

export interface Organizacion {
  id: string;
  nombre: string;
  codigoRUC: string;
  departamento: string;
  provincia: string;
  valle: string;
  autoridadAdministrativa: string; // AAA Cañete-Fortaleza
  administracionLocal: string; // ALA Chancay-Huaral
}

export interface Ambito {
  id: string;
  organizacionId: string;
  comisionNombre: string;
  sectorHidraulico: string;
  subsector: string;
  codigoSector: string;
  superficieTotalHa: number;
  superficieBajoRiegoHa: number;
  totalUsuarios: number;
  totalTomas: number;
}

export interface UsuarioAgrario {
  id: string;
  codigoUsuario: string; // e.g., "OUA-HUARAL-001"
  nombres: string;
  apellidos: string;
  tipoDocumento: 'DNI' | 'RUC';
  numeroDocumento: string;
  telefono: string;
  comisionId: string;
  condicion: 'Activo' | 'Suspendido' | 'En Trámite';
  fechaRegistro: string;
  avatarInitials: string;
  prediosIds: string[];
}

export interface PredioCatastral {
  id: string;
  codigoPredio: string;
  nombrePredio: string;
  unidadCatastral: string; // UC-DEMO-001
  usuarioId: string;
  sectorId: string;
  areaTotalHa: number;
  areaBajoRiegoHa: number;
  cultivoId: string;
  duaId: string;
  tomaId: string;
  conduccionId: string;
  coordenadasUTM: {
    este: number;
    norte: number;
    zona: string; // "18S"
  };
  geoJsonGeometry?: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  estadoCobranza: 'Al Día' | 'Deuda Pendiente' | 'Moroso';
}

export interface DerechoUsoAgua {
  id: string;
  codigoDUA: string; // "DUA-2026-042"
  resolucionDirectoral: string; // "R.D. N.° 0892-2024-ANA"
  tipoDUA: TipoDUA;
  fuenteAgua: TipoFuenteAgua;
  bloqueRiego: string;
  volumenAnualAsignadoM3: number;
  volumenConsumidoCampañaM3: number;
  fechaEmision: string;
  fechaVencimiento: string; // "12/2026"
  predioId: string;
  usuarioId: string;
  estado: 'Vigente' | 'En Prórroga' | 'Extinguido';
}

export interface CultivoUsoTierra {
  id: string;
  nombre: string;
  variedad: string;
  tipoCiclo: 'Permanente' | 'Transitorio';
  mesesCampaña: string[];
  moduloRiegoLpsHa: number; // L/s/ha
  demandaHidricaM3Ha: number; // m3/ha
  colorHex: string;
}

export interface ConduccionCanal {
  id: string;
  codigo: string; // "CD-001"
  nombre: string; // "Canal Principal Chancay"
  jerarquia: 'Canal Principal' | 'Lateral de 1er Orden' | 'Sublateral';
  tipoSeccion: 'Trapecial Revestido Concreto' | 'Tubería HDPE' | 'En Tierra';
  capacidadDisenoM3s: number;
  longitudKm: number;
  sectorId: string;
  tomasAsociadasIds: string[];
  estado: EstadoInfraestructura;
  coordenadasRuta?: number[][]; // LineString coords
}

export interface TomaEntrega {
  id: string;
  codigoToma: string; // "T-003"
  nombre: string; // "Toma Lateral TL-003"
  conduccionId: string;
  progresivaKm: string; // "Km 14+250"
  margen: 'Derecha' | 'Izquierda';
  tipoCompuerta: 'Compuerta Plana con Volante' | 'Compuerta Radial' | 'Válvula de Salida';
  capacidadMaximaLps: number;
  prediosAtendidosIds: string[];
  usuariosAtendidosCount: number;
  aperturaActualPorcentaje: number; // 65%
  coordenadasUTM: {
    este: number;
    norte: number;
    zona: string;
  };
  latLng: [number, number];
}

export interface InfraestructuraHidraulica {
  id: string;
  codigo: string; // "CP-03"
  tipo: 'Bocatoma' | 'Compuerta de Control' | 'Desarenador' | 'Aforador Parshall' | 'Partidor';
  nombre: string;
  conduccionId: string;
  estado: EstadoInfraestructura;
  capacidadM3s: number;
  progresiva: string;
  ultimaInspeccion: string;
  incidenciasActivas: number;
  coordenadasUTM: { este: number; norte: number; zona: string };
  latLng: [number, number];
  fotografiaUrl?: string;
}

export interface DistribucionTurnoPDA {
  id: string;
  numeroTurno: number; // 14
  codigoTurno: string; // "TRN-2026-089"
  campaña?: string;
  duaId?: string;
  usuarioId: string;
  predioId: string;
  tomaId: string;
  conduccionId: string;
  sectorId?: string;
  fechaInicio: string;
  horaInicio: string;
  duracionHoras: number;
  caudalLps: number; // 120.0 L/s
  volumenM3: number; // caudalLps * duracionHoras * 3.6
  responsableDistribuidor: string;
  estado: EstadoTurnoPDA;
  observaciones?: string;
}

export interface ObligacionCobranza {
  id: string;
  codigoRecibo: string; // "REC-2026-1049"
  usuarioId: string;
  predioId: string;
  periodoMesAño: string; // "Julio 2026"
  campaña: string; // "2026-I"
  conceptoTarifario: TipoConceptoTarifario;
  baseCalculo: string; // "10.8 ha bajo riego x S/. 24.07/ha"
  montoTotalSoles: number;
  montoPagadoSoles: number;
  saldoPendienteSoles: number;
  fechaEmision: string;
  fechaVencimiento: string;
  estado: EstadoCobranza;
  referenciaNormativa: string; // "RJ 0155-2022-ANA / DS 020-2025-MIDAGRI"
}

export interface ParametroTarifarioConfig {
  id: string;
  año: number;
  campaña: string;
  ambitoId: string;
  concepto: TipoConceptoTarifario;
  unidadMedida: 'S/. por hectárea bajo riego' | 'S/. por millar m³ derivado';
  valorUnitarioSoles: number;
  baseLegal: string;
  vigenteHasta: string;
}

export interface FichaIntegral360Data {
  usuario: UsuarioAgrario;
  predio: PredioCatastral;
  dua: DerechoUsoAgua;
  cultivo: CultivoUsoTierra;
  toma: TomaEntrega;
  conduccion: ConduccionCanal;
  infraestructura: InfraestructuraHidraulica;
  turnoActual?: DistribucionTurnoPDA;
  turnosHistorial?: DistribucionTurnoPDA[];
  turnos?: DistribucionTurnoPDA[];
  cobranza?: ObligacionCobranza[];
  obligacionesCobranza?: ObligacionCobranza[];
}
