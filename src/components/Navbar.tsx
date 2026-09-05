/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  Database,
  Presentation,
  UploadCloud,
  CheckCircle2,
  X,
  Plus,
  Droplets,
  LogOut,
  UserCheck,
  Menu
} from 'lucide-react';
import { Ambito, FichaIntegral360Data, AuthUser } from '../types';
import { AMBITOS_DEMO, USUARIOS_DEMO, PREDIOS_DEMO, DUAS_DEMO, TOMAS_DEMO, getFichaIntegralPorUsuario } from '../data/mockData';

interface NavbarProps {
  currentTab?: string;
  setCurrentTab?: (tab: string) => void;
  selectedAmbito: Ambito;
  setSelectedAmbito?: (ambito: Ambito) => void;
  onSelectAmbito?: (ambito: Ambito) => void;
  onSelectFicha: (ficha: FichaIntegral360Data) => void;
  onOpenImport: () => void;
  onOpenPresentacion: () => void;
  onOpenNuevoTurno?: () => void;
  currentUser?: AuthUser;
  onLogout?: () => void;
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  selectedAmbito,
  setSelectedAmbito,
  onSelectAmbito,
  onSelectFicha,
  onOpenImport,
  onOpenPresentacion,
  onOpenNuevoTurno,
  currentUser,
  onLogout,
  onToggleSidebar
}) => {
  const [ambitoDropdownOpen, setAmbitoDropdownOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const setAmbito = (ambito: Ambito) => {
    if (setSelectedAmbito) setSelectedAmbito(ambito);
    if (onSelectAmbito) onSelectAmbito(ambito);
  };

  // Universal Search matches
  const filteredUsers = searchQuery.trim().length > 1
    ? USUARIOS_DEMO.filter(u =>
        u.nombres.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.apellidos.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.codigoUsuario.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.numeroDocumento.includes(searchQuery)
      )
    : [];

  const filteredPredios = searchQuery.trim().length > 1
    ? PREDIOS_DEMO.filter(p =>
        p.unidadCatastral.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.nombrePredio.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.codigoPredio.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredDuas = searchQuery.trim().length > 1
    ? DUAS_DEMO.filter(d =>
        d.codigoDUA.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.resolucionDirectoral.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredTomas = searchQuery.trim().length > 1
    ? TOMAS_DEMO.filter(t =>
        t.codigoToma.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.nombre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const hasSearchResults = filteredUsers.length > 0 || filteredPredios.length > 0 || filteredDuas.length > 0 || filteredTomas.length > 0;

  const handleSelectUser = (userId: string) => {
    const ficha = getFichaIntegralPorUsuario(userId);
    if (ficha) onSelectFicha(ficha);
    setSearchQuery('');
    setSearchDropdownOpen(false);
  };

  const handleSelectPredio = (predioId: string) => {
    const predio = PREDIOS_DEMO.find(p => p.id === predioId);
    if (predio) {
      const ficha = getFichaIntegralPorUsuario(predio.usuarioId);
      if (ficha) onSelectFicha(ficha);
    }
    setSearchQuery('');
    setSearchDropdownOpen(false);
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-3 sm:px-6 shrink-0 z-30 shadow-xs relative">
      {/* Left controls: Toggle button with bars & Global Search Bar */}
      <div className="flex items-center gap-2 flex-1 max-w-xl">
        {onToggleSidebar && (
          <button
            id="btn-toggle-sidebar-barras"
            onClick={onToggleSidebar}
            className="p-2 -ml-1 sm:ml-0 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 active:bg-slate-200 border border-slate-200/80 sm:border-transparent transition-all focus:outline-none shrink-0"
            title="Despejar o mostrar menú de navegación"
            aria-label="Alternar menú lateral"
          >
            <Menu className="w-5 h-5 text-slate-700" />
          </button>
        )}

        {/* Global Search Bar (Sleek pill style) */}
        <div className="flex-1 relative">
          <div className="relative flex items-center">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setSearchDropdownOpen(true);
              }}
              onFocus={() => setSearchDropdownOpen(true)}
              placeholder="Búsqueda Global (Usuario, UC, DUA, Toma, Conducción...)"
              className="w-full pl-10 pr-9 py-2 bg-slate-100 border border-transparent focus:border-emerald-500/40 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 rounded-full text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-all shadow-xs font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

        {/* Live Universal Search Dropdown */}
        {searchDropdownOpen && searchQuery.trim().length > 1 && (
          <div className="absolute left-0 mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 z-50 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Coincidencias Centralizadas del Sistema</span>
              <button
                onClick={() => setSearchDropdownOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                Cerrar
              </button>
            </div>

            {!hasSearchResults ? (
              <div className="p-4 text-center text-xs text-slate-500 font-medium">
                No se encontraron registros para "{searchQuery}".
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredUsers.length > 0 && (
                  <div className="py-1">
                    <p className="px-2 py-1 text-[10px] font-bold text-emerald-700 uppercase">
                      Usuarios Agrarios
                    </p>
                    {filteredUsers.map(u => (
                      <button
                        key={u.id}
                        onClick={() => handleSelectUser(u.id)}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-emerald-50/80 flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-semibold text-slate-900">{u.nombres} {u.apellidos}</span>
                          <span className="ml-2 text-[11px] text-slate-500 font-mono">{u.codigoUsuario} • {u.numeroDocumento}</span>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                          Ficha 360° →
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {filteredPredios.length > 0 && (
                  <div className="py-1">
                    <p className="px-2 py-1 text-[10px] font-bold text-sky-700 uppercase">
                      Predios & Catastro
                    </p>
                    {filteredPredios.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleSelectPredio(p.id)}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-sky-50/80 flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{p.unidadCatastral}</span>
                          <span className="ml-2 text-[11px] text-slate-600">{p.nombrePredio} ({p.areaBajoRiegoHa} ha)</span>
                        </div>
                        <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-medium">
                          Abrir Predio →
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {filteredDuas.length > 0 && (
                  <div className="py-1">
                    <p className="px-2 py-1 text-[10px] font-bold text-amber-700 uppercase">
                      Derechos DUA (ANA)
                    </p>
                    {filteredDuas.map(d => (
                      <button
                        key={d.id}
                        onClick={() => handleSelectUser(d.usuarioId)}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-amber-50/80 flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-semibold text-slate-900">{d.codigoDUA}</span>
                          <span className="ml-2 text-[11px] text-slate-600">{d.resolucionDirectoral}</span>
                        </div>
                        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-medium">
                          Ver DUA →
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                {filteredTomas.length > 0 && (
                  <div className="py-1">
                    <p className="px-2 py-1 text-[10px] font-bold text-indigo-700 uppercase">
                      Tomas de Entrega
                    </p>
                    {filteredTomas.map(t => (
                      <button
                        key={t.id}
                        onClick={() => {
                          if (setCurrentTab) setCurrentTab('operacion');
                          setSearchDropdownOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-indigo-50/80 flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <span className="font-bold text-slate-900">{t.codigoToma}</span>
                          <span className="ml-2 text-[11px] text-slate-600">{t.nombre} ({t.progresivaKm})</span>
                        </div>
                        <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-medium">
                          Ir a Operación →
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>

      {/* Right Controls & Ambito Information */}
      <div className="flex items-center gap-3 sm:gap-4 ml-4">
        {/* Ambito Selector & Campaign info */}
        <div className="relative">
          <button
            onClick={() => setAmbitoDropdownOpen(!ambitoDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700 transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-900 leading-tight">
                {selectedAmbito.juntaNombre}
              </p>
              <p className="text-[10px] text-slate-500 leading-tight">
                Sector: {selectedAmbito.sectorHidraulico} | Campaña 2026-I
              </p>
            </div>
            <div className="sm:hidden font-bold text-xs text-slate-800">
              {selectedAmbito.sectorHidraulico}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </button>

          {ambitoDropdownOpen && (
            <div className="absolute right-0 mt-1.5 w-76 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-800">Ámbito Operativo OUA</p>
                <p className="text-[10px] text-slate-500">Junta de Usuarios Chancay-Huaral (ALA Chancay-Huaral)</p>
              </div>
              <div className="space-y-1">
                {AMBITOS_DEMO.map(ambito => (
                  <button
                    key={ambito.id}
                    onClick={() => {
                      setAmbito(ambito);
                      setAmbitoDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                      selectedAmbito.id === ambito.id
                        ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200/60'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{ambito.comisionNombre}</p>
                      <p className="text-[10px] text-slate-500">
                        {ambito.sectorHidraulico} • {ambito.superficieBajoRiegoHa} ha
                      </p>
                    </div>
                    {selectedAmbito.id === ambito.id && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Notifications Icon Button */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200/80 flex items-center justify-center border border-slate-200 cursor-pointer relative transition-colors"
            title="Alertas operativas"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl border border-slate-200 shadow-xl p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                <span className="font-bold text-slate-800">Alertas del Sistema</span>
                <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded-full font-bold">2 nuevas</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                  <p className="font-semibold text-emerald-900">Apertura Toma Lateral TL-003</p>
                  <p className="text-[10px] text-emerald-700">Turno #14 en curso a 120 L/s.</p>
                </div>
                <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">
                  <p className="font-semibold text-amber-900">Aforo Boca Toma Principal</p>
                  <p className="text-[10px] text-amber-700">Caudal derivado verificado al 98.4%.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Current User Profile & Logout - Opciones de ingreso y salir al inicio */}
        {currentUser && (
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <button
                id="btn-navbar-usuario"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-xl bg-slate-100 hover:bg-slate-200/70 border border-slate-200 transition-colors text-left cursor-pointer"
                title="Usuario activo - Opciones de ingreso"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shadow-xs shrink-0">
                  {currentUser.avatarInitials}
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {currentUser.nombreCompleto}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {currentUser.cargo}
                  </p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl border border-slate-200 shadow-xl p-3 z-50 text-xs animate-in fade-in zoom-in-95">
                  <div className="pb-2 border-b border-slate-100 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        {currentUser.avatarInitials}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-bold text-slate-900 truncate">{currentUser.nombreCompleto}</p>
                        <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-600">
                      <span>Rol:</span>
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {currentUser.rol}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="px-2 py-1.5 text-[11px] text-slate-500 bg-slate-50 rounded-lg">
                      <span>Comisión: </span>
                      <strong className="text-slate-800 font-semibold">{currentUser.comision}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botón directo para salir al inicio de la aplicación */}
            {onLogout && (
              <button
                id="btn-navbar-salir-directo"
                onClick={onLogout}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-700 border border-red-200 text-xs font-bold transition-all shadow-2xs shrink-0 cursor-pointer"
                title="Salir hacia el inicio de la aplicación"
              >
                <LogOut className="w-3.5 h-3.5 text-red-600" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

