/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * SIODRA — Datos Demo de Demostración
 * Junta de Usuarios del Sector Hidráulico Menor Chancay-Huaral Clase A
 * Padrón Oficial de 20 Usuarios OUA con Programación Semanal de Riego (1 Turno/Semana)
 */

import {
  Organizacion,
  Ambito,
  UsuarioAgrario,
  PredioCatastral,
  DerechoUsoAgua,
  CultivoUsoTierra,
  ConduccionCanal,
  TomaEntrega,
  InfraestructuraHidraulica,
  DistribucionTurnoPDA,
  ObligacionCobranza,
  ParametroTarifarioConfig,
  FichaIntegral360Data
} from '../types';

export const ORGANIZACION_DEMO: Organizacion = {
  id: 'org-chancay-01',
  nombre: 'Junta de Usuarios del Sector Hidráulico Chancay - Huaral (OUA DEMO)',
  codigoRUC: '20148963211',
  departamento: 'Lima',
  provincia: 'Huaral',
  valle: 'Valle Chancay - Huaral',
  autoridadAdministrativa: 'AAA Cañete - Fortaleza',
  administracionLocal: 'ALA Chancay - Huaral'
};

export const AMBITOS_DEMO: Ambito[] = [
  {
    id: 'amb-palpa-01',
    organizacionId: 'org-chancay-01',
    comisionNombre: 'Comisión de Usuarios Palpa - Huando',
    sectorHidraulico: 'Sector Mayor Chancay',
    subsector: 'Subsector Palpa Central',
    codigoSector: 'SH-CH-01',
    superficieTotalHa: 3420.5,
    superficieBajoRiegoHa: 2980.2,
    totalUsuarios: 148,
    totalTomas: 32
  },
  {
    id: 'amb-huando-02',
    organizacionId: 'org-chancay-01',
    comisionNombre: 'Comisión de Usuarios Huando Bajo',
    sectorHidraulico: 'Sector Mayor Chancay',
    subsector: 'Subsector Huando Alto',
    codigoSector: 'SH-CH-02',
    superficieTotalHa: 2150.0,
    superficieBajoRiegoHa: 1890.4,
    totalUsuarios: 96,
    totalTomas: 18
  },
  {
    id: 'amb-boqueron-03',
    organizacionId: 'org-chancay-01',
    comisionNombre: 'Comisión Boquerón - Esperanza',
    sectorHidraulico: 'Sector Cabecera Huaral',
    subsector: 'Subsector Esperanza',
    codigoSector: 'SH-CH-03',
    superficieTotalHa: 1780.0,
    superficieBajoRiegoHa: 1540.8,
    totalUsuarios: 72,
    totalTomas: 14
  }
];

export const CULTIVOS_DEMO: CultivoUsoTierra[] = [
  {
    id: 'cul-palto',
    nombre: 'Palto',
    variedad: 'Hass',
    tipoCiclo: 'Permanente',
    mesesCampaña: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
    moduloRiegoLpsHa: 0.75,
    demandaHidricaM3Ha: 11500,
    colorHex: '#10b981'
  },
  {
    id: 'cul-mandarina',
    nombre: 'Mandarina',
    variedad: 'W. Murcott / Satsuma',
    tipoCiclo: 'Permanente',
    mesesCampaña: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
    moduloRiegoLpsHa: 0.65,
    demandaHidricaM3Ha: 9800,
    colorHex: '#f59e0b'
  },
  {
    id: 'cul-uva',
    nombre: 'Uva de Mesa',
    variedad: 'Red Globe',
    tipoCiclo: 'Permanente',
    mesesCampaña: ['Ago', 'Set', 'Oct', 'Nov', 'Dic', 'Ene', 'Feb'],
    moduloRiegoLpsHa: 0.70,
    demandaHidricaM3Ha: 10400,
    colorHex: '#8b5cf6'
  },
  {
    id: 'cul-maiz',
    nombre: 'Maíz Amarillo Duro',
    variedad: 'Híbrido Dekalb',
    tipoCiclo: 'Transitorio',
    mesesCampaña: ['Mar', 'Abr', 'May', 'Jun', 'Jul'],
    moduloRiegoLpsHa: 0.85,
    demandaHidricaM3Ha: 7200,
    colorHex: '#eab308'
  },
  {
    id: 'cul-esparrago',
    nombre: 'Espárrago',
    variedad: 'UC-157',
    tipoCiclo: 'Permanente',
    mesesCampaña: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
    moduloRiegoLpsHa: 0.80,
    demandaHidricaM3Ha: 12800,
    colorHex: '#059669'
  },
  {
    id: 'cul-fresa',
    nombre: 'Fresa',
    variedad: 'San Andreas',
    tipoCiclo: 'Transitorio',
    mesesCampaña: ['May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov'],
    moduloRiegoLpsHa: 0.90,
    demandaHidricaM3Ha: 8500,
    colorHex: '#ef4444'
  },
  {
    id: 'cul-manzano',
    nombre: 'Manzano',
    variedad: 'Delicia / Ana',
    tipoCiclo: 'Permanente',
    mesesCampaña: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
    moduloRiegoLpsHa: 0.70,
    demandaHidricaM3Ha: 9500,
    colorHex: '#ec4899'
  },
  {
    id: 'cul-pecano',
    nombre: 'Pecano',
    variedad: 'Mahan / Stuart',
    tipoCiclo: 'Permanente',
    mesesCampaña: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
    moduloRiegoLpsHa: 0.72,
    demandaHidricaM3Ha: 10800,
    colorHex: '#854d0e'
  }
];

export const CONDUCCIONES_DEMO: ConduccionCanal[] = [
  {
    id: 'cd-001',
    codigo: 'CD-001',
    nombre: 'Canal Principal Chancay',
    jerarquia: 'Canal Principal',
    tipoSeccion: 'Trapecial Revestido Concreto',
    capacidadDisenoM3s: 18.5,
    longitudKm: 28.4,
    sectorId: 'amb-palpa-01',
    tomasAsociadasIds: ['t-001', 't-002', 't-003', 't-004', 't-005'],
    estado: 'Bueno',
    coordenadasRuta: [
      [-11.5302, -77.2605],
      [-11.5245, -77.2480],
      [-11.5180, -77.2340],
      [-11.5090, -77.2210],
      [-11.4985, -77.2050]
    ]
  },
  {
    id: 'cd-002',
    codigo: 'CD-002',
    nombre: 'Lateral Palpa-02',
    jerarquia: 'Lateral de 1er Orden',
    tipoSeccion: 'Trapecial Revestido Concreto',
    capacidadDisenoM3s: 3.2,
    longitudKm: 8.7,
    sectorId: 'amb-palpa-01',
    tomasAsociadasIds: ['t-004', 't-005', 't-006'],
    estado: 'Bueno',
    coordenadasRuta: [
      [-11.5180, -77.2340],
      [-11.5120, -77.2420],
      [-11.5050, -77.2510]
    ]
  },
  {
    id: 'cd-003',
    codigo: 'CD-003',
    nombre: 'Sublateral Huando-A',
    jerarquia: 'Sublateral',
    tipoSeccion: 'Tubería HDPE',
    capacidadDisenoM3s: 1.2,
    longitudKm: 4.1,
    sectorId: 'amb-huando-02',
    tomasAsociadasIds: ['t-007', 't-008'],
    estado: 'Regular',
    coordenadasRuta: [
      [-11.5090, -77.2210],
      [-11.5160, -77.2140],
      [-11.5220, -77.2090]
    ]
  }
];

