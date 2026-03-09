// ============================
// AGRICULTURE DICTIONARY DATA
// ============================

const AGRICULTURE_DICTIONARY = [
    // ---- CROPS ----
    {
        term: "Crop Rotation",
        category: "crops",
        definition: "The practice of growing different types of crops in the same area across sequential seasons to improve soil health, optimize nutrients, and combat pest and weed pressure.",
        translations: {
            en: "Crop Rotation",
            hi: "फसल चक्र",
            es: "Rotación de cultivos",
            fr: "Rotation des cultures",
            de: "Fruchtwechsel",
            zh: "轮作",
            ja: "輪作",
            ar: "الدورة الزراعية",
            pt: "Rotação de culturas",
            ru: "Севооборот",
            ko: "윤작",
            ta: "பயிர் சுழற்சி"
        }
    },
    {
        term: "Photosynthesis",
        category: "crops",
        definition: "The process by which green plants and certain other organisms transform light energy into chemical energy, converting carbon dioxide and water into glucose and oxygen.",
        translations: {
            en: "Photosynthesis",
            hi: "प्रकाश संश्लेषण",
            es: "Fotosíntesis",
            fr: "Photosynthèse",
            de: "Photosynthese",
            zh: "光合作用",
            ja: "光合成",
            ar: "التمثيل الضوئي",
            pt: "Fotossíntese",
            ru: "Фотосинтез",
            ko: "광합성",
            ta: "ஒளிச்சேர்க்கை"
        }
    },
    {
        term: "Germination",
        category: "crops",
        definition: "The process by which a plant grows from a seed, beginning when the seed absorbs water and the embryo starts to grow, breaking through the seed coat.",
        translations: {
            en: "Germination",
            hi: "अंकुरण",
            es: "Germinación",
            fr: "Germination",
            de: "Keimung",
            zh: "发芽",
            ja: "発芽",
            ar: "الإنبات",
            pt: "Germinação",
            ru: "Прорастание",
            ko: "발아",
            ta: "முளைப்பு"
        }
    },
    {
        term: "Hybrid Seeds",
        category: "crops",
        definition: "Seeds produced by cross-pollinating two different parent plants of the same species to combine desirable traits from each, resulting in improved vigor and yield.",
        translations: {
            en: "Hybrid Seeds",
            hi: "संकर बीज",
            es: "Semillas híbridas",
            fr: "Graines hybrides",
            de: "Hybridsamen",
            zh: "杂交种子",
            ja: "交配種子",
            ar: "بذور هجينة",
            pt: "Sementes híbridas",
            ru: "Гибридные семена",
            ko: "교배 종자",
            ta: "கலப்பின விதைகள்"
        }
    },
    {
        term: "Intercropping",
        category: "crops",
        definition: "The agricultural practice of growing two or more crops simultaneously in the same field to maximize use of resources like light, water, and nutrients.",
        translations: {
            en: "Intercropping",
            hi: "अंतर-फसल",
            es: "Cultivo intercalado",
            fr: "Culture intercalaire",
            de: "Mischkultur",
            zh: "间作",
            ja: "間作",
            ar: "الزراعة البينية",
            pt: "Consórcio de culturas",
            ru: "Совмещённые посевы",
            ko: "간작",
            ta: "ஊடுபயிர்"
        }
    },
    {
        term: "Tillage",
        category: "crops",
        definition: "The agricultural preparation of soil by mechanical agitation including digging, stirring, and overturning to prepare for crop planting.",
        translations: {
            en: "Tillage",
            hi: "जुताई",
            es: "Labranza",
            fr: "Labour",
            de: "Bodenbearbeitung",
            zh: "耕作",
            ja: "耕起",
            ar: "الحراثة",
            pt: "Preparo do solo",
            ru: "Обработка почвы",
            ko: "경운",
            ta: "உழவு"
        }
    },
    {
        term: "Harvest Index",
        category: "crops",
        definition: "The ratio of harvested grain yield to total shoot dry matter, used as a measure of how efficiently a crop converts total biomass into grain.",
        translations: {
            en: "Harvest Index",
            hi: "कटाई सूचकांक",
            es: "Índice de cosecha",
            fr: "Indice de récolte",
            de: "Ernteindex",
            zh: "收获指数",
            ja: "収穫指数",
            ar: "مؤشر الحصاد",
            pt: "Índice de colheita",
            ru: "Индекс урожая",
            ko: "수확지수",
            ta: "அறுவடை குறியீடு"
        }
    },
    // ---- SOIL ----
    {
        term: "Nitrogen Fixation",
        category: "soil",
        definition: "The biological process by which nitrogen gas (N₂) in the atmosphere is converted into ammonia (NH₃) by soil bacteria, especially in legume root nodules.",
        translations: {
            en: "Nitrogen Fixation",
            hi: "नाइट्रोजन यौगिकीकरण",
            es: "Fijación de nitrógeno",
            fr: "Fixation de l'azote",
            de: "Stickstofffixierung",
            zh: "固氮作用",
            ja: "窒素固定",
            ar: "تثبيت النيتروجين",
            pt: "Fixação de nitrogênio",
            ru: "Азотфиксация",
            ko: "질소 고정",
            ta: "நைட்ரஜன் நிலைப்படுத்தல்"
        }
    },
    {
        term: "Soil pH",
        category: "soil",
        definition: "A measure of the acidity or alkalinity of soil on a scale of 0-14, which affects nutrient availability and microbial activity critical for plant growth.",
        translations: {
            en: "Soil pH",
            hi: "मिट्टी का pH मान",
            es: "pH del suelo",
            fr: "pH du sol",
            de: "Boden-pH-Wert",
            zh: "土壤酸碱度",
            ja: "土壌pH",
            ar: "حموضة التربة",
            pt: "pH do solo",
            ru: "pH почвы",
            ko: "토양 pH",
            ta: "மண் pH"
        }
    },
    {
        term: "Composting",
        category: "soil",
        definition: "The natural process of recycling decomposed organic materials like food scraps and leaves into a rich soil amendment known as compost.",
        translations: {
            en: "Composting",
            hi: "खाद बनाना",
            es: "Compostaje",
            fr: "Compostage",
            de: "Kompostierung",
            zh: "堆肥",
            ja: "堆肥化",
            ar: "التسميد العضوي",
            pt: "Compostagem",
            ru: "Компостирование",
            ko: "퇴비화",
            ta: "உரமாக்கல்"
        }
    },
    {
        term: "Humus",
        category: "soil",
        definition: "The dark organic material in soil formed by the decomposition of plant and animal matter, essential for soil fertility, moisture retention, and structure.",
        translations: {
            en: "Humus",
            hi: "ह्यूमस",
            es: "Humus",
            fr: "Humus",
            de: "Humus",
            zh: "腐殖质",
            ja: "腐植",
            ar: "الدبال",
            pt: "Húmus",
            ru: "Гумус",
            ko: "부식질",
            ta: "மட்கு"
        }
    },
    {
        term: "Soil Erosion",
        category: "soil",
        definition: "The displacement of the upper layer of soil by wind, water, or human activity, leading to loss of fertile topsoil and degradation of land quality.",
        translations: {
            en: "Soil Erosion",
            hi: "मृदा अपरदन",
            es: "Erosión del suelo",
            fr: "Érosion du sol",
            de: "Bodenerosion",
            zh: "土壤侵蚀",
            ja: "土壌侵食",
            ar: "تآكل التربة",
            pt: "Erosão do solo",
            ru: "Эрозия почвы",
            ko: "토양 침식",
            ta: "மண் அரிப்பு"
        }
    },
    {
        term: "Mulching",
        category: "soil",
        definition: "Applying a layer of material to the surface of soil to conserve moisture, improve fertility, reduce weed growth, and regulate soil temperature.",
        translations: {
            en: "Mulching",
            hi: "मल्चिंग",
            es: "Acolchado",
            fr: "Paillage",
            de: "Mulchen",
            zh: "覆盖",
            ja: "マルチング",
            ar: "التغطية",
            pt: "Cobertura morta",
            ru: "Мульчирование",
            ko: "멀칭",
            ta: "தழைக்கூளமிடல்"
        }
    },
    // ---- IRRIGATION ----
    {
        term: "Drip Irrigation",
        category: "irrigation",
        definition: "A micro-irrigation method that delivers water slowly to the roots of plants through a network of emitters, pipes, and tubing, minimizing evaporation and runoff.",
        translations: {
            en: "Drip Irrigation",
            hi: "टपक सिंचाई",
            es: "Riego por goteo",
            fr: "Irrigation goutte à goutte",
            de: "Tröpfchenbewässerung",
            zh: "滴灌",
            ja: "点滴灌漑",
            ar: "الري بالتنقيط",
            pt: "Irrigação por gotejamento",
            ru: "Капельное орошение",
            ko: "점적 관개",
            ta: "சொட்டு நீர்ப்பாசனம்"
        }
    },
    {
        term: "Sprinkler Irrigation",
        category: "irrigation",
        definition: "A method of applying irrigation water similar to natural rainfall by distributing water through a system of pipes and spray heads under pressure.",
        translations: {
            en: "Sprinkler Irrigation",
            hi: "फव्वारा सिंचाई",
            es: "Riego por aspersión",
            fr: "Irrigation par aspersion",
            de: "Beregnungsbewässerung",
            zh: "喷灌",
            ja: "スプリンクラー灌漑",
            ar: "الري بالرش",
            pt: "Irrigação por aspersão",
            ru: "Дождевание",
            ko: "스프링클러 관개",
            ta: "தெளிப்பு நீர்ப்பாசனம்"
        }
    },
    {
        term: "Watershed Management",
        category: "irrigation",
        definition: "The organized effort to manage water resources at the watershed level through conservation, proper land use, and control of water flow for sustainable agriculture.",
        translations: {
            en: "Watershed Management",
            hi: "जलसंभर प्रबंधन",
            es: "Gestión de cuencas",
            fr: "Gestion des bassins versants",
            de: "Einzugsgebietsmanagement",
            zh: "流域管理",
            ja: "流域管理",
            ar: "إدارة مستجمعات المياه",
            pt: "Gestão de bacias hidrográficas",
            ru: "Управление водосборами",
            ko: "유역 관리",
            ta: "நீர்வடிநிலம் மேலாண்மை"
        }
    },
    {
        term: "Fertigation",
        category: "irrigation",
        definition: "The injection of fertilizers, soil amendments, and other water-soluble products into an irrigation system, delivering nutrients directly to plant roots.",
        translations: {
            en: "Fertigation",
            hi: "उर्वरक सिंचाई",
            es: "Fertirrigación",
            fr: "Fertigation",
            de: "Fertigation",
            zh: "水肥一体化",
            ja: "養液灌漑",
            ar: "التسميد بالري",
            pt: "Fertirrigação",
            ru: "Фертигация",
            ko: "관비법",
            ta: "உரநீர்ப்பாசனம்"
        }
    },
    // ---- LIVESTOCK ----
    {
        term: "Animal Husbandry",
        category: "livestock",
        definition: "The branch of agriculture concerned with the care, breeding, and management of domestic animals including cattle, poultry, and fish.",
        translations: {
            en: "Animal Husbandry",
            hi: "पशुपालन",
            es: "Ganadería",
            fr: "Élevage",
            de: "Tierhaltung",
            zh: "畜牧业",
            ja: "畜産",
            ar: "تربية الحيوانات",
            pt: "Pecuária",
            ru: "Животноводство",
            ko: "축산업",
            ta: "கால்நடை வளர்ப்பு"
        }
    },
    {
        term: "Silage",
        category: "livestock",
        definition: "Fermented, high-moisture stored fodder made from grass crops including corn, sorghum, or other cereals, used as animal feed especially in winter.",
        translations: {
            en: "Silage",
            hi: "साइलेज",
            es: "Ensilaje",
            fr: "Ensilage",
            de: "Silage",
            zh: "青贮饲料",
            ja: "サイレージ",
            ar: "السيلاج",
            pt: "Silagem",
            ru: "Силос",
            ko: "사일리지",
            ta: "பதனிடல் தீவனம்"
        }
    },
    {
        term: "Veterinary Science",
        category: "livestock",
        definition: "The branch of medicine dealing with the prevention, diagnosis, and treatment of diseases in animals, essential for livestock health and productivity.",
        translations: {
            en: "Veterinary Science",
            hi: "पशु चिकित्सा विज्ञान",
            es: "Ciencia veterinaria",
            fr: "Science vétérinaire",
            de: "Veterinärwissenschaft",
            zh: "兽医学",
            ja: "獣医学",
            ar: "الطب البيطري",
            pt: "Ciência veterinária",
            ru: "Ветеринарная наука",
            ko: "수의학",
            ta: "கால்நடை மருத்துவம்"
        }
    },
    {
        term: "Dairy Farming",
        category: "livestock",
        definition: "A class of agriculture focused on the long-term production of milk from dairy cattle, which is then processed for eventual sale of dairy products.",
        translations: {
            en: "Dairy Farming",
            hi: "डेयरी फार्मिंग",
            es: "Ganadería lechera",
            fr: "Élevage laitier",
            de: "Milchwirtschaft",
            zh: "奶牛养殖",
            ja: "酪農",
            ar: "تربية الألبان",
            pt: "Pecuária leiteira",
            ru: "Молочное животноводство",
            ko: "낙농업",
            ta: "பால் பண்ணை"
        }
    },
    // ---- MACHINERY ----
    {
        term: "Combine Harvester",
        category: "machinery",
        definition: "A versatile machine designed to efficiently harvest a variety of grain crops by combining reaping, threshing, and winnowing into a single process.",
        translations: {
            en: "Combine Harvester",
            hi: "कंबाइन हार्वेस्टर",
            es: "Cosechadora combinada",
            fr: "Moissonneuse-batteuse",
            de: "Mähdrescher",
            zh: "联合收割机",
            ja: "コンバイン",
            ar: "الحصادة الجامعة",
            pt: "Colheitadeira",
            ru: "Зерноуборочный комбайн",
            ko: "콤바인",
            ta: "அறுவடை இயந்திரம்"
        }
    },
    {
        term: "Seed Drill",
        category: "machinery",
        definition: "A device that sows seeds at proper depth and spacing in rows, covering them with soil and pressing them down, ensuring optimal germination rates.",
        translations: {
            en: "Seed Drill",
            hi: "बीज बोने की मशीन",
            es: "Sembradora",
            fr: "Semoir",
            de: "Sämaschine",
            zh: "播种机",
            ja: "種まき機",
            ar: "آلة البذر",
            pt: "Semeadeira",
            ru: "Сеялка",
            ko: "파종기",
            ta: "விதை ஊடுகருவி"
        }
    },
    {
        term: "Plough",
        category: "machinery",
        definition: "A farm tool used to loosen or turn the soil before sowing seed or planting, creating furrows to allow better water absorption and root growth.",
        translations: {
            en: "Plough",
            hi: "हल",
            es: "Arado",
            fr: "Charrue",
            de: "Pflug",
            zh: "犁",
            ja: "鋤",
            ar: "المحراث",
            pt: "Arado",
            ru: "Плуг",
            ko: "쟁기",
            ta: "கலப்பை"
        }
    },
    // ---- PESTS ----
    {
        term: "Integrated Pest Management",
        category: "pests",
        definition: "An ecosystem-based strategy combining biological, cultural, physical, and chemical tools to minimize pest damage with least possible hazard to people and environment.",
        translations: {
            en: "Integrated Pest Management",
            hi: "एकीकृत कीट प्रबंधन",
            es: "Manejo integrado de plagas",
            fr: "Lutte intégrée",
            de: "Integrierter Pflanzenschutz",
            zh: "综合虫害管理",
            ja: "総合的病害虫管理",
            ar: "المكافحة المتكاملة للآفات",
            pt: "Manejo integrado de pragas",
            ru: "Интегрированная защита растений",
            ko: "종합 해충 관리",
            ta: "ஒருங்கிணைந்த பூச்சி மேலாண்மை"
        }
    },
    {
        term: "Biological Control",
        category: "pests",
        definition: "The use of living organisms (natural predators, parasites, or pathogens) to suppress pest populations, reducing the need for chemical pesticides.",
        translations: {
            en: "Biological Control",
            hi: "जैविक नियंत्रण",
            es: "Control biológico",
            fr: "Lutte biologique",
            de: "Biologische Schädlingsbekämpfung",
            zh: "生物防治",
            ja: "生物的防除",
            ar: "المكافحة البيولوجية",
            pt: "Controle biológico",
            ru: "Биологический контроль",
            ko: "생물적 방제",
            ta: "உயிர் கட்டுப்பாடு"
        }
    },
    {
        term: "Pesticide Resistance",
        category: "pests",
        definition: "The genetic ability of a pest population to survive exposure to a pesticide that was previously effective, requiring alternative management strategies.",
        translations: {
            en: "Pesticide Resistance",
            hi: "कीटनाशक प्रतिरोध",
            es: "Resistencia a pesticidas",
            fr: "Résistance aux pesticides",
            de: "Pestizidresistenz",
            zh: "农药抗性",
            ja: "農薬耐性",
            ar: "مقاومة المبيدات",
            pt: "Resistência a pesticidas",
            ru: "Устойчивость к пестицидам",
            ko: "농약 저항성",
            ta: "பூச்சிக்கொல்லி எதிர்ப்பு"
        }
    },
    {
        term: "Crop Disease",
        category: "pests",
        definition: "An impairment of the normal state of a plant that interrupts vital functions, caused by pathogens such as fungi, bacteria, viruses, or nematodes.",
        translations: {
            en: "Crop Disease",
            hi: "फसल रोग",
            es: "Enfermedad del cultivo",
            fr: "Maladie des cultures",
            de: "Pflanzenkrankheit",
            zh: "作物病害",
            ja: "作物病害",
            ar: "أمراض المحاصيل",
            pt: "Doença da lavoura",
            ru: "Болезни культур",
            ko: "작물 병해",
            ta: "பயிர் நோய்"
        }
    }
];

