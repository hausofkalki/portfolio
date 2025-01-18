import eclectic_1 from "../assets/work/eclectic/1.jpg";
import eclectic_2 from "../assets/work/eclectic/2.jpg";
import eclectic_3 from "../assets/work/eclectic/3.jpg";
import eclectic_4 from "../assets/work/eclectic/4.jpg";
import eclectic_5 from "../assets/work/eclectic/5.jpg";
import eclectic_main from "../assets/work/eclectic/main.jpg";
import modern_1 from "../assets/work/modern/1.jpg";
import modern_2 from "../assets/work/modern/2.jpg";
import modern_3 from "../assets/work/modern/3.jpg";
import modern_4 from "../assets/work/modern/4.jpg";
import modern_5 from "../assets/work/modern/5.jpg";
import modern_6 from "../assets/work/modern/6.jpg";
import modern_main from "../assets/work/modern/main.jpg";
import white_1 from "../assets/work/white/1.jpg";
import white_2 from "../assets/work/white/2.jpg";
import white_3 from "../assets/work/white/3.jpg";
import white_4 from "../assets/work/white/4.jpg";
import white_5 from "../assets/work/white/5.jpg";
import white_6 from "../assets/work/white/6.jpg";
import white_7 from "../assets/work/white/7.jpg";
import white_8 from "../assets/work/white/8.jpg";;
import white_main from "../assets/work/white/main.jpg";
import indian_1 from "../assets/work/indian/1.jpg";
import indian_2 from "../assets/work/indian/2.jpg";
import indian_3 from "../assets/work/indian/3.jpg";
import indian_4 from "../assets/work/indian/4.jpg";
import indian_5 from "../assets/work/indian/5.jpg";
import indian_6 from "../assets/work/indian/6.jpg";
import indian_main from "../assets/work/indian/main.jpg";
// Import other project images similarly

export const projects = [
  {
    title: "Past Projects",
    steps: [
      {
        number: "01",
        title: "Eclectic Grandeur",
        description:
          "A Dark Luxurious Modern Home reimagines opulence with bold tones and sleek designs, creating a sophisticated sanctuary for a family of three in the heart of Bangalore.",
        image: eclectic_main,
        category: "RESIDENTIAL",
        relatedImages: [
          eclectic_main,
          eclectic_1,
          eclectic_2,
          eclectic_3,
          eclectic_4,
          eclectic_5,
        ],
      },
      {
        number: "02",
        title: "Modern Minimalist",
        description:
          "Embodying understated luxury with clean lines, refined finishes, and a serene elegance, offering a high-end living experience in a premium Bangalore apartment.",
        image: modern_main,
        category: "RESIDENTIAL",
        relatedImages: [
          modern_main,
          modern_1,
          modern_2,
          modern_3,
          modern_4,
          modern_5,
          modern_6,
        ],
      },
      {
        number: "03",
        title: "The White Home",
        description:
          "Crisp white modern interiors meets class and luxury. The seemingly plain white canvases are rich with textures and layering intentionally placed for a family of three in this beautiful duplex villa.",
        image: white_main,
        category: "RESIDENTIAL",
        relatedImages: [
          white_main,
          white_1,
          white_2,
          white_3,
          white_4,
          white_5,
          white_6,
          white_7,
          white_8,
        ],
      },
    ],
  },
  {
    title: "Current Projects",
    steps: [
      {
        number: "04",
        title: "The Indian Living",
        description:
          "Seamlessly blends traditional Indian aesthetics with contemporary and modern elements creating a warm, inviting retreat for a family’s vacation in their farmhouse.",
        image: indian_main,
        category: "RESIDENTIAL",
        relatedImages: [
          indian_main,
          indian_1,
          indian_2,
          indian_3,
          indian_4,
          indian_5,
          indian_6,
        ],
      },
      // Add more projects here
    ],
  },
];
