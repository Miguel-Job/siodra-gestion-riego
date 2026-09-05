/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import {
  LayoutGrid,
  Users,
  GitFork,
  CalendarDays,
  CircleDollarSign,
  MapPin,
  Settings,
  RefreshCw,
  FileSpreadsheet,
  LogOut,
  X
} from 'lucide-react';
import { AuthUser } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab?: (tab: string) => void;
  onTabChange?: (tab: string) => void;
  onOpenPresentacion?: () => void;
  onResetDemoData?: () => void;
  currentUser?: AuthUser;
  onLogout?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  isDesktopVisible?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  onTabChange,
  onOpenPresentacion,
  onResetDemoData,
  currentUser,
  onLogout,
  isOpen = false,
  onClose,
  isDesktopVisible = true
}) => {
  const handleNav = (tab: string) => {
    if (onTabChange) onTabChange(tab);
    if (setCurrentTab) setCurrentTab(tab);
    if (onClose) onClose();
  };

  const navAreas = [
    { id: 'gestion', label: 'GESTIÓN', subtitle: 'Padrón, Predios & DUA', count: '4', icon: Users },
    { id: 'operacion', label: 'OPERACIÓN', subtitle: 'Tomas, Red & PDA', count: '3', icon: GitFork },
    { id: 'economia', label: 'ECONOMÍA', subtitle: 'Tarifas & Cobranza', count: '2', icon: CircleDollarSign },
    { id: 'gis', label: 'INFORMACIÓN / GIS', subtitle: 'Catastro Transversal', count: 'GIS', icon: MapPin },
  ];

  return (
    <aside
      id="sidebar-navegacion"
      className={`
        w-64 bg-[#0F172A] text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none
        transition-transform duration-200 ease-in-out z-40
        fixed inset-y-0 left-0 h-full
        md:static md:h-auto
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
        ${isDesktopVisible ? 'md:flex' : 'md:hidden'}
      `}
    >
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-sm shadow-emerald-500/30">
              S
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight font-sans">
              SIODRA
            </span>
          </div>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold pl-0.5">
            Recursos Hídricos Agrarios
          </p>
        </div>

        {/* Botón para despejar / cerrar la barra azul en dispositivos móviles */}
        {onClose && (
          <button
            id="btn-despejar-sidebar"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 md:hidden transition-colors focus:outline-none"
            title="Despejar barra lateral"
            aria-label="Cerrar barra lateral"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-bold text-slate-400 px-3 py-1.5 uppercase tracking-wider">
          Principal
        </div>

        <button
          onClick={() => handleNav('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
            currentTab === 'dashboard'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-xs'
              : 'hover:bg-slate-800/80 text-slate-300'
          }`}
        >
          <LayoutGrid className="w-4 h-4 text-emerald-400" />
          <span>Inicio / Dashboard</span>
        </button>

        <div className="text-[11px] font-bold text-slate-400 px-3 pt-4 pb-1.5 uppercase tracking-wider">
          Áreas Funcionales
        </div>

        {navAreas.map(area => {
          const Icon = area.icon;
          const isActive = currentTab === area.id;

          return (
            <button
              key={area.id}
              onClick={() => handleNav(area.id)}
              className={`w-full group cursor-pointer flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
                  : 'hover:bg-slate-800/80 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <div>
                  <span className="block font-medium tracking-tight">{area.label}</span>
                  <span className="block text-[10px] text-slate-400 font-normal leading-tight">{area.subtitle}</span>
                </div>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-medium ${
                isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
              }`}>
                {area.count}
              </span>
            </button>
          );
        })}

        <div className="text-[11px] font-bold text-slate-400 px-3 pt-4 pb-1.5 uppercase tracking-wider">
          Herramientas OUA
        </div>

        <button
          onClick={() => handleNav('reportes')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
            currentTab === 'reportes'
              ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
              : 'hover:bg-slate-800/80 text-slate-300'
          }`}
        >
          <FileSpreadsheet className="w-4 h-4 text-slate-400" />
          <span>Reportes & Análisis</span>
        </button>

        <button
          onClick={() => handleNav('administracion')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
            currentTab === 'administracion'
              ? 'bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20'
              : 'hover:bg-slate-800/80 text-slate-300'
          }`}
        >
          <Settings className="w-4 h-4 text-slate-400" />
          <span>Configuración & Tarifas</span>
        </button>
      </nav>

      {/* Bottom User Card - Opción de Ingreso y Salir al Inicio */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <div className="p-2.5 bg-slate-800/70 rounded-xl border border-slate-700/60 flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2 overflow-hidden">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-emerald-600 border border-emerald-400/40 flex items-center justify-center text-xs font-bold text-white uppercase shadow-xs shrink-0">
                {currentUser?.avatarInitials || 'CR'}
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white leading-tight truncate">
                  {currentUser?.nombreCompleto || 'Ing. Carlos Ramírez'}
                </p>
                <p className="text-[10px] text-slate-400 truncate">
                  {currentUser?.cargo || 'Sectorista OUA'}
                </p>
              </div>
            </div>

            {onResetDemoData && (
              <button
                onClick={onResetDemoData}
                title="Restablecer Datos Demo"
                className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 transition-colors shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {onLogout && (
            <button
              id="btn-sidebar-salir-inicio"
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-2.5 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 active:bg-red-500/35 text-red-200 border border-red-500/30 text-xs font-semibold transition-all group cursor-pointer"
              title="Salir hacia el inicio de la aplicación"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400 group-hover:scale-105 transition-transform" />
              <span>Salir al inicio</span>
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

