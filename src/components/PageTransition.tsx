import { motion } from 'framer-motion';
import { useTransition } from '../context/TransitionContext';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { clickPosition } = useTransition();

  return (
    <>
      <motion.div 
        className="relative z-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          transition: { 
            delay: 0.25,
            duration: 0.3,
            ease: "easeInOut"
          }
        }}
      >
        {children}
      </motion.div>
      {/* Terra color transition layer */}
      <motion.div
        initial={{ 
          clipPath: `circle(200% at ${clickPosition.x}px ${clickPosition.y}px)`,
          backgroundColor: '#C84C35',
        }}
        animate={{ 
          clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
          backgroundColor: '#C84C35',
        }}
        exit={{ 
          clipPath: `circle(200% at ${clickPosition.x}px ${clickPosition.y}px)`,
          backgroundColor: '#C84C35',
        }}
        transition={{
          duration: 0.3,
          ease: [0.24, 1, 0.24, 1]
        }}
        className="fixed inset-0 pointer-events-none z-30"
      />
      {/* White transition layer */}
      <motion.div
        initial={{ 
          clipPath: `circle(200% at ${clickPosition.x}px ${clickPosition.y}px)`,
          backgroundColor: '#FFFFFF',
        }}
        animate={{ 
          clipPath: `circle(0px at ${clickPosition.x}px ${clickPosition.y}px)`,
          backgroundColor: '#FFFFFF',
        }}
        exit={{ 
          clipPath: `circle(200% at ${clickPosition.x}px ${clickPosition.y}px)`,
          backgroundColor: '#FFFFFF',
        }}
        transition={{
          duration: 0.35,
          delay: 0.07,
          ease: [0.36, 1, 0.36, 1]
        }}
        className="fixed inset-0 pointer-events-none z-20"
      />
    </>
  );
};