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

// Images from Unsplash (free, no attribution required)
// Each image chosen for the city's most iconic landmark/scene
export const cities: City[] = [
  // Popular cities
  { id: "shanghai", name: "Shanghai", desc: "936M turistas/año — La más visitada de China", badge: "👑 #1", image: "/cities/shanghai.jpg", lat: 31.23, lng: 121.47, category: "popular" },
  // ^ Pudong skyline night (custom photo by Li Yang)
  { id: "beijing", name: "Beijing (Pekín)", desc: "Historia imperial: Muralla + Ciudad Prohibida", badge: "🔥 Clásica", image: "/cities/beijing.jpg", lat: 39.90, lng: 116.40, category: "popular" },
  // ^ Forbidden City red walls (custom photo by Peter Zhou)
  { id: "guangzhou", name: "Guangzhou (Cantón)", desc: "320M visitantes — Capital del dim sum", image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=600&h=400&fit=crop", lat: 23.13, lng: 113.26, category: "popular" },
  // ^ Cantonese dim sum / yum cha spread
  { id: "shenzhen", name: "Shenzhen", desc: "Ciudad tech: drones, AI, gadgets futuristas", badge: "🤖 Tech", image: "https://images.unsplash.com/photo-1598887142487-3c854d51eabb?w=600&h=400&fit=crop", lat: 22.54, lng: 114.06, category: "popular" },
  // ^ Shenzhen Futian CBD skyline night with Ping An tower
  { id: "chengdu", name: "Chengdu", desc: "Pandas + Hot pot + Vida relajada", badge: "🐼 Pandas", image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&h=400&fit=crop", lat: 30.57, lng: 104.07, category: "popular" },
  // ^ Giant panda eating bamboo close-up
  { id: "xian", name: "Xi'an", desc: "Guerreros de terracota + Hanfu + Ruta de la Seda", image: "/cities/xian.jpg", lat: 34.26, lng: 108.94, category: "popular" },
  // ^ Xi'an city wall and moat at dusk (custom photo by zyan1226)
  { id: "chongqing", name: "Chongqing", desc: "Ciudad cyberpunk 8D — Hot pot extremo", badge: "🌃 Viral", image: "https://images.unsplash.com/photo-1609693504289-4c46bbe3be1e?w=600&h=400&fit=crop", lat: 29.56, lng: 106.55, category: "popular" },
  // ^ Chongqing Hongyadong night golden glow riverside
  { id: "hangzhou", name: "Hangzhou", desc: "Lago del Oeste + Té + Sede de Alibaba", image: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=600&h=400&fit=crop", lat: 30.27, lng: 120.15, category: "popular" },
  // ^ West Lake Hangzhou pagoda misty morning
  // Emerging cities
  { id: "zhangjiajie", name: "Zhangjiajie", desc: "Montañas de Avatar — España +723% visitantes", badge: "📈 +723%", image: "https://images.unsplash.com/photo-1609756928601-c8e447d1e41b?w=600&h=400&fit=crop", lat: 29.12, lng: 110.48, category: "emerging" },
  // ^ Zhangjiajie sandstone pillars rising through clouds (Avatar mountains)
  { id: "harbin", name: "Harbin", desc: "Festival de hielo — Ciudad de invierno mágica", badge: "❄️ Hielo", image: "https://images.unsplash.com/photo-1611142264942-8be5e7b9bf3e?w=600&h=400&fit=crop", lat: 45.75, lng: 126.65, category: "emerging" },
  // ^ Harbin ice and snow world festival colorful illumination
  { id: "suzhou", name: "Suzhou", desc: "Jardines clásicos + Canales + Seda", image: "https://images.unsplash.com/photo-1584450150050-4b9bdbd51a2e?w=600&h=400&fit=crop", lat: 31.30, lng: 120.62, category: "emerging" },
  // ^ Suzhou traditional garden pavilion over water
  { id: "kunming", name: "Kunming", desc: "Eterna primavera — Puerta a Yunnan", image: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=600&h=400&fit=crop", lat: 25.04, lng: 102.68, category: "emerging" },
  // ^ Yunnan rice terraces golden green landscape
  { id: "xiamen", name: "Xiamen", desc: "Isla Gulangyu + Playa + Arquitectura colonial", image: "https://images.unsplash.com/photo-1576610616656-d88da604fc62?w=600&h=400&fit=crop", lat: 24.48, lng: 118.09, category: "emerging" },
  // ^ Xiamen Gulangyu island coastal architecture
  { id: "datong", name: "Datong (Shanxi)", desc: "Grutas de Yungang + Black Myth: Wukong", badge: "🎮 Gaming", image: "https://images.unsplash.com/photo-1604998103924-89e012e5265a?w=600&h=400&fit=crop", lat: 40.09, lng: 113.30, category: "emerging" },
  // ^ Yungang Grottoes giant Buddha stone carving
  { id: "guilin", name: "Guilin", desc: "Paisajes de postal — Río Li en balsa", image: "https://images.unsplash.com/photo-1537531383496-f4749b96cdb5?w=600&h=400&fit=crop", lat: 25.27, lng: 110.29, category: "emerging" },
  // ^ Li River bamboo raft with karst mountains reflection
  { id: "nanjing", name: "Nanjing", desc: "Antigua capital + Historia + Comida callejera", image: "https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=600&h=400&fit=crop", lat: 32.06, lng: 118.80, category: "emerging" },
  // ^ Nanjing Ming Dynasty city wall / Qinhuai River lanterns
];

export const cityNames: Record<string, string> = Object.fromEntries(
  cities.map((c) => [c.id, c.name])
);
