import { useLanguage } from '@/utils/LanguageContext';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import Navbar from '../sections/Navbar';

type IntroPhase = 'warning' | 'question' | 'content';

// Each value is when that phase hands over, measured from mount.
const PHASE_TIMINGS: Record<'question' | 'content', number> = {
  question: 1900,
  content: 4000,
};

const CROSSFADE = 0.5;

function Lore() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<IntroPhase>('warning');

  const skipIntro = useCallback(() => setPhase('content'), []);

  useEffect(() => {
    if (shouldReduceMotion) {
      setPhase('content');
      return;
    }

    const timers = [
      window.setTimeout(() => setPhase('question'), PHASE_TIMINGS.question),
      window.setTimeout(() => setPhase('content'), PHASE_TIMINGS.content),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [shouldReduceMotion]);

  // The overlay covers the viewport, so scrolling behind it would be disorienting.
  useEffect(() => {
    if (phase === 'content') return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [phase]);

  useEffect(() => {
    if (phase === 'content') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
        skipIntro();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [phase, skipIntro]);

  const introVisible = phase !== 'content';

  return (
    <div className="app">
      <Head>
        <title key={t.lore.meta.title}>{t.lore.meta.title}</title>
        <meta key={t.lore.meta.description} name="description" content={t.lore.meta.description} />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <AnimatePresence>
        {introVisible && (
          <motion.div
            key="lore-intro"
            className="lore-intro"
            role="button"
            tabIndex={0}
            aria-label={t.lore.intro.skipLabel}
            onClick={skipIntro}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={phase}
                className={`lore-intro-line lore-intro-line--${phase}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: CROSSFADE, ease: 'easeInOut' }}
              >
                {phase === 'warning' ? t.lore.intro.warning : t.lore.intro.question}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <motion.main
        className="lore"
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        animate={{
          opacity: introVisible ? 0 : 1,
          y: introVisible && !shouldReduceMotion ? 16 : 0,
        }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: introVisible ? 0 : 0.2 }}
      >
        <header className="lore-header">
          <h1 className="lore-title">{t.lore.title}</h1>
          <p className="lore-lede">{t.lore.lede}</p>
        </header>

        <div className="lore-intro-copy">
          {t.lore.paragraphs.map((paragraph) => (
            <p key={paragraph} className="lore-text">
              {paragraph}
            </p>
          ))}
        </div>

        <section className="lore-section">
          <h2 className="lore-section-title">{t.lore.favorites.title}</h2>
          <dl className="lore-favorites">
            {t.lore.favorites.items.map((item) => (
              <div key={item.label} className="lore-favorites-item">
                <dt className="lore-favorites-label">{item.label}</dt>
                <dd className="lore-favorites-value">
                  {item.lines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="lore-section">
          <h2 className="lore-section-title">{t.lore.facts.title}</h2>
          <ul className="lore-list">
            {t.lore.facts.items.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </section>

        <section className="lore-section">
          <h2 className="lore-section-title">{t.lore.happy.title}</h2>
          <ul className="lore-list">
            {t.lore.happy.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="lore-section">
          <h2 className="lore-section-title">{t.lore.annoyances.title}</h2>
          <div className="lore-lines">
            {t.lore.annoyances.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <section className="lore-section">
          <h2 className="lore-section-title">{t.lore.uselessSkills.title}</h2>
          <div className="lore-lines">
            {t.lore.uselessSkills.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <section className="lore-section">
          <h2 className="lore-section-title">{t.lore.lifeGoal.title}</h2>
          <div className="lore-lines">
            {t.lore.lifeGoal.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </section>

        <section className="lore-section">
          <h2 className="lore-section-title">{t.lore.faq.title}</h2>
          <dl className="lore-faq">
            {t.lore.faq.items.map((item) => (
              <div key={item.question} className="lore-faq-item">
                <dt className="lore-faq-question">{item.question}</dt>
                <dd className="lore-faq-answer">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="lore-outro">
          <p>{t.lore.outro}</p>
          <Link href="/" className="lore-back link">
            {t.lore.backHome}
          </Link>
        </div>
      </motion.main>
    </div>
  );
}

export default Lore;
