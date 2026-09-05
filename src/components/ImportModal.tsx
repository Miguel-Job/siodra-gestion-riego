/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Download,
  FileCheck,
  Check
} from 'lucide-react';

interface ImportModalProps {
  onClose: () => void;
  onConfirmImport: () => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({ onClose, onConfirmImport }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedFormat, setSelectedFormat] = useState<'excel' | 'csv' | 'geojson'>('excel');
  const [importType, setImportType] = useState<'usuarios' | 'predios' | 'tomas'>('usuarios');

  // Simulated validated rows
  const simulatedRows = [
    { dni: '45892134', nombres: 'Carlos Mendoza Ramos', uc: 'UC-04825', area: 12.4, status: 'valid' },
    { dni: '71239845', nombres: 'Rosa Villavicencio Paz', uc: 'UC-04826', area: 8.5, status: 'valid' },
    { dni: '10982341', nombres: 'Humberto Silva Cruz', uc: 'UC-04827', area: 15.0, status: 'valid' },
    { dni: '43901287', nombres: 'Elena Palomino Soto', uc: 'UC-04828', area: 6.2, status: 'valid' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Asistente de Importación Masiva & Validación
            </h3>
            <p className="text-xs text-slate-500">
              Flujo de 5 pasos: Cargar → Vista previa → Validar → Verificar consistencia → Importar
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Progress Bar */}
        <div className="flex items-center justify-between text-xs font-semibold px-2">
          {[
            { num: 1, label: 'Cargar Archivo' },
            { num: 2, label: 'Vista Previa' },
            { num: 3, label: 'Validar Reglas' },
            { num: 4, label: 'Consistencia' },
            { num: 5, label: 'Confirmar' }
          ].map(s => (
            <div key={s.num} className="flex flex-col items-center gap-1">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step >= s.num ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}
              >
                {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span className={`text-[10px] hidden sm:inline ${step >= s.num ? 'text-slate-800' : 'text-slate-400'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* STEP 1: Cargar Archivo */}
        {step === 1 && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Entidad a Importar</label>
                <select
                  value={importType}
                  onChange={e => setImportType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200"
                >
                  <option value="usuarios">Padrón de Usuarios OUA</option>
                  <option value="predios">Catastro Predial & UC</option>
                  <option value="tomas">Red de Tomas & Compuertas</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Formato</label>
                <div className="flex items-center gap-2">
                  {(['excel', 'csv', 'geojson'] as const).map(fmt => (
                    <button
                      key={fmt}
                      type="button"
                      onClick={() => setSelectedFormat(fmt)}
                      className={`px-3 py-1.5 rounded-xl border text-[11px] font-semibold uppercase ${
                        selectedFormat === fmt ? 'bg-sky-50 text-sky-800 border-sky-300' : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Drag and Drop Zone */}
            <div
              onClick={() => setStep(2)}
              className="border-2 border-dashed border-sky-300 bg-sky-50/40 hover:bg-sky-50/80 rounded-2xl p-8 text-center cursor-pointer transition-colors space-y-2"
            >
              <Upload className="w-8 h-8 text-sky-600 mx-auto" />
              <p className="font-bold text-slate-800 text-sm">
                Arrastre aquí su archivo {selectedFormat.toUpperCase()} o haga clic para seleccionar
              </p>
              <p className="text-[11px] text-slate-500">
                Archivo de prueba: padron_usuarios_chancay_2026.xlsx (Simulado)
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => alert('Descargando plantilla oficial de importación SIODRA...')}
                className="flex items-center gap-1.5 text-sky-700 hover:text-sky-800 font-semibold text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Descargar Plantilla Oficial (.xlsx)</span>
              </button>
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800"
              >
                Continuar a Vista Previa
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Vista Previa */}
        {step === 2 && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800">
                Vista previa de archivo: <span className="font-mono text-sky-800">padron_usuarios_chancay_2026.xlsx</span>
              </span>
              <span className="text-slate-500">4 registros detectados</span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2">DNI</th>
                    <th className="p-2">NOMBRES Y APELLIDOS</th>
                    <th className="p-2">UNIDAD CATASTRAL</th>
                    <th className="p-2">ÁREA (ha)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {simulatedRows.map((r, i) => (
                    <tr key={i}>
                      <td className="p-2 font-mono">{r.dni}</td>
                      <td className="p-2 font-medium">{r.nombres}</td>
                      <td className="p-2 font-mono font-bold">{r.uc}</td>
                      <td className="p-2 font-bold">{r.area} ha</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
              >
                Atrás
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800"
              >
                Validar Reglas de Negocio
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 & 4: Validar Reglas & Consistencia */}
        {(step === 3 || step === 4) && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Validación de Consistencia Completada (0 Errores)</span>
              </div>
              <ul className="space-y-1 text-emerald-800 list-disc pl-5 text-[11px]">
                <li>Formato de DNI validado (8 dígitos numéricos válidos en RENIEC).</li>
                <li>Unidades Catastrales sin duplicados en el padrón nacional del MIDAGRI.</li>
                <li>Áreas bajo riego positivas (&gt; 0 ha) y dentro del polígono del sector hidráulico.</li>
                <li>Tomas de entrega vinculadas existen en la infraestructura de la OUA.</li>
              </ul>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
              >
                Atrás
              </button>
              <button
                onClick={() => setStep(5)}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800"
              >
                Proceder a Confirmar
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Confirmar e Importar */}
        {step === 5 && (
          <div className="space-y-4 text-xs text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <FileCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 text-base">
              ¿Confirmar importación de 4 registros al Padrón Oficial?
            </h4>
            <p className="text-slate-500 max-w-sm mx-auto">
              Los datos se relacionarán automáticamente con sus predios, derechos de agua y puntos de entrega hidráulicos.
            </p>

            <div className="flex justify-center gap-3 pt-3">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onConfirmImport();
                  onClose();
                }}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-xs transition-colors"
              >
                Confirmar & Guardar en Base de Datos
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
