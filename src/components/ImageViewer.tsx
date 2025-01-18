import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageViewerProps {
  images: string[];
  selectedImage: string;
  onClose: () => void;
  title: string;
  category: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images, selectedImage, onClose, title, category }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = React.useState(images.indexOf(selectedImage));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (viewerRef.current && !viewerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'ArrowLeft') {
        navigateImages('prev');
      } else if (event.key === 'ArrowRight') {
        navigateImages('next');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const navigateImages = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));
    } else {
      setCurrentIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click from propagating to the outer container
    e.stopPropagation();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div ref={viewerRef} className="relative w-full h-full flex items-center justify-center" onClick={handleClick}>
        {/* Title and Category */}
        <div className="absolute top-8 left-8 text-white">
          <motion.span 
            className="text-sm text-[#FF4D4D] tracking-wider mb-2 block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {category}
          </motion.span>
          <motion.h2 
            className="text-2xl font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title}
          </motion.h2>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-8 right-8 text-white hover:text-[#FF4D4D] transition-colors duration-300 z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Navigation buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateImages('prev');
          }}
          className="absolute left-8 text-white hover:text-[#FF4D4D] transition-colors duration-300"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateImages('next');
          }}
          className="absolute right-8 text-white hover:text-[#FF4D4D] transition-colors duration-300"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Image container */}
        <div className="w-full h-full flex items-center justify-center p-16">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Viewing image ${currentIndex + 1}`}
              className="max-h-[80vh] w-auto object-contain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            />
          </AnimatePresence>
        </div>

        {/* Image counter */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </motion.div>
  );
};

export default ImageViewer;
