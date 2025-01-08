"use client";
import { motion, useScroll, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import ImagePopup from '../components/ImagePopup';

type Step = {
  number: string;
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
  relatedImages: string[];
};

type Project = {
  title: string;
  steps: Step[];
};

const projects: Project[] = [
  {
    title: "Past Projects",
    steps: [
      {
        number: "01",
        title: "Modern Minimalist Villa",
        description:
          "A contemporary residential project emphasizing clean lines and natural light. The design focuses on creating seamless indoor-outdoor connections while maintaining privacy and comfort.",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
        category: "RESIDENTIAL",
        link: "https://example.com/modern-minimalist-villa",
        relatedImages: [
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
          // Add more related images here
        ],
      },
      {
        number: "02",
        title: "Urban Retail Experience",
        description:
          "Reimagining retail spaces for the modern consumer. This project combines digital integration with physical shopping experiences to create an immersive brand environment.",
        image:
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
        category: "COMMERCIAL",
        link: "https://example.com/urban-retail-experience",
        relatedImages: [
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
          // Add more related images here
        ],
      },
    ],
  },
  {
    title: "Current Projects",
    steps: [
      {
        number: "03",
        title: "Luxury Hotel Design",
        description:
          "A boutique hotel that blends local culture with contemporary luxury. Each space is carefully crafted to create memorable experiences for guests while maintaining functionality.",
        image:
          "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=2021&auto=format&fit=crop",
        category: "HOSPITALITY",
        link: "https://example.com/luxury-hotel-design",
        relatedImages: [
          "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=2021&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?q=80&w=2021&auto=format&fit=crop",
          // Add more related images here
        ],
      },
      {
        number: "04",
        title: "Corporate Headquarters",
        description:
          "A dynamic workplace designed for collaboration and innovation. The space reflects the company's values while providing flexible areas for different work styles.",
        image:
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
        category: "COMMERCIAL",
        link: "https://example.com/corporate-headquarters",
        relatedImages: [
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop",
          // Add more related images here
        ],
      },
    ],
  },
];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const [currentStep, setCurrentStep] = useState("01");
  //   const [currentProject, setCurrentProject] = useState('01');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupImages, setPopupImages] = useState<string[]>([]);
  const [popupTitle, setPopupTitle] = useState('');
  const [popupCategory, setPopupCategory] = useState('');

  const numberVariants = {
    enter: {
      y: -100,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: 100,
      opacity: 0,
    },
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";

    const container = containerRef.current;
    const handleScroll = () => {
      if (container) {
        if (container.scrollTop > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    container?.addEventListener("scroll", handleScroll);

    return () => {
      document.documentElement.style.scrollBehavior = "auto";
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleImageClick = (images: string[], title: string, category: string) => {
    setPopupImages(images);
    setPopupTitle(title);
    setPopupCategory(category);
    setIsPopupOpen(true);
  };

  return (
    <main
      className="bg-white relative snap-y snap-mandatory overflow-y-auto h-screen"
      ref={containerRef}
    >
      <Header
        isScrolled={isScrolled}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed bottom-8 md:bottom-12 left-0 right-0 h-1 bg-[#FF4D4D]"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0%",
        }}
      />

      {/* Fixed Number Display */}
      <div className="fixed bottom-4 md:bottom-4 lg:bottom-0 right-0 pointer-events-none grid grid-cols-2">
        <span className="text-[12rem] md:text-[20rem] lg:text-[32rem] font-light text-[#FF4D4D]/10 leading-none text-right">
          {currentStep.charAt(0)}
        </span>
        <div className="relative">
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={currentStep}
              variants={numberVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="text-[12rem] md:text-[20rem] lg:text-[32rem] font-light text-[#FF4D4D]/10 leading-none absolute left-0"
            >
              {currentStep.charAt(1)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Popup for related images */}
      {isPopupOpen && (
        <ImagePopup 
          images={popupImages} 
          onClose={() => setIsPopupOpen(false)}
          title={popupTitle}
          category={popupCategory}
        />
      )}

      {/* Project Sections */}
      {projects.map((project) =>
        project.steps.map((step) => (
          <motion.section
            key={step.number}
            className="min-h-screen snap-start snap-always flex items-center py-24 md:py-32 lg:py-36 relative px-4 md:px-16 lg:px-24"
            onViewportEnter={() => setCurrentStep(step.number)}
            viewport={{ amount: 0.5 }}
          >
            <div
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                parseInt(step.number) % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              <motion.div
                className="w-full md:w-1/2 relative overflow-hidden group cursor-pointer"
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <a onClick={() => handleImageClick(step.relatedImages, step.title, step.category)}>
                  <motion.div
                    className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    <motion.div
                      className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.span
                        className="text-white text-xl font-light tracking-wider flex items-center"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{
                          y: isHovered ? 0 : 20,
                          opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        VIEW PROJECT
                        <svg
                          fill="#ffffff"
                          width="28px"
                          height="28px"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          transform="rotate(0)"
                        >
                          <rect
                            width="24"
                            height="24"
                            transform="rotate(180 12 12)"
                            opacity="0"
                          ></rect>
                          <path d="M18 7.05a1 1 0 0 0-1-1L9 6a1 1 0 0 0 0 2h5.56l-8.27 8.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L16 9.42V15a1 1 0 0 0 1 1 1 1 0 0 0 1-1z"></path>
                        </svg>
                      </motion.span>
                    </motion.div>
                  </motion.div>
                </a>
              </motion.div>

              <div className="w-full md:w-1/2">
                <motion.span
                  className="text-sm text-[#FF4D4D] tracking-wider mb-4 flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {step.category}
                </motion.span>
                <motion.h2
                  className="text-4xl md:text-5xl font-light mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  {step.title}
                </motion.h2>
                <motion.p
                  className="text-base md:text-lg text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {step.description}
                </motion.p>
              </div>
            </div>
          </motion.section>
        ))
      )}
    </main>
  );
}
