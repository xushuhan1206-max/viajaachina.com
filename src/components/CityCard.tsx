"use client";

import { City } from "@/lib/data/cities";

interface CityCardProps {
  city: City;
  isFavorited: boolean;
  onToggleFav: (id: string) => void;
}

export default function CityCard({ city, isFavorited, onToggleFav }: CityCardProps) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden h-[180px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-br ${city.gradient} ${isFavorited ? "ring-2 ring-[var(--gold)] ring-offset-1" : ""}`}
    >
      {/* Favorite button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFav(city.id);
        }}
        className={`absolute top-2.5 left-2.5 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all backdrop-blur-sm z-10 ${
          isFavorited
            ? "bg-[var(--gold)] text-[var(--dark)]"
            : "bg-black/40 text-white hover:bg-[var(--gold)]/70 hover:scale-110"
        }`}
      >
        {isFavorited ? "★" : "☆"}
      </button>

      {/* Badge */}
      {city.badge && (
        <div className="absolute top-2.5 right-2.5 bg-[var(--gold)] text-[var(--dark)] text-[10px] font-bold px-2 py-0.5 rounded-lg z-10">
          {city.badge}
        </div>
      )}

      {/* Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/75 to-transparent">
        <h3 className="text-white text-base font-semibold">{city.name}</h3>
        <p className="text-white/80 text-xs mt-0.5">{city.desc}</p>
      </div>
    </div>
  );
}
