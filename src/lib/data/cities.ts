export interface City {
  id: string;
  name: string;
  desc: string;
  badge?: string;
  image: string;
  lat: number;
  lng: number;
  category: "popular" | "emerging";
}

// Images from Unsplash (free, no attribution required for web use)
export const cities: City[] = [
  // Popular cities
  { id: "shanghai", name: "Shanghai", desc: "936M turistas/año — La más visitada de China", badge: "👑 #1", image: "https://images.unsplash.com/photo-1537531383496-f4749b96cdb5?w=400&h=300&fit=crop", lat: 31.23, lng: 121.47, category: "popular" },
  { id: "beijing", name: "Beijing (Pekín)", desc: "Historia imperial: Muralla + Ciudad Prohibida", badge: "🔥 Clásica", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=400&h=300&fit=crop", lat: 39.90, lng: 116.40, category: "popular" },
  { id: "guangzhou", name: "Guangzhou (Cantón)", desc: "320M visitantes — Capital del dim sum", image: "https://images.unsplash.com/photo-1583996046784-54b30e6d9fce?w=400&h=300&fit=crop", lat: 23.13, lng: 113.26, category: "popular" },
  { id: "shenzhen", name: "Shenzhen", desc: "Ciudad tech: drones, AI, gadgets futuristas", badge: "🤖 Tech", image: "https://images.unsplash.com/photo-1533655272443-ef18ac09025e?w=400&h=300&fit=crop", lat: 22.54, lng: 114.06, category: "popular" },
  { id: "chengdu", name: "Chengdu", desc: "Pandas + Hot pot + Vida relajada", badge: "🐼 Pandas", image: "https://images.unsplash.com/photo-1590650046871-92c887180603?w=400&h=300&fit=crop", lat: 30.57, lng: 104.07, category: "popular" },
  { id: "xian", name: "Xi'an", desc: "Guerreros de terracota + Hanfu + Ruta de la Seda", image: "https://images.unsplash.com/photo-1545893835-abaa50cbe628?w=400&h=300&fit=crop", lat: 34.26, lng: 108.94, category: "popular" },
  { id: "chongqing", name: "Chongqing", desc: "Ciudad cyberpunk 8D — Hot pot extremo", badge: "🌃 Viral", image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400&h=300&fit=crop", lat: 29.56, lng: 106.55, category: "popular" },
  { id: "hangzhou", name: "Hangzhou", desc: "Lago del Oeste + Té + Sede de Alibaba", image: "https://images.unsplash.com/photo-1592919505780-303950717480?w=400&h=300&fit=crop", lat: 30.27, lng: 120.15, category: "popular" },
  // Emerging cities
  { id: "zhangjiajie", name: "Zhangjiajie", desc: "Montañas de Avatar — España +723% visitantes", badge: "📈 +723%", image: "https://images.unsplash.com/photo-1609756928601-c8e447d1e41b?w=400&h=300&fit=crop", lat: 29.12, lng: 110.48, category: "emerging" },
  { id: "harbin", name: "Harbin", desc: "Festival de hielo — Ciudad de invierno mágica", badge: "❄️ Hielo", image: "https://images.unsplash.com/photo-1609245792660-4e6fdc50dba3?w=400&h=300&fit=crop", lat: 45.75, lng: 126.65, category: "emerging" },
  { id: "suzhou", name: "Suzhou", desc: "Jardines clásicos + Canales + Seda", image: "https://images.unsplash.com/photo-1584450150050-4b9bdbd51a2e?w=400&h=300&fit=crop", lat: 31.30, lng: 120.62, category: "emerging" },
  { id: "kunming", name: "Kunming", desc: "Eterna primavera — Puerta a Yunnan", image: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=400&h=300&fit=crop", lat: 25.04, lng: 102.68, category: "emerging" },
  { id: "xiamen", name: "Xiamen", desc: "Isla Gulangyu + Playa + Arquitectura colonial", image: "https://images.unsplash.com/photo-1576610616656-d88da604fc62?w=400&h=300&fit=crop", lat: 24.48, lng: 118.09, category: "emerging" },
  { id: "datong", name: "Datong (Shanxi)", desc: "Grutas de Yungang + Black Myth: Wukong", badge: "🎮 Gaming", image: "https://images.unsplash.com/photo-1604998103924-89e012e5265a?w=400&h=300&fit=crop", lat: 40.09, lng: 113.30, category: "emerging" },
  { id: "guilin", name: "Guilin", desc: "Paisajes de postal — Río Li en balsa", image: "https://images.unsplash.com/photo-1537531383496-f4749b96cdb5?w=400&h=300&fit=crop&crop=bottom", lat: 25.27, lng: 110.29, category: "emerging" },
  { id: "nanjing", name: "Nanjing", desc: "Antigua capital + Historia + Comida callejera", image: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=400&h=300&fit=crop", lat: 32.06, lng: 118.80, category: "emerging" },
];

export const cityNames: Record<string, string> = Object.fromEntries(
  cities.map((c) => [c.id, c.name])
);
