(function () {
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

  const prefersDark = () =>
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: dark)').matches;

  function applyTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  function readStoredTheme() {
    try {
      const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === null) {
        return prefersDark();
      }
      return stored === 'dark';
    } catch (error) {
      return prefersDark();
    }
  }

  function writeStoredTheme(isDark) {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    } catch (error) {
      // Ignore storage errors (e.g. private browsing)
    }
  }

  function canStore() {
    try {
      const key = '__consent_test__';
      window.localStorage.setItem(key, '1');
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      return false;
    }
  }

  function readStoredConsent() {
    try {
      const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const data = JSON.parse(raw);
      if (!data || !data.state || !data.timestamp) {
        return null;
      }
      if (Date.now() - data.timestamp > CONSENT_TTL_MS) {
        window.localStorage.removeItem(CONSENT_STORAGE_KEY);
        return null;
      }
      return data.state;
    } catch (error) {
      return null;
    }
  }

  function writeStoredConsent(state) {
    try {
      window.localStorage.setItem(
        CONSENT_STORAGE_KEY,
        JSON.stringify({ state, timestamp: Date.now() })
      );
    } catch (error) {
      // Ignore storage errors
    }
  }

  function loadAnalytics() {
    if (window.__analyticsLoaded) {
      return;
    }
    window.__analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_ID);
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`;
    document.head.appendChild(script);
  }

  applyTheme(readStoredTheme());

  function hydrateEmailAddresses() {
    const nodes = document.querySelectorAll('[data-email-user][data-email-domain][data-email-tld]');
    nodes.forEach((node) => {
      const { emailUser, emailDomain, emailTld } = node.dataset;
      if (!emailUser || !emailDomain || !emailTld) {
        return;
      }
      const address = `${emailUser}@${emailDomain}.${emailTld}`;
      if (node.tagName.toLowerCase() === 'a') {
        node.setAttribute('href', `mailto:${address}`);
        const existingRel = node.getAttribute('rel');
        if (!existingRel) {
          node.setAttribute('rel', 'nofollow');
        } else if (!/nofollow/.test(existingRel)) {
          node.setAttribute('rel', `${existingRel} nofollow`.trim());
        }
      }
      node.textContent = address;
      node.removeAttribute('data-email-user');
      node.removeAttribute('data-email-domain');
      node.removeAttribute('data-email-tld');
    });
  }

  function initEmailProtection() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', hydrateEmailAddresses, { once: true });
    } else {
      hydrateEmailAddresses();
    }
  }

  initEmailProtection();

  function initBackToTop() {
    const setup = () => {
      const button = document.querySelector('[data-back-to-top]');
      if (!button) {
        return;
      }

      const toggleVisibility = () => {
        if (window.scrollY > 320) {
          button.classList.add('is-visible');
        } else {
          button.classList.remove('is-visible');
        }
      };

      button.addEventListener('click', (event) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.addEventListener('scroll', toggleVisibility, { passive: true });
      toggleVisibility();
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup, { once: true });
    } else {
      setup();
    }
  }

  initBackToTop();

  window.siteHeader = function siteHeader(currentPage) {
    return {
      pagina: currentPage,
      navItems: NAV_ITEMS,
      mobileOpen: false,
      isDark: false,
      activeSection: 'welkom',
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
          this.$nextTick(() => {
            const focusable = this.$refs.mobilePanel?.querySelectorAll('a, button');
            focusable?.[0]?.focus();
          });
        }
      },
      closeMenu() {
        this.mobileOpen = false;
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

})();
