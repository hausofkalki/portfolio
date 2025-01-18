"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import eclectic_main from "../assets/work/eclectic/main.jpg";
import modern_main from "../assets/work/modern/main.jpg";
import white_main from "../assets/work/white/main.jpg";
import indian_main from "../assets/work/indian/main.jpg";

// Arrow components
const LeftArrow = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const RightArrow = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 18L15 12L9 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Carousel data
const slides = [
  {
    id: 1,
    image: eclectic_main,
    category: "RESIDENTIAL",
    title: "Eclectic Grandeur"
  },
  {
    id: 2,
    image: modern_main,
    category: "RESIDENTIAL",
    title: "Modern Minimalist",
    link: "#work2",
  },
  {
    id: 3,
    image: white_main,
    category: "RESIDENTIAL",
    title: "The White Home",
    link: "#work3",
  },
  {
    id: 4,
    image: indian_main,
    category: "RESIDENTIAL",
    title: "The Indian Living",
    link: "#work4",
  },
];

// Dot indicator component
const DotIndicator = ({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`w-2 h-2 rounded-full transition-all duration-300 ${
      active ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
    }`}
  />
);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // Add the navigation function
  const handleViewAllWorks = () => {
    window.location.href = "/portfolio/work";
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
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-1 xl:grid-cols-2">
        <div
          className="relative h-[60vh] md:h-[80vh] xl:h-screen"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide}
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
            />
          </AnimatePresence>

          {/* Navigation Arrows - visible only above 1280px */}
          <div className="absolute bottom-8 left-0 right-0 hidden xl:flex justify-start md:left-8 items-center gap-4">
            <button
              onClick={() =>
                setCurrentSlide(
                  (prev) => (prev - 1 + slides.length) % slides.length
                )
              }
              className="w-10 h-10 flex items-center justify-center border border-white/30 bg-black/20 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <LeftArrow />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % slides.length)
              }
              className="w-10 h-10 flex items-center justify-center border border-white/30 bg-black/20 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            >
              <RightArrow />
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Content section */}
          <div className="bg-terra text-white h-[40vh] md:h-[20vh] xl:h-screen">
            <div className="h-full flex flex-col justify-end p-8 md:p-12 pb-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="max-w-md"
                >
                  {/* <p className="text-sm mb-4 hidden md:block">{slides[currentSlide].category}</p> */}
                  <h1 className="text-4xl md:text-5xl font-light mb-6 md:mb-8 leading-tight">
                    {slides[currentSlide].title}
                  </h1>
                  <motion.span
                    onClick={handleViewAllWorks}
                    className="inline-flex items-center gap-1 border border-white px-4 py-3 text-sm hover:bg-white hover:text-terra transition-all cursor-pointer"
                    whileHover={{
                      scale: 1.05,
                    }}
                    transition={{
                      type: "spring",
                      duration: 0.15,
                      bounce: 0
                    }}
                  >
                    VIEW ALL WORKS
                    <svg
                      fill="currentColor"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      className="relative top-[0px]"
                    >
                      <path d="M18 7.05a1 1 0 0 0-1-1L9 6a1 1 0 0 0 0 2h5.56l-8.27 8.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0L16 9.42V15a1 1 0 0 0 1 1 1 1 0 0 0 1-1z" />
                    </svg>
                  </motion.span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Dot indicators - visible below 1280px */}
          <div className="absolute bottom-8 left-0 right-0 xl:hidden flex justify-center gap-3">
            {slides.map((_, index) => (
              <DotIndicator
                key={index}
                active={currentSlide === index}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
