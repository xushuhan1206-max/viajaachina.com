"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cities } from "@/lib/data/cities";
import CityCard from "./CityCard";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function CitiesSection() {
  const supabase = getSupabaseClient();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [user, setUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ? { id: data.session.user.id } : null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id } : null);
    });

    return () => listener.subscription.unsubscribe();
  }, [supabase]);

  const emitFavoritesUpdate = (ids: string[]) => {
    window.dispatchEvent(new CustomEvent("favorites-updated", { detail: ids }));
  };

  const loadFavorites = useCallback(async () => {
    if (!supabase) {
      const saved = localStorage.getItem("chinaviaja_favs");
      const ids = saved ? JSON.parse(saved) : [];
      setFavorites(ids);
      emitFavoritesUpdate(ids);
      return;
    }

    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (session?.user) {
      const { data: rows } = await supabase.from("favorites").select("city_id");
      const ids = (rows as { city_id: string }[] | null)?.map((r) => r.city_id) || [];
      setFavorites(ids);
      emitFavoritesUpdate(ids);
    } else {
      const saved = localStorage.getItem("chinaviaja_favs");
      const ids = saved ? JSON.parse(saved) : [];
      setFavorites(ids);
      emitFavoritesUpdate(ids);
    }
  }, [supabase]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadFavorites();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [user, loadFavorites]);

  useEffect(() => {
    if (!supabase || !user) return;
    const localRaw = localStorage.getItem("chinaviaja_favs");
    if (!localRaw) return;
    const localFavs: string[] = JSON.parse(localRaw);
    if (localFavs.length === 0) return;

    const rows = localFavs.map((city_id) => ({ user_id: user.id, city_id }));
    supabase.from("favorites").upsert(rows as never[], { onConflict: "user_id,city_id" }).then(() => {
      localStorage.removeItem("chinaviaja_favs");
      loadFavorites();
    });
  }, [user, supabase, loadFavorites]);

  const toggleFav = async (id: string) => {
    if (!supabase) {
      setFavorites((prev) => {
        const next = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
        localStorage.setItem("chinaviaja_favs", JSON.stringify(next));
        emitFavoritesUpdate(next);
        return next;
      });
      return;
    }

    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (session?.user) {
      const isFav = favorites.includes(id);
      if (isFav) {
        await supabase.from("favorites").delete().eq("user_id", session.user.id).eq("city_id", id);
        setFavorites((prev) => {
          const next = prev.filter((c) => c !== id);
          emitFavoritesUpdate(next);
          return next;
        });
      } else {
        await supabase.from("favorites").insert({ user_id: session.user.id, city_id: id } as never);
        setFavorites((prev) => {
          const next = [...prev, id];
          emitFavoritesUpdate(next);
          return next;
        });
      }
      return;
    }

    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
      localStorage.setItem("chinaviaja_favs", JSON.stringify(next));
      emitFavoritesUpdate(next);
      return next;
    });
  };

  const popular = useMemo(() => cities.filter((c) => c.category === "popular"), []);
  const emerging = useMemo(() => cities.filter((c) => c.category === "emerging"), []);

  return (
    <section id="ciudades" className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-[1000px]">
        <h2 className="text-2xl font-bold text-[var(--slate-900)] sm:text-[32px]">Ciudades populares</h2>
        <p className="mt-2 text-sm text-[var(--slate-500)]">
          Las más visitadas por turistas internacionales en 2025-2026 (datos: Visa + Xiaohongshu)
        </p>

        <div className="mt-7 grid grid-cols-2 gap-4 md:grid-cols-4">
          {popular.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              isFavorited={favorites.includes(city.id)}
              onToggleFav={toggleFav}
              variant="compact"
            />
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-bold text-[var(--slate-900)] sm:text-xl">
            ✨ Destinos emergentes <span className="text-sm font-normal text-[var(--slate-500)]">(los favoritos nuevos de 2026)</span>
          </h3>
          <p className="mt-2 text-sm text-[var(--slate-500)]">
            Más allá de las rutas clásicas — donde los viajeros aventureros van ahora.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {emerging.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              isFavorited={favorites.includes(city.id)}
              onToggleFav={toggleFav}
              variant="compact"
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/#mapa"
            className="inline-flex items-center justify-center rounded-full bg-[var(--slate-900)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
          >
            Ver mapa interactivo
          </Link>
        </div>
      </div>
    </section>
  );
}
