import { useLanguage } from '@/utils/ThemeContext';
import { Locale } from '@/utils/translations';
import { MouseEvent } from 'react';

function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const handleSelect = (event: MouseEvent, nextLocale: Locale) => {
    event.preventDefault();
    event.stopPropagation();
    setLocale(nextLocale);
  };

  return (
    <div className="language-toggle" role="group" aria-label="Language selector">
      <span
        role="button"
        tabIndex={0}
        className={`language-toggle-btn ${locale === 'en' ? 'language-toggle-btn--active' : ''}`}
        onMouseDown={(event) => handleSelect(event, 'en')}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setLocale('en');
          }
        }}
        aria-pressed={locale === 'en'}
      >
        EN
      </span>
      <span className="language-toggle-divider" aria-hidden="true">
        /
      </span>
      <span
        role="button"
        tabIndex={0}
        className={`language-toggle-btn ${locale === 'ru' ? 'language-toggle-btn--active' : ''}`}
        onMouseDown={(event) => handleSelect(event, 'ru')}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setLocale('ru');
          }
        }}
        aria-pressed={locale === 'ru'}
      >
        RU
      </span>
    </div>
  );
}

export default LanguageToggle;
