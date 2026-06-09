"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cities, cityNames } from "@/lib/data/cities";
import { getTransport } from "@/lib/data/transport";

type LeafletLayer = {
  addTo: (map: LeafletMap) => LeafletLayer;
};

type LeafletMap = {
  removeLayer: (layer: LeafletLayer) => void;
};

type LeafletMarker = LeafletLayer & {
  setStyle: (style: Record<string, unknown>) => void;
  setRadius: (radius: number) => void;
  on: (event: "click", handler: () => void) => void;
};

type LeafletApi = {
  map: (element: HTMLElement, options: Record<string, unknown>) => LeafletMap;
  tileLayer: (url: string, options?: Record<string, unknown>) => LeafletLayer;
  geoJSON: (data: unknown, options: Record<string, unknown>) => LeafletLayer;
  circleMarker: (coordinates: [number, number], options: Record<string, unknown>) => LeafletMarker;
  marker: (coordinates: [number, number], options: Record<string, unknown>) => LeafletLayer;
  divIcon: (options: Record<string, unknown>) => unknown;
  polyline: (coordinates: [[number, number], [number, number]], options: Record<string, unknown>) => LeafletLayer;
};

declare global {
  interface Window {
    L?: LeafletApi;
  }
}

function readJsonArray(key: string) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as string[]) : [];
  } catch {
    return [];
  }
}

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Record<string, LeafletMarker>>({});
  const linesRef = useRef<LeafletLayer[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const transport = useMemo(() => {
    const infos = [];
    for (let i = 0; i < selectedRoute.length - 1; i++) {
      const info = getTransport(selectedRoute[i], selectedRoute[i + 1]);
      if (info) {
        infos.push({ from: selectedRoute[i], to: selectedRoute[i + 1], info });
      }
    }
    return infos;
  }, [selectedRoute]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setFavorites(readJsonArray("chinaviaja_favs"));
      setSelectedRoute(readJsonArray("chinaviaja_route"));
    }, 0);

    const handler = () => {
      setFavorites(readJsonArray("chinaviaja_favs"));
    };

    window.addEventListener("storage", handler);
    window.addEventListener("favorites-updated", handler);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storage", handler);
      window.removeEventListener("favorites-updated", handler);
    };
  }, []);

  const toggleRoute = useCallback((cityId: string) => {
    setSelectedRoute((prev) => {
      const next = prev.includes(cityId) ? prev.filter((city) => city !== cityId) : [...prev, cityId];
      localStorage.setItem("chinaviaja_route", JSON.stringify(next));
      return next;
    });

    setFavorites((prev) => {
      if (prev.includes(cityId)) return prev;
      const next = [...prev, cityId];
      localStorage.setItem("chinaviaja_favs", JSON.stringify(next));
      window.dispatchEvent(new CustomEvent("favorites-updated", { detail: next }));
      return next;
    });
  }, []);

  const clearRoute = () => {
    setSelectedRoute([]);
    localStorage.removeItem("chinaviaja_route");
  };

  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current) return;

    const loadLeaflet = async () => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
        document.head.appendChild(css);
      }

      if (!window.L) {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }

      if (!mapRef.current || mapInstanceRef.current || !window.L) return;

      const L = window.L;
      const map = L.map(mapRef.current, {
        center: [35.5, 104.5],
        zoom: 4,
        minZoom: 3,
        maxZoom: 7,
        zoomControl: true,
        attributionControl: false,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
      }).addTo(map);

      try {
        const res = await fetch("https://geojson.cn/api/china/100000.json");
        const data = await res.json();
        L.geoJSON(data, {
          style: { fillColor: "#2a4a6a", fillOpacity: 0.4, color: "#4a8abf", weight: 1.5 },
        }).addTo(map);
      } catch {
        console.log("GeoJSON load failed");
      }

      cities.forEach((city) => {
        const marker = L.circleMarker([city.lat, city.lng], {
          radius: 6,
          fillColor: "rgba(255,255,255,0.4)",
          fillOpacity: 0.8,
          color: "rgba(255,255,255,0.6)",
          weight: 1.5,
        }).addTo(map) as LeafletMarker;

        L.marker([city.lat, city.lng], {
          icon: L.divIcon({
            className: "city-map-label",
            html: `<span style="color:rgba(255,255,255,0.62);font-size:10px;font-family:Inter,system-ui,sans-serif;text-shadow:0 1px 3px rgba(0,0,0,0.8);white-space:nowrap">${city.name.split(" (")[0]}</span>`,
            iconSize: [90, 16],
            iconAnchor: [45, -8],
          }),
        }).addTo(map);

        marker.on("click", () => toggleRoute(city.id));
        markersRef.current[city.id] = marker;
      });

      mapInstanceRef.current = map;
    };

    void loadLeaflet();
  }, [toggleRoute]);

  useEffect(() => {
    const L = window.L;
    const map = mapInstanceRef.current;
    if (!L || !map) return;

    Object.keys(markersRef.current).forEach((id) => {
      const marker = markersRef.current[id];
      const isSelected = selectedRoute.includes(id);
      const isFav = favorites.includes(id);

      if (isSelected) {
        marker.setStyle({ fillColor: "#F4B740", fillOpacity: 1, color: "#FFF0AE", weight: 3 });
        marker.setRadius(11);
      } else if (isFav) {
        marker.setStyle({ fillColor: "#C2410C", fillOpacity: 0.92, color: "#F6B47A", weight: 2 });
        marker.setRadius(8);
      } else {
        marker.setStyle({ fillColor: "rgba(255,255,255,0.35)", fillOpacity: 0.7, color: "rgba(255,255,255,0.5)", weight: 1.5 });
        marker.setRadius(6);
      }
    });

    linesRef.current.forEach((line) => map.removeLayer(line));
    linesRef.current = [];

    for (let i = 0; i < selectedRoute.length - 1; i++) {
      const fromCity = cities.find((city) => city.id === selectedRoute[i]);
      const toCity = cities.find((city) => city.id === selectedRoute[i + 1]);
      if (fromCity && toCity) {
        const line = L.polyline([[fromCity.lat, fromCity.lng], [toCity.lat, toCity.lng]], {
          color: "#F4B740",
          weight: 3,
          dashArray: "10,6",
          opacity: 0.9,
        }).addTo(map);
        linesRef.current.push(line);
      }
    }
  }, [selectedRoute, favorites]);

  return (
    <section className="px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20" id="mapa">
      <div className="mx-auto max-w-[1000px]">
        <h2 className="text-2xl font-bold text-[var(--slate-900)] sm:text-[32px]">Tu mapa de viaje</h2>
        <p className="mt-2 text-sm text-[var(--slate-500)]">
          Haz clic en las ciudades para construir tu ruta y ver conexiones útiles de transporte.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_280px]">
          <div className="relative h-[400px] overflow-hidden rounded-2xl bg-[#101828] md:h-[480px] shadow-[0_20px_50px_rgba(15,23,42,0.18)]">
            <div ref={mapRef} className="h-full w-full" />
            <div className="absolute bottom-3 left-3 z-[500] rounded-lg bg-black/75 px-3 py-2 text-[10px] leading-relaxed text-white/70">
              <div><span className="mr-1 inline-block h-2.5 w-2.5 rounded-full border-2 border-[#FFF0AE] bg-[#F4B740] align-middle" /> En ruta</div>
              <div><span className="mr-1 inline-block h-2 w-2 rounded-full border border-[#F6B47A] bg-[#C2410C] align-middle" /> Favorita</div>
              <div><span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40 align-middle" /> Disponible</div>
            </div>
            <div className="absolute bottom-3 right-3 z-[500] rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white/40">
              审图号: GS(2023)2767
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[var(--shadow-soft)]">
              <p className="mb-1 text-sm font-bold text-[var(--slate-900)]">Favoritas <span className="text-xs font-normal text-gray-400">({favorites.length})</span></p>
              {favorites.length === 0 ? (
                <p className="text-xs text-gray-400">Usa el botón de favorito en las tarjetas de ciudad.</p>
              ) : (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {favorites.map((id) => (
                    <span key={id} className="rounded-md bg-orange-50 px-2 py-0.5 text-[11px] text-orange-700">
                      {cityNames[id] || id}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[var(--shadow-soft)]">
              <p className="mb-1 text-sm font-bold text-[var(--slate-900)]">Mi ruta <span className="text-xs font-normal text-gray-400">({selectedRoute.length})</span></p>
              {selectedRoute.length === 0 ? (
                <p className="text-xs text-gray-400">Haz clic en ciudades del mapa.</p>
              ) : (
                <div className="mt-2 space-y-1.5">
                  {selectedRoute.map((id, index) => (
                    <div key={id} className="flex items-center gap-2 text-sm">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--imperial-gold)] text-[10px] font-bold text-[var(--slate-900)]">{index + 1}</span>
                      <span className="flex-1 text-xs font-medium text-[var(--slate-700)]">{cityNames[id] || id}</span>
                      <button onClick={() => toggleRoute(id)} className="text-xs text-[var(--china-red)]">Eliminar</button>
                    </div>
                  ))}
                  <button onClick={clearRoute} className="mt-2 rounded bg-red-50 px-2 py-1 text-[11px] text-red-600">
                    Limpiar ruta
                  </button>
                </div>
              )}
            </div>

            {transport.length > 0 && (
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-[var(--shadow-soft)]">
                <p className="mb-2 text-sm font-bold text-[var(--slate-900)]">Transporte</p>
                {transport.map((item, index) => (
                  <div key={index} className="mb-3 border-b border-gray-100 pb-3 last:mb-0 last:border-0 last:pb-0">
                    <p className="mb-1 text-xs font-semibold text-[var(--slate-900)]">{cityNames[item.from]} → {cityNames[item.to]}</p>
                    <div className="space-y-0.5 text-[11px] text-gray-500">
                      <p>Tren: {item.info.train}</p>
                      <p>Vuelo: {item.info.flight}</p>
                      <p>Distancia: {item.info.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-2xl bg-[rgba(244,183,64,0.12)] p-4 shadow-[var(--shadow-soft)]">
              <p className="mb-1 text-xs font-semibold text-[var(--china-red)]">Guardado automático</p>
              <p className="mb-2 text-[11px] text-gray-500">Sin registro necesario</p>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent("chatbot-send-message", { detail: { message: `Quiero un itinerario basado en esta ruta: ${selectedRoute.map((id) => cityNames[id] || id).join(", ")}.` } }))}
                className="w-full rounded-lg bg-[var(--china-red)] py-2 text-xs font-medium text-white transition-colors hover:bg-[var(--ink-blue)]"
              >
                Pedir itinerario a la IA
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
