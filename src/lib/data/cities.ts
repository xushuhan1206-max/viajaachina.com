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
  { id: "shanghai", name: "Shanghai", desc: "936M turistas/año — La más visitada de China", badge: "👑 #1", image: "https://images.unsplash.com/photo-1474181628621-e88b6b5b3dc9?w=600&h=400&fit=crop", lat: 31.23, lng: 121.47, category: "popular" },
  // ^ Shanghai Pudong skyline at night from the Bund
  { id: "beijing", name: "Beijing (Pekín)", desc: "Historia imperial: Muralla + Ciudad Prohibida", badge: "🔥 Clásica", image: "https://images.unsplash.com/photo-1584266032559-fe11e819d25b?w=600&h=400&fit=crop", lat: 39.90, lng: 116.40, category: "popular" },
  // ^ Great Wall of China stretching across mountains
  { id: "guangzhou", name: "Guangzhou (Cantón)", desc: "320M visitantes — Capital del dim sum", image: "https://images.unsplash.com/photo-1583996046784-54b30e6d9fce?w=600&h=400&fit=crop", lat: 23.13, lng: 113.26, category: "popular" },
  // ^ Canton Tower / Guangzhou skyline at night
  { id: "shenzhen", name: "Shenzhen", desc: "Ciudad tech: drones, AI, gadgets futuristas", badge: "🤖 Tech", image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&h=400&fit=crop", lat: 22.54, lng: 114.06, category: "popular" },
  // ^ Shenzhen modern skyline / tech city
  { id: "chengdu", name: "Chengdu", desc: "Pandas + Hot pot + Vida relajada", badge: "🐼 Pandas", image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&h=400&fit=crop", lat: 30.57, lng: 104.07, category: "popular" },
  // ^ Giant panda eating bamboo (iconic Chengdu symbol)
  { id: "xian", name: "Xi'an", desc: "Guerreros de terracota + Hanfu + Ruta de la Seda", image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&h=400&fit=crop", lat: 34.26, lng: 108.94, category: "popular" },
  // ^ Terracotta Warriors / Xi'an city wall at night
  { id: "chongqing", name: "Chongqing", desc: "Ciudad cyberpunk 8D — Hot pot extremo", badge: "🌃 Viral", image: "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600&h=400&fit=crop", lat: 29.56, lng: 106.55, category: "popular" },
  // ^ Chongqing Hongya Cave / night cityscape
  { id: "hangzhou", name: "Hangzhou", desc: "Lago del Oeste + Té + Sede de Alibaba", image: "https://images.unsplash.com/photo-1592919505780-303950717480?w=600&h=400&fit=crop", lat: 30.27, lng: 120.15, category: "popular" },
  // ^ West Lake pagoda reflection
  // Emerging cities
  { id: "zhangjiajie", name: "Zhangjiajie", desc: "Montañas de Avatar — España +723% visitantes", badge: "📈 +723%", image: "https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=600&h=400&fit=crop", lat: 29.12, lng: 110.48, category: "emerging" },
  // ^ Zhangjiajie towering sandstone pillars (Avatar mountains)
  { id: "harbin", name: "Harbin", desc: "Festival de hielo — Ciudad de invierno mágica", badge: "❄️ Hielo", image: "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?w=600&h=400&fit=crop", lat: 45.75, lng: 126.65, category: "emerging" },
  // ^ Harbin ice festival illuminated sculptures
  { id: "suzhou", name: "Suzhou", desc: "Jardines clásicos + Canales + Seda", image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600&h=400&fit=crop", lat: 31.30, lng: 120.62, category: "emerging" },
  // ^ Suzhou classical garden with pond and bridge
  { id: "kunming", name: "Kunming", desc: "Eterna primavera — Puerta a Yunnan", image: "https://images.unsplash.com/photo-1558005137-d9619a5c539f?w=600&h=400&fit=crop", lat: 25.04, lng: 102.68, category: "emerging" },
  // ^ Yunnan terraced rice fields / Stone Forest
  { id: "xiamen", name: "Xiamen", desc: "Isla Gulangyu + Playa + Arquitectura colonial", image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600&h=400&fit=crop", lat: 24.48, lng: 118.09, category: "emerging" },
  // ^ Xiamen coastal city / Gulangyu island
  { id: "datong", name: "Datong (Shanxi)", desc: "Grutas de Yungang + Black Myth: Wukong", badge: "🎮 Gaming", image: "https://images.unsplash.com/photo-1604998103924-89e012e5265a?w=600&h=400&fit=crop", lat: 40.09, lng: 113.30, category: "emerging" },
  // ^ Yungang Grottoes ancient Buddha carvings
  { id: "guilin", name: "Guilin", desc: "Paisajes de postal — Río Li en balsa", image: "https://images.unsplash.com/photo-1529921879218-f99546d03a94?w=600&h=400&fit=crop", lat: 25.27, lng: 110.29, category: "emerging" },
  // ^ Li River with karst mountains (iconic Guilin landscape)
  { id: "nanjing", name: "Nanjing", desc: "Antigua capital + Historia + Comida callejera", image: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=600&h=400&fit=crop", lat: 32.06, lng: 118.80, category: "emerging" },
  // ^ Nanjing Confucius Temple / Qinhuai River night
];

export const cityNames: Record<string, string> = Object.fromEntries(
  cities.map((c) => [c.id, c.name])
);
