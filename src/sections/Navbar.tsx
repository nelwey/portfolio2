import { useLanguage } from '@/utils/LanguageContext';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import LanguageToggle from '../components/LanguageToggle';
import Logo from '../components/Logo';

function Navbar() {
  const { t } = useLanguage();
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [responsiveNavVisible, setResponsiveNavVisible] = useState(false);
  const sectionLinks = [
    { id: 'about', name: t.nav.about, link: '/#about' },
    { id: 'experience', name: t.nav.experience, link: '/#experience' },
    { id: 'work', name: t.nav.work, link: '/#work' },
    { id: 'contact', name: t.nav.contact, link: '/#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      window.pageYOffset > 100 ? setNavbarVisible(true) : setNavbarVisible(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll('.nav-items-list-item-link');
    links.forEach((link) => {
      link.addEventListener('click', () => setResponsiveNavVisible(false));
    });
    const nav = document.querySelector('.nav-items');
    nav?.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    const html = document.querySelector('html');
    html?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.closest('.language-toggle')) {
        return;
      }
      setResponsiveNavVisible(false);
    });
  }, []);

  useEffect(() => {
    const main = document.querySelector('main');
    if (responsiveNavVisible) {
      main?.classList.add('blur');
    } else {
      main?.classList.remove('blur');
    }
  }, [responsiveNavVisible]);

  return (
    <nav role="navigation" aria-label="Main navigation">
      <div className={`wrapper ${navbarVisible ? 'blur-nav' : ''}`}>
        <motion.div
          className="brand"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
          }}
        >
          <Link href="" aria-label="Homepage">
            <Logo />
          </Link>
        </motion.div>

        <motion.div
          className="nav-responsive-toggle"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            ease: 'easeInOut',
          }}
        >
          {responsiveNavVisible ? (
            <X
              onClick={(e) => {
                e.stopPropagation();
                setResponsiveNavVisible(false);
              }}
              size={24}
              aria-label="Close navigation menu"
              role="button"
              tabIndex={0}
            />
          ) : (
            <Menu
              onClick={(e) => {
                e.stopPropagation();
                setResponsiveNavVisible(true);
              }}
              size={24}
              aria-label="Open navigation menu"
              role="button"
              tabIndex={0}
              aria-expanded={responsiveNavVisible}
              aria-controls="nav-menu"
            />
          )}
        </motion.div>

        <div
          id="nav-menu"
          className={`${responsiveNavVisible ? 'nav-responsive' : ''} nav-items`}
        >
          <ul className="nav-items-list">
            {sectionLinks.map(({ id, name, link }, index) => (
              <motion.li
                key={id}
                className="nav-items-list-item"
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                  delay: 0.1 + index * 0.1,
                }}
              >
                <Link
                  href={link}
                  className="nav-items-list-item-link"
                  aria-label={`Navigate to ${name}`}
                >
                  {name}
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="nav-items-actions">
            <LanguageToggle />
            <div className="nav-items-button">
              <Button
                text={t.nav.resume}
                link="https://drive.google.com/file/d/16z3b60XrAoP4aVRehl_W7W436gmej_P1/view?usp=sharing"
                variant="outline"
                size="sm"
                showExternalIcon={true}
                className="resume-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
