const intentOptions = [
  {
    id: "route_planning",
    label: "Crear ruta",
    reply: "Perfecto. Voy a ordenar tus fechas, ciudades e intereses para crear una ruta realista.",
  },
  {
    id: "city_discovery",
    label: "Elegir ciudades",
    reply: "Bien. Primero voy a entender tus gustos para recomendar ciudades que realmente encajen contigo.",
  },
  {
    id: "payment_help",
    label: "Pagos en China",
    reply: "Vamos a resolver pagos de forma practica: Alipay, WeChat Pay, tarjetas y plan B.",
  },
  {
    id: "transport_help",
    label: "Trenes y transporte",
    reply: "Te ayudo a decidir tren, avion, metro o Didi segun tu ruta y nivel de comodidad.",
  },
  {
    id: "tickets_help",
    label: "Entradas y reservas",
    reply: "Te ayudo a saber que reservar, con cuanta antelacion y que hacer si se agota.",
  },
  {
    id: "prep_help",
    label: "Prepararme",
    reply: "Vamos a revisar lo practico antes de viajar: entrada, pagos, conectividad, apps y riesgos.",
  },
  {
    id: "general_question",
    label: "Pregunta libre",
    reply: "Claro. Respondo tu duda y, si falta contexto para una guia completa, te hare pocas preguntas.",
  },
];

const baseQuestions = [
  {
    key: "intent",
    label: "Objetivo",
    prompt: "¿Que quieres resolver primero?",
    replies: intentOptions.map((intent) => intent.label),
    hidden: true,
  },
  {
    key: "duration",
    label: "Duracion",
    prompt: "¿Cuantos dias quieres viajar por China?",
    replies: ["5 dias", "8 dias", "12 dias"],
  },
  {
    key: "travelers",
    label: "Viajeros",
    prompt: "¿Viajas solo, en pareja, con amigos o en familia?",
    replies: ["Solo", "Pareja", "Amigos", "Familia"],
  },
  {
    key: "budget",
    label: "Presupuesto",
    prompt: "¿Que presupuesto prefieres para el viaje?",
    replies: ["Economico", "Equilibrado", "Comodo"],
  },
  {
    key: "interests",
    label: "Intereses",
    prompt: "¿Que te interesa mas: historia, comida, naturaleza, compras o vida nocturna?",
    replies: ["Historia y cultura", "Comida local", "Naturaleza", "Compras"],
  },
  {
    key: "cities",
    label: "Ciudades",
    prompt: "¿Hay ciudades que ya tengas en mente?",
    replies: ["Pekin + Shanghai", "Shanghai + Hangzhou", "Pekin + Xi'an", "Sorprendeme"],
  },
  {
    key: "support",
    label: "Ayuda clave",
    prompt: "¿Donde necesitas mas ayuda practica antes de viajar?",
    replies: ["Pagos", "Trenes y metro", "Entradas", "Idioma y apps"],
  },
];

const questionFlows = {
  route_planning: ["duration", "cities", "interests", "budget", "travelers", "support"],
  city_discovery: ["interests", "budget", "travelers", "duration", "cities"],
  payment_help: ["support", "travelers", "duration", "cities"],
  transport_help: ["cities", "duration", "budget", "support"],
  tickets_help: ["cities", "duration", "support"],
  prep_help: ["support", "duration", "travelers", "cities"],
  general_question: ["support", "duration", "interests"],
};

const questionOverrides = {
  city_discovery: {
    interests: {
      prompt: "¿Que tipo de viaje te atrae mas?",
      replies: ["Historia y cultura", "Comida local", "Naturaleza", "Ciudades modernas", "Viaje familiar"],
    },
    budget: {
      prompt: "¿Que nivel de presupuesto te gustaria mantener?",
      replies: ["Economico", "Equilibrado", "Comodo"],
    },
    travelers: {
      prompt: "¿Con quien viajas? Esto cambia mucho la recomendacion de ciudades.",
      replies: ["Solo", "Pareja", "Amigos", "Familia"],
    },
    duration: {
      prompt: "¿Cuantos dias tienes aproximadamente?",
      replies: ["5-7 dias", "8-10 dias", "12-15 dias", "Todavia no se"],
    },
    cities: {
      prompt: "¿Quieres una ruta clasica o prefieres descubrir ciudades menos obvias?",
      replies: ["Clasica primera vez", "Comida local", "Naturaleza", "Moderna", "Sorprendeme"],
    },
  },
  payment_help: {
    support: {
      prompt: "¿Que parte de pagos te preocupa mas?",
      replies: ["Configurar Alipay", "WeChat Pay", "Tarjeta internacional", "Efectivo y plan B"],
    },
  },
  transport_help: {
    cities: {
      prompt: "¿Entre que ciudades necesitas comparar transporte?",
      replies: ["Beijing -> Xi'an", "Xi'an -> Shanghai", "Shanghai -> Hangzhou", "No lo se todavia"],
    },
  },
  tickets_help: {
    support: {
      prompt: "¿Que tipo de reserva te preocupa?",
      replies: ["Ciudad Prohibida", "Guerreros de Terracota", "Gran Muralla", "No se que reservar"],
    },
  },
  prep_help: {
    support: {
      prompt: "¿Que preparacion quieres revisar primero?",
      replies: ["Entrada/visado", "Pagos", "Internet y apps", "Trenes", "Entradas"],
    },
  },
};

const destinations = [
  {
    id: "beijing",
    name: "Pekin",
    region: "Historia imperial",
    intro: "Gran Muralla, Ciudad Prohibida, hutongs y pato laqueado. Ideal para empezar a entender China.",
    feature: "Palacios imperiales, tramos de Gran Muralla y cultura de hutong.",
    photo: "Forbidden City Beijing Shenwumen Gate.JPG",
    localPhoto: "assets/destinations/beijing-card.jpg",
    x: 426,
    y: 138,
    lat: 39.9042,
    lng: 116.4074,
  },
  {
    id: "shanghai",
    name: "Shanghai",
    region: "Ciudad moderna",
    intro: "Rascacielos, barrios historicos, museos, compras y una entrada suave al ritmo urbano chino.",
    feature: "Bund, skyline de Pudong, museos y compras faciles para primerizos.",
    photo: "Shanghai Skyline from the Bund.jpg",
    localPhoto: "assets/destinations/shanghai-card.jpg",
    x: 540,
    y: 270,
    lat: 31.2304,
    lng: 121.4737,
  },
  {
    id: "xian",
    name: "Xi'an",
    region: "Ruta antigua",
    intro: "Guerreros de terracota, muralla antigua y comida musulmana local. Muy fuerte en cultura.",
    feature: "Guerreros de terracota, muralla antigua y noodles de Shaanxi.",
    photo: "Terracotta Army, View of Pit 1.jpg",
    localPhoto: "assets/destinations/xian-card.jpg",
    x: 358,
    y: 252,
    lat: 34.3416,
    lng: 108.9398,
  },
  {
    id: "chengdu",
    name: "Chengdu",
    region: "Comida y pandas",
    intro: "Sichuan, casas de te, vida relajada y base perfecta para experiencias gastronomicas.",
    feature: "Pandas, casas de te y cocina picante de Sichuan.",
    photo: "Giant Panda (48341594941).jpg",
    x: 302,
    y: 308,
    lat: 30.5728,
    lng: 104.0668,
  },
  {
    id: "chongqing",
    name: "Chongqing",
    region: "Montana urbana",
    intro: "Hotpot, miradores, trenes elevados y una ciudad vertical con energia cinematografica.",
    feature: "Hotpot, miradores nocturnos y barrios sobre colinas.",
    photo: "SkylineOfChongqing.jpg",
    x: 346,
    y: 326,
    lat: 29.563,
    lng: 106.5516,
  },
  {
    id: "hangzhou",
    name: "Hangzhou",
    region: "Lago y poesia",
    intro: "Lago del Oeste, plantaciones de te y escapadas tranquilas cerca de Shanghai.",
    feature: "Lago del Oeste, te Longjing y paseos junto al agua.",
    photo: "West Lake, Hangzhou, China.jpg",
    x: 522,
    y: 292,
    lat: 30.2741,
    lng: 120.1551,
  },
  {
    id: "suzhou",
    name: "Suzhou",
    region: "Jardines clasicos",
    intro: "Canales, jardines patrimonio y una visita facil de combinar con Shanghai.",
    feature: "Jardines clasicos, canales y arquitectura de Jiangnan.",
    photo: "Humble Administrator's Garden.JPG",
    x: 526,
    y: 264,
    lat: 31.2989,
    lng: 120.5853,
  },
  {
    id: "guangzhou",
    name: "Guangzhou",
    region: "Canton y negocios",
    intro: "Dim sum, mercados, arquitectura nueva y conexiones comodas por el sur de China.",
    feature: "Dim sum, Torre Canton y vida comercial del sur.",
    photo: "Canton Tower.JPG",
    x: 432,
    y: 386,
    lat: 23.1291,
    lng: 113.2644,
  },
  {
    id: "shenzhen",
    name: "Shenzhen",
    region: "Innovacion",
    intro: "Tecnologia, diseno, compras y playas cercanas. Buena parada junto a Hong Kong.",
    feature: "Tecnologia, diseno urbano, compras y costa cercana.",
    photo: "Shenzhen Skyline from Nanshan.jpg",
    localPhoto: "assets/destinations/shenzhen-card.jpg",
    x: 456,
    y: 402,
    lat: 22.5431,
    lng: 114.0579,
  },
  {
    id: "guilin",
    name: "Guilin",
    region: "Paisaje karstico",
    intro: "Montanas de piedra caliza, rio Li y pueblos pequenos para una ruta natural.",
    feature: "Rio Li, montanas karsticas y paseos rurales.",
    photo: "Guilin Li River.jpg",
    x: 382,
    y: 372,
    lat: 25.2736,
    lng: 110.2902,
  },
  {
    id: "kunming",
    name: "Kunming",
    region: "Yunnan suave",
    intro: "Clima agradable, diversidad cultural y puerta de entrada a Dali, Lijiang o Shangri-La.",
    feature: "Clima templado, mercados de flores y diversidad de Yunnan.",
    photo: "Dianchi Lake.jpg",
    x: 252,
    y: 372,
    lat: 24.8801,
    lng: 102.8329,
  },
  {
    id: "lijiang",
    name: "Lijiang",
    region: "Yunnan historico",
    intro: "Casco antiguo, cultura naxi y montanas. Mejor para viajeros con mas dias.",
    feature: "Casco antiguo, cultura naxi y vistas de montana.",
    photo: "Lijiang Old Town.jpg",
    x: 228,
    y: 346,
    lat: 26.8721,
    lng: 100.2299,
  },
  {
    id: "zhangjiajie",
    name: "Zhangjiajie",
    region: "Naturaleza epica",
    intro: "Parque nacional, puentes de cristal y montanas dramaticas para fotos memorables.",
    feature: "Columnas de roca, miradores altos y senderos de parque nacional.",
    photo: "Zhangjiajie National Forest Park.jpg",
    x: 398,
    y: 330,
    lat: 29.1171,
    lng: 110.4792,
  },
  {
    id: "qingdao",
    name: "Qingdao",
    region: "Costa norte",
    intro: "Playas, arquitectura alemana, mariscos y una escapada mas relajada junto al mar.",
    feature: "Costa, arquitectura historica y mariscos.",
    photo: "Qingdao - Drone view city with skyline (Unsplash).jpg",
    x: 502,
    y: 190,
    lat: 36.0671,
    lng: 120.3826,
  },
  {
    id: "harbin",
    name: "Harbin",
    region: "Invierno",
    intro: "Festival de hielo, arquitectura rusa y una China muy distinta en temporada fria.",
    feature: "Festival de hielo, nieve y arquitectura de influencia rusa.",
    photo: "Snow and Ice World festival in Harbin, China (3237680159).jpg",
    x: 520,
    y: 72,
    lat: 45.8038,
    lng: 126.5349,
  },
  {
    id: "hongkong",
    name: "Hong Kong",
    region: "Skyline y bahia",
    intro: "Vistas, ferry, comida cantonesa y conexiones internacionales para cerrar el viaje.",
    feature: "Bahia Victoria, ferry, dim sum y conexiones internacionales.",
    photo: "Hong-Kong skyline.JPG",
    x: 462,
    y: 414,
    lat: 22.3193,
    lng: 114.1694,
  },
];

const transportRoutes = {
  "beijing-shanghai": [
    { mode: "Tren G", time: "4 h 30 min - 5 h 45 min", price: "¥553-669", note: "Mejor equilibrio para primer viaje." },
    { mode: "Avion", time: "2 h 15 min vuelo + traslados", price: "¥600-1,300", note: "Ahorra poco tiempo real si incluyes aeropuertos." },
  ],
  "beijing-xian": [
    { mode: "Tren G", time: "4 h 15 min - 5 h 30 min", price: "¥515-600", note: "Ruta historica clasica." },
    { mode: "Avion", time: "2 h 10 min vuelo + traslados", price: "¥500-1,100", note: "Util si el horario de tren no encaja." },
  ],
  "beijing-chengdu": [
    { mode: "Avion", time: "2 h 50 min vuelo + traslados", price: "¥650-1,500", note: "Opcion mas practica." },
    { mode: "Tren G", time: "7 h 30 min - 10 h", price: "¥778-1,000", note: "Solo si quieres evitar vuelos internos." },
  ],
  "beijing-harbin": [
    { mode: "Tren G", time: "5 h - 6 h", price: "¥306-600", note: "Bueno en temporada de hielo." },
    { mode: "Avion", time: "2 h vuelo + traslados", price: "¥500-1,200", note: "Mas sensible al clima de invierno." },
  ],
  "beijing-qingdao": [
    { mode: "Tren G", time: "3 h 15 min - 4 h", price: "¥314-370", note: "Comodo para costa norte." },
    { mode: "Avion", time: "1 h 30 min vuelo + traslados", price: "¥400-900", note: "Normalmente no compensa tanto." },
  ],
  "shanghai-xian": [
    { mode: "Tren G", time: "6 h - 7 h 30 min", price: "¥669-800", note: "Conecta modernidad e historia." },
    { mode: "Avion", time: "2 h 30 min vuelo + traslados", price: "¥500-1,200", note: "Mejor si viajas con pocos dias." },
  ],
  "hangzhou-shanghai": [
    { mode: "Tren G", time: "45 min - 1 h", price: "¥73-90", note: "Excursion facil desde Shanghai." },
    { mode: "Coche", time: "2 h - 2 h 30 min", price: "¥500-800", note: "Solo recomendable con equipaje o grupo." },
  ],
  "shanghai-suzhou": [
    { mode: "Tren G/D", time: "25 - 40 min", price: "¥35-45", note: "La excursion mas sencilla desde Shanghai." },
    { mode: "Coche", time: "1 h 30 min - 2 h", price: "¥350-600", note: "Evitar horas punta." },
  ],
  "chengdu-xian": [
    { mode: "Tren G/D", time: "3 h 15 min - 4 h", price: "¥263-397", note: "Muy buena conexion interior." },
    { mode: "Avion", time: "1 h 35 min vuelo + traslados", price: "¥400-900", note: "No siempre compensa frente al tren." },
  ],
  "chengdu-chongqing": [
    { mode: "Tren G/D", time: "1 h - 1 h 30 min", price: "¥96-154", note: "Tramo ideal para alta velocidad." },
    { mode: "Coche", time: "3 h 30 min - 4 h", price: "¥500-800", note: "Solo si haces paradas intermedias." },
  ],
  "chengdu-kunming": [
    { mode: "Tren G/D", time: "5 h 30 min - 6 h 30 min", price: "¥470-560", note: "Buena entrada hacia Yunnan." },
    { mode: "Avion", time: "1 h 35 min vuelo + traslados", price: "¥450-1,000", note: "Ahorra tiempo si no quieres medio dia de tren." },
  ],
  "chongqing-zhangjiajie": [
    { mode: "Tren + traslado", time: "4 h 30 min - 6 h", price: "¥220-380", note: "Revisar estacion exacta y traslado al parque." },
    { mode: "Avion", time: "1 h 10 min vuelo + traslados", price: "¥450-1,100", note: "Frecuencias menos constantes." },
  ],
  "guangzhou-shenzhen": [
    { mode: "Tren G/C", time: "30 - 45 min", price: "¥74-100", note: "Conexion urbana del sur." },
    { mode: "Metro/coche", time: "1 h 30 min - 2 h 30 min", price: "¥80-500", note: "Depende mucho del origen exacto." },
  ],
  "hongkong-shenzhen": [
    { mode: "Tren transfronterizo", time: "15 - 25 min", price: "¥68-90", note: "Requiere control fronterizo." },
    { mode: "Metro + frontera", time: "1 h - 1 h 40 min", price: "¥30-80", note: "Mas barato, menos directo." },
  ],
  "guangzhou-hongkong": [
    { mode: "Tren G", time: "50 min - 1 h 15 min", price: "¥215-250", note: "Requiere documento valido para Hong Kong." },
    { mode: "Bus", time: "3 h - 4 h", price: "¥100-180", note: "Mas economico, mas lento." },
  ],
  "guangzhou-guilin": [
    { mode: "Tren D/G", time: "2 h 45 min - 3 h 30 min", price: "¥165-220", note: "Comodo para naturaleza karstica." },
    { mode: "Avion", time: "1 h 15 min vuelo + traslados", price: "¥400-900", note: "Normalmente no compensa salvo oferta." },
  ],
  "kunming-lijiang": [
    { mode: "Tren", time: "3 h 15 min - 3 h 50 min", price: "¥220-260", note: "Ruta clasica de Yunnan." },
    { mode: "Avion", time: "1 h vuelo + traslados", price: "¥350-900", note: "Solo si el itinerario va muy justo." },
  ],
  "guilin-zhangjiajie": [
    { mode: "Tren + traslado", time: "6 h - 8 h", price: "¥280-450", note: "Revisar combinacion diaria." },
    { mode: "Avion", time: "1 h 20 min vuelo + traslados", price: "¥500-1,200", note: "Frecuencias variables." },
  ],
};

const ACCOUNT_STORAGE_KEY = "viajaachina-demo-account";
const PREP_STORAGE_KEY = "viajaachina-prep-state";

const prepScenarios = [
  { id: "first_time", label: "Es mi primera vez", modules: ["visa", "payments", "apps", "transport", "risks"] },
  { id: "flight_booked", label: "Ya tengo vuelos", modules: ["visa", "payments", "apps", "risks"] },
  { id: "less_30", label: "Viajo en menos de 30 dias", modules: ["visa", "payments", "transport", "risks"] },
  { id: "train_route", label: "Usare trenes", modules: ["transport", "apps", "risks"] },
];

