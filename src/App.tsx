/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { GestionView } from './components/GestionView';
import { OperacionView } from './components/OperacionView';
import { EconomiaView } from './components/EconomiaView';
import { GisView } from './components/GisView';
import { ReportesView } from './components/ReportesView';
import { AdministracionView } from './components/AdministracionView';

import { Ficha360Modal } from './components/Ficha360Modal';
import { TurnoModal } from './components/TurnoModal';
import { ImportModal } from './components/ImportModal';
import { PresentacionModal } from './components/PresentacionModal';
import { LoginView } from './components/LoginView';

import {
  Ambito,
  FichaIntegral360Data,
  DistribucionTurnoPDA,
  AuthUser
} from './types';
import {
  AMBITOS_DEMO,
  FICHA_INTEGRAL_DEMO,
  DISTRIBUCION_TURNOS_DEMO,
  getFichaIntegralPorUsuario,
  getFichaIntegralPorPredio
} from './data/mockData';
import { DEFAULT_USER } from './data/authUsers';
import { CheckCircle2, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem('siodra_session_user') || sessionStorage.getItem('siodra_session_user');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error restoring session:', e);
    }
    // Start at login screen
    return null;
  });

  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedAmbito, setSelectedAmbito] = useState<Ambito>(AMBITOS_DEMO[0]);
  const [selectedFicha, setSelectedFicha] = useState<FichaIntegral360Data>(FICHA_INTEGRAL_DEMO);
  const [turnos, setTurnos] = useState<DistribucionTurnoPDA[]>(DISTRIBUCION_TURNOS_DEMO);

  // Modals state
  const [isFichaModalOpen, setIsFichaModalOpen] = useState(false);
  const [isNuevoTurnoModalOpen, setIsNuevoTurnoModalOpen] = useState(false);
  const [turnoModalParams, setTurnoModalParams] = useState<{ usuarioId?: string; fecha?: string }>({});
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isPresentacionModalOpen, setIsPresentacionModalOpen] = useState(false);

  // Notifications banner
  const [notificacion, setNotificacion] = useState<string | null>(null);

  // Responsive sidebar toggles (despejar / abrir barra azul)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(true);

  const handleToggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobileSidebarOpen(prev => !prev);
    } else {
      setIsDesktopSidebarVisible(prev => !prev);
    }
  };

  const mostrarNotificacion = (mensaje: string) => {
    setNotificacion(mensaje);
    setTimeout(() => {
      setNotificacion(null);
    }, 4000);
  };

  const handleAbrirTurnoModal = (usuarioId?: string, fecha?: string) => {
    setTurnoModalParams({ usuarioId, fecha });
    setIsNuevoTurnoModalOpen(true);
  };

  const handleLogin = (user: AuthUser, remember: boolean) => {
    setCurrentUser(user);
    try {
      if (remember) {
        localStorage.setItem('siodra_session_user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('siodra_session_user', JSON.stringify(user));
      }
    } catch (e) {
      console.error('Error saving session:', e);
    }
    mostrarNotificacion(`Bienvenido a SIODRA, ${user.nombreCompleto}.`);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('siodra_session_user');
      sessionStorage.removeItem('siodra_session_user');
    } catch (e) {
      console.error('Error clearing session:', e);
    }
    mostrarNotificacion('Sesión cerrada con éxito. Hasta pronto.');
  };

  const handleGuardarTurno = (nuevoTurno: DistribucionTurnoPDA, turnoReemplazadoId?: string) => {
    if (turnoReemplazadoId) {
      setTurnos(prev => [nuevoTurno, ...prev.filter(t => t.id !== turnoReemplazadoId)]);
      mostrarNotificacion(`Turno semanal reprogramado con éxito (Turno #${nuevoTurno.numeroTurno}, ${nuevoTurno.volumenM3} m³).`);
    } else {
      setTurnos(prev => [nuevoTurno, ...prev]);
      mostrarNotificacion(`Turno semanal #${nuevoTurno.numeroTurno} programado con éxito (${nuevoTurno.volumenM3} m³ cubicados).`);
    }
  };

  const handleUpdateTurnoEstado = (turnoId: string, nuevoEstado: any) => {
    setTurnos(prev =>
      prev.map(t => (t.id === turnoId ? { ...t, estado: nuevoEstado } : t))
    );
    mostrarNotificacion(`Estado de turno actualizado a "${nuevoEstado}".`);
  };

  const handleConfirmImport = () => {
    mostrarNotificacion('¡Importación masiva completada! 4 usuarios y predios incorporados al padrón.');
  };

  const handleExecuteTestFlowStep = (stepNumber: number) => {
    if (stepNumber <= 5) {
      setCurrentTab('gestion');
    } else if (stepNumber <= 9) {
      setCurrentTab('operacion');
    } else {
      setCurrentTab('gis');
    }
    mostrarNotificacion(`Flujo de prueba: Paso ${stepNumber} seleccionado para verificación.`);
  };

  if (!currentUser) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white">
      {/* Top Universal Navbar */}
      <Navbar
        selectedAmbito={selectedAmbito}
        onSelectAmbito={setSelectedAmbito}
        currentUser={currentUser}
        onLogout={handleLogout}
        onToggleSidebar={handleToggleSidebar}
        onSelectFicha={(ficha) => {
          setSelectedFicha(ficha);
          setIsFichaModalOpen(true);
        }}
        onOpenNuevoTurno={() => setIsNuevoTurnoModalOpen(true)}
        onOpenImport={() => setIsImportModalOpen(true)}
        onOpenPresentacion={() => setIsPresentacionModalOpen(true)}
      />

      {/* Main Layout Area: Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile backdrop overlay to close/despejar sidebar when tapping outside */}
        {isMobileSidebarOpen && (
          <div
            id="sidebar-mobile-backdrop"
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 md:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Left Sidebar Navigation (Franja azul colapsable / desplegable) */}
        <Sidebar
          currentTab={currentTab}
          onTabChange={(tab) => {
            setCurrentTab(tab);
            setIsMobileSidebarOpen(false);
          }}
          currentUser={currentUser}
          onLogout={handleLogout}
          onOpenPresentacion={() => setIsPresentacionModalOpen(true)}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
          isDesktopVisible={isDesktopSidebarVisible}
        />

        {/* Center Scrollable Work Area */}
        <main className="flex-1 overflow-y-auto p-3.5 sm:p-5 md:p-6 lg:p-7 max-w-7xl mx-auto w-full min-w-0 space-y-4 sm:space-y-5">
          {/* Notification Toast */}
          {notificacion && (
            <div className="p-3.5 bg-emerald-900 text-white rounded-2xl flex items-center justify-between shadow-lg animate-in fade-in slide-in-from-top-2 text-xs font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{notificacion}</span>
              </div>
              <button
                onClick={() => setNotificacion(null)}
                className="text-white/70 hover:text-white font-bold text-xs"
              >
                Cerrar
              </button>
            </div>
          )}

          {/* Quick Context Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs py-1">
            <div className="flex items-center gap-2 text-slate-500">
              <span className="font-semibold text-slate-700">Ámbito Operativo Activo:</span>
              <span className="font-mono bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 text-slate-800 font-bold">
                {selectedAmbito.juntaNombre} • {selectedAmbito.comisionNombre}
              </span>
              <span className="hidden sm:inline text-slate-400">|</span>
              <span className="hidden sm:inline text-slate-500">Campaña Agrícola 2026-I</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPresentacionModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200/80 font-bold text-[11px] transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                <span>Memoria Técnica & Criterios Operativos (20/20)</span>
              </button>

              <button
                onClick={() => setIsFichaModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-[11px] transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Ficha 360° Activa: {selectedFicha.predio.unidadCatastral}</span>
              </button>
            </div>
          </div>

          {/* Render Views based on Tab */}
          {currentTab === 'dashboard' && (
            <DashboardView
              selectedAmbito={selectedAmbito}
              selectedFicha={selectedFicha}
              turnos={turnos}
              onNavigate={setCurrentTab}
              currentUser={currentUser}
              onSelectFicha={(f) => {
                if (f) {
                  setSelectedFicha(f);
                  setIsFichaModalOpen(true);
                }
              }}
              onOpenNuevoTurno={() => setIsNuevoTurnoModalOpen(true)}
              onOpenVisorGisCompleto={() => setCurrentTab('gis')}
              onOpenFichaModal={() => setIsFichaModalOpen(true)}
            />
          )}

          {currentTab === 'gestion' && (
            <GestionView
              selectedAmbito={selectedAmbito}
              turnos={turnos}
              onPedirTurnoUsuario={handleAbrirTurnoModal}
              onSelectFicha={(f) => {
                setSelectedFicha(f);
                setIsFichaModalOpen(true);
              }}
              onOpenFichaModal={() => setIsFichaModalOpen(true)}
            />
          )}

          {currentTab === 'operacion' && (
            <OperacionView
              selectedAmbito={selectedAmbito}
              turnos={turnos}
              onOpenNuevoTurno={handleAbrirTurnoModal}
              onSelectFicha={(f) => {
                setSelectedFicha(f);
                setIsFichaModalOpen(true);
              }}
              onOpenFichaModal={() => setIsFichaModalOpen(true)}
              onUpdateTurnoEstado={handleUpdateTurnoEstado}
            />
          )}

          {currentTab === 'economia' && (
            <EconomiaView
              selectedAmbito={selectedAmbito}
              onSelectFicha={(f) => {
                setSelectedFicha(f);
                setIsFichaModalOpen(true);
              }}
              onOpenFichaModal={() => setIsFichaModalOpen(true)}
            />
          )}

          {currentTab === 'gis' && (
            <GisView
              selectedAmbito={selectedAmbito}
              selectedFicha={selectedFicha}
              onSelectFicha={setSelectedFicha}
              onOpenFichaModal={() => setIsFichaModalOpen(true)}
            />
          )}

          {currentTab === 'reportes' && (
            <ReportesView selectedAmbito={selectedAmbito} />
          )}

          {currentTab === 'administracion' && (
            <AdministracionView selectedAmbito={selectedAmbito} />
          )}
        </main>
      </div>

      {/* Flagship Modals */}
      {isFichaModalOpen && (
        <Ficha360Modal
          ficha={selectedFicha}
          onClose={() => setIsFichaModalOpen(false)}
        />
      )}

      {isNuevoTurnoModalOpen && (
        <TurnoModal
          onClose={() => {
            setIsNuevoTurnoModalOpen(false);
            setTurnoModalParams({});
          }}
          onGuardarTurno={handleGuardarTurno}
          turnos={turnos}
          initialUsuarioId={turnoModalParams.usuarioId}
          initialFecha={turnoModalParams.fecha}
        />
      )}

      {isImportModalOpen && (
        <ImportModal
          onClose={() => setIsImportModalOpen(false)}
          onConfirmImport={handleConfirmImport}
        />
      )}

      {isPresentacionModalOpen && (
        <PresentacionModal
          onClose={() => setIsPresentacionModalOpen(false)}
          onExecuteTestFlowStep={handleExecuteTestFlowStep}
        />
      )}
    </div>
  );
}
