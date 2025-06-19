import { AnimatePresence, motion, Variants } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

interface LoaderProps {
  isLoading: boolean;
  setIsLoading: () => void;
}

function Loader({ isLoading, setIsLoading }: LoaderProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading();
    }, 4000); // Increased duration to show full animation

    return () => clearTimeout(timeoutId);
  }, [setIsLoading]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const svgVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const pathVariants: Variants = {
    hidden: { 
      pathLength: 0, 
      opacity: 0,
      fillOpacity: 0 
    },
    visible: {
      pathLength: [0, 1],
      opacity: [0, 1],
      fillOpacity: [0, 0, 1], // Delay the fill
      transition: {
        pathLength: {
          duration: 2,
          ease: "linear",
        },
        opacity: {
          duration: 0.5
        },
        fillOpacity: {
          duration: 1,
          times: [0, 0.8, 1]
        }
      }
    },
    exit: { 
      pathLength: 0,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const floatingVariants: Variants = {
    hidden: { 
      opacity: 0,
      y: 0
    },
    visible: (i: number) => ({
      opacity: 1,
      y: [0, -5, 0],
      transition: {
        opacity: { duration: 0.5, delay: 0.5 + i * 0.2 },
        y: {
          duration: 2 + i,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay: 0.5 + i * 0.2
        }
      }
    }),
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Path data for the blue elements with adjusted positions
  const blueElements = [
    {
      d: "M63.29.89l6.34.2-2.16,2.85-4.9-.13,1.47,4.66-2.16,2.85-1.9-6.04,3.33-4.39Z",
      yOffset: 0
    },
    {
      d: "M77.47,15.7l-6.33.18,1.99-2.98,4.88-.14-1.73-4.59,1.99-2.98,2.27,5.92-3.06,4.59Z",
      yOffset: 2
    },
    {
      d: "M76.92.54l-16.76,24.23-2.61-.54L74.31,0l2.61.54Z",
      yOffset: -1
    }
  ];

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="loader"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: '#121212',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 82.82 89.84"
            variants={svgVariants}
            style={{ 
              width: '150px', 
              height: 'auto',
              overflow: 'visible'
            }}
          >
            <g>
              {/* Main shape with typewriter animation */}
              <motion.path
                d="M66.52,9.99L20.26,75.03,0,70.24,46.26,5.2l20.26,4.79ZM82.82,89.84l-20.13-4.76-2.22-12.36-28.2-6.68,9.8-13.96,15.38,3.64-3.46-19.71,16.63-25.05,12.2,78.88Z"
                fill="#bb86fc"
                stroke="#bb86fc"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={pathVariants}
              />

              {/* Floating blue elements with constrained movement */}
              {blueElements.map((element, i) => (
                <motion.path
                  key={i}
                  d={element.d}
                  fill="#59bddd"
                  variants={floatingVariants}
                  custom={i * 0.3}
                  style={{
                    transformOrigin: 'center',
                    transformBox: 'fill-box'
                  }}
                />
              ))}
            </g>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

export default Loader;