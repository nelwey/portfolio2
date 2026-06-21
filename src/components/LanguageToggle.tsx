import { useLanguage } from '@/utils/LanguageContext';
import { Locale } from '@/utils/translations';

function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  const handleSelect = (nextLocale: Locale) => {
    setLocale(nextLocale);
  };

  return (
    <div className="language-toggle" role="group" aria-label="Language selector">
      <button
        type="button"
        className={`language-toggle-btn ${locale === 'en' ? 'language-toggle-btn--active' : ''}`}
        onClick={() => handleSelect('en')}
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
      <span className="language-toggle-divider" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        className={`language-toggle-btn ${locale === 'ru' ? 'language-toggle-btn--active' : ''}`}
        onClick={() => handleSelect('ru')}
        aria-pressed={locale === 'ru'}
      >
        RU
      </button>
    </div>
  );
}

export default LanguageToggle;