const prepModules = [
  {
    id: "visa",
    title: "Visa y entrada",
    intro: "Orientacion inicial para saber que revisar antes de comprar vuelos o reservar hoteles.",
    diagnostics: [
      {
        id: "entry_rule",
        question: "Ya sabes si puedes entrar sin visa o necesitas solicitar una?",
        options: [
          { value: "confirmed", label: "Confirmado", risk: "ready" },
          { value: "unsure", label: "No estoy seguro", risk: "high" },
          { value: "checking", label: "Lo estoy revisando", risk: "medium" },
        ],
      },
      {
        id: "regions",
        question: "Tu ruta incluye China continental, Hong Kong, Macao o Taiwan?",
        options: [
          { value: "mainland", label: "Solo continental", risk: "low" },
          { value: "mixed", label: "Incluye fronteras", risk: "medium" },
          { value: "unknown", label: "No lo se", risk: "medium" },
        ],
      },
    ],
    guide: {
      why: [
        "La entrada define si puedes comprar vuelos con tranquilidad.",
        "China continental, Hong Kong, Macao y Taiwan pueden tener requisitos distintos.",
      ],
      how: [
        "Confirma nacionalidad, motivo del viaje, dias de estancia y numero de entradas.",
        "Revisa la web oficial de la embajada/consulado chino de tu pais.",
        "Guarda capturas de la regla aplicable y de tu pasaporte.",
      ],
      failures: [
        "Pensar que una exencion aplica a todas las nacionalidades.",
        "Hacer una ruta con salida y reentrada sin confirmar entradas multiples.",
      ],
      backup: [
        "Si hay duda, diseña una ruta mas simple sin cruces fronterizos.",
        "Deja margen antes del viaje para tramites o cambios de vuelo.",
      ],
    },
    checklist: [
      "Confirmar si tu nacionalidad tiene exencion de visado o necesita visa.",
      "Verificar duracion permitida de estancia y numero de entradas.",
      "Revisar si entras a China continental, Hong Kong, Macao o Taiwan.",
      "Guardar links oficiales de embajada/consulado chino o autoridad migratoria.",
      "Tener pasaporte con vigencia suficiente y paginas libres.",
    ],
    warnings: [
      "Las politicas de visa cambian: confirma siempre en fuentes oficiales.",
      "Transito, turismo y negocios pueden tener reglas diferentes.",
    ],
  },
  {
    id: "payments",
    title: "Pagos moviles",
    intro: "China funciona principalmente con pagos QR. Configuralos antes de aterrizar.",
    diagnostics: [
      {
        id: "alipay",
        question: "Ya vinculaste una tarjeta internacional en Alipay?",
        options: [
          { value: "tested", label: "Si, probado", risk: "ready" },
          { value: "linked", label: "Solo vinculada", risk: "medium" },
          { value: "none", label: "Todavia no", risk: "high" },
        ],
      },
      {
        id: "backup_money",
        question: "Tienes plan B si el QR falla?",
        options: [
          { value: "cash_wechat", label: "Efectivo + WeChat", risk: "ready" },
          { value: "cash", label: "Solo efectivo", risk: "medium" },
          { value: "none", label: "No", risk: "high" },
        ],
      },
    ],
    guide: {
      why: [
        "Muchos pagos cotidianos se hacen por codigo QR.",
        "Una tarjeta fisica extranjera no siempre resuelve restaurantes, taxis o tiendas pequenas.",
      ],
      how: [
        "Instala Alipay, registrate, vincula tarjeta Visa/Mastercard y completa verificacion.",
        "Activa WeChat Pay si puedes, como segunda opcion.",
        "Lleva algo de efectivo para fallos de red, limite o verificacion.",
      ],
      failures: [
        "Llegar sin poder recibir SMS de verificacion.",
        "Usar una tarjeta con bloqueo internacional o limite bajo.",
      ],
      backup: [
        "Pide al hotel ayuda para taxi o pagos urgentes.",
        "Ten efectivo en RMB para transporte corto y comida basica.",
      ],
    },
    checklist: [
      "Descargar Alipay y registrarte con numero internacional.",
      "Vincular Visa/Mastercard y completar verificacion con pasaporte.",
      "Probar una compra pequena o revisar que el codigo QR se active.",
      "Instalar WeChat Pay como alternativa cuando sea posible.",
      "Llevar efectivo de respaldo para comercios pequenos o fallos de tarjeta.",
    ],
    warnings: [
      "Algunos comercios pequeños no aceptan tarjetas fisicas extranjeras.",
      "Si cambias de telefono o SIM, verifica que puedas recibir codigos.",
    ],
  },
  {
    id: "apps",
    title: "Internet y apps",
    intro: "Prepara conectividad, mapas, traduccion y reservas antes de salir.",
    diagnostics: [
      {
        id: "data",
        question: "Ya tienes datos moviles que funcionen en China?",
        options: [
          { value: "ready", label: "eSIM/roaming listo", risk: "ready" },
          { value: "choosing", label: "Comparando opciones", risk: "medium" },
          { value: "none", label: "No", risk: "high" },
        ],
      },
      {
        id: "local_apps",
        question: "Tienes apps locales para mapa, reservas y traduccion?",
        options: [
          { value: "ready", label: "Todo instalado", risk: "ready" },
          { value: "partial", label: "Me falta alguna", risk: "medium" },
          { value: "none", label: "No", risk: "high" },
        ],
      },
    ],
    guide: {
      why: [
        "Sin datos, pagar, traducir, pedir taxi o ubicar una estacion se vuelve dificil.",
        "Las apps occidentales no siempre son suficientes dentro de China continental.",
      ],
      how: [
        "Define eSIM, roaming o SIM local antes de salir.",
        "Instala Trip.com, Alipay, WeChat, Amap/Baidu Maps y traductor.",
        "Guarda direcciones de hoteles y estaciones en chino y en capturas offline.",
      ],
      failures: [
        "Comprar eSIM incompatible o que no activa datos en China.",
        "Depender solo de Google Maps para moverte dentro de ciudades.",
      ],
      backup: [
        "Guarda el nombre chino de cada hotel y atraccion.",
        "Pide tarjetas impresas o capturas en recepcion del hotel.",
      ],
    },
    checklist: [
      "Contratar eSIM, roaming o plan de datos que funcione en China.",
      "Instalar Trip.com para hoteles, trenes y entradas con tarjeta extranjera.",
      "Instalar Amap o Baidu Maps y guardar direcciones en chino.",
      "Preparar traductor offline o frases basicas para taxi/restaurante.",
      "Guardar reservas y direcciones tambien en capturas de pantalla.",
    ],
    warnings: [
      "Google Maps puede ser poco practico dentro de China continental.",
      "Algunas apps occidentales pueden no funcionar igual: prepara alternativa.",
    ],
  },
  {
    id: "transport",
    title: "Trenes y transporte",
    intro: "El tren de alta velocidad es excelente, pero requiere planificar con pasaporte.",
    diagnostics: [
      {
        id: "tickets",
        question: "Ya sabes como comprar trenes con pasaporte?",
        options: [
          { value: "ready", label: "Si", risk: "ready" },
          { value: "need_help", label: "Necesito guia", risk: "medium" },
          { value: "none", label: "No", risk: "high" },
        ],
      },
      {
        id: "stations",
        question: "Revisaste la estacion exacta de salida y llegada?",
        options: [
          { value: "checked", label: "Revisado", risk: "ready" },
          { value: "later", label: "Lo hare luego", risk: "medium" },
          { value: "unknown", label: "No sabia", risk: "high" },
        ],
      },
    ],
    guide: {
      why: [
        "Las estaciones grandes pueden estar lejos entre si.",
        "El nombre del billete debe coincidir con el pasaporte.",
      ],
      how: [
        "Compra billetes en Trip.com o canal oficial usando el mismo nombre del pasaporte.",
        "Llega 45-60 minutos antes a estaciones grandes.",
        "Confirma ciudad, estacion, numero de tren, asiento y puerta.",
      ],
      failures: [
        "Ir a Beijing Railway Station cuando el tren sale de Beijing South.",
        "Reservar vuelos cortos sin contar traslados y control de seguridad.",
      ],
      backup: [
        "Guarda alternativas en tren mas tarde o avion para tramos largos.",
        "Si pierdes un tren, ve al mostrador con pasaporte y numero de reserva.",
      ],
    },
    checklist: [
      "Comprar trenes con el mismo nombre que aparece en el pasaporte.",
      "Llegar a estaciones grandes con 45-60 minutos de margen.",
      "Revisar estacion exacta: muchas ciudades tienen varias estaciones.",
      "Guardar numero de tren, horario y asiento en captura offline.",
      "Comparar tren vs avion segun distancia y traslados reales.",
    ],
    warnings: [
      "En festivos, los mejores trenes se agotan rapido.",
      "Para Hong Kong/Macao hay controles fronterizos y reglas separadas.",
    ],
  },
  {
    id: "risks",
    title: "Riesgos comunes",
    intro: "Puntos donde los viajeros extranjeros suelen perder tiempo o dinero.",
    diagnostics: [
      {
        id: "holiday",
        question: "Tu viaje coincide con festivos chinos o temporada alta?",
        options: [
          { value: "no", label: "No", risk: "low" },
          { value: "yes", label: "Si", risk: "high" },
          { value: "unknown", label: "No lo se", risk: "medium" },
        ],
      },
      {
        id: "reservations",
        question: "Ya sabes que atracciones requieren reserva previa?",
        options: [
          { value: "ready", label: "Si", risk: "ready" },
          { value: "partial", label: "Parcial", risk: "medium" },
          { value: "none", label: "No", risk: "high" },
        ],
      },
    ],
    guide: {
      why: [
        "Los principales problemas no son solo la ruta: son pagos, reservas, idioma y festivos.",
        "Un viajero extranjero pierde mas tiempo cuando no sabe que debe reservar antes.",
      ],
      how: [
        "Marca festivos chinos antes de cerrar fechas.",
        "Lista atracciones con reserva obligatoria y fecha de apertura de venta.",
        "Guarda pasaporte, reservas, direcciones en chino y telefonos de hotel.",
      ],
      failures: [
        "Llegar a una atraccion popular sin entrada reservada.",
        "No poder explicar destino en taxi o restaurante fuera de zonas turisticas.",
      ],
      backup: [
        "Ten una atraccion alternativa por ciudad.",
        "Reserva hoteles cerca de metro para reducir dependencia de taxis.",
      ],
    },
    checklist: [
      "Evitar viajar sin reservas durante Semana Dorada u otros festivos chinos.",
      "Reservar atracciones populares con antelacion cuando sea obligatorio.",
      "Tener direcciones de hotel y atracciones en chino.",
      "Preparar plan B si falla el pago movil.",
      "Confirmar horarios de cierre, dias sin servicio y requisitos de pasaporte.",
    ],
    warnings: [
      "No todas las atracciones venden entradas en taquilla el mismo dia.",
      "El idioma puede ser una barrera fuera de zonas turisticas internacionales.",
    ],
  },
];

const visaPolicyGroups = {
  thirtyDayLikely: [
    "spain",
    "espana",
    "france",
    "germany",
    "italy",
    "netherlands",
    "belgium",
    "switzerland",
    "ireland",
    "austria",
    "hungary",
    "argentina",
    "brazil",
    "chile",
    "peru",
    "uruguay",
    "australia",
    "new zealand",
    "japan",
    "south korea",
    "singapore",
    "malaysia",
    "thailand",
    "uae",
    "qatar",
  ],
  transitLikely: ["mexico", "colombia", "united states", "usa", "canada", "uk", "united kingdom"],
};

const officialVisaLinks = [
  { label: "National Immigration Administration", url: "https://en.nia.gov.cn/" },
  { label: "China Consular Affairs", url: "https://cs.mfa.gov.cn/wgrlh/" },
  { label: "Chinese Visa Application Service Center", url: "https://www.visaforchina.cn/" },
];

const appResourceLinks = {
  payments: [
    { label: "Alipay App Store", url: "https://apps.apple.com/app/alipay/id333206289" },
    { label: "Alipay Google Play", url: "https://play.google.com/store/apps/details?id=com.eg.android.AlipayGphone" },
    { label: "WeChat App Store", url: "https://apps.apple.com/app/wechat/id414478124" },
    { label: "WeChat Google Play", url: "https://play.google.com/store/apps/details?id=com.tencent.mm" },
  ],
  apps: [
    { label: "Trip.com", url: "https://www.trip.com/" },
    { label: "Amap", url: "https://www.amap.com/" },
    { label: "Baidu Maps", url: "https://map.baidu.com/" },
    { label: "Pleco", url: "https://www.pleco.com/" },
  ],
  transport: [
    { label: "Trip.com Trains", url: "https://www.trip.com/trains/china/" },
    { label: "China Railway 12306", url: "https://www.12306.cn/en/index.html" },
    { label: "DiDi", url: "https://www.didiglobal.com/" },
  ],
};

const prepDeepDive = {
  visa: {
    title: "Confirmacion de entrada por nacionalidad",
    steps: [
      "Introduce nacionalidad, dias de estancia y si sales hacia un tercer pais o vuelves al pais de origen.",
      "Revisa si encajas en exencion ordinaria, transito sin visa o si conviene tramitar visado.",
      "Confirma la regla final en embajada/consulado chino antes de comprar vuelos no reembolsables.",
    ],
    microTasks: [
      "Pasaporte valido y con paginas libres.",
      "Vuelos de entrada/salida coherentes con la regla elegida.",
      "Hoteles con direccion completa para formularios o controles.",
      "Captura del enlace oficial aplicable a tu nacionalidad.",
    ],
    links: officialVisaLinks,
  },
  payments: {
    title: "Pagos: configuracion realista",
    steps: [
      "Instala Alipay y vincula una tarjeta internacional antes de viajar.",
      "Haz verificacion con pasaporte si la app lo pide.",
      "Prepara WeChat Pay como respaldo si tu telefono y tarjeta lo permiten.",
      "Lleva efectivo RMB para puestos pequenos, emergencias o fallos de red.",
    ],
    microTasks: [
      "Avisar al banco del viaje a China.",
      "Activar pagos internacionales y revisar limites diarios.",
      "Guardar una tarjeta secundaria.",
      "Probar que el QR de pago se abre antes de aterrizar.",
    ],
    links: appResourceLinks.payments,
  },
  apps: {
    title: "Internet, mapas y traduccion",
    steps: [
      "Elige eSIM, roaming o SIM local antes de salir.",
      "Instala un mapa local: Amap o Baidu Maps.",
      "Guarda direcciones de hoteles, estaciones y atracciones en chino.",
      "Prepara traductor offline y frases para taxi/restaurante.",
    ],
    microTasks: [
      "Capturas offline de reservas y direcciones.",
      "Nombres chinos de hotel y estaciones.",
      "Contacto del hotel y numero de emergencia.",
      "Plan de datos probado antes de salir del aeropuerto.",
    ],
    links: appResourceLinks.apps,
  },
  transport: {
    title: "Trenes, metro y taxi",
    steps: [
      "Compra trenes con el nombre exactamente igual al pasaporte.",
      "Confirma estacion exacta: muchas ciudades tienen varias estaciones.",
      "Para taxi/Didi, guarda destino en chino y una captura del mapa.",
      "En metro, evita horas punta si viajas con maleta grande.",
    ],
    microTasks: [
      "Llegar 45-60 min antes a estaciones grandes.",
      "Guardar numero de tren, asiento y puerta.",
      "Tener direccion de hotel en chino para taxi.",
      "Comparar tren vs avion contando traslados reales.",
    ],
    links: appResourceLinks.transport,
  },
  risks: {
    title: "Riesgos y decisiones de respaldo",
    steps: [
      "Marca si tu viaje coincide con Semana Dorada u otros festivos.",
      "Lista atracciones que requieren reserva anticipada.",
      "Define una alternativa por ciudad por si llueve, se agota una entrada o falla el pago.",
      "Guarda todo lo importante offline.",
    ],
    microTasks: [
      "Plan B de atraccion por ciudad.",
      "Plan B de pago.",
      "Plan B de transporte.",
      "Direcciones en chino y contacto del hotel.",
    ],
    links: [
      { label: "Trip.com", url: "https://www.trip.com/" },
      { label: "China Weather", url: "https://weather.cma.cn/" },
    ],
  },
};

const phraseRows = [
  ["Taxi", "Por favor, lléveme a esta dirección.", "请带我去这个地址。", "Qing dai wo qu zhe ge di zhi."],
  ["Taxi", "¿Puede usar el taxímetro?", "可以打表吗？", "Ke yi da biao ma?"],
  ["Pago", "¿Puedo pagar con Alipay?", "可以用支付宝吗？", "Ke yi yong Zhi fu bao ma?"],
  ["Pago", "Necesito pagar en efectivo.", "我想用现金支付。", "Wo xiang yong xian jin zhi fu."],
  ["Restaurante", "No como picante.", "我不吃辣。", "Wo bu chi la."],
  ["Restaurante", "Soy alérgico/a a esto.", "我对这个过敏。", "Wo dui zhe ge guo min."],
  ["Estacion", "¿Dónde está la entrada de seguridad?", "安检入口在哪里？", "An jian ru kou zai na li?"],
  ["Hotel", "Esta es mi reserva.", "这是我的预订。", "Zhe shi wo de yu ding."],
  ["Emergencia", "Necesito ayuda.", "我需要帮助。", "Wo xu yao bang zhu."],
];

const defaultAccount = {
  id: "demo-user",
  name: "Viajero invitado",
  email: "demo@viajaachina.com",
  travelStyle: "Primer viaje practico",
  budget: "Equilibrado",
  interests: "Historia, comida local, transporte facil",
  memory:
    "Prefiere una ruta clara, pocos cambios de hotel y explicaciones practicas sobre pagos, transporte y entradas.",
  favoriteCityIds: [],
  favoritePlaces: [],
  savedRoutes: [],
  savedPrepTasks: [],
  aiMemories: [],
  updatedAt: "",
};

const placesCatalog = [
  {
    id: "forbidden-city",
    name: "Ciudad Prohibida",
    cityId: "beijing",
    cityName: "Pekin",
    type: "Patrimonio",
    note: "Reserva con antelacion y lleva pasaporte.",
    aliases: ["ciudad prohibida", "forbidden city", "palacio imperial", "故宫"],
  },
  {
    id: "mutianyu-great-wall",
    name: "Gran Muralla Mutianyu",
    cityId: "beijing",
    cityName: "Pekin",
    type: "Excursion",
    note: "Tramo recomendado para primer viaje, menos intenso que Badaling.",
    aliases: ["gran muralla", "mutianyu", "great wall", "muralla china", "长城"],
  },
  {
    id: "temple-of-heaven",
    name: "Templo del Cielo",
    cityId: "beijing",
    cityName: "Pekin",
    type: "Historia",
    note: "Muy bueno para combinar con comida local y parques.",
    aliases: ["templo del cielo", "temple of heaven", "天坛"],
  },
  {
    id: "summer-palace",
    name: "Palacio de Verano",
    cityId: "beijing",
    cityName: "Pekin",
    type: "Jardin imperial",
    note: "Plan de medio dia, revisar clima.",
    aliases: ["palacio de verano", "summer palace", "颐和园"],
  },
  {
    id: "the-bund",
    name: "Bund",
    cityId: "shanghai",
    cityName: "Shanghai",
    type: "Paseo urbano",
    note: "Mejor al atardecer o de noche.",
    aliases: ["bund", "el bund", "外滩"],
  },
  {
    id: "yu-garden",
    name: "Jardin Yuyuan",
    cityId: "shanghai",
    cityName: "Shanghai",
    type: "Jardin",
    note: "Suele estar lleno; ir temprano.",
    aliases: ["yuyuan", "jardin yuyuan", "yu garden", "豫园"],
  },
  {
    id: "shanghai-museum",
    name: "Museo de Shanghai",
    cityId: "shanghai",
    cityName: "Shanghai",
    type: "Museo",
    note: "Bueno para dias de lluvia o ritmo tranquilo.",
    aliases: ["museo de shanghai", "shanghai museum", "上海博物馆"],
  },
  {
    id: "terracotta-warriors",
    name: "Guerreros de Terracota",
    cityId: "xian",
    cityName: "Xi'an",
    type: "Patrimonio",
    note: "Queda fuera del centro; reservar tiempo de traslado.",
    aliases: ["guerreros de terracota", "terracotta warriors", "terracotta army", "兵马俑"],
  },
  {
    id: "xian-city-wall",
    name: "Muralla de Xi'an",
    cityId: "xian",
    cityName: "Xi'an",
    type: "Historia",
    note: "Se puede recorrer en bici si el clima acompana.",
    aliases: ["muralla de xian", "muralla de xi'an", "xian city wall", "西安城墙"],
  },
  {
    id: "muslim-quarter",
    name: "Barrio musulman de Xi'an",
    cityId: "xian",
    cityName: "Xi'an",
    type: "Comida local",
    note: "Ideal para comida callejera, llevar efectivo de respaldo.",
    aliases: ["barrio musulman", "muslim quarter", "回民街"],
  },
  {
    id: "chengdu-panda-base",
    name: "Base de Pandas de Chengdu",
    cityId: "chengdu",
    cityName: "Chengdu",
    type: "Naturaleza",
    note: "Ir por la manana para ver mas actividad.",
    aliases: ["base de pandas", "pandas de chengdu", "chengdu panda base", "熊猫基地"],
  },
  {
    id: "kuanzhai-alley",
    name: "Callejones Kuanzhai",
    cityId: "chengdu",
    cityName: "Chengdu",
    type: "Paseo",
    note: "Buen lugar para ritmo relajado y snacks.",
    aliases: ["kuanzhai", "callejones kuanzhai", "宽窄巷子"],
  },
  {
    id: "west-lake",
    name: "Lago del Oeste",
    cityId: "hangzhou",
    cityName: "Hangzhou",
    type: "Paisaje",
    note: "Muy buena escapada desde Shanghai.",
    aliases: ["lago del oeste", "west lake", "西湖"],
  },
  {
    id: "canton-tower",
    name: "Torre Canton",
    cityId: "guangzhou",
    cityName: "Guangzhou",
    type: "Mirador",
    note: "Revisar visibilidad antes de subir.",
    aliases: ["torre canton", "canton tower", "广州塔"],
  },
  {
    id: "victoria-harbour",
    name: "Victoria Harbour",
    cityId: "hongkong",
    cityName: "Hong Kong",
    type: "Panorama",
    note: "Recordar que Hong Kong tiene controles y reglas separadas.",
    aliases: ["victoria harbour", "puerto victoria", "维多利亚港"],
  },
];

