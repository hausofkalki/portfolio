import logoRed from "../assets/logo_red.svg";
import logoBlack from "../assets/logo.svg";

interface LogoProps {
  className?: string;
  isMenuOpen?: boolean;
}

const Logo = ({ className, isMenuOpen = false }: LogoProps) => (
  <img 
    src={isMenuOpen ? logoBlack : logoRed} 
    alt="Logo" 
    className={className} 
  />
);

export default Logo;
