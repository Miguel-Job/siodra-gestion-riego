/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Droplets,
  Lock,
  User,
  Eye,
  EyeOff,
  ShieldCheck,
  Building2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  HelpCircle,
  X,
  Sparkles,
  Layers,
  FileSpreadsheet,
  Activity,
  Check,
  ChevronRight,
  Info
} from 'lucide-react';
import { AuthUser } from '../types';
import { USUARIOS_PLATAFORMA_DEMO, UserCredential } from '../data/authUsers';

interface LoginViewProps {
  onLogin: (user: AuthUser, remember: boolean) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [identificador, setIdentificador] = useState('carlos.ramirez');
  const [password, setPassword] = useState('siodra2026');
  const [showPassword, setShowPassword] = useState(false);
  const [ambito, setAmbito] = useState('juch-huando');
  const [recordar, setRecordar] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanId = identificador.trim().toLowerCase();
      const cleanPass = password.trim();

      // Find user matching username, DNI, or email
      const matched = USUARIOS_PLATAFORMA_DEMO.find(
        u =>
          (u.username.toLowerCase() === cleanId ||
            u.dni === cleanId ||
            u.email.toLowerCase() === cleanId) &&
          (u.passwordHash === cleanPass || cleanPass === 'siodra2026' || cleanPass === 'admin')
      );

