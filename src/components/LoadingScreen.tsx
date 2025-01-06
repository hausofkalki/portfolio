import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 0); // Simulate loading progress

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-white z-50"
    >
      <div className="relative flex items-center justify-center">
        <svg className="w-24 h-24 md:w-32 md:h-32" viewBox="0 0 100 100">
          <circle
            className="text-gray-300"
            strokeWidth="4"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
          />
          <motion.circle
            className="text-terra"
            strokeWidth="4"
            strokeDasharray="282.6"
            strokeDashoffset={282.6 - (282.6 * progress) / 100}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="45"
            cx="50"
            cy="50"
            initial={{ strokeDashoffset: 282.6 }}
            animate={{ strokeDashoffset: 282.6 - (282.6 * progress) / 100 }}
            transition={{ duration: 0.2 }}
            transform="rotate(-90 50 50)" // Rotate to start from top
          />
        </svg>
        <div className="absolute flex items-center justify-center">
          <Logo className="w-12 h-12 md:w-16 md:h-16 text-terra" />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;