export const TOMAS_DEMO: TomaEntrega[] = [
  {
    id: 't-001',
    codigoToma: 'T-001',
    nombre: 'Toma Cabecera Boquerón',
    conduccionId: 'cd-001',
    progresivaKm: 'Km 02+100',
    margen: 'Izquierda',
    tipoCompuerta: 'Compuerta Radial',
    capacidadMaximaLps: 350.0,
    prediosAtendidosIds: ['pred-004', 'pred-009', 'pred-017'],
    usuariosAtendidosCount: 3,
    aperturaActualPorcentaje: 80,
    coordenadasUTM: { este: 255100, norte: 8725800, zona: '18S' },
    latLng: [-11.5245, -77.2480]
  },
  {
    id: 't-002',
    codigoToma: 'T-002',
    nombre: 'Toma Lateral Esperanza-02',
    conduccionId: 'cd-001',
    progresivaKm: 'Km 06+450',
    margen: 'Derecha',
    tipoCompuerta: 'Compuerta Plana con Volante',
    capacidadMaximaLps: 240.0,
    prediosAtendidosIds: ['pred-010', 'pred-014'],
    usuariosAtendidosCount: 2,
    aperturaActualPorcentaje: 45,
    coordenadasUTM: { este: 256200, norte: 8725200, zona: '18S' },
    latLng: [-11.5210, -77.2410]
  },
  {
    id: 't-003',
    codigoToma: 'T-003',
    nombre: 'Toma Lateral TL-003 Palpa',
    conduccionId: 'cd-001',
    progresivaKm: 'Km 14+250',
    margen: 'Derecha',
    tipoCompuerta: 'Compuerta Plana con Volante',
    capacidadMaximaLps: 180.0,
    prediosAtendidosIds: ['pred-001', 'pred-005', 'pred-011'],
    usuariosAtendidosCount: 3,
    aperturaActualPorcentaje: 65,
    coordenadasUTM: { este: 258410, norte: 8724190, zona: '18S' },
    latLng: [-11.5180, -77.2340]
  },
  {
    id: 't-004',
    codigoToma: 'T-004',
    nombre: 'Toma Lateral Palpa-04',
    conduccionId: 'cd-002',
    progresivaKm: 'Km 03+120',
    margen: 'Izquierda',
    tipoCompuerta: 'Compuerta Plana con Volante',
    capacidadMaximaLps: 140.0,
    prediosAtendidosIds: ['pred-002', 'pred-006', 'pred-019'],
    usuariosAtendidosCount: 3,
    aperturaActualPorcentaje: 0,
    coordenadasUTM: { este: 257320, norte: 8724980, zona: '18S' },
    latLng: [-11.5120, -77.2420]
  },
  {
    id: 't-005',
    codigoToma: 'T-005',
    nombre: 'Toma Compuerta Palpa Alta-05',
    conduccionId: 'cd-002',
    progresivaKm: 'Km 05+800',
    margen: 'Derecha',
    tipoCompuerta: 'Compuerta Radial',
    capacidadMaximaLps: 200.0,
    prediosAtendidosIds: ['pred-013'],
    usuariosAtendidosCount: 1,
    aperturaActualPorcentaje: 50,
    coordenadasUTM: { este: 258100, norte: 8724600, zona: '18S' },
    latLng: [-11.5140, -77.2370]
  },
  {
    id: 't-006',
    codigoToma: 'T-006',
    nombre: 'Toma Lateral Palpa-06',
    conduccionId: 'cd-002',
    progresivaKm: 'Km 07+900',
    margen: 'Izquierda',
    tipoCompuerta: 'Compuerta Plana con Volante',
    capacidadMaximaLps: 160.0,
    prediosAtendidosIds: ['pred-016', 'pred-018'],
    usuariosAtendidosCount: 2,
    aperturaActualPorcentaje: 30,
    coordenadasUTM: { este: 259000, norte: 8724000, zona: '18S' },
    latLng: [-11.5100, -77.2300]
  },
  {
    id: 't-007',
    codigoToma: 'T-007',
    nombre: 'Toma Sublateral Huando-07',
    conduccionId: 'cd-003',
    progresivaKm: 'Km 01+800',
    margen: 'Derecha',
    tipoCompuerta: 'Válvula de Salida',
    capacidadMaximaLps: 220.0,
    prediosAtendidosIds: ['pred-003', 'pred-007', 'pred-015'],
    usuariosAtendidosCount: 3,
    aperturaActualPorcentaje: 0,
    coordenadasUTM: { este: 259640, norte: 8723500, zona: '18S' },
    latLng: [-11.5160, -77.2140]
  },
  {
    id: 't-008',
    codigoToma: 'T-008',
    nombre: 'Toma Sublateral Huando-08',
    conduccionId: 'cd-003',
    progresivaKm: 'Km 03+400',
    margen: 'Izquierda',
    tipoCompuerta: 'Válvula de Salida',
    capacidadMaximaLps: 180.0,
    prediosAtendidosIds: ['pred-008', 'pred-012', 'pred-020'],
    usuariosAtendidosCount: 3,
    aperturaActualPorcentaje: 0,
    coordenadasUTM: { este: 260200, norte: 8723000, zona: '18S' },
    latLng: [-11.5200, -77.2100]
  }
];

export const INFRAESTRUCTURA_DEMO: InfraestructuraHidraulica[] = [
  {
    id: 'infra-cp03',
    codigo: 'CP-03',
    tipo: 'Compuerta de Control',
    nombre: 'Compuerta de Control Automatizada CP-03',
    conduccionId: 'cd-001',
    estado: 'Bueno',
    capacidadM3s: 18.5,
    progresiva: 'Km 14+250',
    ultimaInspeccion: '2026-08-15',
    incidenciasActivas: 0,
    coordenadasUTM: { este: 258410, norte: 8724190, zona: '18S' },
    latLng: [-11.5180, -77.2340],
    fotografiaUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'infra-boc01',
    codigo: 'BOC-01',
    tipo: 'Bocatoma',
    nombre: 'Bocatoma La Esperanza (Río Chancay)',
    conduccionId: 'cd-001',
    estado: 'Bueno',
    capacidadM3s: 25.0,
    progresiva: 'Km 00+000',
    ultimaInspeccion: '2026-08-20',
    incidenciasActivas: 0,
    coordenadasUTM: { este: 253400, norte: 8727100, zona: '18S' },
    latLng: [-11.5302, -77.2605]
  },
  {
    id: 'infra-afor02',
    codigo: 'AF-02',
    tipo: 'Aforador Parshall',
    nombre: 'Aforador Parshall 8 pies Palpa',
    conduccionId: 'cd-002',
    estado: 'Regular',
    capacidadM3s: 3.5,
    progresiva: 'Km 01+050',
    ultimaInspeccion: '2026-07-30',
    incidenciasActivas: 1,
    coordenadasUTM: { este: 257500, norte: 8724800, zona: '18S' },
    latLng: [-11.5140, -77.2380]
  }
];

