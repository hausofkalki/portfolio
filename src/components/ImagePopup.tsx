import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageViewer from './ImageViewer';

type ImagePopupProps = {
  images: string[];
  onClose: () => void;
  title: string;
  category: string;
};

const ImagePopup: React.FC<ImagePopupProps> = ({ images, onClose, title, category }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  const closeViewer = () => {
    setSelectedImage(null);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute top-24 right-16 flex items-center gap-8">
          <button 
            onClick={onClose} 
            className="text-white hover:text-[#FF4D4D] transition-colors duration-300"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 py-16">
          <div className="mb-12">
            <motion.span 
              className="text-sm text-[#FF4D4D] tracking-wider mb-4 block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {category}
            </motion.span>
            <motion.h2 
              className="text-4xl text-white font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {title}
            </motion.h2>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-[4/3] overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => handleImageClick(image)}
              >
                <img
                  src={image}
                  alt={`Project image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm tracking-wider mr-2">VIEW IMAGE</span>
                  <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m21 21-3.5-3.5M10 7v6m-3-3h6m4 0a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {selectedImage && (
          <ImageViewer 
            images={images} 
            selectedImage={selectedImage} 
            onClose={closeViewer} 
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ImagePopup; 