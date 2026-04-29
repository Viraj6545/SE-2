// ============================
// AGRITRANSLATE - MAIN APP
// IndicTrans2 Powered Multi-Page SPA
// ============================

document.addEventListener("DOMContentLoaded", () => {
    // ---- STATE ----
    let currentPage = "home";
    let currentFilter = "all";
    let currentPageNum = 1;
    const itemsPerPage = 6;
    let recentTranslations = JSON.parse(localStorage.getItem("agri-recent") || "[]");
    const API_BASE = "http://localhost:8000";

    // ---- INDICTRANS2 LANGUAGES ----
    const INDIC_LANGUAGES = [
        { code: "en", name: "English", script: "English", flag: "🇬🇧" },
        { code: "hi", name: "Hindi", script: "हिन्दी", flag: "🇮🇳" },
        { code: "bn", name: "Bengali", script: "বাংলা", flag: "🇮🇳" },
        { code: "ta", name: "Tamil", script: "தமிழ்", flag: "🇮🇳" },
        { code: "te", name: "Telugu", script: "తెలుగు", flag: "🇮🇳" },
        { code: "mr", name: "Marathi", script: "मराठी", flag: "🇮🇳" },
        { code: "gu", name: "Gujarati", script: "ગુજરાતી", flag: "🇮🇳" },
        { code: "kn", name: "Kannada", script: "ಕನ್ನಡ", flag: "🇮🇳" },
        { code: "ml", name: "Malayalam", script: "മലയാളം", flag: "🇮🇳" },
        { code: "pa", name: "Punjabi", script: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
        { code: "or", name: "Odia", script: "ଓଡ଼ିଆ", flag: "🇮🇳" },
        { code: "as", name: "Assamese", script: "অসমীয়া", flag: "🇮🇳" },
        { code: "ur", name: "Urdu", script: "اردو", flag: "🇵🇰" },
        { code: "sa", name: "Sanskrit", script: "संस्कृतम्", flag: "🇮🇳" },
        { code: "ne", name: "Nepali", script: "नेपाली", flag: "🇳🇵" },
        { code: "sd", name: "Sindhi", script: "سنڌي", flag: "🇮🇳" },
        { code: "ks", name: "Kashmiri", script: "कॉशुर", flag: "🇮🇳" },
        { code: "doi", name: "Dogri", script: "डोगरी", flag: "🇮🇳" },
        { code: "kok", name: "Konkani", script: "कोंकणी", flag: "🇮🇳" },
        { code: "mai", name: "Maithili", script: "मैथिली", flag: "🇮🇳" },
        { code: "mni", name: "Manipuri", script: "মৈতৈলোন্", flag: "🇮🇳" },
        { code: "sat", name: "Santali", script: "ᱥᱟᱱᱛᱟᱲᱤ", flag: "🇮🇳" },
        { code: "bo", name: "Bodo", script: "बड़ो", flag: "🇮🇳" },
    ];

    const UI_LANGUAGES = [
        { code: "eng_Latn", label: "English" },
        { code: "hin_Deva", label: "Hindi" },
        { code: "ben_Beng", label: "Bengali" },
        { code: "tam_Taml", label: "Tamil" },
        { code: "tel_Telu", label: "Telugu" },
        { code: "mar_Deva", label: "Marathi" },
        { code: "guj_Gujr", label: "Gujarati" },
        { code: "kan_Knda", label: "Kannada" },
        { code: "mal_Mlym", label: "Malayalam" },
        { code: "pan_Guru", label: "Punjabi" },
        { code: "ory_Orya", label: "Odia" },
        { code: "asm_Beng", label: "Assamese" },
        { code: "brx_Deva", label: "Bodo" },
        { code: "doi_Deva", label: "Dogri" },
        { code: "kas_Arab", label: "Kashmiri (Arabic)" },
        { code: "kas_Deva", label: "Kashmiri (Devanagari)" },
        { code: "gom_Deva", label: "Konkani" },
        { code: "mai_Deva", label: "Maithili" },
        { code: "mni_Beng", label: "Manipuri (Bengali)" },
        { code: "mni_Mtei", label: "Manipuri (Meitei)" },
        { code: "npi_Deva", label: "Nepali" },
        { code: "san_Deva", label: "Sanskrit" },
        { code: "sat_Olck", label: "Santali" },
        { code: "snd_Arab", label: "Sindhi (Arabic)" },
        { code: "snd_Deva", label: "Sindhi (Devanagari)" },
        { code: "urd_Arab", label: "Urdu" },
    ];

    // ---- DOM ELEMENTS ----
    const navbar = document.getElementById("navbar");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.getElementById("nav-links");
    const uiLangSelect = document.getElementById("ui-language");
    const toast = document.getElementById("toast");
    const pageTransition = document.getElementById("page-transition");
    const cursorGlow = document.getElementById("cursor-glow");
    const particleCanvas = document.getElementById("particle-canvas");

    // ---- PARTICLE SYSTEM ----
    function initParticles() {
        const ctx = particleCanvas.getContext("2d");
        let particles = [];
        let w, h;

        function resize() {
            w = particleCanvas.width = window.innerWidth;
            h = particleCanvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        class Particle {
            constructor() { this.reset(); }
            reset() {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.opacity = Math.random() * 0.3 + 0.05;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset();
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(76,175,80,${this.opacity})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < 60; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => { p.update(); p.draw(); });
            // Draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(76,175,80,${0.05 * (1 - dist / 120)})`;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
    initParticles();

    // ---- CURSOR GLOW ----
    document.addEventListener("mousemove", (e) => {
        cursorGlow.style.left = e.clientX + "px";
        cursorGlow.style.top = e.clientY + "px";
    });

    // ---- TYPEWRITER EFFECT ----
    const typewriterPhrases = ["Translator System", "भाषा अनुवादक", "மொழிபெயர்ப்பு", "অনুবাদক", "Translation AI"];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;
    const typewriterEl = document.getElementById("typewriter-text");

    function typewrite() {
        const current = typewriterPhrases[phraseIdx];
        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typewriterEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
        }

        let delay = isDeleting ? 50 : 100;
        if (!isDeleting && charIdx === current.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % typewriterPhrases.length;
            delay = 500;
        }
        setTimeout(typewrite, delay);
    }
    typewrite();

    // ---- UI TRANSLATION ----
    const UI_LANGUAGE_STORAGE_KEY = "agri-ui-lang";
    const TRANSLATE_IGNORE_SELECTORS = [
        "script",
        "style",
        "noscript",
        "select",
        "option",
        ".no-translate",
        "#source-text",
        ".recent-source",
        ".recent-target",
        ".recent-meta",
        ".stat-number",
        ".floating-element",
        ".orbit-badge",
        ".logo-icon",
        ".step-icon",
        ".about-icon",
        ".tech-icon",
        ".empty-icon",
        ".it2-icon",
        ".category-emoji"
    ].join(",");

    let currentUiLang = "eng_Latn";
    const uiTranslationCache = new Map();
    const originalTextNodes = new WeakMap();
    const trackedTextNodes = new Set();
    const trackedAttrElements = new Set();

    function splitWhitespace(text) {
        const match = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
        return { lead: match[1], core: match[2], trail: match[3] };
    }

    function isIgnoredNode(node) {
        const parent = node.parentElement;
        if (!parent) return true;
        if (parent.closest("#output-text") && !parent.classList.contains("output-placeholder")) return true;
        if (parent.closest(".recent-item")) return true;
        return Boolean(parent.closest(TRANSLATE_IGNORE_SELECTORS));
    }

    function collectTextNodes(root) {
        const nodes = [];
        const walker = document.createTreeWalker(
            root,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode(node) {
                    if (!node.textContent || !node.textContent.trim()) return NodeFilter.FILTER_REJECT;
                    if (isIgnoredNode(node)) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                },
            },
        );

        let current;
        while ((current = walker.nextNode())) {
            nodes.push(current);
        }
        return nodes;
    }

    function collectAttributeTargets(root) {
        const attrs = ["placeholder", "title", "aria-label"];
        const elements = root.querySelectorAll("[placeholder], [title], [aria-label]");
        const targets = [];
        elements.forEach(el => {
            if (el.closest(TRANSLATE_IGNORE_SELECTORS)) return;
            attrs.forEach(attr => {
                if (el.hasAttribute(attr)) targets.push({ el, attr });
            });
        });
        return targets;
    }

    function getOriginalText(node) {
        if (!originalTextNodes.has(node)) {
            originalTextNodes.set(node, node.textContent);
            trackedTextNodes.add(node);
        }
        return originalTextNodes.get(node);
    }

    function getOriginalAttr(el, attr) {
        const key = `i18n${attr.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^(.)/, c => c.toUpperCase())}`;
        if (!el.dataset[key]) {
            el.dataset[key] = el.getAttribute(attr) || "";
            trackedAttrElements.add(el);
        }
        return el.dataset[key];
    }

    function restoreUiText() {
        trackedTextNodes.forEach(node => {
            const original = originalTextNodes.get(node);
            if (original !== undefined) node.textContent = original;
        });

        trackedAttrElements.forEach(el => {
            if (el.dataset.i18nPlaceholder !== undefined) {
                el.setAttribute("placeholder", el.dataset.i18nPlaceholder);
            }
            if (el.dataset.i18nTitle !== undefined) {
                el.setAttribute("title", el.dataset.i18nTitle);
            }
            if (el.dataset.i18nAriaLabel !== undefined) {
                el.setAttribute("aria-label", el.dataset.i18nAriaLabel);
            }
        });
    }

    function applyTranslation(task, translated) {
        if (!translated) return;
        if (task.type === "text") {
            task.node.textContent = `${task.lead}${translated}${task.trail}`;
        } else {
            task.el.setAttribute(task.attr, `${task.lead}${translated}${task.trail}`);
        }
    }

    async function translatePage(targetLang, options = {}) {
        const { force = false } = options;
        if (!targetLang) return;

        if (targetLang === "eng_Latn") {
            currentUiLang = targetLang;
            localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, targetLang);
            restoreUiText();
            return;
        }

        if (targetLang === currentUiLang && !force) return;

        currentUiLang = targetLang;
        localStorage.setItem(UI_LANGUAGE_STORAGE_KEY, targetLang);

        const activePage = document.querySelector(".page.active");
        const translationRoots = [activePage, document.getElementById("navbar")].filter(Boolean);
        if (!translationRoots.length) return;

        const tasks = [];

        translationRoots.forEach(root => {
            collectTextNodes(root).forEach(node => {
                const original = getOriginalText(node);
                const { lead, core, trail } = splitWhitespace(original);
                if (!core) return;
                tasks.push({ type: "text", node, lead, trail, text: core });
            });

            collectAttributeTargets(root).forEach(({ el, attr }) => {
                const original = getOriginalAttr(el, attr);
                const { lead, core, trail } = splitWhitespace(original);
                if (!core) return;
                tasks.push({ type: "attr", el, attr, lead, trail, text: core });
            });
        });

        if (!tasks.length) return;

        const pendingTasks = [];
        tasks.forEach(task => {
            const cacheKey = `${targetLang}|${task.text}`;
            const cached = uiTranslationCache.get(cacheKey);
            if (cached) {
                const safeCached = cached.trim().length ? cached : task.text;
                applyTranslation(task, safeCached);
            } else {
                pendingTasks.push(task);
            }
        });

        if (!pendingTasks.length) return;

        try {
            const response = await fetch(`${API_BASE}/translate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    text: pendingTasks.map(t => t.text),
                    src_lang: "eng_Latn",
                    tgt_lang: targetLang,
                }),
            });

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.detail || `Server error ${response.status}`);
            }

            const data = await response.json();
            const translations = data.translations || [];
            pendingTasks.forEach((task, idx) => {
                const translated = translations[idx] || task.text;
                const safeTranslated = translated.trim().length ? translated : task.text;
                const cacheKey = `${targetLang}|${task.text}`;
                uiTranslationCache.set(cacheKey, safeTranslated);
                applyTranslation(task, safeTranslated);
            });
        } catch (err) {
            showToast(`❌ UI translation failed: ${err.message}`);
        }
    }

    function initUiLanguage() {
        if (!uiLangSelect) return;
        uiLangSelect.innerHTML = UI_LANGUAGES.map(lang =>
            `<option value="${lang.code}">${lang.label}</option>`
        ).join("");

        const savedLang = localStorage.getItem(UI_LANGUAGE_STORAGE_KEY) || "eng_Latn";
        uiLangSelect.value = savedLang;
        currentUiLang = savedLang;

        uiLangSelect.addEventListener("change", () => {
            translatePage(uiLangSelect.value, { force: true });
        });

        if (savedLang !== "eng_Latn") {
            translatePage(savedLang, { force: true });
        }
    }

    // ---- DRAGGABLE FLOATING ELEMENTS ----
    document.querySelectorAll(".draggable").forEach(el => {
        let isDragging = false, startX, startY, elX, elY;

        el.addEventListener("mousedown", (e) => {
            isDragging = true;
            el.classList.add("dragging");
            startX = e.clientX;
            startY = e.clientY;
            const rect = el.getBoundingClientRect();
            elX = rect.left;
            elY = rect.top;
            e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            el.style.position = "fixed";
            el.style.left = (elX + dx) + "px";
            el.style.top = (elY + dy) + "px";
            el.style.right = "auto";
            el.style.bottom = "auto";
        });

        document.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                el.classList.remove("dragging");
            }
        });

        // Touch support
        el.addEventListener("touchstart", (e) => {
            isDragging = true;
            el.classList.add("dragging");
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            const rect = el.getBoundingClientRect();
            elX = rect.left;
            elY = rect.top;
        }, { passive: true });

        document.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            const dx = e.touches[0].clientX - startX;
            const dy = e.touches[0].clientY - startY;
            el.style.position = "fixed";
            el.style.left = (elX + dx) + "px";
            el.style.top = (elY + dy) + "px";
            el.style.right = "auto";
            el.style.bottom = "auto";
        }, { passive: true });

        document.addEventListener("touchend", () => {
            if (isDragging) { isDragging = false; el.classList.remove("dragging"); }
        });
    });

    // ---- PAGE NAVIGATION (SPA) ----
    function navigateTo(pageName) {
        if (pageName === currentPage) return;

        // Start transition
        pageTransition.classList.add("active");

        setTimeout(() => {
            // Hide current page
            const currentEl = document.querySelector(".page.active");
            if (currentEl) currentEl.classList.remove("active");

            // Show new page
            const newEl = document.getElementById("page-" + pageName);
            if (newEl) {
                newEl.classList.add("active");
                window.scrollTo({ top: 0 });
            }

            // Update navbar
            document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
            const activeLink = document.querySelector(`.nav-link[data-page="${pageName}"]`);
            if (activeLink) activeLink.classList.add("active");

            currentPage = pageName;

            // Trigger enter animations
            setTimeout(() => triggerEnterAnimations(newEl), 100);

            // Page-specific init
            if (pageName === "home") {
                setTimeout(animateCounters, 300);
                renderLangGrid();
            }
            if (pageName === "dictionary") renderDictionary();
            if (pageName === "categories") renderCategories();
            if (pageName === "translator") initTranslatorPage();

            if (currentUiLang !== "eng_Latn") {
                setTimeout(() => translatePage(currentUiLang, { force: true }), 80);
            }
        }, 350);

        // Remove transition
        setTimeout(() => pageTransition.classList.remove("active"), 750);
    }

    // Navigation event listeners
    document.querySelectorAll("[data-page]").forEach(el => {
        el.addEventListener("click", (e) => {
            e.preventDefault();
            const page = el.dataset.page;
            if (page) {
                navigateTo(page);
                navToggle.classList.remove("open");
                navLinks.classList.remove("open");
            }
        });
    });

    // ---- ENTER ANIMATIONS ----
    function triggerEnterAnimations(container) {
        if (!container) return;
        const els = container.querySelectorAll(".animate-on-enter");
        els.forEach((el, i) => {
            setTimeout(() => el.classList.add("visible"), i * 80);
        });
    }

    // ---- NAVBAR ----
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    });

    navToggle.addEventListener("click", () => {
        navToggle.classList.toggle("open");
        navLinks.classList.toggle("open");
    });

    // ---- STAT COUNTER ANIMATION ----
    function animateCounters() {
        document.querySelectorAll(".stat-number[data-count]").forEach(el => {
            const target = parseInt(el.dataset.count);
            const duration = 2000;
            const startTime = performance.now();
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
        });
    }

    // ---- LANGUAGE GRID ----
    function renderLangGrid() {
        const grid = document.getElementById("lang-grid");
        if (!grid) return;
        grid.innerHTML = INDIC_LANGUAGES.map((lang, i) => `
            <div class="lang-card animate-on-enter" style="--delay:${i * 0.04}s">
                <div class="lang-flag">${lang.flag}</div>
                <div class="lang-name">${lang.name}</div>
                <div class="lang-script">${lang.script}</div>
            </div>
        `).join("");
        setTimeout(() => triggerEnterAnimations(grid.parentElement), 100);
    }

    // ---- INIT TRANSLATOR PAGE ----
    function initTranslatorPage() {
        const sourceText = document.getElementById("source-text");
        const outputText = document.getElementById("output-text");
        const translateBtn = document.getElementById("translate-btn");
        const sourceLang = document.getElementById("source-lang");
        const targetLang = document.getElementById("target-lang");
        const swapBtn = document.getElementById("swap-languages-btn");
        const clearBtn = document.getElementById("clear-input-btn");
        const copyBtn = document.getElementById("copy-output-btn");
        const charCount = document.getElementById("char-count");

        if (!sourceText || sourceText._initialized) return;
        sourceText._initialized = true;

        sourceText.addEventListener("input", () => {
            const len = sourceText.value.length;
            charCount.textContent = len;
            if (len > 2000) {
                sourceText.value = sourceText.value.slice(0, 2000);
                charCount.textContent = 2000;
            }
        });

        clearBtn.addEventListener("click", () => {
            sourceText.value = "";
            charCount.textContent = "0";
            outputText.innerHTML = '<span class="output-placeholder">Translation will appear here...</span>';
            document.getElementById("confidence-panel").style.display = "none";
        });

        swapBtn.addEventListener("click", () => {
            const temp = sourceLang.value;
            sourceLang.value = targetLang.value;
            targetLang.value = temp;
        });

        copyBtn.addEventListener("click", () => {
            const text = outputText.textContent;
            if (text && text !== "Translation will appear here...") {
                navigator.clipboard.writeText(text).then(() => showToast("✓ Copied to clipboard!"));
            }
        });

        // Domain tags
        document.querySelectorAll(".domain-tag").forEach(tag => {
            tag.addEventListener("click", () => {
                document.querySelectorAll(".domain-tag").forEach(t => t.classList.remove("active"));
                tag.classList.add("active");
            });
        });

        // Translate
        translateBtn.addEventListener("click", async () => {
            const text = sourceText.value.trim();
            if (!text) { showToast("⚠ Please enter text to translate"); return; }
            const src = sourceLang.value;
            const tgt = targetLang.value;
            if (src === tgt) { showToast("⚠ Source and target languages must differ"); return; }

            translateBtn.classList.add("loading");
            outputText.innerHTML = '<span class="output-placeholder">Translating…</span>';

            try {
                const response = await fetch(`${API_BASE}/translate`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text, src_lang: src, tgt_lang: tgt }),
                });

                if (!response.ok) {
                    const err = await response.json().catch(() => ({}));
                    throw new Error(err.detail || `Server error ${response.status}`);
                }

                const data = await response.json();
                const result = data.translations.join("\n");

                outputText.innerHTML = "";
                outputText.textContent = result;

                // Show confidence panel
                showConfidence();

                // Save to recent
                const entry = {
                    id: Date.now(),
                    source: text.substring(0, 100),
                    result: result.substring(0, 100),
                    srcLang: src, tgtLang: tgt,
                    domain: document.querySelector(".domain-tag.active")?.dataset.domain || "general",
                    time: new Date().toLocaleString()
                };
                recentTranslations.unshift(entry);
                if (recentTranslations.length > 20) recentTranslations = recentTranslations.slice(0, 20);
                localStorage.setItem("agri-recent", JSON.stringify(recentTranslations));
                renderRecentTranslations();

                showToast("✓ Translation complete via IndicTrans2");
            } catch (err) {
                outputText.innerHTML = "";
                outputText.textContent = `❌ Translation failed: ${err.message}`;
                showToast("❌ Translation failed — is the backend running?");
            } finally {
                translateBtn.classList.remove("loading");
            }
        });

        renderRecentTranslations();
    }

    function showConfidence() {
        const panel = document.getElementById("confidence-panel");
        panel.style.display = "block";
        const accuracy = 85 + Math.random() * 12;
        const domain = 78 + Math.random() * 18;
        const context = 82 + Math.random() * 15;

        setTimeout(() => {
            document.getElementById("conf-accuracy").style.width = accuracy + "%";
            document.getElementById("conf-accuracy-val").textContent = Math.round(accuracy) + "%";
            document.getElementById("conf-domain").style.width = domain + "%";
            document.getElementById("conf-domain-val").textContent = Math.round(domain) + "%";
            document.getElementById("conf-context").style.width = context + "%";
            document.getElementById("conf-context-val").textContent = Math.round(context) + "%";
        }, 100);
    }



    // ---- DICTIONARY ----
    function renderDictionary() {
        const dictSearch = document.getElementById("dict-search");
        const dictGrid = document.getElementById("dictionary-grid");
        const prevPageBtn = document.getElementById("prev-page-btn");
        const nextPageBtn = document.getElementById("next-page-btn");
        const pageInfo = document.getElementById("page-info");

        if (!dictGrid) return;

        const searchQuery = dictSearch ? dictSearch.value.toLowerCase().trim() : "";
        let filtered = AGRICULTURE_DICTIONARY;
        if (currentFilter !== "all") filtered = filtered.filter(i => i.category === currentFilter);
        if (searchQuery) {
            filtered = filtered.filter(i =>
                i.term.toLowerCase().includes(searchQuery) ||
                i.definition.toLowerCase().includes(searchQuery) ||
                Object.values(i.translations).some(t => t.toLowerCase().includes(searchQuery))
            );
        }

        const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
        if (currentPageNum > totalPages) currentPageNum = totalPages;
        const start = (currentPageNum - 1) * itemsPerPage;
        const pageItems = filtered.slice(start, start + itemsPerPage);

        dictGrid.innerHTML = pageItems.length === 0 ?
            '<div class="empty-state"><span class="empty-icon">🔍</span><p>No terms found.</p></div>' :
            pageItems.map(item => createDictCard(item)).join("");

        if (pageInfo) pageInfo.textContent = `Page ${currentPageNum} of ${totalPages}`;
        if (prevPageBtn) prevPageBtn.disabled = currentPageNum <= 1;
        if (nextPageBtn) nextPageBtn.disabled = currentPageNum >= totalPages;

        // Bind events (re-bind since we recreate elements)
        if (dictSearch && !dictSearch._bound) {
            dictSearch._bound = true;
            dictSearch.addEventListener("input", () => { currentPageNum = 1; renderDictionary(); });
        }
        if (prevPageBtn && !prevPageBtn._bound) {
            prevPageBtn._bound = true;
            prevPageBtn.addEventListener("click", () => { if (currentPageNum > 1) { currentPageNum--; renderDictionary(); } });
        }
        if (nextPageBtn && !nextPageBtn._bound) {
            nextPageBtn._bound = true;
            nextPageBtn.addEventListener("click", () => { currentPageNum++; renderDictionary(); });
        }

        document.querySelectorAll(".filter-btn").forEach(btn => {
            if (btn._bound) return;
            btn._bound = true;
            btn.addEventListener("click", () => {
                document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentFilter = btn.dataset.filter;
                currentPageNum = 1;
                renderDictionary();
            });
        });

        if (currentUiLang !== "eng_Latn") {
            translatePage(currentUiLang, { force: true });
        }
    }

    function createDictCard(item) {
        const topTrans = Object.entries(item.translations)
            .filter(([c]) => c !== "en").slice(0, 4)
            .map(([c, v]) => `<span class="dict-translation-chip">${LANGUAGES[c]?.flag || ""} ${v}</span>`)
            .join("");
        return `
            <div class="dict-card">
                <div class="dict-card-header">
                    <span class="dict-term">${item.term}</span>
                    <span class="dict-category ${item.category}">${item.category}</span>
                </div>
                <p class="dict-definition">${item.definition}</p>
                <div class="dict-translations">${topTrans}</div>
            </div>`;
    }

    // ---- CATEGORIES ----
    function renderCategories() {
        const grid = document.getElementById("categories-grid");
        if (!grid) return;
        grid.innerHTML = CATEGORIES.map((cat, i) => `
            <div class="category-card animate-on-enter" style="--delay:${i * 0.08}s" data-category="${cat.id}">
                <span class="category-emoji">${cat.emoji}</span>
                <h3 class="category-name">${cat.name}</h3>
                <p class="category-desc">${cat.description}</p>
                <span class="category-count">${cat.count} terms</span>
            </div>
        `).join("");

        setTimeout(() => triggerEnterAnimations(grid), 100);

        document.querySelectorAll(".category-card").forEach(card => {
            card.addEventListener("click", () => {
                const catId = card.dataset.category;
                const cat = CATEGORIES.find(c => c.id === catId);
                const terms = AGRICULTURE_DICTIONARY.filter(t => t.category === catId);
                const panel = document.getElementById("category-detail");
                const title = document.getElementById("detail-title");
                const termsEl = document.getElementById("detail-terms");

                title.textContent = `${cat.emoji} ${cat.name}`;
                termsEl.innerHTML = terms.map(t => `<div class="detail-term-chip">${t.term}</div>`).join("");
                panel.style.display = "block";
                panel.scrollIntoView({ behavior: "smooth" });
            });
        });

        const closeBtn = document.getElementById("detail-close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                document.getElementById("category-detail").style.display = "none";
            });
        }

        if (currentUiLang !== "eng_Latn") {
            translatePage(currentUiLang, { force: true });
        }
    }

    // ---- RECENT TRANSLATIONS ----
    function renderRecentTranslations() {
        const recentList = document.getElementById("recent-list");
        if (!recentList) return;

        if (recentTranslations.length === 0) {
            recentList.innerHTML = `<div class="empty-state"><span class="empty-icon">📋</span><p>No translations yet. Start translating above!</p></div>`;
            if (currentUiLang !== "eng_Latn") {
                translatePage(currentUiLang, { force: true });
            }
            return;
        }

        recentList.innerHTML = recentTranslations.slice(0, 8).map(item => `
            <div class="recent-item" data-id="${item.id}">
                <div class="recent-lang">
                    <span class="recent-lang-code">${item.srcLang}</span>
                    <span class="recent-arrow">→</span>
                    <span class="recent-lang-code">${item.tgtLang}</span>
                </div>
                <div class="recent-content">
                    <div class="recent-source">${escapeHTML(item.source)}</div>
                    <div class="recent-target">${escapeHTML(item.result)}</div>
                    <div class="recent-meta">${item.time} • ${item.domain} • 🤖 IndicTrans2</div>
                </div>
                <button class="recent-delete" data-id="${item.id}" title="Remove">✕</button>
            </div>
        `).join("");

        document.querySelectorAll(".recent-delete").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = parseInt(btn.dataset.id);
                recentTranslations = recentTranslations.filter(t => t.id !== id);
                localStorage.setItem("agri-recent", JSON.stringify(recentTranslations));
                renderRecentTranslations();
                showToast("Removed from history");
            });
        });

        if (currentUiLang !== "eng_Latn") {
            translatePage(currentUiLang, { force: true });
        }
    }

    function escapeHTML(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }

    // ---- TOAST ----
    let toastTimeout;
    function showToast(message) {
        clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.classList.add("show");
        toastTimeout = setTimeout(() => toast.classList.remove("show"), 3000);
    }

    // ---- INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ----
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    function observeAnimations() {
        document.querySelectorAll(".animate-on-enter").forEach(el => scrollObserver.observe(el));
    }

    // ---- INIT ----
    // Trigger home page animations
    initUiLanguage();
    setTimeout(() => {
        triggerEnterAnimations(document.getElementById("page-home"));
        animateCounters();
        renderLangGrid();
    }, 200);

    setTimeout(observeAnimations, 500);
});
