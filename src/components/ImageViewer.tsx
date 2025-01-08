import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

type ImageViewerProps = {
  images: string[];
  selectedImage: string;
  onClose: () => void;
};

const ImageViewer: React.FC<ImageViewerProps> = ({ images, selectedImage, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(images.indexOf(selectedImage));
  const viewerRef = useRef<HTMLDivElement>(null); // Reference for the viewer

  const LeftArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  
  const RightArrow = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Add useEffect to handle body overflow
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black bg-opacity-90">
      <motion.div
        ref={viewerRef}
        className="relative max-w-6xl w-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-white text-4xl">
          &times;
        </button>
        <img src={images[currentIndex]} alt={`Image ${currentIndex + 1}`} className="w-full h-auto rounded" />
        <div className="absolute top-1/2 left-0 right-0 flex justify-between">
          <button
            onClick={handlePrev}
            className="text-white bg-black bg-opacity-50 p-4 rounded-l hover:bg-opacity-70 transition duration-300"
          >
            <LeftArrow />
          </button>
          <button
            onClick={handleNext}
            className="text-white bg-black bg-opacity-50 p-4 rounded-r hover:bg-opacity-70 transition duration-300"
          >
            <RightArrow />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageViewer;
