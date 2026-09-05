/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import {
  MapPin,
  Layers,
  Maximize2,
  Minimize2,
  ExternalLink,
  Droplet,
  Compass,
  CheckSquare,
  Square
} from 'lucide-react';
import {
  Ambito,
  FichaIntegral360Data,
  PredioCatastral,
  TomaEntrega,
  ConduccionCanal
} from '../types';
import {
  PREDIOS_DEMO,
  TOMAS_DEMO,
  CONDUCCIONES_DEMO,
  INFRAESTRUCTURA_DEMO,
  USUARIOS_DEMO,
  DUAS_DEMO,
  CULTIVOS_DEMO,
  getFichaIntegralPorUsuario,
  getFichaIntegralPorPredio,
  FICHA_INTEGRAL_DEMO
} from '../data/mockData';

interface GisViewProps {
  selectedAmbito: Ambito;
  selectedFicha?: FichaIntegral360Data;
  onSelectFicha: (ficha: FichaIntegral360Data) => void;
  onOpenFichaModal: () => void;
}

export const GisView: React.FC<GisViewProps> = ({
  selectedAmbito,
  selectedFicha: propSelectedFicha,
  onSelectFicha,
  onOpenFichaModal
}) => {
  const selectedFicha = propSelectedFicha || FICHA_INTEGRAL_DEMO;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const [activeLayers, setActiveLayers] = useState({
    canales: true,
    tomas: true,
    predios: true,
    obrasArte: true
  });

  const [baseMap, setBaseMap] = useState<'osm' | 'satellite' | 'dark'>('satellite');

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Default center in Huaral / Chancay Valley (lat: -11.518, lng: -77.234)
    const map = L.map(mapContainerRef.current, {
      center: [-11.518, -77.234],
      zoom: 14,
      zoomControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Basemaps
    let tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    let attribution = '&copy; Esri World Imagery';

    if (baseMap === 'osm') {
      tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}.png';
      attribution = '&copy; OpenStreetMap contributors';
    } else if (baseMap === 'dark') {
      tileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      attribution = '&copy; CartoDB Dark';
    }

    L.tileLayer(tileUrl, {
      attribution,
      maxZoom: 18
    }).addTo(map);

    // Layer: Canales (LineStrings)
    if (activeLayers.canales) {
      CONDUCCIONES_DEMO.forEach(canal => {
        if (canal.coordenadasRuta) {
          const polyline = L.polyline(canal.coordenadasRuta as [number, number][], {
            color: canal.codigo === 'CD-001' ? '#38bdf8' : '#0284c7',
            weight: canal.codigo === 'CD-001' ? 4 : 3,
            dashArray: canal.jerarquia === 'Sublateral' ? '4, 4' : undefined
          }).addTo(map);

          polyline.bindTooltip(`<b>${canal.codigo}</b><br/>${canal.nombre}`, { sticky: true });
        }
      });
    }

    // Layer: Predios Catastrales (Polygons)
    if (activeLayers.predios) {
      PREDIOS_DEMO.forEach(predio => {
        if (predio.geoJsonGeometry) {
          const latLngs = predio.geoJsonGeometry.coordinates[0].map(coord => [coord[1], coord[0]] as [number, number]);
          const cultivo = CULTIVOS_DEMO.find(c => c.id === predio.cultivoId);
          const isSelected = selectedFicha.predio.id === predio.id;

          const polygon = L.polygon(latLngs, {
            color: isSelected ? '#38bdf8' : (cultivo?.colorHex || '#10b981'),
            weight: isSelected ? 3 : 2,
            fillColor: cultivo?.colorHex || '#10b981',
            fillOpacity: isSelected ? 0.45 : 0.25
          }).addTo(map);

          polygon.on('click', () => {
            const ficha = getFichaIntegralPorPredio(predio.id);
            if (ficha) onSelectFicha(ficha);
          });

          polygon.bindTooltip(
            `<b>${predio.unidadCatastral}</b><br/>${predio.nombrePredio}<br/>${cultivo?.nombre} (${predio.areaBajoRiegoHa} ha)`,
            { sticky: true }
          );
        }
      });
    }

    // Layer: Tomas (Point Markers)
    if (activeLayers.tomas) {
      TOMAS_DEMO.forEach(toma => {
        const marker = L.circleMarker(toma.latLng, {
          radius: 7,
          fillColor: '#0284c7',
          color: '#ffffff',
          weight: 2,
          fillOpacity: 0.95
        }).addTo(map);

        marker.on('click', () => {
          if (toma.prediosAtendidosIds.length > 0) {
            const ficha = getFichaIntegralPorPredio(toma.prediosAtendidosIds[0]);
            if (ficha) onSelectFicha(ficha);
          }
        });

        marker.bindTooltip(`<b>Toma: ${toma.codigoToma}</b><br/>${toma.nombre}`, { sticky: true });
      });
    }

    // Layer: Obras de Arte
    if (activeLayers.obrasArte) {
      INFRAESTRUCTURA_DEMO.forEach(inf => {
        const marker = L.circleMarker(inf.latLng, {
          radius: 9,
          fillColor: '#f59e0b',
          color: '#ffffff',
          weight: 2,
          fillOpacity: 1
        }).addTo(map);

        marker.bindTooltip(`<b>${inf.codigo}</b>: ${inf.nombre}`, { sticky: true });
      });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [baseMap, activeLayers, selectedFicha.predio.id]);

  const toggleLayer = (layerName: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layerName]: !prev[layerName] }));
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-xs">
              4
            </span>
            <h1 className="text-xl font-bold text-slate-900">
              Área Funcional 4: GIS & Catastro Transversal
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            "Seleccionar un elemento espacial abre instantáneamente toda su información relacionada sin cambiar de pantalla"
          </p>
        </div>

        {/* Spatial projection info */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-2xl bg-slate-100 text-slate-700 border border-slate-200">
            Datum: WGS84 • Proyección: UTM Zona 18 Sur
          </span>
        </div>
      </div>

      {/* Main Split: GIS Viewer + Instant Context Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Map Column (~68%) */}
        <div className="lg:col-span-8 bg-white p-3 rounded-3xl border border-slate-200/80 shadow-2xs space-y-3">
          {/* Map Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 pt-1 text-xs">
            {/* Basemap Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl font-medium">
              <button
                onClick={() => setBaseMap('satellite')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  baseMap === 'satellite' ? 'bg-white shadow-2xs text-slate-900 font-semibold' : 'text-slate-500'
                }`}
              >
                Satélite
              </button>
              <button
                onClick={() => setBaseMap('osm')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  baseMap === 'osm' ? 'bg-white shadow-2xs text-slate-900 font-semibold' : 'text-slate-500'
                }`}
              >
                Topográfico / OSM
              </button>
              <button
                onClick={() => setBaseMap('dark')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  baseMap === 'dark' ? 'bg-white shadow-2xs text-slate-900 font-semibold' : 'text-slate-500'
                }`}
              >
                PostGIS Dark
              </button>
            </div>

            {/* Layer Checkboxes */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => toggleLayer('canales')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                  activeLayers.canales ? 'bg-sky-50 text-sky-800 border-sky-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                Canales
              </button>
              <button
                onClick={() => toggleLayer('tomas')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                  activeLayers.tomas ? 'bg-cyan-50 text-cyan-800 border-cyan-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                Tomas
              </button>
              <button
                onClick={() => toggleLayer('predios')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                  activeLayers.predios ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                Predios (UC)
              </button>
              <button
                onClick={() => toggleLayer('obrasArte')}
                className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                  activeLayers.obrasArte ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}
              >
                Obras de Arte
              </button>
            </div>
          </div>

          {/* Leaflet Map Canvas */}
          <div className="h-[520px] w-full rounded-2xl overflow-hidden border border-slate-200 relative z-10">
            <div ref={mapContainerRef} className="w-full h-full" />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 px-2 font-medium">
            <span>Haga clic en cualquier predio o toma del mapa para ver sus datos técnicos y legales al instante.</span>
            <span className="font-mono text-slate-700">Canal CD-001 (Chancay) • Lat: -11.518, Lng: -77.234</span>
          </div>
        </div>

        {/* Right Side: Context Panel (Ficha Relacional Vinculada al Mapa) (~32%) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">
                Elemento Seleccionado en GIS
              </span>
              <h3 className="font-bold text-base text-slate-900">
                {selectedFicha.predio.unidadCatastral}
              </h3>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              {selectedFicha.predio.estadoCobranza}
            </span>
          </div>

          {/* Quick Details List */}
          <div className="space-y-2.5 text-xs text-slate-600">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                USUARIO TITULAR
              </span>
              <p className="font-bold text-slate-900 text-sm mt-0.5">
                {selectedFicha.usuario.nombres} {selectedFicha.usuario.apellidos}
              </p>
              <p className="text-[11px] text-slate-500 font-mono">
                {selectedFicha.usuario.tipoDocumento}: {selectedFicha.usuario.numeroDocumento}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                DERECHO HÍDRICO (DUA)
              </span>
              <p className="font-bold text-slate-900 mt-0.5">
                {selectedFicha.dua.codigoDUA} • {selectedFicha.dua.resolucionDirectoral}
              </p>
              <p className="text-[11px] text-slate-500">
                Volumen: <strong className="text-slate-800">{selectedFicha.dua.volumenAnualAsignadoM3.toLocaleString()} m³/año</strong>
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                CULTIVO & ÁREA
              </span>
              <p className="font-bold text-slate-900 mt-0.5">
                {selectedFicha.cultivo.nombre} {selectedFicha.cultivo.variedad}
              </p>
              <p className="text-[11px] text-slate-500">
                Área Bajo Riego: <strong className="text-slate-800">{selectedFicha.predio.areaBajoRiegoHa} ha</strong> (Total: {selectedFicha.predio.areaTotalHa} ha)
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                TOMA & CONDUCCIÓN DE ENTREGA
              </span>
              <p className="font-bold text-slate-900 mt-0.5">
                {selectedFicha.toma.codigoToma} — {selectedFicha.toma.nombre}
              </p>
              <p className="text-[11px] text-slate-500">
                {selectedFicha.conduccion.nombre} ({selectedFicha.toma.progresivaKm})
              </p>
            </div>
          </div>

          <button
            onClick={onOpenFichaModal}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-2xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <span>Abrir Ficha 360° Integral</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
