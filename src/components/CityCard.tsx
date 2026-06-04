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
      className={`relative rounded-xl overflow-hidden h-[180px] md:h-[200px] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group ${isFavorited ? "ring-2 ring-[#FFB300] ring-offset-1" : ""}`}
    >
      {/* Background Image */}
      <img
        src={city.image}
        alt={city.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />

      {/* Favorite button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFav(city.id);
        }}
        className={`absolute top-2.5 left-2.5 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all backdrop-blur-sm z-10 ${
          isFavorited
            ? "bg-[#FFB300] text-[#1A1A2E] shadow-lg"
            : "bg-black/40 text-white hover:bg-[#FFB300]/70 hover:scale-110"
        }`}
      >
        {isFavorited ? "★" : "☆"}
      </button>

      {/* Badge */}
      {city.badge && (
        <div className="absolute top-2.5 right-2.5 bg-[#FFB300] text-[#1A1A2E] text-[10px] font-bold px-2 py-0.5 rounded-lg z-10 shadow-md">
          {city.badge}
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Text content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        <h3 className="text-white text-sm md:text-base font-semibold drop-shadow-md">{city.name}</h3>
        <p className="text-white/80 text-[11px] md:text-xs mt-0.5 drop-shadow-sm line-clamp-2">{city.desc}</p>
      </div>
    </div>
  );
}
