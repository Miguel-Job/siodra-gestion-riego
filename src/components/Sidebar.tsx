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
  LogOut
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
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  onTabChange,
  onOpenPresentacion,
  onResetDemoData,
  currentUser,
  onLogout
}) => {
  const handleNav = (tab: string) => {
    if (onTabChange) onTabChange(tab);
    if (setCurrentTab) setCurrentTab(tab);
  };

  const navAreas = [
    { id: 'gestion', label: 'GESTIÓN', subtitle: 'Padrón, Predios & DUA', count: '4', icon: Users },
    { id: 'operacion', label: 'OPERACIÓN', subtitle: 'Tomas, Red & PDA', count: '3', icon: GitFork },
    { id: 'economia', label: 'ECONOMÍA', subtitle: 'Tarifas & Cobranza', count: '2', icon: CircleDollarSign },
    { id: 'gis', label: 'INFORMACIÓN / GIS', subtitle: 'Catastro Transversal', count: 'GIS', icon: MapPin },
  ];

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800">
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

      {/* Bottom User Card */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <div className="flex items-center justify-between p-2 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-emerald-700/60 border border-emerald-500/30 flex items-center justify-center text-xs font-bold text-white uppercase shadow-xs shrink-0">
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

          <div className="flex items-center gap-1 shrink-0">
            {onResetDemoData && (
              <button
                onClick={onResetDemoData}
                title="Restablecer Datos Demo"
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-700/60 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                title="Cerrar sesión"
                className="p-1.5 rounded-md text-red-400/80 hover:text-red-300 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

