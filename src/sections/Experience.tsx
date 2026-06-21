import { useLanguage } from '@/utils/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

function Experience() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState(0);
  const [mounted, setMounted] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Scroll timeline to selected item on mobile
    if (timelineRef.current && window.innerWidth <= 768) {
      const container = timelineRef.current;
      const selectedItem = container.querySelector(`.timeline-item-${selected}`);
      if (selectedItem) {
        container.scrollTo({
          left: (selectedItem as HTMLElement).offsetLeft - 20,
          behavior: 'smooth'
        });
      }
    }
  }, [selected, mounted]);

  const experiences = t.experience.items.map((item, index) => ({
    ...item,
    url:
      index === 0
        ? 'https://www.linkedin.com/company/qallta/'
        : index === 1
          ? 'https://multigym.fit/'
          : 'https://v3.utepsa.edu/',
    color: '#03dac6',
    icon: index === 0 ? 'Q' : index === 1 ? 'M' : 'U',
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="experience"
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: -50 },
        hidden: { opacity: 0, y: 0 },
      }}
    >
      <div className="title">
        <h2>{t.experience.title}</h2>
      </div>

      <div className="experience-content-container">
        {/* Tabbed Navigation */}
        <div className="experience-tabs" ref={timelineRef}>
          {experiences.map((experience, index) => (
            <button
              key={`tab-${index}`}
              className={`experience-tab ${index === selected ? 'experience-tab-selected' : ''}`}
              onClick={() => setSelected(index)}
              style={{ borderColor: index === selected ? experience.color : 'transparent' }}
            >
              {experience.name}
            </button>
          ))}
        </div>

        {/* Experience Card */}
        <motion.div
          className="experience-card md-card"
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="experience-header"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="experience-title-container" variants={itemVariants}>
              <div className="experience-title-badge" style={{ backgroundColor: experiences[selected].color }}>
                {experiences[selected].icon}
              </div>
              <div>
                <h3 className="experience-title">
                  {experiences[selected].role}
                  <span className="experience-company">
                    &nbsp;@&nbsp;
                    <Link href={experiences[selected].url} legacyBehavior>
                      <a target="_blank" rel="noopener noreferrer" className="link">
                        {experiences[selected].name}
                      </a>
                    </Link>
                  </span>
                </h3>
                <p className="experience-date">
                  {experiences[selected].start} - {experiences[selected].end}
                </p>
              </div>
            </motion.div>

            <motion.div className="experience-description" variants={containerVariants}>
              {experiences[selected].shortDescription.map((description, index) => (
                <motion.div
                  key={index}
                  className="experience-item"
                  variants={itemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                >
                  <div className="experience-item-bullet" style={{ backgroundColor: experiences[selected].color }}></div>
                  <p>{description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Experience;
