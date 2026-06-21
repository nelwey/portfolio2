import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Locale, translations, Translations } from './translations';

const LOCALE_STORAGE_KEY = 'portfolio-locale';

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return stored === 'ru' ? 'ru' : 'en';
};

interface AppContextType {
  lastScrollY: number;
  setLastScrollY: (position: number) => void;
  isMobile: boolean;
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Translations;
}

const defaultContext: AppContextType = {
  lastScrollY: 0,
  setLastScrollY: () => {},
  isMobile: false,
  menuOpen: false,
  toggleMenu: () => {},
  closeMenu: () => {},
  locale: 'en',
  setLocale: () => {},
  toggleLocale: () => {},
  t: translations.en,
};

const AppContext = createContext<AppContextType>(defaultContext);

export const useAppContext = () => useContext(AppContext);
export const useLanguage = () => {
  const { locale, setLocale, toggleLocale, t } = useAppContext();
  return { locale, setLocale, toggleLocale, t };
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [locale, setLocaleState] = useState<Locale>('en');
  const [localeReady, setLocaleReady] = useState(false);

  useEffect(() => {
    setLocaleState(getInitialLocale());
    setLocaleReady(true);
  }, []);

  useEffect(() => {
    if (!localeReady) return;

    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    document.documentElement.lang = locale;
  }, [locale, localeReady]);

  const toggleMenu = () => setMenuOpen((open) => !open);
  const closeMenu = () => setMenuOpen(false);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((current) => (current === 'en' ? 'ru' : 'en'));
  }, []);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      closeMenu();
    }
  }, [isMobile]);

  const value = useMemo(
    () => ({
      lastScrollY,
      setLastScrollY,
      isMobile,
      menuOpen,
      toggleMenu,
      closeMenu,
      locale,
      setLocale,
      toggleLocale,
      t: translations[locale],
    }),
    [lastScrollY, isMobile, menuOpen, locale, setLocale, toggleLocale],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