// Category metadata
const CATEGORIES = [
    {
        id: "crops",
        emoji: "🌾",
        name: "Crops & Cultivation",
        description: "Terminology related to crop science, planting techniques, and harvest management",
        count: AGRICULTURE_DICTIONARY.filter(t => t.category === "crops").length
    },
    {
        id: "soil",
        emoji: "🪨",
        name: "Soil Science",
        description: "Terms about soil composition, fertility, nutrients, and land management",
        count: AGRICULTURE_DICTIONARY.filter(t => t.category === "soil").length
    },
    {
        id: "irrigation",
        emoji: "💧",
        name: "Irrigation & Water",
        description: "Water management, irrigation systems, and conservation techniques",
        count: AGRICULTURE_DICTIONARY.filter(t => t.category === "irrigation").length
    },
    {
        id: "livestock",
        emoji: "🐄",
        name: "Livestock & Dairy",
        description: "Animal husbandry, veterinary care, dairy farming, and feed management",
        count: AGRICULTURE_DICTIONARY.filter(t => t.category === "livestock").length
    },
    {
        id: "machinery",
        emoji: "🚜",
        name: "Farm Machinery",
        description: "Agricultural equipment, tools, and mechanization technologies",
        count: AGRICULTURE_DICTIONARY.filter(t => t.category === "machinery").length
    },
    {
        id: "pests",
        emoji: "🐛",
        name: "Pest Management",
        description: "Pest control, disease prevention, biological control, and crop protection",
        count: AGRICULTURE_DICTIONARY.filter(t => t.category === "pests").length
    }
];

// Language metadata
const LANGUAGES = {
    en: { name: "English", flag: "🇬🇧" },
    hi: { name: "Hindi", flag: "🇮🇳" },
    es: { name: "Spanish", flag: "🇪🇸" },
    fr: { name: "French", flag: "🇫🇷" },
    de: { name: "German", flag: "🇩🇪" },
    zh: { name: "Chinese", flag: "🇨🇳" },
    ja: { name: "Japanese", flag: "🇯🇵" },
    ar: { name: "Arabic", flag: "🇸🇦" },
    pt: { name: "Portuguese", flag: "🇧🇷" },
    ru: { name: "Russian", flag: "🇷🇺" },
    ko: { name: "Korean", flag: "🇰🇷" },
    ta: { name: "Tamil", flag: "🇮🇳" }
};
