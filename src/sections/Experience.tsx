import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

function Experience() {
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

  const experiences = [
    {
      name: 'Q\'allta Software',
      role: 'Front End Developer',
      url: 'https://www.linkedin.com/company/qallta/',
      start: 'July 2021',
      end: 'February 2025',
      color: '#03dac6',
      icon: 'M',
      shortDescription: [
        'Developed full-stack solutions across diverse projects, initially building industrial management systems with C#, then ensuring quality as QA Engineer for the same platform',
        'Created responsive front-ends for web applications including an Airbnb-like marketplace using Vue.js, Vuetify and Tailwind CSS, delivering intuitive user experiences.',
        'Built interactive features for a blockchain gaming platform using Next.js, optimizing performance for real-time crypto transactions',
      ],
    },

    // {
    //   name: 'Apollo Tyres R&D',
    //   role: 'Project Trainee',
    //   url: 'https://www.apollotyres.com/',
    //   start: 'February 2024',
    //   end: 'May 2024',
    //   color: '#bb86fc',
    //   icon: 'A',
    //   shortDescription: [
    //     'Architected a robust backend using Django and PostgreSQL to handle over 200 concurrent simulations, resulting in a 40% improvement in system performance and data retrieval efficiency.',
    //     'Designed an interactive Chart.js dashboard for managers to track job assignments, completion rates, and real-time engineer performance across 300+ projects.',
    //     'Streamlined task management for a system handling over 1,000 tasks daily.',
    //     'Developed a web application that optimized the simulation workflow for Apollo Tyres, enhancing task allocation efficiency by approximately 30%.',
    //   ],
    // },
    {
      name: 'Multigym',
      role: 'Front End Developer',
      url: 'https://multigym.fit/',
      start: 'October 2019',
      end: 'February 2020',
      color: '#03dac6',
      icon: 'M',
      shortDescription: [
        'Architected and implemented the front-end of the website.',
        'Performed preventive maintenance of the lab computers.',
        'Put into practice my knowledge in research and web development areas.',
      ],
    },
    {
      name: ' Universidad Tecnológica Privada de Santa Cruz',
      role: 'Beca Instruccion',
      url: 'https://v3.utepsa.edu/',
      start: 'February 2018',
      end: 'February 2019',
      color: '#03dac6',
      icon: 'M',
      shortDescription: [
        'Helped teachers and students providing technical support in the systems labs.',
        'Performed preventive maintenance of the lab computers.',
        'Put into practice my knowledge in research and web development areas.',
      ],
    },

  ];

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
        <h2>Where I&apos;ve Worked</h2>
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