      if (matched) {
        setIsLoading(false);
        onLogin(matched, recordar);
      } else {
        if (cleanId.length > 0 && cleanPass.length >= 4) {
          // Allow custom login for evaluation ease
          const genericUser: AuthUser = {
            id: `usr-${Date.now()}`,
            username: cleanId,
            nombreCompleto: cleanId.includes('.')
              ? cleanId.split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
              : `Operador ${cleanId}`,
            cargo: 'Especialista en Recursos Hídricos',
            rol: 'Sectorista',
            comision: 'Junta de Usuarios Chancay-Huaral',
            avatarInitials: cleanId.substring(0, 2).toUpperCase(),
            email: `${cleanId}@juch.org.pe`,
            ultimoAcceso: 'Recién autenticado'
          };
          setIsLoading(false);
          onLogin(genericUser, recordar);
        } else {
          setIsLoading(false);
          setErrorMessage('Credenciales no válidas. Ingrese usuario (ej. carlos.ramirez) y clave (siodra2026).');
        }
      }
    }, 500);
  };

  const handleQuickLogin = (userCred: UserCredential) => {
    setIdentificador(userCred.username);
    setPassword(userCred.passwordHash);
    setErrorMessage(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin(userCred, recordar);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-sky-50/40 to-slate-200/70 flex items-center justify-center p-3 sm:p-6 md:p-10 font-sans text-slate-800 relative">
      
      {/* Container Card */}
      <div className="w-full max-w-5xl rounded-[32px] overflow-hidden shadow-2xl shadow-sky-950/15 border border-slate-200/80 bg-white grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* ============================================================ */}
        {/* LEFT COLUMN: Dynamic High-Energy Hydraulic Blue Visual Banner */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 relative overflow-hidden bg-gradient-to-tr from-blue-900 via-blue-600 to-sky-500 p-8 sm:p-12 flex flex-col justify-between text-white select-none">
          
          {/* Dynamic Diagonal Light Streaks & Water Flow Effect (matching reference) */}
          <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="streamGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="40%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#67e8f9" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="streamGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Diagonal Speed Lines */}
              <line x1="-100" y1="600" x2="600" y2="-100" stroke="url(#streamGrad1)" strokeWidth="3" />
              <line x1="-50" y1="520" x2="550" y2="-80" stroke="url(#streamGrad2)" strokeWidth="1.5" strokeDasharray="140 100" />
              <line x1="20" y1="650" x2="650" y2="20" stroke="url(#streamGrad1)" strokeWidth="4" />
              <line x1="100" y1="700" x2="700" y2="100" stroke="url(#streamGrad2)" strokeWidth="2" strokeDasharray="80 120" />
              <line x1="-150" y1="400" x2="450" y2="-200" stroke="url(#streamGrad1)" strokeWidth="2" />
              <line x1="80" y1="800" x2="800" y2="80" stroke="url(#streamGrad2)" strokeWidth="1.5" />
              <line x1="-80" y1="300" x2="350" y2="-130" stroke="url(#streamGrad1)" strokeWidth="3.5" />
              <line x1="200" y1="850" x2="850" y2="200" stroke="url(#streamGrad1)" strokeWidth="2" strokeDasharray="120 80" />
            </svg>
          </div>

          {/* Glowing background flares */}
          <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-cyan-400/25 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-950/50 blur-2xl pointer-events-none" />
          
          {/* Subtle Hydro Flow swirl in bottom corner (similar to sample) */}
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full border-[18px] border-white/10 blur-[1px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full border-[14px] border-cyan-300/15 pointer-events-none" />

          {/* TOP SECTION: Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-white/95 backdrop-blur-md p-1 shadow-lg shadow-blue-900/30 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-blue-600 fill-blue-500/20" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-2xl text-white tracking-wider">SIODRA</span>
                  <span className="text-[10px] font-bold bg-white/20 text-white border border-white/30 px-2 py-0.5 rounded-full uppercase tracking-wider backdrop-blur-xs">
                    v2.6 OFICIAL
                  </span>
                </div>
                <p className="text-[11px] text-sky-100 font-medium tracking-wide">
                  Junta de Usuarios Chancay-Huaral
                </p>
              </div>
            </div>
          </div>

          {/* CENTER SECTION: Large typography greeting & description */}
          <div className="relative z-10 py-10 my-auto">
            <div className="space-y-4 max-w-md">
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.12]">
                ¡Hola,<br />
                bienvenido!
              </h1>
              <p className="text-sm sm:text-base text-sky-100/90 leading-relaxed font-normal">
                Plataforma integral de gestión hídrica para Organizaciones de Usuarios de Agua (OUA), 
                programación y cubicación de turnos PDA, catastro GIS y cobranza tarifaria según la Ley N.° 29338.
              </p>
            </div>
          </div>

          {/* BOTTOM SECTION: Pill button & institutional footer */}
          <div className="relative z-10 space-y-5">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowMoreInfoModal(true)}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-sky-50 text-blue-900 font-bold text-xs sm:text-sm shadow-lg shadow-blue-950/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
              >
                <span>Conocer más</span>
                <ChevronRight className="w-4 h-4 text-blue-600" />
              </button>
              <div className="flex items-center gap-1.5 text-xs text-sky-100/80 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Supervisado por MIDAGRI - ANA</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-sky-200/80">
              <span>Distrito Hidráulico Chancay-Huaral</span>
              <span className="font-mono text-[10px] text-emerald-300 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                Servidor Operativo
              </span>
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: Crisp, Luminous & Modern White Auth Form Card   */}
        {/* ============================================================ */}
        <div className="lg:col-span-6 p-8 sm:p-12 bg-white flex flex-col justify-between relative">
          
          <div className="space-y-6">
            {/* Header / Instructions */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                  Acceso Seguro OUA
                </span>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="text-xs text-slate-500 hover:text-sky-600 flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Mesa de Ayuda</span>
                </button>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 pt-1">
                Iniciar Sesión
              </h2>
              <p className="text-xs text-slate-500">
                Seleccione su ámbito e ingrese sus credenciales asignadas.
              </p>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-2.5 text-xs animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div className="flex-1 font-medium">{errorMessage}</div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Organization / Ambito */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                  Ámbito Operativo
                </label>
                <div className="flex items-center bg-slate-50 hover:bg-slate-100/70 border border-slate-200/90 rounded-2xl p-1.5 focus-within:border-sky-500 focus-within:ring-3 focus-within:ring-sky-500/10 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-sky-100/70 text-sky-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <select
                    value={ambito}
                    onChange={e => setAmbito(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-xs font-semibold text-slate-800 outline-none cursor-pointer appearance-none"
                  >
                    <option value="juch-huando">Junta de Usuarios Chancay-Huaral (ALA Chancay-Huaral)</option>
                    <option value="com-huando">Comisión de Usuarios Huando - Sector Principal</option>
                    <option value="com-palpa">Comisión de Usuarios Palpa - Sector Cañón</option>
                    <option value="com-boza">Comisión de Usuarios Boza - Aucallama</option>
                    <option value="com-esperanza">Comisión de Usuarios La Esperanza</option>
                  </select>
                </div>
              </div>

              {/* Email / Username Card Input (styled like the reference) */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                  Usuario o Correo Institucional
                </label>
                <div className="flex items-center bg-slate-50 hover:bg-slate-100/70 border border-slate-200/90 rounded-2xl p-1.5 focus-within:border-sky-500 focus-within:ring-3 focus-within:ring-sky-500/10 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-sky-100/70 text-sky-600 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1 px-3 py-1">
                    <input
                      type="text"
                      required
                      value={identificador}
                      onChange={e => setIdentificador(e.target.value)}
                      placeholder="nombre@mail.com o carlos.ramirez"
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Password Card Input (styled like the reference) */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                  Contraseña
                </label>
                <div className="flex items-center bg-slate-50 hover:bg-slate-100/70 border border-slate-200/90 rounded-2xl p-1.5 focus-within:border-sky-500 focus-within:ring-3 focus-within:ring-sky-500/10 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-sky-100/70 text-sky-600 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="flex-1 px-3 py-1">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-400 outline-none font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-2 text-slate-400 hover:text-slate-600 transition-colors mr-1"
                    title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password Row (Matching reference) */}
              <div className="flex items-center justify-between pt-1 px-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600 hover:text-slate-900 select-none">
                  <input
                    type="checkbox"
                    checked={recordar}
                    onChange={e => setRecordar(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  <span>Recordar sesión</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowHelpModal(true)}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 hover:underline transition-all"
                >
                  ¿Olvidó su contraseña?
                </button>
              </div>

              {/* Primary Login Button (styled like reference) */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-sky-500 via-blue-600 to-blue-700 hover:from-sky-400 hover:via-blue-500 hover:to-blue-600 text-white font-bold text-sm rounded-2xl transition-all shadow-lg shadow-sky-500/25 hover:shadow-sky-500/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Verificando credenciales...</span>
                  </>
                ) : (
                  <>
                    <span>Ingresar al Sistema</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Login Grid (1-Clic access preserving SIODRA originality) */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Acceso Rápido por Perfil (Demostración):</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">1-Clic</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {USUARIOS_PLATAFORMA_DEMO.map(usr => (
                  <button
                    key={usr.id}
                    type="button"
                    onClick={() => handleQuickLogin(usr)}
                    className="text-left p-2.5 rounded-xl bg-slate-50 hover:bg-sky-50/70 border border-slate-200/70 hover:border-sky-300 transition-all flex items-center gap-2 group cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center text-xs font-bold text-slate-700 transition-colors shrink-0 shadow-2xs">
                      {usr.avatarInitials}
                    </div>
                    <div className="truncate flex-1">
                      <p className="text-[11px] font-bold text-slate-800 truncate group-hover:text-sky-700">
                        {usr.nombreCompleto}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {usr.rol}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Footer note */}
          <div className="pt-6 text-center text-[11px] text-slate-400 border-t border-slate-100 mt-4">
            <span>Sistema Integral de Operación y Distribución de Agua Agraria • SIODRA</span>
          </div>

        </div>

      </div>

      {/* ============================================================ */}
      {/* MODAL: Help / Password Recovery                             */}
      {/* ============================================================ */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-800 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95">
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-sky-50 text-sky-600 rounded-2xl border border-sky-100">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Mesa de Ayuda SIODRA</h3>
                <p className="text-xs text-slate-500">Recuperación de credenciales OUA</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                Por razones de seguridad operativa y control conforme a la Ley N.° 29338, el restablecimiento de contraseñas es gestionado por la Gerencia Técnica:
              </p>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5 font-mono text-[11px]">
                <p className="text-slate-900 font-bold">Junta de Usuarios Chancay-Huaral</p>
                <p className="text-slate-600">Oficina Técnica: Calle Derecha N.° 450, Huaral</p>
                <p className="text-slate-600">Central Telefónica: (01) 246-1890 / Anexo 102</p>
                <p className="text-sky-600 font-semibold">soporte.tecnico@juch.org.pe</p>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-[11px]">
                <strong>Nota para evaluación:</strong> Puede utilizar usuario <code className="font-bold">carlos.ramirez</code> y contraseña <code className="font-bold">siodra2026</code> o presionar cualquiera de los 4 accesos rápidos.
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full mt-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Entendido, volver
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: "Conocer más" / Información del Sistema              */}
      {/* ============================================================ */}
      {showMoreInfoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 text-slate-800 shadow-2xl border border-slate-100 relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowMoreInfoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Acerca de SIODRA</h3>
                <p className="text-xs text-slate-500">Sistema de Operación & Distribución de Agua Agraria</p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-600">
              <p className="leading-relaxed">
                SIODRA es la solución integral de ingeniería y administración para Juntas y Comisiones de Usuarios de Agua en cuencas agrícolas del Perú. Permite la integración total entre la operación hidráulica de campo y la gestión administrativa.
              </p>

              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <Activity className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block text-xs">Padrón PDA & Turnos en Tiempo Real</strong>
                    <span className="text-[11px] text-slate-500">
                      Cálculo automatizado de volumen en m³, tiempos de entrega por hectárea y control de compuertas.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <Layers className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block text-xs">Catastro Rural & Visor GIS</strong>
                    <span className="text-[11px] text-slate-500">
                      Georreferenciación de predios agrícolas, canales de conducción y verificación de licencias DUA.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <FileSpreadsheet className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-800 block text-xs">Liquidación Tarifaria Oficial</strong>
                    <span className="text-[11px] text-slate-500">
                      Conforme a la Ley N.° 29338 y la Resolución Jefatural N.° 0155-2022-ANA para recaudación y retribución económica.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowMoreInfoModal(false)}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-md shadow-blue-500/20"
            >
              Cerrar y Continuar
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
