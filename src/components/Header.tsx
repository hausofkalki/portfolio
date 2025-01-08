"use client";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTransition } from "../context/TransitionContext";

// Menu Button Component
// Menu and Close button combined into one component
const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute"
    animate={{
      opacity: isOpen ? 0 : 1,
      transitionEnd: {
        display: isOpen ? "none" : "block",
      },
    }}
    transition={{ duration: 0.2 }}
  >
    <path
      d="M3 5h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 9h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M3 13h12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </motion.svg>
);

const CloseIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute"
    animate={{
      opacity: isOpen ? 1 : 0,
      transitionEnd: {
        display: isOpen ? "block" : "none",
      },
    }}
    transition={{ duration: 0.2 }}
  >
    <path
      d="M4.5 4.5L13.5 13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M13.5 4.5L4.5 13.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </motion.svg>
);

const MenuRing = ({
  isOpen,
  onClick,
  children,
}: {
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <motion.div
    className="w-10 h-10 rounded-full border border-current flex items-center justify-center cursor-pointer relative"
    onClick={onClick}
    initial="closed"
    animate={isOpen ? "open" : "closed"}
    whileHover="hover"
    variants={{
      closed: {
        rotate: 0,
      },
      open: {
        rotate: 90,
      },
      hover: {
        scale: 1.2,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 10,
        },
      },
    }}
    transition={{
      duration: 0.4,
      ease: [0.32, 0.72, 0, 1],
    }}
  >
    {children}
  </motion.div>
);

const MenuButton = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <div className="relative">
    <MenuRing isOpen={isOpen} onClick={onClick}>
      <HamburgerIcon isOpen={isOpen} />
      <CloseIcon isOpen={isOpen} />
    </MenuRing>
  </div>
);

// Logo Component
const Logo = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 0L40 20L20 40L0 20L20 0Z" fill="currentColor" />
  </svg>
);

interface HeaderProps {
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

const menuItemVariants: Variants = {
  closed: {
    x: "100%",
    transition: {
      duration: 0.8,
      ease: [0.32, 0.72, 0, 1],
    },
  },
  open: {
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

const letterVariants = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

export default function Header({
  isScrolled,
  isMenuOpen,
  setIsMenuOpen,
}: HeaderProps) {
  const location = useLocation();
  const { setClickPosition } = useTransition();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setClickPosition({
      x: e.clientX,
      y: e.clientY,
    });
    setTimeout(() => navigate(path), 50);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled && !isMenuOpen ? "bg-white/80 backdrop-blur-sm" : ""
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            to="/"
            className={`flex items-center space-x-3 ${
              location.pathname === "/" && !isScrolled
                ? "text-white"
                : "text-black"
            }`}
          >
            <Logo />
            <span className="text-xm font-light tracking-wider">
              HAUS OF KALKI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className={`hidden lg:flex space-x-8 ${
              location.pathname === "/" && !isScrolled
                ? "text-white"
                : "text-black"
            }`}
          >
            {["about", "work", "process", "contact"].map((item) => (
              <Link
                key={item}
                to={`/${item}`}
                onClick={(e) => handleNavClick(e, `/${item}`)}
                className="text-xm tracking-wider relative group px-4 py-2"
              >
                <span className="relative z-10">{item.toUpperCase()}</span>
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div
            className={`lg:hidden ${
              location.pathname === "/" && !isScrolled
                ? "text-white"
                : "text-black"
            }`}
          >
            <MenuButton
              isOpen={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#C84C35] z-50 flex flex-col items-center justify-center gap-12 md:gap-20"
          >
            {["about", "work", "process", "contact"].map((item, i) => (
              <motion.div
                key={item}
                variants={menuItemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{
                  delay: i * 0.1,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to={`/${item}`}
                  onClick={(e) => handleNavClick(e, `/${item}`)}
                  className="text-5xl md:text-5xl font-light px-6 py-6 md:py-10 hover:opacity-60 transition-opacity text-white"
                >
                  {item
                    .toUpperCase()
                    .split("")
                    .map((letter, index) => (
                      <motion.span
                        key={index}
                        variants={letterVariants}
                        initial="initial"
                        animate="animate"
                        transition={{
                          duration: 0.8,
                          delay: i * 0.05 + index * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="inline-block"
                      >
                        {letter}
                      </motion.span>
                    ))}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
