export interface City {
  id: string;
  name: string;
  desc: string;
  badge?: string;
  gradient: string;
  lat: number;
  lng: number;
  category: "popular" | "emerging";
}

export const cities: City[] = [
  // Popular cities
  { id: "shanghai", name: "Shanghai", desc: "936M turistas/año — La más visitada de China", badge: "👑 #1", gradient: "from-blue-700 to-blue-400", lat: 31.23, lng: 121.47, category: "popular" },
  { id: "beijing", name: "Beijing (Pekín)", desc: "Historia imperial: Muralla + Ciudad Prohibida", badge: "🔥 Clásica", gradient: "from-amber-900 to-amber-400", lat: 39.90, lng: 116.40, category: "popular" },
  { id: "guangzhou", name: "Guangzhou (Cantón)", desc: "320M visitantes — Capital del dim sum", gradient: "from-orange-700 to-orange-400", lat: 23.13, lng: 113.26, category: "popular" },
  { id: "shenzhen", name: "Shenzhen", desc: "Ciudad tech: drones, AI, gadgets futuristas", badge: "🤖 Tech", gradient: "from-teal-600 to-teal-300", lat: 22.54, lng: 114.06, category: "popular" },
  { id: "chengdu", name: "Chengdu", desc: "Pandas + Hot pot + Vida relajada", badge: "🐼 Pandas", gradient: "from-green-700 to-green-400", lat: 30.57, lng: 104.07, category: "popular" },
  { id: "xian", name: "Xi'an", desc: "Guerreros de terracota + Hanfu + Ruta de la Seda", gradient: "from-red-800 to-red-300", lat: 34.26, lng: 108.94, category: "popular" },
  { id: "chongqing", name: "Chongqing", desc: "Ciudad cyberpunk 8D — Hot pot extremo", badge: "🌃 Viral", gradient: "from-red-700 to-red-400", lat: 29.56, lng: 106.55, category: "popular" },
  { id: "hangzhou", name: "Hangzhou", desc: "Lago del Oeste + Té + Sede de Alibaba", gradient: "from-emerald-700 to-emerald-400", lat: 30.27, lng: 120.15, category: "popular" },
  // Emerging cities
  { id: "zhangjiajie", name: "Zhangjiajie", desc: "Montañas de Avatar — España +723% visitantes", badge: "📈 +723%", gradient: "from-green-900 to-green-500", lat: 29.12, lng: 110.48, category: "emerging" },
  { id: "harbin", name: "Harbin", desc: "Festival de hielo — Ciudad de invierno mágica", badge: "❄️ Hielo", gradient: "from-purple-800 to-purple-400", lat: 45.75, lng: 126.65, category: "emerging" },
  { id: "suzhou", name: "Suzhou", desc: "Jardines clásicos + Canales + Seda", gradient: "from-yellow-600 to-yellow-300", lat: 31.30, lng: 120.62, category: "emerging" },
  { id: "kunming", name: "Kunming", desc: "Eterna primavera — Puerta a Yunnan", gradient: "from-pink-700 to-pink-300", lat: 25.04, lng: 102.68, category: "emerging" },
  { id: "xiamen", name: "Xiamen", desc: "Isla Gulangyu + Playa + Arquitectura colonial", gradient: "from-indigo-700 to-indigo-400", lat: 24.48, lng: 118.09, category: "emerging" },
  { id: "datong", name: "Datong (Shanxi)", desc: "Grutas de Yungang + Black Myth: Wukong", badge: "🎮 Gaming", gradient: "from-stone-700 to-stone-400", lat: 40.09, lng: 113.30, category: "emerging" },
  { id: "guilin", name: "Guilin", desc: "Paisajes de postal — Río Li en balsa", gradient: "from-cyan-700 to-cyan-400", lat: 25.27, lng: 110.29, category: "emerging" },
  { id: "nanjing", name: "Nanjing", desc: "Antigua capital + Historia + Comida callejera", gradient: "from-violet-700 to-violet-400", lat: 32.06, lng: 118.80, category: "emerging" },
];

export const cityNames: Record<string, string> = Object.fromEntries(
  cities.map((c) => [c.id, c.name])
);