const cityDecisionDetails = {
  beijing: {
    stay: "3-4 dias",
    budget: "Medio",
    mobility: "Alta, metro amplio pero distancias largas",
    bestFor: ["Primer viaje", "Historia imperial", "Gran Muralla", "Museos"],
    mustDo: ["Ciudad Prohibida", "Templo del Cielo", "Gran Muralla Mutianyu", "Hutongs", "Pato laqueado"],
    pairs: ["Xi'an", "Shanghai", "Chengdu"],
    risks: ["Ciudad Prohibida requiere reserva", "Gran Muralla toma medio dia o mas", "Evitar festivos nacionales"],
  },
  shanghai: {
    stay: "2-3 dias",
    budget: "Medio-alto",
    mobility: "Muy alta, metro y conexiones comodas",
    bestFor: ["Primer contacto suave", "Ciudad moderna", "Compras", "Museos"],
    mustDo: ["Bund", "Pudong", "Museo de Shanghai", "Concesion Francesa", "Excursion a Suzhou o Hangzhou"],
    pairs: ["Hangzhou", "Suzhou", "Beijing"],
    risks: ["Hoteles caros en zonas centrales", "Miradores dependen del clima", "Muchos aeropuertos/estaciones: revisar bien"],
  },
  xian: {
    stay: "2 dias",
    budget: "Medio",
    mobility: "Media-alta, traslados puntuales largos",
    bestFor: ["Historia antigua", "Comida local", "Primera vez", "Fotografia"],
    mustDo: ["Guerreros de Terracota", "Muralla antigua", "Barrio musulman", "Gran Pagoda del Ganso Salvaje"],
    pairs: ["Beijing", "Chengdu", "Shanghai"],
    risks: ["Terracota queda fuera del centro", "Comida puede ser intensa para estomagos sensibles", "Reservar trenes con pasaporte"],
  },
  chengdu: {
    stay: "2-3 dias",
    budget: "Medio",
    mobility: "Media, ritmo relajado",
    bestFor: ["Pandas", "Comida picante", "Viaje relajado", "Sichuan"],
    mustDo: ["Base de pandas", "Casa de te", "Hotpot", "Calle Jinli", "Excursion a Leshan"],
    pairs: ["Xi'an", "Chongqing", "Zhangjiajie"],
    risks: ["Pandas se ven mejor temprano", "Picante alto", "Atracciones naturales requieren traslados"],
  },
  shenzhen: {
    stay: "1-2 dias",
    budget: "Medio-alto",
    mobility: "Alta, ciudad moderna",
    bestFor: ["Tecnologia", "Compras", "Diseno urbano", "Ruta con Hong Kong"],
    mustDo: ["Nanshan", "OCT Loft", "Bahia de Shenzhen", "Mercados tech", "Museos de diseno"],
    pairs: ["Hong Kong", "Guangzhou", "Guilin"],
    risks: ["Menos historia clasica", "Cruces con Hong Kong requieren revisar reglas", "Tramos urbanos largos"],
  },
};

const photoUrls = {
  "Forbidden City Beijing Shenwumen Gate.JPG":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Forbidden_City_Beijing_Shenwumen_Gate.JPG/960px-Forbidden_City_Beijing_Shenwumen_Gate.JPG",
  "Shanghai Skyline from the Bund.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Shanghai_Skyline_from_the_Bund.jpg/960px-Shanghai_Skyline_from_the_Bund.jpg",
  "Terracotta Army, View of Pit 1.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Terracotta_Army%2C_View_of_Pit_1.jpg/960px-Terracotta_Army%2C_View_of_Pit_1.jpg",
  "Giant Panda at Chengdu Panda Base.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Giant_Panda_at_Chengdu_Panda_Base.jpg/960px-Giant_Panda_at_Chengdu_Panda_Base.jpg",
  "SkylineOfChongqing.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/SkylineOfChongqing.jpg/960px-SkylineOfChongqing.jpg",
  "West Lake, Hangzhou, China.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/West_Lake%2C_Hangzhou%2C_China.jpg/960px-West_Lake%2C_Hangzhou%2C_China.jpg",
  "Humble Administrator's Garden.JPG":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Humble_Administrator%27s_Garden.JPG/960px-Humble_Administrator%27s_Garden.JPG",
  "Canton Tower.JPG":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Canton_Tower.JPG/960px-Canton_Tower.JPG",
  "Shenzhen Skyline from Nanshan.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Shenzhen_Skyline_from_Nanshan.jpg/960px-Shenzhen_Skyline_from_Nanshan.jpg",
  "Guilin Li River.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Guilin_Li_River.jpg/960px-Guilin_Li_River.jpg",
  "Dianchi Lake.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Dianchi_Lake.jpg/960px-Dianchi_Lake.jpg",
  "Lijiang Old Town.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Lijiang_Old_Town.jpg/960px-Lijiang_Old_Town.jpg",
  "Zhangjiajie National Forest Park.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Zhangjiajie_National_Forest_Park.jpg/960px-Zhangjiajie_National_Forest_Park.jpg",
  "Qingdao - Drone view city with skyline (Unsplash).jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Qingdao_-_Drone_view_city_with_skyline_(Unsplash).jpg/960px-Qingdao_-_Drone_view_city_with_skyline_(Unsplash).jpg",
  "Harbin Ice and Snow Festival 2013.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Harbin_Ice_and_Snow_Festival_2013.jpg/960px-Harbin_Ice_and_Snow_Festival_2013.jpg",
  "Hong Kong Skyline Restitch - Dec 2007.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Hong_Kong_Skyline_Restitch_-_Dec_2007.jpg/960px-Hong_Kong_Skyline_Restitch_-_Dec_2007.jpg",
};

const state = {
  step: -1,
  intentId: "",
  favorites: new Set(),
  selectedCities: [],
  difyConversationId: "",
  prep: {
    activeModule: "visa",
    scenarioIds: [],
    checked: {},
    answers: {},
  },
  account: { ...defaultAccount },
  answers: {
    intent: "Pendiente",
    duration: "Pendiente",
    travelers: "Pendiente",
    budget: "Pendiente",
    interests: "Pendiente",
    cities: "Pendiente",
    support: "Pendiente",
  },
};

const messages = document.querySelector("#messages");
const chatForm = document.querySelector("#chatForm");
const chatInput = document.querySelector("#chatInput");
const quickReplies = document.querySelector("#quickReplies");
const preferenceList = document.querySelector("#preferenceList");
const itineraryContent = document.querySelector("#itineraryContent");
const generateButton = document.querySelector("#generateButton");
const resetTop = document.querySelector("#resetTop");
const statusPill = document.querySelector("#statusPill");
const destinationGrid = document.querySelector("#destinationGrid");
const realMap = document.querySelector("#realMap");
const routeTitle = document.querySelector("#routeTitle");
const routeDescription = document.querySelector("#routeDescription");
const routeStats = document.querySelector("#routeStats");
const cityFeatures = document.querySelector("#cityFeatures");
const accountForm = document.querySelector("#accountForm");
const accountSyncStatus = document.querySelector("#accountSyncStatus");
const accountDisplayName = document.querySelector("#accountDisplayName");
const accountDisplayEmail = document.querySelector("#accountDisplayEmail");
const accountStats = document.querySelector("#accountStats");
const profileName = document.querySelector("#profileName");
const profileEmail = document.querySelector("#profileEmail");
const profileStyle = document.querySelector("#profileStyle");
const profileBudget = document.querySelector("#profileBudget");
const profileInterests = document.querySelector("#profileInterests");
const profileMemory = document.querySelector("#profileMemory");
const applyProfileButton = document.querySelector("#applyProfileButton");
const savedCities = document.querySelector("#savedCities");
const savedRoutes = document.querySelector("#savedRoutes");
const agentMemorySummary = document.querySelector("#agentMemorySummary");
const saveRouteButton = document.querySelector("#saveRouteButton");
const exportGuideButton = document.querySelector("#exportGuideButton");
const openTripHubTop = document.querySelector("#openTripHubTop");
const openTripHubFab = document.querySelector("#openTripHubFab");
const tripHubCountTop = document.querySelector("#tripHubCountTop");
const tripHubCountFab = document.querySelector("#tripHubCountFab");
const openRegisterTop = document.querySelector("#openRegisterTop");
const registerModal = document.querySelector("#registerModal");
const closeRegisterModal = document.querySelector("#closeRegisterModal");
const registerToast = document.querySelector("#registerToast");
const cityDrawer = document.querySelector("#cityDrawer");
const cityDrawerContent = document.querySelector("#cityDrawerContent");
const closeCityDrawer = document.querySelector("#closeCityDrawer");
const cityDrawerBackdrop = document.querySelector("#cityDrawerBackdrop");
const tripHubDrawer = document.querySelector("#tripHubDrawer");
const tripHubBackdrop = document.querySelector("#tripHubBackdrop");
const closeTripHub = document.querySelector("#closeTripHub");
const tripHubTabs = document.querySelector("#tripHubTabs");
const tripHubContent = document.querySelector("#tripHubContent");
const prepScenariosContainer = document.querySelector("#prepScenarios");
const prepTabs = document.querySelector("#prepTabs");
const prepModule = document.querySelector("#prepModule");
const prepProgressText = document.querySelector("#prepProgressText");
const prepProgressBar = document.querySelector("#prepProgressBar");

const CHINA_GEOJSON_URL = "/api/china-map";
const MAP_VIEWBOX = { width: 720, height: 470, padding: 28 };

let chinaGeojson = null;
let geojsonLoading = null;
let mapProjection = null;
let leafletLoading = null;
let leafletMap = null;
let leafletGeoLayer = null;
let leafletRouteLines = [];
let activeTripHubTab = "summary";
const markerLayers = new Map();

function loadAccount() {
  try {
    const stored = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : {};
    state.account = { ...defaultAccount, ...parsed };
    state.account.savedRoutes = state.account.savedRoutes || [];
    state.account.favoritePlaces = state.account.favoritePlaces || [];
    state.account.savedPrepTasks = state.account.savedPrepTasks || [];
    state.account.aiMemories = state.account.aiMemories || [];
    state.difyConversationId = window.localStorage.getItem("viajaachina:dify_conversation_id") || "";
  } catch (error) {
    state.account = { ...defaultAccount };
  }

  state.favorites = new Set(state.account.favoriteCityIds || []);
}

function persistAccount(status = "Guardado local") {
  state.account.favoriteCityIds = [...state.favorites];
  state.account.favoritePlaces = state.account.favoritePlaces || [];
  state.account.savedRoutes = state.account.savedRoutes || [];
  state.account.savedPrepTasks = state.account.savedPrepTasks || [];
  state.account.aiMemories = state.account.aiMemories || [];
  state.account.updatedAt = new Date().toISOString();

  try {
    window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(state.account));
    if (accountSyncStatus) accountSyncStatus.textContent = status;
  } catch (error) {
    if (accountSyncStatus) accountSyncStatus.textContent = "No guardado";
  }
}

function loadPrepState() {
  try {
    const stored = window.localStorage.getItem(PREP_STORAGE_KEY);
    if (stored) {
      state.prep = { ...state.prep, ...JSON.parse(stored) };
      state.prep.checked = state.prep.checked || {};
      state.prep.answers = state.prep.answers || {};
      state.prep.scenarioIds = state.prep.scenarioIds || [];
    }
  } catch (error) {
    state.prep = { activeModule: "visa", scenarioIds: [], checked: {}, answers: {} };
  }
}

function persistPrepState() {
  window.localStorage.setItem(PREP_STORAGE_KEY, JSON.stringify(state.prep));
}

function downloadPhraseTable() {
  const header = "Situacion,Español,Chino,Pinyin";
  const rows = phraseRows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","));
  const blob = new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "viajaachina-frases-es-zh.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function prepItemKey(moduleId, index) {
  return `${moduleId}:${index}`;
}

function prepAnswerKey(moduleId, questionId) {
  return `${moduleId}:${questionId}`;
}

function recommendedPrepModules() {
  const ids = new Set();
  state.prep.scenarioIds.forEach((scenarioId) => {
    const scenario = prepScenarios.find((item) => item.id === scenarioId);
    scenario?.modules.forEach((moduleId) => ids.add(moduleId));
  });
  return ids;
}

function prepCompletion() {
  const total = prepModules.reduce((sum, module) => sum + module.checklist.length, 0);
  const completed = prepModules.reduce(
    (sum, module) =>
      sum + module.checklist.filter((_, index) => state.prep.checked[prepItemKey(module.id, index)]).length,
    0,
  );
  return { total, completed, percent: total ? Math.round((completed / total) * 100) : 0 };
}

function prepModuleProgress(module) {
  const total = module.checklist.length;
  const completed = module.checklist.filter((_, index) => state.prep.checked[prepItemKey(module.id, index)]).length;
  return { total, completed, percent: total ? Math.round((completed / total) * 100) : 0 };
}

function prepModuleStatus(module) {
  const priority = { high: 4, medium: 3, low: 2, ready: 1 };
  let strongestRisk = "low";
  const missingAnswers = module.diagnostics.filter((question) => !state.prep.answers[prepAnswerKey(module.id, question.id)]).length;

  module.diagnostics.forEach((question) => {
    const value = state.prep.answers[prepAnswerKey(module.id, question.id)];
    const option = question.options.find((item) => item.value === value);
    if (option && priority[option.risk] > priority[strongestRisk]) {
      strongestRisk = option.risk;
    }
  });

  const progress = prepModuleProgress(module);
  if (strongestRisk === "high") return { label: "Riesgo alto", className: "is-high" };
  if (missingAnswers > 0) return { label: "Diagnostico pendiente", className: "is-medium" };
  if (progress.percent === 100 && strongestRisk === "ready") return { label: "Listo", className: "is-ready" };
  if (progress.percent >= 60) return { label: "Casi listo", className: "is-low" };
  return { label: "Accion pendiente", className: "is-medium" };
}

function renderPrepGuideList(items, ordered = false) {
  const tag = ordered ? "ol" : "ul";
  return `<${tag}>${items.map((item) => `<li>${item}</li>`).join("")}</${tag}>`;
}

function visaCheckerResult() {
  const nationality = normalizeText(state.prep.answers["visa:nationality"] || "");
  const days = Number(state.prep.answers["visa:days"] || 0);
  const routeType = state.prep.answers["visa:route_type"] || "";
  if (!nationality && !days && !routeType) {
    return "Completa nacionalidad, dias y tipo de ruta para obtener una orientacion inicial.";
  }
  if (visaPolicyGroups.thirtyDayLikely.some((country) => nationality.includes(country)) && days > 0 && days <= 30) {
    return "Posible ruta: exencion ordinaria de hasta 30 dias, segun nacionalidad y vigencia de la politica. Confirma en fuente oficial antes de comprar vuelos.";
  }
  if (routeType === "transit" && days > 0 && days <= 10) {
    return "Posible ruta: transito sin visa hasta 240 horas si cumples tercer pais/region, puerto habilitado y zona permitida. Confirma ciudades y salida con fuente oficial.";
  }
  if (visaPolicyGroups.transitLikely.some((country) => nationality.includes(country)) && routeType === "transit") {
    return "Tu caso podria encajar mejor en transito sin visa que en exencion ordinaria. Revisa puerto de entrada, tercer pais/region y zona permitida.";
  }
  return "No hay suficiente base para asumir exencion. Revisa si necesitas visado turistico o si tu ruta encaja en una politica vigente.";
}

function renderVisaChecker() {
  return `
    <div class="prep-nested-card">
      <div>
        <h4>Chequeo previo de entrada</h4>
        <p>No sustituye a una fuente oficial. Sirve para saber que camino revisar primero.</p>
      </div>
      <div class="prep-form-grid">
        <label>
          Nacionalidad
          <input data-prep-field="visa:nationality" type="text" placeholder="Ej. España, México, Argentina" value="${escapeHtml(state.prep.answers["visa:nationality"] || "")}" />
        </label>
        <label>
          Dias en China continental
          <input data-prep-field="visa:days" type="number" min="1" max="90" placeholder="Ej. 10" value="${escapeHtml(state.prep.answers["visa:days"] || "")}" />
        </label>
        <label>
          Tipo de ruta
          <select data-prep-field="visa:route_type">
            <option value="" ${!state.prep.answers["visa:route_type"] ? "selected" : ""}>No lo se</option>
            <option value="round_trip" ${state.prep.answers["visa:route_type"] === "round_trip" ? "selected" : ""}>Entro y salgo al mismo pais</option>
            <option value="transit" ${state.prep.answers["visa:route_type"] === "transit" ? "selected" : ""}>Tercer pais/region de salida</option>
            <option value="multi_region" ${state.prep.answers["visa:route_type"] === "multi_region" ? "selected" : ""}>Incluye Hong Kong/Macao/Taiwan</option>
          </select>
        </label>
      </div>
      <p class="prep-result">${visaCheckerResult()}</p>
    </div>
  `;
}

