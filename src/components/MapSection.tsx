"use client";

import { useEffect, useRef, useState } from "react";
import { cities, cityNames } from "@/lib/data/cities";
import { getTransport, TransportInfo } from "@/lib/data/transport";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    L: any;
  }
}

export default function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<Record<string, any>>({});
  const linesRef = useRef<any[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [transport, setTransport] = useState<{ from: string; to: string; info: TransportInfo }[]>([]);

  // Load favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chinaviaja_favs");
    if (saved) setFavorites(JSON.parse(saved));

    const savedRoute = localStorage.getItem("chinaviaja_route");
    if (savedRoute) setSelectedRoute(JSON.parse(savedRoute));

    // Listen for storage changes (when user favorites from city cards)
    const handler = () => {
      const f = localStorage.getItem("chinaviaja_favs");
      if (f) setFavorites(JSON.parse(f));
    };
    window.addEventListener("storage", handler);
    // Also poll for same-page changes
    const interval = setInterval(() => {
      const f = localStorage.getItem("chinaviaja_favs");
      if (f && JSON.stringify(JSON.parse(f)) !== JSON.stringify(favorites)) {
        setFavorites(JSON.parse(f));
      }
    }, 1000);
    return () => { window.removeEventListener("storage", handler); clearInterval(interval); };
  }, []);

  // Load Leaflet
  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current) return;

    const loadLeaflet = async () => {
      // Load CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
        document.head.appendChild(css);
      }

      // Load JS
      if (!window.L) {
        await new Promise<void>((resolve) => {
          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
          script.onload = () => resolve();
          document.head.appendChild(script);
        });
      }

      if (!mapRef.current || mapInstanceRef.current) return;

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

      // Load China GeoJSON
      try {
        const res = await fetch("https://geojson.cn/api/china/100000.json");
        const data = await res.json();
        L.geoJSON(data, {
          style: { fillColor: "#2a4a6a", fillOpacity: 0.4, color: "#4a8abf", weight: 1.5 },
        }).addTo(map);
      } catch (e) {
        console.log("GeoJSON load failed");
      }

      // Add city markers
      cities.forEach((city) => {
        const marker = L.circleMarker([city.lat, city.lng], {
          radius: 6,
          fillColor: "rgba(255,255,255,0.4)",
          fillOpacity: 0.8,
          color: "rgba(255,255,255,0.6)",
          weight: 1.5,
        }).addTo(map);

        // Permanent label
        L.marker([city.lat, city.lng], {
          icon: L.divIcon({
            className: "city-map-label",
            html: `<span style="color:rgba(255,255,255,0.5);font-size:10px;font-family:sans-serif;text-shadow:0 1px 3px rgba(0,0,0,0.8);white-space:nowrap">${city.name.split(" (")[0]}</span>`,
            iconSize: [80, 16],
            iconAnchor: [40, -8],
          }),
        }).addTo(map);

        marker.on("click", () => {
          toggleRoute(city.id);
        });

        markersRef.current[city.id] = marker;
      });

      mapInstanceRef.current = map;
    };

    loadLeaflet();
  }, []);

  // Update markers when favorites/route changes
  useEffect(() => {
    const L = window.L;
    if (!L || !mapInstanceRef.current) return;

    Object.keys(markersRef.current).forEach((id) => {
      const marker = markersRef.current[id];
      const isSelected = selectedRoute.includes(id);
      const isFav = favorites.includes(id);

      if (isSelected) {
        marker.setStyle({ fillColor: "#FFB300", fillOpacity: 1, color: "#FFF176", weight: 3 });
        marker.setRadius(11);
      } else if (isFav) {
        marker.setStyle({ fillColor: "#FF7043", fillOpacity: 0.9, color: "#FFAB91", weight: 2 });
        marker.setRadius(8);
      } else {
        marker.setStyle({ fillColor: "rgba(255,255,255,0.35)", fillOpacity: 0.7, color: "rgba(255,255,255,0.5)", weight: 1.5 });
        marker.setRadius(6);
      }
    });

    // Draw route lines
    linesRef.current.forEach((l) => mapInstanceRef.current.removeLayer(l));
    linesRef.current = [];

    for (let i = 0; i < selectedRoute.length - 1; i++) {
      const fromCity = cities.find((c) => c.id === selectedRoute[i]);
      const toCity = cities.find((c) => c.id === selectedRoute[i + 1]);
      if (fromCity && toCity) {
        const line = L.polyline([[fromCity.lat, fromCity.lng], [toCity.lat, toCity.lng]], {
          color: "#FFB300",
          weight: 3,
          dashArray: "10,6",
          opacity: 0.9,
        }).addTo(mapInstanceRef.current);
        linesRef.current.push(line);
      }
    }
  }, [selectedRoute, favorites]);

  // Update transport info
  useEffect(() => {
    const infos: { from: string; to: string; info: TransportInfo }[] = [];
    for (let i = 0; i < selectedRoute.length - 1; i++) {
      const info = getTransport(selectedRoute[i], selectedRoute[i + 1]);
      if (info) {
        infos.push({ from: selectedRoute[i], to: selectedRoute[i + 1], info });
      }
    }
    setTransport(infos);
  }, [selectedRoute]);

  function toggleRoute(cityId: string) {
    setSelectedRoute((prev) => {
      const next = prev.includes(cityId) ? prev.filter((c) => c !== cityId) : [...prev, cityId];
      localStorage.setItem("chinaviaja_route", JSON.stringify(next));
      return next;
    });
    // Auto-favorite
    if (!favorites.includes(cityId)) {
      const newFavs = [...favorites, cityId];
      setFavorites(newFavs);
      localStorage.setItem("chinaviaja_favs", JSON.stringify(newFavs));
    }
  }

  function clearRoute() {
    setSelectedRoute([]);
    localStorage.removeItem("chinaviaja_route");
  }

  return (
    <section className="w-full max-w-[1100px] mx-auto px-6 pb-16" id="mapa">
      <h2 className="text-2xl font-bold mb-2">🗺️ Tu mapa de viaje</h2>
      <p className="text-sm text-gray-500 mb-5">
        Haz clic en las ciudades del mapa para planificar tu ruta. Selecciona dos o más para ver transporte.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
        {/* Map */}
        <div className="rounded-xl overflow-hidden relative h-[400px] md:h-[480px] bg-[#1a2332]">
          <div ref={mapRef} className="w-full h-full" />
          {/* Legend */}
          <div className="absolute bottom-3 left-3 z-[500] bg-black/75 rounded-lg px-3 py-2 text-[10px] text-white/70 leading-relaxed">
            <div><span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FFB300] border-2 border-[#FFF176] mr-1 align-middle" /> En ruta</div>
            <div><span className="inline-block w-2 h-2 rounded-full bg-[#FF7043] border border-[#FFAB91] mr-1 align-middle" /> Favorita</div>
            <div><span className="inline-block w-1.5 h-1.5 rounded-full bg-white/40 mr-1 align-middle" /> Disponible</div>
          </div>
          <div className="absolute bottom-3 right-3 z-[500] bg-black/60 rounded px-1.5 py-0.5 text-[9px] text-white/40">
            审图号: GS(2023)2767
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          {/* Favorites */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-bold mb-1">⭐ Favoritas <span className="text-xs text-gray-400 font-normal">({favorites.length})</span></p>
            {favorites.length === 0 ? (
              <p className="text-xs text-gray-400">Usa ☆ en las tarjetas de ciudad</p>
            ) : (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {favorites.map((id) => (
                  <span key={id} className="bg-orange-50 text-orange-700 text-[11px] px-2 py-0.5 rounded-md">
                    {cityNames[id] || id}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Route */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-bold mb-1">📍 Mi ruta <span className="text-xs text-gray-400 font-normal">({selectedRoute.length})</span></p>
            {selectedRoute.length === 0 ? (
              <p className="text-xs text-gray-400">Haz clic en ciudades del mapa</p>
            ) : (
              <div className="space-y-1.5 mt-2">
                {selectedRoute.map((id, i) => (
                  <div key={id} className="flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#FFB300] text-[#1A1A2E] text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                    <span className="flex-1 font-medium text-xs">{cityNames[id] || id}</span>
                    <button onClick={() => toggleRoute(id)} className="text-red-500 text-xs">✕</button>
                  </div>
                ))}
                <button onClick={clearRoute} className="mt-2 text-[11px] text-red-600 bg-red-50 px-2 py-1 rounded">
                  Limpiar ruta
                </button>
              </div>
            )}
          </div>

          {/* Transport */}
          {transport.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-bold mb-2">🚆 Transporte</p>
              {transport.map((t, i) => (
                <div key={i} className="mb-3 pb-3 border-b border-gray-100 last:border-0 last:mb-0 last:pb-0">
                  <p className="text-xs font-semibold mb-1">{cityNames[t.from]} → {cityNames[t.to]}</p>
                  <div className="text-[11px] text-gray-500 space-y-0.5">
                    <p>🚄 {t.info.train}</p>
                    <p>✈️ {t.info.flight}</p>
                    <p>📏 {t.info.distance}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* AI CTA */}
          <div className="bg-[#EEEDFE] rounded-xl p-4">
            <p className="text-xs font-semibold text-[#534AB7] mb-1">💾 Guardado automático</p>
            <p className="text-[11px] text-gray-500 mb-2">Sin registro necesario</p>
            <button className="w-full bg-[#534AB7] text-white text-xs py-2 rounded-lg font-medium hover:bg-[#3F35A0] transition-colors">
              📋 Pedir itinerario a la IA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