// ==========================================
// PADRÓN OFICIAL DE 20 USUARIOS OUA
// ==========================================
export const USUARIOS_DEMO: UsuarioAgrario[] = [
  {
    id: 'usr-001',
    codigoUsuario: 'OUA-DEMO-001',
    nombres: 'Victoriano',
    apellidos: 'Ramos Condori',
    tipoDocumento: 'DNI',
    numeroDocumento: '40982312',
    telefono: '987-654-321',
    comisionId: 'amb-palpa-01',
    condicion: 'Activo',
    fechaRegistro: '2021-03-15',
    avatarInitials: 'VR',
    prediosIds: ['pred-001']
  },
  {
    id: 'usr-002',
    codigoUsuario: 'OUA-DEMO-002',
    nombres: 'María Elena',
    apellidos: 'Quispe Huamán',
    tipoDocumento: 'DNI',
    numeroDocumento: '10845622',
    telefono: '954-123-887',
    comisionId: 'amb-palpa-01',
    condicion: 'Activo',
    fechaRegistro: '2019-06-20',
    avatarInitials: 'MQ',
    prediosIds: ['pred-002']
  },
  {
    id: 'usr-003',
    codigoUsuario: 'OUA-DEMO-003',
    nombres: 'Agropecuaria Valle Verde',
    apellidos: 'S.A.C.',
    tipoDocumento: 'RUC',
    numeroDocumento: '20458921102',
    telefono: '01-445-9800',
    comisionId: 'amb-huando-02',
    condicion: 'Activo',
    fechaRegistro: '2018-11-10',
    avatarInitials: 'AV',
    prediosIds: ['pred-003']
  },
  {
    id: 'usr-004',
    codigoUsuario: 'OUA-DEMO-004',
    nombres: 'Carlos Alberto',
    apellidos: 'Mendoza Silva',
    tipoDocumento: 'DNI',
    numeroDocumento: '41209871',
    telefono: '991-002-334',
    comisionId: 'amb-boqueron-03',
    condicion: 'Activo',
    fechaRegistro: '2022-01-08',
    avatarInitials: 'CM',
    prediosIds: ['pred-004']
  },
  {
    id: 'usr-005',
    codigoUsuario: 'OUA-DEMO-005',
    nombres: 'Teodoro',
    apellidos: 'Cárdenas Yupanqui',
    tipoDocumento: 'DNI',
    numeroDocumento: '09845123',
    telefono: '981-224-510',
    comisionId: 'amb-palpa-01',
    condicion: 'Activo',
    fechaRegistro: '2020-05-12',
    avatarInitials: 'TC',
    prediosIds: ['pred-005']
  },
  {
    id: 'usr-006',
    codigoUsuario: 'OUA-DEMO-006',
    nombres: 'Rosa Luz',
    apellidos: 'Espinoza Morales',
    tipoDocumento: 'DNI',
    numeroDocumento: '42561984',
    telefono: '976-541-209',
    comisionId: 'amb-palpa-01',
    condicion: 'Activo',
    fechaRegistro: '2022-08-19',
    avatarInitials: 'RE',
    prediosIds: ['pred-006']
  },
  {
    id: 'usr-007',
    codigoUsuario: 'OUA-DEMO-007',
    nombres: 'Dionisio',
    apellidos: 'Huamán Carhuas',
    tipoDocumento: 'DNI',
    numeroDocumento: '10239485',
    telefono: '963-852-741',
    comisionId: 'amb-huando-02',
    condicion: 'Activo',
    fechaRegistro: '2019-02-14',
    avatarInitials: 'DH',
    prediosIds: ['pred-007']
  },
  {
    id: 'usr-008',
    codigoUsuario: 'OUA-DEMO-008',
    nombres: 'Marcelina',
    apellidos: 'Flores Vilca',
    tipoDocumento: 'DNI',
    numeroDocumento: '08761234',
    telefono: '951-753-951',
    comisionId: 'amb-huando-02',
    condicion: 'Activo',
    fechaRegistro: '2021-09-03',
    avatarInitials: 'MF',
    prediosIds: ['pred-008']
  },
  {
    id: 'usr-009',
    codigoUsuario: 'OUA-DEMO-009',
    nombres: 'Aurelio',
    apellidos: 'Bazán Paucar',
    tipoDocumento: 'DNI',
    numeroDocumento: '43901287',
    telefono: '942-187-653',
    comisionId: 'amb-boqueron-03',
    condicion: 'Activo',
    fechaRegistro: '2020-11-25',
    avatarInitials: 'AB',
    prediosIds: ['pred-009']
  },
  {
    id: 'usr-010',
    codigoUsuario: 'OUA-DEMO-010',
    nombres: 'Juana',
    apellidos: 'Mendoza Barzola',
    tipoDocumento: 'DNI',
    numeroDocumento: '10459821',
    telefono: '935-890-123',
    comisionId: 'amb-boqueron-03',
    condicion: 'Activo',
    fechaRegistro: '2023-01-17',
    avatarInitials: 'JM',
    prediosIds: ['pred-010']
  },
  {
    id: 'usr-011',
    codigoUsuario: 'OUA-DEMO-011',
    nombres: 'Hernán',
    apellidos: 'Castro Alania',
    tipoDocumento: 'DNI',
    numeroDocumento: '44781290',
    telefono: '998-341-762',
    comisionId: 'amb-palpa-01',
    condicion: 'Activo',
    fechaRegistro: '2021-07-22',
    avatarInitials: 'HC',
    prediosIds: ['pred-011']
  },
  {
    id: 'usr-012',
    codigoUsuario: 'OUA-DEMO-012',
    nombres: 'Faustino',
    apellidos: 'Colán Meléndez',
    tipoDocumento: 'DNI',
    numeroDocumento: '09321456',
    telefono: '984-512-637',
    comisionId: 'amb-huando-02',
    condicion: 'Activo',
    fechaRegistro: '2019-10-30',
    avatarInitials: 'FC',
    prediosIds: ['pred-012']
  },
  {
    id: 'usr-013',
    codigoUsuario: 'OUA-DEMO-013',
    nombres: 'Agrícola Huaral Export',
    apellidos: 'S.R.L.',
    tipoDocumento: 'RUC',
    numeroDocumento: '20567890123',
    telefono: '01-246-8800',
    comisionId: 'amb-palpa-01',
    condicion: 'Activo',
    fechaRegistro: '2017-04-14',
    avatarInitials: 'AH',
    prediosIds: ['pred-013']
  },
  {
    id: 'usr-014',
    codigoUsuario: 'OUA-DEMO-014',
    nombres: 'Gregorio',
    apellidos: 'Poma Hilario',
    tipoDocumento: 'DNI',
    numeroDocumento: '10672345',
    telefono: '971-892-456',
    comisionId: 'amb-boqueron-03',
    condicion: 'Activo',
    fechaRegistro: '2022-04-05',
    avatarInitials: 'GP',
    prediosIds: ['pred-014']
  },
  {
    id: 'usr-015',
    codigoUsuario: 'OUA-DEMO-015',
    nombres: 'Beatriz',
    apellidos: 'Rivas Toledo',
    tipoDocumento: 'DNI',
    numeroDocumento: '45129876',
    telefono: '964-102-789',
    comisionId: 'amb-huando-02',
    condicion: 'Activo',
    fechaRegistro: '2023-03-11',
    avatarInitials: 'BR',
    prediosIds: ['pred-015']
  },
  {
    id: 'usr-016',
    codigoUsuario: 'OUA-DEMO-016',
    nombres: 'Nicanor',
    apellidos: 'Vega Zúñiga',
    tipoDocumento: 'DNI',
    numeroDocumento: '08912450',
    telefono: '955-432-109',
    comisionId: 'amb-palpa-01',
    condicion: 'Activo',
    fechaRegistro: '2020-08-29',
    avatarInitials: 'NV',
    prediosIds: ['pred-016']
  },
  {
    id: 'usr-017',
    codigoUsuario: 'OUA-DEMO-017',
    nombres: 'Yolanda',
    apellidos: 'Cáceres Benítez',
    tipoDocumento: 'DNI',
    numeroDocumento: '41897652',
    telefono: '947-658-321',
    comisionId: 'amb-boqueron-03',
    condicion: 'Activo',
    fechaRegistro: '2021-12-04',
    avatarInitials: 'YC',
    prediosIds: ['pred-017']
  },
  {
    id: 'usr-018',
    codigoUsuario: 'OUA-DEMO-018',
    nombres: 'Efraín',
    apellidos: 'Soto Quintana',
    tipoDocumento: 'DNI',
    numeroDocumento: '10982341',
    telefono: '938-129-456',
    comisionId: 'amb-palpa-01',
    condicion: 'Activo',
    fechaRegistro: '2019-05-18',
    avatarInitials: 'ES',
    prediosIds: ['pred-018']
  },
  {
    id: 'usr-019',
    codigoUsuario: 'OUA-DEMO-019',
    nombres: 'Asoc. de Productores',
    apellidos: 'Palpa Alta',
    tipoDocumento: 'RUC',
    numeroDocumento: '20601234567',
    telefono: '01-389-1122',
    comisionId: 'amb-palpa-01',
    condicion: 'Activo',
    fechaRegistro: '2018-09-01',
    avatarInitials: 'AP',
    prediosIds: ['pred-019']
  },
  {
    id: 'usr-020',
    codigoUsuario: 'OUA-DEMO-020',
    nombres: 'Justino',
    apellidos: 'Vilcarromero Polo',
    tipoDocumento: 'DNI',
    numeroDocumento: '42890123',
    telefono: '929-871-654',
    comisionId: 'amb-huando-02',
    condicion: 'Activo',
    fechaRegistro: '2022-10-15',
    avatarInitials: 'JV',
    prediosIds: ['pred-020']
  }
];

