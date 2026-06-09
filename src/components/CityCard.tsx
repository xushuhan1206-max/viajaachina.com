"use client";

import Image from "next/image";
import { City } from "@/lib/data/cities";

interface CityCardProps {
  city: City;
  isFavorited: boolean;
  onToggleFav: (id: string) => void;
  variant?: "featured" | "standard" | "compact";
}

export default function CityCard({
  city,
  isFavorited,
  onToggleFav,
  variant = "standard",
}: CityCardProps) {
  const isFeatured = variant === "featured";
  const heightClass = isFeatured ? "h-[300px] md:h-[380px]" : "h-[180px]";

  return (
    <article
      className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-[linear-gradient(135deg,rgba(18,53,91,0.95)_0%,rgba(15,118,110,0.72)_100%)] shadow-[0_10px_28px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.16)] ${heightClass}`}
    >
      <Image
        src={city.image}
        alt={city.name}
        fill
        sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
        className="object-cover opacity-82 transition duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.18)_38%,rgba(0,0,0,0.76)_100%)]" />

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleFav(city.id);
        }}
        aria-label={isFavorited ? "Eliminar de favoritos" : "Guardar en favoritos"}
        className={`absolute left-2.5 top-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm backdrop-blur-sm transition-all hover:scale-110 ${
          isFavorited
            ? "bg-[var(--imperial-gold)] text-[var(--slate-900)]"
            : "bg-black/40 text-white hover:bg-[rgba(244,183,64,0.70)]"
        }`}
      >
        {isFavorited ? "♥" : "♡"}
      </button>

      {city.badge && (
        <div className="absolute right-2.5 top-2.5 z-10 rounded-lg bg-[var(--imperial-gold)] px-2 py-0.5 text-[10px] font-bold text-[var(--slate-900)]">
          {city.badge}
        </div>
      )}

      <button
        onClick={() => window.dispatchEvent(new CustomEvent("chatbot-send-message", { detail: { message: `Quiero saber más sobre ${city.name} para mi viaje a China.` } }))}
        className="absolute inset-0 z-[1]"
        aria-label={`Preguntar a la IA sobre ${city.name}`}
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-4">
        <h3 className="text-base font-semibold text-white">{city.name}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/82">{city.desc}</p>
      </div>
    </article>
  );
}
