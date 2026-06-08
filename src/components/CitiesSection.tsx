"use client";

import { useState, useEffect, useCallback } from "react";
import { cities, cityNames } from "@/lib/data/cities";
import CityCard from "./CityCard";
import { getSupabaseClient } from "@/lib/supabase/client";

export default function CitiesSection() {
  const supabase = getSupabaseClient();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [user, setUser] = useState<{ id: string } | null>(null);

  // 监听登录状态
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ? { id: data.session.user.id } : null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { id: session.user.id } : null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // 加载收藏：登录读 Supabase，未登录读 localStorage
  const loadFavorites = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;
    if (session?.user) {
      const { data: rows } = await supabase.from("favorites").select("city_id");
      setFavorites((rows as { city_id: string }[] | null)?.map((r) => r.city_id) || []);
    } else {
      const saved = localStorage.getItem("chinaviaja_favs");
      if (saved) setFavorites(JSON.parse(saved));
    }
  }, []);

  useEffect(() => { loadFavorites(); }, [user, loadFavorites]);

  // 登录后把 localStorage 收藏同步到 Supabase
  useEffect(() => {
    if (!user) return;
    const localRaw = localStorage.getItem("chinaviaja_favs");
    if (!localRaw) return;
    const localFavs: string[] = JSON.parse(localRaw);
    if (localFavs.length === 0) return;
    // 批量插入（忽略重复）
    const rows = localFavs.map(city_id => ({ user_id: user.id, city_id }));
    supabase.from("favorites").upsert(rows as any, { onConflict: "user_id,city_id" }).then(() => {
      localStorage.removeItem("chinaviaja_favs");
    });
  }, [user]);

  const toggleFav = async (id: string) => {
    const { data } = await supabase.auth.getSession();
    const session = data.session;

    if (session?.user) {
      // 登录状态：操作 Supabase
      const isFav = favorites.includes(id);
      if (isFav) {
        await supabase.from("favorites").delete().eq("user_id", session.user.id).eq("city_id", id);
        setFavorites(prev => prev.filter(c => c !== id));
      } else {
        await supabase.from("favorites").insert({ user_id: session.user.id, city_id: id } as any);
        setFavorites(prev => [...prev, id]);
      }
    } else {
      // 未登录：操作 localStorage
      setFavorites((prev) => {
        const next = prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id];
        localStorage.setItem("chinaviaja_favs", JSON.stringify(next));
        return next;
      });
    }
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
