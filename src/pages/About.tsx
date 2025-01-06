'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Header from '../components/Header'

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      if (!isMenuOpen) {
        const scrolled = window.scrollY > 0
        setIsScrolled(scrolled)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuOpen])

  return (
    <main className="min-h-screen bg-white">
      <Header 
        isScrolled={isScrolled} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
      />
      
      {/* Hero Section */}
      <section className="pt-32 px-4 md:px-8 lg:px-16">
        <motion.h1 
          className="text-5xl md:text-7xl font-light mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Creativity meets Functionality
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-2xl font-light max-w-6xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          With a passion for design and an eye for detail, we specialize in transforming interiors into timeless works of art tailored to your unique vision.
        </motion.p>
      </section>

      {/* Content Sections */}
      <section className="px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-xl font-light text-gray-600 leading-relaxed lg:leading-relaxed">
            Our approach blends sophisticated aesthetics with harmonious spatial planning, curating interiors that are both visually captivating and effortlessly functional. From bespoke furnishings to exquisite material palettes, we design environments that resonate with your personality and elevate everyday living.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl md:text-xl font-light text-gray-600 leading-relaxed lg:leading-relaxed">
              At <b>Haus of Kalki</b>, we transform spaces into immersive experiences. By fusing innovation with meticulous craftsmanship, we bring your design dreams to life—creating interiors that exude elegance, character, and enduring style.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-4 md:px-8 lg:px-16 py-16">
        <motion.h1 
          className="text-5xl md:text-5xl font-light mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Let’s design your dream together.
        </motion.h1>
      </section>

      {/* Team Section */}
      <section className="bg-terra text-white py-24 px-4 md:px-8 lg:px-16">
        <motion.h2 
          className="text-4xl font-light mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Team
        </motion.h2>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
              <img 
                src="https://picsum.photos/200" 
                alt="Team Member"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl mb-2">Kalki Palanisamy</h3>
            <p className="text-white/70">Founder & Principal Designer</p>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 