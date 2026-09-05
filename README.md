# SIODRA — Sistema Integrado de Operación y Distribución de Recursos Hídricos Agrarios

Plataforma técnica e integral diseñada para Organizaciones de Usuarios de Agua (Juntas de Usuarios, Comisiones y Comités de Regantes) del Perú, en estricto cumplimiento de la **Ley N.° 29338 (Ley de Recursos Hídricos)**, el **D.S. N.° 020-2025-MIDAGRI** (Reglamento de Operadores de Infraestructura Hidráulica) y la **Ley N.° 31801**.

---

## 🌟 Características Principales

### 1. Gestión OUA (Área Funcional 1)
- **Padrón Oficial de Usuarios**: Gestión de usuarios agrarios, titulares y delegados con DNI/RUC y datos de contacto.
- **Predios y Unidades Catastrales (UC)**: Registro de superficie total, área bajo riego y puntos de entrega (tomas).
- **Derechos de Uso de Agua (DUA)**: Control de licencias y permisos otorgados por la ANA con volumen anual asignado y saldos en campaña.
- **Cultivos y Demanda Hídrica**: Módulos de riego ($L/s/ha$), Kc y demanda proyectada ($m^3/ha$).

### 2. Operación Hidráulica & PDA (Área Funcional 2)
- **Programa de Distribución de Agua (PDA)**: Rol operativo con vistas en **Calendario Semanal Dinámico**, **Tabla Filtrable** y **Línea de Tiempo Operativa**.
- **Regla de Riego Semanal OUA**: Control estricto de frecuencia de 1 turno por usuario por semana, con alertas preventivas y módulo de reprogramación autorizada.
- **Cubicación Exacta**: Cálculo en tiempo real del volumen derivado mediante la fórmula hidráulica:
  $$V = Q \times t \times 3.6$$
  *(donde $Q$ en $L/s$, $t$ en horas y $V$ en $m^3$)*.
- **Catálogo de Infraestructura**: Registro jerárquico de canales de conducción (principales, laterales, sublaterales), tomas de entrega con porcentaje de apertura y obras de arte (aforadores Parshall, desarenadores, compuertas).

### 3. Economía y Finanzas OUA (Área Funcional 3)
- **Diferenciación Normativa**: Separación estricta entre **Tarifa de Operación y Mantenimiento (O&M)** (ingreso de la OUA) y **Retribución Económica** (recaudada para la ANA).
- **Módulo de Cobranza y Recibos**: Emisión y control de recibos por consumo volumétrico y superficie.
- **Control de Morosidad**: Semaforización por niveles de retraso en pagos.

### 4. Información, Catastro GIS y Ficha 360° (Área Funcional 4)
- **Ficha Integral 360°**: Vista holística bidireccional que conecta en una sola pantalla: Usuario $\leftrightarrow$ Predio (UC) $\leftrightarrow$ Licencia DUA $\leftrightarrow$ Toma $\leftrightarrow$ Turnos PDA $\leftrightarrow$ Recibos $\leftrightarrow$ Mapa GIS.
- **Visor GIS Transversal**: Capas satelitales y vectoriales interactivas con polígonos de predios catastrales, trazo de canales principales/laterales y marcadores de tomas de agua georreferenciadas.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React 19 + TypeScript
- **Estilos**: Tailwind CSS v4
- **Cartografía / GIS**: Leaflet + React Leaflet
- **Animaciones**: Motion
- **Iconografía**: Lucide React
- **Herramienta de Construcción**: Vite

---

## 🚀 Instalación y Despliegue Local

### Requisitos previos
- Node.js (versión 18 o superior)
- npm o pnpm

### Pasos

1. Clonar el repositorio:
```bash
git clone https://github.com/TU-USUARIO/SIODRA.git
cd SIODRA
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar el servidor de desarrollo:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

4. Construir para producción:
```bash
npm run build
```

---

## 📜 Cumplimiento Normativo Peruano

| Norma Peruana | Disposición / Artículo | Implementación en SIODRA |
|---|---|---|
| **Ley N.° 29338** | Art. 91 (Retribución económica por uso de agua) | Recaudación diferenciada de tarifas; custodia para la ANA sin considerarla ingreso propio. |
| **D.S. N.° 020-2025-MIDAGRI** | Operadores de Infraestructura Hidráulica | Registro obligatorio del PDA, aforo en tomas y balance volumétrico en $m^3$. |
| **Ley N.° 31801** | Organizaciones de Usuarios de Agua | Estructura jerárquica (Junta $\rightarrow$ Comisión $\rightarrow$ Comité $\rightarrow$ Sector) y padrón electoral/operativo. |
| **R.J. N.° 0155-2022-ANA** | Metodología de tarifas agrarias | Motor dinámico de cálculo de cuotas por tarifa de monitoreo y O&M. |

---

## 📄 Licencia
Este proyecto está bajo la Licencia Apache 2.0.
