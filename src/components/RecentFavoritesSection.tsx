"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { cities } from "@/lib/data/cities";

export default function RecentFavoritesSection() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  useEffect(() => {
    const loadLocalFavorites = () => {
      const saved = localStorage.getItem("chinaviaja_favs");
      setFavoriteIds(saved ? JSON.parse(saved) : []);
    };

    const handleFavoritesUpdated = (event: Event) => {
      const customEvent = event as CustomEvent<string[]>;
      if (Array.isArray(customEvent.detail)) {
        setFavoriteIds(customEvent.detail);
        return;
      }
      loadLocalFavorites();
    };

    loadLocalFavorites();
    window.addEventListener("favorites-updated", handleFavoritesUpdated as EventListener);
    return () => window.removeEventListener("favorites-updated", handleFavoritesUpdated as EventListener);
  }, []);

  const favoriteCities = useMemo(
    () => cities.filter((city) => favoriteIds.includes(city.id)).slice(0, 4),
    [favoriteIds]
  );

  return (
    <section id="favoritos" className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-20">
      <div className="mx-auto max-w-7xl rounded-[32px] border border-[rgba(226,232,240,0.92)] bg-white px-6 py-8 shadow-[var(--shadow-soft)] sm:px-8 lg:px-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--cinnabar)]">Tus señales de interés</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--slate-900)] sm:text-3xl">
              Tu mapa personal empieza con lo que ya te llamó la atención.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--slate-700)] sm:text-base">
              Guarda ciudades mientras exploras y úsalo como punto de partida para pedir rutas más afinadas al asistente IA.
            </p>
          </div>
        </div>

        {favoriteCities.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {favoriteCities.map((city) => (
              <button
                key={city.id}
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("chatbot-send-message", {
                      detail: { message: `Quiero una ruta personalizada centrada en ${city.name}.` },
                    })
                  )
                }
                className="group overflow-hidden rounded-[24px] border border-[rgba(226,232,240,0.92)] bg-[var(--porcelain)] text-left transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.70)_100%)]" />
                  <p className="absolute left-4 top-4 rounded-full bg-white/88 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--ink-blue)]">
                    Favorito
                  </p>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[var(--slate-900)]">{city.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slate-700)]">{city.desc}</p>
                  <p className="mt-4 text-sm font-semibold text-[var(--jade)]">Usar en una ruta IA</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[28px] border border-dashed border-[rgba(18,53,91,0.16)] bg-[var(--warm-rice)] px-6 py-8 text-center">
            <p className="text-lg font-semibold text-[var(--slate-900)]">Aún no has guardado ciudades.</p>
            <p className="mt-2 text-sm leading-7 text-[var(--slate-700)]">
              Marca destinos en la sección superior y aquí aparecerá tu selección para convertirla en itinerario.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
