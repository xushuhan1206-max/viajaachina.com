"use client";

import { useState, useEffect } from "react";
import { cities } from "@/lib/data/cities";
import CityCard from "./CityCard";

export default function CitiesSection() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("chinaviaja_favs");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFav = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
      localStorage.setItem("chinaviaja_favs", JSON.stringify(next));
      return next;
    });
  };

  const popular = cities.filter((c) => c.category === "popular");
  const emerging = cities.filter((c) => c.category === "emerging");

  return (
    <section className="max-w-[1000px] mx-auto px-6 py-16" id="ciudades">
      <h2 className="text-2xl font-bold mb-2">Ciudades populares</h2>
      <p className="text-sm text-gray-500 mb-7">
        Las más visitadas por turistas internacionales en 2025-2026 (datos: Visa + Xiaohongshu)
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {popular.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            isFavorited={favorites.includes(city.id)}
            onToggleFav={toggleFav}
          />
        ))}
      </div>

      <h3 className="text-lg font-bold mt-9 mb-1">
        🚀 Destinos emergentes{" "}
        <span className="text-sm font-normal text-gray-500">(los favoritos nuevos de 2026)</span>
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Más allá de las rutas clásicas — donde los viajeros aventureros van ahora
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {emerging.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            isFavorited={favorites.includes(city.id)}
            onToggleFav={toggleFav}
          />
        ))}
      </div>

      {/* View All Cities Button */}
      <div className="flex justify-center mt-8">
        <a
          href="/cities"
          className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-[#C62828] text-[#C62828] font-semibold text-sm rounded-xl hover:bg-[#C62828] hover:text-white transition-colors"
        >
          Ver todas las ciudades
          <span>→</span>
        </a>
      </div>
    </section>
  );
}