function renderPrepLinks(links = []) {
  if (!links.length) return "";
  return `
    <div class="prep-link-row">
      ${links.map((link) => `<a href="${link.url}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")}
    </div>
  `;
}

function renderDeepDive(module) {
  const deepDive = prepDeepDive[module.id];
  if (!deepDive) return "";
  return `
    <div class="prep-deep-dive" id="prep-detail-${module.id}">
      ${module.id === "visa" ? renderVisaChecker() : ""}
      <details open>
        <summary>${deepDive.title}</summary>
        <div class="prep-detail-grid">
          <article>
            <h4>Pasos concretos</h4>
            ${renderPrepGuideList(deepDive.steps, true)}
          </article>
          <article>
            <h4>Microtareas</h4>
            ${renderPrepGuideList(deepDive.microTasks)}
          </article>
        </div>
        ${renderPrepLinks(deepDive.links)}
      </details>
      ${
        module.id === "apps"
          ? `<details><summary>Descargar frases utiles</summary><p>Guarda una tabla simple para taxi, pagos, restaurante, estacion y hotel.</p><button class="secondary-button" type="button" data-download-phrases>Descargar tabla ES-ZH</button></details>`
          : ""
      }
    </div>
  `;
}

function renderPrepCenter() {
  if (!prepScenariosContainer || !prepTabs || !prepModule) return;

  const recommended = recommendedPrepModules();
  const completion = prepCompletion();
  const highRiskCount = prepModules.filter((module) => prepModuleStatus(module).className === "is-high").length;
  const pendingDiagnosisCount = prepModules.reduce(
    (sum, module) =>
      sum + module.diagnostics.filter((question) => !state.prep.answers[prepAnswerKey(module.id, question.id)]).length,
    0,
  );

  prepScenariosContainer.innerHTML = prepScenarios
    .map(
      (scenario) => `
        <button class="${state.prep.scenarioIds.includes(scenario.id) ? "is-active" : ""}" type="button" data-scenario="${scenario.id}">
          ${scenario.label}
        </button>
      `,
    )
    .join("");

  prepTabs.innerHTML = prepModules
    .map(
      (module) => `
        <button class="${state.prep.activeModule === module.id ? "is-active" : ""} ${recommended.has(module.id) ? "is-recommended" : ""}" type="button" data-module="${module.id}">
          ${module.title}
        </button>
      `,
    )
    .join("");

  const active = prepModules.find((module) => module.id === state.prep.activeModule) || prepModules[0];
  const activeProgress = prepModuleProgress(active);
  const activeStatus = prepModuleStatus(active);
  prepModule.innerHTML = `
    <div class="prep-module-head">
      <div>
        <p class="panel-kicker">${recommended.has(active.id) ? "Recomendado para ti" : "Checklist"}</p>
        <h3>${active.title}</h3>
      </div>
      <div class="prep-module-badges">
        <button class="ai-context-button" type="button" data-ai-context="prep">Preguntar a IA</button>
        <span class="prep-status ${activeStatus.className}">${activeStatus.label}</span>
        <span>${activeProgress.completed}/${activeProgress.total}</span>
      </div>
    </div>
    <p class="prep-intro">${active.intro}</p>
    <div class="prep-diagnostics">
      <h4>Diagnostico rapido</h4>
      ${active.diagnostics
        .map(
          (question) => `
            <div class="prep-question">
              <p>${question.question}</p>
              <div class="prep-answer-row">
                ${question.options
                  .map((option) => {
                    const key = prepAnswerKey(active.id, question.id);
                    const selected = state.prep.answers[key] === option.value;
                    return `
                      <button class="${selected ? "is-active" : ""}" type="button" data-prep-answer="${key}" data-value="${option.value}">
                        ${option.label}
                      </button>
                    `;
                  })
                  .join("")}
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
    ${renderDeepDive(active)}
    <div class="prep-guide-grid is-compact">
      <details class="prep-guide-card">
        <summary>Por que importa</summary>
        ${renderPrepGuideList(active.guide.why)}
      </details>
      <details class="prep-guide-card">
        <summary>Como hacerlo</summary>
        ${renderPrepGuideList(active.guide.how, true)}
      </details>
      <details class="prep-guide-card">
        <summary>Si falla</summary>
        ${renderPrepGuideList(active.guide.failures)}
      </details>
      <details class="prep-guide-card">
        <summary>Plan B</summary>
        ${renderPrepGuideList(active.guide.backup)}
      </details>
    </div>
    <div class="prep-checklist">
      <h4>Confirmacion final</h4>
      ${active.checklist
        .map((item, index) => {
          const key = prepItemKey(active.id, index);
          return `
            <label>
              <input type="checkbox" data-prep-item="${key}" ${state.prep.checked[key] ? "checked" : ""} />
              <span>${item}</span>
            </label>
          `;
        })
        .join("")}
    </div>
    <div class="prep-warnings">
      ${active.warnings.map((warning) => `<p>${warning}</p>`).join("")}
    </div>
  `;

  prepProgressText.textContent = `${completion.percent}% listo`;
  prepProgressBar.style.width = `${completion.percent}%`;
  const existingRisk = document.querySelector("#prepRiskSummary");
  if (existingRisk) existingRisk.remove();
  const riskSummary = document.createElement("div");
  riskSummary.className = "prep-risk-summary";
  riskSummary.id = "prepRiskSummary";
  riskSummary.innerHTML = `
    <p><strong>${highRiskCount}</strong> riesgos altos</p>
    <p><strong>${pendingDiagnosisCount}</strong> respuestas pendientes</p>
  `;
  prepScenariosContainer.insertAdjacentElement("afterend", riskSummary);

  prepScenariosContainer.querySelectorAll("[data-scenario]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.scenario;
      state.prep.scenarioIds = state.prep.scenarioIds.includes(id)
        ? state.prep.scenarioIds.filter((item) => item !== id)
        : [...state.prep.scenarioIds, id];
      persistPrepState();
      renderPrepCenter();
    });
  });

  prepTabs.querySelectorAll("[data-module]").forEach((button) => {
    button.addEventListener("click", () => {
      state.prep.activeModule = button.dataset.module;
      persistPrepState();
      renderPrepCenter();
      document.querySelector("#prepModule")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  prepModule.querySelectorAll("[data-prep-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      state.prep.answers[button.dataset.prepAnswer] = button.dataset.value;
      persistPrepState();
      renderPrepCenter();
    });
  });

  prepModule.querySelectorAll("[data-prep-item]").forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      state.prep.checked[checkbox.dataset.prepItem] = checkbox.checked;
      persistPrepState();
      renderPrepCenter();
    });
  });

  prepModule.querySelectorAll("[data-prep-field]").forEach((field) => {
    field.addEventListener("change", () => {
      state.prep.answers[field.dataset.prepField] = field.value;
      persistPrepState();
      renderPrepCenter();
    });
  });

  prepModule.querySelector("[data-download-phrases]")?.addEventListener("click", downloadPhraseTable);
}

function showRegisterPrompt(reason) {
  const messages = {
    favorite: "Registrate para conservar tus ciudades favoritas y retomarlas desde cualquier dispositivo.",
    chat: "Crea una cuenta para que el agente recuerde tus preferencias y preguntas importantes.",
    top: "Pronto podras guardar favoritos, memoria personal y guias generadas en tu cuenta.",
  };
  if (registerToast) {
    registerToast.textContent = messages[reason] || messages.top;
    registerToast.classList.add("is-visible");
    window.clearTimeout(showRegisterPrompt.timer);
    showRegisterPrompt.timer = window.setTimeout(() => {
      registerToast.classList.remove("is-visible");
    }, 4200);
  }
}

function openRegisterInfo(reason = "top") {
  showRegisterPrompt(reason);
  if (!registerModal) return;
  registerModal.classList.add("is-open");
  registerModal.setAttribute("aria-hidden", "false");
}

function closeRegisterInfo() {
  if (!registerModal) return;
  registerModal.classList.remove("is-open");
  registerModal.setAttribute("aria-hidden", "true");
}

function favoriteCityNames() {
  return [...state.favorites]
    .map((id) => destinations.find((city) => city.id === id))
    .filter(Boolean)
    .map((city) => city.name);
}

