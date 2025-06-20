import { motion, Variants } from 'framer-motion';

const pathVariants: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
    },
  },
};

const floatVariants: Variants = {
  hidden: { x: 0 },
  visible: {
    x: [0, 2, 0, -2, 0],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

function Logo() {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 82.82 89.84"
      style={{ height: '100%', width: 'auto' }}
      initial="hidden"
      animate="visible"
    >
      <g>
        {/* Main shape */}
        <motion.path
          d="M66.52,9.99L20.26,75.03,0,70.24,46.26,5.2l20.26,4.79ZM82.82,89.84l-20.13-4.76-2.22-12.36-28.2-6.68,9.8-13.96,15.38,3.64-3.46-19.71,16.63-25.05,12.2,78.88Z"
          fill="#bb86fc"
          stroke="#bb86fc"
          strokeWidth="0.5"
          variants={pathVariants}
        />

        {/* Floating detail paths */}
        <motion.path
          d="M63.29.89l6.34.2-2.16,2.85-4.9-.13,1.47,4.66-2.16,2.85-1.9-6.04,3.33-4.39Z"
          fill="#59bddd"
          variants={floatVariants}
        />
        <motion.path
          d="M77.47,15.7l-6.33.18,1.99-2.98,4.88-.14-1.73-4.59,1.99-2.98,2.27,5.92-3.06,4.59Z"
          fill="#59bddd"
          variants={floatVariants}
        />
        <motion.path
          d="M76.92.54l-16.76,24.23-2.61-.54L74.31,0l2.61.54Z"
          fill="#59bddd"
          variants={floatVariants}
        />
      </g>
    </motion.svg>
  );
}

export default Logo;
