const intentOptions = [
  {
    id: "route_planning",
    label: "Planificar mi viaje",
    reply: "Perfecto. Primero voy a entender tus fechas, intereses y nivel de comodidad. Despues creare una ruta completa.",
  },
  {
    id: "city_discovery",
    label: "No se adonde ir",
    reply: "Bien. Te ayudare a elegir ciudades segun tu estilo de viaje, no por una lista generica.",
  },
  {
    id: "china_readiness",
    label: "Prepararme para China",
    reply: "Vamos a revisar lo practico: pagos, transporte, entradas, apps y frases utiles.",
  },
  {
    id: "general_question",
    label: "Preguntar algo",
    reply: "Claro. Respondo tu duda y, si falta contexto para una guia completa, te hare pocas preguntas.",
  },
];

const questions = [
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

const knownRoutes = {
  "beijing-shanghai": "4 h 30 min en tren de alta velocidad",
  "beijing-xian": "4 h 15 min en tren de alta velocidad",
  "beijing-chengdu": "2 h 50 min en avion",
  "hangzhou-shanghai": "45 min en tren de alta velocidad",
  "shanghai-suzhou": "25 min en tren de alta velocidad",
  "shanghai-xian": "6 h en tren de alta velocidad",
  "chengdu-xian": "3 h 15 min en tren de alta velocidad",
  "chengdu-chongqing": "1 h 20 min en tren de alta velocidad",
  "chongqing-zhangjiajie": "4 h 30 min combinando tren y traslado",
  "guangzhou-shenzhen": "35 min en tren de alta velocidad",
  "hongkong-shenzhen": "20 min en tren transfronterizo",
  "guangzhou-hongkong": "1 h en tren de alta velocidad",
  "guangzhou-guilin": "2 h 45 min en tren de alta velocidad",
  "kunming-lijiang": "3 h 30 min en tren",
  "chengdu-kunming": "5 h 30 min en tren de alta velocidad",
  "beijing-harbin": "5 h 30 min en tren de alta velocidad",
  "beijing-qingdao": "3 h 30 min en tren de alta velocidad",
};

const ACCOUNT_STORAGE_KEY = "viajaachina-demo-account";

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
  updatedAt: "",
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
  favorites: new Set(),
  selectedCities: [],
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
const agentMemorySummary = document.querySelector("#agentMemorySummary");
const openRegisterTop = document.querySelector("#openRegisterTop");
const registerModal = document.querySelector("#registerModal");
const closeRegisterModal = document.querySelector("#closeRegisterModal");
const registerToast = document.querySelector("#registerToast");
let localMapReady = false;
const markerLayers = new Map();

function loadAccount() {
  try {
    const stored = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : {};
    state.account = { ...defaultAccount, ...parsed };
  } catch (error) {
    state.account = { ...defaultAccount };
  }

  state.favorites = new Set(state.account.favoriteCityIds || []);
}

function persistAccount(status = "Guardado local") {
  state.account.favoriteCityIds = [...state.favorites];
  state.account.updatedAt = new Date().toISOString();

  try {
    window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(state.account));
    if (accountSyncStatus) accountSyncStatus.textContent = status;
  } catch (error) {
    if (accountSyncStatus) accountSyncStatus.textContent = "No guardado";
  }
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
    <span>Memorias: ${memoryCount}</span>
  `;

  const names = favoriteCityNames();
  savedCities.innerHTML = names.length
    ? names.map((name) => `<span>${name}</span>`).join("")
    : '<span class="muted-note">Marca ciudades con la estrella para verlas aqui.</span>';

  agentMemorySummary.textContent =
    `Estilo: ${state.account.travelStyle}. Presupuesto: ${state.account.budget}. Intereses: ${state.account.interests}. Memoria: ${state.account.memory}`;
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
  messages.scrollTop = messages.scrollHeight;
}

function currentQuestion() {
  if (state.step < 0) return null;
  return questions.filter((question) => !question.hidden)[state.step];
}

function renderQuickReplies() {
  quickReplies.innerHTML = "";
  if (state.step < 0) {
    intentOptions.forEach((intent) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = intent.label;
      button.addEventListener("click", () => handleAnswer(intent.label));
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
    button.addEventListener("click", () => handleAnswer(reply));
    quickReplies.appendChild(button);
  });
}

function renderPreferences() {
  preferenceList.innerHTML = "";
  questions.forEach((question) => {
    const row = document.createElement("div");
    const term = document.createElement("dt");
    const definition = document.createElement("dd");
    term.textContent = question.label;
    definition.textContent = state.answers[question.key];
    row.append(term, definition);
    preferenceList.appendChild(row);
  });
}

function routeKey(a, b) {
  return [a, b].sort().join("-");
}

function estimateRoute(a, b) {
  const exact = knownRoutes[routeKey(a.id, b.id)];
  if (exact) return exact;

  const distance = Math.hypot(a.x - b.x, a.y - b.y);
  if (distance < 95) return "1-2 h en tren de alta velocidad";
  if (distance < 180) return "3-5 h en tren de alta velocidad";
  if (distance < 285) return "5-8 h en tren o 2 h en avion";
  return "2-3 h en avion recomendado";
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

function initRealMap() {
  if (localMapReady || !realMap) return;

  realMap.innerHTML = `
    <img class="map-outline" src="assets/china-map-complete.svg" alt="Mapa completo de China" />
    <svg class="route-overlay" viewBox="0 0 720 470" aria-hidden="true">
      <line id="routeLine" x1="0" y1="0" x2="0" y2="0"></line>
    </svg>
  `;

  destinations.forEach((city) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "map-city-point";
    button.style.left = `${(city.x / 720) * 100}%`;
    button.style.top = `${(city.y / 470) * 100}%`;
    button.setAttribute("aria-label", `Seleccionar ${city.name}`);
    button.innerHTML = `<span></span><strong>${city.name}</strong>`;
    button.addEventListener("click", () => toggleSelectedCity(city.id));
    realMap.appendChild(button);
    markerLayers.set(city.id, button);
  });

  localMapReady = true;
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
  showRegisterPrompt("favorite");
}

function toggleSelectedCity(cityId) {
  if (state.selectedCities.includes(cityId)) {
    state.selectedCities = state.selectedCities.filter((id) => id !== cityId);
  } else {
    if (state.selectedCities.length === 2) state.selectedCities.shift();
    state.selectedCities.push(cityId);
  }
  renderDestinations();
  renderMap();
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

  markerLayers.forEach((marker, cityId) => {
    marker.classList.toggle("is-favorite", state.favorites.has(cityId));
    marker.classList.toggle("is-selected", state.selectedCities.includes(cityId));
  });

  if (selected.length === 2) {
    const routeLine = document.querySelector("#routeLine");
    if (routeLine) {
      routeLine.setAttribute("x1", selected[0].x);
      routeLine.setAttribute("y1", selected[0].y);
      routeLine.setAttribute("x2", selected[1].x);
      routeLine.setAttribute("y2", selected[1].y);
      routeLine.classList.add("is-visible");
    }
    routeTitle.textContent = `${selected[0].name} -> ${selected[1].name}`;
    routeDescription.textContent = `Tiempo estimado: ${estimateRoute(selected[0], selected[1])}. Recomendacion: revisar disponibilidad con pasaporte y dejar margen para llegar a la estacion.`;
    cityFeatures.innerHTML = selected.map((city) => `<li><strong>${city.name}:</strong> ${city.feature}</li>`).join("");
  } else {
    const routeLine = document.querySelector("#routeLine");
    if (routeLine) {
      routeLine.classList.remove("is-visible");
    }
    routeTitle.textContent = selected.length === 1 ? `Origen: ${selected[0].name}` : "Selecciona dos puntos";
    routeDescription.textContent =
      selected.length === 1
        ? "Elige una segunda ciudad para ver la ruta y el tiempo estimado de transporte."
        : "Las ciudades guardadas aparecen con una segunda marca. Al elegir dos ciudades, la ruta se ilumina y veras el tiempo estimado en tren o avion.";
    cityFeatures.innerHTML = selected.length === 1 ? `<li><strong>${selected[0].name}:</strong> ${selected[0].feature}</li>` : "";
  }

  routeStats.innerHTML = `
    <span>Favoritos: ${state.favorites.size}</span>
    <span>Seleccionadas: ${state.selectedCities.length}/2</span>
  `;
}

function askNextQuestion() {
  if (state.step < 0) {
    addMessage("agent", "Hola, soy viajaachina. Puedo ayudarte a planificar la ruta, elegir ciudades, preparar pagos/transporte/entradas o resolver una duda concreta.");
    addMessage("agent", "Elige por donde quieres empezar. Yo conectare las demas partes automaticamente cuando haga falta.");
    renderQuickReplies();
    return;
  }

  const question = currentQuestion();
  if (!question) {
    statusPill.textContent = "Listo";
    addMessage("agent", "Perfecto. Ya tengo lo esencial. Puedo generar una guia completa con ruta, ciudades, pagos, transporte, entradas, frases utiles y checklist.");
    quickReplies.innerHTML = "";
    chatInput.placeholder = "Puedes pedir ajustes: mas comida, menos traslados, otro presupuesto...";
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
  if (normalized.includes("pago") || normalized.includes("tren") || normalized.includes("metro") || normalized.includes("entrada") || normalized.includes("app")) {
    return intentOptions.find((intent) => intent.id === "china_readiness");
  }
  if (normalized.includes("ruta") || normalized.includes("itinerario") || normalized.includes("plan")) {
    return intentOptions.find((intent) => intent.id === "route_planning");
  }
  return intentOptions.find((intent) => intent.id === "general_question");
}

function setIntent(text) {
  const intent = detectIntent(text);
  state.answers.intent = intent.label;
  state.step = 0;
  renderPreferences();
  addMessage("agent", intent.reply);
  window.setTimeout(askNextQuestion, 260);
}

function handleAnswer(text) {
  const cleanText = text.trim();
  if (!cleanText) return;

  addMessage("user", cleanText);
  showRegisterPrompt("chat");
  if (state.step < 0) {
    setIntent(cleanText);
    return;
  }

  const question = currentQuestion();

  if (question) {
    state.answers[question.key] = cleanText;
    state.step += 1;
    renderPreferences();
    window.setTimeout(askNextQuestion, 260);
  } else {
    const intent = detectIntent(cleanText);
    addMessage("agent", `Anotado. Lo trato como: ${intent.label}. Si quieres, puedo regenerar la guia con este ajuste.`);
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

function generateItinerary() {
  const cities = cityPlan();
  const duration = state.answers.duration === "Pendiente" ? "8 dias" : state.answers.duration;
  const budget = state.answers.budget === "Pendiente" ? "Equilibrado" : state.answers.budget;
  const interests = state.answers.interests === "Pendiente" ? "Historia y comida local" : state.answers.interests;
  const support = state.answers.support === "Pendiente" ? "Pagos y trenes" : state.answers.support;
  const intent = state.answers.intent === "Pendiente" ? "Planificar mi viaje" : state.answers.intent;
  const modules = readinessModules();
  const memory = state.account.memory || defaultAccount.memory;

  statusPill.textContent = "Generado";
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
if (openRegisterTop) openRegisterTop.addEventListener("click", () => openRegisterInfo("top"));
if (closeRegisterModal) closeRegisterModal.addEventListener("click", closeRegisterInfo);
if (registerModal) {
  registerModal.addEventListener("click", (event) => {
    if (event.target === registerModal) closeRegisterInfo();
  });
}

loadAccount();
resetFlow();
