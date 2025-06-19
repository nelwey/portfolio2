/* eslint-disable @next/next/no-img-element */
import { motion, useInView, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState, useCallback } from 'react';
import { isInViewport } from '@/utils/scrollAnimation';

interface AboutText {
  intro: string;
  experience: string;
}

const mobileText: AboutText = {
  intro:
    'Hi there! I’m Andres, a Full-Stack Developer with over 3 years of experience building web applications from concept to deployment. I specialize in creating responsive, user-friendly interfaces with React, Vue.js, and modern JavaScript, while also developing efficient back-end systems using Node.js, Express, and C#. Currently based in Saint Petersburg, Russia, I’m pursuing a Master’s degree in Large-Scale Distributed Data Systems, where I’m deepening my expertise in scalable architectures, data processing, and cloud-native solutions.',
  experience:
    'I thrive on turning ideas into efficient, user-friendly solutions—whether optimizing front-end performance, designing scalable APIs, or ensuring seamless functionality through rigorous testing.',
};

const desktopText: AboutText = {
  intro:
    'Hi there! I’m Andres, a Full-Stack Developer with over 3 years of experience building web applications from concept to deployment. I specialize in creating responsive, user-friendly interfaces with React, Vue.js, and modern JavaScript, while also developing efficient back-end systems using Node.js, Express, and C#. Currently based in Saint Petersburg, Russia, I’m pursuing a Master’s degree in Large-Scale Distributed Data Systems, where I’m deepening my expertise in scalable architectures, data processing, and cloud-native solutions.',
  experience:
    'I’m passionate about writing clean, maintainable code and thrive in collaborative environments where I can contribute to both technical solutions and product strategy. Whether it’s troubleshooting complex issues or implementing new features, I approach every challenge with a detail-oriented mindset and a commitment to delivering high-quality results.',
};

// Skill definitions with icons from Simple Icons CDN
interface Skill {
  name: string;
  icon: string;
}

const technologiesLine1: Skill[] = [
  { name: 'Angular', icon: 'https://cdn.simpleicons.org/angular/white' },
  { name: 'SQL', icon: 'https://cdn.simpleicons.org/postgresql/white' },
  { name: 'HTML5', icon: 'https://cdn.simpleicons.org/html5/white' },
  { name: 'CSS3', icon: 'https://cdn.simpleicons.org/css/white' },
  { name: 'AWS', icon: 'https://cdn.simpleicons.org/icloud/white' },
  { name: 'Azure', icon: 'https://cdn.simpleicons.org/icloud/white' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/white' },
  { name: 'Vue', icon: 'https://cdn.simpleicons.org/vue.js/white' },
 
];

const technologiesLine2: Skill[] = [
 
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/white' },
  { name: 'MongoDB', icon: 'https://cdn.simpleicons.org/mongodb/white' },
  { name: 'React.js', icon: 'https://cdn.simpleicons.org/react/white' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/white' },
  { name: 'Three.js', icon: 'https://cdn.simpleicons.org/threedotjs/white' },
  { name: 'Tailwind CSS', icon: 'https://cdn.simpleicons.org/tailwindcss/white' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/white' },
  { name: 'Shadcn', icon: 'https://cdn.simpleicons.org/shadcnui/white' },
];

const variants = {
  visible: { opacity: 1, y: -50 },
  hidden: { opacity: 0, y: 0 },
};

function About() {
  const ref = useRef<HTMLDivElement>(null);
  const techSectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [isMobile, setIsMobile] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  useEffect(() => {
    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [checkMobile]);

  useEffect(() => {
    console.log('Element is in view: ', isInView);
  }, [isInView]);

  useEffect(() => {
    // Check visibility for scroll animations
    const handleScroll = () => {
      const section = document.querySelector('.about');
      if (section && isInViewport(section) && !isVisible) {
        setIsVisible(true);
        controls.start({ opacity: 1, y: 0 });
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial checks
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, controls]);

  // Create a larger array for truly seamless scrolling
  const generateSkillList = (technologies: Skill[]) => {
    // Create enough duplicates to ensure continuous scrolling
    // Triple the items to guarantee smooth looping
    return [...technologies, ...technologies, ...technologies];
  };

  const skillsRow1 = generateSkillList(technologiesLine1);
  const skillsRow2 = generateSkillList(technologiesLine2);

  return (
    <motion.div
      className={`about fade-in-section ${isVisible ? 'is-visible' : ''} section-transition`}
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <div className="title">
        <h2>About Me</h2>
      </div>
      <div className="about-grid">
        <div className="about-grid-info">
          <p className="about-grid-info-text text-justify text-base md:text-lg leading-relaxed">
            {isMobile ? mobileText.intro : desktopText.intro}
          </p>
          <p className="about-grid-info-text text-justify text-base md:text-lg leading-relaxed indent-4">
            {isMobile ? mobileText.experience : desktopText.experience}
          </p>
          
          <div className="tech-section" ref={techSectionRef}>
            <div className="tech-carousel">
              <div className="tech-container right-to-left">
                {skillsRow1.map((skill, index) => (
                  <motion.div
                    key={`line1-${skill.name}-${index}`} 
                    className="tech-badge"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: Math.min(index * 0.01, 0.2)
                      }
                    }}
                  >
                    <div className="tech-icon">
                      <img src={skill.icon} alt={`${skill.name} icon`} />
                    </div>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
              
              <div className="tech-container left-to-right">
                {skillsRow2.map((skill, index) => (
                  <motion.div
                    key={`line2-${skill.name}-${index}`} 
                    className="tech-badge"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        delay: Math.min(index * 0.01, 0.2)
                      }
                    }}
                  >
                    <div className="tech-icon">
                      <img src={skill.icon} alt={`${skill.name} icon`} />
                    </div>
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-grid-photo">
          <div className="overlay"></div>
          <div className="overlay-border"></div>
          <div className="about-grid-photo-container">
            {!imageError ? (
              <Image
                src="/etc/pp.jpg" 
                alt="Lohit Kolluri - DevOps & Cloud Solutions Engineer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                aria-label="Profile picture of Lohit Kolluri"
                onError={() => setImageError(true)}
              />
            ) : (
              <Image
                src="/etc/image.png" 
                alt="Lohit Kolluri - DevOps & Cloud Solutions Engineer"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{ objectFit: 'cover' }}
                className="rounded-lg"
                aria-label="Profile picture of Lohit Kolluri"
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
