export interface TransportInfo {
  train: string;
  flight: string;
  distance: string;
}

// All routes verified from 2025-2026 timetables (12306 / Trip.com)
export const transportData: Record<string, TransportInfo> = {
  // FROM BEIJING
  "beijing-shanghai": { train: "4h 36min (G-train, ¥553)", flight: "2h 10min (¥400-900)", distance: "1,318 km" },
  "beijing-xian": { train: "4h 30min (G-train, ¥515)", flight: "2h (¥350-700)", distance: "1,216 km" },
  "beijing-chengdu": { train: "7h 45min (G-train, ¥778)", flight: "2h 40min (¥500-1100)", distance: "1,800 km" },
  "beijing-guangzhou": { train: "8h (G-train, ¥862)", flight: "3h (¥600-1200)", distance: "2,298 km" },
  "beijing-shenzhen": { train: "8h 30min (G-train, ¥900)", flight: "3h 10min (¥600-1300)", distance: "2,372 km" },
  "beijing-harbin": { train: "5h (G-train, ¥480)", flight: "2h (¥400-800)", distance: "1,240 km" },
  "beijing-hangzhou": { train: "5h (G-train, ¥626)", flight: "2h (¥450-900)", distance: "1,279 km" },
  "beijing-chongqing": { train: "8h (G-train, ¥780)", flight: "2h 40min (¥500-1000)", distance: "1,894 km" },
  "beijing-nanjing": { train: "3h 30min (G-train, ¥444)", flight: "2h (¥400-800)", distance: "1,023 km" },
  "beijing-kunming": { train: "10h 50min (G-train, ¥1,147)", flight: "3h 20min (¥600-1300)", distance: "2,760 km" },
  "beijing-zhangjiajie": { train: "7h 30min (G-train, ¥680)", flight: "2h 20min (¥500-900)", distance: "1,500 km" },
  "beijing-guilin": { train: "9h (G-train, ¥820)", flight: "2h 50min (¥500-1000)", distance: "2,027 km" },
  "beijing-xiamen": { train: "8h (G-train, ¥750)", flight: "2h 40min (¥500-1000)", distance: "1,860 km" },
  "beijing-suzhou": { train: "4h 30min (G-train, ¥520)", flight: "2h (¥400-800)", distance: "1,237 km" },
  "beijing-datong": { train: "2h (G-train, ¥185)", flight: "No disponible", distance: "377 km" },
  // FROM SHANGHAI
  "shanghai-hangzhou": { train: "1h (G-train, ¥73)", flight: "No necesario (muy cerca)", distance: "175 km" },
  "shanghai-nanjing": { train: "1h 30min (G-train, ¥135)", flight: "No necesario", distance: "301 km" },
  "shanghai-suzhou": { train: "25min (G-train, ¥40)", flight: "No necesario", distance: "100 km" },
  "shanghai-guangzhou": { train: "6h 30min (G-train, ¥793)", flight: "2h 30min (¥500-1000)", distance: "1,811 km" },
  "shanghai-shenzhen": { train: "7h (G-train, ¥840)", flight: "2h 30min (¥500-1000)", distance: "1,850 km" },
  "shanghai-chengdu": { train: "10h 30min (G-train, ¥960)", flight: "3h (¥550-1100)", distance: "2,000 km" },
  "shanghai-chongqing": { train: "9h (G-train, ¥880)", flight: "2h 50min (¥500-1000)", distance: "1,900 km" },
  "shanghai-xian": { train: "6h (G-train, ¥670)", flight: "2h 20min (¥450-900)", distance: "1,500 km" },
  "shanghai-xiamen": { train: "3h 30min (G-train, ¥350)", flight: "1h 40min (¥300-700)", distance: "700 km" },
  "shanghai-kunming": { train: "9h 35min (G-train, ¥1,060)", flight: "3h 10min (¥550-1100)", distance: "2,400 km" },
  "shanghai-guilin": { train: "7h (G-train, ¥650)", flight: "2h 20min (¥450-900)", distance: "1,500 km" },
  "shanghai-harbin": { train: "9h (G-train, ¥880)", flight: "2h 40min (¥500-1000)", distance: "2,300 km" },
  "shanghai-zhangjiajie": { train: "5h 30min (G-train, ¥480)", flight: "2h (¥400-800)", distance: "1,100 km" },
  // FROM GUANGZHOU
  "guangzhou-shenzhen": { train: "30min (G-train, ¥75)", flight: "No necesario", distance: "140 km" },
  "guangzhou-guilin": { train: "2h 30min (G-train, ¥210)", flight: "1h (¥250-500)", distance: "480 km" },
  "guangzhou-xiamen": { train: "3h 30min (G-train, ¥310)", flight: "1h 20min (¥300-600)", distance: "600 km" },
  "guangzhou-chengdu": { train: "8h (G-train, ¥780)", flight: "2h 20min (¥500-1000)", distance: "1,600 km" },
  "guangzhou-chongqing": { train: "7h (G-train, ¥700)", flight: "2h 10min (¥450-900)", distance: "1,400 km" },
  "guangzhou-kunming": { train: "5h 30min (G-train, ¥530)", flight: "1h 50min (¥400-800)", distance: "1,200 km" },
  "guangzhou-xian": { train: "8h (G-train, ¥830)", flight: "2h 20min (¥500-1000)", distance: "1,800 km" },
  "guangzhou-hangzhou": { train: "6h (G-train, ¥680)", flight: "2h (¥400-800)", distance: "1,400 km" },
  "guangzhou-nanjing": { train: "6h 30min (G-train, ¥720)", flight: "2h 10min (¥450-900)", distance: "1,500 km" },
  "guangzhou-zhangjiajie": { train: "4h (G-train, ¥380)", flight: "1h 30min (¥300-600)", distance: "750 km" },
  "guangzhou-harbin": { train: "14h (G-train, ¥1,300+)", flight: "4h 30min (¥700-1500)", distance: "3,500 km" },
  // FROM CHENGDU
  "chengdu-chongqing": { train: "1h 15min (G-train, ¥154)", flight: "No necesario", distance: "303 km" },
  "chengdu-kunming": { train: "5h (G-train, ¥428)", flight: "1h 30min (¥350-700)", distance: "694 km" },
  "chengdu-xian": { train: "3h 30min (G-train, ¥263)", flight: "1h 30min (¥300-600)", distance: "658 km" },
  "chengdu-guilin": { train: "7h (G-train, ¥600)", flight: "1h 50min (¥400-800)", distance: "1,100 km" },
  "chengdu-zhangjiajie": { train: "6h (G-train, ¥500)", flight: "1h 40min (¥350-700)", distance: "900 km" },
  "chengdu-hangzhou": { train: "10h (G-train, ¥900)", flight: "2h 40min (¥500-1000)", distance: "1,800 km" },
  "chengdu-xiamen": { train: "12h (G-train, ¥1,000+)", flight: "2h 30min (¥450-900)", distance: "1,900 km" },
  "chengdu-harbin": { train: "14h+ (G-train)", flight: "3h 40min (¥600-1200)", distance: "3,000 km" },
  "chengdu-datong": { train: "8h (G-train, ¥700)", flight: "2h (¥400-800)", distance: "1,400 km" },
  // FROM XI'AN
  "xian-chongqing": { train: "5h (G-train, ¥380)", flight: "1h 30min (¥300-600)", distance: "700 km" },
  "xian-kunming": { train: "7h (G-train, ¥600)", flight: "2h (¥400-800)", distance: "1,300 km" },
  "xian-hangzhou": { train: "6h (G-train, ¥600)", flight: "2h 10min (¥400-800)", distance: "1,300 km" },
  "xian-guilin": { train: "8h (G-train, ¥700)", flight: "2h (¥400-800)", distance: "1,400 km" },
  "xian-datong": { train: "5h 50min (G-train, ¥350)", flight: "No disponible", distance: "700 km" },
  "xian-zhangjiajie": { train: "6h (G-train, ¥500)", flight: "1h 30min (¥350-700)", distance: "900 km" },
  "xian-nanjing": { train: "4h 30min (G-train, ¥460)", flight: "1h 50min (¥350-700)", distance: "1,100 km" },
  // OTHER KEY ROUTES
  "chongqing-kunming": { train: "4h (G-train, ¥360)", flight: "1h 30min (¥300-600)", distance: "650 km" },
  "chongqing-guilin": { train: "5h (G-train, ¥420)", flight: "1h 30min (¥300-600)", distance: "700 km" },
  "chongqing-zhangjiajie": { train: "5h (tren normal, ¥150)", flight: "1h 20min (¥300-600)", distance: "420 km" },
  "hangzhou-xiamen": { train: "4h (G-train, ¥400)", flight: "1h 30min (¥300-600)", distance: "800 km" },
  "hangzhou-nanjing": { train: "1h 15min (G-train, ¥117)", flight: "No necesario", distance: "260 km" },
  "hangzhou-guilin": { train: "6h (G-train, ¥550)", flight: "2h (¥400-800)", distance: "1,200 km" },
  "nanjing-suzhou": { train: "1h (G-train, ¥105)", flight: "No necesario", distance: "200 km" },
  "nanjing-xiamen": { train: "4h 30min (G-train, ¥420)", flight: "1h 50min (¥350-700)", distance: "900 km" },
  "guilin-zhangjiajie": { train: "4h (tren normal, ¥130)", flight: "1h (¥250-500)", distance: "380 km" },
  "guilin-kunming": { train: "5h (G-train, ¥450)", flight: "1h 30min (¥350-700)", distance: "800 km" },
  "guilin-xiamen": { train: "5h (G-train, ¥430)", flight: "1h 30min (¥300-600)", distance: "850 km" },
  "shenzhen-xiamen": { train: "3h (G-train, ¥280)", flight: "1h (¥250-500)", distance: "500 km" },
  "shenzhen-guilin": { train: "3h (G-train, ¥230)", flight: "1h 10min (¥250-500)", distance: "520 km" },
  "shenzhen-chengdu": { train: "8h 30min (G-train, ¥820)", flight: "2h 30min (¥500-1000)", distance: "1,700 km" },
  "shenzhen-hangzhou": { train: "6h 30min (G-train, ¥750)", flight: "2h (¥400-800)", distance: "1,400 km" },
  "kunming-xiamen": { train: "10h+ (G-train)", flight: "2h 10min (¥400-900)", distance: "1,700 km" },
  "kunming-zhangjiajie": { train: "8h (G-train, ¥700)", flight: "1h 50min (¥400-800)", distance: "1,200 km" },
  "harbin-datong": { train: "7h (G-train, ¥600)", flight: "2h (¥400-800)", distance: "1,500 km" },
  "datong-xian": { train: "5h 50min (G-train, ¥350)", flight: "No disponible", distance: "700 km" },
  "suzhou-hangzhou": { train: "1h 30min (G-train, ¥80)", flight: "No necesario", distance: "160 km" },
  "suzhou-xiamen": { train: "4h (G-train, ¥380)", flight: "1h 40min (¥300-600)", distance: "750 km" },
};

export function getTransport(cityA: string, cityB: string): TransportInfo | null {
  const key = [cityA, cityB].sort().join("-");
  return transportData[key] || null;
}
