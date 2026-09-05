/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthUser } from '../types';

export interface UserCredential extends AuthUser {
  passwordHash: string; // demo validation
  dni: string;
}

export const USUARIOS_PLATAFORMA_DEMO: UserCredential[] = [
  {
    id: 'usr-01',
    username: 'carlos.ramirez',
    passwordHash: 'siodra2026',
    dni: '42189033',
    nombreCompleto: 'Ing. Carlos Ramírez',
    cargo: 'Sectorista Hidráulico OUA',
    rol: 'Sectorista',
    comision: 'Comisión de Usuarios Huando',
    avatarInitials: 'CR',
    email: 'carlos.ramirez@juch.org.pe',
    ultimoAcceso: 'Hoy, 08:30 AM'
  },
  {
    id: 'usr-02',
    username: 'maria.torres',
    passwordHash: 'siodra2026',
    dni: '45890124',
    nombreCompleto: 'Lic. María Torres',
    cargo: 'Coordinadora de Cobranza & Tarifas',
    rol: 'Tesorero',
    comision: 'Sede Central Chancay-Huaral',
    avatarInitials: 'MT',
    email: 'maria.torres@juch.org.pe',
    ultimoAcceso: 'Ayer, 16:45 PM'
  },
  {
    id: 'usr-03',
    username: 'pedro.mendoza',
    passwordHash: 'siodra2026',
    dni: '10982341',
    nombreCompleto: 'Ing. Pedro Mendoza',
    cargo: 'Gerente Técnico & Supervisor ANA',
    rol: 'Administrador',
    comision: 'Junta de Usuarios Chancay-Huaral',
    avatarInitials: 'PM',
    email: 'pedro.mendoza@juch.org.pe',
    ultimoAcceso: 'Hace 2 horas'
  },
  {
    id: 'usr-04',
    username: 'juan.quiroz',
    passwordHash: 'siodra2026',
    dni: '40781290',
    nombreCompleto: 'Téc. Juan Quiroz',
    cargo: 'Operador de Compuertas & Aforos',
    rol: 'Operador',
    comision: 'Subsector Palpa - Cañón',
    avatarInitials: 'JQ',
    email: 'juan.quiroz@juch.org.pe',
    ultimoAcceso: 'Hoy, 06:15 AM'
  }
];

export const DEFAULT_USER: AuthUser = USUARIOS_PLATAFORMA_DEMO[0];