function favoritePlaceIds() {
  return new Set((state.account.favoritePlaces || []).map((place) => place.id));
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function detectPlaces(text) {
  const normalized = normalizeText(text);
  if (!normalized.trim()) return [];
  const savedIds = favoritePlaceIds();
  return placesCatalog.filter((place) => {
    if (savedIds.has(place.id)) return false;
    return place.aliases.some((alias) => normalized.includes(normalizeText(alias)));
  });
}

function recommendedPlacesForCity(cityId) {
  return placesCatalog.filter((place) => place.cityId === cityId).slice(0, 5);
}

function addFavoritePlace(placeOrId, source = "manual") {
  const catalogPlace = typeof placeOrId === "string" ? placesCatalog.find((place) => place.id === placeOrId) : placeOrId;
  if (!catalogPlace) return;
  const current = state.account.favoritePlaces || [];
  if (current.some((place) => place.id === catalogPlace.id)) return;
  state.account.favoritePlaces = [
    {
      id: catalogPlace.id,
      name: catalogPlace.name,
      cityId: catalogPlace.cityId || "unknown",
      cityName: catalogPlace.cityName || "Ciudad pendiente",
      source,
      note: catalogPlace.note || "",
      createdAt: new Date().toISOString(),
    },
    ...current,
  ];
  persistAccount("Lugar guardado en Mi Viaje");
  renderAccount(false);
  renderTripHub();
  showRegisterPrompt("top");
}

function removeFavoritePlace(placeId) {
  state.account.favoritePlaces = (state.account.favoritePlaces || []).filter((place) => place.id !== placeId);
  persistAccount("Lugar eliminado");
  renderAccount(false);
  renderTripHub();
}

function addPlaceCandidateMessage(places, source) {
  if (!places.length || !messages) return;
  const card = document.createElement("div");
  card.className = "place-detection";
  card.innerHTML = `
    <strong>Lugares detectados</strong>
    <p>${source === "agent" ? "El agente menciono estos lugares. Puedes guardarlos en Mi Viaje." : "Detecte posibles lugares de interes en tu mensaje."}</p>
    <div class="place-chip-row">
      ${places
        .map(
          (place) => `
            <button type="button" data-save-detected-place="${place.id}">
              ${place.name}
              <small>${place.cityName}</small>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
  messages.appendChild(card);
  messages.scrollTop = messages.scrollHeight;
}

function fallbackCityDetail(city) {
  return {
    stay: "1-2 dias",
    budget: "Medio",
    mobility: "Media, revisar estacion o aeropuerto correcto",
    bestFor: [city.region, "Ruta personalizada", "Explorar fuera del circuito basico"],
    mustDo: [city.feature, "Comida local", "Barrio central", "Punto panoramico"],
    pairs: destinations
      .filter((item) => item.id !== city.id)
      .slice(0, 3)
      .map((item) => item.name),
    risks: ["Confirmar transporte real antes de cerrar ruta", "Guardar direcciones en chino", "Revisar disponibilidad en festivos"],
  };
}

function cityDetail(city) {
  return cityDecisionDetails[city.id] || fallbackCityDetail(city);
}

function routeSnapshot() {
  const cities = selectedCityNames();
  return {
    id: `route-${Date.now()}`,
    name: cities.length ? cities.join(" -> ") : "Ruta sin ciudades",
    cityIds: [...state.selectedCities],
    createdAt: new Date().toISOString(),
    budget: state.answers.budget,
    interests: state.answers.interests,
  };
}

function saveCurrentRoute() {
  if (!state.selectedCities.length) {
    showRegisterPrompt("top");
    addMessage("agent", "Selecciona al menos una ciudad en el mapa o en las tarjetas antes de guardar una ruta.");
    return;
  }
  const snapshot = routeSnapshot();
  state.account.savedRoutes = [snapshot, ...(state.account.savedRoutes || [])].slice(0, 6);
  persistAccount("Ruta guardada localmente");
  renderAccount(false);
  showRegisterPrompt("top");
}

function loadSavedRoute(routeId) {
  const route = (state.account.savedRoutes || []).find((item) => item.id === routeId);
  if (!route) return;
  state.selectedCities = [...route.cityIds];
  renderDestinations();
  renderMap();
  renderTripHub();
  document.querySelector(".route-planner")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function deleteSavedRoute(routeId) {
  state.account.savedRoutes = (state.account.savedRoutes || []).filter((item) => item.id !== routeId);
  persistAccount("Ruta eliminada");
  renderAccount(false);
  renderTripHub();
}

function renderAccount(syncForm = true) {
  if (!accountForm) return;

  if (syncForm) {
    profileName.value = state.account.name;
    profileEmail.value = state.account.email;
    profileStyle.value = state.account.travelStyle;
    profileBudget.value = state.account.budget;
    profileInterests.value = state.account.interests;
    profileMemory.value = state.account.memory;
  }

  accountDisplayName.textContent = state.account.name || defaultAccount.name;
  accountDisplayEmail.textContent = state.account.email || defaultAccount.email;
  const memoryCount = state.account.memory.trim() ? 1 : 0;
  accountStats.innerHTML = `
    <span>Favoritos: ${state.favorites.size}</span>
    <span>Lugares: ${(state.account.favoritePlaces || []).length}</span>
    <span>Rutas: ${(state.account.savedRoutes || []).length}</span>
    <span>Memorias: ${memoryCount}</span>
  `;

  const names = favoriteCityNames();
  savedCities.innerHTML = names.length
    ? names.map((name) => `<span>${name}</span>`).join("")
    : '<span class="muted-note">Marca ciudades con la estrella para verlas aqui.</span>';

  agentMemorySummary.textContent =
    `Estilo: ${state.account.travelStyle}. Presupuesto: ${state.account.budget}. Intereses: ${state.account.interests}. Memoria: ${state.account.memory}`;

  if (savedRoutes) {
    savedRoutes.innerHTML = (state.account.savedRoutes || []).length
      ? state.account.savedRoutes
          .map(
            (route) => `
              <article class="saved-route-card">
                <strong>${route.name}</strong>
                <span>${route.budget || "Presupuesto pendiente"} · ${route.interests || "Intereses pendientes"}</span>
                <div>
                  <button type="button" data-load-route="${route.id}">Cargar</button>
                  <button type="button" data-delete-route="${route.id}">Eliminar</button>
                </div>
              </article>
            `,
          )
          .join("")
      : '<span class="muted-note">Selecciona ciudades y guarda una ruta para verla aqui.</span>';
  }
  updateTripHubCounts();
}

function tripHubCount() {
  return state.favorites.size + (state.account.favoritePlaces || []).length + (state.account.savedRoutes || []).length;
}

function updateTripHubCounts() {
  const count = tripHubCount();
  if (tripHubCountTop) tripHubCountTop.textContent = count;
  if (tripHubCountFab) tripHubCountFab.textContent = count;
}

function prepRiskSummary() {
  const highRiskCount = prepModules.filter((module) => prepModuleStatus(module).className === "is-high").length;
  const completion = prepCompletion();
  return { highRiskCount, completion };
}

function renderPlaceCards(places) {
  if (!places.length) return '<p class="muted-note">Aun no hay lugares guardados.</p>';
  return places
    .map(
      (place) => `
        <article class="hub-item-card">
          <div>
            <strong>${place.name}</strong>
            <span>${place.cityName || "Ciudad pendiente"} · ${place.source}</span>
            ${place.note ? `<p>${place.note}</p>` : ""}
          </div>
          <div class="hub-item-actions">
            <button type="button" data-city-detail="${place.cityId}">Ciudad</button>
            <button type="button" data-place-ai="${place.id}">IA</button>
            <button type="button" data-remove-place="${place.id}">Eliminar</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderTripHub() {
  if (!tripHubTabs || !tripHubContent) return;
  updateTripHubCounts();
  const tabs = [
    ["summary", "Resumen"],
    ["cities", "Ciudades"],
    ["places", "Lugares"],
    ["route", "Ruta"],
    ["prep", "Preparacion"],
    ["memory", "Memoria IA"],
  ];
  const favoritePlaces = state.account.favoritePlaces || [];
  const savedPrepTasks = state.account.savedPrepTasks || [];
  const routeCities = state.selectedCities.map((id) => destinations.find((city) => city.id === id)).filter(Boolean);
  const favoriteCities = [...state.favorites].map((id) => destinations.find((city) => city.id === id)).filter(Boolean);
  const prep = prepRiskSummary();

  tripHubTabs.innerHTML = tabs
    .map(
      ([id, label]) => `
        <button class="${activeTripHubTab === id ? "is-active" : ""}" type="button" data-trip-tab="${id}">
          ${label}
        </button>
      `,
    )
    .join("");

  const sections = {
    summary: `
      <div class="hub-summary-grid">
        <span><strong>${state.answers.duration}</strong> Duracion</span>
        <span><strong>${state.answers.budget}</strong> Presupuesto</span>
        <span><strong>${favoriteCities.length}</strong> Ciudades guardadas</span>
        <span><strong>${favoritePlaces.length}</strong> Lugares guardados</span>
        <span><strong>${prep.completion.percent}%</strong> Preparacion</span>
        <span><strong>${prep.highRiskCount}</strong> Riesgos altos</span>
      </div>
      <div class="hub-section">
        <h3>Ruta actual</h3>
        <p>${routeCities.length ? routeCities.map((city) => city.name).join(" -> ") : "Todavia no hay ruta seleccionada."}</p>
      </div>
    `,
    cities: `
      <div class="hub-section">
        <h3>Ciudades guardadas</h3>
        ${
          favoriteCities.length
            ? favoriteCities
                .map(
                  (city) => `
                    <article class="hub-item-card">
                      <div><strong>${city.name}</strong><span>${city.region}</span></div>
                      <div class="hub-item-actions">
                        <button type="button" data-add-city-route="${city.id}">Ruta</button>
                        <button type="button" data-city-detail="${city.id}">Detalles</button>
                        <button type="button" data-remove-city="${city.id}">Eliminar</button>
                      </div>
                    </article>
                  `,
                )
                .join("")
            : '<p class="muted-note">Marca ciudades con la estrella para guardarlas aqui.</p>'
        }
      </div>
    `,
    places: `
      <div class="hub-section">
        <h3>Lugares guardados</h3>
        ${renderPlaceCards(favoritePlaces)}
      </div>
      <form class="manual-place-form" id="manualPlaceForm">
        <h3>Agregar lugar manualmente</h3>
        <input name="name" type="text" placeholder="Nombre del lugar" required />
        <select name="cityId">
          <option value="unknown">Ciudad pendiente</option>
          ${destinations.map((city) => `<option value="${city.id}">${city.name}</option>`).join("")}
        </select>
        <input name="note" type="text" placeholder="Nota opcional" />
        <button class="secondary-button" type="submit">Guardar lugar</button>
      </form>
    `,
    route: `
      <div class="hub-section">
        <h3>Ruta actual</h3>
        ${routeCities.length ? `<ol class="hub-route-list">${routeCities.map((city) => `<li>${city.name}</li>`).join("")}</ol>` : '<p class="muted-note">Selecciona ciudades para construir una ruta.</p>'}
        <button class="secondary-button" type="button" data-save-current-route>Guardar ruta actual</button>
      </div>
      <div class="hub-section">
        <h3>Rutas guardadas</h3>
        ${
          (state.account.savedRoutes || []).length
            ? state.account.savedRoutes
                .map(
                  (route) => `
                    <article class="hub-item-card">
                      <div><strong>${route.name}</strong><span>${route.budget || "Presupuesto pendiente"}</span></div>
                      <div class="hub-item-actions">
                        <button type="button" data-load-route="${route.id}">Cargar</button>
                        <button type="button" data-delete-route="${route.id}">Eliminar</button>
                      </div>
                    </article>
                  `,
                )
                .join("")
            : '<p class="muted-note">Guarda tu primera ruta desde el mapa.</p>'
        }
      </div>
    `,
    prep: `
      <div class="hub-section">
        <h3>Preparacion</h3>
        <div class="hub-summary-grid">
          <span><strong>${prep.completion.percent}%</strong> Completado</span>
          <span><strong>${prep.highRiskCount}</strong> Riesgos altos</span>
        </div>
        ${prepModules
          .map((module) => {
            const status = prepModuleStatus(module);
            const progress = prepModuleProgress(module);
            return `<article class="hub-item-card"><div><strong>${module.title}</strong><span>${status.label} · ${progress.completed}/${progress.total}</span></div></article>`;
          })
          .join("")}
        ${
          savedPrepTasks.length
            ? `<div class="hub-section"><h3>Checklist añadido por IA</h3>${savedPrepTasks
                .map(
                  (task) => `
                    <article class="hub-item-card">
                      <div><strong>${task.category}</strong><span>${task.task} · ${task.priority}</span></div>
                    </article>
                  `,
                )
                .join("")}</div>`
            : ""
        }
      </div>
    `,
    memory: `
      <div class="hub-section">
        <h3>Memoria del agente</h3>
        <p>${state.account.memory}</p>
        <p class="muted-note">Pendiente: conectar esta memoria con Supabase y Dify memory.</p>
      </div>
      <div class="hub-section">
        <h3>Preferencias</h3>
        <p>${state.account.travelStyle} · ${state.account.budget} · ${state.account.interests}</p>
      </div>
    `,
  };

  tripHubContent.innerHTML = sections[activeTripHubTab] || sections.summary;

  const manualPlaceForm = tripHubContent.querySelector("#manualPlaceForm");
  if (manualPlaceForm) {
    manualPlaceForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(manualPlaceForm);
      const cityId = data.get("cityId");
      const city = destinations.find((item) => item.id === cityId);
      addFavoritePlace(
        {
          id: `manual-${Date.now()}`,
          name: data.get("name"),
          cityId,
          cityName: city?.name || "Ciudad pendiente",
          note: data.get("note"),
          aliases: [],
        },
        "manual",
      );
      activeTripHubTab = "places";
      renderTripHub();
    });
  }
}

function openTripHub(tab = activeTripHubTab) {
  activeTripHubTab = tab;
  renderTripHub();
  if (!tripHubDrawer) return;
  tripHubDrawer.classList.add("is-open");
  tripHubDrawer.setAttribute("aria-hidden", "false");
}

function closeTripHubDrawer() {
  if (!tripHubDrawer) return;
  tripHubDrawer.classList.remove("is-open");
  tripHubDrawer.setAttribute("aria-hidden", "true");
}

function collectAccountForm() {
  state.account = {
    ...state.account,
    name: profileName.value.trim() || defaultAccount.name,
    email: profileEmail.value.trim() || defaultAccount.email,
    travelStyle: profileStyle.value,
    budget: profileBudget.value,
    interests: profileInterests.value.trim() || defaultAccount.interests,
    memory: profileMemory.value.trim() || defaultAccount.memory,
  };
}

function saveAccountFromForm(status = "Perfil guardado") {
  collectAccountForm();
  persistAccount(status);
  renderAccount();
}

function applyAccountToTrip() {
  saveAccountFromForm("Usado en viaje");
  state.answers.budget = state.account.budget;
  state.answers.interests = state.account.interests;
  if (state.favorites.size > 0) {
    state.answers.cities = favoriteCityNames().join(" + ");
  }
  renderPreferences();
  addMessage(
    "agent",
    `He aplicado tu perfil: ${state.account.travelStyle}. Tendré en cuenta tus intereses, ciudades guardadas y memoria personal para la guia.`,
  );
}

function addMessage(role, text) {
  const bubble = document.createElement("div");
  bubble.className = `message ${role}`;
  bubble.textContent = text;
  messages.appendChild(bubble);
  addPlaceCandidateMessage(detectPlaces(text), role);
  messages.scrollTop = messages.scrollHeight;
}

function addLoadingMessage() {
  const bubble = document.createElement("div");
  bubble.className = "message agent is-loading";
  bubble.innerHTML = `<span></span><span></span><span></span><strong>Consultando viajaachina...</strong>`;
  messages.appendChild(bubble);
  messages.scrollTop = messages.scrollHeight;
  return bubble;
}

function focusChat() {
  document.querySelector(".chat-panel")?.scrollIntoView({ behavior: "smooth", block: "center" });
  window.setTimeout(() => chatInput?.focus(), 260);
}

function selectedCityNames() {
  return state.selectedCities
    .map((id) => destinations.find((city) => city.id === id))
    .filter(Boolean)
    .map((city) => city.name);
}

function agentContext(mode = "chat") {
  return {
    mode,
    ...state.answers,
    favorites: favoriteCityNames(),
    selectedCities: selectedCityNames(),
    travelStyle: state.account.travelStyle,
    memory: state.account.memory,
  };
}

async function callDifyAgent(message, mode = "chat") {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      context: agentContext(mode),
      conversationId: state.difyConversationId,
      userId: state.account.email || "viajaachina-demo",
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Dify request failed");
  if (data.conversationId) {
    state.difyConversationId = data.conversationId;
    window.localStorage.setItem("viajaachina:dify_conversation_id", data.conversationId);
  }
  return data.answer || "";
}

function prepModuleSummary(module) {
  if (!module) return "";
  const status = prepModuleStatus(module).label;
  const answers = module.diagnostics
    .map((question) => {
      const value = state.prep.answers[prepAnswerKey(module.id, question.id)];
      const option = question.options.find((item) => item.value === value);
      return `${question.question} ${option ? option.label : "sin responder"}`;
    })
    .join(" | ");
  const progress = prepModuleProgress(module);
  return `${module.title}: ${status}, progreso ${progress.completed}/${progress.total}. ${answers}`;
}

function buildAiPrompt(kind) {
  const selected = state.selectedCities.map((id) => destinations.find((city) => city.id === id)).filter(Boolean);
  const favoriteNames = favoriteCityNames();
  const activePrep = prepModules.find((module) => module.id === state.prep.activeModule) || prepModules[0];

  if (kind === "route") {
    const route = selected.length ? selected.map((city) => city.name).join(" -> ") : "sin ruta seleccionada";
    const segmentText = routeSegments(selected)
      .map(
        (segment) =>
          `${segment.from.name} -> ${segment.to.name}: ${segment.options
            .map((option) => `${option.mode} ${option.time} ${option.price}`)
            .join("; ")}`,
      )
      .join(" | ");
    return `Ayudame a evaluar esta ruta para un viajero hispanohablante en China. Ruta seleccionada: ${route}. Tramos disponibles: ${segmentText || "todavia no hay dos ciudades seleccionadas"}. Favoritos: ${favoriteNames.join(", ") || "ninguno"}. Dame consejos practicos, riesgos y si conviene cambiar el orden.`;
  }

  if (kind === "prep") {
    return `Ayudame a completar la preparacion antes de viajar a China. Modulo actual: ${prepModuleSummary(activePrep)}. Escenarios marcados: ${state.prep.scenarioIds.join(", ") || "ninguno"}. Favoritos: ${favoriteNames.join(", ") || "ninguno"}. Explica que falta, que es urgente y que pasos deberia hacer ahora.`;
  }

  if (kind === "favorites") {
    return `Convierte mis ciudades favoritas en una ruta inicial para China. Favoritos: ${favoriteNames.join(", ") || "ninguno"}. Preferencias: ${state.answers.interests}. Presupuesto: ${state.answers.budget}. Dame una ruta clara y que debo preparar antes de viajar.`;
  }

  return "Ayudame a planificar mi viaje a China con una guia practica en espanol.";
}

function askAiWithContext(kind) {
  const prompt = buildAiPrompt(kind);
  addMessage("user", prompt);
  showRegisterPrompt("chat");
  focusChat();
  requestDifyFollowup(prompt);
}

function openCityDrawer(cityId) {
  const city = destinations.find((item) => item.id === cityId);
  if (!city || !cityDrawer || !cityDrawerContent) return;
  const detail = cityDetail(city);
  const cityPlaces = recommendedPlacesForCity(city.id);
  cityDrawerContent.innerHTML = `
    <img class="city-drawer-image" src="${destinationPhoto(city)}" alt="${city.name}" />
    <p class="panel-kicker">${city.region}</p>
    <h2 id="cityDrawerTitle">${city.name}</h2>
    <p class="city-drawer-intro">${city.intro}</p>
    <div class="city-score-grid">
      <span><strong>${detail.stay}</strong> Estancia</span>
      <span><strong>${detail.budget}</strong> Gasto</span>
      <span><strong>${detail.mobility}</strong> Movilidad</span>
    </div>
    <div class="city-detail-block">
      <h3>Ideal para</h3>
      <div class="pill-row">${detail.bestFor.map((item) => `<span>${item}</span>`).join("")}</div>
    </div>
    <div class="city-detail-block">
      <h3>Experiencias clave</h3>
      <ul>${detail.mustDo.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
    <div class="city-detail-block">
      <h3>Lugares recomendados</h3>
      ${
        cityPlaces.length
          ? `<div class="place-save-list">${cityPlaces
              .map(
                (place) => `
                  <article>
                    <strong>${place.name}</strong>
                    <span>${place.type} · ${place.note}</span>
                    <button type="button" data-save-place="${place.id}">
                      ${favoritePlaceIds().has(place.id) ? "Guardado" : "Guardar"}
                    </button>
                  </article>
                `,
              )
              .join("")}</div>`
          : `<p class="muted-note">Aun no hay lugares cargados para esta ciudad.</p>`
      }
    </div>
    <div class="city-detail-block">
      <h3>Combina bien con</h3>
      <div class="pill-row">${detail.pairs.map((item) => `<span>${item}</span>`).join("")}</div>
    </div>
    <div class="city-detail-block">
      <h3>Riesgos a revisar</h3>
      <ul>${detail.risks.map((item) => `<li>${item}</li>`).join("")}</ul>
    </div>
    <div class="drawer-actions">
      <button class="primary-button" type="button" data-add-city-route="${city.id}">Añadir a ruta</button>
      <button class="secondary-button" type="button" data-favorite-city="${city.id}">
        ${state.favorites.has(city.id) ? "Quitar favorito" : "Guardar favorito"}
      </button>
      <button class="ai-context-button is-wide" type="button" data-city-ai="${city.id}">Preguntar a IA</button>
    </div>
  `;
  cityDrawer.classList.add("is-open");
  cityDrawer.setAttribute("aria-hidden", "false");
}

function closeCityDetail() {
  if (!cityDrawer) return;
  cityDrawer.classList.remove("is-open");
  cityDrawer.setAttribute("aria-hidden", "true");
}

function askAiAboutCity(cityId) {
  const city = destinations.find((item) => item.id === cityId);
  if (!city) return;
  const detail = cityDetail(city);
  const prompt = `Ayudame a decidir si ${city.name} encaja en mi viaje a China. Datos: ${city.intro}. Estancia recomendada: ${detail.stay}. Ideal para: ${detail.bestFor.join(", ")}. Experiencias: ${detail.mustDo.join(", ")}. Riesgos: ${detail.risks.join(", ")}. Mis intereses: ${state.answers.interests}. Presupuesto: ${state.answers.budget}.`;
  closeCityDetail();
  addMessage("user", prompt);
  focusChat();
  requestDifyFollowup(prompt);
}

function askAiAboutPlace(placeId) {
  const place =
    (state.account.favoritePlaces || []).find((item) => item.id === placeId) ||
    placesCatalog.find((item) => item.id === placeId);
  if (!place) return;
  const prompt = `Ayudame a visitar ${place.name} en ${place.cityName || "China"}. Explica si vale la pena para mi viaje, cuanto tiempo dedicar, como llegar, que reservar, riesgos practicos y como combinarlo con mi ruta actual: ${selectedCityNames().join(" -> ") || "sin ruta seleccionada"}.`;
  closeTripHubDrawer();
  closeCityDetail();
  addMessage("user", prompt);
  focusChat();
  requestDifyFollowup(prompt);
}

function agentCityName(city) {
  return city?.city_name || city?.name || city?.city_id || "Ciudad";
}

function agentPlaceName(place) {
  return place?.place_name || place?.name || "Lugar";
}

function guideAverageFit(cities) {
  const scores = asArray(cities)
    .map((city) => Number(city.fit_score))
    .filter((score) => Number.isFinite(score) && score > 0);
  if (!scores.length) return 0;
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

function guideTotalDays(cities) {
  return asArray(cities).reduce((sum, city) => {
    const days = Number(city.days);
    return sum + (Number.isFinite(days) ? days : 0);
  }, 0);
}

function guidePriorityClass(value) {
  const priority = normalizeText(value || "");
  if (priority.includes("alta")) return "is-high";
  if (priority.includes("baja")) return "is-low";
  return "is-medium";
}

function guideRiskClass(value) {
  const type = normalizeText(value || "");
  if (type.includes("visa") || type.includes("pago") || type.includes("conect") || type.includes("entrada")) return "is-high";
  if (type.includes("idioma") || type.includes("temporada") || type.includes("reserva")) return "is-medium";
  return "is-low";
}

function guideCityPhoto(city) {
  const destination = findDestinationByAgentCity(city);
  return destination ? destinationPhoto(destination) : "assets/destinations/beijing-card.jpg";
}

function guideMetrics(data) {
  const cities = asArray(data?.recommended_cities);
  return [
    { label: "Ciudades", value: cities.length || "-" },
    { label: "Dias sugeridos", value: guideTotalDays(cities) || state.answers.duration || "-" },
    { label: "Ajuste medio", value: guideAverageFit(cities) ? `${guideAverageFit(cities)}/100` : "-" },
    { label: "Tramos", value: asArray(data?.route_segments).length || "-" },
  ];
}

function renderGuideActions(data, prefix = "guide") {
  const cities = asArray(data?.recommended_cities);
  const places = asArray(data?.places_to_consider);
  const segments = asArray(data?.route_segments);
  const prepTasks = asArray(data?.prep_tasks);
  return `
    <div class="agent-action-row guide-action-row">
      ${cities.length ? `<button type="button" data-save-${prefix}-cities>Guardar ciudades</button>` : ""}
      ${places.length ? `<button type="button" data-save-${prefix}-places>Guardar lugares</button>` : ""}
      ${segments.length || cities.length ? `<button type="button" data-save-${prefix}-route>Guardar ruta</button>` : ""}
      ${prepTasks.length ? `<button type="button" data-save-${prefix}-prep>Añadir checklist</button>` : ""}
      <button class="is-primary" type="button" data-save-${prefix}-all>Guardar todo</button>
    </div>
  `;
}

function renderGuideMetricRow(data) {
  return `<div class="guide-metric-row">${guideMetrics(data)
    .map((metric) => `<span><strong>${escapeHtml(metric.value)}</strong>${escapeHtml(metric.label)}</span>`)
    .join("")}</div>`;
}

function renderVisualCityCards(cities) {
  return asArray(cities)
    .map(
      (city, index) => `
        <article class="visual-city-card">
          <img src="${escapeHtml(guideCityPhoto(city))}" alt="${escapeHtml(agentCityName(city))}" loading="lazy" />
          <div>
            <span class="guide-step">Ciudad ${index + 1}</span>
            <h4>${escapeHtml(agentCityName(city))}</h4>
            <p>${escapeHtml(city.reason || "Ciudad recomendada por el agente.")}</p>
            <div class="city-score-line">
              <span>${Number(city.days) || "?"} dias</span>
              <span>${Number(city.fit_score) || 0}/100 ajuste</span>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderRouteTimeline(segments) {
  return asArray(segments)
    .map(
      (segment, index) => `
        <li>
          <i>${index + 1}</i>
          <div>
            <strong>${escapeHtml(segment.from || "")} -> ${escapeHtml(segment.to || "")}</strong>
            <span>${escapeHtml(segment.transport || "Transporte")} · ${escapeHtml(segment.time || "Tiempo pendiente")} · ${escapeHtml(segment.price || "Precio pendiente")}</span>
            ${segment.note ? `<p>${escapeHtml(segment.note)}</p>` : ""}
          </div>
        </li>
      `,
    )
    .join("");
}

function renderPlaceTiles(places) {
  return asArray(places)
    .map(
      (place) => `
        <article class="guide-place-tile">
          <span>${escapeHtml(place.city_name || "China")}</span>
          <h4>${escapeHtml(agentPlaceName(place))}</h4>
          <p>${escapeHtml(place.why || place.booking_note || "Lugar sugerido para revisar.")}</p>
          ${place.booking_note ? `<small>${escapeHtml(place.booking_note)}</small>` : ""}
        </article>
      `,
    )
    .join("");
}

function renderPrepTaskCards(tasks) {
  return asArray(tasks)
    .map(
      (task) => `
        <li class="${guidePriorityClass(task.priority)}">
          <span>${escapeHtml(task.priority || "media")}</span>
          <strong>${escapeHtml(task.category || "prep")}</strong>
          <p>${escapeHtml(task.task || "")}</p>
        </li>
      `,
    )
    .join("");
}

function renderRiskCards(risks) {
  return asArray(risks)
    .map(
      (risk) => `
        <li class="${guideRiskClass(risk.type)}">
          <span>${escapeHtml(risk.type || "riesgo")}</span>
          <p>${escapeHtml(risk.message || "")}</p>
        </li>
      `,
    )
    .join("");
}

function printableRows(items, renderItem) {
  return asArray(items).map(renderItem).join("");
}

function buildPrintableGuideHtml() {
  const data = itineraryContent?.__viajaachinaData || null;
  const guideText = itineraryContent?.innerText?.trim();
  const selected = selectedCityNames();
  const favorites = favoriteCityNames();
  const generatedAt = new Date().toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const profileHtml = `
    <section>
      <h2>Perfil del viaje</h2>
      <div class="meta-grid">
        <span><strong>Duración</strong>${escapeHtml(state.answers.duration)}</span>
        <span><strong>Presupuesto</strong>${escapeHtml(state.answers.budget)}</span>
        <span><strong>Intereses</strong>${escapeHtml(state.answers.interests)}</span>
        <span><strong>Viajeros</strong>${escapeHtml(state.answers.travelers)}</span>
        <span><strong>Ciudades seleccionadas</strong>${escapeHtml(selected.join(", ") || "Pendiente")}</span>
        <span><strong>Favoritos</strong>${escapeHtml(favorites.join(", ") || "Pendiente")}</span>
      </div>
    </section>
  `;

  const structuredHtml = data
    ? `
      <section>
        <h2>Resumen</h2>
        <p>${escapeHtml(data.summary || "Guía generada por viajaachina.")}</p>
        <div class="metric-row">${guideMetrics(data)
          .map((metric) => `<span><strong>${escapeHtml(metric.value)}</strong>${escapeHtml(metric.label)}</span>`)
          .join("")}</div>
      </section>
      ${
        asArray(data.recommended_cities).length
          ? `<section><h2>Ciudades recomendadas</h2><div class="city-print-grid">${printableRows(
              data.recommended_cities,
              (city) => `
                <article class="city-print-card">
                  <span>${Number(city.days) || "?"} dias · ${Number(city.fit_score) || 0}/100 ajuste</span>
                  <h3>${escapeHtml(agentCityName(city))}</h3>
                  <p>${escapeHtml(city.reason || "")}</p>
                </article>
              `,
            )}</div></section>`
          : ""
      }
      ${
        asArray(data.route_segments).length
          ? `<section><h2>Ruta y transporte</h2><ol class="route-print-list">${printableRows(
              data.route_segments,
              (segment, index) => `
                <li>
                  <i>${index + 1}</i>
                  <div>
                    <strong>${escapeHtml(segment.from || "")} → ${escapeHtml(segment.to || "")}</strong>
                    <span>${escapeHtml(segment.transport || "")} · ${escapeHtml(segment.time || "")} · ${escapeHtml(segment.price || "")}</span>
                    ${segment.note ? `<p>${escapeHtml(segment.note)}</p>` : ""}
                  </div>
                </li>
              `,
            )}</ol></section>`
          : ""
      }
      ${
        asArray(data.places_to_consider).length
          ? `<section><h2>Lugares clave</h2><div class="card-grid">${printableRows(
              data.places_to_consider,
              (place) => `
                <article>
                  <h3>${escapeHtml(agentPlaceName(place))}</h3>
                  <small>${escapeHtml(place.city_name || "")}</small>
                  <p>${escapeHtml(place.why || "")}</p>
                  <p>${escapeHtml(place.booking_note || "")}</p>
                </article>
              `,
            )}</div></section>`
          : ""
      }
      ${
        asArray(data.prep_tasks).length
          ? `<section><h2>Checklist antes de viajar</h2><ul class="checklist-print">${printableRows(
              data.prep_tasks,
              (task) => `<li class="${guidePriorityClass(task.priority)}"><em>${escapeHtml(task.priority || "media")}</em><strong>${escapeHtml(task.category || "prep")}</strong><p>${escapeHtml(task.task || "")}</p></li>`,
            )}</ul></section>`
          : ""
      }
      ${
        asArray(data.risk_alerts).length
          ? `<section><h2>Riesgos a revisar</h2><ul class="checklist-print">${printableRows(
              data.risk_alerts,
              (risk) => `<li class="${guideRiskClass(risk.type)}"><em>${escapeHtml(risk.type || "riesgo")}</em><p>${escapeHtml(risk.message || "")}</p></li>`,
            )}</ul></section>`
          : ""
      }
    `
    : `<section><h2>Guía</h2><pre>${escapeHtml(guideText || "")}</pre></section>`;

  return `
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>Guía viajaachina</title>
        <style>
          * { box-sizing: border-box; }
          body { margin: 0; padding: 32px; color: #14211d; font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.5; background: #fff; }
          header { display: grid; gap: 8px; margin-bottom: 24px; padding-bottom: 18px; border-bottom: 3px solid #0f766e; }
          header span { width: fit-content; border-radius: 999px; padding: 6px 10px; color: #0f4f46; background: #e7f4f1; font-weight: 800; }
          h1 { margin: 0; font-size: 34px; line-height: 1.05; }
          h2 { margin: 0 0 10px; font-size: 20px; color: #0f4f46; }
          h3 { margin: 0 0 6px; font-size: 15px; }
          p { margin: 0 0 8px; }
          small, em { color: #64748b; font-style: normal; }
          section { break-inside: avoid; margin: 0 0 22px; }
          .meta-grid, .card-grid, .city-print-grid, .metric-row { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
          .metric-row { grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 12px; }
          .metric-row span { border-radius: 8px; padding: 10px; color: #0f4f46; background: #e7f4f1; }
          .metric-row strong { display: block; color: #14211d; font-size: 20px; }
          .meta-grid span, article { border: 1px solid #dbe6e2; border-radius: 8px; padding: 11px; background: #fbfdfc; }
          .meta-grid strong { display: block; color: #0f4f46; font-size: 12px; text-transform: uppercase; }
          .city-print-card { border-top: 4px solid #0f766e; }
          .city-print-card span { display: inline-block; margin-bottom: 7px; color: #b94835; font-size: 12px; font-weight: 800; text-transform: uppercase; }
          .route-print-list { display: grid; gap: 9px; margin: 0; padding: 0; list-style: none; }
          .route-print-list li { display: grid; grid-template-columns: 28px 1fr; gap: 10px; align-items: start; break-inside: avoid; }
          .route-print-list i { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 999px; color: #fff; background: #0f766e; font-style: normal; font-weight: 900; }
          .route-print-list div { border: 1px solid #dbe6e2; border-radius: 8px; padding: 9px; }
          .route-print-list span { display: block; color: #0f4f46; font-weight: 800; }
          table { width: 100%; border-collapse: collapse; font-size: 13px; }
          th, td { border: 1px solid #dbe6e2; padding: 8px; text-align: left; vertical-align: top; }
          th { color: #0f4f46; background: #e7f4f1; }
          .checklist-print { display: grid; gap: 7px; margin: 0; padding: 0; list-style: none; }
          .checklist-print li { border: 1px solid #dbe6e2; border-left: 5px solid #94a3b8; border-radius: 8px; padding: 9px; }
          .checklist-print li.is-high { border-left-color: #b94835; }
          .checklist-print li.is-medium { border-left-color: #d89b30; }
          .checklist-print li.is-low { border-left-color: #0f766e; }
          .checklist-print em { display: block; margin-bottom: 4px; color: #b94835; font-size: 11px; font-weight: 900; text-transform: uppercase; }
          pre { white-space: pre-wrap; font: inherit; }
          footer { margin-top: 28px; padding-top: 14px; border-top: 1px solid #dbe6e2; color: #64748b; font-size: 12px; }
          @page { margin: 14mm; }
          @media print { body { padding: 0; } button { display: none; } }
        </style>
      </head>
      <body>
        <header>
          <span>viajaachina · guía gratuita</span>
          <h1>Guía visual para viajar a China</h1>
          <p>Generada el ${escapeHtml(generatedAt)}. Verifica visados, precios, horarios y entradas en fuentes oficiales antes de reservar.</p>
        </header>
        ${profileHtml}
        ${structuredHtml}
        <footer>
          viajaachina ayuda a organizar decisiones de viaje. La información puede cambiar y debe verificarse en fuentes oficiales.
        </footer>
        <script>window.addEventListener("load", () => window.print());</script>
      </body>
    </html>
  `;
}

function exportGuide() {
  const guideText = itineraryContent?.innerText?.trim();
  if (!guideText || guideText.includes("Tu guia aparecera aqui")) {
    showRegisterPrompt("top");
    addMessage("agent", "Genera una guia primero y despues podras exportarla como PDF.");
    return;
  }
  const blob = new Blob([buildPrintableGuideHtml()], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const printWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (!printWindow) {
    const link = document.createElement("a");
    link.href = url;
    link.download = "guia-viajaachina.html";
    link.click();
    addMessage("agent", "Tu navegador bloqueo la ventana de impresion. Descargue una version HTML que puedes abrir y guardar como PDF.");
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 60000);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

function parseDifyStructuredAnswer(answer) {
  const raw = String(answer || "");
  const match = raw.match(/<viajaachina_data>\s*([\s\S]*?)\s*<\/viajaachina_data>/i);
  const text = raw.replace(/<viajaachina_data>[\s\S]*?<\/viajaachina_data>/gi, "").trim();
  if (!match) return { text: text || raw, data: null };
  try {
    return { text, data: JSON.parse(match[1]) };
  } catch (error) {
    return { text: text || "Recibí una respuesta del agente, pero no pude leer los datos estructurados.", data: null };
  }
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function findDestinationByAgentCity(city) {
  const cityId = slugify(city?.city_id || city?.id || "");
  const cityName = normalizeText(city?.city_name || city?.name || "");
  return destinations.find((item) => item.id === cityId || normalizeText(item.name) === cityName);
}

function normalizeAgentPlace(place) {
  const destination = findDestinationByAgentCity(place);
  const name = String(place?.place_name || place?.name || "").trim();
  if (!name) return null;
  return {
    id: `agent-${slugify(place?.city_id || destination?.id || place?.city_name || "china")}-${slugify(name)}`,
    name,
    cityId: destination?.id || slugify(place?.city_id || place?.city_name || "unknown") || "unknown",
    cityName: destination?.name || place?.city_name || "Ciudad pendiente",
    source: "dify",
    note: place?.why || place?.booking_note || "",
    aliases: [name],
  };
}

function saveAgentCities(data) {
  asArray(data?.recommended_cities).forEach((city) => {
    const destination = findDestinationByAgentCity(city);
    if (destination) state.favorites.add(destination.id);
  });
  persistAccount("Ciudades guardadas en Mi Viaje");
  renderDestinations();
  renderMap();
  renderAccount(false);
  renderTripHub();
  showRegisterPrompt("top");
}

function saveAgentPlaces(data) {
  asArray(data?.places_to_consider).forEach((place) => {
    const normalizedPlace = normalizeAgentPlace(place);
    if (normalizedPlace) addFavoritePlace(normalizedPlace, "dify");
  });
  renderTripHub();
}

function saveAgentRoute(data) {
  const cityIds = asArray(data?.recommended_cities)
    .map((city) => findDestinationByAgentCity(city)?.id)
    .filter(Boolean);
  const segmentCities = asArray(data?.route_segments)
    .flatMap((segment) => [segment.from, segment.to])
    .map((name) => destinations.find((city) => normalizeText(city.name) === normalizeText(name))?.id)
    .filter(Boolean);
  const orderedIds = [...new Set(cityIds.length ? cityIds : segmentCities)];
  if (!orderedIds.length) return;
  state.selectedCities = orderedIds.slice(0, 6);
  state.account.savedRoutes = [
    {
      id: `agent-route-${Date.now()}`,
      name: state.selectedCities.map((id) => destinations.find((city) => city.id === id)?.name).filter(Boolean).join(" -> "),
      cityIds: [...state.selectedCities],
      createdAt: new Date().toISOString(),
      budget: state.answers.budget,
      interests: state.answers.interests,
      source: "dify",
      segments: asArray(data?.route_segments),
    },
    ...(state.account.savedRoutes || []),
  ].slice(0, 6);
  persistAccount("Ruta guardada en Mi Viaje");
  renderDestinations();
  renderMap();
  renderAccount(false);
  renderTripHub();
  showRegisterPrompt("top");
}

function saveAgentPrepTasks(data) {
  const tasks = asArray(data?.prep_tasks)
    .map((task) => ({
      id: `prep-agent-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      category: task.category || "preparacion",
      task: task.task || "",
      priority: task.priority || "media",
      createdAt: new Date().toISOString(),
    }))
    .filter((task) => task.task);
  if (!tasks.length) return;
  const existing = state.account.savedPrepTasks || [];
  state.account.savedPrepTasks = [...tasks, ...existing].slice(0, 20);
  persistAccount("Checklist añadido a Mi Viaje");
  renderAccount(false);
  renderTripHub();
  showRegisterPrompt("top");
}

function saveAllAgentData(data) {
  saveAgentCities(data);
  saveAgentPlaces(data);
  saveAgentRoute(data);
  saveAgentPrepTasks(data);
}

function addDifyResultCard(data) {
  if (!data || !messages) return;
  const cities = asArray(data.recommended_cities);
  const places = asArray(data.places_to_consider);
  const segments = asArray(data.route_segments);
  const prepTasks = asArray(data.prep_tasks);
  const risks = asArray(data.risk_alerts);
  if (![cities, places, segments, prepTasks, risks].some((items) => items.length)) return;

  const card = document.createElement("div");
  card.className = "agent-result-card";
  card.innerHTML = `
    <div class="agent-result-head">
      <span>Plan accionable</span>
      <strong>${escapeHtml(data.summary || "Plan generado por viajaachina")}</strong>
    </div>
    ${renderGuideMetricRow(data)}
    ${
      cities.length
        ? `<div class="agent-card-section"><h4>Ciudades recomendadas</h4><div class="agent-chip-grid">${cities
            .slice(0, 4)
            .map((city) => `<span>${escapeHtml(agentCityName(city))}<small>${Number(city.days) || "?"} dias · ${Number(city.fit_score) || 0}/100</small></span>`)
            .join("")}</div></div>`
        : ""
    }
    ${
      places.length
        ? `<div class="agent-card-section"><h4>Lugares clave</h4><ul>${places
            .slice(0, 5)
            .map((place) => `<li><strong>${escapeHtml(agentPlaceName(place))}</strong><span>${escapeHtml(place.city_name || "")}</span></li>`)
            .join("")}</ul></div>`
        : ""
    }
    ${
      segments.length
        ? `<div class="agent-card-section"><h4>Ruta</h4><ol class="agent-route-mini">${segments
            .map((segment) => `<li><strong>${escapeHtml(segment.from || "")} -> ${escapeHtml(segment.to || "")}</strong><span>${escapeHtml(segment.transport || "")} · ${escapeHtml(segment.time || "")} · ${escapeHtml(segment.price || "")}</span></li>`)
            .join("")}</ol></div>`
        : ""
    }
    ${
      prepTasks.length
        ? `<div class="agent-card-section"><h4>Checklist</h4><ul>${prepTasks
            .slice(0, 5)
            .map((task) => `<li><strong>${escapeHtml(task.category || "prep")}</strong><span>${escapeHtml(task.task || "")}</span></li>`)
            .join("")}</ul></div>`
        : ""
    }
    ${
      risks.length
        ? `<div class="agent-card-section"><h4>Riesgos</h4><ul>${risks
            .slice(0, 4)
            .map((risk) => `<li><strong>${escapeHtml(risk.type || "riesgo")}</strong><span>${escapeHtml(risk.message || "")}</span></li>`)
            .join("")}</ul></div>`
        : ""
    }
    ${renderGuideActions(data, "agent")}
  `;
  card.__viajaachinaData = data;
  messages.appendChild(card);
  messages.scrollTop = messages.scrollHeight;
}

function addAgentAnswer(answer) {
  const parsed = parseDifyStructuredAnswer(answer);
  if (parsed.text) addMessage("agent", parsed.text);
  if (parsed.data) addDifyResultCard(parsed.data);
}

function renderDifyItinerary(answer) {
  const parsed = parseDifyStructuredAnswer(answer);
  if (parsed.data) {
    const data = parsed.data;
    const cities = asArray(data.recommended_cities);
    const places = asArray(data.places_to_consider);
    const segments = asArray(data.route_segments);
    const prepTasks = asArray(data.prep_tasks);
    const risks = asArray(data.risk_alerts);
    itineraryContent.innerHTML = `
      <article class="trip-card generated-guide visual-guide-hero">
        <div>
          <span class="module-pill">Guia IA gratuita</span>
          <h3>${escapeHtml(data.summary || "Guia visual de viajaachina")}</h3>
          <p>Un resumen listo para guardar: ciudades, ruta, lugares, checklist y riesgos practicos.</p>
        </div>
        ${renderGuideMetricRow(data)}
        ${renderGuideActions(data, "guide")}
      </article>
      ${
        cities.length
          ? `<article class="trip-card visual-guide-section"><div class="guide-section-head"><span>01</span><h3>Ciudades recomendadas</h3></div><div class="visual-city-grid">${renderVisualCityCards(cities)}</div></article>`
          : ""
      }
      ${
        segments.length
          ? `<article class="trip-card visual-guide-section"><div class="guide-section-head"><span>02</span><h3>Ruta y transporte</h3></div><ol class="route-timeline">${renderRouteTimeline(segments)}</ol></article>`
          : ""
      }
      ${
        places.length
          ? `<article class="trip-card visual-guide-section"><div class="guide-section-head"><span>03</span><h3>Lugares clave</h3></div><div class="guide-place-tiles">${renderPlaceTiles(places)}</div></article>`
          : ""
      }
      ${
        prepTasks.length
          ? `<article class="trip-card visual-guide-section"><div class="guide-section-head"><span>04</span><h3>Checklist antes de viajar</h3></div><ul class="prep-task-cards">${renderPrepTaskCards(prepTasks)}</ul></article>`
          : ""
      }
      ${
        risks.length
          ? `<article class="trip-card visual-guide-section"><div class="guide-section-head"><span>05</span><h3>Riesgos a revisar</h3></div><ul class="risk-card-list">${renderRiskCards(risks)}</ul></article>`
          : ""
      }
    `;
    itineraryContent.__viajaachinaData = data;
    return;
  }

  const blocks = answer
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  itineraryContent.innerHTML = blocks
    .map((block, index) => {
      const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
      const [first, ...rest] = lines;
      const title = first.replace(/^#+\s*/, "");
      const body = rest.length ? rest : [first];
      return `
        <article class="trip-card">
          ${index === 0 ? `<h3>${escapeHtml(title)}</h3>` : ""}
          ${body
            .map((line) => {
              const clean = line.replace(/^[-*]\s*/, "");
              return `<p>${escapeHtml(clean)}</p>`;
            })
            .join("")}
        </article>
      `;
    })
    .join("");
}

function currentQuestion() {
  if (state.step < 0) return null;
  return visibleQuestions()[state.step];
}

function visibleQuestions() {
  const flow = questionFlows[state.intentId] || questionFlows.route_planning;
  return flow
    .map((key) => {
      const question = baseQuestions.find((item) => item.key === key);
      const override = questionOverrides[state.intentId]?.[key];
      return question ? { ...question, ...override } : null;
    })
    .filter(Boolean);
}

function advancePastAnswered() {
  const visible = visibleQuestions();
  while (state.step >= 0 && state.step < visible.length && state.answers[visible[state.step].key] !== "Pendiente") {
    state.step += 1;
  }
}

function renderQuickReplies() {
  quickReplies.innerHTML = "";
  if (state.step < 0) {
    intentOptions.forEach((intent) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = intent.label;
      button.addEventListener("click", () => handleAnswer(intent.label, { askAgent: false }));
      quickReplies.appendChild(button);
    });
    return;
  }

  const question = currentQuestion();
  if (!question) return;

  question.replies.forEach((reply) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = reply;
    button.addEventListener("click", () => handleAnswer(reply, { askAgent: false }));
    quickReplies.appendChild(button);
  });
}

function renderPreferences() {
  preferenceList.innerHTML = "";
  baseQuestions.forEach((question) => {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    const definition = document.createElement("dd");
    term.textContent = question.label;
    definition.textContent = state.answers[question.key];
    row.append(term, definition);
    preferenceList.appendChild(row);
  });
}

function extractTripHints(text) {
  const normalized = text.toLowerCase();
  const hints = {};

  const durationMatch = normalized.match(/(\d{1,2})\s*(dias|días|days|jour)/);
  if (durationMatch) hints.duration = `${durationMatch[1]} dias`;

  if (normalized.includes("solo")) hints.travelers = "Solo";
  if (normalized.includes("pareja")) hints.travelers = "Pareja";
  if (normalized.includes("amigos")) hints.travelers = "Amigos";
  if (normalized.includes("familia")) hints.travelers = "Familia";

  if (normalized.includes("econom")) hints.budget = "Economico";
  if (normalized.includes("equilibr") || normalized.includes("medio")) hints.budget = "Equilibrado";
  if (normalized.includes("comodo") || normalized.includes("cómodo") || normalized.includes("premium")) hints.budget = "Comodo";

  const interests = [];
  if (normalized.includes("historia") || normalized.includes("cultura")) interests.push("Historia y cultura");
  if (normalized.includes("comida") || normalized.includes("gastronom")) interests.push("Comida local");
  if (normalized.includes("naturaleza")) interests.push("Naturaleza");
  if (normalized.includes("compras")) interests.push("Compras");
  if (normalized.includes("vida nocturna")) interests.push("Vida nocturna");
  if (interests.length) hints.interests = [...new Set(interests)].join(", ");

  const cities = destinations
    .filter((city) => {
      const cityName = city.name.toLowerCase();
      const cityId = city.id.toLowerCase();
      return normalized.includes(cityName) || normalized.includes(cityId) || (city.id === "beijing" && normalized.includes("pekin"));
    })
    .map((city) => city.name);
  if (cities.length) hints.cities = [...new Set(cities)].join(" + ");

  const support = [];
  if (normalized.includes("pago") || normalized.includes("alipay") || normalized.includes("wechat")) support.push("Pagos");
  if (normalized.includes("tren") || normalized.includes("metro") || normalized.includes("transporte")) support.push("Trenes y metro");
  if (normalized.includes("entrada") || normalized.includes("reserva")) support.push("Entradas");
  if (normalized.includes("app") || normalized.includes("idioma") || normalized.includes("frase")) support.push("Idioma y apps");
  if (support.length) hints.support = [...new Set(support)].join(", ");

  if (normalized.includes("primera vez") || normalized.includes("no se") || normalized.includes("no sé")) {
    hints.intent = "Planificar mi viaje";
  }

  return hints;
}

function applyTripHints(text) {
  const hints = extractTripHints(text);
  const changed = [];

  Object.entries(hints).forEach(([key, value]) => {
    if (value && state.answers[key] !== value) {
      state.answers[key] = value;
      changed.push(key);
    }
  });

  if (changed.length) {
    renderPreferences();
    advancePastAnswered();
  }

  return changed;
}

function routeKey(a, b) {
  return [a, b].sort().join("-");
}

function distanceKm(a, b) {
  const earthRadius = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return Math.round(earthRadius * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h)));
}

function fallbackTransportOptions(a, b) {
  const km = distanceKm(a, b);
  if (km < 260) {
    return [
      {
        mode: "Tren regional/G",
        time: "1 h - 2 h 30 min",
        price: "¥40-180",
        note: `Referencia para ${km} km. Verificar estacion exacta.`,
      },
      {
        mode: "Coche",
        time: "2 h - 4 h",
        price: "¥400-900",
        note: "Puede convenir para grupos o equipaje.",
      },
    ];
  }
  if (km < 900) {
    return [
      {
        mode: "Tren G/D",
        time: "3 h - 6 h",
        price: "¥180-550",
        note: `Referencia para ${km} km. Suele ser la opcion mas estable.`,
      },
      {
        mode: "Avion",
        time: "1 h 30 min vuelo + traslados",
        price: "¥450-1,100",
        note: "Comparar si viajas con poco tiempo.",
      },
    ];
  }
  return [
    {
      mode: "Avion",
      time: "2 h - 3 h vuelo + traslados",
      price: "¥600-1,600",
      note: `Referencia para ${km} km. Normalmente es lo mas practico.`,
    },
    {
      mode: "Tren G/D",
      time: "7 h - 12 h",
      price: "¥500-1,000",
      note: "Solo recomendable si prefieres evitar vuelos.",
    },
  ];
}

function transportOptions(a, b) {
  return transportRoutes[routeKey(a.id, b.id)] || fallbackTransportOptions(a, b);
}

function routeSegments(selected) {
  return selected.slice(0, -1).map((city, index) => {
    const next = selected[index + 1];
    return {
      from: city,
      to: next,
      options: transportOptions(city, next),
    };
  });
}

function cityImage(city) {
  const palettes = {
    beijing: ["#b7352d", "#f2c36b", "palacio"],
    shanghai: ["#174f77", "#8bd3e6", "skyline"],
    xian: ["#7d4b2a", "#e2b66f", "muralla"],
    chengdu: ["#1c7c54", "#d8ead2", "panda"],
    chongqing: ["#73342d", "#f07d4f", "colinas"],
    hangzhou: ["#2f7d6d", "#bfded2", "lago"],
    suzhou: ["#335c67", "#d8f0ef", "jardin"],
    guangzhou: ["#8a3d28", "#f3b35d", "torre"],
    shenzhen: ["#164e63", "#9be7e5", "tech"],
    guilin: ["#2f6b45", "#d9ead3", "karst"],
    kunming: ["#5b7f3a", "#f3d38a", "flores"],
    lijiang: ["#6b4f3b", "#d8c1a3", "tejados"],
    zhangjiajie: ["#324f3a", "#aac8a7", "pilares"],
    qingdao: ["#1f6f9e", "#b8e0f2", "mar"],
    harbin: ["#4b6f8f", "#e4f4fb", "hielo"],
    hongkong: ["#26324f", "#f0b85a", "bahia"],
  };
  const [dark, light, motif] = palettes[city.id];
  const motifs = {
    palacio: '<rect x="18" y="54" width="84" height="34" rx="4" fill="#fff2cc"/><path d="M14 54h92L60 28Z" fill="#d84c35"/><rect x="52" y="66" width="16" height="22" fill="#8f2b20"/>',
    skyline: '<rect x="18" y="44" width="12" height="46" fill="#eaf8ff"/><rect x="36" y="28" width="16" height="62" fill="#eaf8ff"/><rect x="60" y="18" width="12" height="72" fill="#eaf8ff"/><rect x="78" y="38" width="18" height="52" fill="#eaf8ff"/>',
    muralla: '<path d="M14 70h94v18H14Z" fill="#f5d49a"/><path d="M18 54h18v16H18Zm34-10h18v26H52Zm34 6h18v20H86Z" fill="#f5d49a"/>',
    panda: '<circle cx="60" cy="56" r="28" fill="#fff"/><circle cx="40" cy="38" r="12" fill="#1f2933"/><circle cx="80" cy="38" r="12" fill="#1f2933"/><circle cx="50" cy="54" r="7" fill="#1f2933"/><circle cx="70" cy="54" r="7" fill="#1f2933"/>',
    colinas: '<path d="M10 86c24-44 45-44 66 0Z" fill="#ffc38b"/><path d="M38 86c28-54 52-54 80 0Z" fill="#ffe1b8"/><rect x="46" y="44" width="10" height="38" fill="#fff3df"/>',
    lago: '<path d="M14 74c20-12 36 10 58-2 18-10 28-4 40 2v16H14Z" fill="#d9fff5"/><circle cx="72" cy="34" r="15" fill="#fff6c7"/>',
    jardin: '<rect x="20" y="58" width="78" height="28" fill="#ecfaf7"/><path d="M24 58h70L59 34Z" fill="#365f5a"/><circle cx="38" cy="36" r="12" fill="#d8f0cf"/>',
    torre: '<path d="M60 18 76 90H44Z" fill="#fff1c9"/><path d="M46 50h28M50 66h20" stroke="#9b3f22" stroke-width="3"/>',
    tech: '<rect x="24" y="38" width="72" height="48" rx="8" fill="#e7ffff"/><path d="M38 62h44M52 48v28M68 48v28" stroke="#164e63" stroke-width="4"/>',
    karst: '<path d="M12 88c18-48 28-48 44 0Z" fill="#dcf7d6"/><path d="M42 88c23-70 37-70 62 0Z" fill="#f2ffed"/><path d="M12 76c30 10 64-10 96 2" stroke="#2f6b45" stroke-width="5" fill="none"/>',
    flores: '<circle cx="36" cy="58" r="12" fill="#fff3a3"/><circle cx="60" cy="48" r="14" fill="#ffcad4"/><circle cx="82" cy="60" r="12" fill="#d8f7a5"/><rect x="22" y="76" width="78" height="10" fill="#eef9d8"/>',
    tejados: '<rect x="22" y="58" width="76" height="30" fill="#f2dfc4"/><path d="M16 58h88L60 30Z" fill="#754c2f"/><path d="M28 48h64" stroke="#fff4de" stroke-width="4"/>',
    pilares: '<path d="M25 22h20l-6 68H29Z" fill="#e2efd7"/><path d="M55 12h18l-5 78H58Z" fill="#f6ffe9"/><path d="M83 30h15l-5 60H86Z" fill="#d6e8d0"/>',
    mar: '<path d="M10 74c18-12 32 10 50 0s34 8 50-2v20H10Z" fill="#dbf7ff"/><rect x="28" y="42" width="50" height="20" rx="10" fill="#fff7df"/>',
    hielo: '<path d="M60 18 76 50 60 90 44 50Z" fill="#effbff"/><path d="M30 72h60M44 46l32 32M76 46 44 78" stroke="#83b8d8" stroke-width="4"/>',
    bahia: '<rect x="18" y="38" width="12" height="48" fill="#fff0c5"/><rect x="40" y="24" width="16" height="62" fill="#fff0c5"/><rect x="66" y="46" width="14" height="40" fill="#fff0c5"/><path d="M10 86c34-12 66 8 100-4" stroke="#9be7e5" stroke-width="6" fill="none"/>',
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 96"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${dark}"/><stop offset="1" stop-color="${light}"/></linearGradient></defs><rect width="120" height="96" rx="12" fill="url(#g)"/><circle cx="98" cy="18" r="20" fill="rgba(255,255,255,.18)"/>${motifs[motif]}<text x="12" y="20" fill="white" font-family="system-ui,sans-serif" font-size="11" font-weight="800">${city.name}</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function commonsImage(fileName) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=640`;
}

function destinationPhoto(city) {
  return city.localPhoto || commonsImage(city.photo);
}

function mapConfigState(title, text) {
  if (!realMap) return;
  realMap.innerHTML = `
    <div class="map-config-state">
      <div>
        <h3>${title}</h3>
        <p>${text}</p>
      </div>
    </div>
  `;
}

function walkCoordinates(coordinates, callback) {
  if (!coordinates) return;
  if (typeof coordinates[0] === "number") {
    callback(coordinates);
    return;
  }
  coordinates.forEach((item) => walkCoordinates(item, callback));
}

function normalizeLngLat(coord) {
  const [first, second] = coord;
  const looksSwapped = first >= 15 && first <= 55 && second >= 70 && second <= 140;
  return looksSwapped ? [second, first] : [first, second];
}

function mercatorY(lat) {
  const rad = Math.max(Math.min(lat, 85), -85) * Math.PI / 180;
  return Math.log(Math.tan(Math.PI / 4 + rad / 2));
}

function lonLatToWebMercator([lng, lat]) {
  const earth = 6378137;
  const x = earth * lng * Math.PI / 180;
  const y = earth * mercatorY(lat);
  return [x, y];
}

function isProjectedCoordinate(coord) {
  return Math.abs(coord[0]) > 1000 || Math.abs(coord[1]) > 1000;
}

function buildProjection(geojson) {
  const sampleCoords = [];
  geojson.features.forEach((feature) => {
    walkCoordinates(feature.geometry?.coordinates, (coord) => {
      if (sampleCoords.length < 80) sampleCoords.push(coord);
    });
  });

  const projectedCount = sampleCoords.filter(isProjectedCoordinate).length;
  const usesProjectedCoords = projectedCount > sampleCoords.length / 2;

  function sourcePoint(coord) {
    if (usesProjectedCoords) return [coord[0], coord[1]];
    const [lng, lat] = normalizeLngLat(coord);
    return [lng, mercatorY(lat)];
  }

  const bounds = {
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
  };

  geojson.features.forEach((feature) => {
    walkCoordinates(feature.geometry?.coordinates, (coord) => {
      const [x, y] = sourcePoint(coord);
      bounds.minX = Math.min(bounds.minX, x);
      bounds.maxX = Math.max(bounds.maxX, x);
      bounds.minY = Math.min(bounds.minY, y);
      bounds.maxY = Math.max(bounds.maxY, y);
    });
  });

  const { width, height, padding } = MAP_VIEWBOX;
  const usableWidth = width - padding * 2;
  const usableHeight = height - padding * 2;
  const scale = Math.min(
    usableWidth / (bounds.maxX - bounds.minX),
    usableHeight / (bounds.maxY - bounds.minY),
  );
  const mapWidth = (bounds.maxX - bounds.minX) * scale;
  const mapHeight = (bounds.maxY - bounds.minY) * scale;
  const offsetX = (width - mapWidth) / 2;
  const offsetY = (height - mapHeight) / 2;

  return (coord, type = "map") => {
    const [x, y] =
      type === "city" && usesProjectedCoords
        ? lonLatToWebMercator(coord)
        : sourcePoint(coord);
    return [
      offsetX + (x - bounds.minX) * scale,
      offsetY + (bounds.maxY - y) * scale,
    ];
  };
}

function ringPath(ring, project) {
  return ring
    .map((coord, index) => {
      const [x, y] = project(coord);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ") + " Z";
}

function geometryPath(geometry, project) {
  if (!geometry) return "";
  if (geometry.type === "Polygon") {
    return geometry.coordinates.map((ring) => ringPath(ring, project)).join(" ");
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates
      .flatMap((polygon) => polygon.map((ring) => ringPath(ring, project)))
      .join(" ");
  }
  return "";
}

function createSvgElement(tagName, attributes = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function loadLeaflet() {
  if (window.L) return Promise.resolve(window.L);
  if (leafletLoading) return leafletLoading;

  leafletLoading = new Promise((resolve, reject) => {
    if (!document.querySelector('link[href*="leaflet"]')) {
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(css);
    }

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.async = true;
    script.onload = () => resolve(window.L);
    script.onerror = () => reject(new Error("Leaflet failed to load"));
    document.head.appendChild(script);
  });

  return leafletLoading;
}

async function loadChinaGeojson() {
  if (chinaGeojson) return chinaGeojson;
  if (geojsonLoading) return geojsonLoading;

  geojsonLoading = fetch(CHINA_GEOJSON_URL)
    .then((response) => {
      if (!response.ok) throw new Error("GeoJSON request failed");
      return response.json();
    })
    .then((data) => {
      chinaGeojson = data;
      return data;
    });

  return geojsonLoading;
}

function renderGeojsonMap(geojson) {
  if (!realMap) return;
  if (!geojson?.features?.length) {
    throw new Error("Invalid China GeoJSON");
  }
  mapProjection = buildProjection(geojson);
  markerLayers.clear();

  const svg = createSvgElement("svg", {
    class: "geo-map",
    viewBox: `0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`,
    role: "img",
    "aria-label": "Mapa de China con ciudades populares",
  });
  const provincesLayer = createSvgElement("g", { class: "geo-provinces" });
  const routeLine = createSvgElement("polyline", {
    id: "geoRouteLine",
    class: "geo-route-line",
    points: "",
  });
  const citiesLayer = createSvgElement("g", { class: "geo-cities" });

  geojson.features.forEach((feature) => {
    const path = createSvgElement("path", {
      class: "geo-province",
      d: geometryPath(feature.geometry, mapProjection),
    });
    provincesLayer.appendChild(path);
  });

  destinations.forEach((city) => {
    const [x, y] = mapProjection([city.lng, city.lat], "city");
    const marker = createSvgElement("g", {
      class: "geo-city-marker",
      tabindex: "0",
      role: "button",
      "aria-label": `Seleccionar ${city.name}`,
      transform: `translate(${x.toFixed(2)} ${y.toFixed(2)})`,
    });
    const circle = createSvgElement("circle", { r: "7", cx: "0", cy: "0" });
    const label = createSvgElement("text", { x: "11", y: "4" });
    label.textContent = city.name;
    marker.append(circle, label);
    marker.addEventListener("click", () => toggleSelectedCity(city.id));
    marker.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleSelectedCity(city.id);
      }
    });
    citiesLayer.appendChild(marker);
    markerLayers.set(city.id, marker);
  });

  svg.append(provincesLayer, routeLine, citiesLayer);
  realMap.replaceChildren(svg);
}

function renderLocalMap() {
  if (!realMap) return;
  mapProjection = null;
  markerLayers.clear();

  const wrapper = document.createElement("div");
  wrapper.className = "local-map";

  const image = document.createElement("img");
  image.className = "local-map-outline";
  image.src = "assets/china-map-complete.svg";
  image.alt = "Mapa completo de China";

  const svg = createSvgElement("svg", {
    class: "geo-map local-map-overlay",
    viewBox: `0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`,
    role: "img",
    "aria-label": "Mapa interactivo de China con ciudades populares",
  });
  const routeLine = createSvgElement("polyline", {
    id: "geoRouteLine",
    class: "geo-route-line",
    points: "",
  });
  const citiesLayer = createSvgElement("g", { class: "geo-cities" });

  destinations.forEach((city) => {
    const marker = createSvgElement("g", {
      class: "geo-city-marker",
      tabindex: "0",
      role: "button",
      "aria-label": `Seleccionar ${city.name}`,
      transform: `translate(${city.x} ${city.y})`,
    });
    const circle = createSvgElement("circle", { r: "7", cx: "0", cy: "0" });
    const label = createSvgElement("text", { x: "11", y: "4" });
    label.textContent = city.name;
    marker.append(circle, label);
    marker.addEventListener("click", () => toggleSelectedCity(city.id));
    marker.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleSelectedCity(city.id);
      }
    });
    citiesLayer.appendChild(marker);
    markerLayers.set(city.id, marker);
  });

  svg.append(routeLine, citiesLayer);
  wrapper.append(image, svg);
  realMap.replaceChildren(wrapper);
}

async function renderLeafletMap() {
  if (!realMap || leafletMap) return;

  realMap.innerHTML = `
    <div class="leaflet-map-shell">
      <div class="leaflet-map" id="leafletMap"></div>
      <div class="map-legend">
        <span><i class="legend-route"></i>En ruta</span>
        <span><i class="legend-favorite"></i>Favorita</span>
        <span><i class="legend-default"></i>Disponible</span>
      </div>
      <div class="map-approval-note">审图号: GS(2023)2767</div>
    </div>
  `;

  const L = await loadLeaflet();
  const mapNode = document.querySelector("#leafletMap");
  if (!mapNode) return;

  leafletMap = L.map(mapNode, {
    center: [35.5, 104.5],
    zoom: 4,
    minZoom: 3,
    maxZoom: 7,
    zoomControl: true,
    attributionControl: false,
  });

  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png", {
    subdomains: "abcd",
  }).addTo(leafletMap);

  const geojson = await loadChinaGeojson();
  leafletGeoLayer = L.geoJSON(geojson, {
    style: {
      fillColor: "#2a4a6a",
      fillOpacity: 0.42,
      color: "#4a8abf",
      weight: 1.4,
    },
  }).addTo(leafletMap);

  markerLayers.clear();
  destinations.forEach((city) => {
    const marker = L.circleMarker([city.lat, city.lng], {
      radius: 6,
      fillColor: "rgba(255,255,255,0.4)",
      fillOpacity: 0.8,
      color: "rgba(255,255,255,0.65)",
      weight: 1.5,
    }).addTo(leafletMap);

    L.marker([city.lat, city.lng], {
      icon: L.divIcon({
        className: "city-map-label",
        html: `<span>${city.name}</span>`,
        iconSize: [92, 18],
        iconAnchor: [-10, 8],
      }),
      interactive: false,
    }).addTo(leafletMap);

    marker.on("click", () => toggleSelectedCity(city.id));
    markerLayers.set(city.id, marker);
  });
}

function updateGeojsonMarkers() {
  markerLayers.forEach((marker, cityId) => {
    const isSelected = state.selectedCities.includes(cityId);
    const isFavorite = state.favorites.has(cityId);

    if (typeof marker.setStyle === "function") {
      if (isSelected) {
        marker.setStyle({ fillColor: "#ffb300", fillOpacity: 1, color: "#fff176", weight: 3 });
        marker.setRadius(11);
      } else if (isFavorite) {
        marker.setStyle({ fillColor: "#ff7043", fillOpacity: 0.95, color: "#ffab91", weight: 2 });
        marker.setRadius(8);
      } else {
        marker.setStyle({
          fillColor: "rgba(255,255,255,0.4)",
          fillOpacity: 0.8,
          color: "rgba(255,255,255,0.65)",
          weight: 1.5,
        });
        marker.setRadius(6);
      }
      return;
    }

    marker.classList.toggle("is-favorite", isFavorite);
    marker.classList.toggle("is-selected", isSelected);
  });
}

function updateGeojsonRoute(selected) {
  if (leafletMap && window.L) {
    leafletRouteLines.forEach((line) => leafletMap.removeLayer(line));
    leafletRouteLines = [];
    for (let index = 0; index < selected.length - 1; index += 1) {
      const from = selected[index];
      const to = selected[index + 1];
      const line = window.L.polyline(
        [
          [from.lat, from.lng],
          [to.lat, to.lng],
        ],
        {
          color: "#ffb300",
          weight: 3,
          dashArray: "10,6",
          opacity: 0.9,
        },
      ).addTo(leafletMap);
      leafletRouteLines.push(line);
    }
    return;
  }

  const routeLine = document.querySelector("#geoRouteLine");
  if (!routeLine || !mapProjection) return;

  if (selected.length >= 2) {
    const points = selected
      .map((city) => {
        const [x, y] = mapProjection ? mapProjection([city.lng, city.lat], "city") : [city.x, city.y];
        return `${x.toFixed(2)},${y.toFixed(2)}`;
      })
      .join(" ");
    routeLine.setAttribute("points", points);
    routeLine.classList.add("is-visible");
  } else {
    routeLine.setAttribute("points", "");
    routeLine.classList.remove("is-visible");
  }
}

async function initRealMap() {
  if (!realMap || leafletMap || markerLayers.size) return;

  mapConfigState("Cargando mapa de China", "Cargando mapa interactivo con Leaflet y GeoJSON de China.");

  try {
    await renderLeafletMap();
    renderMap();
  } catch (error) {
    geojsonLoading = null;
    leafletLoading = null;
    renderLocalMap();
    renderMap();
  }
}

function toggleFavorite(cityId) {
  if (state.favorites.has(cityId)) {
    state.favorites.delete(cityId);
  } else {
    state.favorites.add(cityId);
  }
  persistAccount("Favoritos guardados");
  renderDestinations();
  renderMap();
  renderAccount(false);
  renderTripHub();
  showRegisterPrompt("favorite");
}

function toggleSelectedCity(cityId) {
  if (state.selectedCities.includes(cityId)) {
    state.selectedCities = state.selectedCities.filter((id) => id !== cityId);
  } else {
    state.selectedCities.push(cityId);
  }
  renderDestinations();
  renderMap();
}

function addCityToRoute(cityId) {
  if (!state.selectedCities.includes(cityId)) {
    state.selectedCities.push(cityId);
  }
  renderDestinations();
  renderMap();
  renderTripHub();
  closeCityDetail();
}

function renderDestinations() {
  destinationGrid.innerHTML = "";
  destinations.forEach((city) => {
    const card = document.createElement("article");
    card.className = "destination-card";
    if (state.favorites.has(city.id)) card.classList.add("is-favorite");
    if (state.selectedCities.includes(city.id)) card.classList.add("is-selected");
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Seleccionar ${city.name}`);

    card.innerHTML = `
      <img class="destination-image" src="${destinationPhoto(city)}" data-fallback="${cityImage(city)}" alt="${city.name}" loading="eager" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src=this.dataset.fallback;" />
      <div class="destination-body">
        <div class="destination-top">
          <div>
            <h3>${city.name}</h3>
            <span class="destination-tag">${city.region}</span>
          </div>
          <button class="favorite-button" type="button" aria-pressed="${state.favorites.has(city.id)}" title="Guardar ${city.name}">
            ${state.favorites.has(city.id) ? "★" : "☆"}
          </button>
        </div>
        <p>${city.intro}</p>
        <div class="destination-actions">
          <button class="detail-button" type="button" data-city-detail="${city.id}">Detalles</button>
          <button class="detail-button" type="button" data-add-city-route="${city.id}">Ruta</button>
        </div>
      </div>
    `;

    card.addEventListener("click", () => toggleSelectedCity(city.id));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleSelectedCity(city.id);
      }
    });
    card.querySelector(".favorite-button").addEventListener("click", (event) => {
      event.stopPropagation();
      toggleFavorite(city.id);
    });
    card.querySelectorAll("[data-city-detail], [data-add-city-route]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });
    destinationGrid.appendChild(card);
  });
  window.setTimeout(() => {
    document.querySelectorAll(".destination-image").forEach((image) => {
      if (!image.complete || image.naturalWidth === 0) {
        image.onerror = null;
        image.src = image.dataset.fallback;
      }
    });
  }, 12000);
}

function renderMap() {
  initRealMap();
  const selected = state.selectedCities.map((id) => destinations.find((city) => city.id === id)).filter(Boolean);
  const segments = routeSegments(selected);

  updateGeojsonMarkers();
  updateGeojsonRoute(selected);

  if (selected.length >= 2) {
    routeTitle.textContent = selected.map((city) => city.name).join(" -> ");
    routeDescription.textContent =
      "Ruta por orden de seleccion. Los precios son referencias en RMB para planificacion inicial; revisar horarios y disponibilidad antes de comprar.";
    cityFeatures.innerHTML = segments
      .map(
        (segment, index) => `
          <li class="transport-segment">
            <strong>${index + 1}. ${segment.from.name} -> ${segment.to.name}</strong>
            <div class="transport-options">
              ${segment.options
                .map(
                  (option) => `
                    <span>
                      <b>${option.mode}</b>
                      <em>${option.time}</em>
                      <small>${option.price}</small>
                      <i>${option.note}</i>
                    </span>
                  `,
                )
                .join("")}
            </div>
          </li>
        `,
      )
      .join("");
  } else {
    routeTitle.textContent = selected.length === 1 ? `Origen: ${selected[0].name}` : "Selecciona tu ruta";
    routeDescription.textContent =
      selected.length === 1
        ? "Elige la siguiente ciudad para ver opciones de tren, avion o traslado."
        : "Toca ciudades en orden. Las ciudades guardadas tienen marca secundaria y la ruta seleccionada se dibuja sobre el mapa.";
    cityFeatures.innerHTML = selected.length === 1 ? `<li><strong>${selected[0].name}:</strong> ${selected[0].feature}</li>` : "";
  }

  routeStats.innerHTML = `
    <span>Favoritos: ${state.favorites.size}</span>
    <span>Seleccionadas: ${state.selectedCities.length}</span>
    <span>Tramos: ${Math.max(state.selectedCities.length - 1, 0)}</span>
    <button class="ai-context-button is-wide" type="button" data-ai-context="route">Preguntar a IA sobre esta ruta</button>
  `;
}

function askNextQuestion() {
  if (state.step < 0) {
    addMessage("agent", "Hola, soy viajaachina. Elige una categoria o escribe tu pregunta completa; si no sabes adonde ir, primero te preguntare gustos y presupuesto.");
    renderQuickReplies();
    return;
  }

  const question = currentQuestion();
  if (!question) {
    statusPill.textContent = "Listo";
    quickReplies.innerHTML = "";
    chatInput.placeholder = "Puedes pedir ajustes: mas comida, menos traslados, otro presupuesto...";
    requestDifyFollowup(buildGuidedAgentPrompt());
    return;
  }

  addMessage("agent", question.prompt);
  renderQuickReplies();
}

function detectIntent(text) {
  const normalized = text.toLowerCase();
  const exact = intentOptions.find((intent) => intent.label.toLowerCase() === normalized);
  if (exact) return exact;
  if (normalized.includes("no se") || normalized.includes("ciudad") || normalized.includes("adonde")) {
    return intentOptions.find((intent) => intent.id === "city_discovery");
  }
  if (normalized.includes("pago") || normalized.includes("alipay") || normalized.includes("wechat")) {
    return intentOptions.find((intent) => intent.id === "payment_help");
  }
  if (normalized.includes("tren") || normalized.includes("metro") || normalized.includes("transporte") || normalized.includes("didi")) {
    return intentOptions.find((intent) => intent.id === "transport_help");
  }
  if (normalized.includes("entrada") || normalized.includes("reserva") || normalized.includes("ticket")) {
    return intentOptions.find((intent) => intent.id === "tickets_help");
  }
  if (normalized.includes("prepar") || normalized.includes("app") || normalized.includes("internet")) {
    return intentOptions.find((intent) => intent.id === "prep_help");
  }
  if (normalized.includes("ruta") || normalized.includes("itinerario") || normalized.includes("plan")) {
    return intentOptions.find((intent) => intent.id === "route_planning");
  }
  return intentOptions.find((intent) => intent.id === "general_question");
}

function setIntent(text, options = {}) {
  const { silent = false } = options;
  const intent = detectIntent(text);
  state.intentId = intent.id;
  state.answers.intent = intent.label;
  state.step = 0;
  renderPreferences();
  if (!silent) {
    addMessage("agent", intent.reply);
    window.setTimeout(askNextQuestion, 260);
  }
}

async function requestDifyFollowup(text) {
  statusPill.textContent = "IA";
  chatInput.disabled = true;
  quickReplies.innerHTML = "";
  const loadingMessage = addLoadingMessage();
  try {
    const answer = await callDifyAgent(text, "chat");
    loadingMessage.remove();
    if (answer) addAgentAnswer(answer);
  } catch (error) {
    loadingMessage.remove();
    addMessage("agent", `Ahora mismo no pude conectar con Dify. Detalle tecnico: ${error.message}. Mantengo tu respuesta en el plan y puedes seguir usando el demo.`);
  } finally {
    statusPill.textContent = "En progreso";
    chatInput.disabled = false;
    chatInput.focus();
  }
}

function isCompleteAgentQuestion(text) {
  const normalized = normalizeText(text);
  const signals = [
    /\b\d+\s*(dias|dia|semanas|semana)\b/.test(normalized),
    /(octubre|septiembre|noviembre|diciembre|enero|febrero|marzo|abril|mayo|junio|julio|agosto)/.test(normalized),
    /(historia|comida|naturaleza|cultura|tren|alipay|wechat|entrada|reserva|ciudad|ruta|itinerario|guia)/.test(normalized),
    /(beijing|pekin|shanghai|xian|chengdu|guangzhou|shenzhen|hong kong)/.test(normalized),
  ].filter(Boolean).length;
  return text.length > 70 || signals >= 2;
}

function buildGuidedAgentPrompt() {
  const intent = state.intentId || "route_planning";
  const intentPrompts = {
    route_planning: "Quiero planificar una ruta por China.",
    city_discovery: "No se que ciudades visitar en China. Recomiendame ciudades segun mis preferencias.",
    payment_help: "Necesito ayuda practica para pagar en China.",
    transport_help: "Necesito ayuda practica con transporte en China.",
    tickets_help: "Necesito ayuda con entradas y reservas de atracciones en China.",
    prep_help: "Necesito preparar mi viaje a China antes de salir.",
    general_question: "Tengo una pregunta general sobre viajar a China.",
  };
  return `
${intentPrompts[intent] || intentPrompts.route_planning}

Mis respuestas:
- Duracion: ${state.answers.duration}
- Viajeros: ${state.answers.travelers}
- Presupuesto: ${state.answers.budget}
- Intereses o prioridad: ${state.answers.interests}
- Ciudades o estilo deseado: ${state.answers.cities}
- Ayuda practica: ${state.answers.support}

No me des una respuesta larga. Devuelve una recomendacion clara y el bloque <viajaachina_data> para que la web pueda mostrar tarjetas y guardar en Mi Viaje.
  `.trim();
}

function handleAnswer(text, options = {}) {
  const { askAgent = true } = options;
  const cleanText = text.trim();
  if (!cleanText) return;

  addMessage("user", cleanText);
  showRegisterPrompt("chat");
  const shouldAskAgent = askAgent && cleanText.length > 24;
  const changedByHints = applyTripHints(cleanText);

  if (state.step < 0) {
    if (shouldAskAgent && isCompleteAgentQuestion(cleanText)) {
      setIntent(cleanText, { silent: true });
      requestDifyFollowup(cleanText);
      return;
    }
    setIntent(cleanText);
    if (shouldAskAgent) requestDifyFollowup(cleanText);
    return;
  }

  const question = currentQuestion();

  if (question) {
    if (!changedByHints.includes(question.key)) {
      state.answers[question.key] = cleanText;
      state.step += 1;
      renderPreferences();
    }
    advancePastAnswered();
    if (shouldAskAgent && isCompleteAgentQuestion(cleanText)) {
      requestDifyFollowup(cleanText);
    } else {
      window.setTimeout(askNextQuestion, 260);
      if (shouldAskAgent) requestDifyFollowup(cleanText);
    }
  } else {
    requestDifyFollowup(cleanText);
  }
}

function cityPlan() {
  const selectedNames = state.selectedCities
    .map((id) => destinations.find((city) => city.id === id))
    .filter(Boolean)
    .map((city) => city.name);
  const favoriteNames = [...state.favorites]
    .map((id) => destinations.find((city) => city.id === id))
    .filter(Boolean)
    .map((city) => city.name);
  const mapCities = [...new Set([...selectedNames, ...favoriteNames])];
  if (mapCities.length >= 2) {
    const fallback = ["Pekin", "Xi'an", "Shanghai", "Hangzhou"].filter((city) => !mapCities.includes(city));
    return [...mapCities, ...fallback].slice(0, 3);
  }

  const cities = state.answers.cities.toLowerCase();
  if (cities.includes("xi")) return ["Pekin", "Xi'an", "Shanghai"];
  if (cities.includes("hangzhou")) return ["Shanghai", "Hangzhou", "Suzhou"];
  if (cities.includes("shanghai")) return ["Pekin", "Shanghai", "Hangzhou"];
  return ["Pekin", "Xi'an", "Shanghai"];
}

function readinessModules() {
  const support = state.answers.support.toLowerCase();
  const modules = [
    {
      title: "Pagos",
      level: support.includes("pago") ? "Prioritario" : "Automatico",
      text: "Configurar Alipay o WeChat Pay antes de salir, vincular tarjeta internacional y llevar efectivo de respaldo.",
    },
    {
      title: "Transporte",
      level: support.includes("tren") ? "Prioritario" : "Automatico",
      text: "Comparar tren de alta velocidad y avion segun distancia, comprar billetes con pasaporte y guardar capturas.",
    },
    {
      title: "Entradas",
      level: support.includes("entrada") ? "Prioritario" : "Automatico",
      text: "Marcar atracciones con reserva anticipada, nombre del pasaporte y posibles limites por festivos chinos.",
    },
    {
      title: "Idioma y apps",
      level: support.includes("idioma") || support.includes("app") ? "Prioritario" : "Automatico",
      text: "Preparar direcciones en chino, frases de taxi/restaurante y apps de mapa, traduccion y pagos.",
    },
  ];

  return modules;
}

function cityFeaturesForPlan(cityNames) {
  return cityNames
    .map((name) => destinations.find((city) => city.name === name))
    .filter(Boolean)
    .map((city) => `<li><strong>${city.name}</strong>: ${city.feature}</li>`)
    .join("");
}

async function generateItinerary() {
  const cities = cityPlan();
  const duration = state.answers.duration === "Pendiente" ? "8 dias" : state.answers.duration;
  const budget = state.answers.budget === "Pendiente" ? "Equilibrado" : state.answers.budget;
  const interests = state.answers.interests === "Pendiente" ? "Historia y comida local" : state.answers.interests;
  const support = state.answers.support === "Pendiente" ? "Pagos y trenes" : state.answers.support;
  const intent = state.answers.intent === "Pendiente" ? "Planificar mi viaje" : state.answers.intent;
  const modules = readinessModules();
  const memory = state.account.memory || defaultAccount.memory;

  statusPill.textContent = "Generando";
  itineraryContent.innerHTML = `
    <div class="empty-state">
      <strong>Generando guia con IA...</strong>
      <span>Estoy combinando tus preferencias, ciudades guardadas, transporte, pagos y entradas.</span>
    </div>
  `;

  try {
    const prompt = `
Genera una guia completa de viaje a China en espanol para un viajero hispanohablante.

Contexto:
- Intencion: ${intent}
- Duracion: ${duration}
- Presupuesto: ${budget}
- Intereses: ${interests}
- Ayuda prioritaria: ${support}
- Ciudades sugeridas: ${cities.join(", ")}
- Favoritos: ${favoriteCityNames().join(", ") || "ninguno"}
- Ciudades seleccionadas en el mapa: ${selectedCityNames().join(", ") || "ninguna"}
- Memoria del usuario: ${memory}

Incluye: ruta por dias, por que elegir cada ciudad, transporte entre ciudades, entradas/reservas, pagos, apps utiles, frases basicas en chino con traduccion, checklist final y advertencias practicas para turistas extranjeros.
    `.trim();
    const answer = await callDifyAgent(prompt, "itinerary");
    if (answer) {
      renderDifyItinerary(answer);
      addAgentAnswer(answer);
      statusPill.textContent = "Generado";
      return;
    }
  } catch (error) {
    statusPill.textContent = "Demo";
  }

  itineraryContent.innerHTML = `
    <article class="trip-card">
      <h3>Guia completa · ${intent}</h3>
      <div class="trip-meta">
        <span>${duration}</span>
        <span>${budget}</span>
        <span>${interests}</span>
      </div>
      <p>Ruta sugerida: ${cities.join(" -> ")}. El agente combina ruta, ciudades, pagos, transporte, entradas, idioma y preparacion previa sin pedir al viajero que active cada modulo por separado.</p>
    </article>

    <article class="trip-card">
      <h3>Personalizacion de cuenta</h3>
      <p>Perfil usado: ${state.account.travelStyle}. Intereses guardados: ${state.account.interests}. Memoria del viajero: ${memory}</p>
    </article>

    <article class="trip-card">
      <h3>Dia 1-2 · ${cities[0]}</h3>
      <p>Explora los barrios historicos, una zona de comida local y un punto iconico de la ciudad. Reserva entradas con antelacion para museos o atracciones de alta demanda, especialmente en fines de semana y festivos chinos.</p>
      <div class="trip-meta">
        <span>Entrada online</span>
        <span>Metro o taxi app</span>
        <span>2-4 h por visita</span>
      </div>
    </article>

    <article class="trip-card">
      <h3>Dia 3-5 · ${cities[1]}</h3>
      <p>Viaja en tren de alta velocidad. Compra el billete con pasaporte, llega a la estacion con tiempo y guarda capturas de las reservas. Combina una visita cultural por la manana con comida regional y paseo ligero por la tarde.</p>
      <div class="trip-meta">
        <span>Tren G/D</span>
        <span>Pasaporte requerido</span>
        <span>Equipaje ligero</span>
      </div>
    </article>

    <article class="trip-card">
      <h3>Dia 6-8 · ${cities[2]}</h3>
      <p>Cierra el viaje con una ciudad mas internacional, compras, miradores y experiencias gastronomicas. Deja la ultima tarde flexible para cambios de clima, compras finales o descanso antes del vuelo.</p>
      <div class="trip-meta">
        <span>Pagos moviles</span>
        <span>Plan flexible</span>
        <span>Salida internacional</span>
      </div>
    </article>

    <article class="trip-card">
      <h3>Destinos destacados</h3>
      <ul class="checklist">
        ${cityFeaturesForPlan(cities)}
      </ul>
    </article>

    <div class="guide-grid">
      ${modules
        .map(
          (module) => `
            <article class="guide-card">
              <h3>${module.title}</h3>
              <span class="module-pill">${module.level}</span>
              <p>${module.text}</p>
            </article>
          `,
        )
        .join("")}
    </div>

    <article class="trip-card">
      <h3>Checklist antes de salir</h3>
      <ul class="checklist">
        <li>Pasaporte valido y copias digitales de reservas importantes.</li>
        <li>Alipay o WeChat Pay probado con una compra pequena antes del viaje.</li>
        <li>Billetes de tren o vuelos internos guardados con nombre igual al pasaporte.</li>
        <li>Hoteles con direccion en chino para taxi o recepcion.</li>
        <li>Plan B de conexion: eSIM, roaming o Wi-Fi del hotel.</li>
      </ul>
    </article>

    <article class="trip-card">
      <h3>Frases utiles</h3>
      <div class="phrase-list">
        <span>请问这个地址怎么走？ · ¿Como llego a esta direccion?</span>
        <span>我可以用支付宝吗？ · ¿Puedo pagar con Alipay?</span>
        <span>请帮我叫出租车。 · Por favor, ayudeme a pedir un taxi.</span>
      </div>
      <p>Ayuda prioritaria detectada: ${support}. En una version conectada a Dify, este bloque se generaria segun ciudad, hotel y actividad del dia.</p>
    </article>
  `;
}

function resetFlow() {
  state.step = -1;
  state.intentId = "";
  state.selectedCities = [];
  Object.keys(state.answers).forEach((key) => {
    state.answers[key] = "Pendiente";
  });
  messages.innerHTML = "";
  itineraryContent.innerHTML = `
    <div class="empty-state">
      <strong>Tu guia aparecera aqui.</strong>
      <span>Completa el chatflow o genera una version inicial con lo que ya sabemos.</span>
    </div>
  `;
  statusPill.textContent = "En progreso";
  chatInput.placeholder = "Escribe tu objetivo o elige una opcion...";
  renderPreferences();
  renderDestinations();
  renderMap();
  renderAccount();
  askNextQuestion();
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = chatInput.value;
  chatInput.value = "";
  handleAnswer(text);
});

generateButton.addEventListener("click", generateItinerary);
resetTop.addEventListener("click", resetFlow);
if (accountForm) {
  accountForm.addEventListener("submit", (event) => {
    event.preventDefault();
    saveAccountFromForm();
  });
}
if (applyProfileButton) applyProfileButton.addEventListener("click", applyAccountToTrip);
if (saveRouteButton) saveRouteButton.addEventListener("click", saveCurrentRoute);
if (exportGuideButton) exportGuideButton.addEventListener("click", exportGuide);
if (openTripHubTop) openTripHubTop.addEventListener("click", () => openTripHub("summary"));
if (openTripHubFab) openTripHubFab.addEventListener("click", () => openTripHub("summary"));
if (openRegisterTop) openRegisterTop.addEventListener("click", () => openRegisterInfo("top"));
if (closeRegisterModal) closeRegisterModal.addEventListener("click", closeRegisterInfo);
if (closeCityDrawer) closeCityDrawer.addEventListener("click", closeCityDetail);
if (cityDrawerBackdrop) cityDrawerBackdrop.addEventListener("click", closeCityDetail);
if (closeTripHub) closeTripHub.addEventListener("click", closeTripHubDrawer);
if (tripHubBackdrop) tripHubBackdrop.addEventListener("click", closeTripHubDrawer);
if (registerModal) {
  registerModal.addEventListener("click", (event) => {
    if (event.target === registerModal) closeRegisterInfo();
  });
}
document.addEventListener("click", (event) => {
  const agentCard = event.target.closest(".agent-result-card");
  const guideData = event.target.closest("#itineraryContent") ? itineraryContent.__viajaachinaData : null;
  const agentData = agentCard?.__viajaachinaData || guideData;

  if (event.target.closest("[data-save-agent-cities], [data-save-guide-cities]") && agentData) {
    saveAgentCities(agentData);
    event.target.textContent = "Ciudades guardadas";
    return;
  }

  if (event.target.closest("[data-save-agent-places], [data-save-guide-places]") && agentData) {
    saveAgentPlaces(agentData);
    event.target.textContent = "Lugares guardados";
    return;
  }

  if (event.target.closest("[data-save-agent-route], [data-save-guide-route]") && agentData) {
    saveAgentRoute(agentData);
    event.target.textContent = "Ruta guardada";
    return;
  }

  if (event.target.closest("[data-save-agent-prep], [data-save-guide-prep]") && agentData) {
    saveAgentPrepTasks(agentData);
    event.target.textContent = "Checklist añadido";
    return;
  }

  if (event.target.closest("[data-save-agent-all], [data-save-guide-all]") && agentData) {
    saveAllAgentData(agentData);
    event.target.textContent = "Guardado en Mi Viaje";
    return;
  }

  const tripTab = event.target.closest("[data-trip-tab]");
  if (tripTab) {
    activeTripHubTab = tripTab.dataset.tripTab;
    renderTripHub();
    return;
  }

  const saveDetectedPlace = event.target.closest("[data-save-detected-place]");
  if (saveDetectedPlace) {
    addFavoritePlace(saveDetectedPlace.dataset.saveDetectedPlace, "chat");
    saveDetectedPlace.disabled = true;
    saveDetectedPlace.textContent = "Guardado";
    return;
  }

  const savePlace = event.target.closest("[data-save-place]");
  if (savePlace) {
    addFavoritePlace(savePlace.dataset.savePlace, "city_detail");
    const openCityId = placesCatalog.find((place) => place.id === savePlace.dataset.savePlace)?.cityId;
    if (openCityId) openCityDrawer(openCityId);
    return;
  }

  const removePlace = event.target.closest("[data-remove-place]");
  if (removePlace) {
    removeFavoritePlace(removePlace.dataset.removePlace);
    return;
  }

  const placeAiButton = event.target.closest("[data-place-ai]");
  if (placeAiButton) {
    askAiAboutPlace(placeAiButton.dataset.placeAi);
    return;
  }

  const saveCurrentRouteButton = event.target.closest("[data-save-current-route]");
  if (saveCurrentRouteButton) {
    saveCurrentRoute();
    return;
  }

  const removeCityButton = event.target.closest("[data-remove-city]");
  if (removeCityButton) {
    toggleFavorite(removeCityButton.dataset.removeCity);
    return;
  }

  const detailButton = event.target.closest("[data-city-detail]");
  if (detailButton) {
    openCityDrawer(detailButton.dataset.cityDetail);
    return;
  }

  const addCityButton = event.target.closest("[data-add-city-route]");
  if (addCityButton) {
    addCityToRoute(addCityButton.dataset.addCityRoute);
    return;
  }

  const favoriteButton = event.target.closest("[data-favorite-city]");
  if (favoriteButton) {
    toggleFavorite(favoriteButton.dataset.favoriteCity);
    openCityDrawer(favoriteButton.dataset.favoriteCity);
    return;
  }

  const cityAiButton = event.target.closest("[data-city-ai]");
  if (cityAiButton) {
    askAiAboutCity(cityAiButton.dataset.cityAi);
    return;
  }

  const loadRouteButton = event.target.closest("[data-load-route]");
  if (loadRouteButton) {
    loadSavedRoute(loadRouteButton.dataset.loadRoute);
    return;
  }

  const deleteRouteButton = event.target.closest("[data-delete-route]");
  if (deleteRouteButton) {
    deleteSavedRoute(deleteRouteButton.dataset.deleteRoute);
    return;
  }

  const button = event.target.closest("[data-ai-context]");
  if (!button) return;
  askAiWithContext(button.dataset.aiContext);
});

loadAccount();
loadPrepState();
renderPrepCenter();
resetFlow();
