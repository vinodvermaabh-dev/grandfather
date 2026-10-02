// Sample Wholesale Inventory Data
    const DEFAULT_CATALOG = [
      // 1. Grandfather (GF)
      { id: '101', category: 'GRANDFATHER (GF)', name: 'GF. / RM. 8I / RM 9I / RM 9 PRO UNI. H1A36', quality: 'Grandfather OG', price: 845 },
      { id: '102', category: 'GRANDFATHER (GF)', name: 'GF. / RM. 8 / 8 PRO 4G', quality: 'AMOLED', price: 1950 },

      // 2. Crown Combo
      { id: '12', category: 'CROWN COMBO', name: 'Vivo Y20 / Y12s Crown', quality: 'Crown Original IC', price: 680 },
      { id: '15', category: 'CROWN COMBO', name: 'Oppo A15 / A15s Crown', quality: 'Diamond Original', price: 650 },

      // 3. Professor & Sony (Combined)
      { id: '301', category: 'PROFESSOR & SONY', name: 'Professor MI Note 10 Pro', quality: 'Professor OG', price: 1450 },
      { id: '302', category: 'PROFESSOR & SONY', name: 'Sony Xperia 1 / 5 High Bright', quality: 'Sony Grade A', price: 2850 },

      // 4. DD OLED (Strictly Separate)
      { id: '7', category: 'DD OLED', name: 'Samsung M31 / M21 DD OLED', quality: 'DD OLED Frame', price: 1250 },

      // 5. OLED (Strictly Separate)
      { id: '8', category: 'OLED', name: 'Samsung A51 / A50 OLED', quality: 'OLED (Fingerprint OK)', price: 1350 },
      { id: '9', category: 'OLED', name: 'Samsung A52 / A52s Super AMOLED', quality: 'Super AMOLED 90Hz', price: 2350 },
      { id: '14', category: 'OLED', name: 'Vivo V27 / V29 Curved 3D', quality: 'Curved 3D 120Hz', price: 5400 },

      // 6. iPhone Models
      { id: '1', category: 'IPHONE MODELS', name: 'iPhone 11', quality: 'Incell LCD', price: 1150 },
      { id: '2', category: 'IPHONE MODELS', name: 'iPhone 11 Pro', quality: 'Hard OLED', price: 1850 },
      { id: '3', category: 'IPHONE MODELS', name: 'iPhone 12 / 12 Pro', quality: 'Soft OLED', price: 2450 },
      { id: '4', category: 'IPHONE MODELS', name: 'iPhone 13', quality: 'Soft OLED Premium', price: 3100 },
      { id: '5', category: 'IPHONE MODELS', name: 'iPhone 13 Pro Max', quality: '120Hz 1:1 OLED', price: 7800 },
      { id: '6', category: 'IPHONE MODELS', name: 'iPhone 14 Pro', quality: 'Original Pulled', price: 9500 },

      // 7. Nexoo
      { id: '601', category: 'NEXOO', name: 'Nexoo Realme C35 / Narzo 50A Prime', quality: 'Nexoo High-Grade', price: 790 },
      { id: '602', category: 'NEXOO', name: 'Nexoo Vivo Y21 / Y21G / Y33s', quality: 'Nexoo IC', price: 720 },

      // 8. Navi HD+
      { id: '701', category: 'NAVI HD+', name: 'Navi HD+ Redmi 9A / 9C / 10A', quality: 'HD+ Color', price: 690 },
      { id: '702', category: 'NAVI HD+', name: 'Navi HD+ Oppo A53 / A33', quality: 'HD+ Bright', price: 740 },

      // 9. Care Original (Care OG)
      { id: '20', category: 'CARE ORIGINAL (OG)', name: 'Mi. 9 Power / Poco M3 Care OG', quality: 'Care OG', price: 820 },
      { id: '21', category: 'CARE ORIGINAL (OG)', name: 'Redmi Note 7 / Note 7 Pro Care OG', quality: 'FHD+ Care OG', price: 775 },
      { id: '10', category: 'CARE ORIGINAL (OG)', name: 'Samsung S20 FE Service Center OG', quality: 'Care OG', price: 3800 },

      // 10. 500+ Series
      { id: '901', category: '500+ SERIES', name: '500+ HIGH-BRI. / INF. X650 / HOT 8', quality: 'High-Bright', price: 630 },
      { id: '902', category: '500+ SERIES', name: '500+ HIGH-BRI. / MI 8A', quality: 'High-Bright', price: 725 },
      { id: '903', category: '500+ SERIES', name: '500+ HIGH-BRI. / MI NOTE 9 PRO', quality: 'High-Bright', price: 795 },

      // 11. SVC
      { id: '1001', category: 'SVC', name: 'SVC Realme 7 / 7 Pro Combo', quality: 'SVC Tested', price: 1650 },
      { id: '1002', category: 'SVC', name: 'SVC Vivo V20 SE Original', quality: 'SVC Tested', price: 1850 }
    ];

    const STRICT_CATEGORY_SEQUENCE = [
      'GRANDFATHER',
      'CROWN',
      'SONIC / PROF',
      'OLED',
      'DD / GX',
      'IPHONE',
      'NEXOO',
      'NAVEE HD+',
      'W/F CARE OG',
      'CARE OG',
      'CHINA OG',
      '500+',
      'SVC'
    ];

    function canonicalizeCategory(rawCat, itemName = '') {
      const c = String(rawCat || '').trim().toUpperCase();
      const n = String(itemName || '').trim().toUpperCase();
      const targetStr = (c && c !== 'GENERAL DISPLAYS' && c !== 'GENERAL' && c !== 'OTHER CATEGORIES') ? c : n;
      if (targetStr.includes('GRAND') || targetStr === 'GF' || targetStr.startsWith('GF') || targetStr.includes('WHITE BOX')) return 'GRANDFATHER';
      if (targetStr.includes('CROWN')) return 'CROWN';
      if (targetStr.includes('PROF') || targetStr.includes('SONIC') || targetStr.includes('SONY') || targetStr.includes('XPERIA')) return 'SONIC / PROF';
      if (targetStr.includes('DD') || targetStr.includes('DIDI') || /(^|[^A-Z0-9])GX([^A-Z0-9]|$)/.test(targetStr)) return 'DD / GX';
      if (targetStr.includes('OLED') || targetStr.includes('AMOLED') || targetStr.includes('CURVED')) return 'OLED';
      if (targetStr.includes('IPHONE') || targetStr.includes('APPLE') || targetStr.startsWith('IP ') || targetStr.startsWith('IP.')) return 'IPHONE';
      if (targetStr.includes('NEXOO') || targetStr.includes('NEXO')) return 'NEXOO';
      if (targetStr.includes('NAVEE') || targetStr.includes('NAVI') || targetStr.includes('NABI') || (targetStr.includes('HD+') && !targetStr.includes('GRANDFATHER'))) return 'NAVEE HD+';
      if (targetStr.includes('W/F') || targetStr.includes('W / F') || targetStr.includes('WITH FRAME') || targetStr.includes('WF CARE')) return 'W/F CARE OG';
      if (targetStr.includes('CHINA')) return 'CHINA OG';
      if (targetStr.includes('CARE') || targetStr.includes('ORIGINAL') || targetStr.includes('KE ROJI') || targetStr.includes('K ORIGINAL')) return 'CARE OG';
      if (targetStr.includes('500+') || targetStr.includes('500 ') || targetStr.includes('HIGH-BRI')) return '500+';
      if (targetStr.includes('SVC') || targetStr.includes('SERVICE')) return 'SVC';
      return rawCat ? rawCat.trim().toUpperCase() : 'OTHER CATEGORIES';
    }

    // Global App State
    window.appState = {
      items: [],
      cart: {}, // { itemId: quantity }
      tickedItemIds: new Set(),
      viewTickedOnly: false,
      selectedCategory: 'All',
      searchQuery: '',
      buyerDetails: {
        customerName: ''
      },
      stagedExcelItems: [],
      stagedExcelFile: null,
      activeSuggestionIndex: -1,
      currentSuggestions: []
    };
    function escapeHTML(value) {
      return String(value ?? '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
    }

    // Firebase bridge is initialized by the modular SDK block below.
    let cloudAvailable = false;

    function loadStorage() {
      const storedBuyer = localStorage.getItem('sh_wholesale_buyer');
      if (storedBuyer) {
        try {
          const parsed = JSON.parse(storedBuyer);
          window.appState.buyerDetails = {
            customerName: parsed.customerName || parsed.shopName || parsed.personName || ''
          };
          updateBuyerDisplay();
        } catch (e) {}
      }
    }

    async function initCatalogFromCloud() {
      const cached = localStorage.getItem('sh_wholesale_catalog');
      if (cached) { try { window.appState.items = JSON.parse(cached); } catch (e) {} }
      if (!window.firebaseReady) {
        window.appState.items = window.appState.items.length ? window.appState.items : [...DEFAULT_CATALOG];
        setSyncStatus('offline', 'Configure Firebase to enable live sync');
        return;
      }
      try { await window.firebaseReady; }
      catch (err) {
        console.warn('Firebase unavailable; using local catalog:', err);
        cloudAvailable = false;
        setSyncStatus('offline', 'Firebase unavailable — local data only');
        window.appState.items = window.appState.items.length ? window.appState.items : [...DEFAULT_CATALOG];
      }
    }

    // Persists the whole catalog to Firebase; the onValue listener synchronizes all clients.
    async function persistCatalog() {
      try {
        if (!window.firebaseSetCatalog) throw new Error('Firebase is not configured');
        await window.firebaseSetCatalog(window.appState.items);
        cloudAvailable = true;
      } catch (err) {
        console.error('Persist to cloud failed:', err);
        cloudAvailable = false;
        setSyncStatus('offline', 'Sync failed — changes saved locally');
        showToast('Cloud sync failed — changes are only saved locally', 'error');
      }
      try {
        localStorage.setItem('sh_wholesale_catalog', JSON.stringify(window.appState.items));
      } catch (e) {}
    }

    function setSyncStatus(state, label) {
      const el = document.getElementById('sync-status'); if (!el) return;
      const colors = { live: 'bg-emerald-400', connecting: 'bg-amber-400 animate-pulse', offline: 'bg-red-400' };
      el.innerHTML = `<span class="w-2 h-2 rounded-full ${colors[state] || colors.offline}"></span><span>${label}</span>`;
    }
    window.setSyncStatus = setSyncStatus;
    window.copySharedLink = async function() {
      try {
        if (navigator.share && /Android|iPhone|iPad/i.test(navigator.userAgent)) await navigator.share({ title: document.title, url: location.href });
        else { await navigator.clipboard.writeText(location.href); showToast('Shared link copied'); }
      } catch (err) { if (err.name !== 'AbortError') showToast('Could not copy link. Copy the address bar URL.', 'error'); }
    };

    window.addEventListener('DOMContentLoaded', () => {
      loadStorage();
      initCatalogFromCloud().then(() => {
        renderCategoryPills();
        renderCatalog();
        updateCartSummary();
        lucide.createIcons();
      });

      document.addEventListener('click', (e) => {
        const searchContainer = document.getElementById('search-container');
        if (searchContainer && !searchContainer.contains(e.target)) {
          hideDropdown();
        }
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('order-cart-backdrop').classList.contains('is-open')) closeOrderCart();
        if (e.key === 'Escape' && document.getElementById('rate-list-picker-backdrop').classList.contains('is-open')) closeRateListPicker();
      });
    });

    function showToast(msg, type = 'info') {
      const toast = document.getElementById('toast');
      const text = document.getElementById('toast-text');
      text.textContent = msg;
      
      if (type === 'error') {
        toast.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-red-900 border border-red-700 text-white text-xs font-semibold shadow-2xl transition-all duration-300';
      } else {
        toast.className = 'fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-xl bg-zinc-800 border border-purple-500/40 text-purple-300 text-xs font-semibold shadow-2xl transition-all duration-300';
      }

      toast.style.opacity = '1';
      setTimeout(() => {
        toast.style.opacity = '0';
      }, 2500);
    }

    function getCategories() {
      const prioritySet = new Set(STRICT_CATEGORY_SEQUENCE);
      const additionalCategories = [...new Set(
        window.appState.items.map(item => canonicalizeCategory(item.category, item.name))
          .filter(category => category && !prioritySet.has(category))
      )].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
      return ['All', ...STRICT_CATEGORY_SEQUENCE, ...additionalCategories];
    }

    function getRateListCategoryLabel(category) {
      const friendlyLabels = {
        All: 'All Mobile List',
        GRANDFATHER: "Grandfather's List",
        CROWN: 'Crown List',
        'SONIC / PROF': 'Sonic / Prof List',
        OLED: 'OLED List',
        'DD / GX': 'DD / GX List',
        IPHONE: 'iPhone List',
        NEXOO: 'Nexoo List',
        'NAVEE HD+': 'Navee HD+ List',
        'W/F CARE OG': 'W/F Care OG List',
        'CARE OG': 'Care OG List',
        'CHINA OG': 'China OG List',
        '500+': '500+ List',
        SVC: 'SVC List'
      };
      return friendlyLabels[category] || `${category} List`;
    }

    window.openRateListPicker = function() {
      const backdrop = document.getElementById('rate-list-picker-backdrop');
      const list = document.getElementById('rate-list-category-list');
      if (!backdrop || !list) return;
      list.innerHTML = getCategories().map((category, index) => {
        const label = getRateListCategoryLabel(category);
        const icon = category === 'All' ? 'layers-3' : 'package';
        return `<article class="rate-list-category-row flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3 sm:gap-4 sm:p-4">
          <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-purple-500/25 bg-purple-950/60 text-purple-300 sm:h-14 sm:w-14"><i data-lucide="${icon}" class="h-6 w-6 sm:h-7 sm:w-7"></i></span>
          <div class="min-w-0 flex-1"><h3 class="truncate text-base font-extrabold text-white sm:text-lg">${escapeHTML(label)}</h3><p class="mt-0.5 text-[10px] font-semibold tracking-wider text-zinc-500">${category === 'All' ? 'COMPLETE PRICE LIST' : 'CATEGORY PRICE LIST'}</p></div>
          <button type="button" data-category="${escapeHTML(category)}" onclick="downloadSelectedRateList(this)" class="flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-purple-600 px-3 text-xs font-bold text-white shadow-lg shadow-purple-950/30 transition hover:bg-purple-500 active:scale-[.98] sm:px-4"><i data-lucide="download" class="h-4 w-4"></i><span>Download PDF</span></button>
        </article>`;
      }).join('');
      backdrop.classList.add('is-open');
      backdrop.inert = false;
      backdrop.setAttribute('aria-hidden', 'false');
      document.body.classList.add('overflow-hidden');
      if (window.lucide) lucide.createIcons();
      document.getElementById('close-rate-list-picker')?.focus();
    };

    window.closeRateListPicker = function() {
      const backdrop = document.getElementById('rate-list-picker-backdrop');
      if (!backdrop) return;
      backdrop.classList.remove('is-open');
      backdrop.inert = true;
      backdrop.setAttribute('aria-hidden', 'true');
      if (!document.getElementById('order-cart-backdrop')?.classList.contains('is-open')) document.body.classList.remove('overflow-hidden');
    };

    window.downloadSelectedRateList = function(button) {
      const category = button?.dataset?.category;
      if (category) window.downloadRateListPDF(category);
    };

    function renderCategoryPills() {
      const container = document.getElementById('category-pills');
      const cats = getCategories();

      container.innerHTML = cats.map(cat => {
        const isActive = window.appState.selectedCategory === cat;
        const label = cat === 'All' ? 'ALL' : cat;
        return `
          <button 
            type="button"
            data-category="${escapeHTML(cat)}"
            onclick="setCategoryFromButton(this)"
            class="px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all active-scale ${
              isActive 
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/25 border border-purple-400/30' 
                : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
            }"
          >
            ${escapeHTML(label)}
          </button>
        `;
      }).join('');
    }

    window.setCategoryFromButton = function(button) {
      const category = button?.dataset?.category;
      if (category) window.setCategory(category);
    };

    window.setCategory = function(cat) {
      window.appState.selectedCategory = window.appState.selectedCategory === cat ? 'All' : cat;
      renderCategoryPills();
      renderCatalog();
    };

    /**
     * Brand & Wholesale industry alias normalizer
     */
    function normalizeWholesaleString(str) {
      if (!str) return '';
      return String(str)
        .toLowerCase()
        .replace(/\bgrand\s*father\b/g, 'gf ')
        .replace(/\breal\s*me\b/g, 'rm ')
        .replace(/\brealme\b/g, 'rm ')
        .replace(/\bredmi\b/g, 'mi ')
        .replace(/\bxiaomi\b/g, 'mi ')
        .replace(/\bone\s*plus\b/g, 'oneplus ')
        .replace(/\b1\+/g, 'oneplus ')
        .replace(/\+/g, ' plus ')
        .replace(/\biphone\b/g, 'ip ')
        .replace(/\bapple\b/g, 'ip ')
        .replace(/\bsamsung\b/g, 'sam ')
        .replace(/\bmotorola\b/g, 'mt ')
        .replace(/\bmoto\b/g, 'mt ')
        .replace(/\binfinix\b/g, 'inf ')
        .replace(/(\d+)\s+([a-z])\b/g, '$1$2 ')
        .replace(/([a-z]{3,})(\d+)/g, '$1 $2 ')
        .replace(/[^a-z0-9]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function cleanAndTokenize(str) {
      const norm = normalizeWholesaleString(str);
      return norm.split(' ').filter(Boolean);
    }

    function matchModelSmart(item, rawQuery) {
      if (!rawQuery) return true;
      const cleanQ = rawQuery.trim();
      if (!cleanQ) return true;

      const qNorm = normalizeWholesaleString(cleanQ);
      const qSpaceless = qNorm.replace(/\s+/g, '');

      const targetStr = `${item.name || ''} ${item.quality || ''} ${item.category || ''}`;
      const tNorm = normalizeWholesaleString(targetStr);
      const tSpaceless = tNorm.replace(/\s+/g, '');

      if (tSpaceless.includes(qSpaceless)) {
        const isModelCode = /^\d+[a-z]{1,3}$|^[a-z]{1,3}\d+$/i.test(cleanQ.replace(/[^a-z0-9]/g, ''));
        if (isModelCode) {
          const codeRegex = new RegExp('\\b' + cleanQ.replace(/[^a-z0-9]/g, '') + '\\b', 'i');
          if (codeRegex.test(tNorm)) return true;
        } else {
          return true;
        }
      }

      const qTokens = cleanAndTokenize(cleanQ);
      const tTokens = cleanAndTokenize(targetStr);

      if (qTokens.length === 0) return true;

      return qTokens.every(qTok => {
        const isPureNumber = /^\d+$/.test(qTok);

        if (isPureNumber) {
          return tTokens.some(tTok => {
            if (tTok === qTok) return true;
            return new RegExp('^' + qTok + '[a-z]{1,4}$', 'i').test(tTok);
          });
        }

        const isAlphanumericCode = /^\d+[a-z]{1,3}$/i.test(qTok);
        if (isAlphanumericCode) {
          return tTokens.some(tTok => tTok === qTok || tTok.startsWith(qTok));
        }

        return tTokens.some(tTok => tTok === qTok || tTok.startsWith(qTok));
      });
    }

    function getSearchScore(item, rawQuery) {
      if (!rawQuery) return 0;
      const q = rawQuery.trim();
      if (!q) return 0;

      const qNorm = normalizeWholesaleString(q);
      const qSpaceless = qNorm.replace(/\s+/g, '');

      const nameNorm = normalizeWholesaleString(item.name || '');
      const nameSpaceless = nameNorm.replace(/\s+/g, '');

      const fullNorm = normalizeWholesaleString(`${item.name || ''} ${item.quality || ''} ${item.category || ''}`);
      const fullSpaceless = fullNorm.replace(/\s+/g, '');

      let score = 0;

      if (nameSpaceless === qSpaceless) {
        score += 1000;
      } else if (nameNorm.split(' ').includes(qNorm)) {
        score += 800;
      } else if (nameSpaceless.includes(qSpaceless)) {
        score += 500;
      } else if (fullSpaceless.includes(qSpaceless)) {
        score += 300;
      }

      const qTokens = cleanAndTokenize(q);
      const tTokens = cleanAndTokenize(fullNorm);

      qTokens.forEach(qt => {
        if (tTokens.includes(qt)) {
          score += 150;
        } else if (tTokens.some(tt => tt.startsWith(qt))) {
          score += 50;
        }
      });

      return score;
    }

    window.handleSearchInput = function(val) {
      window.appState.searchQuery = val;
      const cleanVal = val.trim();
      document.getElementById('clear-search-btn').classList.toggle('hidden', cleanVal.length === 0);

      if (cleanVal.length > 0 && window.appState.viewTickedOnly) {
        window.appState.viewTickedOnly = false;
        updateTickedUI();
      }

      renderCatalog();
      updateSearchDropdown(cleanVal);
    };

    window.handleSearchFocus = function() {
      const val = document.getElementById('search-input').value.trim();
      if (val.length > 0) {
        updateSearchDropdown(val);
      }
    };

    function updateSearchDropdown(query) {
      const dropdown = document.getElementById('search-suggestions-dropdown');
      if (!query || query.length < 1) {
        hideDropdown();
        return;
      }

      const { items, tickedItemIds } = window.appState;

      const matched = items
        .filter(it => matchModelSmart(it, query))
        .map(it => ({ item: it, score: getSearchScore(it, query) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map(s => s.item);

      window.appState.currentSuggestions = matched;
      window.appState.activeSuggestionIndex = -1;

      if (matched.length === 0) {
        dropdown.innerHTML = `
          <div class="px-4 py-3 text-xs text-zinc-500 text-center">
            No display match found for "<span class="text-zinc-300 font-semibold">${escapeHTML(query)}</span>"
          </div>
        `;
        dropdown.classList.remove('hidden');
        return;
      }

      dropdown.innerHTML = matched.map((item, idx) => {
        const isTicked = tickedItemIds.has(item.id);
        return `
          <div 
            id="suggestion-item-${idx}"
            data-item-id="${escapeHTML(item.id)}"
            onclick="selectModelFromDropdown(this.dataset.itemId, event)"
            class="px-3.5 py-2.5 flex items-center justify-between gap-3 hover:bg-zinc-800/80 transition-colors cursor-pointer ${isTicked ? 'bg-purple-950/30' : ''}"
          >
            <!-- Left side: Checkbox (Strictly Tick Only) -->
            <button 
              type="button" 
              data-item-id="${escapeHTML(item.id)}"
              onclick="toggleTickItem(this.dataset.itemId, event)"
              class="w-5 h-5 rounded-md flex items-center justify-center transition-all shrink-0 active-scale ${
                isTicked 
                  ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white border border-purple-400 shadow-sm shadow-purple-500/30' 
                  : 'bg-zinc-800 border border-zinc-700 text-transparent hover:border-purple-500/50'
              }"
              title="Tick to select model"
            >
              <i data-lucide="check" class="w-3.5 h-3.5 stroke-[3] ${isTicked ? 'text-white' : 'opacity-0'}"></i>
            </button>

            <!-- Middle: Click on Model to open full model in catalog -->
            <div class="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
              <span class="text-xs font-semibold text-white tracking-tight break-words hover:text-purple-300 transition-colors">${escapeHTML(item.name).toUpperCase()}</span>
              ${item.quality ? `
                <span class="shrink-0 text-[10px] leading-tight font-medium text-amber-300 bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-500/30">
                  ${escapeHTML(item.quality).toUpperCase()}
                </span>
              ` : ''}
              <span class="text-[10px] text-zinc-500 shrink-0 hidden sm:inline">[${escapeHTML(canonicalizeCategory(item.category, item.name))}]</span>
            </div>

            <!-- Right side: Wholesale Price -->
            <div class="shrink-0 text-xs font-mono font-bold text-amber-400">
              ₹${Number(item.price).toLocaleString('en-IN')}
            </div>
          </div>
        `;
      }).join('');

      dropdown.classList.remove('hidden');
      lucide.createIcons();
    }

    window.toggleTickItem = function(id, e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }

      const { tickedItemIds } = window.appState;
      if (tickedItemIds.has(id)) {
        tickedItemIds.delete(id);
        showToast('Mark removed');
      } else {
        tickedItemIds.add(id);
        showToast('Model marked');
      }

      updateTickedUI();
      renderCatalog();

      const query = document.getElementById('search-input').value.trim();
      if (query.length > 0) {
        updateSearchDropdown(query);
      }
    };

    window.removeTickedItem = function(id, e) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }

      window.appState.tickedItemIds.delete(id);
      updateTickedUI();
      renderCatalog();
      showToast('Model unmarked / deleted from list');

      const query = document.getElementById('search-input').value.trim();
      if (query.length > 0) {
        updateSearchDropdown(query);
      }
    };

    window.selectModelFromDropdown = function(id, e) {
      if (e) {
        e.stopPropagation();
      }

      const item = window.appState.items.find(i => i.id === id);
      if (!item) return;

      const searchInput = document.getElementById('search-input');
      // Keep the selected model filter in app state while leaving the search box blank.
      // Assigning .value directly does not dispatch an input event.
      searchInput.value = '';
      window.appState.searchQuery = item.name;
      document.getElementById('clear-search-btn').classList.add('hidden');

      window.appState.selectedCategory = 'All';
      window.appState.viewTickedOnly = false;
      renderCategoryPills();
      renderCatalog();
      hideDropdown();
      hideDropdown();

      setTimeout(() => {
        const targetCard = document.getElementById(`item-card-${item.id}`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetCard.classList.add('item-highlight-pulse', 'border-purple-400');
          setTimeout(() => {
            targetCard.classList.remove('item-highlight-pulse', 'border-purple-400');
          }, 2500);
        }
      }, 100);
    };

    function updateTickedUI() {
      const count = window.appState.tickedItemIds.size;
      const bar = document.getElementById('ticked-action-bar');
      const countEl = document.getElementById('ticked-count-badge');
      const okBtnText = document.getElementById('btn-ok-text');

      if (count > 0) {
        bar.classList.remove('hidden');
        countEl.textContent = count;
        if (window.appState.viewTickedOnly) {
          okBtnText.textContent = 'Show All Models';
        } else {
          okBtnText.textContent = `OK (Show ${count} Ticked)`;
        }
      } else {
        bar.classList.add('hidden');
        window.appState.viewTickedOnly = false;
      }
    }

    window.toggleViewTickedOnly = function() {
      window.appState.viewTickedOnly = !window.appState.viewTickedOnly;
      if (window.appState.viewTickedOnly) {
        window.appState.searchQuery = '';
        document.getElementById('search-input').value = '';
        document.getElementById('clear-search-btn').classList.add('hidden');
        hideDropdown();
      }
      updateTickedUI();
      renderCatalog();
    };

    window.clearAllTicks = function() {
      window.appState.tickedItemIds.clear();
      window.appState.viewTickedOnly = false;
      updateTickedUI();
      renderCatalog();
      showToast('Ticked models cleared');
    };

    function hideDropdown() {
      const dropdown = document.getElementById('search-suggestions-dropdown');
      dropdown.classList.add('hidden');
      window.appState.activeSuggestionIndex = -1;
      window.appState.currentSuggestions = [];
    }

    window.selectSuggestionItem = function(index) {
      const suggestions = window.appState.currentSuggestions;
      if (!suggestions || !suggestions[index]) return;
      window.selectModelFromDropdown(suggestions[index].id);
    };

    window.handleSearchKeydown = function(e) {
      const suggestions = window.appState.currentSuggestions;
      const dropdown = document.getElementById('search-suggestions-dropdown');

      if (e.key === 'Escape') {
        hideDropdown();
        return;
      }

      if (dropdown.classList.contains('hidden') || !suggestions || suggestions.length === 0) {
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        window.appState.activeSuggestionIndex = Math.min(
          window.appState.activeSuggestionIndex + 1,
          suggestions.length - 1
        );
        updateActiveSuggestionUI();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        window.appState.activeSuggestionIndex = Math.max(
          window.appState.activeSuggestionIndex - 1,
          0
        );
        updateActiveSuggestionUI();
      } else if (e.key === ' ' || e.code === 'Space') {
        if (window.appState.activeSuggestionIndex >= 0) {
          e.preventDefault();
          const targetItem = suggestions[window.appState.activeSuggestionIndex];
          if (targetItem) {
            window.toggleTickItem(targetItem.id);

              const searchInput = document.getElementById('search-input');
              searchInput.value = '';
              window.appState.searchQuery = '';
              document.getElementById('clear-search-btn').classList.add('hidden');
              hideDropdown();
              renderCatalog();
              searchInput.focus();
              showToast(`✓ Marked: ${targetItem.name}`);
          }
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const activeIdx = window.appState.activeSuggestionIndex >= 0 
          ? window.appState.activeSuggestionIndex 
          : 0;
        selectSuggestionItem(activeIdx);
      }
    };

    function updateActiveSuggestionUI() {
      const suggestions = window.appState.currentSuggestions;
      suggestions.forEach((_, idx) => {
        const el = document.getElementById(`suggestion-item-${idx}`);
        if (!el) return;
        if (idx === window.appState.activeSuggestionIndex) {
          el.classList.add('bg-zinc-800', 'ring-1', 'ring-purple-500/50');
          el.scrollIntoView({ block: 'nearest' });
        } else {
          el.classList.remove('bg-zinc-800', 'ring-1', 'ring-purple-500/50');
        }
      });
    }

    window.clearSearch = function() {
      const input = document.getElementById('search-input');
      input.value = '';
      window.handleSearchInput('');
      hideDropdown();
      input.focus();
    };

    window.resetFilters = function() {
      window.appState.selectedCategory = 'All';
      window.appState.searchQuery = '';
      window.appState.viewTickedOnly = false;
      document.getElementById('search-input').value = '';
      document.getElementById('clear-search-btn').classList.add('hidden');
      hideDropdown();
      updateTickedUI();
      renderCategoryPills();
      renderCatalog();
    };

    function renderCatalog() {
      const grid = document.getElementById('items-grid');
      const empty = document.getElementById('empty-state');
      const countEl = document.getElementById('items-count');

      const { selectedCategory, searchQuery, items, cart, tickedItemIds, viewTickedOnly } = window.appState;
      const cleanQ = searchQuery.trim();

      let filtered = items.filter(it => {
        if (viewTickedOnly && !cleanQ) {
          return tickedItemIds.has(it.id);
        }
        const itemCat = canonicalizeCategory(it.category, it.name);
        const matchesCat = selectedCategory === 'All' || itemCat === selectedCategory;
        const matchesQuery = matchModelSmart(it, cleanQ);
        return matchesCat && matchesQuery;
      });

      const categoryOrder = new Map(getCategories().map((category, index) => [category, index]));
      filtered.sort((a, b) => {
        const catA = canonicalizeCategory(a.category, a.name);
        const catB = canonicalizeCategory(b.category, b.name);
        const orderA = categoryOrder.get(catA) ?? Number.MAX_SAFE_INTEGER;
        const orderB = categoryOrder.get(catB) ?? Number.MAX_SAFE_INTEGER;
        if (orderA !== orderB) return orderA - orderB;
        if (cleanQ) {
          const scoreDiff = getSearchScore(b, cleanQ) - getSearchScore(a, cleanQ);
          if (scoreDiff) return scoreDiff;
        }
        return (a.name || '').localeCompare(b.name || '');
      });

      countEl.textContent = filtered.length;

      if (filtered.length === 0) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
        return;
      }

      empty.classList.add('hidden');

      grid.innerHTML = filtered.map((item, index) => {
        const qty = cart[item.id] || 0;
        const isSelected = qty > 0;
        const isTicked = tickedItemIds.has(item.id);
        const category = canonicalizeCategory(item.category, item.name);
        const previousCategory = index ? canonicalizeCategory(filtered[index - 1].category, filtered[index - 1].name) : '';
        const sectionHeading = category !== previousCategory
          ? `<div class="col-span-full mt-4 mb-1 px-1 first:mt-0"><h2 class="text-[11px] sm:text-xs font-extrabold tracking-[0.16em] text-purple-200">${escapeHTML(category)}</h2><div class="mt-1 h-px bg-gradient-to-r from-purple-500/50 via-zinc-800 to-transparent"></div></div>`
          : '';

        return `
          ${sectionHeading}
          <div id="item-card-${escapeHTML(item.id)}" class="min-h-[46px] px-2.5 sm:px-3 py-2 rounded-xl bg-zinc-900/90 border ${
            isTicked
              ? 'border-purple-500/80 bg-purple-950/40 ring-1 ring-purple-500/40'
              : isSelected 
                ? 'border-purple-500/70 bg-purple-950/30 ring-1 ring-purple-500/30' 
                : 'border-zinc-800/80 hover:border-purple-900/50'
          } flex items-center justify-between gap-2 sm:gap-3 transition-all">
            
            <!-- Left: Delete/Untick Trash Button (when ticked) + Model Name & Badge -->
            <div class="flex items-center gap-2 min-w-0 flex-1">
              ${isTicked ? `
                <button 
                  type="button" 
                  data-item-id="${escapeHTML(item.id)}"
                  onclick="removeTickedItem(this.dataset.itemId, event)"
                  class="w-7 h-7 rounded-lg bg-red-500/15 hover:bg-red-500/30 text-red-400 hover:text-red-300 border border-red-500/30 flex items-center justify-center active-scale shrink-0 transition-all shadow-sm" 
                  title="Remove this model from ticked list"
                >
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              ` : ''}

              <div class="flex items-center gap-1.5 flex-wrap min-w-0 flex-1">
                <span class="text-xs sm:text-sm font-semibold text-white break-words leading-tight">
                  ${escapeHTML(item.name).toUpperCase()}
                </span>
                ${item.quality ? `
                  <span class="shrink-0 text-[10px] leading-tight font-semibold text-amber-300 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                    ${escapeHTML(item.quality).toUpperCase()}
                  </span>
                ` : ''}
              </div>
            </div>

            <!-- Middle: Clean Bold Price -->
            <div class="shrink-0 font-mono font-bold text-xs sm:text-sm text-amber-400 px-1 whitespace-nowrap">
              ₹${Number(item.price).toLocaleString('en-IN')}
            </div>

            <!-- Right: Stepper -->
            <div class="shrink-0 flex items-center gap-0.5 bg-zinc-950 p-0.5 rounded-lg border border-purple-950/60">
              <button 
                id="btn-minus-${escapeHTML(item.id)}"
                type="button"
                data-item-id="${escapeHTML(item.id)}"
                onclick="updateItemQty(this.dataset.itemId, -1)"
                class="w-6 h-6 rounded bg-zinc-800/90 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center font-bold active-scale disabled:opacity-20 transition-colors"
                ${qty === 0 ? 'disabled' : ''}
              >
                <i data-lucide="minus" class="w-3 h-3"></i>
              </button>

              <input 
                type="number"
                id="qty-input-${escapeHTML(item.id)}"
                data-item-id="${escapeHTML(item.id)}"
                min="0"
                max="9999"
                value="${qty}"
                oninput="handleQtyInput(this.dataset.itemId, this.value)"
                onblur="handleQtyBlur(this.dataset.itemId, this)"
                onfocus="this.select()"
                onkeydown="if(['e','E','+','-','.'].includes(event.key)) event.preventDefault(); if(event.key === 'Enter') this.blur();"
                class="w-9 sm:w-11 h-6 bg-transparent text-center font-mono font-bold text-xs ${qty > 0 ? 'text-purple-300' : 'text-zinc-500'} focus:text-purple-300 focus:outline-none focus:bg-zinc-900 rounded transition-colors"
              />

              <button 
                type="button"
                data-item-id="${escapeHTML(item.id)}"
                onclick="updateItemQty(this.dataset.itemId, 1)"
                class="w-6 h-6 rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white flex items-center justify-center font-bold active-scale transition-colors shadow-sm"
              >
                <i data-lucide="plus" class="w-3 h-3"></i>
              </button>
            </div>

          </div>
        `;
      }).join('');

      lucide.createIcons();
    }

    window.updateItemQty = function(id, delta) {
      const current = window.appState.cart[id] || 0;
      const next = Math.max(0, current + delta);
      setItemQty(id, next);
    };

    window.handleQtyInput = function(id, val) {
      if (val === '') {
        delete window.appState.cart[id];
        updateItemCardVisual(id, 0);
        updateCartSummary();
        return;
      }
      let q = parseInt(val, 10);
      if (isNaN(q) || q < 0) q = 0;
      if (q > 9999) q = 9999;
      
      if (q === 0) {
        delete window.appState.cart[id];
      } else {
        window.appState.cart[id] = q;
      }
      updateItemCardVisual(id, q);
      updateCartSummary();
    };

    window.handleQtyBlur = function(id, inputEl) {
      const q = window.appState.cart[id] || 0;
      inputEl.value = q;
      updateItemCardVisual(id, q);
      updateCartSummary();
    };

    function setItemQty(id, next) {
      if (next === 0) {
        delete window.appState.cart[id];
      } else {
        window.appState.cart[id] = next;
      }
      const inputEl = document.getElementById(`qty-input-${id}`);
      if (inputEl) {
        inputEl.value = next;
      }
      updateItemCardVisual(id, next);
      updateCartSummary();
    }

    function updateItemCardVisual(id, qty) {
      const card = document.getElementById(`item-card-${id}`);
      const minusBtn = document.getElementById(`btn-minus-${id}`);
      const inputEl = document.getElementById(`qty-input-${id}`);

      if (card) {
        if (qty > 0) {
          card.classList.add('border-purple-500/70', 'bg-purple-950/30', 'ring-1', 'ring-purple-500/30');
          card.classList.remove('border-zinc-800/80', 'bg-zinc-900/90');
        } else {
          card.classList.remove('border-purple-500/70', 'bg-purple-950/30', 'ring-1', 'ring-purple-500/30');
          card.classList.add('border-zinc-800/80', 'bg-zinc-900/90');
        }
      }

      if (minusBtn) {
        minusBtn.disabled = (qty <= 0);
      }

      if (inputEl) {
        if (qty > 0) {
          inputEl.classList.add('text-purple-300');
          inputEl.classList.remove('text-zinc-500');
        } else {
          inputEl.classList.remove('text-purple-300');
          inputEl.classList.add('text-zinc-500');
        }
      }
    }

    window.clearCart = function() {
      window.appState.cart = {};
      renderCatalog();
      updateCartSummary();
      showToast('Order cart reset');
    };

    function updateCartSummary() {
      const itemMap = new Map(window.appState.items.map(i => [i.id, i]));
      let totalPieces = 0;
      let grandTotal = 0;

      Object.entries(window.appState.cart).forEach(([id, qty]) => {
        if (qty > 0 && itemMap.has(id)) {
          const item = itemMap.get(id);
          totalPieces += qty;
          grandTotal += (Number(item.price) * qty);
        }
      });

      document.getElementById('cart-item-count').textContent = totalPieces;
      document.getElementById('cart-grand-total').textContent = `₹${grandTotal.toLocaleString('en-IN')}`;

      const waBtn = document.getElementById('whatsapp-order-btn');
      const pdfBtn = document.getElementById('pdf-order-btn');
      const clearBtn = document.getElementById('reset-cart-btn');

      const hasItems = totalPieces > 0;
      waBtn.disabled = !hasItems;
      pdfBtn.disabled = !hasItems;
      clearBtn.classList.toggle('hidden', !hasItems);
      const bottomCount = document.getElementById('bottom-cart-count');
      if (bottomCount) bottomCount.textContent = totalPieces > 99 ? '99+' : String(totalPieces);
      const bottomBar = document.getElementById('bottom-cart-bar');
      if (bottomBar) bottomBar.classList.toggle('hidden', !hasItems);
      document.body.classList.toggle('cart-bar-visible', hasItems);
      renderOrderCart(totalPieces, grandTotal);
    }

    function renderOrderCart(totalPieces, grandTotal) {
      const list = document.getElementById('order-cart-list');
      if (!list) return;
      const itemMap = new Map(window.appState.items.map(item => [String(item.id), item]));
      const selected = Object.entries(window.appState.cart)
        .filter(([id, qty]) => qty > 0 && itemMap.has(String(id)))
        .map(([id, qty]) => ({ id: String(id), qty, item: itemMap.get(String(id)) }));

      ['drawer-cart-count', 'drawer-cart-total-items'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = String(totalPieces);
      });
      const priceEl = document.getElementById('drawer-cart-total-price');
      if (priceEl) priceEl.textContent = `₹${grandTotal.toLocaleString('en-IN')}`;
      const orderButton = document.getElementById('drawer-whatsapp-order');
      if (orderButton) orderButton.disabled = totalPieces === 0;

      if (selected.length === 0) {
        list.innerHTML = '<div class="flex h-full min-h-48 flex-col items-center justify-center text-center text-zinc-400"><i data-lucide="shopping-bag" class="mb-3 h-9 w-9 text-zinc-600"></i><p class="text-sm font-semibold text-zinc-300">Your cart is empty</p><p class="mt-1 text-xs">Use the + buttons to add models.</p></div>';
      } else {
        list.innerHTML = selected.map(({ id, qty, item }) => `
          <article class="rounded-2xl border border-zinc-800 bg-zinc-900 p-3 shadow-sm">
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0 flex-1">
                <h3 class="break-words text-sm font-bold text-white">${escapeHTML(item.name).toUpperCase()}</h3>
                <p class="mt-1 text-[10px] font-semibold tracking-wide text-purple-300">${escapeHTML(canonicalizeCategory(item.category, item.name))}</p>
                <p class="mt-2 text-xs text-zinc-400">₹${Number(item.price).toLocaleString('en-IN')} × ${qty} = <strong class="text-amber-300">₹${(Number(item.price) * qty).toLocaleString('en-IN')}</strong></p>
              </div>
              <button type="button" onclick="removeOrderCartItem(this.dataset.itemId)" data-item-id="${escapeHTML(id)}" class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-900/50 bg-red-950/40 text-red-300 hover:bg-red-900/60" aria-label="Remove ${escapeHTML(item.name)} from cart" title="Remove item"><i data-lucide="trash-2" class="h-4 w-4"></i></button>
            </div>
            <div class="mt-3 flex items-center justify-between">
              <span class="text-xs text-zinc-500">Quantity</span>
              <div class="flex items-center gap-2">
                <button type="button" onclick="changeOrderCartQuantity(this.dataset.itemId, -1)" data-item-id="${escapeHTML(id)}" class="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-white hover:bg-zinc-700" aria-label="Decrease quantity"><i data-lucide="minus" class="h-4 w-4"></i></button>
                <span class="min-w-8 text-center font-mono text-sm font-bold text-white">${qty}</span>
                <button type="button" onclick="changeOrderCartQuantity(this.dataset.itemId, 1)" data-item-id="${escapeHTML(id)}" class="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white hover:bg-emerald-600" aria-label="Increase quantity"><i data-lucide="plus" class="h-4 w-4"></i></button>
              </div>
            </div>
          </article>
        `).join('');
      }
      if (window.lucide) lucide.createIcons();
    }

    window.openOrderCart = function() {
      const backdrop = document.getElementById('order-cart-backdrop');
      const panel = document.getElementById('order-cart-panel');
      backdrop.classList.add('is-open');
      backdrop.inert = false;
      backdrop.setAttribute('aria-hidden', 'false');
      panel.setAttribute('aria-hidden', 'false');
      document.getElementById('open-order-cart')?.setAttribute('aria-expanded', 'true');
      document.body.classList.add('overflow-hidden');
      document.getElementById('close-order-cart')?.focus();
    };

    window.closeOrderCart = function() {
      const backdrop = document.getElementById('order-cart-backdrop');
      const panel = document.getElementById('order-cart-panel');
      if (!backdrop) return;
      backdrop.classList.remove('is-open');
      backdrop.inert = true;
      backdrop.setAttribute('aria-hidden', 'true');
      panel.setAttribute('aria-hidden', 'true');
      document.getElementById('open-order-cart')?.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
      const cartTrigger = document.getElementById('open-order-cart');
      if (cartTrigger && !document.getElementById('bottom-cart-bar')?.classList.contains('hidden')) cartTrigger.focus();
    };

    window.changeOrderCartQuantity = function(id, delta) {
      window.updateItemQty(String(id), delta);
    };

    window.removeOrderCartItem = function(id) {
      setItemQty(String(id), 0);
    };

    window.submitOrderCartToWhatsApp = function() {
      if (!Object.values(window.appState.cart).some(qty => qty > 0)) return;
      window.submitWhatsAppOrder();
      closeOrderCart();
    };

    window.submitWhatsAppOrder = function() {
      const cartEntries = Object.entries(window.appState.cart).filter(([_, q]) => q > 0);
      if (cartEntries.length === 0) {
        showToast('Please select at least 1 display', 'error');
        return;
      }

      const itemMap = new Map(window.appState.items.map(i => [i.id, i]));
      const { customerName } = window.appState.buyerDetails;

      let msg = `📱 *GRANDFATHER MOBILE DISPLAY*\n`;
      msg += `✨ *HD+ COMBO & LCD SERIES WHOLESALE*\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      
      if (customerName) {
        msg += `👤 *Customer Name:* ${customerName}\n`;
        msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      }

      msg += `*Order Items:*\n`;

      let totalPieces = 0;
      let grandTotal = 0;
      let idx = 1;

      cartEntries.forEach(([id, qty]) => {
        const item = itemMap.get(id);
        if (item) {
          const lineTotal = Number(item.price) * qty;
          totalPieces += qty;
          grandTotal += lineTotal;
          msg += `${idx}. *${item.name}* ${item.quality ? `[${item.quality}]` : ''}\n`;
          msg += `   └─ ${qty} pcs × ₹${item.price} = *₹${lineTotal.toLocaleString('en-IN')}*\n`;
          idx++;
        }
      });

      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `📦 *Total Displays:* ${totalPieces} Pcs\n`;
      msg += `💰 *Grand Total:* ₹${grandTotal.toLocaleString('en-IN')}\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `_Grandfather Mobile Display Wholesale Support._`;

      const targetNumber = '919872298774';
      const encodedMsg = encodeURIComponent(msg);
      window.open(`https://wa.me/${targetNumber}?text=${encodedMsg}`, '_blank');
    };

    window.downloadRateListPDF = function(categoryFilter = 'All') {
      if (!window.jspdf) {
        showToast('PDF library loading...', 'error');
        return;
      }

      const selectedItems = window.appState.items.filter(item => categoryFilter === 'All' || canonicalizeCategory(item.category, item.name) === categoryFilter);
      if (selectedItems.length === 0) {
        showToast(categoryFilter === 'All' ? 'Catalog is empty' : `No models found in ${categoryFilter}`, 'error');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const dateStr = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      // Royal Purple / Violet Header Bar matching Box Packaging
      doc.setFillColor(76, 29, 149);
      doc.rect(0, 0, 210, 25, 'F');

      // Top Decorative Gold Accent Line
      doc.setFillColor(245, 158, 11);
      doc.rect(0, 24.2, 210, 0.8, 'F');

      // Main Brand Name: GRANDFATHER
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text('GRANDFATHER', 8, 9.5);

      // 3D Metallic Style HD+ Golden Badge next to Brand Name
      doc.setFillColor(245, 158, 11);
      doc.roundedRect(56, 4.2, 14, 6.5, 1.2, 1.2, 'F');
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(24, 24, 27);
      doc.text('HD+', 58.5, 8.8);

      // Subtitle directly from Box Packaging
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(253, 230, 138);
      doc.text('COMBO & LCD SERIES', 8, 15);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(237, 233, 254);
      doc.text('MOBILE PHONE SCREEN ASSEMBLY WHOLESALE RATE SHEET', 48, 15);

      doc.setFontSize(7.5);
      doc.setTextColor(221, 214, 254);
      const titleCategory = categoryFilter === 'All' ? 'ALL CATEGORIES' : categoryFilter;
      doc.text(`${titleCategory}  |  ${dateStr}  |  ${selectedItems.length} Models`, 8, 20.5);

      // WhatsApp Orders Badge in Royal Violet with Gold Border
      doc.setFillColor(91, 33, 182);
      doc.roundedRect(125, 4.5, 77, 15, 2, 2, 'F');
      doc.setDrawColor(245, 158, 11);
      doc.setLineWidth(0.3);
      doc.roundedRect(125, 4.5, 77, 15, 2, 2, 'D');

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(253, 230, 138);
      doc.text('OFFICIAL WHOLESALE DESK', 137, 9.5);

      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text('WhatsApp: +91 98722 98774', 131, 15.5);

      // Group products strictly by Canonical Category
      const grouped = {};
      selectedItems.forEach(it => {
        const cat = canonicalizeCategory(it.category || 'GENERAL', it.name);
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(it);
      });

      const categoryOrder = new Map(getCategories().map((category, index) => [category, index]));
      const sortedCats = Object.keys(grouped).sort((a, b) =>
        (categoryOrder.get(a) ?? Number.MAX_SAFE_INTEGER) - (categoryOrder.get(b) ?? Number.MAX_SAFE_INTEGER) || a.localeCompare(b)
      );

      sortedCats.forEach(cat => {
        grouped[cat].sort((a, b) => (a.name || '').localeCompare(b.name || ''));
      });

      const tableRows = [];

      sortedCats.forEach((cat, catIdx) => {
        const catItems = grouped[cat];
        if (!catItems || catItems.length === 0) return;

        // Clear vertical spacing gap before each new Category section
        if (catIdx > 0) {
          tableRows.push([
            {
              content: '',
              colSpan: 4,
              styles: {
                fillColor: [255, 255, 255],
                minCellHeight: 5,
                cellPadding: 0,
                lineWidth: 0
              }
            }
          ]);
        }

        // Full-width Category Divider with Grandfather Box Purple & Gold
        tableRows.push([
          {
            content: `  ★  ${cat}  (${catItems.length} Models)`,
            colSpan: 4,
            styles: {
              fillColor: [88, 28, 135],
              textColor: [245, 158, 11],
              fontStyle: 'bold',
              fontSize: 9.2,
              halign: 'left',
              cellPadding: { top: 2.8, bottom: 2.8, left: 3, right: 3 }
            }
          }
        ]);

        // Pair items side-by-side (Col A/B & Col C/D)
        for (let i = 0; i < catItems.length; i += 2) {
          const leftItem = catItems[i];
          const rightItem = (i + 1 < catItems.length) ? catItems[i + 1] : null;

          tableRows.push([
            leftItem ? leftItem.name : '',
            leftItem ? `Rs. ${Number(leftItem.price).toLocaleString('en-IN')}` : '',
            rightItem ? rightItem.name : '',
            rightItem ? `Rs. ${Number(rightItem.price).toLocaleString('en-IN')}` : ''
          ]);
        }
      });

      doc.autoTable({
        startY: 28,
        margin: { left: 8, right: 8, top: 28, bottom: 10 },
        head: [['Model Name', 'Rate', 'Model Name', 'Rate']],
        body: tableRows,
        theme: 'plain',
        styles: {
          fontSize: 8,
          cellPadding: { top: 1.5, bottom: 1.5, left: 2, right: 2 },
          valign: 'middle',
          lineColor: [237, 233, 254],
          lineWidth: 0.1,
          overflow: 'ellipsize'
        },
        headStyles: {
          fillColor: [76, 29, 149],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8.2,
          halign: 'left'
        },
        columnStyles: {
          0: { cellWidth: 67, fontStyle: 'bold', textColor: [24, 24, 27] },
          1: { cellWidth: 30, halign: 'right', fontStyle: 'bold', textColor: [109, 40, 217] },
          2: { cellWidth: 67, fontStyle: 'bold', textColor: [24, 24, 27] },
          3: { cellWidth: 30, halign: 'right', fontStyle: 'bold', textColor: [109, 40, 217] }
        },
        didDrawCell: function(data) {
          if (data.column.index === 1 && data.cell.raw && typeof data.cell.raw !== 'object') {
            doc.setDrawColor(196, 181, 253);
            doc.setLineWidth(0.4);
            const xPos = data.cell.x + data.cell.width;
            doc.line(xPos, data.cell.y, xPos, data.cell.y + data.cell.height);
          }
        },
        didDrawPage: function(data) {
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(7);
          doc.setTextColor(109, 40, 217);
          doc.text(
            `Page ${data.pageNumber} of ${pageCount}  |  GRANDFATHER HD+ COMBO & LCD SERIES WHOLESALE`,
            105,
            293,
            { align: 'center' }
          );
        }
      });

      const safeCategory = categoryFilter === 'All' ? 'All_Mobile_List' : categoryFilter.replace(/[^A-Z0-9]+/gi, '_');
      doc.save(`RateList_${safeCategory}_${new Date().toISOString().split('T')[0]}.pdf`);
      showToast(`${getRateListCategoryLabel(categoryFilter)} PDF downloaded`);
    };

    /**
     * Download A4 Half Size (A5: 148 x 210 mm) Slip for Ticked Models:
     * - Strictly 3 Columns:
     *   1. Model Name
     *   2. Blank Column (for pen writing, manual qty or remarks)
     *   3. Sale Price (₹)
     */
    window.downloadTickedListPDF = function() {
      if (!window.jspdf) {
        showToast('PDF library loading...', 'error');
        return;
      }

      const { tickedItemIds, items, buyerDetails } = window.appState;
      if (tickedItemIds.size === 0) {
        showToast('Please tick at least 1 model first', 'error');
        return;
      }

      const selectedItems = items.filter(it => tickedItemIds.has(it.id));
      if (selectedItems.length === 0) {
        showToast('No models found in ticked list', 'error');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a5'
      });

      const dateStr = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      doc.setFillColor(76, 29, 149);
      doc.rect(0, 0, 148, 22, 'F');

      doc.setFillColor(245, 158, 11);
      doc.rect(0, 21.2, 148, 0.8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('GRANDFATHER', 8, 9);

      doc.setFillColor(245, 158, 11);
      doc.roundedRect(52, 4.2, 13, 6, 1.2, 1.2, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(24, 24, 27);
      doc.text('HD+', 54, 8.5);

      doc.setFontSize(7.5);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(253, 230, 138);
      doc.text('SELECTED MODELS RATE SLIP', 8, 14.5);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(237, 233, 254);
      const custText = buyerDetails.customerName ? `Customer: ${buyerDetails.customerName}   |   ` : '';
      doc.text(`${custText}Date: ${dateStr}   |   Items: ${selectedItems.length}`, 8, 19);

      const tableRows = selectedItems.map((item) => {
        return [
          item.name,
          '',
          `Rs. ${Number(item.price).toLocaleString('en-IN')}`
        ];
      });

      doc.autoTable({
        startY: 25,
        margin: { left: 8, right: 8, top: 25, bottom: 10 },
        head: [['Model Name', 'Remarks / Qty', 'Sale Price']],
        body: tableRows,
        theme: 'plain',
        styles: {
          fontSize: 8.5,
          minCellHeight: 6.2,
          cellPadding: { top: 1.8, bottom: 1.8, left: 2.5, right: 2.5 },
          valign: 'middle',
          lineColor: [221, 214, 254],
          lineWidth: 0.15
        },
        headStyles: {
          fillColor: [76, 29, 149],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8.5,
          halign: 'left'
        },
        columnStyles: {
          0: { cellWidth: 72, fontStyle: 'bold', textColor: [24, 24, 27] },
          1: { cellWidth: 32, fillColor: [250, 250, 252], lineColor: [203, 213, 225], lineWidth: 0.2 },
          2: { cellWidth: 28, halign: 'right', fontStyle: 'bold', textColor: [109, 40, 217] }
        },
        didDrawPage: function(data) {
          const pageCount = doc.internal.getNumberOfPages();
          doc.setFontSize(6.5);
          doc.setTextColor(120, 113, 108);
          doc.text(
            `Page ${data.pageNumber} of ${pageCount}  •  GRANDFATHER MOBILE DISPLAY  •  Helpline: +91 98722 98774`,
            74,
            206,
            { align: 'center' }
          );
        }
      });

      const fileName = `Grandfather_Slip_${new Date().toISOString().split('T')[0]}.pdf`;
      doc.save(fileName);
      showToast('A4 Half-Size Slip PDF downloaded!');
    };

    window.downloadOrderPDF = function() {
      if (!window.jspdf) {
        showToast('PDF library loading...', 'error');
        return;
      }

      const cartEntries = Object.entries(window.appState.cart).filter(([_, q]) => q > 0);
      if (cartEntries.length === 0) {
        showToast('Select items first', 'error');
        return;
      }

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const dateStr = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });

      const { customerName } = window.appState.buyerDetails;

      doc.setFillColor(76, 29, 149);
      doc.rect(0, 0, 210, 34, 'F');
      doc.setFillColor(245, 158, 11);
      doc.rect(0, 33.2, 210, 0.8, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('GRANDFATHER', 14, 13);

      doc.setFillColor(245, 158, 11);
      doc.roundedRect(63, 7.5, 13, 6, 1.2, 1.2, 'F');
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(24, 24, 27);
      doc.text('HD+', 65, 11.8);

      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(253, 230, 138);
      doc.text('COMBO & LCD SERIES  |  ESTIMATE & ORDER SHEET', 14, 21);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(237, 233, 254);
      doc.text(`Support / Orders: +91 98722 98774  |  Date: ${dateStr}`, 14, 27);

      doc.setFillColor(245, 243, 255);
      doc.roundedRect(14, 38, 182, 15, 2, 2, 'F');
      doc.setDrawColor(221, 214, 254);
      doc.roundedRect(14, 38, 182, 15, 2, 2, 'D');

      doc.setFontSize(8.5);
      doc.setTextColor(76, 29, 149);
      doc.setFont('helvetica', 'bold');
      doc.text('CUSTOMER DETAILS:', 18, 44);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(51, 65, 85);
      const bCustomer = customerName || 'Cash Counter Customer';
      doc.text(`Customer Name: ${bCustomer}`, 18, 49.5);

      const itemMap = new Map(window.appState.items.map(i => [i.id, i]));
      let grandTotal = 0;
      let totalQty = 0;
      let rowIdx = 1;

      const orderRows = [];
      cartEntries.forEach(([id, qty]) => {
        const it = itemMap.get(id);
        if (it) {
          const rate = Number(it.price);
          const lineTotal = rate * qty;
          grandTotal += lineTotal;
          totalQty += qty;

          orderRows.push([
            rowIdx++,
            it.category || 'Display',
            it.name + (it.quality ? ` (${it.quality})` : ''),
            `Rs. ${rate.toLocaleString('en-IN')}`,
            qty,
            `Rs. ${lineTotal.toLocaleString('en-IN')}`
          ]);
        }
      });

      doc.autoTable({
        startY: 58,
        head: [['#', 'Category', 'Display Model', 'Rate / Pc', 'Qty', 'Line Total']],
        body: orderRows,
        theme: 'striped',
        styles: {
          fontSize: 9,
          cellPadding: 3,
          valign: 'middle'
        },
        headStyles: {
          fillColor: [109, 40, 217],
          textColor: 255,
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center' },
          1: { cellWidth: 32 },
          2: { cellWidth: 'auto', fontStyle: 'bold' },
          3: { cellWidth: 26, halign: 'right' },
          4: { cellWidth: 18, halign: 'center', fontStyle: 'bold' },
          5: { cellWidth: 30, halign: 'right', fontStyle: 'bold', textColor: [109, 40, 217] }
        },
        foot: [
          ['', '', 'TOTAL SUMMARY', '', `${totalQty} Pcs`, `Rs. ${grandTotal.toLocaleString('en-IN')}`]
        ],
        footStyles: {
          fillColor: [76, 29, 149],
          textColor: [245, 158, 11],
          fontStyle: 'bold',
          fontSize: 9.5
        },
        margin: { left: 14, right: 14 }
      });

      const finalY = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(8);
      doc.setTextColor(120);
      doc.text('Important Instructions:', 14, finalY);
      doc.text('1. Please test display combo carefully before removing warranty sticker & protective seal.', 14, finalY + 4.5);
      doc.text('2. Broken, damaged or pasted displays are strictly not eligible for guarantee replacement.', 14, finalY + 9);

      const filename = `Order_Grandfather_${(customerName || 'Wholesale').replace(/\s+/g, '_')}.pdf`;
      doc.save(filename);
      showToast('Grandfather Order PDF downloaded!');
    };

    window.toggleCustomerModal = function(show) {
      const modal = document.getElementById('customer-modal');
      modal.classList.toggle('hidden', !show);
      if (show) {
        document.getElementById('cust-name').value = window.appState.buyerDetails.customerName || '';
        setTimeout(() => document.getElementById('cust-name').focus(), 100);
      }
    };

    window.saveCustomerProfile = function() {
      const customerName = document.getElementById('cust-name').value.trim();

      window.appState.buyerDetails = { customerName };
      localStorage.setItem('sh_wholesale_buyer', JSON.stringify(window.appState.buyerDetails));
      updateBuyerDisplay();
      toggleCustomerModal(false);
      showToast('Customer name saved!');
    };

    function updateBuyerDisplay() {
      const { customerName } = window.appState.buyerDetails;
      const displayEl = document.getElementById('buyer-display-name');
      const headerEl = document.getElementById('header-shop-text');

      if (customerName) {
        displayEl.textContent = customerName;
        headerEl.textContent = customerName.length > 10 ? customerName.slice(0, 10) + '...' : customerName;
      } else {
        displayEl.textContent = 'Cash Counter Customer';
        headerEl.textContent = 'Customer';
      }
    }

    window.handleAdminEntry = function() {
      document.getElementById('admin-email').value = '';
      document.getElementById('admin-password').value = '';
      document.getElementById('pin-modal').classList.remove('hidden');
      setTimeout(() => document.getElementById('admin-email').focus(), 150);
    };

    window.closePinModal = function() {
      document.getElementById('pin-modal').classList.add('hidden');
    };

    window.signInAdmin = async function() {
      if (!window.firebaseAdminSignIn) {
        showToast('Configure Firebase before using admin tools', 'error'); return;
      }
      const email = document.getElementById('admin-email').value.trim();
      const password = document.getElementById('admin-password').value;
      if (!email || !password) { showToast('Enter the admin email and password', 'error'); return; }
      try {
        await window.firebaseAdminSignIn(email, password);
        document.getElementById('admin-password').value = '';
        closePinModal(); openAdminView();
        showToast('Admin signed in');
      } catch (err) { console.error(err); showToast('Admin sign-in failed. Check Firebase Auth credentials.', 'error'); }
    };

    function openAdminView() {
      document.getElementById('admin-view').classList.remove('hidden');
      renderAdminTable();
      lucide.createIcons();
    }

    window.closeAdminView = function() {
      document.getElementById('admin-view').classList.add('hidden');
      renderCategoryPills();
      renderCatalog();
    };

    window.renderAdminTable = function(query = '') {
      const tbody = document.getElementById('admin-table-body');
      const q = query.trim();

      const filtered = window.appState.items.filter(it => {
        return matchModelSmart(it, q);
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" class="p-6 text-center text-zinc-500">No items found matching filter</td></tr>`;
        return;
      }

      tbody.innerHTML = filtered.map(item => `
        <tr class="hover:bg-zinc-850/50">
          <td class="p-3 font-semibold text-white">${escapeHTML(item.name).toUpperCase()}</td>
          <td class="p-3 text-purple-300 font-medium">${escapeHTML(canonicalizeCategory(item.category, item.name))}</td>
          <td class="p-3 text-right font-mono font-bold text-amber-400">₹${Number(item.price).toLocaleString('en-IN')}</td>
          <td class="p-3 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <button data-item-id="${escapeHTML(item.id)}" onclick="editItem(this.dataset.itemId)" class="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300" title="Edit Item">
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              </button>
              <button data-item-id="${escapeHTML(item.id)}" onclick="deleteItem(this.dataset.itemId)" class="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-400 border border-red-900/40" title="Delete Item">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </td>
        </tr>
      `).join('');

      lucide.createIcons();
    };

    window.openItemModal = function() {
      document.getElementById('item-modal-title').textContent = 'Add New Display';
      document.getElementById('edit-item-id').value = '';
      document.getElementById('item-input-category').value = '';
      document.getElementById('item-input-name').value = '';
      document.getElementById('item-input-price').value = '';
      document.getElementById('item-modal').classList.remove('hidden');
    };

    window.closeItemModal = function() {
      document.getElementById('item-modal').classList.add('hidden');
    };

    window.editItem = function(id) {
      const item = window.appState.items.find(i => i.id === id);
      if (!item) return;

      document.getElementById('item-modal-title').textContent = 'Edit Display';
      document.getElementById('edit-item-id').value = item.id;
      document.getElementById('item-input-category').value = item.category || '';
      document.getElementById('item-input-name').value = item.name || '';
      document.getElementById('item-input-price').value = item.price || '';
      document.getElementById('item-modal').classList.remove('hidden');
    };

    window.saveItem = function() {
      const id = document.getElementById('edit-item-id').value;
      const category = canonicalizeCategory(document.getElementById('item-input-category').value.trim() || 'General Displays');
      const name = document.getElementById('item-input-name').value.trim();
      const price = parseFloat(document.getElementById('item-input-price').value);

      if (!name) {
        showToast('Please enter model name (Column 1)', 'error');
        return;
      }
      if (isNaN(price) || price <= 0) {
        showToast('Please enter a valid price (Column 2)', 'error');
        return;
      }

      if (id) {
        const idx = window.appState.items.findIndex(i => i.id === id);
        if (idx !== -1) {
          const existingQuality = window.appState.items[idx].quality || '';
          window.appState.items[idx] = { id, category, name, quality: existingQuality, price };
        }
      } else {
        const newItem = {
          id: Date.now().toString(),
          category,
          name,
          quality: '',
          price
        };
        window.appState.items.unshift(newItem);
      }

      persistCatalog();
      closeItemModal();
      renderAdminTable();
      showToast('Item saved successfully!');
    };

    window.deleteItem = function(id) {
      window.appState.items = window.appState.items.filter(i => i.id !== id);
      delete window.appState.cart[id];
      persistCatalog();
      renderAdminTable();
      updateCartSummary();
      showToast('Item removed from inventory');
    };

    window.resetToDefaultData = function() {
      window.appState.items = [...DEFAULT_CATALOG];
      window.appState.cart = {};
      persistCatalog();
      renderAdminTable();
      updateCartSummary();
      showToast('Catalog restored to original sample data');
    };

    window.openExcelModal = function() {
      document.getElementById('excel-modal').classList.remove('hidden');
      document.getElementById('excel-file-input').value = '';
      document.getElementById('file-chosen-name').textContent = 'Upload your file (e.g. 25-93.xlsx)';
      document.getElementById('excel-preview-box').classList.add('hidden');
      document.getElementById('btn-append-excel').disabled = true;
      document.getElementById('btn-replace-excel').disabled = true;
      window.appState.stagedExcelItems = [];
      window.appState.stagedExcelFile = null;
    };

    window.closeExcelModal = function() {
      document.getElementById('excel-modal').classList.add('hidden');
    };

    window.handleExcelFileUpload = function(e) {
      const file = e.target.files && e.target.files[0];
      if (!file) return;

      const fileNameLabel = document.getElementById('file-chosen-name');
      fileNameLabel.textContent = `Selected: ${file.name}`;
      fileNameLabel.className = 'text-[11px] text-cyan-400 mt-1 font-bold';

      window.appState.stagedExcelFile = file;

      const reader = new FileReader();
      reader.onload = function(evt) {
        try {
          const data = new Uint8Array(evt.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          const rawRows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
          const parsed = parseWholesaleMatrix(rawRows);

          if (!parsed || parsed.length === 0) {
            showToast('No valid models found. Please check columns: [Item, Price, Category]', 'error');
            return;
          }

          window.appState.stagedExcelItems = parsed;
          document.getElementById('parsed-count').textContent = parsed.length;

          const previewList = document.getElementById('parsed-preview-list');
          previewList.innerHTML = parsed.slice(0, 20).map(p => `
            <div class="py-1.5 flex items-center justify-between gap-2">
              <div class="truncate">
                <span class="text-purple-400 font-mono text-[10px] font-semibold">[${p.category}]</span>
                <strong class="text-white ml-1">${escapeHTML(p.name).toUpperCase()}</strong>
                ${p.quality ? `<span class="text-amber-300 text-[10px] ml-1">(${p.quality})</span>` : ''}
              </div>
              <span class="text-amber-400 font-bold shrink-0 font-mono">₹${p.price.toLocaleString('en-IN')}</span>
            </div>
          `).join('') + (parsed.length > 20 ? `<div class="text-[10px] text-zinc-500 pt-2 text-center font-medium">+ ${parsed.length - 20} more items ready...</div>` : '');

          document.getElementById('excel-preview-box').classList.remove('hidden');
          document.getElementById('btn-append-excel').disabled = false;
          document.getElementById('btn-replace-excel').disabled = false;
          showToast(`Successfully read ${parsed.length} items from ${file.name}!`);
        } catch (err) {
          console.error(err);
          showToast('Error reading Excel file. Check format.', 'error');
        }
      };
      reader.onerror = function() {
        showToast('Failed to read file from storage', 'error');
      };
      reader.readAsArrayBuffer(file);
    };

    // The standalone Firebase build stores parsed rows in Realtime Database; no server upload is needed.
    async function uploadStagedFileToCloud() {
      return true;
    }

    /**
     * Strict 3-Column Wholesale Excel Parser:
     * - Column 1 (index 0): Item Detail / Model Name
     * - Column 2 (index 1): Wholesale Price
     * - Column 3 (index 2): Category / Brand
     */
    function parseWholesaleMatrix(rows) {
      if (!rows || rows.length === 0) return [];
      const items = [];

      const cleanPrice = (val) => {
        if (val === undefined || val === null || val === '') return null;
        if (typeof val === 'number') {
          return (!isNaN(val) && val > 0) ? Math.round(val) : null;
        }
        const cleanStr = String(val).replace(/,/g, '').replace(/[^0-9.]/g, '');
        const num = parseFloat(cleanStr);
        return (!isNaN(num) && num > 0) ? Math.round(num) : null;
      };

      const cleanText = (val) => {
        if (val === undefined || val === null) return '';
        return String(val).replace(/[`]/g, '').trim();
      };

      const detectQuality = (name, cat) => {
        const uName = (name || '').toUpperCase();
        const uCat = (cat || '').toUpperCase();
        if (uCat.includes('CARE OG') || uName.includes('CARE OG') || uName.includes('ORIGINAL')) return 'Care OG';
        if (uName.includes('CHINA OG')) return 'China OG';
        if (uCat.includes('DD OLED') || uName.includes('DD OLED')) return 'DD OLED';
        if (uCat.includes('OLED') || uName.includes('OLED')) return 'OLED';
        if (uName.includes('INCELL')) return 'Incell';
        if (uCat.includes('CROWN') || uName.includes('CROWN')) return 'Crown';
        if (uCat.includes('SVC') || uName.includes('SVC')) return 'SVC';
        if (uCat.includes('500+') || uName.includes('HIGH-BRI')) return 'High-Bright';
        if (uCat.includes('NEXOO')) return 'Nexoo';
        if (uCat.includes('GF')) return 'GF';
        return '';
      };

      // Strict 3-Column mapping:
      // Col 0 = Item Detail
      // Col 1 = Price
      // Col 2 = Category / Brand
      let modelCol = 0;
      let priceCol = 1;
      let catCol = 2;
      let startIdx = 0;

      // Check if Row 0 is a Header Row
      const firstRow = rows[0] || [];
      const h0 = String(firstRow[0] || '').toLowerCase().trim();
      const h1 = String(firstRow[1] || '').toLowerCase().trim();
      const h2 = String(firstRow[2] || '').toLowerCase().trim();

      const isHeader = (
        h0.includes('item') || h0.includes('model') || h0.includes('particular') || h0.includes('name') || h0.includes('detail') ||
        h1.includes('price') || h1.includes('rate') || h1.includes('mrp') || h1.includes('amount') || h1.includes('rs') ||
        h2.includes('cat') || h2.includes('brand') || h2.includes('group') || h2.includes('company')
      );

      if (isHeader) {
        startIdx = 1;
        // Dynamically confirm column positions if header text is clear
        firstRow.forEach((h, idx) => {
          const colName = String(h || '').toLowerCase().trim();
          if (colName.includes('price') || colName.includes('rate') || colName.includes('mrp') || colName.includes('amount') || colName.includes('rs')) {
            priceCol = idx;
          } else if (colName.includes('cat') || colName.includes('brand') || colName.includes('group') || colName.includes('company')) {
            catCol = idx;
          } else if (colName.includes('item') || colName.includes('model') || colName.includes('particular') || colName.includes('name') || colName.includes('detail')) {
            modelCol = idx;
          }
        });
      }

      let lastCategory = 'GRANDFATHER (GF)';

      for (let r = startIdx; r < rows.length; r++) {
        const row = rows[r];
        if (!row || row.length === 0) continue;

        const rawModel = cleanText(row[modelCol]);
        let rawCategory = cleanText(row[catCol]);
        const price = cleanPrice(row[priceCol]);

        // Detect if this row is a Category Divider Row (e.g. "CROWN COMBO" with blank price)
        if (rawModel && (price === null || price <= 0)) {
          const possibleCat = canonicalizeCategory(rawModel, '');
          if (possibleCat && possibleCat !== 'OTHER CATEGORIES') {
            lastCategory = possibleCat;
          }
          continue;
        }

        if (!rawModel || price === null || price <= 0) continue;

        const lowerModel = rawModel.toLowerCase();
        if (
          lowerModel.includes('credit note') || 
          lowerModel === 'item' || 
          lowerModel === 'item detail' || 
          lowerModel === 'model name' ||
          lowerModel === 'particulars'
        ) {
          continue;
        }

        // If category is provided in Column 3, update lastCategory; otherwise inherit
        if (rawCategory) {
          const cCanon = canonicalizeCategory(rawCategory, rawModel);
          if (cCanon && cCanon !== 'OTHER CATEGORIES') {
            lastCategory = cCanon;
          }
        }

        const category = canonicalizeCategory(rawCategory || lastCategory, rawModel);
        const quality = detectQuality(rawModel, category);

        items.push({
          id: 'imp_' + Math.random().toString(36).substr(2, 9),
          category: category,
          name: rawModel,
          quality: quality,
          price: price
        });
      }

      return items;
    }

    window.commitExcelImport = async function(replace = false) {
      const staged = window.appState.stagedExcelItems;
      if (!staged || staged.length === 0) return;

      const fileSaved = await uploadStagedFileToCloud();
      if (!fileSaved) return;

      if (replace) {
        window.appState.items = [...staged];
        window.appState.cart = {};
      } else {
        window.appState.items = [...window.appState.items, ...staged];
      }

      await persistCatalog();
      closeExcelModal();
      renderAdminTable();
      renderCategoryPills();
      renderCatalog();
      updateCartSummary();
      showToast(`Successfully imported ${staged.length} items — visible to everyone now!`);
    };

    window.exportCatalogToExcel = function() {
      if (window.appState.items.length === 0) {
        showToast('Inventory is empty', 'error');
        return;
      }

      // Export in strict 3-Column format:
      // Column 1: Item Detail
      // Column 2: Price
      // Column 3: Category / Brand
      const rows = [
        ['Item Detail', 'Price', 'Category / Brand']
      ];

      window.appState.items.forEach(it => {
        rows.push([
          it.name,
          it.price,
          it.category || 'General'
        ]);
      });

      const worksheet = XLSX.utils.aoa_to_sheet(rows);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Wholesale Rates');
      XLSX.writeFile(workbook, `Grandfather_Wholesale_Catalog_${new Date().toISOString().split('T')[0]}.xlsx`);
      showToast('Catalog exported in 3-column format!');
    };
