'use client'
import { motion, useScroll, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import Header from '../components/Header'

// Initialize Three.js
THREE.ColorManagement.enabled = true

type Step = {
  number: string;
  title: string;
  description: string;
  details?: {
    title: string;
    description: string;
  }[];
}

type Phase = {
  title: string;
  steps: Step[];
}

// Add phases data
const phases: Phase[] = [
    {
      title: "Design Phase",
      steps: [
        {
          number: "01",
          title: "Discovery & Concept",
          description: "We begin with an in-depth consultation to understand your vision, lifestyle, and requirements. Our team then develops initial concepts that align with your goals.",
          details: [
            {
              title: "Mood Boards",
              description: "Curated visual collections that capture the essence of your desired aesthetic and atmosphere."
            },
            {
              title: "Material Charts",
              description: "Comprehensive selection of textures, finishes, and materials tailored to your space."
            },
            // {
            //   title: "Reference Images",
            //   description: "Carefully selected inspirational images for each area, ensuring cohesive design throughout."
            // },
            {
              title: "AutoCAD Layout",
              description: "Precise furniture blocking and spacing plans to optimize flow and functionality."
            }
          ]
        },
        {
            number: "02",
            title: "Design Development",
            description: "We refine the selected concept into detailed design plans, transforming initial ideas into comprehensive visual representations.",
            details: [
              {
                title: "Final Documentation",
                description: "Complete mood boards, material specifications, and detailed furniture layout plans for approval."
              },
              {
                title: "Initial 3D Renders",
                description: "First set of photorealistic 3D visualizations to bring the design to life and gather feedback."
              },
              {
                title: "Final 3D Renders",
                description: "Polished 3D visualizations incorporating all refinements and revisions (up to 3 rounds)."
              }
            ]
        },
        {
          number: "03",
          title: "Technical Documentation",
          description: "We create comprehensive technical drawings and documentation packages that detail every aspect of the design for precise execution.",
          details: [
            {
              title: "Layout Plans",
              description: "Detailed furniture placement and measurement layouts for accurate spatial planning."
            },
            {
              title: "Architectural Details",
              description: "Door and window schedules, wall elevations, and detailed construction drawings."
            },
            // {
            //   title: "Technical Systems",
            //   description: "Lighting plans and electrical looping drawings for seamless integration."
            // },
            // {
            //   title: "Furniture Documentation",
            //   description: "Working drawings for custom pieces and comprehensive loose furniture specifications."
            // },
            {
              title: "Finishing Selections",
              description: "Detailed documentation of upholstery, art, accessories, rugs, and appliances."
            }
          ]
        },
        {
          number: "04",
          title: "Project Finalization",
          description: "We finalize all documentation and carefully select the right contractors to ensure your project is executed to the highest standards.",
          details: [
            {
              title: "Final Documentation",
              description: "Complete drawing docket with final visualizations and detailed specifications."
            },
            {
              title: "Contractor Assessment",
              description: "Thorough evaluation of potential contractors and detailed quotation analysis."
            },
            {
              title: "Project Handover",
              description: "Final contractor selection, quotation approval, and comprehensive project handover."
            }
          ]
        }
      ]
    },
    {
      title: "Execution Phase",
      steps: [
        {
          number: "05",
          title: "Implementation",
          description: "Our expert team brings the design to life, coordinating with craftsmen and suppliers to ensure every detail is executed perfectly.",
          details: [
            {
              title: "Site Supervision",
              description: "Assignment of dedicated site supervisor by client or contractor to oversee daily progress."
            },
            {
              title: "Construction",
              description: "Commencement of work with regular quality checks and timeline monitoring."
            }
          ]
        },
        {
          number: "06",
          title: "Final Touches",
          description: "We carefully monitor the execution, ensuring quality standards are met and the project progresses smoothly to completion.",
          details: [
            {
              title: "Site Monitoring",
              description: "Regular site visits by design team to ensure design integrity and execution quality."
            },
            {
              title: "Payment Management",
              description: "Structured release of site work payments based on progress and milestones."
            },
            {
              title: "Quality Assurance",
              description: "Rigorous quality control checks and on-site inspections throughout implementation."
            }
          ]
        }
      ]
    },
    {
      title: "Handover Phase",
      steps: [
        {
          number: "07",
          title: "Project Completion",
          description: "We ensure a thorough completion process with detailed quality checks and proper documentation for a smooth project handover.",
          details: [
            {
              title: "Quality Review",
              description: "Comprehensive snag list preparation and systematic resolution of all identified issues."
            },
            {
              title: "Final Inspection",
              description: "Thorough verification of all resolved snags and final quality assessment."
            },
            {
              title: "Project Handover",
              description: "Successful completion of all works and formal handover of the space."
            },
            {
              title: "Payment Closure",
              description: "Processing and clearance of all final payments to contractors and vendors."
            }
          ]
        }
      ]
    }
  ]

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    container: containerRef
  })
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState("01")
  const [isScrolled, setIsScrolled] = useState(false)

  const numberVariants = {
    enter: {
      y: -100,
      opacity: 0
    },
    center: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: 100,
      opacity: 0
    }
  }

  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Add scroll listener for progress bar
    const container = containerRef.current
    const handleScroll = () => {
      if (container) {
        if (container.scrollTop > 50) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }
    }

    container?.addEventListener('scroll', handleScroll)
    
    // Clean up
    return () => {
      document.documentElement.style.scrollBehavior = 'auto'
      container?.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <main className="bg-white relative snap-y snap-mandatory overflow-y-auto h-screen" ref={containerRef}>
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
          transformOrigin: "0%"
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
                opacity: { duration: 0.2 }
              }}
              className="text-[12rem] md:text-[20rem] lg:text-[32rem] font-light text-[#FF4D4D]/10 leading-none absolute left-0"
            >
              {currentStep.charAt(1)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Process Sections */}
      {phases.map((phase) => 
        phase.steps.map((step) => (
          <motion.section 
            key={step.number}
            className="h-screen snap-start snap-always flex items-start pt-24 md:pt-32 lg:pt-36 relative px-4 md:px-0"
            onViewportEnter={() => setCurrentStep(step.number)}
            viewport={{ amount: 0.5 }}
          >
            {/* Content Container */}
            <div className="container mx-auto px-4 md:px-8 lg:px-16">
              {/* Content */}
              <div className="w-full md:w-1/2 pr-0 md:pr-8">
                <motion.h2 
                  className="text-xl md:text-2xl font-light mb-4 flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <span className="h-[1px] w-8 bg-[#FF4D4D]" />
                  {phase.title}
                </motion.h2>
                <motion.h3 
                  className="text-3xl md:text-4xl font-light mb-6 relative md:w-[140%]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <span className="relative">
                    {step.title}
                    <motion.span 
                      className="absolute -bottom-2 left-0 h-[2px] bg-[#FF4D4D]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    />
                  </span>
                </motion.h3>
                <motion.p 
                  className="text-base md:text-lg text-gray-600 leading-relaxed mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  {step.description}
                </motion.p>
                
                {step.details && (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 md:w-[140%]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {step.details.map((detail, index) => (
                      <motion.div 
                        key={detail.title}
                        className="border-l-2 border-[#FF4D4D]/20 pl-4"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                      >
                        <h4 className="text-lg md:text-xl font-light mb-2">{detail.title}</h4>
                        <p className="text-sm md:text-base text-gray-500">{detail.description}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.section>
        ))
      )}
    </main>
  )
} 