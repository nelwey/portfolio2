import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Star, Clock, Award, Tag, Sparkles, Zap, GitFork, Loader2, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import Button3D from '@/components/Button3D';

function Projects() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [projectOfTheDay, setProjectOfTheDay] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [manualRepoInput, setManualRepoInput] = useState('');
  const [showRepoSelector, setShowRepoSelector] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const projectsData = [
    {
      video: 'https://www.youtube.com/embed/LurWJ21sPGQ',
      projectName: 'KubeWise',
      projectLink: 'https://github.com/lohitkolluri/KubeWise',
      projectDescription:
        'AI-powered guardian for Kubernetes that autonomously detects anomalies, diagnoses issues, and remediates problems. Built with Python, Google Gemini AI, and Prometheus for intelligent cluster management.',
      projectTech: ['Kubernetes', 'Google Gemini AI', 'Prometheus', 'FastAPI'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/KubeWise',
        externalLink: 'https://github.com/lohitkolluri/KubeWise',
      },
      featured: true,
      timeframe: '2023',
      accolades: 'Achieved Runner-Up at DevSummit 2025 (DevTrails University Hackathon) among 730+ teams and 3000 participants',
    },
    {
      video: 'https://www.youtube.com/embed/_zZ1Ndt5diU',
      projectName: 'QueryLens',
      projectLink: 'https://trynlp2sql.streamlit.app/',
      projectDescription:
        'QueryLens converts natural language to SQL queries, streamlining database interactions through intuitive processing.',
      projectTech: ['Streamlit', 'Azure OpenAI', 'SQLite3', 'Altair'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/NLP2SQL',
        externalLink: 'https://trynlp2sql.streamlit.app/',
      },
      featured: true,
      timeframe: '2024',
      accolades: '2nd Runner Up at SEED Global Education Hackathon among 700+ teams',
    },
    {
      image: '/projects/project2.webp',
      projectName: 'FlaskPost',
      projectLink: 'https://flask-post.vercel.app/',
      projectDescription:
        'A FastAPI-powered mass email platform featuring SMTP configuration, CSV recipient management, and HTML template customization with live preview functionality.',
      projectTech: ['FastAPI', 'REST API', 'Jinja2', 'Fast Mail'],
      projectExternalLinks: {
        github: 'https://github.com/lohitkolluri/FlaskPost',
        externalLink: 'https://github.com/lohitkolluri/FlaskPost',
      },
      featured: false,
      timeframe: '2024',
    },
  ];

  // // Generate a random recent date for "last commit" or "last activity"
  // const getRandomDateWithinLastWeek = () => {
  //   const today = new Date();
  //   const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  //   const randomTime = lastWeek.getTime() + Math.random() * (today.getTime() - lastWeek.getTime());
  //   const randomDate = new Date(randomTime);
    
  //   return randomDate.toLocaleDateString('en-US', { 
  //     month: 'short', 
  //     day: 'numeric',
  //     year: 'numeric'
  //   });
  // };

  // // Generate an AI insight about the project
  // const generateAIInsight = (projectName: string, technologies: string[]) => {
  //   const insights = [
  //     `Integrating CI/CD could significantly streamline deployments for ${projectName}.`,
  //     `The maintainability of ${projectName} could be enhanced by adding unit tests.`,
  //     `${projectName} features a well-structured codebase with clear separation of concerns.`,
  //     `A more modular architecture could improve the scalability of ${projectName}.`,
  //     `Comprehensive documentation would make ${projectName} more accessible to users and contributors.`,
  //     `Focusing on performance optimizations could greatly enhance the user experience for ${projectName}.`,
  //     `${projectName} effectively leverages the best practices of ${technologies[0]}.`,
  //     `Expanding functionality for ${projectName} could be achieved by integrating with ${technologies[technologies.length-1]}.`,
  //     `The repository for ${projectName} is well-maintained, as indicated by code quality metrics.`,
  //     `Containerizing ${projectName} would simplify its deployment process.`
  //   ];
    
  //   return insights[Math.floor(Math.random() * insights.length)];
  // };

  // Function to manually change the project of the day
  // const changeProjectOfTheDay = async (repoName?: string) => {
  //   try {
  //     setIsLoading(true);
  //     setError(null);
      
  //     const apiUrl = repoName 
  //       ? `/api/projectOfTheDay?repo=${encodeURIComponent(repoName)}`
  //       : '/api/projectOfTheDay';
        
  //     const response = await fetch(apiUrl);
      
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch project of the day');
  //     }
      
  //     const data = await response.json();
      
  //     // Format the project data
  //     const formattedProject = {
  //       projectName: data.name,
  //       projectDescription: data.description,
  //       projectLink: data.homepage || data.url,
  //       projectTech: data.technologies || [data.language],
  //       projectExternalLinks: {
  //         github: data.url,
  //         externalLink: data.homepage || data.url,
  //       },
  //       image: '/projects/default-project.webp',
  //       lastActivity: new Date(data.lastCommitDate || data.lastUpdate).toLocaleDateString('en-US', { 
  //         month: 'short', 
  //         day: 'numeric',
  //         year: 'numeric'
  //       }),
  //       aiInsight: data.aiInsight,
  //       stars: data.stars,
  //       forks: data.forks,
  //     };
      
  //     setProjectOfTheDay(formattedProject);
  //     setIframeLoaded(false);
  //     setIframeError(false);
  //     setManualRepoInput('');
  //     setShowRepoSelector(false);
  //   } catch (err) {
  //     console.error('Error fetching project of the day:', err);
  //     setError('Failed to load project of the day');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  
  // Fetch Project of the Day data on initial load
  // useEffect(() => {
  //   changeProjectOfTheDay();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
      },
    },
  };

  const featuredProjects = projectsData.filter(project => project.featured);

  // Helper function to check if project has a valid external link
  const hasValidExternalLink = (project: any): boolean => {
    if (!project) return false;
    const link = project.projectLink || project.projectExternalLinks?.externalLink;
    return Boolean(link) && 
      link.startsWith('http') && 
      !link.includes('github.com') &&
      !link.includes('localhost');
  };

  // Helper function to get the valid external link
  const getValidExternalLink = (project: any): string => {
    return project.projectLink || project.projectExternalLinks?.externalLink || '';
  };

  // Handle iframe load success
  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setIframeError(false);
  };

  // Handle iframe load error
  const handleIframeError = () => {
    setIframeLoaded(false);
    setIframeError(true);
  };

  return (
    <div id="work" className="projects" style={{ paddingTop: '170px' }} ref={containerRef}>
      <motion.div
        className="title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={{
          visible: { opacity: 1, y: -50 },
          hidden: { opacity: 0, y: 0 },
        }}
      >
        <h2>Some Things I&apos;ve Built</h2>
      </motion.div>

     

      <motion.div 
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        style={{ opacity }}
      >
        {projectsData.map(
          ({
            image = '/projects/default-project.webp',
            video,
            projectDescription,
            projectLink,
            projectExternalLinks,
            projectName,
            projectTech,
            featured,
            timeframe,
            accolades,
          }, index) => {
            const hasVideo = video && (projectName === 'QueryLens' || projectName === 'KubeWise');
            const isEven = index % 2 === 1;
            
            return (
              <motion.div
                className={`project bg-gradient-to-tr from-purple-600/20 via-indigo-500/10 to-pink-500/20 p-[1px] rounded-xl transition-transform transform hover:scale-[1.02] duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 ${
                  hoveredProject === projectName ? 'is-hovered' : ''
                } ${isEven ? 'even-project' : 'odd-project'}`}
                key={projectName}
                variants={itemVariants}
                onMouseEnter={() => setHoveredProject(projectName)}
                onMouseLeave={() => setHoveredProject(null)}
                whileHover={{
                  boxShadow: "0 10px 30px -15px rgba(100, 255, 218, 0.2)",
                  borderColor: "rgba(100, 255, 218, 0.3)",
                }}
              >
                <div className="project-inner bg-[#0f0f0f] rounded-[inherit]">
                  <div 
                    className={`project-image ${hasVideo ? 'has-video' : ''}`}
                    onClick={hasVideo ? undefined : () => window.open(projectLink, '_blank')}
                  >
                    <div className="project-image-overlay"></div>
                    <div className="project-image-container">
                      {hasVideo ? (
                        <iframe
                          src={video}
                          title={projectName}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="project-video"
                        ></iframe>
                      ) : (
                        <Image src={image} fill loading="lazy" alt={projectName} quality={100} />
                      )}
                    </div>
                    {featured && (
                      <motion.div 
                        className="featured-badge"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                      >
                        <Star size={14} />
                        <span>Top Project</span>
                      </motion.div>
                    )}
                  </div>
                  <motion.div
                    className="project-info"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="project-meta">
                      <div className="meta-flex">
                      </div>
                    </div>
                    <h3 className="project-info-title">
                      <motion.span
                        className="cursor-pointer"
                        onClick={() => window.open(projectLink, '_blank')}
                        whileHover={{ color: 'var(--theme-color)' }}
                      >
                        {projectName}
                      </motion.span>
                    </h3>
                    <motion.div 
                      className="project-info-description"
                      whileHover={{ 
                        boxShadow: "0 15px 30px -15px rgba(2,12,27,0.8)",
                        y: -5
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <p>{projectDescription}</p>
                      {accolades && (
                        <div className="project-accolades">
                          <Award size={14} />
                          <span>{accolades}</span>
                        </div>
                      )}
                    </motion.div>
                    <ul className="project-info-tech-list">
                      {projectTech.map((tech) => (
                        <motion.li
                          className="project-info-tech-list-item"
                          key={tech}
                          whileHover={{ y: -2, color: 'var(--theme-color)' }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.li>
                      ))}
                    </ul>
                    <div className="project-info-links mt-4">
                      <Button3D
                        text="View Project"
                        link={projectLink}
                        color="primary"
                        className="mr-3"
                      />
                      <Button3D
                        text="GitHub"
                        link={projectExternalLinks.github}
                        color="secondary"
                        icon={<Github size={16} />}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          },
        )}
      </motion.div>
    </div>
  );
}

export default Projects;
