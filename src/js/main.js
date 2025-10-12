import Alpine from 'alpinejs';
import '../styles/tailwind.css';

const STORAGE_KEY = 'erikleuning-theme';
const NAV_ITEMS = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'over-mij', label: 'Over mij', href: '#over-mij' },
  { id: 'doelgroep', label: 'Doelgroep', href: '#doelgroep' },
  { id: 'werkwijze', label: 'Werkwijze', href: '#werkwijze' },
  { id: 'visie', label: 'Visie', href: '#visie' },
  { id: 'werkgebied', label: 'Werkgebied', href: '#werkgebied' },
  { id: 'contact', label: 'Contact', href: '#contact' },
  { id: 'privacy', label: 'Privacy', href: 'privacyverklaring.html' }
];

const prefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function readStoredTheme() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === null) {
    return prefersDark();
  }
  return stored === 'dark';
}

Alpine.store('navigatie', {
  items: NAV_ITEMS
});

Alpine.data('siteHeader', (currentPage) => ({
  pagina: currentPage,
  mobileOpen: false,
  isDark: false,
  activeSection: 'home',
  sectionObserver: null,
  sectionsList: [],
  sectionsIndex: new Map(),
  updateFromScroll: null,
  init() {
    this.isDark = readStoredTheme();
    applyTheme(this.isDark);
    this.$watch('isDark', (value) => {
      localStorage.setItem(STORAGE_KEY, value ? 'dark' : 'light');
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
    if (item.id === 'privacy') {
      return this.pagina === 'privacy';
    }
    if (this.pagina !== 'home') {
      return item.id === this.pagina;
    }
    return (this.activeSection || 'home') === item.id;
  },
  navigate(event, item) {
    if (item.href.startsWith('#')) {
      if (this.pagina !== 'home') {
        event.preventDefault();
        window.location.href = `index.html${item.href}`;
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
    if (!panel) {
      return;
    }
    if (!panel.contains(event.target)) {
      const focusable = panel.querySelectorAll('a, button');
      if (focusable.length) {
        focusable[0].focus();
      }
    }
  }
}));

Alpine.data('cookieBanner', () => ({
  open: false,
  init() {
    const consent = localStorage.getItem('erikleuning-cookie-consent');
    if (consent !== 'accepted' && consent !== 'declined') {
      window.setTimeout(() => {
        this.open = true;
      }, 600);
    }
  },
  accept() {
    localStorage.setItem('erikleuning-cookie-consent', 'accepted');
    this.open = false;
  },
  decline() {
    localStorage.setItem('erikleuning-cookie-consent', 'declined');
    this.open = false;
  }
}));

window.Alpine = Alpine;

Alpine.start();

const hydrateEmailLinks = () => {
  const elements = document.querySelectorAll('[data-email-user][data-email-domain][data-email-tld]');
  elements.forEach((el) => {
    const user = el.getAttribute('data-email-user');
    const domain = el.getAttribute('data-email-domain');
    const tld = el.getAttribute('data-email-tld');
    if (!user || !domain || !tld) {
      return;
    }
    const email = `${user}@${domain}.${tld}`;
    if (el.tagName === 'A') {
      el.setAttribute('href', `mailto:${email}`);
      if (!el.textContent.trim() || el.textContent.includes('[at]')) {
        el.textContent = email;
      }
    } else {
      el.textContent = email;
    }
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    hydrateEmailLinks();
  }, { once: true });
} else {
  hydrateEmailLinks();
}