// ==========================================
// 20 PREDIOS CATASTRALES RELACIONADOS
// ==========================================
export const PREDIOS_DEMO: PredioCatastral[] = [
  {
    id: 'pred-001',
    codigoPredio: 'PRD-CH-001',
    nombrePredio: 'El Sauce Demo',
    unidadCatastral: 'UC-DEMO-001',
    usuarioId: 'usr-001',
    sectorId: 'amb-palpa-01',
    areaTotalHa: 12.5,
    areaBajoRiegoHa: 10.8,
    cultivoId: 'cul-palto',
    duaId: 'dua-001',
    tomaId: 't-003',
    conduccionId: 'cd-001',
    coordenadasUTM: { este: 258410, norte: 8724190, zona: '18S' },
    estadoCobranza: 'Al Día',
    geoJsonGeometry: {
      type: 'Polygon',
      coordinates: [[
        [-77.2340, -11.5180],
        [-77.2315, -11.5170],
        [-77.2320, -11.5210],
        [-77.2355, -11.5205],
        [-77.2340, -11.5180]
      ]]
    }
  },
  {
    id: 'pred-002',
    codigoPredio: 'PRD-CH-002',
    nombrePredio: 'Parcela Las Palmeras',
    unidadCatastral: 'UC-DEMO-002',
    usuarioId: 'usr-002',
    sectorId: 'amb-palpa-01',
    areaTotalHa: 7.0,
    areaBajoRiegoHa: 6.2,
    cultivoId: 'cul-mandarina',
    duaId: 'dua-002',
    tomaId: 't-004',
    conduccionId: 'cd-002',
    coordenadasUTM: { este: 257320, norte: 8724980, zona: '18S' },
    estadoCobranza: 'Deuda Pendiente',
    geoJsonGeometry: {
      type: 'Polygon',
      coordinates: [[
        [-77.2420, -11.5120],
        [-77.2395, -11.5110],
        [-77.2405, -11.5150],
        [-77.2435, -11.5140],
        [-77.2420, -11.5120]
      ]]
    }
  },
  {
    id: 'pred-003',
    codigoPredio: 'PRD-CH-003',
    nombrePredio: 'Fundo Don Germán',
    unidadCatastral: 'UC-DEMO-003',
    usuarioId: 'usr-003',
    sectorId: 'amb-huando-02',
    areaTotalHa: 28.0,
    areaBajoRiegoHa: 24.5,
    cultivoId: 'cul-uva',
    duaId: 'dua-003',
    tomaId: 't-007',
    conduccionId: 'cd-003',
    coordenadasUTM: { este: 259640, norte: 8723500, zona: '18S' },
    estadoCobranza: 'Al Día',
    geoJsonGeometry: {
      type: 'Polygon',
      coordinates: [[
        [-77.2140, -11.5160],
        [-77.2100, -11.5140],
        [-77.2110, -11.5200],
        [-77.2160, -11.5190],
        [-77.2140, -11.5160]
      ]]
    }
  },
  {
    id: 'pred-004',
    codigoPredio: 'PRD-CH-004',
    nombrePredio: 'Chacra San Isidro',
    unidadCatastral: 'UC-DEMO-004',
    usuarioId: 'usr-004',
    sectorId: 'amb-boqueron-03',
    areaTotalHa: 15.2,
    areaBajoRiegoHa: 13.0,
    cultivoId: 'cul-maiz',
    duaId: 'dua-004',
    tomaId: 't-001',
    conduccionId: 'cd-001',
    coordenadasUTM: { este: 255100, norte: 8725800, zona: '18S' },
    estadoCobranza: 'Al Día',
    geoJsonGeometry: {
      type: 'Polygon',
      coordinates: [[
        [-77.2480, -11.5245],
        [-77.2440, -11.5230],
        [-77.2450, -11.5280],
        [-77.2500, -11.5270],
        [-77.2480, -11.5245]
      ]]
    }
  },
  {
    id: 'pred-005',
    codigoPredio: 'PRD-CH-005',
    nombrePredio: 'Parcela Los Eucaliptos',
    unidadCatastral: 'UC-DEMO-005',
    usuarioId: 'usr-005',
    sectorId: 'amb-palpa-01',
    areaTotalHa: 9.5,
    areaBajoRiegoHa: 8.5,
    cultivoId: 'cul-palto',
    duaId: 'dua-005',
    tomaId: 't-003',
    conduccionId: 'cd-001',
    coordenadasUTM: { este: 258600, norte: 8724300, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-006',
    codigoPredio: 'PRD-CH-006',
    nombrePredio: 'Huerto Santa Rosa',
    unidadCatastral: 'UC-DEMO-006',
    usuarioId: 'usr-006',
    sectorId: 'amb-palpa-01',
    areaTotalHa: 5.0,
    areaBajoRiegoHa: 4.2,
    cultivoId: 'cul-fresa',
    duaId: 'dua-006',
    tomaId: 't-004',
    conduccionId: 'cd-002',
    coordenadasUTM: { este: 257450, norte: 8725100, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-007',
    codigoPredio: 'PRD-CH-007',
    nombrePredio: 'Parcela El Porvenir',
    unidadCatastral: 'UC-DEMO-007',
    usuarioId: 'usr-007',
    sectorId: 'amb-huando-02',
    areaTotalHa: 8.0,
    areaBajoRiegoHa: 7.0,
    cultivoId: 'cul-mandarina',
    duaId: 'dua-007',
    tomaId: 't-007',
    conduccionId: 'cd-003',
    coordenadasUTM: { este: 259800, norte: 8723650, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-008',
    codigoPredio: 'PRD-CH-008',
    nombrePredio: 'Fundo San Francisco',
    unidadCatastral: 'UC-DEMO-008',
    usuarioId: 'usr-008',
    sectorId: 'amb-huando-02',
    areaTotalHa: 13.5,
    areaBajoRiegoHa: 12.0,
    cultivoId: 'cul-palto',
    duaId: 'dua-008',
    tomaId: 't-008',
    conduccionId: 'cd-003',
    coordenadasUTM: { este: 260300, norte: 8723150, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-009',
    codigoPredio: 'PRD-CH-009',
    nombrePredio: 'Chacra La Victoria',
    unidadCatastral: 'UC-DEMO-009',
    usuarioId: 'usr-009',
    sectorId: 'amb-boqueron-03',
    areaTotalHa: 10.8,
    areaBajoRiegoHa: 9.4,
    cultivoId: 'cul-maiz',
    duaId: 'dua-009',
    tomaId: 't-001',
    conduccionId: 'cd-001',
    coordenadasUTM: { este: 255250, norte: 8725950, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-010',
    codigoPredio: 'PRD-CH-010',
    nombrePredio: 'Parcela San Pedro',
    unidadCatastral: 'UC-DEMO-010',
    usuarioId: 'usr-010',
    sectorId: 'amb-boqueron-03',
    areaTotalHa: 6.5,
    areaBajoRiegoHa: 5.8,
    cultivoId: 'cul-esparrago',
    duaId: 'dua-010',
    tomaId: 't-002',
    conduccionId: 'cd-001',
    coordenadasUTM: { este: 256350, norte: 8725350, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-011',
    codigoPredio: 'PRD-CH-011',
    nombrePredio: 'Parcela Bellavista',
    unidadCatastral: 'UC-DEMO-011',
    usuarioId: 'usr-011',
    sectorId: 'amb-palpa-01',
    areaTotalHa: 7.5,
    areaBajoRiegoHa: 6.5,
    cultivoId: 'cul-palto',
    duaId: 'dua-011',
    tomaId: 't-003',
    conduccionId: 'cd-001',
    coordenadasUTM: { este: 258550, norte: 8724250, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-012',
    codigoPredio: 'PRD-CH-012',
    nombrePredio: 'Parcela El Olivo',
    unidadCatastral: 'UC-DEMO-012',
    usuarioId: 'usr-012',
    sectorId: 'amb-huando-02',
    areaTotalHa: 5.5,
    areaBajoRiegoHa: 4.8,
    cultivoId: 'cul-manzano',
    duaId: 'dua-012',
    tomaId: 't-008',
    conduccionId: 'cd-003',
    coordenadasUTM: { este: 260400, norte: 8723200, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-013',
    codigoPredio: 'PRD-CH-013',
    nombrePredio: 'Fundo Monte Grande',
    unidadCatastral: 'UC-DEMO-013',
    usuarioId: 'usr-013',
    sectorId: 'amb-palpa-01',
    areaTotalHa: 20.0,
    areaBajoRiegoHa: 18.0,
    cultivoId: 'cul-uva',
    duaId: 'dua-013',
    tomaId: 't-005',
    conduccionId: 'cd-002',
    coordenadasUTM: { este: 258250, norte: 8724700, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-014',
    codigoPredio: 'PRD-CH-014',
    nombrePredio: 'Parcela La Ensenada',
    unidadCatastral: 'UC-DEMO-014',
    usuarioId: 'usr-014',
    sectorId: 'amb-boqueron-03',
    areaTotalHa: 8.5,
    areaBajoRiegoHa: 7.2,
    cultivoId: 'cul-maiz',
    duaId: 'dua-014',
    tomaId: 't-002',
    conduccionId: 'cd-001',
    coordenadasUTM: { este: 256400, norte: 8725400, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-015',
    codigoPredio: 'PRD-CH-015',
    nombrePredio: 'Chacra San José',
    unidadCatastral: 'UC-DEMO-015',
    usuarioId: 'usr-015',
    sectorId: 'amb-huando-02',
    areaTotalHa: 9.0,
    areaBajoRiegoHa: 8.0,
    cultivoId: 'cul-mandarina',
    duaId: 'dua-015',
    tomaId: 't-007',
    conduccionId: 'cd-003',
    coordenadasUTM: { este: 259750, norte: 8723600, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-016',
    codigoPredio: 'PRD-CH-016',
    nombrePredio: 'Parcela San Cristóbal',
    unidadCatastral: 'UC-DEMO-016',
    usuarioId: 'usr-016',
    sectorId: 'amb-palpa-01',
    areaTotalHa: 13.0,
    areaBajoRiegoHa: 11.5,
    cultivoId: 'cul-palto',
    duaId: 'dua-016',
    tomaId: 't-006',
    conduccionId: 'cd-002',
    coordenadasUTM: { este: 259150, norte: 8724100, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-017',
    codigoPredio: 'PRD-CH-017',
    nombrePredio: 'Parcela El Trébol',
    unidadCatastral: 'UC-DEMO-017',
    usuarioId: 'usr-017',
    sectorId: 'amb-boqueron-03',
    areaTotalHa: 6.0,
    areaBajoRiegoHa: 5.0,
    cultivoId: 'cul-esparrago',
    duaId: 'dua-017',
    tomaId: 't-001',
    conduccionId: 'cd-001',
    coordenadasUTM: { este: 255300, norte: 8726000, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-018',
    codigoPredio: 'PRD-CH-018',
    nombrePredio: 'Parcela Santa Mónica',
    unidadCatastral: 'UC-DEMO-018',
    usuarioId: 'usr-018',
    sectorId: 'amb-palpa-01',
    areaTotalHa: 7.8,
    areaBajoRiegoHa: 6.8,
    cultivoId: 'cul-pecano',
    duaId: 'dua-018',
    tomaId: 't-006',
    conduccionId: 'cd-002',
    coordenadasUTM: { este: 259200, norte: 8724150, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-019',
    codigoPredio: 'PRD-CH-019',
    nombrePredio: 'Sector Comunal Palpa',
    unidadCatastral: 'UC-DEMO-019',
    usuarioId: 'usr-019',
    sectorId: 'amb-palpa-01',
    areaTotalHa: 16.0,
    areaBajoRiegoHa: 14.0,
    cultivoId: 'cul-palto',
    duaId: 'dua-019',
    tomaId: 't-004',
    conduccionId: 'cd-002',
    coordenadasUTM: { este: 257500, norte: 8725050, zona: '18S' },
    estadoCobranza: 'Al Día'
  },
  {
    id: 'pred-020',
    codigoPredio: 'PRD-CH-020',
    nombrePredio: 'Parcela El Paraíso',
    unidadCatastral: 'UC-DEMO-020',
    usuarioId: 'usr-020',
    sectorId: 'amb-huando-02',
    areaTotalHa: 10.5,
    areaBajoRiegoHa: 9.2,
    cultivoId: 'cul-mandarina',
    duaId: 'dua-020',
    tomaId: 't-008',
    conduccionId: 'cd-003',
    coordenadasUTM: { este: 260500, norte: 8723300, zona: '18S' },
    estadoCobranza: 'Al Día'
  }
];

// ==========================================
// 20 DERECHOS DE USO DE AGUA (DUA)
// ==========================================
export const DUAS_DEMO: DerechoUsoAgua[] = [
  {
    id: 'dua-001',
    codigoDUA: 'DUA-2026-042',
    resolucionDirectoral: 'R.D. N.° 0892-2024-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Riego Palpa Sector A',
    volumenAnualAsignadoM3: 14500,
    volumenConsumidoCampañaM3: 6840,
    fechaEmision: '2024-04-12',
    fechaVencimiento: '12/2026',
    predioId: 'pred-001',
    usuarioId: 'usr-001',
    estado: 'Vigente'
  },
  {
    id: 'dua-002',
    codigoDUA: 'DUA-2026-089',
    resolucionDirectoral: 'R.D. N.° 1145-2023-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Riego Palpa Lateral 02',
    volumenAnualAsignadoM3: 8200,
    volumenConsumidoCampañaM3: 4120,
    fechaEmision: '2023-09-18',
    fechaVencimiento: '12/2026',
    predioId: 'pred-002',
    usuarioId: 'usr-002',
    estado: 'Vigente'
  },
  {
    id: 'dua-003',
    codigoDUA: 'DUA-2026-112',
    resolucionDirectoral: 'R.D. N.° 0420-2022-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Huando Sublateral A',
    volumenAnualAsignadoM3: 32000,
    volumenConsumidoCampañaM3: 16800,
    fechaEmision: '2022-03-24',
    fechaVencimiento: '12/2026',
    predioId: 'pred-003',
    usuarioId: 'usr-003',
    estado: 'Vigente'
  },
  {
    id: 'dua-004',
    codigoDUA: 'DUA-2026-140',
    resolucionDirectoral: 'R.D. N.° 0780-2024-ANA',
    tipoDUA: 'Permiso de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Boquerón Cabecera',
    volumenAnualAsignadoM3: 16500,
    volumenConsumidoCampañaM3: 7900,
    fechaEmision: '2024-06-10',
    fechaVencimiento: '12/2026',
    predioId: 'pred-004',
    usuarioId: 'usr-004',
    estado: 'Vigente'
  },
  {
    id: 'dua-005',
    codigoDUA: 'DUA-2026-155',
    resolucionDirectoral: 'R.D. N.° 0915-2023-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Palpa Sector A',
    volumenAnualAsignadoM3: 11200,
    volumenConsumidoCampañaM3: 5400,
    fechaEmision: '2023-08-11',
    fechaVencimiento: '12/2026',
    predioId: 'pred-005',
    usuarioId: 'usr-005',
    estado: 'Vigente'
  },
  {
    id: 'dua-006',
    codigoDUA: 'DUA-2026-162',
    resolucionDirectoral: 'R.D. N.° 1022-2024-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Palpa Lateral 02',
    volumenAnualAsignadoM3: 6500,
    volumenConsumidoCampañaM3: 2800,
    fechaEmision: '2024-05-19',
    fechaVencimiento: '12/2026',
    predioId: 'pred-006',
    usuarioId: 'usr-006',
    estado: 'Vigente'
  },
  {
    id: 'dua-007',
    codigoDUA: 'DUA-2026-170',
    resolucionDirectoral: 'R.D. N.° 0654-2023-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Huando Sublateral A',
    volumenAnualAsignadoM3: 9800,
    volumenConsumidoCampañaM3: 4700,
    fechaEmision: '2023-07-21',
    fechaVencimiento: '12/2026',
    predioId: 'pred-007',
    usuarioId: 'usr-007',
    estado: 'Vigente'
  },
  {
    id: 'dua-008',
    codigoDUA: 'DUA-2026-181',
    resolucionDirectoral: 'R.D. N.° 1240-2022-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Huando Sublateral A',
    volumenAnualAsignadoM3: 15600,
    volumenConsumidoCampañaM3: 7500,
    fechaEmision: '2022-11-15',
    fechaVencimiento: '12/2026',
    predioId: 'pred-008',
    usuarioId: 'usr-008',
    estado: 'Vigente'
  },
  {
    id: 'dua-009',
    codigoDUA: 'DUA-2026-192',
    resolucionDirectoral: 'R.D. N.° 0512-2024-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Boquerón Cabecera',
    volumenAnualAsignadoM3: 12400,
    volumenConsumidoCampañaM3: 5900,
    fechaEmision: '2024-03-30',
    fechaVencimiento: '12/2026',
    predioId: 'pred-009',
    usuarioId: 'usr-009',
    estado: 'Vigente'
  },
  {
    id: 'dua-010',
    codigoDUA: 'DUA-2026-205',
    resolucionDirectoral: 'R.D. N.° 0734-2023-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Boquerón Esperanza',
    volumenAnualAsignadoM3: 8900,
    volumenConsumidoCampañaM3: 4200,
    fechaEmision: '2023-09-05',
    fechaVencimiento: '12/2026',
    predioId: 'pred-010',
    usuarioId: 'usr-010',
    estado: 'Vigente'
  },
  {
    id: 'dua-011',
    codigoDUA: 'DUA-2026-218',
    resolucionDirectoral: 'R.D. N.° 0845-2024-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Palpa Sector A',
    volumenAnualAsignadoM3: 9200,
    volumenConsumidoCampañaM3: 4600,
    fechaEmision: '2024-04-18',
    fechaVencimiento: '12/2026',
    predioId: 'pred-011',
    usuarioId: 'usr-011',
    estado: 'Vigente'
  },
  {
    id: 'dua-012',
    codigoDUA: 'DUA-2026-224',
    resolucionDirectoral: 'R.D. N.° 0621-2023-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Huando Sublateral A',
    volumenAnualAsignadoM3: 7100,
    volumenConsumidoCampañaM3: 3100,
    fechaEmision: '2023-06-25',
    fechaVencimiento: '12/2026',
    predioId: 'pred-012',
    usuarioId: 'usr-012',
    estado: 'Vigente'
  },
  {
    id: 'dua-013',
    codigoDUA: 'DUA-2026-239',
    resolucionDirectoral: 'R.D. N.° 0310-2022-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Palpa Alta',
    volumenAnualAsignadoM3: 24000,
    volumenConsumidoCampañaM3: 11800,
    fechaEmision: '2022-02-17',
    fechaVencimiento: '12/2026',
    predioId: 'pred-013',
    usuarioId: 'usr-013',
    estado: 'Vigente'
  },
  {
    id: 'dua-014',
    codigoDUA: 'DUA-2026-248',
    resolucionDirectoral: 'R.D. N.° 0978-2024-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Boquerón Esperanza',
    volumenAnualAsignadoM3: 10100,
    volumenConsumidoCampañaM3: 4900,
    fechaEmision: '2024-05-12',
    fechaVencimiento: '12/2026',
    predioId: 'pred-014',
    usuarioId: 'usr-014',
    estado: 'Vigente'
  },
  {
    id: 'dua-015',
    codigoDUA: 'DUA-2026-255',
    resolucionDirectoral: 'R.D. N.° 0812-2023-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Huando Sublateral A',
    volumenAnualAsignadoM3: 11000,
    volumenConsumidoCampañaM3: 5200,
    fechaEmision: '2023-08-30',
    fechaVencimiento: '12/2026',
    predioId: 'pred-015',
    usuarioId: 'usr-015',
    estado: 'Vigente'
  },
  {
    id: 'dua-016',
    codigoDUA: 'DUA-2026-267',
    resolucionDirectoral: 'R.D. N.° 1190-2023-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Palpa Lateral 02',
    volumenAnualAsignadoM3: 14800,
    volumenConsumidoCampañaM3: 7100,
    fechaEmision: '2023-10-28',
    fechaVencimiento: '12/2026',
    predioId: 'pred-016',
    usuarioId: 'usr-016',
    estado: 'Vigente'
  },
  {
    id: 'dua-017',
    codigoDUA: 'DUA-2026-279',
    resolucionDirectoral: 'R.D. N.° 0689-2024-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Boquerón Cabecera',
    volumenAnualAsignadoM3: 7900,
    volumenConsumidoCampañaM3: 3600,
    fechaEmision: '2024-04-02',
    fechaVencimiento: '12/2026',
    predioId: 'pred-017',
    usuarioId: 'usr-017',
    estado: 'Vigente'
  },
  {
    id: 'dua-018',
    codigoDUA: 'DUA-2026-285',
    resolucionDirectoral: 'R.D. N.° 0540-2023-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Palpa Lateral 02',
    volumenAnualAsignadoM3: 9400,
    volumenConsumidoCampañaM3: 4500,
    fechaEmision: '2023-06-14',
    fechaVencimiento: '12/2026',
    predioId: 'pred-018',
    usuarioId: 'usr-018',
    estado: 'Vigente'
  },
  {
    id: 'dua-019',
    codigoDUA: 'DUA-2026-294',
    resolucionDirectoral: 'R.D. N.° 0480-2022-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Palpa Comunal',
    volumenAnualAsignadoM3: 18500,
    volumenConsumidoCampañaM3: 8900,
    fechaEmision: '2022-04-10',
    fechaVencimiento: '12/2026',
    predioId: 'pred-019',
    usuarioId: 'usr-019',
    estado: 'Vigente'
  },
  {
    id: 'dua-020',
    codigoDUA: 'DUA-2026-308',
    resolucionDirectoral: 'R.D. N.° 1055-2024-ANA',
    tipoDUA: 'Licencia de Uso de Agua',
    fuenteAgua: 'Superficial (Río Chancay)',
    bloqueRiego: 'Bloque Huando Sublateral A',
    volumenAnualAsignadoM3: 12800,
    volumenConsumidoCampañaM3: 6100,
    fechaEmision: '2024-07-08',
    fechaVencimiento: '12/2026',
    predioId: 'pred-020',
    usuarioId: 'usr-020',
    estado: 'Vigente'
  }
];

// ====================================================================
// PROGRAMACIÓN SEMANAL DE RIEGO (ROL PDA SEMANA 36: 31 AGO - 06 SET)
// EXACTAMENTE 1 TURNO POR SEMANA POR USUARIO (20 USUARIOS CUBIERTOS)
// ====================================================================
export const DISTRIBUCION_TURNOS_DEMO: DistribucionTurnoPDA[] = [
  // LUNES 31 AGOSTO (4 Turnos)
  {
    id: 'trn-005',
    numeroTurno: 5,
    codigoTurno: 'TRN-2026-075',
    campaña: '2026-I',
    usuarioId: 'usr-005', // Teodoro Cárdenas
    predioId: 'pred-005',
    tomaId: 't-003',
    conduccionId: 'cd-001',
    sectorId: 'amb-palpa-01',
    fechaInicio: '2026-08-31',
    horaInicio: '07:00',
    duracionHoras: 5.5,
    caudalLps: 120.0,
    volumenM3: 2376, // 120 * 5.5 * 3.6
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'Ejecutado',
    observaciones: 'Turno semanal ejecutado conforme. Palto Hass.'
  },
  {
    id: 'trn-006',
    numeroTurno: 6,
    codigoTurno: 'TRN-2026-076',
    campaña: '2026-I',
    usuarioId: 'usr-006', // Rosa Luz Espinoza
    predioId: 'pred-006',
    tomaId: 't-004',
    conduccionId: 'cd-002',
    sectorId: 'amb-palpa-01',
    fechaInicio: '2026-08-31',
    horaInicio: '13:00',
    duracionHoras: 3.5,
    caudalLps: 100.0,
    volumenM3: 1260,
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'Ejecutado',
    observaciones: 'Turno semanal ejecutado. Cultivo Fresa San Andreas.'
  },
  {
    id: 'trn-007',
    numeroTurno: 7,
    codigoTurno: 'TRN-2026-077',
    campaña: '2026-I',
    usuarioId: 'usr-007', // Dionisio Huamán
    predioId: 'pred-007',
    tomaId: 't-007',
    conduccionId: 'cd-003',
    sectorId: 'amb-huando-02',
    fechaInicio: '2026-08-31',
    horaInicio: '17:00',
    duracionHoras: 4.5,
    caudalLps: 115.0,
    volumenM3: 1863,
    responsableDistribuidor: 'Ing. Carlos Ramírez (Sectorista Hidráulico)',
    estado: 'Ejecutado',
    observaciones: 'Turno semanal conforme en toma T-007. Mandarina.'
  },
  {
    id: 'trn-008',
    numeroTurno: 8,
    codigoTurno: 'TRN-2026-078',
    campaña: '2026-I',
    usuarioId: 'usr-008', // Marcelina Flores
    predioId: 'pred-008',
    tomaId: 't-008',
    conduccionId: 'cd-003',
    sectorId: 'amb-huando-02',
    fechaInicio: '2026-08-31',
    horaInicio: '22:00',
    duracionHoras: 6.0,
    caudalLps: 130.0,
    volumenM3: 2808,
    responsableDistribuidor: 'Ing. Carlos Ramírez (Sectorista Hidráulico)',
    estado: 'Ejecutado',
    observaciones: 'Riego nocturno completado sin incidencias.'
  },

  // MARTES 01 SETIEMBRE (3 Turnos)
  {
    id: 'trn-003',
    numeroTurno: 3,
    codigoTurno: 'TRN-2026-080',
    campaña: '2026-I',
    usuarioId: 'usr-003', // Agropecuaria Valle Verde
    predioId: 'pred-003',
    tomaId: 't-007',
    conduccionId: 'cd-003',
    sectorId: 'amb-huando-02',
    fechaInicio: '2026-09-01',
    horaInicio: '08:00',
    duracionHoras: 8.0,
    caudalLps: 150.0,
    volumenM3: 4320,
    responsableDistribuidor: 'Ing. Carlos Ramírez (Sectorista Hidráulico)',
    estado: 'Ejecutado',
    observaciones: 'Aforo verificado en cabecera de toma. Entrega conforme.'
  },
  {
    id: 'trn-009',
    numeroTurno: 9,
    codigoTurno: 'TRN-2026-082',
    campaña: '2026-I',
    usuarioId: 'usr-009', // Aurelio Bazán
    predioId: 'pred-009',
    tomaId: 't-001',
    conduccionId: 'cd-001',
    sectorId: 'amb-boqueron-03',
    fechaInicio: '2026-09-01',
    horaInicio: '16:30',
    duracionHoras: 5.0,
    caudalLps: 120.0,
    volumenM3: 2160,
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'Ejecutado',
    observaciones: 'Turno semanal ejecutado. Maíz Amarillo.'
  },
  {
    id: 'trn-010',
    numeroTurno: 10,
    codigoTurno: 'TRN-2026-084',
    campaña: '2026-I',
    usuarioId: 'usr-010', // Juana Mendoza
    predioId: 'pred-010',
    tomaId: 't-002',
    conduccionId: 'cd-001',
    sectorId: 'amb-boqueron-03',
    fechaInicio: '2026-09-01',
    horaInicio: '22:00',
    duracionHoras: 4.0,
    caudalLps: 110.0,
    volumenM3: 1584,
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'Ejecutado',
    observaciones: 'Turno nocturno completado para Espárrago.'
  },

  // MIÉRCOLES 02 SETIEMBRE (3 Turnos)
  {
    id: 'trn-011',
    numeroTurno: 11,
    codigoTurno: 'TRN-2026-086',
    campaña: '2026-I',
    usuarioId: 'usr-011', // Hernán Castro
    predioId: 'pred-011',
    tomaId: 't-003',
    conduccionId: 'cd-001',
    sectorId: 'amb-palpa-01',
    fechaInicio: '2026-09-02',
    horaInicio: '08:00',
    duracionHoras: 4.5,
    caudalLps: 120.0,
    volumenM3: 1944,
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'Ejecutado',
    observaciones: 'Turno semanal Palto Hass Palpa.'
  },
  {
    id: 'trn-001',
    numeroTurno: 1,
    codigoTurno: 'TRN-2026-089',
    campaña: '2026-I',
    usuarioId: 'usr-001', // Victoriano Ramos
    predioId: 'pred-001',
    tomaId: 't-003',
    conduccionId: 'cd-001',
    sectorId: 'amb-palpa-01',
    fechaInicio: '2026-09-02',
    horaInicio: '22:30',
    duracionHoras: 6.5,
    caudalLps: 120.0,
    volumenM3: 2808,
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'En Ejecución',
    observaciones: 'Dotación normal semanal para Palto Hass en etapa fenológica de llenado.'
  },
  {
    id: 'trn-002',
    numeroTurno: 2,
    codigoTurno: 'TRN-2026-090',
    campaña: '2026-I',
    usuarioId: 'usr-002', // María Elena Quispe
    predioId: 'pred-002',
    tomaId: 't-004',
    conduccionId: 'cd-002',
    sectorId: 'amb-palpa-01',
    fechaInicio: '2026-09-02',
    horaInicio: '23:45',
    duracionHoras: 4.0,
    caudalLps: 110.0,
    volumenM3: 1584,
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'En Ejecución',
    observaciones: 'Programación nocturna según rol de turnos PDA del Sector Palpa.'
  },

  // JUEVES 03 SETIEMBRE (3 Turnos)
  {
    id: 'trn-004',
    numeroTurno: 4,
    codigoTurno: 'TRN-2026-092',
    campaña: '2026-I',
    usuarioId: 'usr-004', // Carlos Alberto Mendoza
    predioId: 'pred-004',
    tomaId: 't-001',
    conduccionId: 'cd-001',
    sectorId: 'amb-boqueron-03',
    fechaInicio: '2026-09-03',
    horaInicio: '06:00',
    duracionHoras: 5.0,
    caudalLps: 130.0,
    volumenM3: 2340,
    responsableDistribuidor: 'Ing. Carlos Ramírez (Sectorista Hidráulico)',
    estado: 'Programado',
    observaciones: 'Turno semanal para Maíz Amarillo en floración.'
  },
  {
    id: 'trn-012',
    numeroTurno: 12,
    codigoTurno: 'TRN-2026-094',
    campaña: '2026-I',
    usuarioId: 'usr-012', // Faustino Colán
    predioId: 'pred-012',
    tomaId: 't-008',
    conduccionId: 'cd-003',
    sectorId: 'amb-huando-02',
    fechaInicio: '2026-09-03',
    horaInicio: '12:00',
    duracionHoras: 3.5,
    caudalLps: 105.0,
    volumenM3: 1323,
    responsableDistribuidor: 'Ing. Carlos Ramírez (Sectorista Hidráulico)',
    estado: 'Programado',
    observaciones: 'Turno semanal para Manzano Delicia.'
  },
  {
    id: 'trn-013',
    numeroTurno: 13,
    codigoTurno: 'TRN-2026-096',
    campaña: '2026-I',
    usuarioId: 'usr-013', // Agrícola Huaral Export
    predioId: 'pred-013',
    tomaId: 't-005',
    conduccionId: 'cd-002',
    sectorId: 'amb-palpa-01',
    fechaInicio: '2026-09-03',
    horaInicio: '16:00',
    duracionHoras: 7.0,
    caudalLps: 160.0,
    volumenM3: 4032,
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'Programado',
    observaciones: 'Turno semanal Uva Red Globe exportación.'
  },

  // VIERNES 04 SETIEMBRE (3 Turnos)
  {
    id: 'trn-014',
    numeroTurno: 14,
    codigoTurno: 'TRN-2026-098',
    campaña: '2026-I',
    usuarioId: 'usr-014', // Gregorio Poma
    predioId: 'pred-014',
    tomaId: 't-002',
    conduccionId: 'cd-001',
    sectorId: 'amb-boqueron-03',
    fechaInicio: '2026-09-04',
    horaInicio: '06:00',
    duracionHoras: 4.5,
    caudalLps: 115.0,
    volumenM3: 1863,
    responsableDistribuidor: 'Ing. Carlos Ramírez (Sectorista Hidráulico)',
    estado: 'Programado',
    observaciones: 'Turno semanal Maíz Parcela La Ensenada.'
  },
  {
    id: 'trn-015',
    numeroTurno: 15,
    codigoTurno: 'TRN-2026-100',
    campaña: '2026-I',
    usuarioId: 'usr-015', // Beatriz Rivas
    predioId: 'pred-015',
    tomaId: 't-007',
    conduccionId: 'cd-003',
    sectorId: 'amb-huando-02',
    fechaInicio: '2026-09-04',
    horaInicio: '11:00',
    duracionHoras: 5.0,
    caudalLps: 125.0,
    volumenM3: 2250,
    responsableDistribuidor: 'Ing. Carlos Ramírez (Sectorista Hidráulico)',
    estado: 'Programado',
    observaciones: 'Turno semanal Mandarina W. Murcott.'
  },
  {
    id: 'trn-016',
    numeroTurno: 16,
    codigoTurno: 'TRN-2026-102',
    campaña: '2026-I',
    usuarioId: 'usr-016', // Nicanor Vega
    predioId: 'pred-016',
    tomaId: 't-006',
    conduccionId: 'cd-002',
    sectorId: 'amb-palpa-01',
    fechaInicio: '2026-09-04',
    horaInicio: '16:30',
    duracionHoras: 6.0,
    caudalLps: 130.0,
    volumenM3: 2808,
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'Programado',
    observaciones: 'Turno semanal Palto Hass San Cristóbal.'
  },

  // SÁBADO 05 SETIEMBRE (2 Turnos)
  {
    id: 'trn-017',
    numeroTurno: 17,
    codigoTurno: 'TRN-2026-104',
    campaña: '2026-I',
    usuarioId: 'usr-017', // Yolanda Cáceres
    predioId: 'pred-017',
    tomaId: 't-001',
    conduccionId: 'cd-001',
    sectorId: 'amb-boqueron-03',
    fechaInicio: '2026-09-05',
    horaInicio: '07:00',
    duracionHoras: 4.0,
    caudalLps: 110.0,
    volumenM3: 1584,
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'Programado',
    observaciones: 'Turno fin de semana para Espárrago.'
  },
  {
    id: 'trn-018',
    numeroTurno: 18,
    codigoTurno: 'TRN-2026-106',
    campaña: '2026-I',
    usuarioId: 'usr-018', // Efraín Soto
    predioId: 'pred-018',
    tomaId: 't-006',
    conduccionId: 'cd-002',
    sectorId: 'amb-palpa-01',
    fechaInicio: '2026-09-05',
    horaInicio: '12:00',
    duracionHoras: 4.5,
    caudalLps: 115.0,
    volumenM3: 1863,
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'Programado',
    observaciones: 'Turno semanal Pecano Santa Mónica.'
  },

  // DOMINGO 06 SETIEMBRE (2 Turnos)
  {
    id: 'trn-019',
    numeroTurno: 19,
    codigoTurno: 'TRN-2026-108',
    campaña: '2026-I',
    usuarioId: 'usr-019', // Asoc. Palpa Alta
    predioId: 'pred-019',
    tomaId: 't-004',
    conduccionId: 'cd-002',
    sectorId: 'amb-palpa-01',
    fechaInicio: '2026-09-06',
    horaInicio: '06:00',
    duracionHoras: 6.5,
    caudalLps: 140.0,
    volumenM3: 3276,
    responsableDistribuidor: 'Tec. Víctor Huamán (Sectorista)',
    estado: 'Programado',
    observaciones: 'Turno dominical comunal Palpa Alta.'
  },
  {
    id: 'trn-020',
    numeroTurno: 20,
    codigoTurno: 'TRN-2026-110',
    campaña: '2026-I',
    usuarioId: 'usr-020', // Justino Vilcarromero
    predioId: 'pred-020',
    tomaId: 't-008',
    conduccionId: 'cd-003',
    sectorId: 'amb-huando-02',
    fechaInicio: '2026-09-06',
    horaInicio: '13:00',
    duracionHoras: 5.5,
    caudalLps: 120.0,
    volumenM3: 2376,
    responsableDistribuidor: 'Ing. Carlos Ramírez (Sectorista Hidráulico)',
    estado: 'Programado',
    observaciones: 'Turno dominical Parcela El Paraíso.'
  }
];

export const OBLIGACIONES_COBRANZA_DEMO: ObligacionCobranza[] = [
  {
    id: 'cob-001',
    codigoRecibo: 'REC-2026-0894',
    usuarioId: 'usr-001',
    predioId: 'pred-001',
    periodoMesAño: 'Agosto 2026',
    campaña: '2026-I',
    conceptoTarifario: 'Tarifa O&M (RJ 0155-2022-ANA)',
    baseCalculo: '10.8 ha bajo riego x S/. 8.27/ha',
    montoTotalSoles: 89.34,
    montoPagadoSoles: 89.34,
    saldoPendienteSoles: 0.0,
    fechaEmision: '2026-08-01',
    fechaVencimiento: '2026-08-25',
    estado: 'Pagado',
    referenciaNormativa: 'RJ N.° 0155-2022-ANA / DS 020-2025-MIDAGRI'
  },
  {
    id: 'cob-002',
    codigoRecibo: 'REC-2026-0895',
    usuarioId: 'usr-001',
    predioId: 'pred-001',
    periodoMesAño: 'Campaña 2026',
    campaña: '2026-I',
    conceptoTarifario: 'Retribución Económica ANA (Ley 29338)',
    baseCalculo: '14,500 m³ asignados x S/. 0.0118/m³',
    montoTotalSoles: 171.10,
    montoPagadoSoles: 171.10,
    saldoPendienteSoles: 0.0,
    fechaEmision: '2026-06-01',
    fechaVencimiento: '2026-07-15',
    estado: 'Pagado',
    referenciaNormativa: 'Ley N.° 29338 Art. 91 / D.S. N.° 020-2025-MIDAGRI'
  },
  {
    id: 'cob-003',
    codigoRecibo: 'REC-2026-0912',
    usuarioId: 'usr-002',
    predioId: 'pred-002',
    periodoMesAño: 'Agosto 2026',
    campaña: '2026-I',
    conceptoTarifario: 'Tarifa O&M (RJ 0155-2022-ANA)',
    baseCalculo: '6.2 ha bajo riego x S/. 18.14/ha (con bombeo)',
    montoTotalSoles: 112.45,
    montoPagadoSoles: 0.0,
    saldoPendienteSoles: 112.45,
    fechaEmision: '2026-08-01',
    fechaVencimiento: '2026-08-25',
    estado: 'Pendiente',
    referenciaNormativa: 'RJ N.° 0155-2022-ANA'
  },
  {
    id: 'cob-004',
    codigoRecibo: 'REC-2026-0850',
    usuarioId: 'usr-003',
    predioId: 'pred-003',
    periodoMesAño: 'Agosto 2026',
    campaña: '2026-I',
    conceptoTarifario: 'Tarifa O&M (RJ 0155-2022-ANA)',
    baseCalculo: '24.5 ha bajo riego x S/. 9.39/ha',
    montoTotalSoles: 230.12,
    montoPagadoSoles: 230.12,
    saldoPendienteSoles: 0.0,
    fechaEmision: '2026-08-01',
    fechaVencimiento: '2026-08-25',
    estado: 'Pagado',
    referenciaNormativa: 'RJ N.° 0155-2022-ANA'
  }
];

export const PARAMETROS_TARIFARIOS_DEMO: ParametroTarifarioConfig[] = [
  {
    id: 'param-001',
    año: 2026,
    campaña: '2026-I / 2026-II',
    ambitoId: 'amb-palpa-01',
    concepto: 'Tarifa O&M (RJ 0155-2022-ANA)',
    unidadMedida: 'S/. por hectárea bajo riego',
    valorUnitarioSoles: 24.07,
    baseLegal: 'R.J. N.° 0155-2022-ANA & Aprobación en Asamblea OUA',
    vigenteHasta: '2026-12-31'
  },
  {
    id: 'param-002',
    año: 2026,
    campaña: '2026-Anual',
    ambitoId: 'amb-palpa-01',
    concepto: 'Retribución Económica ANA (Ley 29338)',
    unidadMedida: 'S/. por millar m³ derivado',
    valorUnitarioSoles: 11.80,
    baseLegal: 'D.S. N.° 020-2025-MIDAGRI & D.S. Valor Retribución ANA',
    vigenteHasta: '2026-12-31'
  },
  {
    id: 'param-003',
    año: 2026,
    campaña: '2026-I',
    ambitoId: 'amb-palpa-01',
    concepto: 'Cuota Extraordinaria OUA',
    unidadMedida: 'S/. por hectárea bajo riego',
    valorUnitarioSoles: 5.00,
    baseLegal: 'Ley N.° 31801 Art. 12 (Fondo de Contingencias Hidráulicas)',
    vigenteHasta: '2026-12-31'
  }
];

// Helper to build Ficha Integral 360 for any entity
export function getFichaIntegralPorUsuario(usuarioId: string): FichaIntegral360Data | null {
  const usuario = USUARIOS_DEMO.find(u => u.id === usuarioId);
  if (!usuario) return null;

  const predio = PREDIOS_DEMO.find(p => p.usuarioId === usuario.id) || PREDIOS_DEMO[0];
  const dua = DUAS_DEMO.find(d => d.id === predio.duaId) || DUAS_DEMO[0];
  const cultivo = CULTIVOS_DEMO.find(c => c.id === predio.cultivoId) || CULTIVOS_DEMO[0];
  const toma = TOMAS_DEMO.find(t => t.id === predio.tomaId) || TOMAS_DEMO[0];
  const conduccion = CONDUCCIONES_DEMO.find(cd => cd.id === predio.conduccionId) || CONDUCCIONES_DEMO[0];
  const infraestructura = INFRAESTRUCTURA_DEMO.find(i => i.conduccionId === conduccion.id) || INFRAESTRUCTURA_DEMO[0];
  
  // Turno actual o programado
  const turnoActual = DISTRIBUCION_TURNOS_DEMO.find(t => t.usuarioId === usuario.id && (t.estado === 'En Ejecución' || t.estado === 'Programado')) ||
    DISTRIBUCION_TURNOS_DEMO.find(t => t.usuarioId === usuario.id);
  const turnosHistorial = DISTRIBUCION_TURNOS_DEMO.filter(t => t.usuarioId === usuario.id);
  const cobranza = OBLIGACIONES_COBRANZA_DEMO.filter(c => c.usuarioId === usuario.id);

  return {
    usuario,
    predio,
    dua,
    cultivo,
    toma,
    conduccion,
    infraestructura,
    turnoActual,
    turnosHistorial,
    turnos: turnosHistorial,
    cobranza,
    obligacionesCobranza: cobranza
  };
}

export function getFichaIntegralPorPredio(predioId: string): FichaIntegral360Data | null {
  const predio = PREDIOS_DEMO.find(p => p.id === predioId);
  if (!predio) return null;
  return getFichaIntegralPorUsuario(predio.usuarioId);
}

export const FICHA_INTEGRAL_DEMO: FichaIntegral360Data = getFichaIntegralPorUsuario(USUARIOS_DEMO[0].id)!;
