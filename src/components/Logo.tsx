import logo from "../assets/logo.svg" 
interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => (
    <img src={logo} alt="Logo" className={className} />
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 300 380"
//   >
//     {/* <!-- Circle --> */}
//     <circle
//       cx="150"
//       cy="150"
//       r="70"
//       fill="none"
//       stroke="#333333"
//       stroke-width="2"
//     />

//     {/* <!-- Pendant Lamp --> */}
//     <path d="M150 80 L150 110" stroke="#333333" stroke-width="2" fill="none" />
//     <path
//       d="M135 110 Q150 120 165 110"
//       stroke="#333333"
//       stroke-width="2"
//       fill="none"
//     />

//     {/* <!-- Side Table --> */}
//     <path
//       d="M115 160 L130 140 L145 160"
//       stroke="#333333"
//       stroke-width="2"
//       fill="none"
//     />
//     <line
//       x1="122"
//       y1="150"
//       x2="138"
//       y2="150"
//       stroke="#333333"
//       stroke-width="2"
//     />

//     {/* <!-- Plant --> */}
//     <path
//       d="M125 140 L130 130 M130 140 L125 130 M127 140 L127 130"
//       stroke="#333333"
//       stroke-width="2"
//     />

//     {/* <!-- Armchair --> */}
//     <path
//       d="M155 140 L185 140 L185 165 L155 165 Z"
//       fill="none"
//       stroke="#333333"
//       stroke-width="2"
//     />
//     <path
//       d="M155 165 L155 170 L185 170 L185 165"
//       stroke="#333333"
//       stroke-width="2"
//       fill="none"
//     />

//     {/* <!-- Text --> */}
//     <text
//       x="150"
//       y="280"
//       text-anchor="middle"
//       font-family="Arial"
//       font-size="36"
//       letter-spacing="4"
//       fill="#333333"
//     >
//       INTERIOR
//     </text>
//     <text
//       x="150"
//       y="320"
//       text-anchor="middle"
//       font-family="Arial"
//       font-size="24"
//       letter-spacing="2"
//       fill="#333333"
//     >
//       DESIGN
//     </text>
//   </svg>
);

export default Logo;
