(function () {
  'use strict';
  
  const THEME_STORAGE_KEY = 'erikleuning-theme';
  const CONSENT_STORAGE_KEY = 'erikleuning-cookie-consent';
  const CONSENT_TTL_MS = 90 * 24 * 60 * 60 * 1000;
  const ANALYTICS_ID = 'UA-58599156-1';
  const NAV_ITEMS = [
    { id: 'welkom', label: 'Home', href: '#welkom' },
    { id: 'begeleiding', label: 'Begeleiding', href: '#begeleiding' },
    { id: 'over-mij', label: 'Over mij', href: '#over-mij' },
    { id: 'doelgroep', label: 'Doelgroep', href: '#doelgroep' },
    { id: 'werkwijze', label: 'Werkwijze', href: '#werkwijze' },
    { id: 'visie', label: 'Visie', href: '#visie' },
    { id: 'werkgebied', label: 'Werkgebied', href: '#werkgebied' },
    { id: 'contact', label: 'Contact', href: '#contact' }
  ];
  
  function initImageErrorHandling() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupImageErrors, { once: true });
    } else {
      setupImageErrors();
    }
  }

  function initOfflineDetection() {
    const offlineNotice = document.getElementById('offline-notice');
    if (!offlineNotice) return;

    function updateOnlineStatus() {
      if (navigator.onLine) {
        offlineNotice.setAttribute('hidden', '');
        offlineNotice.removeAttribute('aria-live');
      } else {
        offlineNotice.removeAttribute('hidden');
        offlineNotice.setAttribute('aria-live', 'polite');
      }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  }
  
  function setupImageErrors() {
    const images = document.querySelectorAll('img');
    images.forEach(function(img) {
      img.addEventListener('error', function() {
        this.setAttribute('data-error', 'true');
        this.removeAttribute('src');
        this.style.display = 'none';
        
        var fallback = document.createElement('div');
        fallback.className = 'image-fallback';
        fallback.setAttribute('role', 'img');
        fallback.setAttribute('aria-label', 'Afbeelding kon niet laden');
        
        var alt = this.getAttribute('alt');
        if (alt && alt !== 'undefined') {
          fallback.textContent = '📷 ' + (alt.substring(0, 50) || 'Afbeelding niet beschikbaar');
        } else {
          fallback.textContent = '📷 Afbeelding niet beschikbaar';
        }
        
        this.parentNode.insertBefore(fallback, this.nextSibling);
      });
      
      if (!img.complete && !img.naturalWidth) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }
  
  function checkReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  function initSmoothScrollFallback() {
    if (checkReducedMotion()) {
      document.documentElement.style.scrollBehavior = 'auto';
    }
  }
  
  function sanitizeHTML(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }
  
  function escapeSelector(selector) {
    return selector.replace(/[!"#$%&'()*+,.\/:;<=>?@[\\\]^`{|}~]/g, '\\$&');
  }
  
  function initEmailProtection() {
    document.querySelectorAll('.email-link').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var user = this.getAttribute('data-email-user');
        var domain = this.getAttribute('data-email-domain');
        var tld = this.getAttribute('data-email-tld') || 'nl';
        if (user && domain) {
          this.href = 'mailto:' + user + '@' + domain + '.' + tld;
        }
      });
    });
  }
  
  function initBackToTop() {
    var btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });
    
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  initImageErrorHandling();
  initOfflineDetection();
  initEmailProtection();
  initBackToTop();

  window.siteHeader = function siteHeader(currentPage) {
    return {
      pagina: currentPage,
      navItems: NAV_ITEMS,
      mobileOpen: false,
      isDark: false,
      activeSection: 'welkom',
      lastMenuFocus: null,
      sectionObserver: null,
      sectionsList: [],
      sectionsIndex: new Map(),
      updateFromScroll: null,
      linkFor(item) {
        if (this.pagina !== 'home' && item.href.startsWith('#')) {
          return `index.html${item.href}`;
        }
        return item.href;
      },
      init() {
        this.isDark = readStoredTheme();
        applyTheme(this.isDark);
        this.$watch('isDark', (value) => {
          writeStoredTheme(value);
          applyTheme(value);
        });
        if (this.pagina === 'home') {
          this.$nextTick(() => this.setupSectionObserver());
        }
      },
      toggleTheme() {
        this.isDark = !this.isDark;
      },
      toggleMenu() {
        this.mobileOpen = !this.mobileOpen;
        if (this.mobileOpen) {
          this.lastMenuFocus = this.$refs.menuToggle || document.activeElement;
          this.$nextTick(() => this.focusFirstMenuItem());
        } else {
          this.restoreMenuFocus();
        }
      },
      closeMenu() {
        this.mobileOpen = false;
        this.$nextTick(() => this.restoreMenuFocus());
      },
      getMenuFocusable() {
        const panel = this.$refs.mobilePanel;
        if (!panel) {
          return [];
        }
        return Array.from(panel.querySelectorAll('a, button'));
      },
      focusFirstMenuItem() {
        const focusable = this.getMenuFocusable();
        if (focusable.length) {
          focusable[0].focus();
        }
      },
      restoreMenuFocus() {
        const target = this.lastMenuFocus || this.$refs.menuToggle;
        if (target && typeof target.focus === 'function') {
          target.focus();
        }
      },
      trapMenuFocus(event) {
        if (!this.mobileOpen || event.key !== 'Tab') {
          return;
        }
        const focusable = this.getMenuFocusable();
        if (!focusable.length) {
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && (document.activeElement === first || document.activeElement === this.$refs.mobilePanel)) {
          event.preventDefault();
          last.focus();
          return;
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      },
      setupSectionObserver() {
        this.sectionsList = Array.from(document.querySelectorAll('[data-section]'));
        if (!this.sectionsList.length) {
          return;
        }

        const midPoint = () => window.innerHeight * 0.35;

        this.sectionsIndex = new Map(
          this.sectionsList.map((section, index) => [section.dataset.section, index])
        );

        const fallbackUpdate = () => {
          const point = midPoint();
          for (const section of this.sectionsList) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= point && rect.bottom >= point) {
              this.activeSection = section.dataset.section;
              return;
            }
          }
          this.activeSection = this.sectionsList[0].dataset.section;
        };

        const observer = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((entry) => entry.isIntersecting)
              .sort(
                (a, b) =>
                  (this.sectionsIndex.get(a.target.dataset.section) ?? 0) -
                  (this.sectionsIndex.get(b.target.dataset.section) ?? 0)
              );

            if (visible.length > 0) {
              const next = visible[0].target.dataset.section;
              if (next) {
                this.activeSection = next;
              }
            } else {
              fallbackUpdate();
            }
          },
          {
            threshold: 0.2,
            rootMargin: '-40% 0px -40% 0px'
          }
        );

        this.sectionsList.forEach((section) => observer.observe(section));
        this.sectionObserver = observer;
        this.updateFromScroll = fallbackUpdate;
        window.addEventListener('scroll', fallbackUpdate, { passive: true });
        fallbackUpdate();
      },
      currentFor(item) {
        if (this.pagina !== 'home') {
          return item.id === this.pagina;
        }
        return (this.activeSection || 'welkom') === item.id;
      },
      navigate(event, item) {
        if (item.href.startsWith('#')) {
          if (this.pagina !== 'home') {
            event.preventDefault();
            const homeUrl = new URL('index.html', window.location.href);
            homeUrl.hash = item.href.slice(1);
            window.location.href = homeUrl.toString();
            return;
          }
          event.preventDefault();
          const target = document.querySelector(item.href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
          this.closeMenu();
        } else {
          this.closeMenu();
        }
      },
      trapFocus(event) {
        if (!this.mobileOpen) {
          return;
        }
        const panel = this.$refs.mobilePanel;
        if (!panel || panel.contains(event.target)) {
          return;
        }
        const focusable = panel.querySelectorAll('a, button');
        if (focusable.length) {
          focusable[0].focus();
        }
      }
    };
  };

  window.cookieBanner = function cookieBanner() {
    return {
      open: false,
      showPrefs: false,
      analyticsEnabled: false,
      lastFocused: null,
      init() {
        if (!canStore()) {
          this.open = false;
          this.analyticsEnabled = false;
          return;
        }
        const consent = readStoredConsent();
        if (consent === 'analytics') {
          this.analyticsEnabled = true;
          loadAnalytics();
          return;
        }
        if (consent === 'rejected' || consent === 'essential-only') {
          this.analyticsEnabled = false;
          return;
        }
        window.setTimeout(() => {
          this.open = true;
          this.lastFocused = document.activeElement;
          this.$nextTick(() => {
            this.$el.querySelector('button')?.focus();
          });
        }, 600);
      },
      togglePrefs() {
        this.showPrefs = !this.showPrefs;
        if (this.showPrefs) {
          this.$nextTick(() => {
            this.$el.querySelector('input')?.focus();
          });
        }
      },
      accept() {
        const state = this.showPrefs && !this.analyticsEnabled ? 'essential-only' : 'analytics';
        if (state === 'analytics') {
          this.analyticsEnabled = true;
          loadAnalytics();
        }
        writeStoredConsent(state);
        this.open = false;
        this.showPrefs = false;
        this.lastFocused?.focus?.();
      },
      decline() {
        this.analyticsEnabled = false;
        writeStoredConsent('rejected');
        this.open = false;
        this.showPrefs = false;
        this.lastFocused?.focus?.();
      }
    };
  };

  function initButtonDebounce() {
    document.addEventListener('click', function(e) {
      const btn = e.target.closest('.btn[disabled], button[disabled]');
      if (btn && !btn.classList.contains('allow-double')) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);
  }

  initButtonDebounce();
})();
